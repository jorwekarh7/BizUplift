import { PrismaClient } from '@prisma/client';
import OpenAI from 'openai';

const prisma = new PrismaClient();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Mock function to simulate Google Business API
const fetchPostsFromGoogle = async (locationId) => {
  return [
    {
      postId: 'post1',
      content: 'Check out our new menu items! 🍕',
      media: 'https://example.com/image1.jpg',
      createdAt: new Date('2024-01-10'),
    },
    {
      postId: 'post2',
      content: 'Happy Hour specials all week! 🎉',
      media: null,
      createdAt: new Date('2024-01-08'),
    },
  ];
};

export const getPosts = async (req, res) => {
  try {
    const { locationId } = req.params;

    // Fetch from Google API
    const googlePosts = await fetchPostsFromGoogle(locationId);

    // Save to DB if not exists
    for (const post of googlePosts) {
      await prisma.post.upsert({
        where: { postId: post.postId },
        update: post,
        create: { ...post, locationId },
      });
    }

    // Get from DB
    const posts = await prisma.post.findMany({
      where: { locationId },
      orderBy: { createdAt: 'desc' },
    });

    res.json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
};

export const createPost = async (req, res) => {
  try {
    const { locationId } = req.params;
    const { content, media } = req.body;

    // In real implementation, post to Google Business API
    const newPost = {
      postId: `post_${Date.now()}`,
      content,
      media,
      createdAt: new Date(),
    };

    // Save to DB
    const post = await prisma.post.create({
      data: { ...newPost, locationId },
    });

    res.json(post);
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ error: 'Failed to create post' });
  }
};

export const generateAIPost = async (req, res) => {
  try {
    const { topic, tone = 'professional' } = req.body;

    const prompt = `Generate a social media post for a local business about "${topic}". Make it engaging, ${tone} tone, and include relevant emojis. Keep it under 200 characters.`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 100,
    });

    const aiPost = completion.choices[0].message.content.trim();

    res.json({ aiPost });
  } catch (error) {
    console.error('Error generating AI post:', error);
    res.status(500).json({ error: 'Failed to generate AI post' });
  }
};