import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Mock competitor data
const fetchCompetitors = async (locationId) => {
  // In real implementation, use Google Places API
  return [
    {
      competitorName: 'Competitor A',
      rating: 4.3,
      reviewCount: 150,
      photosCount: 25,
      videosCount: 5,
    },
    {
      competitorName: 'Competitor B',
      rating: 4.1,
      reviewCount: 120,
      photosCount: 18,
      videosCount: 3,
    },
    {
      competitorName: 'Competitor C',
      rating: 4.5,
      reviewCount: 200,
      photosCount: 35,
      videosCount: 8,
    },
  ];
};

export const getCompetitors = async (req, res) => {
  try {
    const { locationId } = req.params;

    const competitors = await fetchCompetitors(locationId);

    // Save to DB
    for (const comp of competitors) {
      await prisma.competitorAnalysis.upsert({
        where: {
          locationId_competitorName: {
            locationId,
            competitorName: comp.competitorName,
          },
        },
        update: comp,
        create: { ...comp, locationId },
      });
    }

    // Get from DB
    const data = await prisma.competitorAnalysis.findMany({
      where: { locationId },
    });

    res.json(data);
  } catch (error) {
    console.error('Error getting competitors:', error);
    res.status(500).json({ error: 'Failed to get competitors' });
  }
};