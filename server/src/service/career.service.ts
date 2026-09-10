import careerModel from '../models/Career.js';
import { ApiError } from '../types/ApiError.js';

export const getAllCareersService = async () => {
	const careers = await careerModel.find().sort({ name: 'asc' });
	if (!careers.length) throw new ApiError(404, 'Careers not found');
	return careers;
};

export const getCareerService = async (slug: string) => {
	const career = await careerModel.findOne({ slug });
	if (!career) throw new ApiError(404, 'Career not found');
	return career;
};
