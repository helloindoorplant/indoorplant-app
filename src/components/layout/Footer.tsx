import Link from 'next/link';
import { Leaf, Send } from 'lucide-react';
import { FaInstagram, FaFacebook, FaTwitter, FaYoutube } from 'react-icons/fa';
import { Button } from '@/components/ui/button';

export function Footer() {
  return (
    <footer suppressHydrationWarning className="bg-primary text-primary-foreground pt-16 pb-8 border-t-8 border-primary/20">
      <div suppressHydrationWarning className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4 mb-16">
          {/* Column 1: Brand */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="bg-white/10 p-2 rounded-full transition-transform group-hover:scale-105">
                <Leaf className="h-6 w-6" />
              </div>
              <span className="text-2xl font-bold tracking-tight">IndoorPlant<span className="opacity-70 font-normal">.in</span></span>
            </Link>
            <p className="text-primary-foreground/80 text-[15px] leading-relaxed max-w-xs">
              Bring Nature Inside. AI-powered recommendations. Expert care guides. Delivered fresh to your door.
            </p>
            <div className="flex gap-4 pt-2">
              <Link href="#" className="bg-white/10 p-2.5 rounded-full hover:bg-white/20 transition-colors"><FaInstagram className="h-4 w-4" /></Link>
              <Link href="#" className="bg-white/10 p-2.5 rounded-full hover:bg-white/20 transition-colors"><FaFacebook className="h-4 w-4" /></Link>
              <Link href="#" className="bg-white/10 p-2.5 rounded-full hover:bg-white/20 transition-colors"><FaTwitter className="h-4 w-4" /></Link>
              <Link href="#" className="bg-white/10 p-2.5 rounded-full hover:bg-white/20 transition-colors"><FaYoutube className="h-4 w-4" /></Link>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-6 tracking-wide">Quick Links</h3>
            <ul className="space-y-4 text-[15px] text-primary-foreground/80">
              <li><Link href="/" className="hover:text-white hover:translate-x-1 inline-block transition-transform">Home</Link></li>
              <li><Link href="/shop" className="hover:text-white hover:translate-x-1 inline-block transition-transform">Shop All Plants</Link></li>
              <li><Link href="/ai-advisor" className="hover:text-white hover:translate-x-1 inline-block transition-transform flex items-center gap-2">AI Advisor <span className="bg-white/20 text-white text-[10px] px-2 py-0.5 rounded-full">NEW</span></Link></li>
              <li><Link href="/blog" className="hover:text-white hover:translate-x-1 inline-block transition-transform">Care Guides & Blog</Link></li>
              <li><Link href="/about" className="hover:text-white hover:translate-x-1 inline-block transition-transform">About Us</Link></li>
            </ul>
          </div>

          {/* Column 3: Customer Service */}
          <div>
            <h3 className="text-lg font-bold mb-6 tracking-wide">Customer Service</h3>
            <ul className="space-y-4 text-[15px] text-primary-foreground/80">
              <li><Link href="/account" className="hover:text-white hover:translate-x-1 inline-block transition-transform">My Account</Link></li>
              <li><Link href="/track-order" className="hover:text-white hover:translate-x-1 inline-block transition-transform">Order Tracking</Link></li>
              <li><Link href="/returns" className="hover:text-white hover:translate-x-1 inline-block transition-transform">7-Day Returns Policy</Link></li>
              <li><Link href="/shipping" className="hover:text-white hover:translate-x-1 inline-block transition-transform">Shipping Information</Link></li>
              <li><Link href="/faq" className="hover:text-white hover:translate-x-1 inline-block transition-transform">FAQ & Support</Link></li>
            </ul>
          </div>

          {/* Column 4: Contact & Newsletter */}
          <div>
            <h3 className="text-lg font-bold mb-6 tracking-wide">Contact & Newsletter</h3>
            <address className="not-italic text-[15px] text-primary-foreground/80 space-y-4">
              <p className="flex items-center gap-3"><span className="text-white">Email:</span> support@indoorplant.in</p>
              <p className="flex items-center gap-3"><span className="text-white">Phone:</span> +91-800-123-4567</p>
              <div className="pt-4 space-y-3">
                <p className="text-white font-medium">Get Plant Care Tips & Offers</p>
                <form className="flex group" action="/api/newsletter" method="POST">
                  <input 
                    type="email" 
                    placeholder="Your email address" 
                    className="bg-white/10 border border-white/20 rounded-l-lg px-4 py-3 text-sm w-full outline-none focus:border-white focus:bg-white/15 transition-all text-white placeholder:text-white/50"
                  />
                  <Button type="submit" variant="secondary" className="rounded-l-none px-4 h-auto hover:bg-white transition-colors">
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
                <p className="text-[12px] opacity-60">No spam. Unsubscribe anytime.</p>
              </div>
            </address>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-primary-foreground/60">
          <p>© {new Date().getFullYear()} IndoorPlant.in. Designed with passion for nature.</p>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-2">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms & Conditions</Link>
            <Link href="/sitemap" className="hover:text-white transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
