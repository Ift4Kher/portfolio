import { Router } from 'express';
import { getProcessSteps, createProcessStep, updateProcessStep, deleteProcessStep } from '../controllers/process.controller';
import { authenticateAdmin } from '../middleware/auth';

const router = Router();

router.get('/', getProcessSteps);
router.post('/', authenticateAdmin, createProcessStep);
router.put('/:id', authenticateAdmin, updateProcessStep);
router.delete('/:id', authenticateAdmin, deleteProcessStep);

export default router;
