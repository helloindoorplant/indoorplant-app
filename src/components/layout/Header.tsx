'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, ShoppingBag, User, Heart, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CartDrawer } from '@/components/shop/CartDrawer';
import { useCartStore } from '@/store/useCartStore';
import { useUserStore } from '@/store/useUserStore';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { isDrawerOpen, setDrawerOpen, totalItems } = useCartStore();
  const wishlist = useUserStore(state => state.wishlist);
  const { data: session } = useSession();
  const router = useRouter();

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/shop?search=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
      setSearchQuery("");
    }
  };

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header className={`sticky top-0 z-50 bg-white border-b border-gray-100 py-3 transition-all duration-300 ${isScrolled ? 'shadow-sm' : ''}`}>
        <div className="container mx-auto px-4 max-w-7xl flex items-center justify-between">
          
          {/* Logo */}
          <Link href="/" className="flex items-center z-50">
            <img src="/Indoorplant-Logo.svg" alt="IndoorPlant.in" className="h-10 w-auto" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/shop" className="text-[15px] font-bold text-foreground/80 hover:text-primary transition-colors">Shop Plants</Link>
            <Link href="/categories" className="text-[15px] font-bold text-foreground/80 hover:text-primary transition-colors">Categories</Link>
            <Link href="/ai-advisor" className="text-[15px] font-bold text-foreground/80 hover:text-primary transition-colors relative">
              AI Advisor <span className="absolute -top-3 -right-4 text-[9px] bg-red-500 text-white px-1.5 py-0.5 rounded-full font-bold uppercase">New</span>
            </Link>
            <Link href="/care" className="text-[15px] font-bold text-foreground/80 hover:text-primary transition-colors">Plant Care</Link>
          </nav>

          {/* Icons */}
          <div className="hidden md:flex items-center gap-4 relative">
            <div className="relative flex items-center">
              {isSearchOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setIsSearchOpen(false)} />
                  <form onSubmit={handleSearch} className="absolute right-0 top-full mt-4 animate-in fade-in slide-in-from-top-2 duration-200 z-50 p-2 bg-white rounded-2xl shadow-xl border border-gray-100 flex gap-2 min-w-[320px]">
                    <Input 
                      autoFocus
                      placeholder="Search for plants..." 
                      className="flex-1 h-11 rounded-xl border-0 bg-gray-50 focus-visible:ring-1 focus-visible:ring-primary focus-visible:bg-white shadow-none px-4"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <Button type="submit" size="icon" className="h-11 w-11 rounded-xl bg-primary text-white hover:bg-[#1B4332] shrink-0">
                      <Search className="h-5 w-5" />
                    </Button>
                  </form>
                </>
              )}
              <Button onClick={() => setIsSearchOpen(!isSearchOpen)} variant="ghost" size="icon" className={`rounded-full transition-colors relative z-50 ${isSearchOpen ? 'bg-primary/10 text-primary' : 'hover:bg-secondary/50'}`}>
                <Search className="h-5 w-5" />
              </Button>
            </div>
            
            <Link href="/account/dashboard">
              <Button variant="ghost" size="icon" className="rounded-full hover:bg-secondary/50 transition-colors overflow-hidden">
                {session?.user?.image ? (
                  <img src={session.user.image} alt="Profile" className="h-full w-full object-cover" />
                ) : (
                  <User className="h-5 w-5" />
                )}
              </Button>
            </Link>

            <Link href="/account/wishlist">
              <Button variant="ghost" size="icon" className="rounded-full hover:bg-secondary/50 transition-colors relative">
                <Heart className="h-5 w-5" />
                {mounted && wishlist.length > 0 && (
                  <span className="absolute top-0 right-0 bg-rose-500 text-white text-[10px] font-bold h-4 w-4 flex items-center justify-center rounded-full">
                    {wishlist.length}
                  </span>
                )}
              </Button>
            </Link>
            <Button variant="outline" size="icon" onClick={() => setDrawerOpen(true)} className="rounded-xl border-2 border-primary/20 hover:border-primary hover:bg-primary/5 transition-colors relative ml-2">
              <ShoppingBag className="h-5 w-5 text-primary" />
              {mounted && totalItems() > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-white text-[10px] font-bold h-5 w-5 flex items-center justify-center rounded-full ring-2 ring-white">
                  {totalItems()}
                </span>
              )}
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <Button variant="ghost" size="icon" className="md:hidden z-50" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>

        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 bg-white z-40 flex flex-col pt-24 px-6 gap-6 md:hidden">
            <Link href="/shop" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-bold border-b border-border/50 pb-4">Shop Plants</Link>
            <Link href="/categories" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-bold border-b border-border/50 pb-4">Categories</Link>
            <Link href="/ai-advisor" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-bold border-b border-border/50 pb-4 flex justify-between">
              AI Advisor <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full uppercase">New</span>
            </Link>
            <Link href="/care" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-bold border-b border-border/50 pb-4">Plant Care</Link>
            
            <div className="mt-auto pb-10 flex gap-4 justify-between">
              <Link href="/account/dashboard" onClick={() => setMobileMenuOpen(false)} className="flex-1">
                <Button variant="outline" className="w-full rounded-xl h-14 border-2">
                  {session?.user?.image ? (
                    <img src={session.user.image} alt="Profile" className="h-6 w-6 rounded-full mr-2" />
                  ) : (
                    <User className="mr-2" />
                  )} 
                  Account
                </Button>
              </Link>
              <Button className="flex-1 rounded-xl h-14" onClick={() => { setMobileMenuOpen(false); setDrawerOpen(true); }}><ShoppingBag className="mr-2" /> Cart ({mounted ? totalItems() : 0})</Button>
            </div>
          </div>
        )}
      </header>

      {/* Cart Drawer */}
      <CartDrawer open={isDrawerOpen} onOpenChange={setDrawerOpen} />
    </>
  );
}
