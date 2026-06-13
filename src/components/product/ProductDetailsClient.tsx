'use client';

import { useState } from 'react';
import { ImageGallery } from '@/components/product/ImageGallery';
import { ProductInfo } from '@/components/product/ProductInfo';

interface ProductDetailsClientProps {
  product: any;
  initialImages: string[];
}

export function ProductDetailsClient({ product, initialImages }: ProductDetailsClientProps) {
  const [activeImages, setActiveImages] = useState<string[]>(initialImages);

  const handlePotColorChange = (newImage: string | null) => {
    if (newImage) {
      // Create a new array with the selected pot image as the first image
      setActiveImages([newImage, ...initialImages.filter(img => img !== newImage)]);
    } else {
      setActiveImages(initialImages);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-24 items-start">
      <div className="lg:sticky lg:top-24">
        <ImageGallery images={activeImages} />
      </div>
      <ProductInfo product={product} onPotColorChange={handlePotColorChange} />
    </div>
  );
}
