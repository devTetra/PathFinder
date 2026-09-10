import * as z from 'zod';
import { RIASEC } from '../constants/dimensions.js';

export const createResultSchema = z.object({
	resultId: z.string('Result Id is required').min(5, 'Result Id is too short'),
	scores: z.record(z.enum(RIASEC), z.number().min(0).max(100)),
	careerMatches: z
		.array(
			z.object({
				career: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid ObjectId'),
				fit: z.number().min(0).max(100),
			}),
		)
		.min(1),
});
