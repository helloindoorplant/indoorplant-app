'use client';
import { useEffect } from 'react';
import { useUserStore } from '@/store/useUserStore';

export function RecentlyViewedTracker({ product }: { product: any }) {
  const addRecentlyViewed = useUserStore(state => state.addRecentlyViewed);
  
  useEffect(() => {
    if (product) {
      // Format the prisma product into the store's Product type
      const images = typeof product.images === 'string' ? JSON.parse(product.images) : product.images;
      
      const formattedProduct = {
        id: product.id,
        name: product.name,
        slug: product.slug,
        price: product.salePrice || product.price,
        originalPrice: product.salePrice ? product.price : undefined,
        images: images,
        tagline: product.description?.substring(0, 100) || '',
        category: product.category?.name || 'Plant',
      };
      
      addRecentlyViewed(formattedProduct as any);
    }
  }, [product, addRecentlyViewed]);

  return null;
}
