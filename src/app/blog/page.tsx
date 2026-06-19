import Link from "next/link";
import { Clock, ArrowRight } from "lucide-react";
import { BLOG_POSTS } from "@/lib/blog-data";

export const metadata = {
  title: "Indoor Plant Care Guides for Indian Homes | IndoorPlant.in Journal",
  description: "Plant care guides written for Indian homes — watering in hot climates, monsoon care, low-light apartment solutions, and pet-safe plant lists. Updated regularly.",
};

export default function BlogPage() {
  const featuredPosts = BLOG_POSTS.filter(p => p.featured);
  // Pick the most recently added featured post (last in the array)
  const featuredPost = featuredPosts.length > 0 ? featuredPosts[featuredPosts.length - 1] : BLOG_POSTS[0];
  // All other posts go to the grid
  const regularPosts = BLOG_POSTS.filter(p => p.slug !== featuredPost?.slug);

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
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-150 flex flex-col md:flex-row hover:shadow-md transition-shadow duration-300">
              <div className="md:w-3/5 h-64 md:h-auto relative overflow-hidden bg-gray-100">
                <img
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
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
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group block bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-150 h-full flex flex-col hover:shadow-md transition-shadow duration-300">
              <div className="h-48 relative overflow-hidden bg-gray-100">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6 flex flex-col flex-1">
                <span className="text-xs font-bold text-primary uppercase tracking-wider mb-2">
                  {post.category}
                </span>
                <h3 className="text-xl font-bold text-gray-900 font-playfair mb-3 group-hover:text-primary transition-colors">
                  {post.title}
                </h3>
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
