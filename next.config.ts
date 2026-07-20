import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // 301 Redirect non-www to www
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'indoorplant.in',
          },
        ],
        destination: 'https://www.indoorplant.in/:path*',
        permanent: true,
      },
      // /shop/indoor/* → canonical product or shop fallback
      { source: '/shop/indoor/monstera-deliciosa', destination: '/product/monstera-broken-heart', permanent: true },
      { source: '/shop/indoor/golden-pothos',      destination: '/product/golden-money-plant',   permanent: true },
      { source: '/shop/indoor/areca-palm',         destination: '/product/bamboo-palm-plant',    permanent: true },
      { source: '/shop/indoor/snake-plant',        destination: '/shop',                         permanent: true },
      { source: '/shop/indoor/zz-plant',           destination: '/shop',                         permanent: true },
      { source: '/shop/indoor/peace-lily',         destination: '/shop',                         permanent: true },
      { source: '/shop/indoor/spider-plant',       destination: '/shop',                         permanent: true },
      { source: '/shop/indoor/rubber-plant',       destination: '/shop',                         permanent: true },
      // /shop/succulents/* → canonical product or shop fallback
      { source: '/shop/succulents/jade-plant',     destination: '/product/lucky-jade-plant',     permanent: true },
      { source: '/shop/succulents/aloe-vera',      destination: '/shop',                         permanent: true },
      // Wildcard catch-alls — must be AFTER the specific rules
      { source: '/shop/indoor/:path*',             destination: '/shop',                         permanent: true },
      { source: '/shop/succulents/:path*',         destination: '/shop',                         permanent: true },
    ];
  },
  images: {
    unoptimized: true,
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'indoorplant.in',
      },
      {
        protocol: 'https',
        hostname: 'www.indoorplant.in',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'lightblue-parrot-226040.hostingersite.com',
      },
      {
        protocol: 'https',
        hostname: 'lightgrey-nightingale-217677.hostingersite.com',
      },
      {
        protocol: 'https',
        hostname: 'api.dicebear.com',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'example.com',
      },
    ],
  },
};

export default nextConfig;
