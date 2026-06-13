import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const products = await prisma.product.findMany();
  console.log(`Found ${products.length} products:`);
  products.forEach(p => console.log(`- ${p.name}`));
}

main().catch(console.error).finally(() => prisma.$disconnect());
