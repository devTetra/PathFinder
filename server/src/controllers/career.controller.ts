import { NextFunction, Request, Response } from 'express';
import { getAllCareersService, getCareerService } from '../service/career.service.js';

export const getAllCareers = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const careers = await getAllCareersService();
		return res.status(200).json({ success: true, data: careers, message: 'Careers retrieved successfully' });
	} catch (error) {
		next(error);
	}
};

export const getCareer = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const slug = req.params.slug;
		const career = await getCareerService(slug as string);
		return res.status(200).json({ success: true, data: career, message: 'Career retrieved successfully' });
	} catch (error) {
		next(error);
	}
};
