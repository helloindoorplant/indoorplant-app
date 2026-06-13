import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding admin user...');

  const email = 'admin@indoorplant.in';
  const password = 'Admin@123';
  const passwordHash = await bcrypt.hash(password, 10);

  const admin = await prisma.user.upsert({
    where: { email },
    update: {
      role: 'ADMIN',
      passwordHash,
    },
    create: {
      email,
      name: 'Store Admin',
      role: 'ADMIN',
      passwordHash,
    },
  });

  console.log('Admin user seeded successfully:', admin.email);

  console.log('Seeding Site Settings...');
  await prisma.siteSettings.upsert({
    where: { id: 'global' },
    update: {},
    create: {
      id: 'global',
      storeName: 'IndoorPlant.in',
      supportEmail: 'support@indoorplant.in',
      aiEnabled: true,
      aiTemperature: 0.7,
      aiPromptContext: 'You are an expert plant care assistant named AI Advisor for IndoorPlant.in.',
    },
  });

  console.log('Site settings seeded successfully.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
