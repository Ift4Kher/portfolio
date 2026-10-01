import { Router } from 'express';
import { login, logout, me } from '../controllers/auth.controller';
import { authenticateAdmin } from '../middleware/auth';
import { authRateLimiter } from '../middleware/rateLimiter';

const router = Router();

router.post('/login', authRateLimiter, login);
router.post('/logout', logout);
router.get('/me', authenticateAdmin, me);

export default router;
