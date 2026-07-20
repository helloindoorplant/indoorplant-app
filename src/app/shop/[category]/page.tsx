import prisma from '@/lib/prisma';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Filter, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetHeader } from '@/components/ui/sheet';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { ProductCard } from '@/components/shared/ProductCard';
import { FilterSidebar } from '@/components/shop/FilterSidebar';
import { Metadata } from 'next';
import { genBreadcrumbSchema } from '@/lib/seo/schema-generator';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const slug = resolvedParams.category;
  
  const productCount = await prisma.product.count({
    where: { categories: { some: { slug } } }
  });
  
  const robots = productCount < 3 ? { index: false, follow: true } : { index: true, follow: true };
  
  if (slug === 'air-purifying-plants') {
    return {
      title: "Air Purifying Plants Online India — Buy Fresh | IndoorPlant.in",
      description: "Indoor plants that clean the air in Indian homes — snake plants, peace lilies, money plants. NASA-tested varieties. From Rs 299, free delivery across India.",
      keywords: ["air purifying plants India", "air purifying indoor plants online", "best air purifying plants India", "nasa air purifying plants", "plants that clean air India", "oxygen plants for home India", "snake plant air purifier India", "air cleaning plants home India"],
      robots
    };
  } else if (slug === 'low-maintenance-plants') {
    return {
      title: "Hard to Kill Indoor Plants India — Low Maintenance | IndoorPlant.in",
      description: "Indoor plants for people who travel, forget to water, or want greenery without stress. Jade plants, snake plants, pothos. Delivered across India from Rs 299.",
      keywords: ["low maintenance indoor plants India", "easy care houseplants India", "plants for busy people India", "hard to kill plants India", "plants for beginners India", "low water plants India", "indoor plants for working professionals", "drought tolerant indoor plants India"],
      robots
    };
  } else if (slug === 'pet-friendly-plants') {
    return {
      title: "Pet Safe Indoor Plants India — Non-Toxic for Dogs and Cats | IndoorPlant.in",
      description: "Indoor plants that are completely safe around dogs and cats. ASPCA-verified non-toxic varieties — spider plants, areca palms, Boston ferns. Free delivery across India.",
      keywords: ["pet safe plants India", "non toxic plants for cats India", "non toxic plants for dogs India", "pet friendly indoor plants", "safe plants for pets India", "plants safe for dogs and cats India", "cat safe plants India", "dog safe houseplants India", "aspca safe plants India"],
      robots
    };
  } else if (slug === 'bedroom-plants') {
    return {
      title: "Bedroom Plants India — Oxygen at Night, Better Sleep | IndoorPlant.in",
      description: "Indoor plants for bedrooms that release oxygen at night and reduce indoor CO2. Snake plants, aloe vera — chosen for Indian bedroom sizes and light conditions.",
      keywords: ["bedroom plants India", "plants for bedroom India", "best plants for bedroom India", "plants that release oxygen at night", "plants for better sleep India", "indoor plants for bedroom low light", "night oxygen plants India", "snake plant bedroom India"],
      robots
    };
  } else if (slug === 'plants-under-500') {
    return {
      title: "Buy Indoor Plants Under 500 Rs Online India | IndoorPlant.in",
      description: "Beautiful, healthy indoor plants under Rs 500 with free delivery across India. Pre-potted in premium soil. Perfect for gifting and beginners.",
      keywords: ["indoor plants under 500", "cheap indoor plants online india", "plants below 500 rupees", "budget indoor plants", "affordable plants india", "buy plants under 500", "cheap plants with free delivery"],
      robots
    };
  } else if (slug === 'plants-for-apartments') {
    return {
      title: "Indoor Plants for Renters India — No Drill, Easy Move | IndoorPlant.in",
      description: "The best indoor plants for rented apartments in India. Compact, low-maintenance, and easy to move when you relocate. Beautiful decor without drilling walls.",
      keywords: ["indoor plants for renters india", "plants for rented apartment", "apartment plants india", "no drill plant decor", "easy move indoor plants", "balcony plants for apartments"],
      robots
    };
  } else if (slug === 'low-light-plants') {
    return {
      title: "Plants for Dark Rooms India — Low Light Indoor Plants | IndoorPlant.in",
      description: "Indoor plants that thrive in dark rooms, bathrooms, and low-light Indian apartments. Shade-tolerant ZZ plants, Aglaonemas, and more.",
      keywords: ["plants for dark rooms india", "low light indoor plants", "bathroom plants india", "plants for shade indoors", "plants without sunlight", "zero sunlight plants india"],
      robots
    };
  }
  
  return {
    title: "Shop Indoor Plants | IndoorPlant.in",
    description: "Browse our collections of fresh indoor plants.",
    robots
  };
}

