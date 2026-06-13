import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const categories = [
  "All Plants",
  "Low Maintenance Plants",
  "Air Purifying Plants",
  "Money Plants",
  "Vastu Lucky Plants",
  "Pet Friendly Plants",
  "Gifting Plants",
  "Rare Exotic Plants",
  "Office Desk Plants",
  "Bedroom Plants",
  "Living Room Plants",
  "Balcony Plants",
  "Plants Under 500",
  "Plants Under 400",
  "Aglaonema Plants",
  "Monstera Plants",
  "Foliage Plants",
  "Variegated Plants",
  "Plants For Apartments",
  "Housewarming Plants",
  "Plants With Self Watering Pot",
  "Feng Shui Plants",
  "Succulents Jade Plants",
  "Tropical Indoor Plants",
  "Diwali Gift Plants",
  "Corporate Gifting Plants",
  "Plants For Home Decor",
  "Plants For Beginners",
  "Pothos Money Plant Varieties",
  "Plants That Grow In Water"
];

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
}

async function main() {
  console.log("Starting to seed categories...");
  
  let count = 0;
  for (const name of categories) {
    const slug = slugify(name);
    await prisma.category.upsert({
      where: { slug },
      update: {},
      create: {
        name,
        slug
      }
    });
    count++;
  }

  console.log(`Successfully seeded ${count} categories!`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
