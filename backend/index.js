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

// Routes will be added here
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