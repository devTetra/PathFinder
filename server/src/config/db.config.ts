import { configDotenv } from 'dotenv';
import mongoose from 'mongoose';

configDotenv({ quiet: true });
const DB_URI = process.env.MONGODB_URI;

export const connectDB = async (): Promise<void> => {
	try {
		const conn = await mongoose.connect(DB_URI as string);
		console.log(`MongoDB connected at ${conn.connection.host}`);
	} catch (error: any) {
		console.error(`${error}\nDatabase connection failed`);
		process.exit(1);
	}
};
