import express from 'express';
import { getMedia } from '../controllers/mediaController.js';

const router = express.Router();

// GET /api/media/:locationId?type=image|video
router.get('/:locationId', getMedia);

export default router;