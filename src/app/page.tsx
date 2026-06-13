import prisma from '@/lib/prisma';
import Link from 'next/link';
import { ArrowRight, Leaf, ShieldCheck, Truck, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/shared/ProductCard';
import { CategoryCard } from '@/components/shared/CategoryCard';
import { HeroSlider } from '@/components/home/HeroSlider';
import { AiTeaser } from '@/components/home/AiTeaser';
import { PlantersSection } from '@/components/home/PlantersSection';
import { BalancedBeauty } from '@/components/home/BalancedBeauty';
import { UspSection } from '@/components/home/UspSection';
import { TestimonialSlider } from '@/components/home/TestimonialSlider';
import { BlogSection } from '@/components/home/BlogSection';



export const dynamic = 'force-dynamic';

export default async function Home() {
  const products = await prisma.product.findMany({
    take: 4,
    orderBy: { createdAt: 'desc' },
    include: { reviews: true }
  });

  const categories = await prisma.category.findMany({
    include: { _count: { select: { products: true } } },
    where: { slug: { in: ['air-purifying-plants', 'low-maintenance-plants', 'pet-friendly-plants', 'bedroom-plants'] } }
  });

  return (
    <div className="flex flex-col min-h-screen">
      <HeroSlider />

      {/* AI Teaser Strip */}
      <AiTeaser />

      {/* Featured Categories */}
      <section className="py-16 lg:py-32 bg-white">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-stone-900">Shop by Category</h2>
              <p className="text-stone-500 text-xl leading-relaxed font-medium">Curated collections to match your exact environment and experience level.</p>
            </div>
            <Button variant="outline" className="hidden sm:flex rounded-full border-2 h-12 px-6 font-bold hover:bg-stone-50" asChild>
              <Link href="/shop">View all categories</Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
            {[
              { name: "Air Purifying", slug: "air-purifying", dbSlug: "air-purifying", colorClass: "bg-[#52B788]", image: "https://images.unsplash.com/photo-1597055181300-e3633a207517?q=80&w=800&auto=format&fit=crop" },
              { name: "Low Maintenance", slug: "low-maintenance", dbSlug: "low-maintenance", colorClass: "bg-[#2D6A4F]", image: "https://images.unsplash.com/photo-1600411833196-7c1f6b1a8b90?q=80&w=800&auto=format&fit=crop" },
              { name: "Pet Safe", slug: "pet-safe", dbSlug: "pet-friendly", colorClass: "bg-[#B7E4C7]", image: "https://images.unsplash.com/photo-1599598425947-330026296906?q=80&w=800&auto=format&fit=crop" },
              { name: "Bedroom Plants", slug: "bedroom", dbSlug: "bedroom-plants", colorClass: "bg-[#052E16]", image: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?q=80&w=800&auto=format&fit=crop" }
            ].map(cat => {
              const dbCat = categories.find(c => c.slug.includes(cat.dbSlug));
              return (
                <CategoryCard 
                  key={cat.name}
                  name={cat.name} 
                  count={dbCat ? dbCat._count.products : 0} 
                  slug={dbCat ? dbCat.slug : cat.slug} 
                  colorClass={cat.colorClass} 
                  image={cat.image} 
                />
              );
            })}
          </div>
        </div>
      </section>

      {/* Bestsellers */}
      <section className="py-16 lg:py-32 bg-[#F8FFF9] relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/50 pointer-events-none" />
        
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-10 lg:mb-20">
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">Our Bestsellers</h2>
            <p className="text-muted-foreground text-xl leading-relaxed font-medium">Loved by thousands of plant parents across India. Unmatched quality and freshness.</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-10">
            {products.map((product) => {
              const images = JSON.parse(product.images as string);
              const reviewsCount = product.reviews?.length || 0;
              const rating = reviewsCount > 0 ? Number((product.reviews.reduce((acc: number, r: any) => acc + r.rating, 0) / reviewsCount).toFixed(1)) : 5.0;
              return (
                <ProductCard 
                  key={product.id}
                  id={product.slug}
                  name={product.name}
                  tagline={product.description.substring(0, 50) + "..."}
                  price={product.salePrice || product.price}
                  originalPrice={product.salePrice ? product.price : undefined}
                  rating={rating}
                  reviewsCount={reviewsCount}
                  image={images[0]} 
                  badge={product.isFeatured ? "Bestseller" : undefined}
                />
              );
            })}
          </div>
          
          <div className="mt-10 lg:mt-20 text-center">
            <Button variant="outline" size="lg" className="rounded-full px-10 h-14 text-[16px] font-bold border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all shadow-lg hover:shadow-xl" render={<Link href="/shop" />}>
              Explore All Plants
            </Button>
          </div>
        </div>
      </section>

      {/* Planters Section */}
      <PlantersSection />

      {/* Balanced Beauty Banner */}
      <BalancedBeauty />

      {/* USP Section */}
      <UspSection />

      {/* Testimonials */}
      <TestimonialSlider />

      {/* Blog Section */}
      <BlogSection />
    </div>
  );
}
