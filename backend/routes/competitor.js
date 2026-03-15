import express from 'express';
import { getCompetitors } from '../controllers/competitorController.js';

const router = express.Router();

// GET /api/competitor/:locationId
router.get('/:locationId', getCompetitors);

export default router;