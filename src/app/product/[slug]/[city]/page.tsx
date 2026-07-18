import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import prisma from '@/lib/prisma';
import { getCityBySlug } from '@/lib/seo/city-data';
import Link from 'next/link';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; city: string }>;
}): Promise<Metadata> {
  const { slug, city } = await params;

  // We are routing only, but we must enforce NOINDEX
  return {
    title: 'Product Availability',
    description: 'Local delivery availability',
    robots: { index: false, follow: false }, // STRICT ENFORCEMENT: Tier 2 hold
  };
}

export default async function ProductCityPage({
  params,
}: {
  params: Promise<{ slug: string; city: string }>;
}) {
  const { slug, city: citySlug } = await params;

  const cityConfig = getCityBySlug(citySlug);
  if (!cityConfig) notFound();

  // This is a stub for the future. 
  // For now, it just tells the user the page is under construction or redirects them,
  // but it exists in the router.
  
  const product = await prisma.product.findUnique({
    where: { slug },
  });

  if (!product) notFound();

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-24 text-center">
      <div className="max-w-2xl mx-auto px-4">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-6">
          <span className="text-2xl">🌱</span>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          {product.name} in {cityConfig.cityName}
        </h1>
        <p className="text-gray-600 mb-8">
          We are currently setting up our local delivery infrastructure for {product.name} in {cityConfig.cityName}. 
          Please check the main product page for national shipping options.
        </p>
        <Link 
          href={`/product/${slug}`}
          className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-primary rounded-xl hover:bg-primary/90 transition-colors"
        >
          View Main Product Page
        </Link>
      </div>
    </div>
  );
}
