import { Router } from 'express';
import {
  getProjects,
  getFeaturedProjects,
  getProjectBySlug,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
  togglePublish,
  toggleFeatured,
  reorderCarousel
} from '../controllers/projects.controller';
import { authenticateAdmin } from '../middleware/auth';

const router = Router();

// Public routes
router.get('/', getProjects);
router.get('/featured', getFeaturedProjects);
router.get('/slug/:slug', getProjectBySlug);

// Admin protected routes
router.get('/id/:id', authenticateAdmin, getProjectById);
router.post('/', authenticateAdmin, createProject);
router.put('/:id', authenticateAdmin, updateProject);
router.delete('/:id', authenticateAdmin, deleteProject);
router.patch('/:id/publish', authenticateAdmin, togglePublish);
router.patch('/:id/featured', authenticateAdmin, toggleFeatured);
router.patch('/reorder', authenticateAdmin, reorderCarousel);

export default router;
