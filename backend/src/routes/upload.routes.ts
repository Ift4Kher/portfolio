import { Router } from 'express';
import { uploadFile, uploadMultipleFiles } from '../controllers/upload.controller';
import { authenticateAdmin } from '../middleware/auth';
import { upload } from '../middleware/upload';

const router = Router();

router.post('/single', authenticateAdmin, upload.single('file'), uploadFile);
router.post('/multiple', authenticateAdmin, upload.array('files', 10), uploadMultipleFiles);

export default router;
