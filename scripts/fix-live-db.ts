import { PrismaClient } from '@prisma/client';
import { plants } from './plants-data-1';
import { plants2 } from './plants-data-2';

const prisma = new PrismaClient();

const validSlugs = new Set([
  ...plants.map(p => p.slug),
  ...plants2.map(p => p.slug),
  'lucky-bamboo-plant-2-layer' // Include lucky bamboo since it's in plants2 or its own script
]);

async function main() {
  console.log('Starting live database fix...');

  const allProducts = await prisma.product.findMany();

  for (const product of allProducts) {
    if (!validSlugs.has(product.slug)) {
      console.log(`Deleting unrecognized product: ${product.name} (${product.slug})`);
      try {
        await prisma.product.delete({ where: { id: product.id } });
        console.log(`  -> Deleted.`);
      } catch (err) {
        console.error(`  -> Failed to delete: ${err}`);
      }
      continue;
    }

    // Fix images
    let images = [];
    try {
      images = JSON.parse(product.images as string);
    } catch (e) {
      console.log(`  Invalid image JSON for ${product.name}`);
      continue;
    }

    let changed = false;
    const newImages = images.map((img: string) => {
      if (img.includes('lightblue-parrot-226040.hostingersite.com')) {
        changed = true;
        return img.replace('lightblue-parrot-226040.hostingersite.com', 'lightgrey-nightingale-217677.hostingersite.com');
      }
      return img;
    });

    if (changed) {
      console.log(`Fixing images for ${product.name}...`);
      await prisma.product.update({
        where: { id: product.id },
        data: { images: JSON.stringify(newImages) }
      });
      console.log(`  -> Updated.`);
    } else {
      console.log(`Images already correct for ${product.name}.`);
    }
  }

  console.log('Database fix complete.');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
