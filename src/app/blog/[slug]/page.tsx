import Link from "next/link";
import { Clock, Share2, Bookmark, Link as LinkIcon, ChevronLeft } from "lucide-react";

export const metadata = {
  title: "Blog Post | IndoorPlant.in",
  description: "Read the latest plant care guides and tips from the experts at IndoorPlant.in.",
};

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  // Mock data for the post
  const post = {
    title: "10 Best Plants for Bedrooms That Help You Sleep Better",
    category: "Plant Benefits",
    date: "June 10, 2026",
    readTime: "5 min read",
    author: {
      name: "Dr. Anjali Desai",
      role: "Lead Horticulturist",
    }
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Article Header */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
        <Link href="/blog" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-primary mb-8 transition-colors">
          <ChevronLeft className="w-4 h-4 mr-1" />
          Back to all articles
        </Link>
        
        <div className="mb-6">
          <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider rounded-full">
            {post.category}
          </span>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 font-playfair tracking-tight mb-6 leading-tight">
          {post.title}
        </h1>
        
        <div className="flex items-center justify-between py-6 border-y border-gray-100">
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center mr-4">
              <span className="text-gray-500 font-medium text-sm">AD</span>
            </div>
            <div>
              <p className="font-medium text-gray-900">{post.author.name}</p>
              <div className="flex items-center text-sm text-gray-500">
                <span>{post.date}</span>
                <span className="mx-2">•</span>
                <span className="flex items-center"><Clock className="w-3.5 h-3.5 mr-1" /> {post.readTime}</span>
              </div>
            </div>
          </div>
          
          <div className="hidden sm:flex items-center gap-3">
            <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:text-primary hover:border-primary transition-colors">
              <Share2 className="w-4 h-4" />
            </button>
            <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:text-primary hover:border-primary transition-colors">
              <Bookmark className="w-4 h-4" />
            </button>
            <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:text-primary hover:border-primary transition-colors">
              <LinkIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Hero Image */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="w-full h-[400px] md:h-[600px] bg-gray-100 rounded-2xl flex items-center justify-center">
          <span className="text-gray-400">Hero Image Placeholder</span>
        </div>
      </div>

      {/* Article Body */}
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 prose prose-lg prose-green">
        <p className="lead text-xl text-gray-600 mb-8">
          Did you know that the air quality in your bedroom can significantly impact your sleep quality? While air purifiers are great, mother nature has provided us with natural, beautiful alternatives that work around the clock.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 font-playfair mt-12 mb-6">1. The Snake Plant (Sansevieria)</h2>
        <p>
          The Snake Plant is unique because it continues to convert CO2 into oxygen during the night (most plants only do this during the day). It's incredibly low-maintenance and thrives on neglect, making it perfect for the bedroom.
        </p>

        <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 my-8">
          <h4 className="font-bold text-primary mb-2 flex items-center">
            🌿 Quick Care Tip
          </h4>
          <p className="text-sm text-gray-700 m-0">
            Water your Snake Plant only when the soil is completely dry. In a bedroom with standard AC, this might mean watering only once every 3-4 weeks!
          </p>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 font-playfair mt-12 mb-6">2. Lavender</h2>
        <p>
          While traditionally an outdoor plant, certain varieties of lavender can be kept indoors if you have a very sunny windowsill. The scent of lavender has been proven in multiple studies to lower heart rate, blood pressure, and stress levels, making it the ultimate sleep aid.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 font-playfair mt-12 mb-6">3. Aloe Vera</h2>
        <p>
          Similar to the Snake Plant, Aloe Vera releases oxygen at night. Plus, the gel inside its leaves can be used for minor burns, dry skin, and insect bites. It needs a bright spot in your room to thrive.
        </p>

        <hr className="my-12 border-gray-100" />
        
        <div className="bg-gray-50 rounded-xl p-8 flex items-center flex-col sm:flex-row gap-6">
          <div className="w-20 h-20 rounded-full bg-white shrink-0 flex items-center justify-center shadow-sm">
            <span className="text-gray-400 font-bold">AD</span>
          </div>
          <div>
            <h3 className="font-bold text-gray-900 text-lg mb-1">About the Author</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Dr. Anjali Desai is the Lead Horticulturist at IndoorPlant.in with over 15 years of experience in interior landscaping and plant pathology. She specializes in creating healthy indoor ecosystems for urban homes.
            </p>
          </div>
        </div>
      </article>
    </div>
  );
}
