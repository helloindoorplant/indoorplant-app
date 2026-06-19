import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const products = await prisma.product.findMany({
    select: {
      id: true,
      name: true,
      images: true,
    },
    take: 5,
  });

  console.log('--- PRODUCTS IN DATABASE ---');
  for (const p of products) {
    console.log(`Product: ${p.name}`);
    console.log(`Raw Images field: ${p.images}`);
    try {
      const parsed = JSON.parse(p.images);
      console.log(`Parsed:`, parsed);
    } catch (e: any) {
      console.log(`Failed to parse: ${e.message}`);
    }
    console.log('----------------------------');
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());
