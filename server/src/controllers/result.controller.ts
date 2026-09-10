import { NextFunction, Request, Response } from 'express';
import { getResultService } from '../service/result.service.js';

export const getResult = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const resultId = req.params.resultId;
		const result = await getResultService(resultId as string);
		res.status(200).json({ success: true, data: result, message: 'Result retrieved successfully' });
	} catch (error) {
		next(error);
	}
};
