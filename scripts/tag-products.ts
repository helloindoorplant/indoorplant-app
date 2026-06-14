import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log("Starting product category tagging...");

  // Get or create the four main categories
  const airPurifierCat = await prisma.category.upsert({
    where: { slug: 'air-purifying-plants' },
    update: { name: 'Air Purifying Plants' },
    create: { name: 'Air Purifying Plants', slug: 'air-purifying-plants', description: 'NASA-tested air purifying plants for fresh indoor air.' }
  });

  const lowMaintCat = await prisma.category.upsert({
    where: { slug: 'low-maintenance-plants' },
    update: { name: 'Low Maintenance Plants' },
    create: { name: 'Low Maintenance Plants', slug: 'low-maintenance-plants', description: 'Hard to kill plants for beginners and busy schedules.' }
  });

  const petFriendlyCat = await prisma.category.upsert({
    where: { slug: 'pet-friendly-plants' },
    update: { name: 'Pet Friendly Plants' },
    create: { name: 'Pet Friendly Plants', slug: 'pet-friendly-plants', description: 'ASPCA-verified non-toxic plants safe for dogs and cats.' }
  });

  const bedroomCat = await prisma.category.upsert({
    where: { slug: 'bedroom-plants' },
    update: { name: 'Bedroom Plants' },
    create: { name: 'Bedroom Plants', slug: 'bedroom-plants', description: 'Plants that release oxygen at night for better sleep.' }
  });

  // Fetch all products
  const products = await prisma.product.findMany();
  console.log(`Found ${products.length} products to tag.`);

  for (const product of products) {
    const categoriesToConnect = [];

    // 1. Air Purifying
    if (product.airPurifier) {
      categoriesToConnect.push({ id: airPurifierCat.id });
    }

    // 2. Low Maintenance
    if (product.careLevel === 'EASY') {
      categoriesToConnect.push({ id: lowMaintCat.id });
    }

    // 3. Pet Friendly
    if (product.petFriendly) {
      categoriesToConnect.push({ id: petFriendlyCat.id });
    }

    // 4. Bedroom Plants (Snake plants, Aloe Vera, Palms, or Low Light)
    const nameLower = product.name.toLowerCase();
    if (
      nameLower.includes("snake") ||
      nameLower.includes("aloe") ||
      nameLower.includes("palm") ||
      product.lightReq === "LOW"
    ) {
      categoriesToConnect.push({ id: bedroomCat.id });
    }

    if (categoriesToConnect.length > 0) {
      await prisma.product.update({
        where: { id: product.id },
        data: {
          categories: {
            connect: categoriesToConnect
          }
        }
      });
      console.log(`Tagged ${product.name} to ${categoriesToConnect.length} categories.`);
    }
  }

  console.log("Category tagging complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
