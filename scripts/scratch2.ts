import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const products = await prisma.product.findMany({
    include: {
      categories: true
    }
  });
  
  for (const product of products) {
    console.log(`Product: ${product.name}`);
    console.log(`Categories: ${product.categories.map(c => c.slug).join(', ')}`);
    console.log('---');
  }
}
main().catch(console.error);
