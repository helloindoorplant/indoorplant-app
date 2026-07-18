import { NextResponse } from 'next/server';

/**
 * Sitemap: Product x City Pages
 * Empty for now because they are configured as 'route only' 
 * and isIndexed = false in the SEO spec until Tier 1 cities perform.
 */
export async function GET() {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
</urlset>`;

  return new NextResponse(xml, {
    headers: { 'Content-Type': 'application/xml' },
  });
}
