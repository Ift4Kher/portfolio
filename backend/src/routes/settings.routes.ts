import { Router } from 'express';
import { getSettings, updateSettings, getDashboardStats } from '../controllers/settings.controller';
import { authenticateAdmin } from '../middleware/auth';

const router = Router();

router.get('/', getSettings);
router.put('/', authenticateAdmin, updateSettings);
router.get('/stats', authenticateAdmin, getDashboardStats);

export default router;
