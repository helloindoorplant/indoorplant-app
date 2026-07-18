/**
 * schema-generator.ts
 * Centralised JSON-LD factory for all page types.
 * All schemas are GEO-ready: descriptions written as natural-language Q&A,
 * speakable markup, areaServed coverage.
 */

const BASE_URL = 'https://www.indoorplant.in';
const ORG_NAME = 'IndoorPlant.in';
const ORG_PHONE = '+91 7003587996';
const ORG_EMAIL = 'helloindoorplant@gmail.com';

// ---------------------------------------------------------------------------
// Organisation schema (upgrade with areaServed for all 13 cities)
// ---------------------------------------------------------------------------
export function genOrgSchema(servedCities: string[] = []) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: ORG_NAME,
    url: BASE_URL,
    logo: `${BASE_URL}/Indoorplant-Logo.svg`,
    description:
      'IndoorPlant.in delivers fresh indoor plants across India with AI-powered recommendations and expert care guides. We serve Bengaluru, Delhi, Mumbai, Pune, Chennai and more.',
    foundingLocation: 'India',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: ORG_PHONE,
      email: ORG_EMAIL,
      contactType: 'customer service',
      availableLanguage: ['English', 'Hindi'],
    },
    areaServed: servedCities.length
      ? servedCities.map((city) => ({ '@type': 'City', name: city }))
      : { '@type': 'Country', name: 'India' },
    sameAs: [
      'https://www.instagram.com/indoorplant.in',
      'https://www.facebook.com/indoorplant.in',
    ],
  };
}

// ---------------------------------------------------------------------------
// WebSite schema with SearchAction (enables sitelinks searchbox in Google)
// ---------------------------------------------------------------------------
export function genWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: ORG_NAME,
    url: BASE_URL,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${BASE_URL}/shop?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

// ---------------------------------------------------------------------------
// BreadcrumbList
// ---------------------------------------------------------------------------
export interface Crumb { name: string; url: string }
export function genBreadcrumbSchema(crumbs: Crumb[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((crumb, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: crumb.name,
      item: crumb.url,
    })),
  };
}

// ---------------------------------------------------------------------------
// Product schema
// ---------------------------------------------------------------------------
export interface ProductSchemaInput {
  name: string;
  slug: string;
  description: string;
  price: number;
  salePrice?: number | null;
  images: string[];
  rating?: number;
  reviewCount?: number;
  cityName?: string;
  deliveryNote?: string;
}
export function genProductSchema(p: ProductSchemaInput) {
  const price = p.salePrice ?? p.price;
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: p.name,
    url: p.cityName
      ? `${BASE_URL}/shop/${p.slug}/${p.cityName.toLowerCase()}`
      : `${BASE_URL}/product/${p.slug}`,
    description: p.description,
    image: p.images,
    brand: { '@type': 'Brand', name: ORG_NAME },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'INR',
      price,
      availability: 'https://schema.org/InStock',
      seller: { '@type': 'Organization', name: ORG_NAME },
      ...(p.cityName && p.deliveryNote
        ? {
            availableDeliveryMethod: 'http://purl.org/goodrelations/v1#DeliveryModeDirectDownload',
            deliveryLeadTime: { '@type': 'QuantitativeValue', description: p.deliveryNote },
            availableAtOrFrom: { '@type': 'Place', address: { '@type': 'PostalAddress', addressLocality: p.cityName, addressCountry: 'IN' } },
          }
        : {}),
    },
  };
  if (p.rating && p.reviewCount) {
    schema.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: p.rating,
      reviewCount: p.reviewCount,
    };
  }
  return schema;
}

// ---------------------------------------------------------------------------
// City Organization schema — used on city hub pages
// Replaces LocalBusiness to avoid physical store implications
// ---------------------------------------------------------------------------
export interface CityOrganizationInput {
  cityName: string;
  citySlug: string;
  deliveryInfo?: string;
  coverageAreas?: string[];
}
export function genCityOrganizationSchema(input: CityOrganizationInput) {
  return {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'OnlineBusiness'],
    name: `${ORG_NAME} — Delivery to ${input.cityName}`,
    url: `${BASE_URL}/plants/${input.citySlug}`,
    telephone: ORG_PHONE,
    email: ORG_EMAIL,
    image: `${BASE_URL}/Indoorplant-Logo.svg`,
    description: `Buy and get indoor plants delivered in ${input.cityName}. ${input.deliveryInfo ?? ''}`,
    areaServed: [
      { '@type': 'City', name: input.cityName },
      ...(input.coverageAreas ?? []).map((area) => ({ '@type': 'Place', name: area })),
    ],
    // GEO: speakable markup so AI engines / voice assistants can read this
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['h1', '.city-intro', '.delivery-info'],
    },
  };
}

// ---------------------------------------------------------------------------
// ItemList schema — for product grids on city/category pages
// ---------------------------------------------------------------------------
export interface ItemListInput { name: string; url: string; image?: string }
export function genItemListSchema(items: ItemListInput[], listName: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: listName,
    itemListElement: items.map((item, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: item.name,
      url: item.url,
      ...(item.image ? { image: item.image } : {}),
    })),
  };
}

// ---------------------------------------------------------------------------
// FAQPage schema
// ---------------------------------------------------------------------------
export interface FAQItem { question: string; answer: string }
export function genFAQSchema(faqs: FAQItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };
}
