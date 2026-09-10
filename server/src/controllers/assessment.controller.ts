import { NextFunction, Request, Response } from 'express';
import {
	careerMatchService,
	createResultService,
	normalizeScoresService,
} from '../service/assessment.service.js';

export const assessmentController = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const scores = await normalizeScoresService(req.body);
		const careerMatches = await careerMatchService(scores);
		const result = await createResultService(scores, careerMatches);
		res.status(201).json({
			success: true,
			data: { resultId: result.resultId, scores: result.scores, careerMatches: result.careerMatches },
			message: 'Result created successfully',
		});
	} catch (error) {
		next(error);
	}
};
