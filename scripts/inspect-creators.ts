import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const applications = await prisma.creatorApplication.findMany({
    orderBy: { createdAt: 'desc' },
  });
  console.log('Creator Applications:', JSON.stringify(applications, null, 2));
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
