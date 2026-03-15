import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Mock subscription plans
const plans = {
  free: { name: 'Free', price: 0, credits: 5, features: ['Basic reviews', 'Limited reports'] },
  pro: { name: 'Pro', price: 29, credits: 100, features: ['All reviews', 'Full reports', 'AI replies', 'Posts management'] },
  agency: { name: 'Agency', price: 99, credits: 500, features: ['Everything', 'Multiple locations', 'White-label', 'Priority support'] },
};

export const getPlans = async (req, res) => {
  try {
    res.json(plans);
  } catch (error) {
    console.error('Error getting plans:', error);
    res.status(500).json({ error: 'Failed to get plans' });
  }
};

export const getUserSubscription = async (req, res) => {
  try {
    const { userId } = req.params;

    const subscription = await prisma.subscription.findFirst({
      where: { userId, status: 'active' },
      orderBy: { createdAt: 'desc' },
    });

    res.json(subscription);
  } catch (error) {
    console.error('Error getting user subscription:', error);
    res.status(500).json({ error: 'Failed to get subscription' });
  }
};

export const upgradeSubscription = async (req, res) => {
  try {
    const { userId } = req.params;
    const { plan } = req.body;

    if (!plans[plan]) {
      return res.status(400).json({ error: 'Invalid plan' });
    }

    // Cancel existing active subscription
    await prisma.subscription.updateMany({
      where: { userId, status: 'active' },
      data: { status: 'cancelled' },
    });

    // Create new subscription
    const subscription = await prisma.subscription.create({
      data: {
        userId,
        plan,
        status: 'active',
        startDate: new Date(),
        endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
      },
    });

    // Add credits
    await prisma.credit.create({
      data: {
        userId,
        type: 'ai',
        amount: plans[plan].credits,
      },
    });

    res.json(subscription);
  } catch (error) {
    console.error('Error upgrading subscription:', error);
    res.status(500).json({ error: 'Failed to upgrade subscription' });
  }
};