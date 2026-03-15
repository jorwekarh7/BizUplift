import { PrismaClient } from '@prisma/client';
import OpenAI from 'openai';

const prisma = new PrismaClient();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const generateAIImage = async (req, res) => {
  try {
    const { prompt, category, userId } = req.body;

    // Check user credits (mock implementation)
    const userCredits = await prisma.credit.findFirst({
      where: { userId, type: 'ai' },
    });

    if (!userCredits || userCredits.amount <= 0) {
      return res.status(400).json({ error: 'Insufficient credits' });
    }

    // Generate image using OpenAI DALL-E
    const imageResponse = await openai.images.generate({
      model: 'dall-e-3',
      prompt: prompt,
      size: '1024x1024',
      quality: 'standard',
      n: 1,
    });

    const imageUrl = imageResponse.data[0].url;

    // Save to DB
    const aiImage = await prisma.aiImage.create({
      data: {
        userId,
        prompt,
        url: imageUrl,
        category,
      },
    });

    // Deduct credit
    await prisma.credit.update({
      where: { id: userCredits.id },
      data: { amount: userCredits.amount - 1 },
    });

    res.json(aiImage);
  } catch (error) {
    console.error('Error generating AI image:', error);
    res.status(500).json({ error: 'Failed to generate AI image' });
  }
};

export const getAIImages = async (req, res) => {
  try {
    const { userId, category } = req.query;

    const whereClause = { userId };
    if (category) {
      whereClause.category = category;
    }

    const images = await prisma.aiImage.findMany({
      where: whereClause,
      orderBy: { createdAt: 'desc' },
    });

    res.json(images);
  } catch (error) {
    console.error('Error fetching AI images:', error);
    res.status(500).json({ error: 'Failed to fetch AI images' });
  }
};

export const getUserCredits = async (req, res) => {
  try {
    const { userId } = req.params;

    const credits = await prisma.credit.findMany({
      where: { userId, type: 'ai' },
    });

    const totalCredits = credits.reduce((sum, credit) => sum + credit.amount, 0);

    res.json({ totalCredits });
  } catch (error) {
    console.error('Error fetching user credits:', error);
    res.status(500).json({ error: 'Failed to fetch user credits' });
  }
};