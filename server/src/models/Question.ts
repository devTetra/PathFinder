import mongoose, { Schema } from 'mongoose';
import { QuestionOption, ScoreContribution } from '../types/index.js';
import { RIASEC } from '../constants/dimensions.js';
export interface IQuestion {
	text: string;
	options: QuestionOption[];
}

const scoreContributionSchema = new Schema<ScoreContribution>(
	{
		dimension: { type: String, enum: RIASEC, required: true },
		points: { type: Number, required: true, min: 1, max: 5 },
	},
	{ _id: false },
);

const questionOptionSchema = new Schema<QuestionOption>(
	{
		id: { type: String, required: true, trim: true },
		text: { type: String, required: true, trim: true },
		scores: { type: [scoreContributionSchema], required: true },
	},
	{ _id: false },
);

const questionSchema = new Schema<IQuestion>(
	{
		text: { type: String, required: true, trim: true },
		options: {
			type: [questionOptionSchema],
			required: true,
			validate: {
				validator: (value: QuestionOption[]) => value.length === 5,
				message: 'A question must have exactly 5 options',
			},
		},
	},
	{
		timestamps: true,
	},
);
const questionModel = mongoose.model('Question', questionSchema);
export default questionModel;
