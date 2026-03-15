import { PrismaClient } from '@prisma/client';
import OpenAI from 'openai';

const prisma = new PrismaClient();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Mock function to simulate Google Business API
const fetchReviewsFromGoogle = async (locationId) => {
  // In real implementation, use googleapis to fetch reviews
  // For now, return mock data
  return [
    {
      reviewId: 'review1',
      reviewerName: 'John Doe',
      rating: 5,
      comment: 'Great service! Highly recommend.',
      date: new Date('2024-01-15'),
    },
    {
      reviewId: 'review2',
      reviewerName: 'Jane Smith',
      rating: 4,
      comment: 'Good experience overall.',
      date: new Date('2024-01-10'),
    },
  ];
};

export const getReviews = async (req, res) => {
  try {
    const { locationId } = req.params;

    // Fetch from Google API
    const googleReviews = await fetchReviewsFromGoogle(locationId);

    // Save to DB if not exists
    for (const review of googleReviews) {
      await prisma.review.upsert({
        where: { reviewId: review.reviewId },
        update: review,
        create: { ...review, locationId },
      });
    }

    // Get from DB
    const reviews = await prisma.review.findMany({
      where: { locationId },
      include: { reply: true },
    });

    res.json(reviews);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
};

export const replyToReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const { replyText } = req.body;

    // In real implementation, post to Google Business API
    // For now, just save to DB

    const reply = await prisma.reviewReply.create({
      data: {
        reviewId,
        replyText,
      },
    });

    res.json(reply);
  } catch (error) {
    console.error('Error replying to review:', error);
    res.status(500).json({ error: 'Failed to reply to review' });
  }
};

export const generateAIReply = async (req, res) => {
  try {
    const { reviewText, rating } = req.body;

    const prompt = `Generate a professional reply to this customer review: "${reviewText}" with rating ${rating}/5. Keep it positive and helpful.`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 150,
    });

    const aiReply = completion.choices[0].message.content.trim();

    res.json({ aiReply });
  } catch (error) {
    console.error('Error generating AI reply:', error);
    res.status(500).json({ error: 'Failed to generate AI reply' });
  }
};