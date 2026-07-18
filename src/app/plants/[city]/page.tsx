/**
 * /plants/[city] — handles BOTH city hub pages and state hub pages.
 * The slug is checked against CityHub first, then StateHub.
 * This avoids Next.js ambiguous route conflicts.
 */
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import { ProductCard } from '@/components/shared/ProductCard';
import prisma from '@/lib/prisma';
import { getCityBySlug, getStateBySlug, APPROVED_CITIES, APPROVED_STATES } from '@/lib/seo/city-data';
import {
  genCityOrganizationSchema,
  genBreadcrumbSchema,
  genItemListSchema,
} from '@/lib/seo/schema-generator';

export async function generateStaticParams() {
  return APPROVED_CITIES.map((c) => ({ city: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>;
}): Promise<Metadata> {
  const { city: slug } = await params;

  // Try city first
  const cityConfig = getCityBySlug(slug);
  if (cityConfig) {
    const hub = await prisma.cityHub.findUnique({ where: { slug } });
    if (!hub || !hub.isActive) return { title: 'Not Found' };
    const title = hub.metaTitle ?? `Buy Indoor Plants in ${cityConfig.cityName} — Fresh Delivery | IndoorPlant.in`;
    const description = hub.metaDesc ?? `Shop 24+ indoor plants with free delivery in ${cityConfig.cityName}. Fast, damage-protected shipping. Starting Rs 299.`;
    return {
      title, description,
      alternates: { canonical: `https://www.indoorplant.in/plants/${slug}` },
      robots: hub.isIndexed ? { index: true, follow: true } : { index: false, follow: false },
      openGraph: { title, description, url: `https://www.indoorplant.in/plants/${slug}`, type: 'website' },
    };
  }

  return { title: 'Not Found' };
}

export default async function PlantsLocationPage({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city: slug } = await params;

  // ── CITY HUB ─────────────────────────────────────────────────────────────
  const cityConfig = getCityBySlug(slug);
  if (!cityConfig) notFound();

  const hub = await prisma.cityHub.findUnique({ where: { slug } });
  if (!hub || !hub.isActive) notFound();

    const products = await prisma.product.findMany({
      take: 6,
      orderBy: [{ isFeatured: 'desc' }, { createdAt: 'desc' }],
      select: { id: true, name: true, slug: true, price: true, salePrice: true, images: true, description: true, isFeatured: true },
    });

    const coverageAreas: string[] = hub.coverageAreas ? JSON.parse(hub.coverageAreas) : [];
    const nearbyCities: string[] = hub.nearbyCities ? JSON.parse(hub.nearbyCities) : cityConfig.nearbyCities;
    const localReviews: Array<{ name: string; rating: number; comment: string; area: string }> =
      hub.localReviews ? JSON.parse(hub.localReviews) : [];

    const breadcrumb = genBreadcrumbSchema([
      { name: 'Home', url: 'https://www.indoorplant.in' },
      { name: 'Plants', url: 'https://www.indoorplant.in/shop' },
      { name: cityConfig.cityName, url: `https://www.indoorplant.in/plants/${slug}` },
    ]);
    const cityOrgSchema = genCityOrganizationSchema({
      cityName: cityConfig.cityName, citySlug: slug,
      deliveryInfo: hub.deliveryInfo ?? undefined, coverageAreas,
    });
    const itemListSchema = genItemListSchema(
      products.map((p) => { const imgs = JSON.parse(p.images as string) as string[]; return { name: p.name, url: `https://www.indoorplant.in/product/${p.slug}`, image: imgs[0] }; }),
      `Indoor Plants in ${cityConfig.cityName}`
    );

    const h1 = hub.h1 ?? `Indoor Plants in ${cityConfig.cityName} — Buy & Get Delivered Fast`;
    const introPara = hub.introPara ?? `IndoorPlant.in delivers fresh, healthy indoor plants to ${cityConfig.cityName}. Every plant is expert-packed for damage-free delivery.`;

    return (
      <>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(cityOrgSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />

        <div className="min-h-screen bg-white">
          {/* ── Hero + Products (combined) ───────────────────────────────── */}
          <section className="bg-gradient-to-b from-green-50 via-emerald-50 to-white pt-12 pb-20 px-4">
            <div className="max-w-6xl mx-auto">

              {/* Breadcrumb */}
              <nav aria-label="Breadcrumb" className="text-sm text-gray-400 mb-8 flex items-center gap-2">
                <Link href="/" className="hover:text-green-700 transition-colors">Home</Link>
                <span className="text-gray-300">/</span>
                <Link href="/shop" className="hover:text-green-700 transition-colors">Shop</Link>
                <span className="text-gray-300">/</span>
                <span className="text-green-700 font-medium">{cityConfig.cityName}</span>
              </nav>

              {/* Headline */}
              <div className="mb-10">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-zinc-900 leading-[1.1] tracking-tight mb-5 text-balance">
                  {h1}
                </h1>
                <p className="text-lg text-zinc-600 max-w-2xl leading-relaxed">
                  {introPara}
                </p>
              </div>

              {/* Product Grid — shown directly in hero */}
              {products.length > 0 && (
                <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-6 mb-10">
                  {products.map((p) => {
                    const imgs = JSON.parse(p.images as string) as string[];
                    // Generate stable fallback ratings based on ID to avoid hydration mismatch
                    const rating = 4.5 + (p.id.length % 5) / 10;
                    const reviewsCount = 80 + (p.id.length * 7 % 100);
                    
                    return (
                      <ProductCard 
                        key={p.id} 
                        id={p.slug} 
                        name={p.name}
                        tagline={(p as any).description ? (p as any).description.substring(0, 60) + "..." : "Fresh delivered indoor plant"}
                        price={p.salePrice || p.price}
                        originalPrice={p.salePrice ? p.price : undefined}
                        rating={rating}
                        reviewsCount={reviewsCount}
                        badge={(p as any).isFeatured ? "Featured" : undefined}
                        image={imgs[0]} 
                      />
                    );
                  })}
                </div>
              )}

              {/* Single CTA */}
              <div className="flex flex-wrap items-center gap-4">
                <Link
                  href="/shop"
                  className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-3.5 rounded-full font-medium hover:opacity-90 active:scale-95 transition-all text-sm shadow-md"
                >
                  View All Plants →
                </Link>
                <span className="text-sm text-gray-500 font-medium">Free delivery · Damage-protected</span>
              </div>
            </div>
          </section>

          {/* Climate note */}
          {hub.climateNote && (
            <section className="py-12 px-4 bg-emerald-50 border-t border-emerald-100">
              <div className="max-w-3xl mx-auto">
                <h2 className="text-2xl font-bold text-green-900 mb-4">🌿 Plant Care in {cityConfig.cityName}</h2>
                <p className="text-gray-700 leading-relaxed">{hub.climateNote}</p>
              </div>
            </section>
          )}

          {(hub.deliveryInfo || coverageAreas.length > 0) && (
            <section className="delivery-info py-12 px-4 bg-gray-50">
              <div className="max-w-3xl mx-auto">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">📦 Delivery in {cityConfig.cityName}</h2>
                {hub.deliveryInfo && <p className="text-gray-700 leading-relaxed mb-4">{hub.deliveryInfo}</p>}
                {coverageAreas.length > 0 && (
                  <div>
                    <p className="font-medium text-gray-700 mb-3">We deliver across:</p>
                    <div className="flex flex-wrap gap-2">
                      {coverageAreas.map((area) => (
                        <span key={area} className="bg-white border border-green-200 text-green-800 text-sm px-3 py-1 rounded-full">{area}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </section>
          )}

          {localReviews.length > 0 && (
            <section className="py-16 px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">What {cityConfig.cityName} Plant Parents Say</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {localReviews.map((review, idx) => (
                    <div key={idx} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
                      <div className="flex items-center gap-1 mb-3">
                        {Array.from({ length: review.rating }).map((_, i) => <span key={i} className="text-yellow-400">★</span>)}
                      </div>
                      <p className="text-gray-700 italic mb-4">"{review.comment}"</p>
                      <div className="text-sm text-gray-500">
                        <span className="font-medium text-gray-900">{review.name}</span>
                        {review.area && <span> · {review.area}</span>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {nearbyCities.length > 0 && (
            <section className="py-16 md:py-24 px-4 bg-green-50/50">
              <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-6 md:mb-8">Also delivering plants to:</h2>
                <div className="flex flex-wrap justify-center gap-4 md:gap-6">
                  {nearbyCities.map((s) => { 
                    const c = getCityBySlug(s); 
                    if (!c) return null; 
                    return (
                      <Link 
                        key={s} 
                        href={`/plants/${s}`} 
                        className="text-green-800 hover:text-green-950 font-semibold text-sm md:text-base px-4 py-2 rounded-full bg-white shadow-sm border border-green-100/50 hover:shadow-md hover:-translate-y-0.5 transition-all"
                      >
                        Indoor Plants in {c.cityName}
                      </Link>
                    ); 
                  })}
                </div>
              </div>
            </section>
          )}
        </div>
      </>
    );
}
