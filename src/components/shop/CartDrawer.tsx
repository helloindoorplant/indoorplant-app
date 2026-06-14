'use client';

import { Trash2, ShoppingBag, X } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { FALLBACK_PLANT_IMAGE } from '@/lib/utils';

import { useCartStore } from '@/store/useCartStore';

interface CartDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CartDrawer({ open, onOpenChange }: CartDrawerProps) {
  const { items, removeItem, updateQuantity, subtotal } = useCartStore();


  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" showCloseButton={false} className="!w-full sm:!w-[400px] sm:max-w-md p-0 flex flex-col bg-[#F8FFF9] border-l-0 shadow-2xl">
        <SheetHeader className="p-6 border-b border-border/40 bg-white shadow-sm z-10 relative flex flex-row items-center justify-between">
          <SheetTitle className="text-2xl font-extrabold text-[#1B4332] flex items-center gap-3">
            <div className="bg-primary/10 p-2 rounded-xl">
              <ShoppingBag className="h-6 w-6 text-primary" />
            </div>
            Your Cart
          </SheetTitle>
          <button onClick={() => onOpenChange(false)} className="p-2 rounded-full hover:bg-secondary/80 bg-secondary/30 transition-colors text-muted-foreground hover:text-[#1B4332]">
            <X className="h-5 w-5" />
          </button>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
              <div className="bg-primary/5 p-6 rounded-full">
                <ShoppingBag className="w-12 h-12 text-primary/40" />
              </div>
              <p className="text-lg font-bold text-muted-foreground">Your cart is empty</p>
              <Link href="/shop" onClick={() => onOpenChange(false)}>
                <Button className="mt-2 px-8 h-12 rounded-full font-bold text-base shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all">
                  Start Shopping
                </Button>
              </Link>
            </div>
          ) : (
            items.map((item) => (
              <div key={`${item.id}-${item.potColor || 'none'}`} className="flex gap-4 bg-white p-4 rounded-2xl border border-border/50 shadow-sm">
                <div className="w-20 h-20 bg-secondary/50 rounded-xl shrink-0 flex items-center justify-center overflow-hidden border border-border/50 relative">
                  <Image 
                    src={item.image || FALLBACK_PLANT_IMAGE} 
                    alt={item.name} 
                    fill
                    sizes="80px"
                    className="object-cover" 
                  />
                </div>
                <div className="flex-1 flex flex-col justify-between py-1">
                  <div>
                    <div className="flex justify-between items-start">
                      <h4 className="font-bold text-[#1B4332] leading-tight line-clamp-1">{item.name}</h4>
                      <button onClick={() => removeItem(item.id, item.potColor)} className="text-muted-foreground hover:text-red-500 transition-colors ml-2 bg-red-50 p-1.5 rounded-lg sm:opacity-100">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <p className="text-sm font-medium text-muted-foreground mt-1">
                      {item.size || item.potType || 'Standard'}
                      {item.potColor && ` • ${item.potColor} Pot`}
                    </p>
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-3 bg-secondary/40 rounded-lg px-2 py-1 border border-border/40">
                      <button onClick={() => updateQuantity(item.id, item.potColor, item.quantity - 1)} className="w-6 h-6 flex items-center justify-center font-bold text-muted-foreground hover:text-primary transition-colors">-</button>
                      <span className="text-sm font-bold w-4 text-center">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.potColor, item.quantity + 1)} className="w-6 h-6 flex items-center justify-center font-bold text-muted-foreground hover:text-primary transition-colors">+</button>
                    </div>
                    <span className="font-extrabold text-primary text-lg">₹{item.price * item.quantity}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="p-6 bg-white border-t border-border/40 shrink-0 shadow-[0_-10px_30px_rgba(0,0,0,0.03)] z-10 relative">
          {items.length > 0 && (
            <div className="mb-5 bg-[#F8FFF9] p-3.5 rounded-xl border border-primary/20 shadow-sm">
              <div className="flex justify-between items-center text-[13px] sm:text-sm font-bold mb-2.5">
                {subtotal() >= 499 ? (
                  <span className="text-primary flex items-center gap-1.5">
                    <span className="text-base">🎉</span> You've unlocked FREE shipping!
                  </span>
                ) : (
                  <span className="text-muted-foreground">
                    Add <span className="text-primary font-extrabold">₹{499 - subtotal()}</span> more for <span className="text-primary font-extrabold">FREE</span> shipping
                  </span>
                )}
              </div>
              <div className="h-2 w-full bg-primary/10 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary transition-all duration-500 rounded-full"
                  style={{ width: `${Math.min((subtotal() / 499) * 100, 100)}%` }}
                />
              </div>
            </div>
          )}
          <div className="flex items-center justify-between mb-2">
            <span className="text-lg font-bold text-muted-foreground">Subtotal</span>
            <span className="text-3xl font-extrabold text-[#1B4332]">₹{subtotal()}</span>
          </div>
          <p className="text-[13px] text-muted-foreground font-medium mb-6">Shipping & taxes calculated at checkout.</p>
          <div className="flex flex-col gap-3">
            <Link href="/checkout" onClick={() => onOpenChange(false)} className="block w-full">
              <Button size="lg" disabled={items.length === 0} className="w-full h-[60px] rounded-[16px] text-[18px] font-extrabold shadow-lg shadow-primary/20 hover:shadow-xl hover:-translate-y-1 transition-all">
                Checkout securely
              </Button>
            </Link>
            <Link href="/cart" onClick={() => onOpenChange(false)} className="block w-full">
              <Button variant="outline" className="w-full h-12 rounded-[12px] font-bold border-2">
                View Full Cart
              </Button>
            </Link>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
