'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { FALLBACK_PLANT_IMAGE } from '@/lib/utils';

interface ImageGalleryProps {
  images: string[];
}

export function ImageGallery({ images }: ImageGalleryProps) {
  const displayImages = images && images.length > 0 ? images : [FALLBACK_PLANT_IMAGE];
  const [activeImage, setActiveImage] = useState(displayImages[0]);

  useEffect(() => {
    setActiveImage(displayImages[0]);
  }, [images]);

  return (
    <div className="flex flex-col gap-4 lg:gap-6 sticky top-28">
      {/* Main Image */}
      <div className="relative w-full aspect-square rounded-[40px] overflow-hidden bg-[#F8FFF9] border border-primary/10 shadow-sm group">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10" />
        {activeImage && (
          <Image 
            src={activeImage} 
            alt="Product image" 
            fill 
            className="object-cover transition-transform duration-700 group-hover:scale-105" 
          />
        )}
      </div>

      {/* Thumbnails */}
      <div className="flex gap-4 overflow-x-auto pb-2 hide-scrollbar scroll-smooth snap-x snap-mandatory touch-pan-x w-full">
        {displayImages.map((img, idx) => (
          <button 
            key={idx} 
            onClick={() => setActiveImage(img)}
            className={`relative w-24 h-24 shrink-0 rounded-[20px] overflow-hidden border-2 transition-all duration-300 snap-center ${activeImage === img ? 'border-primary ring-4 ring-primary/10 scale-[0.98] shadow-sm' : 'border-transparent hover:border-primary/40 bg-secondary/20'}`}
          >
            <Image 
              src={img} 
              alt={`Thumbnail ${idx + 1}`} 
              fill 
              className="object-cover" 
            />
            <div className={`absolute inset-0 bg-black/5 ${activeImage === img ? 'opacity-0' : 'opacity-100'}`} />
          </button>
        ))}
      </div>
    </div>
  );
}
