import Link from "next/link";
import { Scale, FileText, CheckCircle2 } from "lucide-react";

export const metadata = {
  title: "Terms & Conditions | IndoorPlant.in",
  description: "Read our Terms and Conditions to understand the rules and guidelines for using the IndoorPlant.in store.",
};

export default function TermsPage() {
  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumbs */}
        <nav className="text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900 font-medium">Terms & Conditions</span>
        </nav>

        {/* Page Header */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mb-8">
          <div className="flex items-center gap-3 text-primary mb-4">
            <div className="p-2 bg-primary/10 rounded-xl">
              <Scale className="w-6 h-6" />
            </div>
            <span className="text-sm font-bold uppercase tracking-wider">Legal</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 font-playfair tracking-tight mb-4">
            Terms & Conditions
          </h1>
          <p className="text-gray-600 text-lg leading-relaxed">
            Welcome to IndoorPlant.in. By placing an order, you agree to follow the terms below.
          </p>
        </div>

        {/* Page Body */}
        <div className="bg-white rounded-2xl p-8 md:p-10 shadow-sm border border-gray-100 space-y-8 text-gray-600 leading-relaxed">
          
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">1. Orders and Pricing</h3>
            <p>
              By placing an order, you represent that you are at least 18 years old and are providing accurate payment and shipping details. We reserve the right to cancel any order if a product is priced incorrectly or goes out of stock. All payments are processed securely in Indian Rupees (INR).
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">2. Plant Care Disclaimer</h3>
            <p>
              Plants are living organisms that require proper light, watering, and care. While our AI Advisor and care guides offer expert recommendations, we are not responsible for plant health issues caused by neglect or improper care after delivery.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">3. 12-Hour Return & Replacement Policy</h3>
            <p>
              As detailed in our <Link href="/returns" className="text-primary hover:underline font-semibold">Returns Policy</Link>, we accept returns only if a plant arrives visibly damaged or spoiled. You must email photos to support@indoorplant.in within 12 hours of delivery. Change-of-mind returns are not accepted.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">4. Intellectual Property</h3>
            <p>
              All content, images, graphics, and logos on IndoorPlant.in are the property of our store and are protected by Indian copyright and intellectual property laws. Unauthorized reproduction is strictly prohibited.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
