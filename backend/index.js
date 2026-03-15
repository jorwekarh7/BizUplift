import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

dotenv.config();

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(helmet());
app.use(morgan('combined'));
app.use(express.json());

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'LocalRank AI Backend API' });
});

// Routes
import reviewsRoutes from './routes/reviews.js';
import auditRoutes from './routes/audit.js';
import competitorRoutes from './routes/competitor.js';
import keywordsRoutes from './routes/keywords.js';
import reportsRoutes from './routes/reports.js';
import postsRoutes from './routes/posts.js';
import aiImagesRoutes from './routes/aiImages.js';
import mediaRoutes from './routes/media.js';
import subscriptionsRoutes from './routes/subscriptions.js';
import settingsRoutes from './routes/settings.js';

app.use('/api/reviews', reviewsRoutes);
app.use('/api/audit', auditRoutes);
app.use('/api/competitor', competitorRoutes);
app.use('/api/keywords', keywordsRoutes);
app.use('/api/reports', reportsRoutes);
app.use('/api/posts', postsRoutes);
app.use('/api/ai-images', aiImagesRoutes);
app.use('/api/media', mediaRoutes);
app.use('/api/subscriptions', subscriptionsRoutes);
app.use('/api/settings', settingsRoutes);

// Other routes will be added here
// app.use('/api/auth', authRoutes);
// app.use('/api/business', businessRoutes);
// etc.

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Graceful shutdown
process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit(0);
});