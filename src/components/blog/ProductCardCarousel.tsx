'use client';

import { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ProductCard } from '@/components/shared/ProductCard';
import { motion } from 'framer-motion';

interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  salePrice: number | null;
  images: string;
  isFeatured: boolean;
  reviews: { rating: number }[];
}

interface ProductCardCarouselProps {
  products: Product[];
}

export function ProductCardCarousel({ products }: ProductCardCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Check scroll position to show/hide arrows
  const checkScroll = () => {
    if (containerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);
    }
  };

  useEffect(() => {
    const el = containerRef.current;
    if (el) {
      el.addEventListener('scroll', checkScroll);
      // Initial check
      checkScroll();
      
      // Re-check on window resize
      window.addEventListener('resize', checkScroll);
    }
    return () => {
      if (el) el.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, [products]);

  const scroll = (direction: 'left' | 'right') => {
    if (containerRef.current) {
      const { clientWidth } = containerRef.current;
      const scrollAmount = direction === 'left' ? -clientWidth * 0.75 : clientWidth * 0.75;
      containerRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  if (!products || products.length === 0) return null;

  return (
    <div className="relative my-16 bg-gradient-to-b from-stone-50/50 to-white py-12 px-6 sm:px-12 rounded-[32px] border border-emerald-800/10 shadow-sm overflow-hidden">
      {/* Background soft glow */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-emerald-500/5 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-primary/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <span className="inline-block px-3 py-1 bg-emerald-100/80 text-emerald-800 text-xs font-bold uppercase tracking-wider rounded-full mb-3">
            Shop the Guide
          </span>
          <h2 className="text-3xl font-extrabold text-stone-900 font-playfair tracking-tight">
            Featured Plants in this Article
          </h2>
          <p className="text-stone-500 text-sm mt-1 max-w-xl font-medium">
            Get these beautiful, Indian-home-optimized decorative plants delivered safely to your doorstep.
          </p>
        </div>
        
        {/* Navigation buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
            className={`w-12 h-12 rounded-full border border-stone-200 bg-white flex items-center justify-center text-stone-700 transition-all hover:bg-emerald-50 hover:border-emerald-200 active:scale-95 disabled:opacity-40 disabled:pointer-events-none shadow-sm`}
            aria-label="Scroll left"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
            className={`w-12 h-12 rounded-full border border-stone-200 bg-white flex items-center justify-center text-stone-700 transition-all hover:bg-emerald-50 hover:border-emerald-200 active:scale-95 disabled:opacity-40 disabled:pointer-events-none shadow-sm`}
            aria-label="Scroll right"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Carousel list container */}
      <div 
        ref={containerRef}
        className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-none pb-6 -mx-4 px-4 sm:-mx-6 sm:px-6"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {products.map((product) => {
          let imageUrl = '';
          try {
            const parsed = JSON.parse(product.images);
            imageUrl = parsed[0] || '';
          } catch (e) {
            imageUrl = product.images;
          }
          
          const reviewsCount = product.reviews?.length || 0;
          const rating = reviewsCount > 0 
            ? Number((product.reviews.reduce((acc, r) => acc + r.rating, 0) / reviewsCount).toFixed(1)) 
            : 5.0;

          return (
            <motion.div
              key={product.id}
              className="w-[280px] sm:w-[320px] shrink-0 snap-start"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <ProductCard
                id={product.slug}
                name={product.name}
                tagline={product.description.substring(0, 70) + "..."}
                price={product.salePrice || product.price}
                originalPrice={product.salePrice ? product.price : undefined}
                rating={rating}
                reviewsCount={reviewsCount}
                image={imageUrl}
                badge={product.isFeatured ? "Bestseller" : undefined}
              />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
