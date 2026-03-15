import express from 'express';
import { getAudit } from '../controllers/auditController.js';

const router = express.Router();

// GET /api/audit/:locationId
router.get('/:locationId', getAudit);

export default router;