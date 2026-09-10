import { ZodError, ZodType } from 'zod';
import { Request, Response, NextFunction } from 'express';

export const validate =
	<T extends ZodType>(schema: T) =>
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			req.body = await schema.parseAsync(req.body);
			next();
		} catch (error) {
			if (error instanceof ZodError) {
				return res.status(400).json({
					success: false,
					message: 'Validation failed',
					errors: error.issues.map(issue => ({
						field: issue.path.join(''),
						message: issue.message,
					})),
				});
			}
			next(error);
		}
	};
