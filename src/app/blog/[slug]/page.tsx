import Link from "next/link";
import { notFound } from "next/navigation";
import { Clock, ChevronLeft } from "lucide-react";
import { BLOG_POSTS } from "@/lib/blog-data";
import { Metadata } from "next";
import prisma from "@/lib/prisma";
import { ProductCardCarousel } from "@/components/blog/ProductCardCarousel";
import { RelatedBlogsCarousel } from "@/components/blog/RelatedBlogsCarousel";
import { BlogShareButtons } from "@/components/blog/BlogShareButtons";
import { autoLinkContent } from "@/lib/blog/auto-linker";
import { genBreadcrumbSchema } from '@/lib/seo/schema-generator';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  
  // Try fetching from database first, then fallback to static data
  let post = await prisma.article.findUnique({
    where: { slug: resolvedParams.slug },
  }).catch(() => null) as any;

  if (!post) {
    post = BLOG_POSTS.find((p) => p.slug === resolvedParams.slug);
  }

  if (!post) {
    return {
      title: "Article Not Found | IndoorPlant.in",
    };
  }
  
  const title = post.metaTitle || post.title;
  const description = post.metaDescription || post.excerpt;
  const url = `https://www.indoorplant.in/blog/${post.slug}`;
  // WhatsApp requires absolute URLs for og:image
  const image = post.image ? (post.image.startsWith('http') ? post.image : `https://www.indoorplant.in${post.image}`) : 'https://www.indoorplant.in/og-default.jpg';

  return {
    title,
    description,
    keywords: post.keywords,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      type: "article",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      siteName: "IndoorPlant.in",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  let post = await prisma.article.findUnique({
    where: { slug: resolvedParams.slug },
    include: { author: true, category: true }
  }).catch(() => null) as any;
  
  if (!post) {
    const staticPost = BLOG_POSTS.find((p) => p.slug === resolvedParams.slug);
    if (!staticPost) notFound();
    post = {
      ...staticPost,
      author: staticPost.author,
      category: { name: staticPost.category },
    };
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
      "sameAs": [
        "https://www.linkedin.com/in/subho-mondal/"
      ],
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

  const breadcrumbJsonLd = genBreadcrumbSchema([
    { name: 'Home', url: 'https://www.indoorplant.in' },
    { name: 'Journal', url: 'https://www.indoorplant.in/blog' },
    { name: post.title, url: `https://www.indoorplant.in/blog/${post.slug}` }
  ]);

  return (
    <div className="bg-white min-h-screen">
      {/* Schema.org Article tag */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Breadcrumb Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
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
            {post.category?.name || post.category}
          </span>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 font-playfair tracking-tight mb-6 leading-tight">
          {post.title}
        </h1>
        
        <div className="flex items-center justify-between py-4 sm:py-6 border-y border-gray-100">
          <div className="flex items-center min-w-0 pr-2">
            <div className="w-10 h-10 sm:w-12 sm:h-12 shrink-0 rounded-full bg-primary/10 text-primary flex items-center justify-center mr-3 sm:mr-4 font-bold text-xs sm:text-sm">
              {post.author.avatar}
            </div>
            <div className="min-w-0">
              <p className="font-medium text-gray-900 text-sm sm:text-base truncate">{post.author.name}</p>
              <div className="flex items-center text-[11px] sm:text-sm text-gray-500 whitespace-nowrap">
                <span className="truncate">{post.date || (post.createdAt ? new Date(post.createdAt).toLocaleDateString() : '')}</span>
                <span className="mx-1.5 sm:mx-2 shrink-0">•</span>
                <span className="flex items-center shrink-0"><Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5 mr-1" /> {post.readTime}</span>
              </div>
            </div>
          </div>
          
          <BlogShareButtons
            title={post.title}
            url={`https://www.indoorplant.in/blog/${post.slug}`}
          />
        </div>
      </div>

      {/* Hero Image */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="w-full h-[220px] sm:h-[360px] md:h-[560px] relative overflow-hidden rounded-2xl bg-gray-100">
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
        dangerouslySetInnerHTML={{ __html: autoLinkContent(post.content) }}
      />

      {/* Featured Products Carousel */}
      {featuredProducts.length > 0 && (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <ProductCardCarousel products={featuredProducts} />
        </div>
      )}
      
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="bg-gray-50 rounded-xl p-8 flex items-center flex-col sm:flex-row gap-6">
          <div className="w-20 h-20 rounded-full bg-primary/10 text-primary shrink-0 flex items-center justify-center shadow-sm font-bold text-xl">
            {post.author.avatar}
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-bold text-gray-900 text-lg">About the Author</h3>
              <a 
                href="https://www.linkedin.com/in/subho-mondal/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#0a66c2] transition-colors"
                title="Connect on LinkedIn"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              Subho Mondal is the plant enthusiast and curator behind IndoorPlant.in. With a deep passion for urban gardening, he specializes in bringing nature indoors and helping modern homes thrive with green ecosystems.
            </p>
          </div>
        </div>
      </div>

      {/* Related Blogs Carousel */}
      <RelatedBlogsCarousel posts={BLOG_POSTS} currentSlug={post.slug} />
    </div>
  );
}
