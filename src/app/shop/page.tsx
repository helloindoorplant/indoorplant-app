import prisma from '@/lib/prisma';
import Link from 'next/link';
import { Filter, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetHeader } from '@/components/ui/sheet';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { ProductCard } from '@/components/shared/ProductCard';
import { FilterSidebar } from '@/components/shop/FilterSidebar';



export const dynamic = 'force-dynamic';

export default async function ShopPage() {
  const products = await prisma.product.findMany({
    orderBy: { isFeatured: 'desc' },
    include: { reviews: true }
  });
  return (
    <div className="bg-[#F8FFF9] min-h-screen pb-32">
      {/* Page Header */}
      <div className="bg-white border-b border-border/30 pt-10 pb-8 shadow-sm relative overflow-hidden">
        {/* Decorative background blur */}
        <div className="absolute right-0 top-0 w-1/3 h-full bg-[#D8F3DC] opacity-30 rounded-bl-[100px] pointer-events-none" />
        
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <Breadcrumb className="mb-6">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/" className="hover:text-primary font-medium transition-colors">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="font-bold text-primary">Shop All Plants</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <h1 className="text-4xl lg:text-6xl font-extrabold tracking-tight text-[#1B4332] mb-3">All Plants</h1>
          <p className="text-muted-foreground text-lg lg:text-xl font-medium max-w-2xl">Discover our collection of {products.length} premium indoor plants. Handpicked and delivered fresh.</p>
        </div>
      </div>

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-12">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-[280px] shrink-0">
            <div className="sticky top-28 bg-white p-6 rounded-3xl border border-border/40 shadow-sm">
              <FilterSidebar />
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 bg-white p-4 rounded-2xl border border-border/40 shadow-sm">
              <div className="flex items-center gap-4">
                {/* Mobile Filter Trigger */}
                <Sheet>
                  <SheetTrigger render={
                    <Button variant="outline" className="lg:hidden flex items-center gap-2 rounded-xl font-bold border-2 h-12 px-6">
                      <Filter className="h-4 w-4" /> Filters
                    </Button>
                  } />
                  <SheetContent side="left" className="w-[320px] sm:w-[400px] bg-[#F8FFF9] overflow-y-auto border-r-0 shadow-2xl p-6">
                    <SheetHeader className="mb-8 text-left">
                      <SheetTitle className="text-3xl font-extrabold tracking-tight text-[#1B4332]">Filters</SheetTitle>
                    </SheetHeader>
                    <FilterSidebar />
                  </SheetContent>
                </Sheet>
                <p className="text-[15px] font-bold text-muted-foreground hidden sm:block bg-secondary/50 px-4 py-2 rounded-xl">
                  Showing all {products.length} results
                </p>
              </div>

              {/* Sort */}
              <div className="flex items-center gap-3 bg-secondary/30 p-1.5 rounded-xl">
                <span className="text-[14px] font-bold text-muted-foreground pl-3">Sort by:</span>
                <Button variant="ghost" className="font-bold hover:bg-white hover:shadow-sm rounded-lg px-4 h-10 transition-all text-[#1B4332]">
                  Featured <ChevronDown className="ml-2 h-4 w-4 opacity-70" />
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
              {products.map((product) => {
                const images = JSON.parse(product.images as string);
                const reviewsCount = product.reviews?.length || 0;
                const rating = reviewsCount > 0 ? Number((product.reviews.reduce((acc: number, r: any) => acc + r.rating, 0) / reviewsCount).toFixed(1)) : 5.0;
                return (
                  <ProductCard 
                    key={product.id} 
                    id={product.slug} 
                    name={product.name}
                    tagline={product.description.substring(0, 60) + "..."}
                    price={product.salePrice || product.price}
                    originalPrice={product.salePrice ? product.price : undefined}
                    rating={rating}
                    reviewsCount={reviewsCount}
                    badge={product.isFeatured ? "Featured" : undefined}
                    image={images[0]} 
                  />
                );
              })}
            </div>

            {/* Pagination / Load More */}
            <div className="mt-20 text-center">
              <Button size="lg" variant="outline" className="rounded-full px-12 h-16 text-[16px] font-bold border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all shadow-lg hover:shadow-xl hover:-translate-y-1">
                Load More Plants
              </Button>
              <p className="mt-4 text-sm font-medium text-muted-foreground">Showing 6 of 24 products</p>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
