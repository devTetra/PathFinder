import dns from 'dns';
dns.setServers(['8.8.8.8', '8.8.4.4']);

import { configDotenv } from 'dotenv';
import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.config.js';
import { errorMiddleware } from './middleware/error.middleware.js';
import question from './routes/question.route.js';
import career from './routes/career.route.js';
import assessment from './routes/assessment.route.js';
import result from './routes/result.route.js';

configDotenv();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/questions', question);
app.use('/api/careers', career);
app.use('/api/assessment', assessment);
app.use('/api/results', result);

app.use(errorMiddleware);

connectDB().then(() => {
	const PORT = process.env.PORT || 5000;
	app.listen(PORT, () => {
		console.log(`Listening on PORT: ${PORT}`);
	});
});
