import prisma from '@/lib/prisma';
import CareClient from './CareClient';

export const metadata = {
  title: 'AI Plant Care Guide & Assistant | IndoorPlant.in',
  description: 'Interactive AI-powered care instructions, seasonal watering schedules, light tuning, and custom troubleshooting for all IndoorPlant.in plants.',
  keywords: ['plant care guide India', 'indoor plant maintenance', 'how to water plants', 'plant care helper AI']
};

export default async function CarePage() {
  // Fetch all products to display as selection options
  const products = await prisma.product.findMany({
    select: {
      id: true,
      name: true,
      slug: true,
      description: true,
      careLevel: true,
      lightReq: true,
      waterReq: true,
      petFriendly: true,
      images: true
    },
    orderBy: {
      name: 'asc'
    }
  });

  // Safe image parsing helper
  const parsedProducts = products.map((prod) => {
    let imageUrl = 'https://images.unsplash.com/photo-1545241047-6083a36cb15f?auto=format&fit=crop&w=400&q=80'; // fallback plant image
    try {
      if (prod.images) {
        const parsed = JSON.parse(prod.images);
        if (Array.isArray(parsed) && parsed.length > 0) {
          imageUrl = parsed[0];
        }
      }
    } catch (e) {
      console.error('Failed to parse images for product:', prod.name, e);
    }

    return {
      id: prod.id,
      name: prod.name,
      slug: prod.slug,
      description: prod.description,
      careLevel: prod.careLevel,
      lightReq: prod.lightReq,
      waterReq: prod.waterReq,
      petFriendly: prod.petFriendly,
      imageUrl
    };
  });

  return <CareClient products={parsedProducts} />;
}
