'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Leaf, 
  Camera, 
  Gift, 
  Send, 
  ChevronDown, 
  CheckCircle2, 
  ArrowRight,
  Sparkles,
  Heart,
  Users,
  Star,
  Loader2,
  X
} from 'lucide-react';

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

interface ProductItem {
  id: string;
  name: string;
  slug: string;
  image: string;
  price: number;
}

interface CreatorsLandingProps {
  products: ProductItem[];
}

export function CreatorsLanding({ products }: CreatorsLandingProps) {
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    instagram: '',
    facebook: '',
    note: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');
  const formRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Intersection observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    document.querySelectorAll('.scroll-reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!selectedProduct) {
      setError('Please select a plant first.');
      return;
    }
    if (!formData.name || !formData.email || !formData.phone || !formData.instagram) {
      setError('Please fill in all required fields.');
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch('/api/creators/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          productId: selectedProduct.id,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Something went wrong.');
        setIsSubmitting(false);
        return;
      }

      setIsSubmitted(true);
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRestart = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      instagram: '',
      facebook: '',
      note: '',
    });
    setSelectedProduct(null);
    setIsSubmitted(false);
    setError('');
  };

  return (
    <>
      <style jsx global>{`
        .scroll-reveal {
          opacity: 0;
          transform: translateY(32px);
          transition: opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1), transform 0.7s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .scroll-reveal.animate-in {
          opacity: 1;
          transform: translateY(0);
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .success-fade-in {
          animation: fadeIn 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        .scroll-reveal:nth-child(2) { transition-delay: 0.1s; }
        .scroll-reveal:nth-child(3) { transition-delay: 0.2s; }
        .scroll-reveal:nth-child(4) { transition-delay: 0.3s; }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
        .float-animation {
          animation: float 6s ease-in-out infinite;
        }
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        .shimmer-border {
          background: linear-gradient(90deg, #2D6A4F, #52B788, #B7E4C7, #52B788, #2D6A4F);
          background-size: 200% 100%;
          animation: shimmer 3s linear infinite;
        }
        @keyframes grain-shift {
          0%, 100% { transform: translate(0, 0); }
          10% { transform: translate(-5%, -10%); }
          30% { transform: translate(3%, -15%); }
          50% { transform: translate(12%, 9%); }
          70% { transform: translate(9%, 4%); }
          90% { transform: translate(-1%, 7%); }
        }
        .grain::before {
          content: '';
          position: absolute;
          inset: -50%;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
          animation: grain-shift 8s steps(10) infinite;
          pointer-events: none;
          z-index: 1;
        }
      `}</style>

      <div className="relative bg-white overflow-hidden">
        {/* ═══════════════════════════════════════════════ */}
        {/* SECTION 1 — HERO */}
        {/* ═══════════════════════════════════════════════ */}
        <section className="relative min-h-[92vh] flex items-center overflow-hidden bg-[#F8FFF9] grain">
          {/* Background layers */}
          <div className="absolute top-0 right-0 w-3/5 h-full bg-gradient-to-bl from-[#52B788]/20 to-transparent rounded-bl-[140px] opacity-60 -z-10" />
          <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-[#B7E4C7]/40 rounded-full blur-[100px] -z-10" />
          <div className="absolute -bottom-32 -left-32 w-[600px] h-[600px] bg-[#52B788]/20 rounded-full blur-[100px] -z-10" />
          
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 py-12 lg:py-16">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              
              {/* Left Content */}
              <div className="max-w-xl order-2 lg:order-1">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-md px-4 py-2 rounded-full mb-8 border border-[#52B788]/20 shadow-sm">
                  <Sparkles className="w-4 h-4 text-[#2D6A4F]" />
                  <span className="text-sm font-bold text-[#2D6A4F] tracking-wide uppercase">Creator Program</span>
                </div>

                <h1 className="text-5xl sm:text-6xl lg:text-[72px] font-extrabold text-[#1B4332] leading-[1.05] tracking-tight mb-8">
                  We&apos;ll Send You<br />
                  a Beautiful Plant.<br />
                  <span className="relative inline-block mt-2">
                    <span className="relative z-10 text-[#2D6A4F] italic pr-4">For Free.</span>
                    <svg className="absolute -bottom-2 left-0 w-full h-4 text-[#B7E4C7] -z-10" viewBox="0 0 200 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M2 10C68.5 2 135 2 198 10" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
                    </svg>
                  </span>
                </h1>

                <p className="text-lg sm:text-xl text-gray-600 leading-relaxed mb-10 font-medium">
                  No strings. No follower minimums. Just real creators who love plants
                  and make beautiful content. That&apos;s the entire deal.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={scrollToForm}
                    className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-lg font-bold transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1"
                    style={{ backgroundColor: '#1B4332', color: 'white' }}
                  >
                    Apply Now
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <a
                    href="#how-it-works"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-lg font-bold transition-colors border-2 hover:opacity-80"
                    style={{ color: '#1B4332', borderColor: '#1B4332', backgroundColor: 'transparent' }}
                  >
                    See How It Works
                  </a>
                </div>
              </div>

              {/* Right Infographic Composition */}
              {/* Right Infographic Composition */}
              <div className="relative w-full mt-8 lg:mt-0 flex justify-center lg:justify-end items-center px-4 sm:px-8 order-1 lg:order-2">
                
                {/* Background decorative elements - purely aesthetic and responsive */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md aspect-square rounded-full bg-gradient-to-br from-[#B7E4C7]/40 to-transparent blur-3xl opacity-60 z-0" />

                {/* Main Card Container */}
                <div className="relative w-full max-w-[380px] sm:max-w-[420px] z-10">
                  
                  {/* Trust Badge Floating Top Center */}
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white px-3 sm:px-5 py-2 sm:py-3 rounded-xl sm:rounded-2xl shadow-xl shadow-[#1B4332]/5 border border-gray-100 flex items-center gap-2 sm:gap-3 z-30 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-[#F0FDF4] flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#2D6A4F]" />
                    </div>
                    <div>
                      <p className="text-[9px] sm:text-[10px] font-bold text-gray-400 uppercase tracking-wider leading-none">Status</p>
                      <p className="text-xs sm:text-sm font-extrabold text-[#1B4332] whitespace-nowrap leading-tight">Verified Partner</p>
                    </div>
                  </div>

                  {/* Main Kit Card */}
                  <div className="w-full bg-white rounded-[32px] sm:rounded-[40px] shadow-[0_20px_50px_-12px_rgba(27,67,50,0.15)] border border-gray-100 p-5 sm:p-6 relative z-20 overflow-hidden transform hover:-translate-y-2 transition-transform duration-500">
                    
                    {/* Header */}
                    <div className="flex justify-between items-center mb-5">
                      <div className="text-left">
                        <h3 className="font-extrabold text-gray-900 leading-tight">Creator Kit</h3>
                        <p className="text-xs font-bold text-[#52B788]">Free Delivery</p>
                      </div>
                      <div className="bg-[#FFF1F2] px-3 py-1.5 rounded-full flex items-center gap-1.5 shrink-0">
                        <Heart className="w-3.5 h-3.5 text-[#E11D48] fill-[#E11D48]" />
                        <span className="text-[10px] font-bold text-[#E11D48]">100% OFF</span>
                      </div>
                    </div>

                    {/* Image Area */}
                    <div className="w-full aspect-[4/3] rounded-2xl sm:rounded-[24px] overflow-hidden relative mb-5 group">
                      <Image 
                        src="https://lightgrey-nightingale-217677.hostingersite.com/wp-content/uploads/2026/06/Home-Page-Slide1.webp" 
                        alt="Creator Plant Kit" 
                        fill 
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4 text-left">
                        <p className="text-white font-extrabold text-lg sm:text-xl drop-shadow-md">Premium Indoor Plant</p>
                        <p className="text-white/80 text-xs font-medium drop-shadow-md">Hand-selected for you</p>
                      </div>
                    </div>

                    {/* Content / Terms */}
                    <div className="space-y-4">
                      <div className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 bg-gray-50 rounded-2xl">
                        <div className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center shrink-0">
                          <Camera className="w-4 h-4 text-gray-700" />
                        </div>
                        <div>
                          <p className="text-[10px] sm:text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">Your Deliverable</p>
                          <p className="text-sm font-bold text-gray-900">1x High-Quality Reel</p>
                          <p className="text-xs text-gray-500 mt-0.5">Honest review & aesthetic unboxing</p>
                        </div>
                      </div>

                      {/* Social Proof Avatars */}
                      <div className="flex items-center justify-between px-2 pt-1">
                        <div className="flex -space-x-2">
                          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-white bg-blue-100 flex items-center justify-center text-[9px] sm:text-[10px] font-bold text-blue-700 z-30 shadow-sm">MR</div>
                          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-white bg-pink-100 flex items-center justify-center text-[9px] sm:text-[10px] font-bold text-pink-700 z-20 shadow-sm">SK</div>
                          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-white bg-amber-100 flex items-center justify-center text-[9px] sm:text-[10px] font-bold text-amber-700 z-10 shadow-sm">JD</div>
                        </div>
                        <p className="text-xs font-bold text-gray-500">Join 50+ creators</p>
                      </div>
                    </div>
                  </div>

                  {/* Floating Background Dots/Rings */}
                  <div className="absolute -bottom-6 -right-6 w-32 h-32 border-[8px] border-[#F0FDF4] rounded-full z-10 pointer-events-none" />
                  <div className="absolute -bottom-2 -right-2 w-24 h-24 border-[8px] border-[#E6F4EA] rounded-full z-10 pointer-events-none" />

                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="how-it-works" className="py-16 md:py-24 lg:py-32 bg-white relative">
          <div className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12 md:mb-20 scroll-reveal">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1B4332] tracking-tight mb-4">
                Honestly, it&apos;s simple.
              </h2>
              <p className="text-sm sm:text-base lg:text-lg text-gray-500 font-medium leading-relaxed">
                Four steps. No contracts. No complicated briefs. Just you, a plant, and your camera.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
              {[
                {
                  icon: Leaf,
                  step: '01',
                  title: 'Pick a plant',
                  desc: 'Browse our full catalog and choose any plant you love.',
                },
                {
                  icon: Send,
                  step: '02',
                  title: 'Apply here',
                  desc: 'Fill in your details. Takes about 60 seconds.',
                },
                {
                  icon: Gift,
                  step: '03',
                  title: 'Get it free',
                  desc: 'Approved? You get a coupon. The plant ships to you at zero cost.',
                },
                {
                  icon: Camera,
                  step: '04',
                  title: 'Create & share',
                  desc: 'Make an honest, beautiful video. Tag us. That\u2019s it.',
                },
              ].map((item) => (
                <div
                  key={item.step}
                  className="scroll-reveal bg-white border border-[#E6F4EA] rounded-2xl p-4 sm:p-6 lg:p-8 relative group hover:border-[#2D6A4F]/30 hover:shadow-[0_12px_30px_rgba(27,67,50,0.06)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    {/* Top Row: Icon & Step Tag */}
                    <div className="flex justify-between items-start mb-3 sm:mb-4">
                      <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-xl bg-[#F0FDF4] flex items-center justify-center text-[#2D6A4F] group-hover:bg-[#2D6A4F] group-hover:text-white transition-all duration-300">
                        <item.icon className="w-4 h-4 sm:w-6 sm:h-6 transition-transform duration-300 group-hover:scale-110" />
                      </div>
                      <span className="text-[9px] sm:text-xs font-extrabold uppercase tracking-[1.5px] sm:tracking-[3px] text-[#2D6A4F]/60">
                        Step {item.step}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-sm sm:text-lg lg:text-xl font-bold text-gray-900 mb-1.5 sm:mb-2 group-hover:text-[#1B4332] transition-colors">
                      {item.title}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-xs sm:text-sm text-gray-500 font-medium leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════ */}
        {/* SECTION 3 — WHAT WE'RE LOOKING FOR */}
        {/* ═══════════════════════════════════════════════ */}
        <section className="py-16 md:py-24 lg:py-32 relative overflow-hidden" style={{ backgroundColor: '#EAF4EC' }}>
          {/* Elegant grid texture background */}
          <div className="absolute inset-0 pointer-events-none" style={{
            backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.6) 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }} />

          <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8" style={{ position: 'relative', zIndex: 10 }}>
            <div className="text-center max-w-2xl mx-auto mb-12 md:mb-20 scroll-reveal">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1B4332] tracking-tight mb-4">
                What we&apos;re looking for.
              </h2>
              <p className="text-sm sm:text-base lg:text-lg text-gray-500 font-medium leading-relaxed">
                We&apos;re not chasing follower counts. We care about one thing: do you create content that feels real?
              </p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {[
                {
                  icon: Heart,
                  title: 'Genuine plant love',
                  desc: 'You actually like plants. Not pretending for a brand deal.',
                },
                {
                  icon: Camera,
                  title: 'Good eye for visuals',
                  desc: 'Your feed has a vibe. Aesthetic, raw, moody — anything with intention.',
                },
                {
                  icon: Users,
                  title: 'An engaged audience',
                  desc: '500 followers who actually care > 50k ghosts. We mean it.',
                },
                {
                  icon: Star,
                  title: 'Honest content',
                  desc: 'No scripts. No fake hype. Just your real experience with the plant.',
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="scroll-reveal bg-white border border-[#E6F4EA] rounded-2xl p-4 sm:p-6 lg:p-7 relative group hover:border-[#2D6A4F]/30 hover:shadow-[0_12px_30px_rgba(27,67,50,0.06)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-[#F0FDF4] flex items-center justify-center mb-4 text-[#2D6A4F] group-hover:bg-[#2D6A4F] group-hover:text-white transition-all duration-300">
                      <item.icon className="w-4 h-4 sm:w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                    </div>
                    <h3 className="text-sm sm:text-base lg:text-lg font-bold text-gray-900 mb-1.5 sm:mb-2 group-hover:text-[#1B4332] transition-colors">{item.title}</h3>
                    <p className="text-xs sm:text-sm text-gray-500 font-medium leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════ */}
        {/* SECTION 4 — APPLICATION FORM */}
        {/* ═══════════════════════════════════════════════ */}
        <section ref={formRef} className="py-24 lg:py-32 bg-white relative">
          <div className="container mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            
            {isSubmitted ? (
              /* Success State */
              <div className="success-fade-in text-center py-16">
                <div className="w-20 h-20 bg-[#F0FDF4] rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-10 h-10 text-[#2D6A4F]" />
                </div>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1B4332] mb-4">
                  Thank you for submitting your application!
                </h2>
                
                <div className="max-w-md mx-auto bg-gray-50 rounded-2xl p-5 border border-gray-100 mb-6">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Confirmation sent to</p>
                  <p className="text-lg font-bold text-gray-800 font-mono break-all">{formData.email}</p>
                </div>

                <p className="text-sm text-gray-500 font-medium max-w-lg mx-auto mb-8 leading-relaxed">
                  We have sent you a confirmation email. <strong>Note:</strong> The confirmation email might also go to your spam folder, so please check there as well. We will review your profile and get back to you within 48 hours.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <button
                    onClick={handleRestart}
                    className="px-6 py-2.5 text-white text-sm font-bold rounded-xl transition-all shadow-md hover:shadow-lg hover:opacity-90"
                    style={{ backgroundColor: '#1B4332', color: 'white' }}
                  >
                    Restart Application
                  </button>
                  <Link 
                    href="/shop" 
                    className="inline-flex items-center gap-2 text-[#2D6A4F] text-sm font-bold hover:underline"
                  >
                    Explore our shop while you wait <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ) : (
              /* Form */
              <div className="success-fade-in">
                <div className="text-center max-w-2xl mx-auto mb-12">
                  <h2 className="text-4xl sm:text-5xl font-extrabold text-[#1B4332] tracking-tight mb-5">
                    Apply now.
                  </h2>
                  <p className="text-lg text-gray-500 font-medium leading-relaxed">
                    Pick your plant, tell us about yourself, and we&apos;ll take it from there.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Plant Selector */}
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Choose your plant *
                    </label>
                    <div ref={dropdownRef} className="relative">
                      <button
                        type="button"
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className={`w-full flex items-center justify-between gap-3 p-4 bg-white border-2 rounded-xl text-left transition-all ${
                          isDropdownOpen 
                            ? 'border-[#2D6A4F] ring-4 ring-[#2D6A4F]/10' 
                            : selectedProduct 
                              ? 'border-[#D1FAE5]' 
                              : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        {selectedProduct ? (
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg overflow-hidden bg-gray-100 shrink-0 border border-gray-200">
                              <Image
                                src={selectedProduct.image}
                                alt={selectedProduct.name}
                                width={40}
                                height={40}
                                unoptimized
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div>
                              <span className="font-bold text-gray-900 block text-sm">{selectedProduct.name}</span>
                            </div>
                          </div>
                        ) : (
                          <span className="text-gray-400 font-medium">Select a plant from our catalog...</span>
                        )}
                        <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                      </button>
 
                      {isDropdownOpen && (
                        <div className="absolute z-50 top-full left-0 right-0 mt-2 bg-white border-2 border-gray-200 rounded-xl shadow-2xl overflow-hidden">
                          {/* Search */}
                          <div className="p-3 border-b border-gray-100">
                            <input
                              type="text"
                              placeholder="Search plants..."
                              value={searchQuery}
                              onChange={(e) => setSearchQuery(e.target.value)}
                              className="w-full px-3 py-2 bg-gray-50 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]/20"
                              autoFocus
                            />
                          </div>
                          {/* Options */}
                          <div className="max-h-48 overflow-y-auto">
                            {filteredProducts.length === 0 ? (
                              <div className="p-4 text-center text-gray-400 text-sm">No plants found</div>
                            ) : (
                              filteredProducts.map((product) => (
                                <button
                                  key={product.id}
                                  type="button"
                                  onClick={() => {
                                    setSelectedProduct(product);
                                    setIsDropdownOpen(false);
                                    setSearchQuery('');
                                  }}
                                  className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-[#F0FDF4] transition-colors ${
                                    selectedProduct?.id === product.id ? 'bg-[#F0FDF4]' : ''
                                  }`}
                                >
                                  <div className="w-10 h-10 rounded-lg overflow-hidden bg-gray-100 shrink-0 border border-gray-200">
                                    {product.image ? (
                                      <Image
                                        src={product.image}
                                        alt={product.name}
                                        width={40}
                                        height={40}
                                        unoptimized
                                        className="w-full h-full object-cover"
                                      />
                                    ) : (
                                      <div className="w-full h-full flex items-center justify-center">
                                        <Leaf className="w-4 h-4 text-gray-300" />
                                      </div>
                                    )}
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <span className="font-bold text-gray-900 text-sm block truncate">{product.name}</span>
                                  </div>
                                  {selectedProduct?.id === product.id && (
                                    <CheckCircle2 className="w-4 h-4 text-[#2D6A4F] shrink-0" />
                                  )}
                                </button>
                              ))
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Name */}
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Your name *</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3.5 bg-white border-2 border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:border-[#2D6A4F] focus:ring-4 focus:ring-[#2D6A4F]/10 transition-all"
                      placeholder="Your full name"
                    />
                  </div>

                  {/* Social Handles */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Instagram handle *</label>
                      <div className="relative">
                        <InstagramIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="text"
                          value={formData.instagram}
                          onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                          style={{ paddingLeft: '2.5rem' }}
                          className="w-full pr-4 py-3.5 bg-white border-2 border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:border-[#2D6A4F] focus:ring-4 focus:ring-[#2D6A4F]/10 transition-all"
                          placeholder="your_handle"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Facebook username / ID</label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-400">fb.com/</span>
                        <input
                          type="text"
                          value={formData.facebook}
                          onChange={(e) => setFormData({ ...formData, facebook: e.target.value })}
                          style={{ paddingLeft: '4.5rem' }}
                          className="w-full pr-4 py-3.5 bg-white border-2 border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:border-[#2D6A4F] focus:ring-4 focus:ring-[#2D6A4F]/10 transition-all"
                          placeholder="username"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Email & Phone */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Email *</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3.5 bg-white border-2 border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:border-[#2D6A4F] focus:ring-4 focus:ring-[#2D6A4F]/10 transition-all"
                        placeholder="you@email.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Phone *</label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-bold text-gray-400">+91</span>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          style={{ paddingLeft: '3rem' }}
                          maxLength={10}
                          className="w-full pr-4 py-3.5 bg-white border-2 border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:border-[#2D6A4F] focus:ring-4 focus:ring-[#2D6A4F]/10 transition-all"
                          placeholder="9876543210"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Note */}
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Anything else? <span className="text-gray-400 font-normal">(optional)</span>
                    </label>
                    <textarea
                      value={formData.note}
                      onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                      rows={3}
                      className="w-full px-4 py-3.5 bg-white border-2 border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:border-[#2D6A4F] focus:ring-4 focus:ring-[#2D6A4F]/10 transition-all resize-none"
                      placeholder="Tell us about your content style, your audience, or why you'd love this plant..."
                    />
                  </div>

                  {/* Error */}
                  {error && (
                    <div className="flex items-center gap-2 px-4 py-3 bg-red-50 border border-red-200 rounded-xl">
                      <X className="w-4 h-4 text-red-500 shrink-0" />
                      <p className="text-sm text-red-600 font-medium">{error}</p>
                    </div>
                  )}

                  {/* Submit */}
                  <div className="pt-2">
                    <div className="shimmer-border p-[2px]" style={{ borderRadius: '12px' }}>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full text-white py-4 text-lg font-bold transition-all flex items-center justify-center gap-2 disabled:opacity-60 hover:opacity-90"
                        style={{ backgroundColor: '#1B4332', color: 'white', borderRadius: '12px' }}
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Submitting...
                          </>
                        ) : (
                          <>
                            Submit Application
                            <ArrowRight className="w-5 h-5" />
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            )}
          </div>
        </section>

        {/* ═══════════════════════════════════════════════ */}
        {/* FOOTER STRIP */}
        {/* ═══════════════════════════════════════════════ */}
        <section className="py-12 bg-[#F0FDF4] border-t border-[#D1FAE5]">
          <div className="container mx-auto max-w-4xl px-4 text-center">
            <p className="text-gray-500 font-medium text-lg">
              Still scrolling? You&apos;re probably a good fit.{' '}
              <button onClick={scrollToForm} className="text-[#2D6A4F] font-bold hover:underline">
                Go apply.
              </button>
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
