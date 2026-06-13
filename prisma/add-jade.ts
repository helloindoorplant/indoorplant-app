import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const categoryName = "Low Maintenance Plants"
  
  // Find category
  const category = await prisma.category.findFirst({
    where: { name: categoryName }
  });

  if (!category) {
    throw new Error(`Category not found: ${categoryName}`);
  }

  const productData = {
    name: "Lucky Jade Plant",
    slug: "lucky-jade-plant",
    description: "A living sculpture that thrives on near-total neglect — its thick, coin-shaped leaves and sturdy branching form have made it a symbol of prosperity and good fortune in Indian homes for generations.",
    price: 649,
    salePrice: 299,
    stock: 50,
    isFeatured: true,
    careLevel: "EASY",
    lightReq: "DIRECT_SUN",
    waterReq: "Water once every 2-3 weeks; allow soil to dry out completely between waterings",
    petFriendly: false,
    airPurifier: false,
    categoryId: category.id,
    images: JSON.stringify([
      "https://indoorplant.in/wp-content/uploads/2026/05/Lucky-Jade-Plant-2.webp",
      "https://indoorplant.in/wp-content/uploads/2026/05/Lucky-Jade-Plant-3.webp",
      "https://indoorplant.in/wp-content/uploads/2026/05/Lucky-Jade-Plant-4.webp",
      "https://indoorplant.in/wp-content/uploads/2026/05/Lucky-Jade-Plant-5.webp"
    ])
  };

  const product = await prisma.product.upsert({
    where: { slug: productData.slug },
    update: productData,
    create: productData,
  });

  console.log('Successfully inserted product: ', product.name);
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
