'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Heart, Star, Truck, Droplet, Sun, Dog } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Product } from '@/lib/data';
import { useCartStore } from '@/store/useCartStore';
import { useUserStore } from '@/store/useUserStore';

interface ProductPayload {
  id: string;
  name: string;
  description: string;
  price: number;
  salePrice: number | null;
  images: string | string[];
  potColorImages?: string | null;
  badge?: string | null;
  careLevel?: string;
  lightReq?: string;
  waterReq?: string;
  petFriendly?: boolean;
  reviews?: { rating: number }[];
}

interface ProductInfoProps {
  product: ProductPayload;
  onPotColorChange?: (image: string | null) => void;
}

const POT_COLORS = [
  { name: 'Green', bg: 'bg-[#A3CB38]' },
  { name: 'Blue', bg: 'bg-[#85B5D1]' },
  { name: 'White', bg: 'bg-[#F4F4F4]' },
  { name: 'Yellow', bg: 'bg-[#EBE045]' },
];

export function ProductInfo({ product, onPotColorChange }: ProductInfoProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState<string>('White');
  const router = useRouter();
  const { addItem, setDrawerOpen } = useCartStore();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useUserStore();

  const isWished = isInWishlist(product.id);
  const displayPrice = product.salePrice || product.price;

  const getSelectedImage = (color: string = selectedColor) => {
    // 1. Check explicit potColorImages mapping from Admin Panel
    if (product.potColorImages) {
      try {
        const explicitImages = JSON.parse(product.potColorImages);
        if (explicitImages[color]) {
          return explicitImages[color];
        }
      } catch {}
    }

    // 2. Fallback to index-based mapping
    let parsedImages: string[] = [];
    if (typeof product.images === 'string') {
      try { parsedImages = JSON.parse(product.images); } catch {}
    } else if (Array.isArray(product.images)) {
      parsedImages = product.images;
    }

    let imgIndex = 0;
    if (color === 'White') imgIndex = 0;
    else if (color === 'Green') imgIndex = 1;
    else if (color === 'Blue') imgIndex = 2;
    else if (color === 'Yellow') imgIndex = 3;

    return parsedImages[imgIndex] || parsedImages[0] || '';
  };

  const handleColorSelect = (colorName: string) => {
    setSelectedColor(colorName);
    if (onPotColorChange) {
      onPotColorChange(getSelectedImage(colorName));
    }
  };

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: displayPrice,
      image: getSelectedImage(),
      quantity: quantity,
      size: "Standard",
      potColor: selectedColor
    });
    setDrawerOpen(true);
  };

  const handleBuyNow = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: displayPrice,
      image: getSelectedImage(),
      quantity: quantity,
      size: "Standard",
      potColor: selectedColor
    });
    router.push('/checkout');
  };

  const handleToggleWishlist = () => {
    if (isWished) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product as unknown as Product);
    }
  };

  return (
    <div className="flex flex-col">
      {/* Badges & Rating */}
      <div className="flex flex-wrap items-center gap-4 mb-5">
        {product.badge && (
          <span className="bg-primary/10 text-primary font-bold px-3 py-1.5 rounded-full text-[11px] uppercase tracking-widest">
            {product.badge}
          </span>
        )}
        <div className="flex items-center gap-1.5 text-amber-500">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className={`h-4 w-4 ${i < Math.floor(product.reviews?.length ? product.reviews.reduce((acc: number, r: { rating: number }) => acc + r.rating, 0) / product.reviews.length : 5) ? 'fill-current' : 'text-muted/30'}`} />
          ))}
          <span className="text-foreground font-bold text-[15px] ml-1">
            {product.reviews?.length ? (product.reviews.reduce((acc: number, r: { rating: number }) => acc + r.rating, 0) / product.reviews.length).toFixed(1) : "5.0"}
          </span>
          <span 
            className="text-muted-foreground text-[14px] font-medium underline decoration-muted-foreground/30 underline-offset-4 cursor-pointer hover:text-foreground transition-colors"
            onClick={() => {
              document.getElementById('reviews-section')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            ({product.reviews?.length || 0} reviews)
          </span>
        </div>
      </div>

      <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-extrabold tracking-tight text-[#1B4332] mb-4 leading-[1.1]">{product.name}</h1>
      <p className="text-xl sm:text-2xl text-muted-foreground font-medium mb-8 leading-relaxed max-w-2xl">{product.description.substring(0, 80)}...</p>

      {/* Pot Color Selection */}
      <div className="mb-8">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <span className="text-stone-700">Choose Pot Color</span>
          <span className="text-stone-500 font-medium">{selectedColor}</span>
        </h3>
        <div className="flex items-center gap-4">
          {POT_COLORS.map((color) => (
            <button
              key={color.name}
              onClick={() => handleColorSelect(color.name)}
              className={`w-12 h-12 rounded-full border-[3px] p-0.5 transition-all outline-none focus:outline-none ${selectedColor === color.name ? 'border-stone-400 scale-110' : 'border-transparent hover:border-stone-300 hover:scale-105'}`}
              aria-label={`Select ${color.name} pot color`}
            >
              <div className={`w-full h-full rounded-full ${color.bg} shadow-sm`} />
            </button>
          ))}
          <button 
            onClick={() => handleColorSelect('White')} 
            className="ml-2 text-stone-900 font-medium underline underline-offset-4 decoration-2 hover:text-stone-600 transition-colors"
          >
            Clear selection
          </button>
        </div>
      </div>

      {/* Price */}
      <div className="flex items-end gap-4 mb-10 pb-8 border-b border-border/40">
        <span className="text-[40px] font-extrabold tracking-tight text-primary leading-none">₹{displayPrice}</span>
        {product.salePrice && (
          <span className="text-2xl font-semibold text-muted-foreground line-through decoration-muted-foreground/40 mb-1">₹{product.price}</span>
        )}
      </div>



      {/* Actions (Desktop Version) */}
      <div className="hidden md:block space-y-4 mb-12">
        <div className="flex items-center gap-4">
          {/* Quantity */}
          <div className="w-[200px] shrink-0 flex items-center border-2 border-border/50 rounded-[20px] bg-white h-[68px]">
            <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="flex-1 flex justify-center items-center font-bold text-2xl text-muted-foreground hover:text-primary transition-colors">-</button>
            <span className="w-12 text-center font-extrabold text-xl">{quantity}</span>
            <button onClick={() => setQuantity(quantity + 1)} className="flex-1 flex justify-center items-center font-bold text-2xl text-muted-foreground hover:text-primary transition-colors">+</button>
          </div>

          {/* Add to Cart */}
          <div className="flex-1">
            <Button onClick={handleAddToCart} size="lg" className="w-full h-[68px] rounded-[20px] text-[18px] font-extrabold shadow-xl shadow-primary/20 hover:shadow-2xl hover:shadow-primary/30 hover:-translate-y-1 transition-all">
              Add to Cart - ₹{displayPrice * quantity}
            </Button>
          </div>

          {/* Heart / Wishlist */}
          <div className="w-[100px] shrink-0">
            <Button 
              variant="outline" 
              onClick={handleToggleWishlist}
              className={`w-full h-[68px] rounded-[20px] border-2 transition-all ${isWished ? 'bg-rose-50 border-rose-200 text-rose-500' : 'hover:bg-rose-50 hover:text-rose-500 hover:border-rose-200'}`}
            >
              <Heart className={`h-6 w-6 ${isWished ? 'fill-current' : ''}`} />
            </Button>
          </div>
        </div>

        {/* Buy It Now */}
        <div className="w-full">
          <Button 
            onClick={handleBuyNow}
            size="lg" 
            className="w-full h-[68px] rounded-[20px] text-[18px] font-extrabold bg-[#052E16] text-white hover:bg-[#064E3B] shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all"
          >
            Buy It Now
          </Button>
        </div>
      </div>

      {/* Actions (Mobile Version) */}
      <div className="md:hidden grid grid-cols-12 gap-3 mb-12">
        {/* Quantity */}
        <div className="col-span-8 flex items-center border-2 border-border/50 rounded-[20px] bg-white h-[68px]">
          <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="flex-1 flex justify-center items-center font-bold text-2xl text-muted-foreground hover:text-primary transition-colors">-</button>
          <span className="w-12 text-center font-extrabold text-xl">{quantity}</span>
          <button onClick={() => setQuantity(quantity + 1)} className="flex-1 flex justify-center items-center font-bold text-2xl text-muted-foreground hover:text-primary transition-colors">+</button>
        </div>

        {/* Heart */}
        <div className="col-span-4">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={handleToggleWishlist}
            className={`w-full h-[68px] rounded-[20px] border-2 transition-all ${isWished ? 'bg-rose-50 border-rose-200 text-rose-500' : 'hover:bg-rose-50 hover:text-rose-500 hover:border-rose-200'}`}
          >
            <Heart className={`h-7 w-7 ${isWished ? 'fill-current' : ''}`} />
          </Button>
        </div>

        {/* Add to Cart */}
        <div className="col-span-12">
          <Button onClick={handleAddToCart} size="lg" className="w-full h-[68px] rounded-[20px] text-[18px] font-extrabold shadow-xl shadow-primary/20 hover:shadow-2xl hover:shadow-primary/30 hover:-translate-y-1 transition-all">
            Add to Cart - ₹{displayPrice * quantity}
          </Button>
        </div>

        {/* Buy It Now */}
        <div className="col-span-12">
          <Button 
            onClick={handleBuyNow}
            size="lg" 
            className="w-full h-[68px] rounded-[20px] text-[18px] font-extrabold bg-[#052E16] text-white hover:bg-[#064E3B] shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all"
          >
            Buy It Now
          </Button>
        </div>
      </div>

      {/* Quick Features */}
      <div className="grid grid-cols-2 gap-4 mb-12 p-6 bg-[#F8FFF9] rounded-[24px] border border-primary/10">
        <div className="flex items-center gap-4">
          <div className="bg-white p-3 rounded-2xl shadow-sm"><Droplet className="h-5 w-5 text-blue-500" /></div>
          <div className="text-[15px] font-bold">{product.careLevel} Care</div>
        </div>
        <div className="flex items-center gap-4">
          <div className="bg-white p-3 rounded-2xl shadow-sm"><Sun className="h-5 w-5 text-amber-500" /></div>
          <div className="text-[15px] font-bold">{product.lightReq}</div>
        </div>
        <div className="flex items-center gap-4">
          <div className="bg-white p-3 rounded-2xl shadow-sm"><Dog className="h-5 w-5 text-emerald-600" /></div>
          <div className="text-[15px] font-bold">{product.petFriendly ? 'Pet Safe' : 'Not Pet Safe'}</div>
        </div>
        <div className="flex items-center gap-4">
          <div className="bg-white p-3 rounded-2xl shadow-sm"><Truck className="h-5 w-5 text-indigo-500" /></div>
          <div className="text-[15px] font-bold">Free Delivery</div>
        </div>
      </div>

      {/* Accordions */}
      <Accordion className="w-full space-y-4" defaultValue={["description"]}>
        <AccordionItem value="description" className="border border-border/40 bg-white rounded-3xl px-8 data-[state=open]:shadow-sm data-[state=open]:border-primary/20 transition-all">
          <AccordionTrigger className="hover:no-underline font-extrabold text-xl py-6 tracking-tight">Full Description</AccordionTrigger>
          <AccordionContent className="text-[16px] leading-relaxed text-muted-foreground pb-8 font-medium">
            {product.description}
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="care" className="border border-border/40 bg-white rounded-3xl px-8 data-[state=open]:shadow-sm data-[state=open]:border-primary/20 transition-all">
          <AccordionTrigger className="hover:no-underline font-extrabold text-xl py-6 tracking-tight">Care Instructions</AccordionTrigger>
          <AccordionContent className="pb-8 space-y-6">
            <div className="flex gap-5">
              <div className="bg-blue-50 p-3 rounded-2xl shrink-0"><Droplet className="h-6 w-6 text-blue-500" /></div>
              <div>
                <p className="font-bold text-foreground text-lg mb-1">Watering</p>
                <p className="text-[15px] text-muted-foreground font-medium leading-relaxed">{product.waterReq}</p>
              </div>
            </div>
            <div className="flex gap-5">
              <div className="bg-amber-50 p-3 rounded-2xl shrink-0"><Sun className="h-6 w-6 text-amber-500" /></div>
              <div>
                <p className="font-bold text-foreground text-lg mb-1">Light</p>
                <p className="text-[15px] text-muted-foreground font-medium leading-relaxed">{product.lightReq}</p>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="shipping" className="border border-border/40 bg-white rounded-3xl px-8 data-[state=open]:shadow-sm data-[state=open]:border-primary/20 transition-all">
          <AccordionTrigger className="hover:no-underline font-extrabold text-xl py-6 tracking-tight">Shipping & Returns</AccordionTrigger>
          <AccordionContent className="text-[15px] leading-relaxed text-muted-foreground pb-8 font-medium">
            <p className="mb-4"><strong className="text-foreground">Free Standard Shipping:</strong> 3-5 business days across all of India. Plants are packaged in custom-engineered boxes to ensure they arrive in perfect condition.</p>
            <p><strong className="text-foreground">12-Hour Return Policy:</strong> Returns are accepted only for damaged plants. If your plant arrives damaged or spoiled, please contact us with photos within 12 hours of delivery for a replacement or return.</p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
