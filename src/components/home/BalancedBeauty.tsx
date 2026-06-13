import Image from 'next/image';

export function BalancedBeauty() {
  return (
    <section className="relative w-full h-[70vh] min-h-[600px] flex items-center overflow-hidden">
      {/* Background Image with Parallax effect */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="https://images.unsplash.com/photo-1545241047-6083a36ee15f?q=80&w=2000&auto=format&fit=crop" 
          alt="Lush green botanical room" 
          fill 
          className="object-cover"
          sizes="100vw"
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="container mx-auto max-w-7xl px-4 relative z-10">
        <div className="max-w-2xl bg-white/10 backdrop-blur-md border border-white/20 p-10 sm:p-16 rounded-[40px] text-white shadow-2xl">
          <h2 className="text-5xl sm:text-6xl font-extrabold tracking-tight mb-6 font-sans">
            Bring Home <br/> Balanced Beauty.
          </h2>
          <p className="text-xl sm:text-2xl font-medium leading-relaxed text-white/90 mb-8">
            More than just decor, indoor plants transform the energy of your space. They purify the air, boost creativity, and bring a profound sense of calm to your daily life.
          </p>
          <div className="flex items-center gap-4 text-sm font-bold tracking-widest uppercase">
            <span className="w-12 h-px bg-white" />
            Designed by Nature
          </div>
        </div>
      </div>
    </section>
  );
}
