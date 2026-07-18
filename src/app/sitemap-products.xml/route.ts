import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

const BASE = 'https://www.indoorplant.in';

export async function GET() {
  const products = await prisma.product.findMany({
    select: { slug: true, updatedAt: true },
    orderBy: { updatedAt: 'desc' },
  });

  const urls = products
    .map(
      (p) =>
        `  <url>\n    <loc>${BASE}/product/${p.slug}</loc>\n    <lastmod>${p.updatedAt.toISOString()}</lastmod>\n    <changefreq>daily</changefreq>\n    <priority>0.8</priority>\n  </url>`
    )
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`;
  return new NextResponse(xml, { headers: { 'Content-Type': 'application/xml' } });
}
