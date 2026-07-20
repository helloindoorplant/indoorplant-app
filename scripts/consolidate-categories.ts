import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log("Starting category consolidation...");

  const mappings = [
    { from: 'air-purifying', to: 'air-purifying-plants' },
    { from: 'low-maintenance', to: 'low-maintenance-plants' },
    { from: 'pet-safe', to: 'pet-friendly-plants' },
  ];

  for (const mapping of mappings) {
    const fromCategory = await prisma.category.findUnique({
      where: { slug: mapping.from },
      include: { products: true }
    });
    
    if (!fromCategory) {
      console.log(`Source category ${mapping.from} not found, skipping.`);
      continue;
    }

    let toCategory = await prisma.category.findUnique({
      where: { slug: mapping.to }
    });

    if (!toCategory) {
      console.log(`Target category ${mapping.to} not found. Creating it.`);
      toCategory = await prisma.category.create({
        data: {
          name: mapping.from.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') + ' Plants',
          slug: mapping.to,
        }
      });
    }

    // Connect products to target category
    if (fromCategory.products.length > 0) {
      await prisma.category.update({
        where: { id: toCategory.id },
        data: {
          products: {
            connect: fromCategory.products.map(p => ({ id: p.id }))
          }
        }
      });
      console.log(`Moved ${fromCategory.products.length} products from ${mapping.from} to ${mapping.to}.`);
    }

    // Delete source category
    await prisma.category.delete({
      where: { id: fromCategory.id }
    });
    console.log(`Deleted ${mapping.from}.`);
  }

  // Add Snake Plant and Aloe Vera to bedroom-plants
  const bedroomCategory = await prisma.category.findUnique({
    where: { slug: 'bedroom-plants' }
  });

  if (bedroomCategory) {
    const productsToAdd = await prisma.product.findMany({
      where: {
        OR: [
          { name: { contains: 'Snake' } },
          { name: { contains: 'Aloe' } },
          { name: { contains: 'Sansevieria' } }
        ]
      },
      take: 2 // We just need enough to get the count to >= 3 (currently has 1)
    });

    if (productsToAdd.length > 0) {
      await prisma.category.update({
        where: { id: bedroomCategory.id },
        data: {
          products: {
            connect: productsToAdd.map(p => ({ id: p.id }))
          }
        }
      });
      console.log(`Added ${productsToAdd.length} products to bedroom-plants.`);
    }
  }

  console.log("Consolidation complete.");
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
