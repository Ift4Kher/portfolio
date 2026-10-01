import { Router } from 'express';
import { getAbout, updateAbout } from '../controllers/about.controller';
import { authenticateAdmin } from '../middleware/auth';

const router = Router();

router.get('/', getAbout);
router.put('/', authenticateAdmin, updateAbout);

export default router;
