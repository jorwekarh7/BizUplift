import express from 'express';
import { getPlans, getUserSubscription, upgradeSubscription } from '../controllers/subscriptionsController.js';

const router = express.Router();

// GET /api/subscriptions/plans
router.get('/plans', getPlans);

// GET /api/subscriptions/user/:userId
router.get('/user/:userId', getUserSubscription);

// POST /api/subscriptions/user/:userId/upgrade
router.post('/user/:userId/upgrade', upgradeSubscription);

export default router;