const CATEGORY_INTROS: Record<string, React.ReactNode> = {
  'air-purifying-plants': (
    <div className="prose prose-lg prose-gray max-w-4xl">
      <p className="mb-4 text-gray-700 leading-relaxed">
        Urban air quality is a growing concern across Indian cities. Our collection of <strong>air-purifying indoor plants</strong> serves as a natural, energy-free solution to filter out indoor pollutants like formaldehyde, benzene, and trichloroethylene—often emitted by fresh paint, synthetic carpets, and cleaning products. 
      </p>
      <p className="text-gray-700 leading-relaxed">
        Featuring NASA-tested powerhouses such as the Snake Plant, Peace Lily, and various Aglaonema varieties, these plants actively absorb CO2 and release fresh oxygen. Perfect for living rooms, home offices, and high-traffic areas, they not only breathe life into your decor but create a genuinely healthier environment for your family. All our air-purifying plants are potted in premium aerated soil mixtures designed specifically for Indian climate conditions, ensuring they thrive with minimal intervention.
      </p>
    </div>
  ),
  'low-maintenance-plants': (
    <div className="prose prose-lg prose-gray max-w-4xl">
      <p className="mb-4 text-gray-700 leading-relaxed">
        Not everyone has the time or the green thumb required for demanding houseplants—and that is perfectly fine. Our <strong>low-maintenance indoor plants</strong> are specially curated for busy professionals, frequent travelers, and absolute beginners. These resilient varieties are incredibly forgiving; they can survive missed waterings, adapt to fluctuating temperatures, and tolerate less-than-ideal lighting without losing their charm.
      </p>
      <p className="text-gray-700 leading-relaxed">
        From the drought-tolerant Jade Plant and structural ZZ Plant to the ever-trailing Golden Pothos, these species thrive on neglect. We package them in self-draining pots with specialized low-moisture soil to prevent the number one killer of houseplants: root rot. Enjoy lush, beautiful greenery in your apartment without the stress of a strict care schedule.
      </p>
    </div>
  ),
  'pet-friendly-plants': (
    <div className="prose prose-lg prose-gray max-w-4xl">
      <p className="mb-4 text-gray-700 leading-relaxed">
        As pet parents, keeping our furry companions safe is the top priority. Unfortunately, many popular houseplants are highly toxic to cats and dogs if ingested. Our <strong>pet-friendly indoor plants</strong> collection guarantees 100% ASPCA-verified non-toxic greenery, so you can decorate your home with complete peace of mind.
      </p>
      <p className="text-gray-700 leading-relaxed">
        Explore stunning, pet-safe options like the graceful Bamboo Palm, vibrant Spider Plant, and elegant Boston Fern. Whether your cat loves to nibble on dangling leaves or your dog is a curious digger, these plants pose zero threat to their health. We carefully vet every plant in this category to ensure no harmful saps, crystals, or toxins are present, allowing your indoor jungle and your pets to coexist beautifully.
      </p>
    </div>
  ),
  'bedroom-plants': (
    <div className="prose prose-lg prose-gray max-w-4xl">
      <p className="mb-4 text-gray-700 leading-relaxed">
        Transform your sleeping space into a tranquil, oxygen-rich sanctuary. While most plants absorb oxygen at night, our curated <strong>bedroom plants</strong> feature unique species that continue to release fresh oxygen and absorb CO2 even after the sun goes down, thanks to a process called Crassulacean Acid Metabolism (CAM).
      </p>
      <p className="text-gray-700 leading-relaxed">
        This constant nighttime purification can significantly improve your air quality, promoting deeper, more restful sleep. Varieties like the Snake Plant and Aloe Vera are renowned for this nighttime oxygen boost. Additionally, these plants are selected for their ability to thrive in the typically lower-light conditions of Indian bedrooms, requiring very little upkeep while providing maximum health benefits. Wake up feeling refreshed in a naturally purified environment.
      </p>
    </div>
  ),
  'plants-under-500': (
    <div className="prose prose-lg prose-gray max-w-4xl">
      <p className="mb-4 text-gray-700 leading-relaxed">
        You don't need a massive budget to create a stunning indoor jungle. Our <strong>indoor plants under ₹500</strong> are handpicked to provide incredible value without compromising on quality or size. Every plant in this collection arrives fully rooted, healthy, and pre-potted in our nutrient-rich soil mix—ready to thrive in your home on day one.
      </p>
      <p className="text-gray-700 leading-relaxed">
        Perfect for college students, new hobbyists, or as affordable eco-friendly gifts, these plants prove that greenery can be accessible to everyone. Enjoy damage-protected delivery across India and watch your budget-friendly plants transform your desk, windowsill, or bedside table.
      </p>
    </div>
  ),
  'plants-for-apartments': (
    <div className="prose prose-lg prose-gray max-w-4xl">
      <p className="mb-4 text-gray-700 leading-relaxed">
        Renting an apartment in India often comes with strict rules: no drilling holes in walls, limited floor space, and the inevitable hassle of moving every few years. That's why we curated this collection of the <strong>best indoor plants for renters</strong>. These plants require zero structural changes to your home—they look stunning on tables, bookshelves, or standalone stands.
      </p>
      <p className="text-gray-700 leading-relaxed">
        We've specifically chosen compact, durable varieties that can easily survive the stress of relocation in the back of a moving truck. Add a massive splash of personality and warmth to your rented flat without risking your security deposit.
      </p>
    </div>
  ),
  'low-light-plants': (
    <div className="prose prose-lg prose-gray max-w-4xl">
      <p className="mb-4 text-gray-700 leading-relaxed">
        Not everyone is blessed with a sun-drenched balcony or massive south-facing windows. If you live in a typically shaded Indian apartment, or want to add greenery to a windowless bathroom or dark hallway, our <strong>low-light indoor plants</strong> are exactly what you need. 
      </p>
      <p className="text-gray-700 leading-relaxed">
        These incredible shade-tolerant species—like the indestructible ZZ Plant and vibrant Aglaonemas—have adapted to survive on the forest floor under dense canopies. They will happily thrive in the dimmest corners of your home with minimal ambient light. Don't let a dark room stop you from enjoying nature indoors.
      </p>
    </div>
  )
};

