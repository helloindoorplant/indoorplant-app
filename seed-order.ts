import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding fake order...');

  // 1. Find or create the user
  const email = 'helloindoorplant@gmail.com';
  let user = await prisma.user.findUnique({
    where: { email }
  });

  if (!user) {
    user = await prisma.user.create({
      data: {
        email,
        name: 'Admin Test User',
        role: 'ADMIN',
      }
    });
    console.log('Created user:', user.email);
  } else {
    console.log('Found user:', user.email);
  }

  // 2. Find or create a dummy product
  let product = await prisma.product.findFirst({
    where: { slug: 'fake-monstera' }
  });

  if (!product) {
    product = await prisma.product.create({
      data: {
        name: 'Monstera Deliciosa (Test)',
        slug: 'fake-monstera',
        description: 'A beautiful test plant.',
        price: 899,
        stock: 10,
        images: '["https://example.com/monstera.jpg"]',
      }
    });
    console.log('Created product:', product.name);
  }

  // 3. Create an order with items
  const order = await prisma.order.create({
    data: {
      userId: user.id,
      status: 'Processing',
      totalAmount: 998, // 899 + 99 shipping
      orderId: `TEST_ORD_${Math.floor(Math.random() * 10000)}`,
      shippingAddr: '123 Fake Street, Kolkata, WB 700001',
      items: {
        create: [
          {
            productId: product.id,
            quantity: 1,
            price: 899,
          }
        ]
      }
    },
    include: {
      items: true
    }
  });

  console.log('Successfully created fake order!');
  console.log('Order Details:', order);
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
