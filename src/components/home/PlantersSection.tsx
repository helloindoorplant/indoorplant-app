import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function PlantersSection() {
  return (
    <section className="py-16 lg:py-32 bg-[#FAFAF9]">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          {/* Images Layout */}
          <div className="w-full lg:w-1/2 relative h-[500px] sm:h-[600px]">
            <div className="absolute top-0 left-0 w-3/4 h-[80%] rounded-[40px] overflow-hidden shadow-2xl z-10">
              <Image 
                src="https://images.unsplash.com/photo-1485955900006-10f4d324d411?q=80&w=800&auto=format&fit=crop" 
                alt="Ceramic Planter" 
                fill 
                className="object-cover"
              />
            </div>
            <div className="absolute bottom-0 right-0 w-1/2 h-[60%] rounded-[32px] overflow-hidden shadow-xl z-20 border-8 border-[#FAFAF9]">
              <Image 
                src="https://images.unsplash.com/photo-1610630713745-fbcfecebaee5?q=80&w=600&auto=format&fit=crop" 
                alt="Terracotta Pot" 
                fill 
                className="object-cover"
              />
            </div>
            <div className="absolute top-1/2 right-10 -translate-y-1/2 w-48 h-48 bg-emerald-100 rounded-full blur-3xl -z-10" />
          </div>

          {/* Text Content */}
          <div className="w-full lg:w-1/2">
            <span className="inline-block px-4 py-1.5 mb-6 border border-primary/20 bg-primary/5 rounded-full text-sm font-bold uppercase tracking-widest text-primary">
              The Artisan Collection
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tighter mb-6 text-stone-900 leading-[1.1]">
              Planters That <br className="hidden lg:block"/> Redefine Spaces.
            </h2>
            <p className="text-xl text-stone-600 font-medium leading-relaxed mb-10 max-w-lg">
              Elevate your greenery with our handcrafted collection of premium planters. From minimalist ceramics to porous terracotta, give your plants the stylish home they deserve.
            </p>
            
            <ul className="space-y-4 mb-10">
              {['Handcrafted by artisans', 'Built-in drainage systems', 'Sustainable materials', 'Various sizes & colors'].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-stone-800 font-semibold text-lg">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  {item}
                </li>
              ))}
            </ul>

            <Button size="lg" className="h-16 px-10 text-[17px] font-bold rounded-full shadow-xl shadow-primary/20 hover:shadow-2xl hover:shadow-primary/30 transition-all hover:-translate-y-1" asChild>
              <Link href="/shop/planters">
                Explore Planters
              </Link>
            </Button>
          </div>

        </div>
      </div>
    </section>
  );
}
