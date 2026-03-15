import express from 'express';
import { getPosts, createPost, generateAIPost } from '../controllers/postsController.js';

const router = express.Router();

// GET /api/posts/:locationId
router.get('/:locationId', getPosts);

// POST /api/posts/:locationId
router.post('/:locationId', createPost);

// POST /api/posts/generate-ai-post
router.post('/generate-ai-post', generateAIPost);

export default router;