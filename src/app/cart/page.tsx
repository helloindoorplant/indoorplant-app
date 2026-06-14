'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingBag, Trash2, ArrowRight, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/store/useCartStore';
import { FALLBACK_PLANT_IMAGE } from '@/lib/utils';

export default function CartPage() {
  const [mounted, setMounted] = useState(false);
  const { items, updateQuantity, removeItem, subtotal } = useCartStore();

  // Avoid hydration mismatch by rendering after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const currentSubtotal = subtotal();
  const shipping = currentSubtotal >= 500 ? 0 : 40;
  const grandTotal = currentSubtotal + shipping;

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-24 min-h-[70vh] flex flex-col items-center justify-center">
        <div className="bg-primary/5 p-8 rounded-full mb-6">
          <ShoppingBag className="w-16 h-16 text-primary/40" />
        </div>
        <h1 className="text-3xl font-extrabold text-[#1B4332] mb-4">Your cart is empty</h1>
        <p className="text-muted-foreground mb-8 text-center max-w-md">
          Looks like you haven't added any green friends to your cart yet. Let's find the perfect plant for your space!
        </p>
        <Link href="/shop">
          <Button size="lg" className="rounded-full px-8 text-lg font-bold">
            Start Shopping
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16 sm:py-24 max-w-6xl">
      <h1 className="text-4xl font-extrabold text-[#1B4332] mb-10">Your Shopping Cart</h1>
      
      <div className="grid lg:grid-cols-3 gap-10">
        {/* Cart Items List */}
        <div className="lg:col-span-2 space-y-6">
          <div className="hidden sm:grid grid-cols-12 gap-4 pb-4 border-b border-border/40 text-sm font-bold text-muted-foreground uppercase tracking-wider">
            <div className="col-span-6">Product</div>
            <div className="col-span-2 text-center">Price</div>
            <div className="col-span-2 text-center">Quantity</div>
            <div className="col-span-2 text-right">Total</div>
          </div>
          
          <div className="space-y-6">
            {items.map((item) => (
              <div key={item.id} className="flex flex-col sm:grid sm:grid-cols-12 gap-4 sm:items-center bg-white sm:bg-transparent p-4 sm:p-0 rounded-2xl sm:rounded-none border sm:border-0 border-border/50 shadow-sm sm:shadow-none pb-6 sm:border-b sm:border-border/40">
                {/* Product Info */}
                <div className="col-span-6 flex items-center gap-4">
                  <div className="w-24 h-24 bg-[#F8FFF9] rounded-xl flex items-center justify-center overflow-hidden border border-border/50 shrink-0 relative">
                    <Image 
                      src={item.image || FALLBACK_PLANT_IMAGE} 
                      alt={item.name} 
                      fill
                      sizes="96px"
                      className="object-cover" 
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-[#1B4332] line-clamp-2">{item.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{item.size || 'Standard'}</p>
                    <button 
                      onClick={() => removeItem(item.id)}
                      className="text-sm text-red-500 font-medium hover:text-red-600 mt-2 flex items-center gap-1 transition-colors"
                    >
                      <Trash2 className="w-3 h-3" /> Remove
                    </button>
                  </div>
                </div>
                
                {/* Price (Desktop) */}
                <div className="hidden sm:block col-span-2 text-center font-bold text-lg">
                  ₹{item.price}
                </div>
                
                {/* Quantity */}
                <div className="col-span-2 flex justify-start sm:justify-center">
                  <div className="flex items-center gap-3 bg-secondary/30 rounded-lg px-2 py-1 border border-border/40">
                    <button onClick={() => updateQuantity(item.id, item.potColor, item.quantity - 1)} className="w-8 h-8 flex items-center justify-center font-bold text-muted-foreground hover:text-primary transition-colors">-</button>
                    <span className="font-bold w-6 text-center">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.potColor, item.quantity + 1)} className="w-8 h-8 flex items-center justify-center font-bold text-muted-foreground hover:text-primary transition-colors">+</button>
                  </div>
                </div>
                
                {/* Total */}
                <div className="col-span-2 flex justify-between sm:justify-end items-center sm:block">
                  <span className="sm:hidden font-medium text-muted-foreground">Total:</span>
                  <div className="font-extrabold text-primary text-xl text-right">
                    ₹{item.price * item.quantity}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="pt-4">
            <Link href="/shop" className="text-primary font-bold hover:underline underline-offset-4 flex items-center gap-2">
              <ArrowRight className="w-4 h-4 rotate-180" /> Continue Shopping
            </Link>
          </div>
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-[#F8FFF9] rounded-[24px] p-6 lg:p-8 border border-primary/10 sticky top-24">
            <h2 className="text-2xl font-extrabold text-[#1B4332] mb-6">Order Summary</h2>
            
            <div className="space-y-4 text-[15px] font-medium mb-6">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal</span>
                <span className="text-foreground font-bold">₹{currentSubtotal}</span>
              </div>
              <div className="flex justify-between text-muted-foreground pb-4 border-b border-border/50">
                <span>Shipping</span>
                <span className="font-bold text-foreground">{shipping === 0 ? 'Free' : `₹${shipping.toFixed(2)}`}</span>
              </div>
            </div>
            
            <div className="border-t border-border/40 pt-4 mb-6">
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold">Grand Total</span>
                <span className="text-3xl font-extrabold text-primary">₹{grandTotal.toFixed(2)}</span>
              </div>
              {shipping === 0 ? (
                <p className="text-sm text-green-600 font-bold mt-2 bg-green-50 px-3 py-1.5 rounded-lg inline-block">
                  🎉 You unlocked free shipping!
                </p>
              ) : (
                <p className="text-[13px] text-amber-600 font-bold mt-2 bg-amber-50 px-3 py-1.5 rounded-lg inline-block">
                  Add ₹{(500 - currentSubtotal).toFixed(2)} more for FREE shipping!
                </p>
              )}
            </div>
            
            <Link href="/checkout">
              <Button size="lg" className="w-full h-[60px] rounded-[16px] text-[18px] font-extrabold shadow-lg shadow-primary/20 hover:shadow-xl hover:-translate-y-1 transition-all">
                Proceed to Checkout
              </Button>
            </Link>
            
            <div className="mt-6 flex flex-col gap-3">
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground font-medium">
                <ShieldCheck className="w-4 h-4 text-primary" /> Secure Checkout Guaranteed
              </div>
              <div className="flex justify-center gap-2 opacity-50">
                {/* Mock payment icons */}
                <div className="w-10 h-6 bg-slate-200 rounded"></div>
                <div className="w-10 h-6 bg-slate-200 rounded"></div>
                <div className="w-10 h-6 bg-slate-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
