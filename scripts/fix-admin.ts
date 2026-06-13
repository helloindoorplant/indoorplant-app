// @ts-nocheck
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function fixAdmin() {
  const hash = await bcrypt.hash('Admin123', 10);
  
  await prisma.user.update({
    where: { email: 'admin@indoorplant.in' },
    data: { passwordHash: hash }
  });
  
  console.log('Admin password updated to: Admin123');
}

fixAdmin().catch(console.error).finally(() => prisma.$disconnect());
