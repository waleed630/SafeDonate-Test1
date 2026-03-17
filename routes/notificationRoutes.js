// routes/notificationRoutes.js
import express from 'express';
const router = express.Router();

import { getUserNotifications, markAsRead } from '../controllers/notificationController.js';
import protect from '../middleware/authMiddleware.js';

router.use(protect);
router.get('/', getUserNotifications);
router.post('/read', markAsRead);

export default router;