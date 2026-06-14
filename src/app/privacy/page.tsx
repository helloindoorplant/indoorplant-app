import Link from "next/link";
import { Shield, Eye, Lock, Globe } from "lucide-react";

export const metadata = {
  title: "Privacy Policy | IndoorPlant.in",
  description: "Read our privacy policy to understand how we collect, use, and protect your personal data at IndoorPlant.in.",
};

export default function PrivacyPage() {
  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumbs */}
        <nav className="text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900 font-medium">Privacy Policy</span>
        </nav>

        {/* Page Header */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mb-8">
          <div className="flex items-center gap-3 text-primary mb-4">
            <div className="p-2 bg-primary/10 rounded-xl">
              <Shield className="w-6 h-6" />
            </div>
            <span className="text-sm font-bold uppercase tracking-wider">Legal</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 font-playfair tracking-tight mb-4">
            Privacy Policy
          </h1>
          <p className="text-gray-600 text-lg leading-relaxed">
            Your privacy is highly important to us. Here is how we collect, use, and protect your data.
          </p>
        </div>

        {/* Page Body */}
        <div className="bg-white rounded-2xl p-8 md:p-10 shadow-sm border border-gray-100 space-y-8 text-gray-600 leading-relaxed">
          
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">1. Information We Collect</h3>
            <p>
              We collect information you provide directly to us, such as when you create an account, place an order, contact customer support, or sign up for our newsletter. This includes your name, email, phone number, shipping address, and payment details (processed securely via our payment gateway).
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">2. How We Use Your Information</h3>
            <p className="mb-3">We use your information to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Process and fulfill your orders, including delivery tracking.</li>
              <li>Provide customer support and respond to questions.</li>
              <li>Send care guides, tips, and promotional updates if you subscribe.</li>
              <li>Optimize and improve our store experience.</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">3. Data Security</h3>
            <p>
              We implement industry-standard security measures, including SSL encryption and secure payment processors, to ensure that your personal information remains safe and protected from unauthorized access.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">4. Cookies</h3>
            <p>
              We use cookies to keep track of items in your cart, customize your shopping experience, and analyze site traffic. You can disable cookies in your browser settings, though some features of the website may stop functioning.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
