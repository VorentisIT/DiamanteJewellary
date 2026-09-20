import express from 'express';
import { getAdminAnalytics } from '../controllers/adminController.js';
import { protect, adminOnly } from '../middleware/auth.js';

const router = express.Router();

router.get('/analytics', protect, adminOnly, getAdminAnalytics);

export default router;
