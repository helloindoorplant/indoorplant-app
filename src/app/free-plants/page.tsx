import prisma from '@/lib/prisma';
import { CreatorsLanding } from '@/components/creators/CreatorsLanding';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Free Plant for Creators — IndoorPlant.in Creator Program',
  description: 'Get a free indoor plant. Create a beautiful video. Collaborate with IndoorPlant.in. Apply now to join our creator program.',
  openGraph: {
    title: 'Free Plant for Creators — IndoorPlant.in',
    description: 'Get a free indoor plant, create content, and grow with us. No follower minimum. Real creators only.',
    url: 'https://indoorplant.in/free-plants',
  },
};

export default async function CreatorsPage() {
  const products = await prisma.product.findMany({
    select: {
      id: true,
      name: true,
      slug: true,
      images: true,
      price: true,
      salePrice: true,
    },
    orderBy: { name: 'asc' },
  });

  // Parse images for client consumption
  const serializedProducts = products.map((p) => {
    let firstImage = '';
    try {
      const imgs = JSON.parse(p.images);
      firstImage = Array.isArray(imgs) && imgs.length > 0 ? imgs[0] : '';
    } catch {
      firstImage = '';
    }
    return {
      id: p.id,
      name: p.name,
      slug: p.slug,
      image: firstImage,
      price: p.salePrice || p.price,
    };
  });

  return <CreatorsLanding products={serializedProducts} />;
}
