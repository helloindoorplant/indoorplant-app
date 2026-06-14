'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Leaf, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const SLIDES = [
  {
    id: 1,
    title: "Find Your",
    titleHighlight: "Perfect",
    titleEnd: "Plant.",
    subtitle: "AI-powered recommendations. Expert care guides. Delivered fresh to your door. Bring nature inside with confidence.",
    bgTheme: "bg-[#F8FFF9]",
    accentColor: "text-primary",
    button1: "Talk to AI Advisor",
    button1Link: "/ai-advisor",
    button2: "Shop Collection",
    button2Link: "/shop",
    badgeText: "Smart Plant Selection API Active",
    image: "https://lightgrey-nightingale-217677.hostingersite.com/wp-content/uploads/2026/06/Home-Page-Slide1.webp"
  },
  {
    id: 2,
    title: "Breathe",
    titleHighlight: "Easier",
    titleEnd: "Today.",
    subtitle: "Discover our curated collection of air-purifying plants designed to detoxify your home and boost your daily well-being.",
    bgTheme: "bg-[#F0FDF4]",
    accentColor: "text-emerald-700",
    button1: "Shop Air Purifiers",
    button1Link: "/shop?category=air-purifying",
    button2: "Learn More",
    button2Link: "/blog/air-purifying",
    badgeText: "Top Rated Air Purifiers",
    image: "https://lightgrey-nightingale-217677.hostingersite.com/wp-content/uploads/2026/06/Home-Page-Slide2.webp"
  },
  {
    id: 3,
    title: "Lush Living,",
    titleHighlight: "Zero",
    titleEnd: "Effort.",
    subtitle: "Busy schedule? Our low-maintenance collection thrives on neglect so you can enjoy lush greenery without the stress.",
    bgTheme: "bg-[#FAFAF9]",
    accentColor: "text-stone-800",
    button1: "Shop Low Maintenance",
    button1Link: "/shop?category=low-maintenance",
    button2: "View Care Guides",
    button2Link: "/guides",
    badgeText: "Perfect For Beginners",
    image: "https://lightgrey-nightingale-217677.hostingersite.com/wp-content/uploads/2026/06/Home-Page-Slide3.webp"
  }
];

export function HeroSlider() {
  const [current, setCurrent] = useState(0);

  // Auto play
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % SLIDES.length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);

  return (
    <section className="relative overflow-hidden w-full min-h-[85vh] lg:min-h-[700px] lg:h-[90vh] flex items-center justify-center py-16 lg:py-0">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.02 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className={`absolute inset-0 ${SLIDES[current].bgTheme} transition-colors duration-700`}
        >
          {/* Decorative background elements */}
          <div className="absolute top-0 right-0 w-3/5 h-full bg-gradient-to-bl from-primary/10 to-transparent rounded-bl-[140px] opacity-60 -z-10" />
          <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] -z-10" />
          <div className="absolute -top-32 -left-32 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[100px] -z-10" />
        </motion.div>
      </AnimatePresence>

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-16 items-center">
          
          {/* Left Content (Text) */}
          <div className="lg:col-span-6 z-10 order-2 lg:order-1 mt-6 lg:mt-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], staggerChildren: 0.1 }}
                className="flex flex-col items-start"
              >
                <motion.div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-md shadow-sm border border-primary/10 text-primary text-sm font-bold tracking-wide mb-8">
                  <Sparkles className="h-4 w-4" />
                  <span>{SLIDES[current].badgeText}</span>
                </motion.div>
                
                <motion.h1 className="text-6xl sm:text-7xl lg:text-[84px] font-extrabold tracking-tighter text-[#1B4332] mb-8 leading-[1.05]">
                  {SLIDES[current].title} <br/>
                  <span className="relative inline-block">
                    <span className={`${SLIDES[current].accentColor} italic pr-4`}>{SLIDES[current].titleHighlight}</span>
                    <svg className="absolute -bottom-2 left-0 w-full h-4 text-[#B7E4C7] -z-10" viewBox="0 0 200 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M2 10C68.5 2 135 2 198 10" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
                    </svg>
                  </span>
                  {SLIDES[current].titleEnd}
                </motion.h1>
                
                <motion.p className="text-xl sm:text-2xl text-muted-foreground mb-10 max-w-lg leading-relaxed font-medium">
                  {SLIDES[current].subtitle}
                </motion.p>
                
                <motion.div className="flex flex-col sm:flex-row gap-5">
                  <Button size="lg" className="h-16 px-10 text-[16px] font-bold rounded-full shadow-xl shadow-primary/20 hover:shadow-2xl hover:shadow-primary/30 transition-all hover:-translate-y-1" render={<Link href={SLIDES[current].button1Link} />}>
                    {SLIDES[current].button1}
                  </Button>
                  <Button size="lg" variant="outline" className="h-16 px-10 text-[16px] font-bold rounded-full border-2 hover:bg-primary/5 transition-all bg-transparent" render={<Link href={SLIDES[current].button2Link} />}>
                    {SLIDES[current].button2}
                  </Button>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
          
          {/* Right Image Graphic (Dynamic Image Content) */}
          <div className="lg:col-span-6 relative z-10 w-full max-w-[340px] sm:max-w-md mx-auto lg:max-w-none order-1 lg:order-2">
            <AnimatePresence mode="wait">
              <motion.div 
                key={current}
                initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)", rotate: -2 }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)", rotate: 0 }}
                exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)", rotate: 2 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative aspect-square rounded-[48px] overflow-hidden bg-white shadow-[0_20px_50px_rgba(0,0,0,0.1)] border-[12px] border-white/80 backdrop-blur-md"
              >
                {/* Actual Image */}
                <Image 
                  src={SLIDES[current].image}
                  alt={SLIDES[current].title}
                  fill
                  className="object-cover transition-transform duration-[10s] hover:scale-110 ease-linear"
                  priority={current === 0}
                />
                
                {/* Elegant overlay gradient so it doesn't look too raw */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
                
                {/* Decorative floating ring element */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] rounded-full border border-white/20 animate-[spin_30s_linear_infinite] pointer-events-none" />
              </motion.div>
            </AnimatePresence>
          </div>
          
        </div>
      </div>

      {/* Slider Controls */}
      <div className="absolute bottom-6 lg:bottom-10 left-0 right-0 z-20 flex justify-center items-center gap-6">
        <div className="flex gap-3">
          {SLIDES.map((_, i) => (
            <button 
              key={i} 
              onClick={() => setCurrent(i)}
              className={`h-2 rounded-full transition-all duration-500 ${i === current ? 'w-10 bg-primary' : 'w-2 bg-primary/30'}`} 
            />
          ))}
        </div>
      </div>
    </section>
  );
}
