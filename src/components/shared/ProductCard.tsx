'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, Star, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FALLBACK_PLANT_IMAGE } from '@/lib/utils';
import { useCartStore } from '@/store/useCartStore';
import { useUserStore } from '@/store/useUserStore';

interface ProductCardProps {
  id: string;
  name: string;
  tagline: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  image: string;
  badge?: string;
}

export function ProductCard({ id, name, tagline, price, originalPrice, rating, reviewsCount, image, badge }: ProductCardProps) {
  const { addItem, setDrawerOpen } = useCartStore();
  const { isInWishlist, addToWishlist, removeFromWishlist } = useUserStore();
  
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const isWishlisted = mounted ? isInWishlist(id) : false;

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isWishlisted) {
      removeFromWishlist(id);
    } else {
      addToWishlist({
        id,
        slug: id,
        name,
        tagline,
        price,
        originalPrice,
        rating,
        reviewsCount,
        images: [image || FALLBACK_PLANT_IMAGE],
      } as any);
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem({
      id,
      name,
      price,
      image: image || FALLBACK_PLANT_IMAGE,
      quantity: 1,
      size: "Standard"
    });
    setDrawerOpen(true);
  };

  return (
    <div className="group relative flex flex-col bg-white rounded-[24px] border border-border/40 p-4 transition-all duration-300 hover:shadow-[0_12px_40px_rgb(45,106,79,0.12)] hover:-translate-y-1">
      {/* Full Card Clickable Overlay */}
      <Link href={`/product/${id}`} className="absolute inset-0 z-0 rounded-[24px]" aria-label={`View ${name} details`} />

      {/* Wishlist Button */}
      <button 
        onClick={handleWishlistClick}
        className={`absolute right-6 top-6 z-10 flex h-9 w-9 items-center justify-center rounded-full backdrop-blur-md transition-all hover:scale-110 shadow-sm ${
          isWishlisted 
            ? 'bg-red-50 text-red-500 hover:bg-red-100' 
            : 'bg-white/80 text-muted-foreground hover:text-red-500 hover:bg-white'
        }`}
      >
        <Heart className="h-4 w-4" fill={isWishlisted ? "currentColor" : "none"} />
      </button>

      {/* Badge */}
      {badge && (
        <div className="absolute left-6 top-6 z-10 pointer-events-none">
          <Badge variant="secondary" className="bg-white/90 backdrop-blur-md text-primary font-bold px-3 py-1 shadow-sm border-none">
            {badge}
          </Badge>
        </div>
      )}

      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden rounded-[16px] bg-secondary/30 mb-5 block group-hover:bg-secondary/40 transition-colors pointer-events-none">
        {image ? (
          <Image 
            src={image} 
            alt={name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <Image 
            src={FALLBACK_PLANT_IMAGE} 
            alt={name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 mix-blend-multiply"
          />
        )}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-primary/30 opacity-0 group-hover:opacity-100 transition-opacity bg-black/5 backdrop-blur-[2px]">
          <span className="font-semibold tracking-wide text-primary drop-shadow-sm bg-white/90 px-4 py-2 rounded-full">View Details</span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col px-1 pointer-events-none">
        <div className="flex items-center gap-1.5 mb-2">
          <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
          <span className="text-[14px] font-semibold text-foreground/90">{rating}</span>
          <span className="text-[13px] text-muted-foreground">({reviewsCount})</span>
        </div>
        
        <h3 className="font-bold text-lg leading-tight mb-1 tracking-tight group-hover:text-primary transition-colors">{name}</h3>
        <p className="text-[15px] text-muted-foreground mb-5 line-clamp-2 leading-relaxed">{tagline}</p>
      </div>
      
      <div 
        onClick={handleAddToCart}
        className="mt-auto flex items-end justify-between pt-3 pb-1 border-t border-border/30 cursor-pointer group/cart relative z-10 px-1"
      >
        <div className="flex flex-col gap-0.5 pointer-events-none">
          {originalPrice && (
            <span className="text-xs font-medium text-muted-foreground line-through decoration-muted-foreground/40">₹{originalPrice}</span>
          )}
          <span className="text-[22px] font-bold text-primary tracking-tight">₹{price}</span>
        </div>
        <div 
          className="flex items-center justify-center h-11 w-11 rounded-full shadow-sm hover:shadow-md transition-all group-hover:scale-105 group-hover/cart:bg-primary/90 bg-primary text-white z-10"
        >
          <Plus className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
}
