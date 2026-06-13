import { notFound } from 'next/navigation';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { ProductCard } from '@/components/shared/ProductCard';
import { ProductDetailsClient } from '@/components/product/ProductDetailsClient';
import { ProductReviews } from '@/components/product/ProductReviews';
import { FaqSection } from '@/components/shared/FaqSection';
import { RecentlyViewedTracker } from '@/components/product/RecentlyViewedTracker';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const product = await prisma.product.findUnique({
    where: { slug: resolvedParams.slug },
    include: {
      categories: true,
      reviews: {
        include: { user: true },
        orderBy: { createdAt: 'desc' },
      }
    }
  });
  
  if (!product) {
    notFound();
  }

  // Get 4 random related products
  const allOtherProducts = await prisma.product.findMany({
    where: { id: { not: product.id } },
    select: { id: true }
  });
  
  const shuffledIds = allOtherProducts
    .sort(() => 0.5 - Math.random())
    .slice(0, 4)
    .map(p => p.id);
  
  const relatedProducts = await prisma.product.findMany({
    where: { id: { in: shuffledIds } },
    include: { reviews: true }
  });

  const images = JSON.parse(product.images);

  // Use custom FAQs if available, otherwise generate dynamic FAQs based on product attributes
  const faqs = product.faqs ? JSON.parse(product.faqs).map((faq: any) => ({
    question: faq.q,
    answer: faq.a
  })) : [
    {
      question: `How often should I water my ${product.name}?`,
      answer: product.waterReq 
        ? `This plant has ${product.waterReq.toLowerCase()} water requirements. Generally, allow the top 2 inches of soil to dry out completely before watering again.`
        : `Allow the top inch of soil to dry out between waterings. Adjust frequency based on your home's humidity and temperature.`
    },
    {
      question: `What kind of light does the ${product.name} need?`,
      answer: `It thrives best in ${product.lightReq.toLowerCase().replace('_', ' ')} light. Avoid direct harsh sunlight which can scorch the leaves.`
    },
    {
      question: `Is the ${product.name} safe for pets?`,
      answer: product.petFriendly 
        ? `Yes! This plant is completely non-toxic and safe to keep around cats and dogs.`
        : `No, this plant can be toxic if ingested. We recommend keeping it out of reach of curious pets.`
    },
    {
      question: `Does this plant help purify the air?`,
      answer: product.airPurifier 
        ? `Yes, this is an excellent air-purifying plant that helps remove indoor toxins and improves air quality.`
        : `While all plants contribute to better air, this specific variety is not heavily known for its air-purifying qualities.`
    }
  ];

  return (
    <div className="min-h-screen bg-[#FDFDF9]">
      <RecentlyViewedTracker product={product} />
      
      {/* Breadcrumb */}
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/shop">Shop</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="font-medium text-primary">{product.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {/* Main Product Section Wrapper */}
      <main className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-24">
        <ProductDetailsClient product={product} initialImages={images} />
      </main>
      {/* Reviews Section */}
      <ProductReviews 
        productId={product.id} 
        reviews={product.reviews as any} 
        path={`/product/${product.slug}`} 
      />

      {/* FAQ Section */}
      <FaqSection 
        title={`Frequently Asked Questions about ${product.name}`}
        items={faqs} 
      />

      {/* Related Products */}
      <div className="bg-[#F8FFF9] py-32 border-t border-border/30 relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16">
            <div>
              <h2 className="text-4xl lg:text-5xl font-extrabold tracking-tight mb-4">You Might Also Like</h2>
              <p className="text-xl text-muted-foreground font-medium">Curated recommendations based on your selection.</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {relatedProducts.map(p => {
              const pImages = JSON.parse(p.images as string);
              const reviewsCount = p.reviews?.length || 0;
              const rating = reviewsCount > 0 ? Number((p.reviews.reduce((acc: number, r: any) => acc + r.rating, 0) / reviewsCount).toFixed(1)) : 5.0;
              return (
                <ProductCard 
                  key={p.id} 
                  id={p.slug}
                  name={p.name}
                  tagline={p.description.substring(0, 60) + "..."}
                  price={p.salePrice || p.price}
                  originalPrice={p.salePrice ? p.price : undefined}
                  rating={rating}
                  reviewsCount={reviewsCount}
                  badge={p.isFeatured ? "Featured" : undefined}
                  image={pImages[0]} 
                />
              )
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
