import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Mock keyword data
const fetchKeywords = async (locationId) => {
  // In real implementation, use Google Business API for search terms
  return [
    { keyword: 'restaurant near me', impressions: 1250, clicks: 45, date: new Date('2024-01-15') },
    { keyword: 'best pizza', impressions: 890, clicks: 32, date: new Date('2024-01-15') },
    { keyword: 'italian food', impressions: 675, clicks: 28, date: new Date('2024-01-15') },
    { keyword: 'dinner reservations', impressions: 432, clicks: 18, date: new Date('2024-01-15') },
    { keyword: 'family restaurant', impressions: 321, clicks: 15, date: new Date('2024-01-15') },
  ];
};

export const getKeywords = async (req, res) => {
  try {
    const { locationId } = req.params;
    const { startDate, endDate } = req.query;

    const keywords = await fetchKeywords(locationId);

    // Save to DB
    for (const kw of keywords) {
      await prisma.keyword.upsert({
        where: {
          locationId_keyword_date: {
            locationId,
            keyword: kw.keyword,
            date: kw.date,
          },
        },
        update: kw,
        create: { ...kw, locationId },
      });
    }

    // Get from DB with date filter if provided
    let whereClause = { locationId };
    if (startDate && endDate) {
      whereClause.date = {
        gte: new Date(startDate),
        lte: new Date(endDate),
      };
    }

    const data = await prisma.keyword.findMany({
      where: whereClause,
      orderBy: { impressions: 'desc' },
    });

    res.json(data);
  } catch (error) {
    console.error('Error getting keywords:', error);
    res.status(500).json({ error: 'Failed to get keywords' });
  }
};