export default async function CategoryShopPage({ params }: { params: Promise<{ category: string }> }) {
  const resolvedParams = await params;
  
  const category = await prisma.category.findUnique({
    where: { slug: resolvedParams.category }
  });

  if (!category) {
    notFound();
  }

  const products = await prisma.product.findMany({
    where: { 
      categories: {
        some: { id: category.id }
      } 
    },
    orderBy: { isFeatured: 'desc' },
    include: { reviews: true }
  });

  const breadcrumbJsonLd = genBreadcrumbSchema([
    { name: 'Home', url: 'https://www.indoorplant.in' },
    { name: 'Shop', url: 'https://www.indoorplant.in/shop' },
    { name: category.name, url: `https://www.indoorplant.in/shop/${category.slug}` }
  ]);

  return (
    <div className="bg-[#F8FFF9] min-h-screen pb-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
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
                <BreadcrumbLink href="/shop" className="hover:text-primary font-medium transition-colors">Shop</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="font-bold text-primary">{category.name}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <h1 className="text-4xl lg:text-6xl font-extrabold tracking-tight text-[#1B4332] mb-3">{category.name}</h1>
          {CATEGORY_INTROS[category.slug] ? (
            <div className="mt-4 mb-6 max-w-4xl">
              {CATEGORY_INTROS[category.slug]}
            </div>
          ) : (
            <p className="text-muted-foreground text-lg lg:text-xl font-medium max-w-2xl mb-6">
              {category.description || `Discover our collection of ${products.length} premium ${category.name.toLowerCase()}. Handpicked and delivered fresh.`}
            </p>
          )}
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
              {products.length > 0 ? (
                products.map((product) => {
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
                })
              ) : (
                <div className="col-span-full py-12 text-center text-muted-foreground">
                  No products found in this category.
                </div>
              )}
            </div>

            {/* Pagination / Load More */}
            {products.length > 0 && (
              <div className="mt-20 text-center">
                <Button size="lg" variant="outline" className="rounded-full px-12 h-16 text-[16px] font-bold border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all shadow-lg hover:shadow-xl hover:-translate-y-1">
                  Load More Plants
                </Button>
                <p className="mt-4 text-sm font-medium text-muted-foreground">Showing {products.length} of {products.length} products</p>
              </div>
            )}
          </div>
          
        </div>
      </div>
    </div>
  );
}
