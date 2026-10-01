import { Router } from 'express';
import { getSkills, getSkillById, createSkill, updateSkill, deleteSkill } from '../controllers/skills.controller';
import { authenticateAdmin } from '../middleware/auth';

const router = Router();

router.get('/', getSkills);
router.get('/:id', getSkillById);
router.post('/', authenticateAdmin, createSkill);
router.put('/:id', authenticateAdmin, updateSkill);
router.delete('/:id', authenticateAdmin, deleteSkill);

export default router;
