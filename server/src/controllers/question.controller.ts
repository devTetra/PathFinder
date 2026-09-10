import { NextFunction, Request, Response } from 'express';
import { getAllQuestionsService } from '../service/question.service.js';

export const getAllQuestions = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const questions = await getAllQuestionsService();
		res.status(200).json({ success: true, data: questions, message: 'Questions retrieved successfully' });
	} catch (error) {
		next(error);
	}
};
