import questionModel from '../models/Question.js';
import { ApiError } from '../types/ApiError.js';
import { shuffleArray } from '../utils/question.helper.js';

export const getAllQuestionsService = async () => {
	const questions = await questionModel.find().select('-options.scores');
	if (!questions.length) throw new ApiError(404, 'Questions not found');
	return shuffleArray(questions);
};
