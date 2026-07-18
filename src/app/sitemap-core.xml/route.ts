import { NextResponse } from 'next/server';

const BASE = 'https://www.indoorplant.in';
const now = new Date().toISOString();

const CORE_URLS = [
  { loc: `${BASE}/`,          changefreq: 'weekly',  priority: '1.0' },
  { loc: `${BASE}/shop`,      changefreq: 'daily',   priority: '0.9' },
  { loc: `${BASE}/about`,     changefreq: 'monthly', priority: '0.5' },
  { loc: `${BASE}/contact`,   changefreq: 'monthly', priority: '0.5' },
  { loc: `${BASE}/blog`,      changefreq: 'weekly',  priority: '0.7' },
  { loc: `${BASE}/plant-care`,changefreq: 'weekly',  priority: '0.7' },
  { loc: `${BASE}/plants`,    changefreq: 'weekly',  priority: '0.8' },
  { loc: `${BASE}/delivery`,  changefreq: 'monthly', priority: '0.5' },
  { loc: `${BASE}/faq`,       changefreq: 'monthly', priority: '0.5' },
  { loc: `${BASE}/shipping`,  changefreq: 'monthly', priority: '0.5' },
  { loc: `${BASE}/returns`,   changefreq: 'monthly', priority: '0.5' },
  { loc: `${BASE}/privacy`,   changefreq: 'yearly',  priority: '0.3' },
  { loc: `${BASE}/terms`,     changefreq: 'yearly',  priority: '0.3' },
];

export async function GET() {
  const urls = CORE_URLS.map(
    (u) =>
      `  <url>\n    <loc>${u.loc}</loc>\n    <lastmod>${now}</lastmod>\n    <changefreq>${u.changefreq}</changefreq>\n    <priority>${u.priority}</priority>\n  </url>`
  ).join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`;
  return new NextResponse(xml, { headers: { 'Content-Type': 'application/xml' } });
}
