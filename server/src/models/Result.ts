import mongoose, { Schema } from 'mongoose';
import { RiasecScores } from '../types/index.js';
import { RESULT_TTL } from '../constants/dimensions.js';

interface IResult {
	resultId: string;
	scores: RiasecScores;
	careerMatches: { career: mongoose.Types.ObjectId; fit: number }[];
}

const careerMatchSchema = new Schema(
	{
		career: { type: Schema.Types.ObjectId, ref: 'Career', required: true },
		fit: { type: Number, required: true, min: 0, max: 100 },
	},
	{ _id: false },
);

const resultSchema = new Schema<IResult>(
	{
		resultId: { type: String, required: true, unique: true },
		scores: {
			R: { type: Number, required: true, min: 0, max: 100 },
			I: { type: Number, required: true, min: 0, max: 100 },
			A: { type: Number, required: true, min: 0, max: 100 },
			S: { type: Number, required: true, min: 0, max: 100 },
			E: { type: Number, required: true, min: 0, max: 100 },
			C: { type: Number, required: true, min: 0, max: 100 },
		},
		careerMatches: { type: [careerMatchSchema], required: true },
	},
	{
		timestamps: true,
	},
);

resultSchema.index(
	{ createdAt: 1 },
	{
		expireAfterSeconds: RESULT_TTL,
	},
);
const resultModel = mongoose.model('Result', resultSchema);
export default resultModel;
