import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { ProductCard } from '@/components/shared/ProductCard';
import { ProductDetailsClient } from '@/components/product/ProductDetailsClient';
import { ProductReviews } from '@/components/product/ProductReviews';
import { FaqSection } from '@/components/shared/FaqSection';
import { RecentlyViewedTracker } from '@/components/product/RecentlyViewedTracker';
import { Metadata } from 'next';
import { genBreadcrumbSchema } from '@/lib/seo/schema-generator';

const PRODUCT_METADATA_MAP: Record<string, { description: string, keywords: string[] }> = {
  "njoy-money-plant": {
    description: "The N'Joy Money Plant has crisp white-and-green variegated leaves that look nothing like a typical money plant. Water once a week. Comes in a nursery pot. Free delivery. Rs 299.",
    keywords: ["njoy money plant buy online India", "njoy money plant India", "variegated money plant India", "njoy pothos online India", "white variegated money plant", "money plant buy online India"]
  },
  "golden-money-plant": {
    description: "The Golden Money Plant has heart-shaped golden-green leaves and grows in almost any light condition. Water every 7-10 days. India's most popular indoor plant. Free delivery. Rs 680.",
    keywords: ["golden money plant buy online India", "golden pothos India", "money plant online India", "buy money plant India", "vastu money plant India", "good luck plant India"]
  },
  "monstera-broken-heart": {
    description: "The Monstera Broken Heart is a compact climbing plant with split leaves and a fast growth rate. Loves humid Indian weather. Water every 5-7 days. Free delivery. Rs 768.",
    keywords: ["monstera broken heart plant India", "buy monstera plant online India", "rhaphidophora tetrasperma India", "mini monstera India", "split leaf plant India"]
  },
  "aglaonema-red-lipstick-plant": {
    description: "The Aglaonema Red Lipstick has dark green leaves with bold red edges. Handles low light well. Water once a week. Good for Indian flats without direct sunlight. Free delivery. Rs 878.",
    keywords: ["aglaonema red lipstick plant India", "buy aglaonema online India", "red aglaonema plant India", "chinese evergreen red India", "low light indoor plant India"]
  },
  "lucky-jade-plant": {
    description: "The Jade Plant is a succulent that grows into a small tree and survives months of neglect. Water every 2-3 weeks. Works well on sunny balconies and windowsills. Free delivery. Rs 649.",
    keywords: ["jade plant buy online India", "lucky jade plant India", "crassula ovata India", "succulent plants online India", "jade plant price India", "vastu plant for home India", "balcony plants India"]
  },
  "bamboo-palm-plant": {
    description: "The Bamboo Palm grows to 4-5 feet and handles low light well — one of the few large indoor plants that works in Indian flats. Air purifying. Free delivery. Rs 449.",
    keywords: ["bamboo palm plant India", "buy bamboo palm online India", "indoor palm plant India", "large indoor plants India", "tall indoor plants India", "palm plant for home India"]
  },
  "aglaonema-snow-white-plant": {
    description: "The Aglaonema Snow White has broad cream-and-green patterned leaves. Grows well in low light. Slow grower that needs water once a week. Free delivery. Rs 768.",
    keywords: ["aglaonema snow white India", "buy aglaonema snow white", "white indoor plant India", "cream aglaonema India", "low light indoor plant India"]
  },
  "money-plant-variegated": {
    description: "The Variegated Money Plant has heart-shaped leaves in white, yellow, and green. Grows in water or soil. Easy for beginners in Indian homes. Free delivery. Rs 657.",
    keywords: ["variegated money plant India", "money plant variegated buy online", "white money plant India", "pothos variegated India", "beginner indoor plants India"]
  }
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const product = await prisma.product.findUnique({
    where: { slug: resolvedParams.slug }
  });

  if (!product) {
    return { title: "Product Not Found | IndoorPlant.in" };
  }

  const price = product.salePrice || product.price;
  const mapped = PRODUCT_METADATA_MAP[product.slug];

  if (mapped) {
    return {
      title: `Buy ${product.name} Online India — ₹${price} | IndoorPlant.in`,
      description: mapped.description,
      keywords: mapped.keywords,
      openGraph: {
        title: `${product.name} — ₹${price} | IndoorPlant.in`,
        description: mapped.description,
        url: `https://www.indoorplant.in/product/${product.slug}`
      }
    };
  }

  const generatedDesc = `${product.name} is a beautiful indoor plant suited for Indian homes. Light requirement: ${product.lightReq.toLowerCase().replace('_', ' ')}. Water requirement: ${product.waterReq ? product.waterReq.toLowerCase() : 'when dry'}. ₹${price}, free delivery.`;

  return {
    title: `Buy ${product.name} Online India — ₹${price} | IndoorPlant.in`,
    description: generatedDesc,
    keywords: [`buy ${product.name} online`, `${product.name} India`, `indoor plant ${product.name}`],
    openGraph: {
      title: `Buy ${product.name} Online India — ₹${price} | IndoorPlant.in`,
      description: generatedDesc,
      url: `https://www.indoorplant.in/product/${product.slug}`
    }
  };
}

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

  const reviewsCount = product.reviews?.length || 0;
  const rating = reviewsCount > 0 ? Number((product.reviews.reduce((acc: number, r: any) => acc + r.rating, 0) / reviewsCount).toFixed(1)) : 5.0;
  const ratingValue = reviewsCount > 0 ? rating : 4.5;
  const ratingCount = reviewsCount > 0 ? reviewsCount : 1;

  const jsonLd: any = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "description": product.description,
    "image": images[0],
    "sku": product.slug,
    "brand": {
      "@type": "Brand",
      "name": "IndoorPlant.in"
    },
    "offers": {
      "@type": "Offer",
      "url": `https://www.indoorplant.in/product/${product.slug}`,
      "priceCurrency": "INR",
      "price": product.salePrice || product.price,
      "priceValidUntil": "2026-12-31",
      "itemCondition": "https://schema.org/NewCondition",
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "Organization",
        "name": "IndoorPlant.in"
      }
    }
  };

  if (reviewsCount > 0) {
    jsonLd.aggregateRating = {
      "@type": "AggregateRating",
      "ratingValue": rating.toString(),
      "reviewCount": reviewsCount.toString(),
      "bestRating": "5",
      "worstRating": "1"
    };
  }

  const breadcrumbJsonLd = genBreadcrumbSchema([
    { name: 'Home', url: 'https://www.indoorplant.in' },
    { name: 'Shop', url: 'https://www.indoorplant.in/shop' },
    { name: product.name, url: `https://www.indoorplant.in/product/${product.slug}` }
  ]);

  return (
    <div className="min-h-screen bg-[#FDFDF9]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
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
      <main className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ProductDetailsClient product={product} initialImages={images} />
        
        {/* Delivery in your city block */}
        <div className="mt-16 mb-12 bg-green-50/50 rounded-3xl p-8 lg:p-12 text-center max-w-4xl mx-auto border border-green-100">
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-6">Delivery in your city</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto text-lg">
            We deliver {product.name} to major cities across India. Fast shipping, expert packing, and guaranteed healthy arrival.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {['bengaluru', 'delhi', 'mumbai', 'pune', 'chennai'].map(city => (
              <Link 
                key={city}
                href={`/plants/${city}`} 
                className="bg-white hover:bg-green-50 border border-green-200 text-green-800 px-6 py-3 rounded-full font-semibold transition-colors shadow-sm hover:shadow-md"
              >
                {city.charAt(0).toUpperCase() + city.slice(1)}
              </Link>
            ))}
          </div>
          <div className="mt-8">
            <Link href="/plants" className="text-green-700 font-medium hover:underline inline-flex items-center gap-1">
              View all delivery cities <span className="translate-y-[1px]">→</span>
            </Link>
          </div>
        </div>
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
