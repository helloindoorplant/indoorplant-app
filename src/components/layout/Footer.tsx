import Link from 'next/link';
import { Leaf, Send } from 'lucide-react';
import { FaInstagram, FaFacebook } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import { NewsletterForm } from './NewsletterForm';

export function Footer() {
  return (
    <footer suppressHydrationWarning className="bg-primary text-primary-foreground pt-16 pb-8 border-t-8 border-primary/20">
      <div suppressHydrationWarning className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-12 mb-16">
          {/* Column 1: Brand */}
          <div className="space-y-6 sm:col-span-2 lg:col-span-3">
            <Link href="/" className="flex items-center gap-2 group">
              <img src="https://lightgrey-nightingale-217677.hostingersite.com/wp-content/uploads/2026/06/Indoorplant-Logo-White.svg" alt="IndoorPlant.in Logo" className="h-10 w-auto transition-transform group-hover:scale-105" />
            </Link>
            <p className="text-primary-foreground/80 text-[15px] leading-relaxed max-w-xs">
              Bring Nature Inside. AI-powered recommendations. Expert care guides. Delivered fresh to your door.
            </p>
            <div className="flex gap-4 pt-2">
              <Link href="https://www.instagram.com/indoorplant_in" target="_blank" rel="noopener noreferrer" className="bg-white/10 p-2.5 rounded-full hover:bg-white/20 transition-colors"><FaInstagram className="h-4 w-4" /></Link>
              <Link href="https://www.facebook.com/share/18t44yTz3L/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="bg-white/10 p-2.5 rounded-full hover:bg-white/20 transition-colors"><FaFacebook className="h-4 w-4" /></Link>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="lg:col-span-2">
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
          <div className="lg:col-span-2">
            <h3 className="text-lg font-bold mb-6 tracking-wide">Customer Service</h3>
            <ul className="space-y-4 text-[15px] text-primary-foreground/80">
              <li><Link href="/account" className="hover:text-white hover:translate-x-1 inline-block transition-transform">My Account</Link></li>
              <li><Link href="/track-order" className="hover:text-white hover:translate-x-1 inline-block transition-transform">Order Tracking</Link></li>
              <li><Link href="/returns" className="hover:text-white hover:translate-x-1 inline-block transition-transform">Return Policy</Link></li>
              <li><Link href="/shipping" className="hover:text-white hover:translate-x-1 inline-block transition-transform">Shipping Information</Link></li>
              <li><Link href="/faq" className="hover:text-white hover:translate-x-1 inline-block transition-transform">FAQ & Support</Link></li>
            </ul>
          </div>

          {/* Column 4: Delivery Cities */}
          <div className="lg:col-span-2">
            <h3 className="text-lg font-bold mb-6 tracking-wide">Delivery Cities</h3>
            <ul className="space-y-4 text-[15px] text-primary-foreground/80">
              <li><Link href="/plants/bengaluru" className="hover:text-white hover:translate-x-1 inline-block transition-transform">Plants in Bengaluru</Link></li>
              <li><Link href="/plants/delhi" className="hover:text-white hover:translate-x-1 inline-block transition-transform">Plants in Delhi</Link></li>
              <li><Link href="/plants/mumbai" className="hover:text-white hover:translate-x-1 inline-block transition-transform">Plants in Mumbai</Link></li>
              <li><Link href="/plants/pune" className="hover:text-white hover:translate-x-1 inline-block transition-transform">Plants in Pune</Link></li>
              <li><Link href="/plants/chennai" className="hover:text-white hover:translate-x-1 inline-block transition-transform">Plants in Chennai</Link></li>
              <li className="pt-2">
                <Link href="/plants" className="text-white font-medium hover:underline inline-flex items-center gap-1 group">
                  View All Locations <span className="group-hover:translate-x-1 transition-transform">→</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 5: Contact & Newsletter */}
          <div className="sm:col-span-2 lg:col-span-3">
            <h3 className="text-lg font-bold mb-6 tracking-wide">Contact & Newsletter</h3>
            <address className="not-italic text-[15px] text-primary-foreground/80 space-y-4">
              <p className="flex items-center gap-3"><span className="text-white">Email:</span> helloindoorplant@gmail.com</p>
              <p className="flex items-center gap-3"><span className="text-white">Phone:</span> +91 70035 87996</p>
              <div className="pt-4 space-y-3">
                <p className="text-white font-medium">Get Plant Care Tips & Offers</p>
                <NewsletterForm />
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
