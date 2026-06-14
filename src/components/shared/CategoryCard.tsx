import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';

interface CategoryCardProps {
  name: string;
  count: number;
  slug: string;
  image?: string;
  colorClass?: string;
}

export function CategoryCard({ name, count, slug, image, colorClass = "bg-[#D8F3DC]" }: CategoryCardProps) {
  return (
    <Link href={`/shop/${slug}`} className="group relative overflow-hidden rounded-[40px] block aspect-[4/5] flex-shrink-0 bg-white border border-primary/5 shadow-sm hover:shadow-2xl transition-all duration-700">
      
      {/* Background Media */}
      <div className={`absolute inset-0 ${colorClass} transition-transform duration-1000 group-hover:scale-110 ease-out`} />
      
      {image && (
        <div className="absolute inset-0">
          <Image 
            src={image} 
            alt={name} 
            fill 
            className="object-cover transition-transform duration-[2s] group-hover:scale-110 ease-out" 
          />
        </div>
      )}

      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#052E16]/90 via-[#052E16]/30 to-transparent transition-opacity duration-700 group-hover:opacity-100 opacity-80" />
      
      {/* Content */}
      <div className="relative h-full p-4 sm:p-8 flex flex-col justify-end z-10">
        <div className="transform transition-transform duration-700 group-hover:-translate-y-4">
          <span className="inline-block px-2 py-1 mb-2 border border-white/30 rounded-full text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-white/90 backdrop-blur-sm">
            {count} Varieties
          </span>
          <h3 className="text-sm md:text-base lg:text-lg font-normal mb-1 text-white tracking-tight leading-tight">
            {name}
          </h3>
        </div>
        
        {/* Animated Arrow */}
        <div className="absolute bottom-4 right-4 sm:bottom-8 sm:right-8 w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full flex items-center justify-center text-[#052E16] opacity-0 translate-y-4 transition-all duration-500 ease-out group-hover:opacity-100 group-hover:translate-y-0 shadow-lg">
          <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
        </div>
      </div>
    </Link>
  );
}
