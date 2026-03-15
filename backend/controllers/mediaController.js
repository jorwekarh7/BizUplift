import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Mock function to simulate Google Business API
const fetchMediaFromGoogle = async (locationId) => {
  return [
    {
      mediaId: 'media1',
      type: 'image',
      url: 'https://example.com/photo1.jpg',
      createdAt: new Date('2024-01-10'),
    },
    {
      mediaId: 'media2',
      type: 'video',
      url: 'https://example.com/video1.mp4',
      createdAt: new Date('2024-01-08'),
    },
    {
      mediaId: 'media3',
      type: 'image',
      url: 'https://example.com/photo2.jpg',
      createdAt: new Date('2024-01-05'),
    },
  ];
};

export const getMedia = async (req, res) => {
  try {
    const { locationId } = req.params;
    const { type } = req.query;

    // Fetch from Google API
    const googleMedia = await fetchMediaFromGoogle(locationId);

    // Save to DB if not exists
    for (const media of googleMedia) {
      await prisma.media.upsert({
        where: { mediaId: media.mediaId },
        update: media,
        create: { ...media, locationId },
      });
    }

    // Get from DB
    let whereClause = { locationId };
    if (type) {
      whereClause.type = type;
    }

    const media = await prisma.media.findMany({
      where: whereClause,
      orderBy: { createdAt: 'desc' },
    });

    res.json(media);
  } catch (error) {
    console.error('Error fetching media:', error);
    res.status(500).json({ error: 'Failed to fetch media' });
  }
};