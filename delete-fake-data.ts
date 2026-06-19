import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Deleting fake order...');
  
  // Find orders with the dummy order ID prefix or total = 998
  const deletedOrders = await prisma.order.deleteMany({
    where: {
      OR: [
        { orderId: { contains: 'TEST_ORD' } },
        { id: { contains: 'cmqewzrp5' } } // Fallback to the known cuid prefix if needed
      ]
    }
  });
  console.log(`Deleted ${deletedOrders.count} fake orders.`);

  console.log('Deleting fake product...');
  const deletedProducts = await prisma.product.deleteMany({
    where: {
      slug: 'fake-monstera'
    }
  });
  console.log(`Deleted ${deletedProducts.count} fake products.`);
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
