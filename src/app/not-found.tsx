"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Leaf, Search, Home, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center bg-white px-4 py-24 md:py-32 relative overflow-hidden">
      {/* Background Decorative Leaves */}
      <motion.div 
        className="absolute top-10 left-10 text-primary/5 hidden md:block"
        animate={{ rotate: [0, 10, 0], y: [0, -20, 0] }}
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
      >
        <Leaf className="w-64 h-64" />
      </motion.div>
      <motion.div 
        className="absolute bottom-10 right-10 text-primary/5 hidden md:block"
        animate={{ rotate: [0, -15, 0], y: [0, 20, 0] }}
        transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
      >
        <Leaf className="w-48 h-48" />
      </motion.div>

      <div className="text-center max-w-2xl mx-auto z-10 w-full">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, type: "spring", bounce: 0.5 }}
          className="mb-8 relative inline-block"
        >
          <div className="absolute -inset-4 bg-primary/10 rounded-full blur-2xl z-0"></div>
          <h1 className="text-8xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-br from-primary to-emerald-400 drop-shadow-sm font-playfair relative z-10">
            404
          </h1>
        </motion.div>
        
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl md:text-4xl font-extrabold text-[#1B4332] font-playfair mb-4 px-2"
        >
          Oops! This plant is missing.
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-base md:text-lg text-gray-600 mb-10 max-w-lg mx-auto px-4"
        >
          We searched our entire greenhouse, but we couldn't find the page you're looking for. It might have been moved or doesn't exist.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-sm sm:max-w-none mx-auto px-4"
        >
          <Link href="/" className="w-full sm:w-auto">
            <Button size="lg" className="w-full h-14 px-8 rounded-full text-lg font-bold shadow-lg shadow-primary/20 hover:-translate-y-1 transition-all">
              <Home className="mr-2 w-5 h-5" />
              Return Home
            </Button>
          </Link>
          <Link href="/shop" className="w-full sm:w-auto">
            <Button size="lg" variant="outline" className="w-full h-14 px-8 rounded-full text-lg font-bold border-2 hover:-translate-y-1 transition-all">
              <Search className="mr-2 w-5 h-5" />
              Browse Plants
            </Button>
          </Link>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-16 pt-10 border-t border-border/50"
        >
          <p className="text-xs md:text-sm font-bold text-gray-400 mb-6 uppercase tracking-widest">Popular Destinations</p>
          <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 px-4">
            <Link href="/ai-advisor" className="flex items-center justify-center gap-2 text-sm font-bold text-gray-600 hover:text-primary transition-colors bg-gray-50 hover:bg-primary/5 px-6 py-3 sm:px-4 sm:py-2 rounded-full w-full sm:w-auto">
              AI Plant Advisor <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/care" className="flex items-center justify-center gap-2 text-sm font-bold text-gray-600 hover:text-primary transition-colors bg-gray-50 hover:bg-primary/5 px-6 py-3 sm:px-4 sm:py-2 rounded-full w-full sm:w-auto">
              Plant Care Guides <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/categories" className="flex items-center justify-center gap-2 text-sm font-bold text-gray-600 hover:text-primary transition-colors bg-gray-50 hover:bg-primary/5 px-6 py-3 sm:px-4 sm:py-2 rounded-full w-full sm:w-auto">
              View Categories <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
