import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { BLOG_POSTS } from '@/lib/blog-data';

export function BlogSection() {
  const articles = BLOG_POSTS.slice(0, 3);

  return (
    <section className="py-16 lg:py-32 bg-white">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 font-sans text-stone-900">Latest from the Journal</h2>
            <p className="text-stone-500 text-xl leading-relaxed font-medium">Expert tips, care guides, and botanical inspiration.</p>
          </div>
          <Link href="/blog" className="group flex items-center gap-2 font-bold text-lg text-[#052E16] hover:text-[#052E16]/80 transition-colors">
            Read all articles 
            <span className="bg-[#052E16]/5 p-2 rounded-full group-hover:bg-[#052E16]/10 transition-colors">
              <ArrowRight className="h-5 w-5" />
            </span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {articles.map((article) => (
            <Link key={article.slug} href={`/blog/${article.slug}`} className="group flex flex-col">
              <div className="relative aspect-[4/3] rounded-[32px] overflow-hidden mb-6 bg-stone-100">
                <Image 
                  src={article.image} 
                  alt={article.title} 
                  fill 
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="flex items-center gap-4 mb-3">
                <span className="text-xs font-bold uppercase tracking-widest text-primary">{article.category}</span>
                <span className="w-1 h-1 rounded-full bg-stone-300" />
                <span className="text-sm font-medium text-stone-500">{article.date}</span>
              </div>
              <h3 className="text-2xl font-bold text-stone-900 group-hover:text-primary transition-colors leading-snug tracking-tight">
                {article.title}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
