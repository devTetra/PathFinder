import * as z from 'zod';
import { RIASEC } from '../constants/dimensions.js';

export const createQuestionSchema = z.object({
	text: z.string('Question is required').min(5, 'Question is too short').trim(),
	options: z
		.array(
			z.object({
				id: z.enum(['A', 'B', 'C', 'D', 'E'], 'Option is required'),
				text: z.string('Option is required').min(5, 'Option is too short').trim(),
				scores: z
					.array(
						z.object({
							dimension: z.enum(RIASEC),
							points: z.number().min(1).max(5),
						}),
					)
					.min(1),
			}),
		)
		.length(5, 'A question must have exactly 5 options')
		.superRefine((options, ctx) => {
			const ids = new Set(options.map(option => option.id));
			if (ids.size !== 5) {
				ctx.addIssue({
					code: 'custom',
					message: 'Option IDs must be unique',
				});
			}
		}),
});
