import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { BLOG_POSTS } from '@/lib/blog-data';

const BASE = 'https://www.indoorplant.in';
const now = new Date().toISOString();

export async function GET() {
  // Fetch posts from database
  let dbPosts = await prisma.article.findMany({
    select: { slug: true, updatedAt: true, createdAt: true },
    orderBy: { createdAt: 'desc' }
  }).catch(() => []) as any[];

  // Fallback to static posts if DB is not seeded
  let posts = dbPosts.length > 0 ? dbPosts : BLOG_POSTS.map(p => ({
    slug: p.slug,
    // Use current time as static posts don't have a formal updatedAt in data
    updatedAt: new Date(p.date || now), 
  }));

  const urls = posts
    .map(
      (p) =>
        `  <url>\n    <loc>${BASE}/blog/${p.slug}</loc>\n    <lastmod>${(p.updatedAt || new Date()).toISOString()}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.7</priority>\n  </url>`
    )
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`;
  return new NextResponse(xml, { headers: { 'Content-Type': 'application/xml' } });
}
