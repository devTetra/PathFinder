import * as z from 'zod';
import { Types } from 'mongoose';
import { randomBytes } from 'node:crypto';
import { createAssessmentSchema } from '../validators/assessment.validator.js';
import { ApiError } from '../types/ApiError.js';
import { RiasecScores } from '../types/index.js';
import { calculateScores, getAssessmentQuestions } from '../utils/assessment.helper.js';
import { getAllCareersService } from './career.service.js';
import { RIASEC } from '../constants/dimensions.js';
import resultModel from '../models/Result.js';

type assessmentDto = z.infer<typeof createAssessmentSchema>;

export const normalizeScoresService = async (data: assessmentDto) => {
	const questionIds = new Set(data.answers.map(answer => answer.questionId));
	if (questionIds.size !== 20) throw new ApiError(400, "Questions can't be repeated");

	const questions = await getAssessmentQuestions(questionIds);
	return calculateScores(questions, data.answers);
};

export const careerMatchService = async (scores: RiasecScores) => {
	let careerMatches: { career: Types.ObjectId; fit: number }[] = [];
	const careers = await getAllCareersService();
	careers.forEach(({ dimensions, _id }) => {
		let fit = 0;
		RIASEC.forEach(dimension => {
			const { min, max, weight } = dimensions[dimension];
			if (scores[dimension] >= min && scores[dimension] <= max) fit += 100 * weight;
			else if (scores[dimension] < min) fit += Math.max(0, 100 - (min - scores[dimension]) * 4) * weight;
			else if (scores[dimension] > max) fit += Math.max(0, 100 - (scores[dimension] - max) * 4) * weight;
		});
		careerMatches.push({ career: _id, fit: Math.round(fit / 100) });
	});
	careerMatches.sort((a, b) => b.fit - a.fit);
	return careerMatches;
};

export const createResultService = async (
	scores: RiasecScores,
	careerMatches: { career: Types.ObjectId; fit: number }[],
) => {
	const resultId = randomBytes(8).toString('hex');
	const result = await resultModel.create({ resultId, scores, careerMatches });
	return result;
};
