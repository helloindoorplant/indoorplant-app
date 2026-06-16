import Link from "next/link";
import { notFound } from "next/navigation";
import { Clock, Share2, Bookmark, Link as LinkIcon, ChevronLeft } from "lucide-react";
import { BLOG_POSTS } from "@/lib/blog-data";
import { Metadata } from "next";
import prisma from "@/lib/prisma";
import { ProductCardCarousel } from "@/components/blog/ProductCardCarousel";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const post = BLOG_POSTS.find((p) => p.slug === resolvedParams.slug);
  if (!post) {
    return {
      title: "Article Not Found | IndoorPlant.in",
    };
  }
  return {
    title: post.metaTitle,
    description: post.metaDescription,
    keywords: post.keywords,
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const post = BLOG_POSTS.find((p) => p.slug === resolvedParams.slug);
  
  if (!post) {
    notFound();
  }

  // Format date for schema
  const publishDate = post.date === "June 16, 2026" ? "2026-06-16"
                    : post.date === "June 15, 2026" ? "2026-06-15"
                    : post.date === "June 14, 2026" ? "2026-06-14"
                    : post.date === "June 13, 2026" ? "2026-06-13"
                    : post.date === "June 10, 2026" ? "2026-06-10" 
                    : post.date === "June 08, 2026" ? "2026-06-08" 
                    : post.date === "June 05, 2026" ? "2026-06-05" 
                    : "2026-05-28";

  // Query database products mentioned in the article if it is the decorative plants article
  let featuredProducts: any[] = [];
  if (
    post.slug === "decorative-plants-for-home-online-india" ||
    post.slug === "best-indoor-plants-for-renters-india" ||
    post.slug === "indoor-plants-for-rented-apartments-india" ||
    post.slug === "how-to-buy-indoor-plants-online-india"
  ) {
    featuredProducts = await prisma.product.findMany({
      where: {
        slug: {
          in: [
            'golden-money-plant',
            'njoy-money-plant',
            'money-plant-variegated',
            'aglaonema-red-lipstick-plant',
            'aglaonema-snow-white-plant',
            'monstera-broken-heart',
            'lucky-jade-plant',
            'bamboo-palm-plant'
          ]
        }
      },
      include: {
        reviews: true
      }
    });
    const orderMap: Record<string, number> = {
      'golden-money-plant': 0,
      'njoy-money-plant': 1,
      'money-plant-variegated': 2,
      'aglaonema-red-lipstick-plant': 3,
      'aglaonema-snow-white-plant': 4,
      'monstera-broken-heart': 5,
      'lucky-jade-plant': 6,
      'bamboo-palm-plant': 7
    };
    featuredProducts.sort((a, b) => (orderMap[a.slug] ?? 99) - (orderMap[b.slug] ?? 99));
  } else {
    // Show some default bestseller/featured products for other articles
    featuredProducts = await prisma.product.findMany({
      where: {
        isFeatured: true
      },
      take: 6,
      include: {
        reviews: true
      }
    });
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": post.metaDescription,
    "image": post.image,
    "datePublished": publishDate,
    "dateModified": publishDate,
    "author": {
      "@type": "Person",
      "name": post.author.name,
      "jobTitle": post.author.role,
      "worksFor": {
        "@type": "Organization",
        "name": "IndoorPlant.in"
      }
    },
    "publisher": {
      "@type": "Organization",
      "name": "IndoorPlant.in",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.indoorplant.in/Indoorplant-Logo.svg"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://www.indoorplant.in/blog/${post.slug}`
    }
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Schema.org Article tag */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* FAQPage Schema (if present) */}
      {post.faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(post.faqSchema) }}
        />
      )}

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
            <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mr-4 font-bold text-sm">
              {post.author.avatar}
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
        <div className="w-full h-[400px] md:h-[600px] relative overflow-hidden rounded-2xl bg-gray-100">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Article Body */}
      <article 
        className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 prose prose-lg prose-green"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      {/* Featured Products Carousel */}
      {featuredProducts.length > 0 && (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <ProductCardCarousel products={featuredProducts} />
        </div>
      )}
      
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="bg-gray-50 rounded-xl p-8 flex items-center flex-col sm:flex-row gap-6">
          <div className="w-20 h-20 rounded-full bg-primary/10 text-primary shrink-0 flex items-center justify-center shadow-sm font-bold text-xl">
            {post.author.avatar}
          </div>
          <div>
            <h3 className="font-bold text-gray-900 text-lg mb-1">About the Author</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Dr. Anjali Desai is the Lead Horticulturist at IndoorPlant.in with over 15 years of experience in interior landscaping and plant pathology. She specializes in creating healthy indoor ecosystems for urban homes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
