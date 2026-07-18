import Link from 'next/link';
import { Metadata } from 'next';
import prisma from '@/lib/prisma';
import { MapPin, ArrowRight } from 'lucide-react';
import { APPROVED_CITIES } from '@/lib/seo/city-data';

export const metadata: Metadata = {
  title: 'Cities We Deliver To | IndoorPlant.in',
  description: 'View all the cities across India where we deliver fresh, beautiful indoor plants directly to your door.',
};

export default async function PlantsIndexPage() {
  // Fetch active and indexed cities from DB
  const liveCities = await prisma.cityHub.findMany({
    where: { isActive: true, isIndexed: true },
    orderBy: { cityName: 'asc' }
  }).catch(() => []); // Fallback for dev if DB is unreachable

  // If DB returns empty, fallback to APPROVED_CITIES (useful for local dev without a seeded DB)
  const citiesToRender = liveCities.length > 0 
    ? liveCities 
    : APPROVED_CITIES.map(c => ({ slug: c.slug, cityName: c.cityName, state: c.state }));

  // Group by state
  const citiesByState = citiesToRender.reduce((acc, city) => {
    const state = city.state || 'Other';
    if (!acc[state]) acc[state] = [];
    acc[state].push(city);
    return acc;
  }, {} as Record<string, typeof citiesToRender>);

  return (
    <div className="bg-gray-50 min-h-screen pt-12 pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-6">
            <MapPin className="w-8 h-8" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 font-playfair tracking-tight mb-4">
            Cities We Deliver To
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We deliver fresh, healthy indoor plants to select cities across India. 
            Choose your city below to see local delivery info, care tips, and availability.
          </p>
        </div>

        <div className="space-y-12">
          {Object.entries(citiesByState).sort((a, b) => a[0].localeCompare(b[0])).map(([state, cities]) => (
            <div key={state} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="bg-gray-50/80 border-b border-gray-100 px-6 py-4">
                <h2 className="text-xl font-bold text-gray-900">{state}</h2>
              </div>
              <div className="p-6">
                <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {cities.map((city) => (
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
          ))}
        </div>

        {citiesToRender.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No delivery cities are active right now. Please check back later.
          </div>
        )}

      </div>
    </div>
  );
}
