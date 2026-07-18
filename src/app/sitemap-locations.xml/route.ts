import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

const BASE = 'https://www.indoorplant.in';

export async function GET() {
  const [cityHubs, stateHubs] = await Promise.all([
    prisma.cityHub.findMany({
      where: { isActive: true, isIndexed: true },
      select: { slug: true, updatedAt: true },
    }),
    prisma.stateHub.findMany({
      where: { isActive: true, isIndexed: true },
      select: { slug: true, updatedAt: true },
    }),
  ]);

  const cityUrls = cityHubs.map(
    (h) =>
      `  <url>\n    <loc>${BASE}/plants/${h.slug}</loc>\n    <lastmod>${h.updatedAt.toISOString()}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>`
  );

  const stateUrls = stateHubs.map(
    (h) =>
      `  <url>\n    <loc>${BASE}/plants/state/${h.slug}</loc>\n    <lastmod>${h.updatedAt.toISOString()}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.6</priority>\n  </url>`
  );

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${[...cityUrls, ...stateUrls].join('\n')}\n</urlset>`;
  return new NextResponse(xml, { headers: { 'Content-Type': 'application/xml' } });
}
