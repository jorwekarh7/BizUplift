import express from 'express';
import { getReviews, replyToReview, generateAIReply } from '../controllers/reviewsController.js';

const router = express.Router();

// GET /api/reviews/:locationId
router.get('/:locationId', getReviews);

// POST /api/reviews/:reviewId/reply
router.post('/:reviewId/reply', replyToReview);

// POST /api/reviews/generate-ai-reply
router.post('/generate-ai-reply', generateAIReply);

export default router;