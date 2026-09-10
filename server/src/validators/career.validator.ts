import * as z from 'zod';
import { RIASEC } from '../constants/dimensions.js';

export const createCareerSchema = z.object({
	name: z.string('Name is required').min(3, 'Name is too short').trim(),
	slug: z.string('Slug is required').min(3, 'Slug is too short').trim(),
	shortDescription: z.string('Short description is required').min(5, 'Short description is too short').trim(),
	description: z.string('Description is required').min(5, 'description is too short').trim(),
	coreDimensions: z.array(z.enum(RIASEC)),
	dimensions: z.record(
		z.enum(RIASEC),
		z.object({
			min: z.number('Minimum dimension is required').min(0),
			max: z.number('Minimum dimension is required').positive().max(100),
			weight: z.number('Minimum dimension is required').min(1),
		}),
	),
	illustrationKey: z.string('Illustration key is required'),
});
