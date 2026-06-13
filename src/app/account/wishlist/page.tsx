"use client";

import Link from "next/link";
import { useUserStore } from "@/store/useUserStore";
import { useCartStore } from "@/store/useCartStore";
import { Heart, ShoppingBag, Trash2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function WishlistPage() {
  const wishlist = useUserStore((state) => state.wishlist);
  const removeFromWishlist = useUserStore((state) => state.removeFromWishlist);
  const addToCart = useCartStore((state) => state.addItem);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold font-playfair text-gray-900">My Wishlist</h1>
        <span className="text-sm font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
          {wishlist.length} {wishlist.length === 1 ? "Item" : "Items"}
        </span>
      </div>

      {wishlist.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlist.map((product) => (
            <div key={product.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden group">
              <div className="relative aspect-square bg-gray-50 overflow-hidden">
                <img 
                  src={product.images[0]} 
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <button 
                  onClick={() => removeFromWishlist(product.id)}
                  className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full text-red-500 hover:bg-red-50 transition-colors shadow-sm"
                  aria-label="Remove from wishlist"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              
              <div className="p-4">
                <Link href={`/product/${product.id}`}>
                  <h3 className="font-semibold text-gray-900 hover:text-primary transition-colors">{product.name}</h3>
                </Link>
                <p className="text-sm text-gray-500 mt-1">{product.tagline || "Beautiful indoor plant"}</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="font-bold text-gray-900">₹{product.price.toLocaleString("en-IN")}</span>
                  <Button 
                    size="sm" 
                    onClick={() => addToCart({
                      id: product.id,
                      name: product.name,
                      price: product.price,
                      image: product.images[0],
                      quantity: 1,
                    })}
                  >
                    <ShoppingBag className="w-4 h-4 mr-2" /> Add
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-xl p-12 text-center shadow-sm">
          <div className="mx-auto w-16 h-16 bg-rose-50 rounded-full flex items-center justify-center mb-4">
            <Heart className="h-8 w-8 text-rose-300" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Your wishlist is empty</h3>
          <p className="text-gray-500 max-w-sm mx-auto mb-6">
            Save your favorite plants here and revisit them anytime. 
            They'll be waiting for you when you're ready!
          </p>
          <Link href="/shop">
            <Button className="h-11 rounded-lg px-6">
              Explore Plants <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}
