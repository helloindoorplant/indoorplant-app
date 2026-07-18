import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import prisma from '@/lib/prisma';
import { getStateBySlug, APPROVED_STATES, getCityBySlug } from '@/lib/seo/city-data';
import { MapPin, ArrowRight } from 'lucide-react';

export async function generateStaticParams() {
  return APPROVED_STATES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const stateConfig = getStateBySlug(slug);
  if (!stateConfig) return { title: 'Not Found' };

  // Fallback to checking the database to see if the state is active and indexed
  const hub = await prisma.stateHub.findUnique({ where: { slug } }).catch(() => null);
  
  if (!hub || !hub.isActive) {
    return { title: 'Not Found' };
  }

  const title = hub.metaTitle ?? `Indoor Plants in ${stateConfig.stateName} — Buy Online | IndoorPlant.in`;
  const description = hub.metaDesc ?? `Buy indoor plants in ${stateConfig.stateName}. Fresh delivery across major cities including ${stateConfig.citySlugs.map(s => getCityBySlug(s)?.cityName).join(', ')}.`;

  return {
    title,
    description,
    alternates: { canonical: `https://www.indoorplant.in/plants/state/${slug}` },
    robots: hub.isIndexed ? { index: true, follow: true } : { index: false, follow: false },
    openGraph: { title, description, url: `https://www.indoorplant.in/plants/state/${slug}`, type: 'website' },
  };
}

export default async function StateHubPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const stateConfig = getStateBySlug(slug);
  if (!stateConfig) notFound();

  const hub = await prisma.stateHub.findUnique({ where: { slug } }).catch(() => null);
  
  // Rule: OFF by default (404 until enabled). 
  // If no hub exists, or it's not active, return 404.
  if (!hub || !hub.isActive) {
    notFound();
  }

  // Fetch all active cities in this state
  const cities = await prisma.cityHub.findMany({
    where: { 
      slug: { in: stateConfig.citySlugs },
      isActive: true
    },
    orderBy: { cityName: 'asc' }
  }).catch(() => []);

  // For sandbox dev environment if DB isn't seeded
  const citiesToRender = cities.length > 0 ? cities : stateConfig.citySlugs.map(s => getCityBySlug(s)).filter(Boolean) as any[];

  return (
    <div className="bg-gray-50 min-h-screen pt-12 pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <nav className="flex text-sm text-gray-500 mb-8" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            </li>
            <li>
              <div className="flex items-center">
                <span className="mx-2 text-gray-400">/</span>
                <Link href="/plants" className="hover:text-primary transition-colors">Locations</Link>
              </div>
            </li>
            <li aria-current="page">
              <div className="flex items-center">
                <span className="mx-2 text-gray-400">/</span>
                <span className="text-gray-900 font-medium">{stateConfig.stateName}</span>
              </div>
            </li>
          </ol>
        </nav>

        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 font-playfair tracking-tight mb-4">
            Plant Delivery in {stateConfig.stateName}
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose your city below to browse local delivery options, care guides, and plant availability across {stateConfig.stateName}.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6">
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {citiesToRender.map((city) => (
                <li key={city.slug}>
                  <Link 
                    href={`/plants/${city.slug}`}
                    className="group flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:border-primary/30 hover:bg-primary/5 transition-all"
                  >
                    <span className="font-medium text-gray-700 group-hover:text-primary transition-colors">
                      {city.cityName}
                    </span>
                    <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-primary transition-colors transform group-hover:translate-x-1" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
}
