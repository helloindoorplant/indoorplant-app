'use client';

import { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const TESTIMONIALS = [
  {
    id: 1,
    name: "Priya Sharma",
    location: "Bangalore",
    text: "The AI advisor perfectly matched me with a Monstera. It arrived in pristine condition and is thriving in my living room!",
    rating: 5,
    initial: "P"
  },
  {
    id: 2,
    name: "Rahul Verma",
    location: "Mumbai",
    text: "I've killed every plant I've owned until I found indoorplant.in. The care guides are foolproof and the packaging was completely plastic-free.",
    rating: 5,
    initial: "R"
  },
  {
    id: 3,
    name: "Ananya Desai",
    location: "Pune",
    text: "The ceramic planters are absolutely gorgeous. They look like high-end designer pieces but at a fraction of the cost. Highly recommended.",
    rating: 5,
    initial: "A"
  },
  {
    id: 4,
    name: "Karan Malhotra",
    location: "Delhi",
    text: "Customer service is top-notch. My Peace Lily arrived slightly droopy due to heat, and they instantly guided me on how to revive it within hours.",
    rating: 4,
    initial: "K"
  },
  {
    id: 5,
    name: "Sneha Reddy",
    location: "Hyderabad",
    text: "I bought the pet-safe bundle because I have two cats. The plants are beautiful, healthy, and my cats leave them alone. 10/10 experience.",
    rating: 5,
    initial: "S"
  }
];

export function TestimonialSlider() {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % TESTIMONIALS.length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);

  return (
    <section className="py-16 lg:py-32 bg-[#052E16] overflow-hidden relative">
      {/* Decorative Background */}
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-500/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto max-w-7xl px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-white font-sans">Loved by Plant Parents</h2>
          <p className="text-emerald-100/80 text-xl max-w-2xl mx-auto">Join thousands of happy customers across India.</p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="bg-white/10 backdrop-blur-xl border border-white/20 p-10 sm:p-16 rounded-[40px] shadow-2xl relative"
            >
              <Quote className="absolute top-10 right-10 h-24 w-24 text-white/5" />
              
              <div className="flex gap-1 mb-8 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`h-6 w-6 ${i < TESTIMONIALS[current].rating ? 'fill-current' : 'text-white/20'}`} />
                ))}
              </div>
              
              <p className="text-2xl sm:text-3xl font-medium leading-relaxed text-white mb-10 relative z-10">
                "{TESTIMONIALS[current].text}"
              </p>
              
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold text-xl shadow-inner">
                  {TESTIMONIALS[current].initial}
                </div>
                <div>
                  <h4 className="font-bold text-lg text-white">{TESTIMONIALS[current].name}</h4>
                  <p className="text-emerald-200/80 text-sm">{TESTIMONIALS[current].location}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="flex justify-center items-center gap-6 mt-12">
            <button onClick={prevSlide} className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-[#052E16] transition-all">
              <ChevronLeft className="h-6 w-6" />
            </button>
            <div className="flex gap-3">
              {TESTIMONIALS.map((_, i) => (
                <button 
                  key={i} 
                  onClick={() => setCurrent(i)}
                  className={`h-2.5 rounded-full transition-all duration-500 ${i === current ? 'w-10 bg-white' : 'w-2.5 bg-white/30'}`} 
                />
              ))}
            </div>
            <button onClick={nextSlide} className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-[#052E16] transition-all">
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
