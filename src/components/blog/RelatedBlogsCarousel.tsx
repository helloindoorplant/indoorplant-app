'use client';

import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Clock } from 'lucide-react';
import { BlogPost } from '@/lib/blog-data';

interface RelatedBlogsCarouselProps {
  posts: BlogPost[];
  currentSlug: string;
}

export function RelatedBlogsCarousel({ posts, currentSlug }: RelatedBlogsCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const related = posts.filter((p) => p.slug !== currentSlug).slice(0, 8);

  const checkScroll = () => {
    if (containerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);
    }
  };

  useEffect(() => {
    const el = containerRef.current;
    if (el) {
      el.addEventListener('scroll', checkScroll);
      checkScroll();
      window.addEventListener('resize', checkScroll);
    }
    return () => {
      if (el) el.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, [related]);

  const scroll = (direction: 'left' | 'right') => {
    if (containerRef.current) {
      const { clientWidth } = containerRef.current;
      containerRef.current.scrollBy({
        left: direction === 'left' ? -clientWidth * 0.75 : clientWidth * 0.75,
        behavior: 'smooth',
      });
    }
  };

  if (related.length === 0) return null;

  return (
    <section className="bg-[#F8FFF9] border-t border-emerald-100 py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-end justify-between mb-8 gap-4">
          <div>
            <span className="inline-block px-3 py-1 bg-emerald-100/80 text-emerald-800 text-xs font-bold uppercase tracking-wider rounded-full mb-3">
              Keep Reading
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
              More Articles You'll Love
            </h2>
          </div>

          {/* Nav arrows */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              className="w-10 h-10 rounded-full border border-stone-200 bg-white flex items-center justify-center text-stone-600 transition-all hover:bg-emerald-50 hover:border-emerald-200 active:scale-95 disabled:opacity-30 disabled:pointer-events-none shadow-sm"
              aria-label="Scroll left"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              className="w-10 h-10 rounded-full border border-stone-200 bg-white flex items-center justify-center text-stone-600 transition-all hover:bg-emerald-50 hover:border-emerald-200 active:scale-95 disabled:opacity-30 disabled:pointer-events-none shadow-sm"
              aria-label="Scroll right"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Carousel */}
        <div
          ref={containerRef}
          className="flex gap-5 overflow-x-auto snap-x snap-mandatory pb-4 -mx-4 px-4 sm:-mx-6 sm:px-6"
          style={{ scrollbarWidth: 'none' as const, msOverflowStyle: 'none' } as React.CSSProperties}
        >
          {related.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="w-[280px] sm:w-[320px] shrink-0 snap-start group"
            >
              <div className="bg-white rounded-2xl overflow-hidden border border-stone-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 h-full flex flex-col">
                {/* Image */}
                <div className="w-full h-[180px] overflow-hidden bg-stone-100 shrink-0">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-1">
                  <span className="inline-block px-2.5 py-0.5 bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider rounded-full mb-3 self-start">
                    {post.category}
                  </span>
                  <h3 className="font-bold text-stone-900 text-[15px] leading-snug mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-stone-500 text-xs leading-relaxed line-clamp-2 mb-4 flex-1">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-xs text-stone-400 pt-3 border-t border-stone-100 mt-auto">
                    <span>{post.date}</span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {post.readTime}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
