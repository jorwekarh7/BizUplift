import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Mock report data
const fetchReports = async (locationId) => {
  // In real implementation, use Google Business API for performance data
  return [
    {
      websiteClicks: 45,
      callClicks: 23,
      directionsRequests: 12,
      bookings: 8,
      impressions: 1250,
      date: new Date('2024-01-15'),
    },
    {
      websiteClicks: 52,
      callClicks: 28,
      directionsRequests: 15,
      bookings: 10,
      impressions: 1380,
      date: new Date('2024-01-14'),
    },
    {
      websiteClicks: 38,
      callClicks: 19,
      directionsRequests: 9,
      bookings: 6,
      impressions: 1120,
      date: new Date('2024-01-13'),
    },
  ];
};

export const getReports = async (req, res) => {
  try {
    const { locationId } = req.params;
    const { startDate, endDate } = req.query;

    const reports = await fetchReports(locationId);

    // Save to DB
    for (const report of reports) {
      await prisma.report.upsert({
        where: {
          locationId_date: {
            locationId,
            date: report.date,
          },
        },
        update: report,
        create: { ...report, locationId },
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

    const data = await prisma.report.findMany({
      where: whereClause,
      orderBy: { date: 'desc' },
    });

    res.json(data);
  } catch (error) {
    console.error('Error getting reports:', error);
    res.status(500).json({ error: 'Failed to get reports' });
  }
};