import { PrismaClient } from '@prisma/client';
import { plants2 } from './plants-data-2';

const prisma = new PrismaClient();

async function main() {
  const plant = plants2.find(p => p.slug === 'lucky-bamboo-plant-2-layer');
  if (!plant) {
    throw new Error("Lucky Bamboo Plant 2 Layer data not found in plants2");
  }

  console.log(`Starting upload of Lucky Bamboo Plant 2 Layer...`);

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
