import * as z from 'zod';

export const createAssessmentSchema = z.object({
	answers: z
		.array(
			z.object({
				questionId: z.string('Question ID is required').regex(/^[0-9a-fA-F]{24}$/, 'Invalid Question ID'),
				optionId: z.enum(['A', 'B', 'C', 'D', 'E']),
			}),
		)
		.length(20, '20 questions are required'),
});
