'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const promos = [
  {
    id: 1,
    title: 'New Launch',
    image: 'https://lightgrey-nightingale-217677.hostingersite.com/wp-content/uploads/2026/06/Indoorplant_in-Image-3.webp',
    link: '/shop',
    buttonText: 'New Launch',
  },
  {
    id: 2,
    title: 'Hot Sellers',
    image: 'https://lightgrey-nightingale-217677.hostingersite.com/wp-content/uploads/2026/06/Indoorplant_in-Image-2.webp',
    link: '/shop?sort=popular',
    buttonText: 'Hot Sellers',
  },
  {
    id: 3,
    title: 'Tulsi Edition',
    image: 'https://lightgrey-nightingale-217677.hostingersite.com/wp-content/uploads/2026/06/Indoorplant_in-Image-4.webp',
    link: '/shop',
    buttonText: 'Tulsi Edition',
  }
];

export function PromoGrid() {
  return (
    <section className="bg-[#faf9f5] w-full overflow-hidden border-y border-[#e8e6dc]">
      <div className="w-full flex flex-col md:flex-row">
        {promos.map((promo, index) => (
          <Link 
            href={promo.link} 
            key={promo.id}
            className={`group relative flex-1 block overflow-hidden aspect-square`}
          >
            {/* Image */}
            <img 
              src={promo.image} 
              alt={promo.title}
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
            />
            
            {/* Floating content */}
            <div className="absolute inset-0 flex flex-col justify-end p-8 sm:p-12">
              <div className="self-center md:self-center">
                <span className="inline-flex items-center gap-2 bg-[#faf9f5] text-[#141413] px-8 py-4 rounded-full font-bold text-[13px] sm:text-[15px] tracking-wide shadow-xl font-sans">
                  {promo.buttonText}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
