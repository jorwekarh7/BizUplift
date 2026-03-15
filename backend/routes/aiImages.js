import express from 'express';
import { generateAIImage, getAIImages, getUserCredits } from '../controllers/aiImagesController.js';

const router = express.Router();

// POST /api/ai-images/generate
router.post('/generate', generateAIImage);

// GET /api/ai-images?userId=...&category=...
router.get('/', getAIImages);

// GET /api/ai-images/credits/:userId
router.get('/credits/:userId', getUserCredits);

export default router;