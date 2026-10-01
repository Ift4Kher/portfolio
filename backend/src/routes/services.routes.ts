import { Router } from 'express';
import { getServices, getServiceById, createService, updateService, deleteService } from '../controllers/services.controller';
import { authenticateAdmin } from '../middleware/auth';

const router = Router();

router.get('/', getServices);
router.get('/:id', getServiceById);
router.post('/', authenticateAdmin, createService);
router.put('/:id', authenticateAdmin, updateService);
router.delete('/:id', authenticateAdmin, deleteService);

export default router;
