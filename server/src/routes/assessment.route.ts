import { Router } from 'express';
import { assessmentController } from '../controllers/assessment.controller.js';
import { validate } from '../middleware/validate.middleware.js';
import { createAssessmentSchema } from '../validators/assessment.validator.js';

const router = Router();

router.post('/submit', validate(createAssessmentSchema), assessmentController);

export default router;
