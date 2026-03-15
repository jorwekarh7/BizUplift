import express from 'express';
import { getReports } from '../controllers/reportsController.js';

const router = express.Router();

// GET /api/reports/:locationId?startDate=...&endDate=...
router.get('/:locationId', getReports);

export default router;