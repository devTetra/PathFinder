import { Router } from 'express';
import { getAllCareers, getCareer } from '../controllers/career.controller.js';

const router = Router();

router.get('/', getAllCareers);
router.get('/:slug', getCareer);

export default router;
