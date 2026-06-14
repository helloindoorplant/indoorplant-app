"use client";

import { useState } from "react";
import { ChevronDown, MessageSquare } from "lucide-react";
import Link from "next/link";

const FAQS = [
  {
    category: "Ordering",
    questions: [
      {
        q: "How do I place an order?",
        a: "You can place an order directly on our website. Simply browse our plant collections or talk to our AI Advisor to find the perfect plant, add it to your cart, and proceed to our secure checkout."
      },
      {
        q: "Can I modify or cancel my order?",
        a: "Orders can be modified or cancelled within 4 hours of placement. Please contact our support team immediately at support@indoorplant.in with your Order ID."
      },
      {
        q: "Do you offer cash on delivery?",
        a: "Yes, we offer Cash on Delivery (COD) for most pincodes across India for orders under ₹5,000. The COD option will be available at checkout if your pincode is eligible."
      }
    ]
  },
  {
    category: "Delivery",
    questions: [
      {
        q: "Where do you deliver?",
        a: "We deliver to over 15,000+ pincodes across India. You can enter your pincode on any product page to check if we deliver to your specific location."
      },
      {
        q: "How long does delivery take?",
        a: "Standard delivery typically takes 3-5 business days. In metro cities, you may receive your order within 1-2 days. All plants are shipped using our specialized secure packaging to ensure they arrive safely."
      },
      {
        q: "What if my plant arrives damaged?",
        a: "We have a 7-Day Health Guarantee. If your plant arrives damaged due to transit, simply take a photo within 24 hours of delivery and send it to our support team. We will issue a free replacement immediately."
      }
    ]
  },
  {
    category: "Plants & Care",
    questions: [
      {
        q: "Do the plants come with pots?",
        a: "All plants come in a basic nursery grower pot by default. You have the option to upgrade to a premium ceramic, terracotta, or self-watering pot directly on the product page before adding to your cart."
      },
      {
        q: "How do I care for my new plant after delivery?",
        a: "Every plant comes with a detailed care card. Additionally, you can always ask our AI Advisor specific questions about your plant's care routine, watering schedule, and lighting needs."
      }
    ]
  },
  {
    category: "AI Advisor",
    questions: [
      {
        q: "How does the AI Plant Advisor work?",
        a: "Our AI Advisor acts as your personal horticulturist. It asks you a few simple questions about your home's lighting, your experience level, and lifestyle, and then recommends the best plants that will thrive in your specific environment."
      },
      {
        q: "Is the AI advisor free to use?",
        a: "Yes! The AI Advisor is completely free for everyone to use, whether you're browsing or looking for care advice for a plant you already own."
      }
    ]
  }
];

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState(FAQS[0].category);

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="bg-primary/5 py-16">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 font-playfair tracking-tight mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-gray-600">
            Find answers to common questions about our plants, delivery process, and policies.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Categories</h3>
              <nav className="space-y-1">
                {FAQS.map((category) => (
                  <button
                    key={category.category}
                    onClick={() => setActiveCategory(category.category)}
                    className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      activeCategory === category.category
                        ? "bg-primary text-white"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    {category.category}
                  </button>
                ))}
              </nav>

              <div className="mt-8 bg-gray-50 p-6 rounded-xl border border-gray-100 text-center">
                <MessageSquare className="w-8 h-8 text-primary mx-auto mb-3" />
                <h4 className="text-sm font-bold text-gray-900 mb-2">Still have questions?</h4>
                <p className="text-xs text-gray-500 mb-4">Our team is ready to help you with any specific inquiries.</p>
                <Link href="/contact" className="inline-block w-full py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                  Contact Support
                </Link>
              </div>
            </div>
          </div>

          {/* FAQ Content */}
          <div className="lg:col-span-3">
            {FAQS.map((category) => (
              <div 
                key={category.category}
                className={activeCategory === category.category ? "block" : "hidden"}
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6 font-playfair">{category.category}</h2>
                <div className="space-y-4">
                  {category.questions.map((item, idx) => (
                    <details 
                      key={idx} 
                      className="group border border-gray-200 rounded-xl overflow-hidden bg-white [&_summary::-webkit-details-marker]:hidden"
                    >
                      <summary className="w-full text-left px-6 py-4 flex items-center justify-between cursor-pointer focus:outline-none list-none select-none">
                        <span className="font-medium text-gray-900">{item.q}</span>
                        <ChevronDown className="w-5 h-5 text-gray-400 transition-transform duration-200 group-open:rotate-180" />
                      </summary>
                      <div className="px-6 pb-4 text-gray-600 text-sm leading-relaxed border-t border-gray-100 pt-4 mt-2">
                        {item.a}
                      </div>
                    </details>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
