import express from 'express';
import { getKeywords } from '../controllers/keywordsController.js';

const router = express.Router();

// GET /api/keywords/:locationId?startDate=...&endDate=...
router.get('/:locationId', getKeywords);

export default router;