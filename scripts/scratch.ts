import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const categories = await prisma.category.findMany({
    include: {
      _count: {
        select: { products: true }
      }
    }
  });
  console.log(categories.map((c: any) => `${c.slug}: ${c._count.products} products`).join('\n'));
}
main().catch(console.error);
