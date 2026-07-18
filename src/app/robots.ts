import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin/',
          '/api/',
          '/checkout/',
          '/account/',
          '/order-confirmation/',
        ],
      },
    ],
    sitemap: 'https://www.indoorplant.in/sitemap.xml',
  };
}
