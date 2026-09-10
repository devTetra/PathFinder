import resultModel from '../models/Result.js';
import { ApiError } from '../types/ApiError.js';
import { RESULT_TTL } from '../constants/dimensions.js';

export const getResultService = async (resultId: string) => {
	const expirationDate = new Date(Date.now() - RESULT_TTL * 1000);
	const result = await resultModel
		.findOne({
			resultId,
			createdAt: { $gt: expirationDate },
		})
		.populate({
			path: 'careerMatches.career',
			select: 'name slug shortDescription description coreDimensions illustrationKey',
		});
	if (!result) throw new ApiError(404, 'Result does not exist or has expired');
	return result;
};
