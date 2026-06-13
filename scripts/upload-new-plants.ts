import { PrismaClient } from '@prisma/client';
import { plants } from './plants-data-1';
import { plants2 } from './plants-data-2';

const prisma = new PrismaClient();

async function main() {
  const allPlants = [...plants, ...plants2];
  
  console.log(`Starting upload of ${allPlants.length} plants...`);

  for (const plant of allPlants) {
    // Ensure category exists
    const category = await prisma.category.upsert({
      where: { slug: plant.categorySlug },
      update: { name: plant.categoryName },
      create: {
        name: plant.categoryName,
        slug: plant.categorySlug,
        description: `Browse our collection of ${plant.categoryName}`,
      }
    });

    // Upsert the product
    const product = await prisma.product.upsert({
      where: { slug: plant.slug },
      update: {
        name: plant.name,
        description: plant.description,
        price: plant.price,
        salePrice: plant.salePrice,
        stock: plant.stock,
        isFeatured: plant.isFeatured,
        careLevel: plant.careLevel,
        lightReq: plant.lightReq,
        waterReq: plant.waterReq,
        petFriendly: plant.petFriendly,
        airPurifier: plant.airPurifier,
        images: plant.images,
        faqs: plant.faqs,
        categories: { set: [{ id: category.id }] }
      },
      create: {
        name: plant.name,
        slug: plant.slug,
        description: plant.description,
        price: plant.price,
        salePrice: plant.salePrice,
        stock: plant.stock,
        isFeatured: plant.isFeatured,
        careLevel: plant.careLevel,
        lightReq: plant.lightReq,
        waterReq: plant.waterReq,
        petFriendly: plant.petFriendly,
        airPurifier: plant.airPurifier,
        images: plant.images,
        faqs: plant.faqs,
        categories: { connect: [{ id: category.id }] }
      }
    });

    console.log(`✅ Upserted ${product.name}`);
  }

  console.log("Upload complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
