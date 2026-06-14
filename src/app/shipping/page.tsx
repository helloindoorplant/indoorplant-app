import Link from "next/link";
import { Truck, ShieldCheck, MapPin, Package, Clock } from "lucide-react";

export const metadata = {
  title: "Plant Delivery and Shipping — Free Pan-India | IndoorPlant.in",
  description: "Free plant delivery across India. Breathable packaging keeps plants fresh during transit. Check delivery timelines by city and pincode availability.",
  keywords: ["indoor plant delivery India", "plant shipping India", "free plant delivery India", "plant delivery time India", "online plant delivery India", "plant delivery Delhi Mumbai Bangalore", "plant delivery pincode India"]
};

export default function ShippingPage() {
  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumbs */}
        <nav className="text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900 font-medium">Shipping Information</span>
        </nav>

        {/* Page Header */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mb-8">
          <div className="flex items-center gap-3 text-primary mb-4">
            <div className="p-2 bg-primary/10 rounded-xl">
              <Truck className="w-6 h-6" />
            </div>
            <span className="text-sm font-bold uppercase tracking-wider">Logistics</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 font-playfair tracking-tight mb-4">
            Shipping & Delivery
          </h1>
          <p className="text-gray-600 text-lg leading-relaxed">
            We deliver healthy, fresh plants directly to your doorstep across India. Here is how our packaging and shipping process works.
          </p>
        </div>

        {/* Page Body */}
        <div className="bg-white rounded-2xl p-8 md:p-10 shadow-sm border border-gray-100 space-y-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 bg-gray-50 rounded-xl border border-gray-100 flex items-start gap-4">
              <div className="bg-white p-2 rounded-lg shadow-sm shrink-0 text-primary">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-sm mb-1">Free Delivery</p>
                <p className="text-xs text-gray-500 leading-relaxed">We offer free standard shipping on orders above ₹500 across all eligible Indian pincodes.</p>
              </div>
            </div>

            <div className="p-5 bg-gray-50 rounded-xl border border-gray-100 flex items-start gap-4">
              <div className="bg-white p-2 rounded-lg shadow-sm shrink-0 text-primary">
                <Package className="w-5 h-5" />
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-sm mb-1">Secure Packaging</p>
                <p className="text-xs text-gray-500 leading-relaxed">Our custom-engineered breathable boxes keep your plant upright, hydrated, and fully protected.</p>
              </div>
            </div>
          </div>

          <hr className="border-gray-100" />

          {/* Delivery Timelines */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" /> Expected Timelines
            </h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              Our plants are watered, inspected, and packed fresh in our greenhouse before dispatch. Delivery times vary by region:
            </p>
            
            <ul className="space-y-3 pl-1 text-gray-600">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1 font-bold text-lg leading-none">•</span>
                <span><strong>Metro Cities (Delhi, Mumbai, Bangalore, Pune, Hyderabad, Chennai):</strong> 2-3 business days.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1 font-bold text-lg leading-none">•</span>
                <span><strong>Rest of India (Tier 2/Tier 3 Cities):</strong> 3-5 business days.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1 font-bold text-lg leading-none">•</span>
                <span><strong>Remote Locations & Northeast States:</strong> Up to 7 business days.</span>
              </li>
            </ul>
          </div>

          <hr className="border-gray-100" />

          {/* Tracking */}
          <div className="flex items-start gap-4">
            <MapPin className="w-6 h-6 text-primary shrink-0 mt-1" />
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Order Tracking</h3>
              <p className="text-gray-600 leading-relaxed">
                As soon as your plant leaves our greenhouse, we will email and SMS you a tracking link. You can track your plant's journey in real-time. Since live plants shouldn't remain in a box for too long, please make sure someone is available to receive the package on the delivery date.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
