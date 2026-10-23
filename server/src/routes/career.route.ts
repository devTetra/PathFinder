import { Router } from 'express';
import { getAllCareers, getCareer, getRelatedCareers } from '../controllers/career.controller.js';

const router = Router();

router.get('/', getAllCareers);
router.post('/related', getRelatedCareers);
router.get('/:slug', getCareer);
export default router;
