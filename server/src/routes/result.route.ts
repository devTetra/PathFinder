import { Router } from 'express';
import { getResult } from '../controllers/result.controller.js';

const router = Router();

router.get('/:resultId', getResult);

export default router;
