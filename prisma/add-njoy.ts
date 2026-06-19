import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const categoryName = "Low Maintenance Plants"
  
  const category = await prisma.category.findFirst({
    where: { name: categoryName }
  });

  if (!category) {
    throw new Error(`Category not found: ${categoryName}`);
  }

  const productData = {
    name: "N'Joy Money Plant",
    slug: "njoy-money-plant",
    description: "The N'Joy Money Plant features beautiful white and green variegation on its compact, trailing leaves. It's a striking addition to any room and incredibly forgiving for beginners.",
    price: 878,
    salePrice: 299,
    stock: 50,
    isFeatured: true,
    careLevel: "EASY",
    lightReq: "MEDIUM",
    waterReq: "Water once a week; allow top inch of soil to dry",
    petFriendly: false,
    airPurifier: true,
    images: JSON.stringify([
      "https://lightgrey-nightingale-217677.hostingersite.com/wp-content/uploads/2026/05/NJoy-Money-Plant-2.webp",
      "https://lightgrey-nightingale-217677.hostingersite.com/wp-content/uploads/2026/05/NJoy-Money-Plant-3.webp"
    ])
  };

  const product = await prisma.product.upsert({
    where: { slug: productData.slug },
    update: { ...productData, categories: { set: [{ id: category.id }] } },
    create: { ...productData, categories: { connect: [{ id: category.id }] } },
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
