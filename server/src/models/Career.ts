import mongoose, { Schema } from 'mongoose';
import { RiasecDimension, CareerDimensions, CareerDimension } from '../types/index.js';
import { RIASEC } from '../constants/dimensions.js';

interface ICareer {
	name: string;
	slug: string;
	shortDescription: string;
	description: string;
	coreDimensions: RiasecDimension[];
	dimensions: CareerDimensions;
	illustrationKey: string;
}

const careerDimensionSchema = new Schema<CareerDimension>(
	{
		min: { type: Number, required: true },
		max: { type: Number, required: true },
		weight: { type: Number, required: true },
	},
	{ _id: false },
);

const careerSchema = new Schema<ICareer>(
	{
		name: { type: String, required: true, trim: true },
		slug: { type: String, unique: true, required: true },
		shortDescription: { type: String, required: true },
		description: { type: String, required: true },
		coreDimensions: { type: [String], enum: RIASEC, required: true },
		dimensions: {
			R: { type: careerDimensionSchema, required: true },
			I: { type: careerDimensionSchema, required: true },
			A: { type: careerDimensionSchema, required: true },
			S: { type: careerDimensionSchema, required: true },
			E: { type: careerDimensionSchema, required: true },
			C: { type: careerDimensionSchema, required: true },
		},
		illustrationKey: { type: String, required: true },
	},
	{
		timestamps: true,
	},
);
const careerModel = mongoose.model('Career', careerSchema);
export default careerModel;
