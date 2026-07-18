'use client';

import { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import { FALLBACK_PLANT_IMAGE } from '@/lib/utils';

interface WatchAndShopProduct {
  id: string;
  name: string;
  slug: string;
  price: number;
  salePrice: number | null;
  stock: number;
  images: string;
}

interface WatchAndShopProps {
  products: WatchAndShopProduct[];
}

const VideoPlayer = ({ videoUrl, discountPercent }: { videoUrl: string; discountPercent: number }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = (e: React.MouseEvent) => {
    e.preventDefault();
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  return (
    <div
      className="block relative overflow-hidden bg-black cursor-pointer group/video"
      style={{ aspectRatio: '9/16' }}
      onClick={togglePlay}
    >
      <video
        ref={videoRef}
        src={videoUrl}
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
      />

      {/* Discount Badge */}
      {discountPercent > 0 && (
        <span
          className="absolute top-3 left-3 text-white text-[10px] font-bold px-2.5 py-1 rounded-full z-10 shadow-lg pointer-events-none"
          style={{ backgroundColor: '#1B4332' }}
        >
          {discountPercent}% discount
        </span>
      )}

      {/* Play/Pause Icon */}
      <div
        className={`absolute inset-0 flex items-center justify-center z-10 pointer-events-none transition-opacity duration-300 ${
          isPlaying ? 'opacity-0 group-hover/video:opacity-100' : 'opacity-100'
        }`}
      >
        <div className="w-12 h-12 rounded-full flex items-center justify-center text-white bg-black/35 backdrop-blur-sm transition-transform duration-300 scale-90 group-hover/video:scale-100">
          {isPlaying ? (
            <Pause className="w-5 h-5 fill-white" />
          ) : (
            <Play className="w-5 h-5 fill-white ml-0.5" />
          )}
        </div>
      </div>
    </div>
  );
};

export function WatchAndShop({ products }: WatchAndShopProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { addItem, setDrawerOpen } = useCartStore();

  const videoUrls = [
    'https://lightgrey-nightingale-217677.hostingersite.com/wp-content/uploads/2026/06/Shop-Video-1.mp4',
    'https://lightgrey-nightingale-217677.hostingersite.com/wp-content/uploads/2026/06/Shop-Video-4.mp4',
    'https://lightgrey-nightingale-217677.hostingersite.com/wp-content/uploads/2026/06/Shop-Video-2.mp4',
    'https://lightgrey-nightingale-217677.hostingersite.com/wp-content/uploads/2026/06/Shop-Video-3.mp4',
    'https://lightgrey-nightingale-217677.hostingersite.com/wp-content/uploads/2026/06/Shop-Video-4.mp4',
  ];

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const scrollAmount = container.clientWidth * 0.75;
      container.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const handleAddToCart = (product: WatchAndShopProduct, coverImage: string) => {
    const currentPrice = product.salePrice || product.price;
    addItem({
      id: product.id,
      name: product.name,
      price: currentPrice,
      image: coverImage,
      quantity: 1,
    });
    setDrawerOpen(true);
  };

  return (
    <section style={{ backgroundColor: '#FAF8F5' }} className="py-16 md:py-24 relative overflow-hidden">
      <style>{`.watch-scroll::-webkit-scrollbar { display: none; }`}</style>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8 md:mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold" style={{ color: '#1B4332' }}>
            Watch and Shop
          </h2>
          <div className="flex items-center gap-2 md:gap-3">
            <button
              onClick={() => scroll('left')}
              className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white shadow-md border border-gray-100 flex items-center justify-center hover:bg-gray-50 active:scale-95 transition-all text-slate-700"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white shadow-md border border-gray-100 flex items-center justify-center hover:bg-gray-50 active:scale-95 transition-all text-slate-700"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
            </button>
          </div>
        </div>

        {/* Carousel */}
        <div
          ref={scrollContainerRef}
          className="watch-scroll flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' } as React.CSSProperties}
        >
          {products.map((product, index) => {
            let productImages: string[] = [];
            try {
              productImages = JSON.parse(product.images);
            } catch {
              productImages = [];
            }
            const coverImage = productImages[0] || FALLBACK_PLANT_IMAGE;
            const videoUrl = videoUrls[index] || videoUrls[0];

            const currentPrice = product.salePrice || product.price;
            const originalPrice = product.price;
            const hasDiscount = product.salePrice && product.salePrice < product.price;
            const discountPercent = hasDiscount
              ? Math.round(((originalPrice - currentPrice) / originalPrice) * 100)
              : 0;
            const inStock = product.stock > 0;

            return (
              <div
                key={product.id}
                className="group bg-white rounded-[20px] overflow-hidden transition-all duration-300 shrink-0 snap-start border border-gray-100"
                style={{ width: 'calc((100% - 48px) / 4)', minWidth: '200px', maxWidth: '280px' }}
              >
                {/* Video Area */}
                <VideoPlayer videoUrl={videoUrl} discountPercent={discountPercent} />

                {/* Product Info */}
                <div className="p-3 sm:p-4 flex flex-col gap-3">
                  <div className="flex items-start gap-2.5">
                    <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full overflow-hidden shrink-0 border border-slate-200">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={coverImage} alt="" className="w-full h-full object-cover" loading="lazy" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-[11px] sm:text-[13px] font-bold text-slate-800 truncate" title={product.name}>
                        {product.name}
                      </h3>
                      <div className="flex items-center gap-1.5 mt-0.5 flex-wrap">
                        <span className="text-[11px] sm:text-[13px] font-extrabold text-black">INR {currentPrice}</span>
                        {hasDiscount && (
                          <span className="text-[9px] sm:text-[10px] text-slate-400 line-through font-medium">
                            INR {originalPrice}
                          </span>
                        )}
                      </div>
                      {discountPercent > 0 && (
                        <span className="text-[9px] sm:text-[10px] font-bold block" style={{ color: '#16a34a' }}>
                          {discountPercent}% Off
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Add to Cart */}
                  {inStock ? (
                    <button
                      onClick={() => handleAddToCart(product, coverImage)}
                      className="w-full text-white text-[12px] sm:text-[13px] font-bold py-2.5 rounded-xl active:scale-[0.97] transition-all shadow-sm cursor-pointer"
                      style={{ backgroundColor: '#1B4332' }}
                    >
                      Add to Cart
                    </button>
                  ) : (
                    <button
                      disabled
                      className="w-full text-white text-[12px] sm:text-[13px] font-bold py-2.5 rounded-xl cursor-not-allowed"
                      style={{ backgroundColor: '#94a3b8' }}
                    >
                      Out Of Stock
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
