import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Leaf } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FALLBACK_PLANT_IMAGE } from '@/lib/utils';

interface ChatProductCardProps {
  product: {
    id: string;
    name: string;
    slug: string;
    price: number;
    salePrice: number | null;
    images: string;
    petFriendly: boolean;
    careLevel: string;
  };
}

export function ChatProductCard({ product }: ChatProductCardProps) {
  let imageUrl = FALLBACK_PLANT_IMAGE;
  try {
    const images = JSON.parse(product.images);
    if (images && images.length > 0) {
      imageUrl = images[0];
    }
  } catch (e) {
    // ignore
  }

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-[0_2px_10px_rgb(0,0,0,0.06)] border border-border flex flex-col w-full min-w-[240px] max-w-[260px] shrink-0 transition-transform hover:-translate-y-1 hover:shadow-lg">
      <div className="relative aspect-square w-full bg-[#F8FFF9] p-4">
        <Image 
          src={imageUrl} 
          alt={product.name} 
          fill
          className="object-contain mix-blend-multiply"
        />
        {product.petFriendly && (
          <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-[10px] font-bold text-green-700 flex items-center gap-1 shadow-sm">
            <Leaf className="w-3 h-3" />
            Pet Safe
          </div>
        )}
      </div>
      
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-bold text-base mb-1 line-clamp-1">{product.name}</h3>
        
        <div className="flex items-center gap-2 mb-3">
          <span className="font-extrabold text-primary text-lg">
            ₹{product.salePrice || product.price}
          </span>
          {product.salePrice && (
            <span className="text-muted-foreground line-through text-xs font-medium">
              ₹{product.price}
            </span>
          )}
        </div>
        
        <div className="mt-auto">
          <Button className="w-full rounded-xl text-sm h-10 font-bold" asChild>
            <Link href={`/product/${product.slug}`} className="flex items-center justify-center gap-1">
              View Product <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
