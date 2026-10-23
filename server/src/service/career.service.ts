import careerModel from '../models/Career.js';
import { ApiError } from '../types/ApiError.js';
import { updateCareerScheam } from '../validators/career.validator.js';
import * as z from 'zod';

type updateCareerDto = z.infer<typeof updateCareerScheam>;

export const getAllCareersService = async () => {
	const careers = await careerModel.find().sort({ name: 'asc' });
	if (!careers.length) throw new ApiError(404, 'Careers not found');
	return careers;
};

export const getCareerService = async (slug: string) => {
	const career = await careerModel.findOne({ slug }).select('-dimensions -coreDimensions');
	if (!career) throw new ApiError(404, 'Career not found');
	return career;
};

export const getRelatedCareersService = async (slugs: string[]) => {
	if (slugs.length === 0) throw new ApiError(400, "Slugs array can't be empty");
	let relatedCareers = [];
	for (const slug of slugs) {
		const relatedCareer = await getCareerService(slug);
		relatedCareers.push(relatedCareer);
	}
	return relatedCareers;
};
