import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export interface FAQItem {
  question: string;
  answer: string;
}

interface FaqSectionProps {
  title?: string;
  subtitle?: string;
  items: FAQItem[];
}

export function FaqSection({ 
  title = "Frequently Asked Questions", 
  subtitle = "Everything you need to know about this plant and how to care for it.",
  items 
}: FaqSectionProps) {
  
  if (!items || items.length === 0) return null;

  // Generate JSON-LD for SEO/GEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": items.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  };

  return (
    <section className="py-16 lg:py-24 bg-white border-t border-border/30">
      {/* Inject JSON-LD into the head for SEO/GEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <div className="container mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4 text-stone-900">{title}</h2>
          <p className="text-lg text-stone-500 font-medium">{subtitle}</p>
        </div>

        <Accordion className="w-full space-y-4">
          {items.map((item, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`}
              className="bg-stone-50 border-none rounded-2xl px-6 py-2"
            >
              <AccordionTrigger className="text-left text-lg font-bold text-stone-900 hover:no-underline py-4">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-stone-600 text-base leading-relaxed pb-6 pt-0">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
