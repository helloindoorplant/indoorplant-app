import { NextResponse } from 'next/server';

const BASE = 'https://www.indoorplant.in';

const CHILD_SITEMAPS = [
  `${BASE}/sitemap-core.xml`,
  `${BASE}/sitemap-products.xml`,
  `${BASE}/sitemap-locations.xml`,
  `${BASE}/sitemap-posts.xml`,
];

/**
 * Sitemap index — /sitemap.xml
 * Referenced in robots.txt. Google follows this to discover all child sitemaps.
 * Each child sitemap updates automatically as content is added/changed.
 */
export async function GET() {
  const now = new Date().toISOString();
  const sitemaps = CHILD_SITEMAPS.map(
    (loc) =>
      `  <sitemap>\n    <loc>${loc}</loc>\n    <lastmod>${now}</lastmod>\n  </sitemap>`
  ).join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemaps}\n</sitemapindex>`;

  return new NextResponse(xml, {
    headers: { 'Content-Type': 'application/xml' },
  });
}
