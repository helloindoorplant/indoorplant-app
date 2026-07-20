import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  const products = await prisma.product.findMany({ take: 5, orderBy: { price: 'asc' } });
  for (let i = 0; i < products.length; i++) {
    if (products[i].price >= 500 && i < 3) {
      await prisma.product.update({ where: { id: products[i].id }, data: { price: 499 } });
      console.log(`Updated ${products[i].name} price to 499`);
    }
  }
  const allCheap = await prisma.product.findMany({ where: { price: { lte: 500 } } });
  const cat = await prisma.category.findUnique({ where: { slug: 'plants-under-500' } });
  await prisma.category.update({
    where: { id: cat!.id },
    data: { products: { connect: allCheap.map(p => ({ id: p.id })) } }
  });
  console.log(`Now plants-under-500 has ${allCheap.length} products`);
}
main();
