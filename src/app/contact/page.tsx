import { Mail, MapPin, Phone, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Contact Us | IndoorPlant.in",
  description: "Get in touch with IndoorPlant.in support. We're here to help with your orders, plant care, and general inquiries.",
  keywords: ["contact IndoorPlant.in", "customer care IndoorPlant.in", "plant support India", "helloindoorplant"]
};

export default function ContactPage() {
  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h1 className="text-4xl font-extrabold text-gray-900 font-playfair tracking-tight mb-4">
            Get in Touch
          </h1>
          <p className="text-lg text-gray-600">
            Have a question about an order or need urgent plant care advice? Our team of plant experts is here to help you thrive.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Contact Information & Quick Links */}
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-6 border-b border-gray-100 pb-4">Contact Information</h3>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <Phone className="w-5 h-5 text-primary" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-900">Phone & WhatsApp</p>
                    <p className="text-sm text-gray-600 mt-1">+91 7003587996</p>
                    <p className="text-xs text-gray-500 mt-0.5">Mon-Sat, 10 AM - 7 PM IST</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <Mail className="w-5 h-5 text-primary" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-900">Email Support</p>
                    <p className="text-sm text-gray-600 mt-1">helloindoorplant@gmail.com</p>
                    <p className="text-xs text-gray-500 mt-0.5">We aim to reply within 24 hours</p>
                  </div>
                </div>


              </div>
            </div>

            {/* WhatsApp CTA */}
            <div className="bg-[#25D366] p-8 rounded-2xl text-white shadow-sm">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-4">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Need a quick reply?</h3>
              <p className="text-white/90 text-sm mb-6">Message us directly on WhatsApp for instant support regarding your orders.</p>
              <a href="https://wa.me/917003587996" target="_blank" rel="noopener noreferrer" className="inline-block bg-white text-[#25D366] font-bold px-6 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                Chat on WhatsApp
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-8 font-playfair">Send us a message</h3>
              
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="first-name" className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
                    <input type="text" id="first-name" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-colors" placeholder="John" required />
                  </div>
                  <div>
                    <label htmlFor="last-name" className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                    <input type="text" id="last-name" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-colors" placeholder="Doe" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                    <input type="email" id="email" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-colors" placeholder="john@example.com" required />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                    <input type="tel" id="phone" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-colors" placeholder="+91 7003587996" />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">Subject *</label>
                  <select id="subject" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-colors bg-white">
                    <option>Order Inquiry</option>
                    <option>Plant Care Question</option>
                    <option>Returns & Replacements</option>
                    <option>Feedback / Suggestion</option>
                    <option>Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="order-id" className="block text-sm font-medium text-gray-700 mb-2">Order ID (Optional)</label>
                  <input type="text" id="order-id" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-colors" placeholder="e.g. IN-12345" />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Your Message *</label>
                  <textarea id="message" rows={6} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-colors resize-none" placeholder="How can we help you?" required></textarea>
                </div>

                <div className="pt-2">
                  <Button type="button" className="w-full md:w-auto px-8 py-3 h-auto bg-primary hover:bg-[#1B4332] text-white font-medium rounded-lg transition-colors">
                    Send Message
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
