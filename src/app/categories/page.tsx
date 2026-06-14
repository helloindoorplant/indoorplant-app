import prisma from '@/lib/prisma';
import { CategoryCard } from "@/components/shared/CategoryCard";

export const metadata = {
  title: "Indoor Plant Collections — Air Purifying, Pet Safe and Bedroom | IndoorPlant.in",
  description: "Shop indoor plants by type: air purifying, low maintenance, pet-safe, and bedroom plants. Every collection is chosen for Indian homes and climates. Free delivery.",
  keywords: [
    "air purifying plants India",
    "low maintenance indoor plants",
    "pet safe plants India",
    "bedroom plants India",
    "indoor plant categories",
    "types of indoor plants India",
    "houseplant collections India"
  ],
  openGraph: {
    title: "Indoor Plant Collections — By Care, Light and Pet Safety",
    description: "Find your kind of plant. Filtered by care level, light needs, and whether your pets can be near it.",
    url: "https://www.indoorplant.in/categories"
  }
};

export default async function CategoriesPage() {
  const categories = await prisma.category.findMany({
    include: {
      _count: {
        select: { products: true }
      }
    },
    orderBy: { name: 'asc' }
  });

  // Explicitly requested categories
  const targetCategories = [
    { name: "Air Purifying", slug: "air-purifying-plants", colorClass: "bg-[#788c5d]" },
    { name: "Low Maintenance", slug: "low-maintenance-plants", colorClass: "bg-[#6a9bcc]" },
    { name: "Pet Safe", slug: "pet-friendly-plants", colorClass: "bg-[#d97757]" },
    { name: "Bedroom Plants", slug: "bedroom-plants", colorClass: "bg-[#141413]" },
  ];

  return (
    <div className="min-h-screen bg-[#faf9f5]">
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 md:px-12 max-w-7xl mx-auto text-center">
        <h1 className="font-poppins text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 tracking-tight">
          Plant <span className="text-primary">Collections</span>
        </h1>
        <p className="font-lora text-lg md:text-xl text-[#b0aea5] max-w-2xl mx-auto leading-relaxed">
          Discover our thoughtfully categorized indoor plants, curated perfectly to match your lifestyle, home aesthetic, and care level.
        </p>
      </section>

      {/* Single Section for Categories */}
      <section className="pb-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {targetCategories.map((cat) => {
            // Find matching category in DB to get real count, otherwise default to 0
            // We do a loose match on the slug or name because DB might have 'air-purifying-plants'
            const dbCat = categories.find(c => c.slug.includes(cat.slug) || c.slug === cat.slug);
            const count = dbCat ? dbCat._count.products : 0;
            
            return (
              <CategoryCard
                key={cat.slug}
                name={cat.name}
                count={count}
                slug={cat.slug}
                image={dbCat?.image || undefined}
                colorClass={cat.colorClass}
              />
            );
          })}
        </div>
      </section>
    </div>
  );
}
