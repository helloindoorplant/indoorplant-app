import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Indoor Plant FAQs — Delivery, Care and Returns | IndoorPlant.in",
  description: "Common questions about ordering plants from IndoorPlant.in — delivery timelines, packaging, our 12-hour damage return window, and care tips after your plant arrives.",
  keywords: [
    "IndoorPlant.in FAQ",
    "plant delivery questions India",
    "indoor plant return policy India",
    "plant care after delivery",
    "how to order plants online India",
    "12 hour return policy plants"
  ],
  openGraph: {
    title: "Indoor Plant FAQs — Delivery, Care and Returns | IndoorPlant.in",
    description: "Common questions about ordering plants from IndoorPlant.in — delivery timelines, packaging, our 12-hour damage return window, and care tips after your plant arrives.",
    url: "https://www.indoorplant.in/faq"
  }
};

export default function FaqLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How long does plant delivery take?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Most orders arrive in 3-5 business days. Delhi, Mumbai, Bangalore, Hyderabad, and Pune typically receive orders in 2-3 days. A tracking link is sent after dispatch."
        }
      },
      {
        "@type": "Question",
        "name": "What is your return policy?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We accept returns only if your plant arrives visibly damaged. You must report it within 12 hours of delivery with a photo. Email support@indoorplant.in with your order number. Change-of-mind returns are not accepted."
        }
      },
      {
        "@type": "Question",
        "name": "What counts as a damaged plant on arrival?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Broken stems, crushed leaves, or a root ball that has come apart during transit. Slight drooping or leaf curling from transit stress is normal and resolves in 2-3 days — this does not qualify as damage."
        }
      },
      {
        "@type": "Question",
        "name": "How are plants packed for delivery?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Plants are packed in breathable cardboard boxes with the soil secured around the root ball. Plants are watered before packing and dispatched the same or next business day."
        }
      },
      {
        "@type": "Question",
        "name": "Do you deliver across India?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. IndoorPlant.in delivers to all major cities across India including Delhi, Mumbai, Bangalore, Chennai, Hyderabad, Kolkata, Pune, and Ahmedabad. Check pincode availability on the product page."
        }
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      {children}
    </>
  );
}
