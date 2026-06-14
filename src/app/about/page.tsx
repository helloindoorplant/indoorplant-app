import Image from "next/image";
import Link from "next/link";
import { Leaf, ShieldCheck, Truck, Users } from "lucide-react";

export const metadata = {
  title: "About Us | IndoorPlant.in",
  description: "Learn about IndoorPlant.in, our mission to bring nature inside, and our commitment to quality indoor plants across India.",
};

export default function AboutPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-primary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 font-playfair tracking-tight mb-6">
              Bringing Nature Inside
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              We started IndoorPlant.in with a simple belief: everyone deserves to experience the joy, calm, and health benefits of living with plants. Whether you live in a compact apartment or a spacious house, we're here to help you find your perfect green companion.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-4xl font-bold text-primary mb-2">50K+</p>
              <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">Happy Customers</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-primary mb-2">200+</p>
              <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">Plant Varieties</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-primary mb-2">99%</p>
              <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">Safe Delivery Rate</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-primary mb-2">24/7</p>
              <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">AI Expert Support</p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story & Mission */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="relative h-[500px] rounded-2xl overflow-hidden bg-gray-100">
              <div className="absolute inset-0 bg-primary/10 flex items-center justify-center">
                <span className="text-primary font-medium">Brand Story Image Placeholder</span>
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 font-playfair mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Founded in 2026, IndoorPlant.in was born out of a frustration with traditional nurseries. Finding the right plant for specific lighting conditions was a guessing game, and getting them home safely was a hassle.
                </p>
                <p>
                  We realized that being a "plant parent" shouldn't require a botany degree. That's why we combined premium, nursery-fresh plants with our cutting-edge AI Plant Advisor. 
                </p>
                <p>
                  Our AI acts as your personal horticulturist, analyzing your space, light, and lifestyle to recommend plants that won't just survive, but thrive in your care.
                </p>
              </div>
              
              <div className="mt-8 pt-8 border-t border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Our Commitment to Sustainability</h3>
                <p className="text-gray-600">
                  We use 100% eco-friendly, biodegradable packaging for all our shipments. Our partner nurseries employ water-recycling systems and organic pest control methods to ensure we're giving back to nature as much as we take from it.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 font-playfair mb-4">The IndoorPlant.in Difference</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">We go above and beyond to ensure your plant journey is successful from day one.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                <Bot className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">AI-Powered Matching</h3>
              <p className="text-gray-600">No more guesswork. Tell our AI about your home, and we'll match you with plants guaranteed to love your space.</p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                <ShieldCheck className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">7-Day Health Guarantee</h3>
              <p className="text-gray-600">If your plant arrives damaged or unhealthy, we'll replace it for free within the first 7 days. No questions asked.</p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                <Truck className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Secure Transit Packaging</h3>
              <p className="text-gray-600">Our custom-engineered boxes keep your plant upright, hydrated, and protected from temperature shocks during transit.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#F8FFF9] text-center border-t border-b border-primary/10">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#1B4332] font-playfair mb-6">Ready to find your perfect plant?</h2>
          <p className="text-gray-600 mb-8 text-lg">Chat with our AI Advisor or browse our curated collections.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/ai-advisor" className="px-8 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-colors shadow-md">
              Talk to AI Advisor
            </Link>
            <Link href="/shop" className="px-8 py-3 bg-white border-2 border-primary/20 text-primary font-semibold rounded-lg hover:bg-primary/5 transition-colors shadow-sm">
              Shop All Plants
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

// Inline Bot Icon since it wasn't imported at top
function Bot(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 8V4H8" />
      <rect width="16" height="12" x="4" y="8" rx="2" />
      <path d="M2 14h2" />
      <path d="M20 14h2" />
      <path d="M15 13v2" />
      <path d="M9 13v2" />
    </svg>
  );
}
