import Link from 'next/link';
import { ArrowRight, Leaf } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function AiTeaser() {
  return (
    <section className="bg-primary text-white py-12 lg:py-14 relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 opacity-10 mix-blend-overlay" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} />
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-emerald-400/20 rounded-full blur-3xl pointer-events-none" />
      
      <div className="container mx-auto max-w-7xl px-4 flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
        <div className="flex items-center gap-6">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 text-white p-5 rounded-3xl shadow-2xl rotate-[-3deg] hover:rotate-0 transition-all duration-300">
            <Leaf className="h-8 w-8" />
          </div>
          <div>
            <h3 className="font-extrabold text-3xl tracking-tight mb-2 text-white/95">Not sure which plant to get?</h3>
            <p className="text-white/80 text-lg font-medium max-w-xl leading-relaxed">Let our AI Plant Advisor analyze your space and lifestyle to find your perfect green companion in under a minute.</p>
          </div>
        </div>
        <Button variant="secondary" size="lg" className="rounded-full px-10 h-16 text-[17px] font-bold hover:scale-105 transition-transform bg-white text-primary hover:bg-white shadow-[0_8px_30px_rgb(0,0,0,0.12)] shrink-0" asChild>
          <Link href="/ai-advisor" className="flex items-center justify-center gap-2">
            Try AI Advisor Free <ArrowRight className="h-5 w-5" />
          </Link>
        </Button>
      </div>
    </section>
  );
}
