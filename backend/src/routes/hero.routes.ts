import { Router } from 'express';
import { getHero, updateHero } from '../controllers/hero.controller';
import { authenticateAdmin } from '../middleware/auth';

const router = Router();

router.get('/', getHero);
router.put('/', authenticateAdmin, updateHero);

export default router;
