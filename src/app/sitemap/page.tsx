import Link from 'next/link';
import prisma from '@/lib/prisma';
import { BLOG_POSTS } from '@/lib/blog-data';
import { 
  Compass, 
  ShoppingBag, 
  Leaf, 
  BookOpen, 
  HelpCircle, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight,
  Heart,
  Wind,
  Smile,
  Bed,
  FolderHeart,
  Mail,
  Scale
} from 'lucide-react';

export const metadata = {
  title: 'Sitemap — Site Directory & Live Plant Catalog | IndoorPlant.in',
  description: 'Complete HTML sitemap directory of all pages, plant categories, live in-stock products, and expert care guides at IndoorPlant.in.',
  keywords: ['IndoorPlant.in sitemap', 'buy plants online India directory', 'indoor plants catalog India', 'plant care sitemap']
};

export default async function SitemapPage() {
  // Fetch categories and product count from the DB
  const categories = await prisma.category.findMany({
    include: {
      _count: {
        select: { products: true }
      }
    }
  });

  // Fetch all products dynamically from the DB
  const products = await prisma.product.findMany({
    select: {
      name: true,
      slug: true,
      price: true,
      salePrice: true,
      careLevel: true,
      isFeatured: true
    },
    orderBy: {
      name: 'asc'
    }
  });

  // Legal and support links
  const companyLinks = [
    { name: 'About Us', href: '/about', desc: 'Our botanical mission, team, and horticulturist profiles' },
    { name: 'FAQ & Support', href: '/faq', desc: 'Watering, lighting, shipping, and order FAQs' },
    { name: 'Shipping Information', href: '/shipping', desc: 'How we pack and deliver live plants fresh across India' },
    { name: 'Return Policy', href: '/returns', desc: 'Our honest 12-hour transit-damage returns policy' },
    { name: 'Privacy Policy', href: '/privacy', desc: 'How we protect your data and security credentials' },
    { name: 'Terms & Conditions', href: '/terms', desc: 'Store usage, payment terms, and user guidelines' }
  ];

  // Map categories to appropriate visual icons
  const getCategoryIcon = (slug: string) => {
    if (slug.includes('air')) return <Wind className="w-5 h-5 text-teal-600" />;
    if (slug.includes('low') || slug.includes('maintenance')) return <Smile className="w-5 h-5 text-amber-600" />;
    if (slug.includes('pet') || slug.includes('safe')) return <Heart className="w-5 h-5 text-rose-600" />;
    if (slug.includes('bedroom')) return <Bed className="w-5 h-5 text-blue-600" />;
    return <FolderHeart className="w-5 h-5 text-emerald-600" />;
  };

  return (
    <div className="bg-[#FAF9F6] min-h-screen py-16 text-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumbs */}
        <nav className="text-xs font-semibold tracking-wider uppercase text-[#2D6A4F] mb-6">
          <Link href="/" className="hover:underline">Home</Link>
          <span className="mx-2 opacity-50">/</span>
          <span className="text-slate-500">Sitemap</span>
        </nav>

        {/* Hero Section */}
        <div className="relative overflow-hidden bg-primary text-primary-foreground rounded-3xl p-8 md:p-12 shadow-xl border border-primary-foreground/10 mb-12">
          {/* Subtle Decorative Elements */}
          <div className="absolute right-0 bottom-0 translate-y-12 translate-x-12 opacity-10">
            <Leaf className="w-72 h-72" />
          </div>
          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase mb-4">
              <Sparkles className="w-3.5 h-3.5" /> Site Directory
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold font-playfair tracking-tight mb-4 text-white leading-tight">
              IndoorPlant.in Sitemap
            </h1>
            <p className="text-primary-foreground/85 text-base md:text-lg leading-relaxed">
              Explore our complete collection of live plants, category guides, care resources, and customer support pages in one organized, beautiful directory.
            </p>
          </div>
        </div>

        {/* Main Sitemap Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Column 1: Core Navigation & Shop Pages */}
          <div className="space-y-8">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100/80 hover:shadow-md transition-shadow">
              <h2 className="text-xl font-bold font-playfair text-[#1B4332] mb-6 flex items-center gap-2 pb-2 border-b border-slate-100">
                <Compass className="w-5 h-5 text-[#2D6A4F]" /> Main Sections
              </h2>
              <ul className="space-y-4">
                <li>
                  <Link href="/" className="group flex items-start gap-3 p-2 rounded-xl hover:bg-slate-50 transition-colors">
                    <div className="mt-1 p-2 bg-emerald-50 text-[#2D6A4F] rounded-lg group-hover:bg-[#2D6A4F] group-hover:text-white transition-colors">
                      <Compass className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900 group-hover:text-[#2D6A4F] flex items-center gap-1.5 transition-colors">
                        Homepage <ArrowRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                      </div>
                      <p className="text-xs text-slate-500">Live plant store, AI advisor shortcut, and journal</p>
                    </div>
                  </Link>
                </li>
                <li>
                  <Link href="/shop" className="group flex items-start gap-3 p-2 rounded-xl hover:bg-slate-50 transition-colors">
                    <div className="mt-1 p-2 bg-emerald-50 text-[#2D6A4F] rounded-lg group-hover:bg-[#2D6A4F] group-hover:text-white transition-colors">
                      <ShoppingBag className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900 group-hover:text-[#2D6A4F] flex items-center gap-1.5 transition-colors">
                        Shop All Plants <ArrowRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                      </div>
                      <p className="text-xs text-slate-500">Browse and filter our full inventory of fresh houseplants</p>
                    </div>
                  </Link>
                </li>
                <li>
                  <Link href="/categories" className="group flex items-start gap-3 p-2 rounded-xl hover:bg-slate-50 transition-colors">
                    <div className="mt-1 p-2 bg-emerald-50 text-[#2D6A4F] rounded-lg group-hover:bg-[#2D6A4F] group-hover:text-white transition-colors">
                      <FolderHeart className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900 group-hover:text-[#2D6A4F] flex items-center gap-1.5 transition-colors">
                        Categories Grid <ArrowRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                      </div>
                      <p className="text-xs text-slate-500">Our specialized category curation for spaces and care requirements</p>
                    </div>
                  </Link>
                </li>
                <li>
                  <Link href="/ai-advisor" className="group flex items-start gap-3 p-2 rounded-xl hover:bg-slate-50 transition-colors">
                    <div className="mt-1 p-2 bg-amber-50 text-amber-600 rounded-lg group-hover:bg-amber-600 group-hover:text-white transition-colors">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900 group-hover:text-amber-600 flex items-center gap-1.5 transition-colors">
                        AI Plant Advisor <span className="bg-amber-100 text-amber-800 text-[9px] px-1.5 py-0.5 rounded-full font-bold">LIVE</span>
                      </div>
                      <p className="text-xs text-slate-500">Personalized plant matchmaking engine powered by AI</p>
                    </div>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Customer Service & Legal Info */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100/80 hover:shadow-md transition-shadow">
              <h2 className="text-xl font-bold font-playfair text-[#1B4332] mb-6 flex items-center gap-2 pb-2 border-b border-slate-100">
                <Scale className="w-5 h-5 text-[#2D6A4F]" /> Support & Policies
              </h2>
              <ul className="space-y-4">
                {companyLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="group block p-2 rounded-xl hover:bg-slate-50 transition-colors">
                      <div className="font-semibold text-slate-900 group-hover:text-[#2D6A4F] flex items-center gap-1.5 transition-colors">
                        {link.name} <ArrowRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">{link.desc}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Column 2: Browse By Categories */}
          <div className="space-y-8">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100/80 hover:shadow-md transition-shadow">
              <h2 className="text-xl font-bold font-playfair text-[#1B4332] mb-6 flex items-center gap-2 pb-2 border-b border-slate-100">
                <FolderHeart className="w-5 h-5 text-[#2D6A4F]" /> Plant Categories
              </h2>
              {categories.length === 0 ? (
                <p className="text-xs text-slate-500">No categories found in store database.</p>
              ) : (
                <ul className="space-y-4">
                  {categories.map((cat) => (
                    <li key={cat.id}>
                      <Link href={`/shop/${cat.slug}`} className="group flex items-center justify-between p-3 bg-slate-50/50 hover:bg-slate-50 border border-slate-100/50 rounded-xl transition-all">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-white rounded-lg shadow-xs border border-slate-100">
                            {getCategoryIcon(cat.slug)}
                          </div>
                          <div>
                            <span className="font-semibold text-slate-900 group-hover:text-[#2D6A4F] transition-colors">{cat.name}</span>
                            {cat.description && (
                              <p className="text-[10px] text-slate-400 line-clamp-1 mt-0.5">{cat.description}</p>
                            )}
                          </div>
                        </div>
                        <span className="text-[11px] font-bold text-slate-400 bg-white border border-slate-100 px-2 py-0.5 rounded-full shrink-0 group-hover:border-[#2D6A4F]/20 group-hover:text-[#2D6A4F] transition-all">
                          {cat._count.products} {cat._count.products === 1 ? 'Plant' : 'Plants'}
                        </span>
                      </Link>
                    </li>
                  ))}
                  {/* Static category links just in case they are not in DB */}
                  {!categories.some(c => c.slug === 'planters') && (
                    <li>
                      <Link href="/shop/planters" className="group flex items-center justify-between p-3 bg-slate-50/50 hover:bg-slate-50 border border-slate-100/50 rounded-xl transition-all">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-white rounded-lg shadow-xs border border-slate-100">
                            <FolderHeart className="w-5 h-5 text-emerald-600" />
                          </div>
                          <div>
                            <span className="font-semibold text-slate-900 group-hover:text-[#2D6A4F] transition-colors">Planters</span>
                            <p className="text-[10px] text-slate-400 mt-0.5">Decorative pots, ceramic pots, and soil kits</p>
                          </div>
                        </div>
                        <span className="text-[11px] font-bold text-slate-400 bg-white border border-slate-100 px-2 py-0.5 rounded-full shrink-0 transition-all">
                          Live
                        </span>
                      </Link>
                    </li>
                  )}
                </ul>
              )}
            </div>

            {/* Care Journal / Blog Articles */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100/80 hover:shadow-md transition-shadow">
              <h2 className="text-xl font-bold font-playfair text-[#1B4332] mb-6 flex items-center gap-2 pb-2 border-b border-slate-100">
                <BookOpen className="w-5 h-5 text-[#2D6A4F]" /> Care Journal & Articles
              </h2>
              <ul className="space-y-4">
                <li>
                  <Link href="/blog" className="group block p-3 bg-emerald-50/35 hover:bg-emerald-50 border border-emerald-100/40 rounded-xl transition-all">
                    <span className="font-bold text-[#1B4332] flex items-center gap-1.5">
                      Journal Hub <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                    </span>
                    <p className="text-xs text-emerald-800/80 mt-0.5">Browse all expert horticulturist guides and seasonal tips</p>
                  </Link>
                </li>
                {BLOG_POSTS.map((post) => (
                  <li key={post.slug}>
                    <Link href={`/blog/${post.slug}`} className="group block p-2 rounded-xl hover:bg-slate-50 transition-colors">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-[#2D6A4F]">
                        {post.category}
                      </div>
                      <div className="font-semibold text-slate-900 group-hover:text-[#2D6A4F] line-clamp-2 leading-tight mt-1 transition-colors">
                        {post.title}
                      </div>
                      <div className="flex items-center gap-2 mt-2 text-[10px] text-slate-400">
                        <span>{post.date}</span>
                        <span>•</span>
                        <span>{post.readTime}</span>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Column 3: Live Plant Inventory */}
          <div className="space-y-8">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100/80 hover:shadow-md transition-shadow">
              <h2 className="text-xl font-bold font-playfair text-[#1B4332] mb-6 flex items-center gap-2 pb-2 border-b border-slate-100">
                <Leaf className="w-5 h-5 text-[#2D6A4F]" /> Live Plant Catalog
              </h2>
              {products.length === 0 ? (
                <p className="text-xs text-slate-500">No products found in store database.</p>
              ) : (
                <div className="space-y-3 max-h-[640px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-slate-250">
                  {products.map((prod) => (
                    <Link 
                      key={prod.slug} 
                      href={`/product/${prod.slug}`} 
                      className="group flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-all"
                    >
                      <div className="flex items-start gap-2.5">
                        <Leaf className="w-4 h-4 text-emerald-600 shrink-0 mt-1" />
                        <div>
                          <div className="font-semibold text-slate-900 group-hover:text-[#2D6A4F] text-sm leading-tight transition-colors">
                            {prod.name}
                          </div>
                          <div className="flex items-center gap-1.5 mt-1">
                            <span className="text-[10px] font-bold bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded">
                              {prod.careLevel}
                            </span>
                            {prod.isFeatured && (
                              <span className="text-[9px] font-bold bg-amber-50 text-amber-700 border border-amber-100 px-1 rounded">
                                FEATURED
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        {prod.salePrice ? (
                          <>
                            <div className="text-sm font-bold text-emerald-700">₹{prod.salePrice}</div>
                            <div className="text-[10px] text-slate-400 line-through">₹{prod.price}</div>
                          </>
                        ) : (
                          <div className="text-sm font-bold text-slate-800">₹{prod.price}</div>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer Contact Section inside Sitemap */}
        <div className="mt-12 bg-white rounded-3xl p-8 shadow-sm border border-slate-100/80 text-center max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold font-playfair text-[#1B4332] mb-3">
            Can't find what you are looking for?
          </h3>
          <p className="text-slate-600 text-sm mb-6 max-w-lg mx-auto">
            Our support desk is always open. Get in touch with our horticulturists or trace your order status.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              href="/faq" 
              className="inline-flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold px-6 py-3 rounded-xl text-sm transition-colors"
            >
              <HelpCircle className="w-4 h-4" /> FAQ & Helpdesk
            </Link>
            <a 
              href="mailto:helloindoorplant@gmail.com" 
              className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-[#1B4332] text-white font-bold px-6 py-3 rounded-xl text-sm shadow-md transition-colors"
            >
              <Mail className="w-4 h-4" /> Contact Support
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
