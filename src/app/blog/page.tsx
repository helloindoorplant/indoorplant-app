import Image from "next/image";
import Link from "next/link";
import { Clock, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Blog & Plant Care Guides | IndoorPlant.in",
  description: "Read our latest articles on plant care, home decor, and the benefits of bringing nature inside.",
};

const MOCK_POSTS = [
  {
    slug: "10-best-plants-for-bedrooms",
    title: "10 Best Plants for Bedrooms That Help You Sleep Better",
    excerpt: "Discover which indoor plants are proven to purify the air and promote deeper, more restful sleep.",
    category: "Plant Benefits",
    date: "June 10, 2026",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1540932239986-30128078f3c5?auto=format&fit=crop&w=800&q=80",
    featured: true
  },
  {
    slug: "how-to-care-for-monstera",
    title: "How to Care for Your Monstera Deliciosa: Complete Guide",
    excerpt: "Everything you need to know about watering, light, and propagating the famous Swiss Cheese Plant.",
    category: "Plant Care",
    date: "June 08, 2026",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=800&q=80",
  },
  {
    slug: "pet-safe-indoor-plants",
    title: "Pet-Safe Indoor Plants: A Guide for Dog & Cat Owners",
    excerpt: "Love plants but worry about your furry friends? Here is a list of 100% non-toxic plants for your home.",
    category: "Guides",
    date: "June 05, 2026",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1545241047-6083a36cb15f?auto=format&fit=crop&w=800&q=80",
  },
  {
    slug: "air-purifying-plants-office",
    title: "5 Air-Purifying Plants for Your Home Office",
    excerpt: "Boost your productivity and clear the air with these low-maintenance desk companions.",
    category: "Home Decor",
    date: "June 02, 2026",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80",
  },
  {
    slug: "watering-mistakes",
    title: "Watering 101: The Most Common Mistake Plant Parents Make",
    excerpt: "Are you overwatering? Learn how to read your plant's signals and master the watering schedule.",
    category: "Plant Care",
    date: "May 28, 2026",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1592150621744-aca64f48394a?auto=format&fit=crop&w=800&q=80",
  },
  {
    slug: "decorating-with-large-plants",
    title: "How to Style Large Statement Plants in Small Spaces",
    excerpt: "You don't need a mansion to have a large indoor tree. Here are designer tips for small apartments.",
    category: "Home Decor",
    date: "May 20, 2026",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1502672260266-1c1c2f50ce3e?auto=format&fit=crop&w=800&q=80",
  }
];

export default function BlogPage() {
  const featuredPost = MOCK_POSTS.find(p => p.featured);
  const regularPosts = MOCK_POSTS.filter(p => !p.featured);

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      
      {/* Header */}
      <div className="bg-white py-16 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 font-playfair tracking-tight mb-4">
            The Plant Journal
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Expert advice, plant care guides, and inspiration for bringing nature into your home.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {["All", "Plant Care", "Guides", "Home Decor", "Plant Benefits"].map((tag) => (
              <button 
                key={tag}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  tag === "All" 
                    ? "bg-primary text-white" 
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        
        {/* Featured Post */}
        {featuredPost && (
          <Link href={`/blog/${featuredPost.slug}`} className="group block">
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 flex flex-col md:flex-row">
              <div className="md:w-3/5 h-64 md:h-[400px] relative overflow-hidden bg-gray-100">
                {/* Fallback image if URL fails */}
                <div className="absolute inset-0 bg-primary/10"></div>
                {/* Real image would go here in production */}
              </div>
              <div className="md:w-2/5 p-8 md:p-12 flex flex-col justify-center">
                <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider rounded-full w-max mb-4">
                  {featuredPost.category}
                </span>
                <h2 className="text-3xl font-bold text-gray-900 font-playfair mb-4 group-hover:text-primary transition-colors">
                  {featuredPost.title}
                </h2>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {featuredPost.excerpt}
                </p>
                <div className="flex items-center text-sm text-gray-500 mt-auto">
                  <span>{featuredPost.date}</span>
                  <span className="mx-2">•</span>
                  <span className="flex items-center"><Clock className="w-4 h-4 mr-1" /> {featuredPost.readTime}</span>
                </div>
              </div>
            </div>
          </Link>
        )}

        {/* Post Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {regularPosts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group block bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 h-full flex flex-col hover:shadow-md transition-shadow">
              <div className="h-48 relative overflow-hidden bg-gray-100">
                 <div className="absolute inset-0 bg-primary/5 group-hover:scale-105 transition-transform duration-500"></div>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <span className="text-xs font-bold text-primary uppercase tracking-wider mb-2">
                  {post.category}
                </span>
                <h3 className="text-xl font-bold text-gray-900 font-playfair mb-3 group-hover:text-primary transition-colors">
                  {post.title}
                </h3>
                <p className="text-gray-600 text-sm mb-6 flex-1">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
                  <div className="flex items-center text-xs text-gray-500">
                    <span>{post.date}</span>
                    <span className="mx-2">•</span>
                    <span>{post.readTime}</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-primary transition-colors" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center pt-8">
          <button className="px-8 py-3 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
            Load More Articles
          </button>
        </div>
        
      </div>
    </div>
  );
}
