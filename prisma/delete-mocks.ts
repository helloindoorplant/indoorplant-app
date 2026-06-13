import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const deleted = await prisma.product.deleteMany({
    where: {
      slug: {
        not: "lucky-jade-plant"
      }
    }
  });

  console.log(`Deleted ${deleted.count} mock products. Keep building!`);
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
