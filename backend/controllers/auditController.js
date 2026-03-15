import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Mock audit calculation
const calculateAudit = async (locationId) => {
  // In real implementation, analyze business data
  // For now, mock scores
  const categories = {
    businessDescription: 85,
    primaryCategory: 90,
    photosCount: 75,
    reviewRating: 82,
    reviewFrequency: 70,
  };

  const totalScore = Object.values(categories).reduce((sum, score) => sum + score, 0) / Object.keys(categories).length;

  const suggestions = [
    'Add more photos to improve visual appeal',
    'Update business description with more keywords',
    'Encourage more reviews from customers',
  ];

  return {
    score: Math.round(totalScore),
    categories,
    suggestions,
  };
};

export const getAudit = async (req, res) => {
  try {
    const { locationId } = req.params;

    const audit = await calculateAudit(locationId);

    // Save to DB
    await prisma.auditResult.upsert({
      where: { locationId },
      update: audit,
      create: { ...audit, locationId },
    });

    res.json(audit);
  } catch (error) {
    console.error('Error getting audit:', error);
    res.status(500).json({ error: 'Failed to get audit' });
  }
};