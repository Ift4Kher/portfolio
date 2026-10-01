import { Router } from 'express';
import { submitMessage, getMessages, markAsRead, deleteMessage } from '../controllers/contact.controller';
import { authenticateAdmin } from '../middleware/auth';
import { contactRateLimiter } from '../middleware/rateLimiter';

const router = Router();

router.post('/', contactRateLimiter, submitMessage);
router.get('/', authenticateAdmin, getMessages);
router.patch('/:id/read', authenticateAdmin, markAsRead);
router.delete('/:id', authenticateAdmin, deleteMessage);

export default router;
