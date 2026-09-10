import { Router } from 'express';
import { getAllQuestions } from '../controllers/question.controller.js';

const router = Router();
router.get('/', getAllQuestions);

export default router;
