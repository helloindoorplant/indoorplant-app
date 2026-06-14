import Link from "next/link";
import { ShieldAlert, Mail, Image as ImageIcon, Clock, CheckCircle2, AlertTriangle } from "lucide-react";

export const metadata = {
  title: "Plant Return Policy — 12-Hour Damage Window | IndoorPlant.in",
  description: "Returns are accepted only if your plant arrives damaged. Report within 12 hours of delivery with a photo. Change-of-mind returns are not accepted. Email support@indoorplant.in.",
  keywords: ["IndoorPlant.in return policy", "plant damage return India", "12 hour return window plants", "plant arrived damaged India", "online plant return policy", "plant delivery damage claim India"]
};

export default function ReturnsPolicyPage() {
  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumbs */}
        <nav className="text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900 font-medium">Returns Policy</span>
        </nav>

        {/* Page Header */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mb-8">
          <div className="flex items-center gap-3 text-primary mb-4">
            <div className="p-2 bg-primary/10 rounded-xl">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <span className="text-sm font-bold uppercase tracking-wider">Store Policy</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 font-playfair tracking-tight mb-4">
            Plant Return Policy
          </h1>
          <p className="text-gray-600 text-lg leading-relaxed">
            Our return policy is simple, honest, and built around the delicate nature of shipping live plants.
          </p>
        </div>

        {/* Policy Body */}
        <div className="bg-white rounded-2xl p-8 md:p-10 shadow-sm border border-gray-100 space-y-8">
          
          <div className="border-l-4 border-primary pl-4 py-2 bg-primary/5 rounded-r-xl">
            <p className="font-semibold text-[#1B4332] text-lg">
              We accept returns when a plant arrives visibly damaged — broken stems, crushed leaves, or a root ball that has come apart during transit.
            </p>
          </div>

          <div className="flex items-start gap-4">
            <Clock className="w-6 h-6 text-amber-500 shrink-0 mt-1" />
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">12-Hour Damage Window</h3>
              <p className="text-gray-600 leading-relaxed">
                You have <strong>12 hours</strong> from the time of delivery to report a damaged plant. After that window closes, we are unable to process a return or offer a replacement.
              </p>
            </div>
          </div>

          <hr className="border-gray-100" />

          {/* How to report */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-primary" /> How to Report Damage:
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 bg-gray-50 rounded-xl border border-gray-100 flex items-start gap-4">
                <div className="bg-white p-2 rounded-lg shadow-sm shrink-0">
                  <ImageIcon className="w-5 h-5 text-gray-500" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm mb-1">Step 1: Take Photo</p>
                  <p className="text-xs text-gray-500">Take a clear photo of the plant showing the damage immediately upon unpacking.</p>
                </div>
              </div>

              <div className="p-5 bg-gray-50 rounded-xl border border-gray-100 flex items-start gap-4">
                <div className="bg-white p-2 rounded-lg shadow-sm shrink-0">
                  <Mail className="w-5 h-5 text-gray-500" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm mb-1">Step 2: Email Us</p>
                  <p className="text-xs text-gray-500">Email us at <a href="mailto:support@indoorplant.in" className="text-primary hover:underline">support@indoorplant.in</a> within 12 hours of delivery.</p>
                </div>
              </div>
            </div>

            <p className="text-sm text-gray-500 mt-4 leading-relaxed pl-1">
              * Be sure to include your <strong>Order Number</strong> and attach the photos. We will respond within 24 hours with instructions for your replacement or return.
            </p>
          </div>

          <hr className="border-gray-100" />

          {/* What is not covered */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-500" /> What is Not Covered:
            </h3>
            <ul className="space-y-3 pl-1 text-gray-600">
              <li className="flex items-start gap-2">
                <span className="text-amber-500 mt-1.5 font-bold text-lg leading-none">•</span>
                <span>Change of mind after ordering.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-500 mt-1.5 font-bold text-lg leading-none">•</span>
                <span>Slight drooping or leaf curling from transit stress (this is normal and resolves within 2-3 days with proper light and watering).</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-500 mt-1.5 font-bold text-lg leading-none">•</span>
                <span>Damage caused by improper watering, direct sunlight exposure, or repotting right after delivery.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-500 mt-1.5 font-bold text-lg leading-none">•</span>
                <span>Plants reported more than 12 hours after delivery.</span>
              </li>
            </ul>
          </div>

          <hr className="border-gray-100" />

          <p className="text-center text-gray-500 text-sm leading-relaxed max-w-lg mx-auto">
            If you are unsure whether your plant's condition qualifies under our policy, send us a photo anyway at <a href="mailto:support@indoorplant.in" className="text-primary hover:underline font-semibold">support@indoorplant.in</a> and we will advise honestly.
          </p>

        </div>
      </div>
    </div>
  );
}
