import questionModel, { IQuestion } from '../models/Question.js';
import { RiasecScores } from '../types/index.js';
import { ApiError } from '../types/ApiError.js';
import { maxDimensions, RIASEC } from '../constants/dimensions.js';

export const getAssessmentQuestions = async (questionIds: Set<string>) => {
	const questions = await questionModel.find({ _id: { $in: [...questionIds] } });
	return new Map(questions.map(question => [question._id.toString(), question]));
};

export const calculateScores = (
	questions: Map<string, IQuestion>,
	answers: {
		questionId: string;
		optionId: 'A' | 'B' | 'C' | 'D' | 'E';
	}[],
) => {
	const dimensions: RiasecScores = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 };

	for (const answer of answers) {
		const question = questions.get(answer.questionId);
		if (!question) throw new ApiError(404, `Question ${answer.questionId} doesn't exist`);

		const selectedOption = question.options.find(option => option.id === answer.optionId);
		if (!selectedOption)
			throw new ApiError(400, `Option ${answer.optionId} isn't valid for question ${answer.questionId}`);

		selectedOption.scores.forEach(({ dimension, points }) => {
			dimensions[dimension] += points;
		});
	}

	RIASEC.forEach(dimension => {
		dimensions[dimension] = Math.round((dimensions[dimension] / maxDimensions[dimension]) * 100);
	});
	return dimensions;
};
