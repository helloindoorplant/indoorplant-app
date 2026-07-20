import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log("Setting up niche categories...");

  // 1. Setup low-light-plants
  let lowLightCat = await prisma.category.findUnique({ where: { slug: 'low-light-plants' } });
  if (!lowLightCat) {
    lowLightCat = await prisma.category.create({
      data: { name: 'Low Light Plants', slug: 'low-light-plants' }
    });
    console.log("Created low-light-plants category.");
  }

  // 2. Assign products < 500 to plants-under-500
  let under500Cat = await prisma.category.findUnique({ where: { slug: 'plants-under-500' } });
  if (!under500Cat) {
    under500Cat = await prisma.category.create({
      data: { name: 'Plants Under ₹500', slug: 'plants-under-500' }
    });
    console.log("Created plants-under-500 category.");
  }
  
  const cheapProducts = await prisma.product.findMany({
    where: { price: { lt: 500 } }
  });
  if (cheapProducts.length > 0) {
    await prisma.category.update({
      where: { id: under500Cat.id },
      data: { products: { connect: cheapProducts.map(p => ({ id: p.id })) } }
    });
    console.log(`Assigned ${cheapProducts.length} products to plants-under-500.`);
  }

  // 3. Assign relevant plants to plants-for-apartments (compact, easy care)
  let apartmentsCat = await prisma.category.findUnique({ where: { slug: 'plants-for-apartments' } });
  if (!apartmentsCat) {
    apartmentsCat = await prisma.category.create({
      data: { name: 'Plants for Apartments', slug: 'plants-for-apartments' }
    });
    console.log("Created plants-for-apartments category.");
  }
  const apartmentProducts = await prisma.product.findMany({
    where: {
      OR: [
        { name: { contains: 'Money' } },
        { name: { contains: 'Pothos' } },
        { name: { contains: 'Jade' } },
        { name: { contains: 'Snake' } },
        { name: { contains: 'Aglaonema' } }
      ]
    }
  });
  if (apartmentProducts.length > 0) {
    await prisma.category.update({
      where: { id: apartmentsCat.id },
      data: { products: { connect: apartmentProducts.map(p => ({ id: p.id })) } }
    });
    console.log(`Assigned ${apartmentProducts.length} products to plants-for-apartments.`);
  }

  // 4. Assign relevant plants to low-light-plants (shade tolerant)
  const lowLightProducts = await prisma.product.findMany({
    where: {
      OR: [
        { name: { contains: 'Aglaonema' } },
        { name: { contains: 'ZZ' } },
        { name: { contains: 'Snake' } },
        { name: { contains: 'Pothos' } },
        { name: { contains: 'Money' } }
      ]
    }
  });
  if (lowLightProducts.length > 0) {
    await prisma.category.update({
      where: { id: lowLightCat.id },
      data: { products: { connect: lowLightProducts.map(p => ({ id: p.id })) } }
    });
    console.log(`Assigned ${lowLightProducts.length} products to low-light-plants.`);
  }

  console.log("Niche categories setup complete.");
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
