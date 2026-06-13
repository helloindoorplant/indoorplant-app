import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Mock Categories
const categories = [
  { name: 'All Plants', slug: 'all-plants' },
  { name: 'Air Purifying Plants', slug: 'air-purifying-plants' },
  { name: 'Low Maintenance Plants', slug: 'low-maintenance-plants' },
  { name: 'Pet-Friendly Plants', slug: 'pet-friendly-plants' },
  { name: 'Flowering Plants', slug: 'flowering-plants' },
  { name: 'Succulents & Cacti', slug: 'succulents-and-cacti' },
  { name: 'Rare & Exotic Plants', slug: 'rare-and-exotic-plants' }
]

// Mock Products matching existing mock data
const products = [
  {
    name: "Monstera Deliciosa",
    slug: "monstera-deliciosa",
    description: "The famous Swiss Cheese Plant. Perfect for adding a tropical vibe to any indoor space.",
    price: 999,
    salePrice: 799,
    stock: 45,
    isFeatured: true,
    careLevel: "EASY",
    lightReq: "BRIGHT_INDIRECT",
    petFriendly: false,
    airPurifier: true,
    categorySlug: "all-plants",
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=800&q=80"
    ])
  },
  {
    name: "Snake Plant Laurentii",
    slug: "snake-plant-laurentii",
    description: "One of the toughest indoor plants. Can survive low light and drought while purifying your air at night.",
    price: 499,
    salePrice: null,
    stock: 120,
    isFeatured: true,
    careLevel: "EASY",
    lightReq: "LOW",
    petFriendly: false,
    airPurifier: true,
    categorySlug: "low-maintenance-plants",
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1593482892290-f54927ae2b7a?auto=format&fit=crop&w=800&q=80"
    ])
  },
  {
    name: "Fiddle Leaf Fig",
    slug: "fiddle-leaf-fig",
    description: "A gorgeous statement piece with large, violin-shaped leaves. Needs bright indirect light.",
    price: 1499,
    salePrice: 1299,
    stock: 25,
    isFeatured: true,
    careLevel: "MEDIUM",
    lightReq: "BRIGHT_INDIRECT",
    petFriendly: false,
    airPurifier: true,
    categorySlug: "all-plants",
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1597055958616-bb80b4b2f293?auto=format&fit=crop&w=800&q=80"
    ])
  },
  {
    name: "ZZ Plant",
    slug: "zz-plant",
    description: "Thrives on neglect. Perfect for beginners and busy people. Handles low light gracefully.",
    price: 699,
    salePrice: null,
    stock: 80,
    isFeatured: false,
    careLevel: "EASY",
    lightReq: "LOW",
    petFriendly: false,
    airPurifier: true,
    categorySlug: "low-maintenance-plants",
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1632207691143-643e2a9a9361?auto=format&fit=crop&w=800&q=80"
    ])
  },
  {
    name: "Calathea Orbifolia",
    slug: "calathea-orbifolia",
    description: "Known for its oversized leaves with beautiful silver stripes. Loves humidity.",
    price: 899,
    salePrice: null,
    stock: 15,
    isFeatured: true,
    careLevel: "EXPERT",
    lightReq: "MEDIUM",
    petFriendly: true,
    airPurifier: true,
    categorySlug: "pet-friendly-plants",
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1620127682229-3331b2eb00b3?auto=format&fit=crop&w=800&q=80"
    ])
  }
];

async function main() {
  console.log('Start seeding...');

  // Create Admin User
  const admin = await prisma.user.upsert({
    where: { email: 'admin@indoorplant.in' },
    update: {},
    create: {
      email: 'admin@indoorplant.in',
      name: 'Admin User',
      role: 'ADMIN',
      passwordHash: 'hashed_password_placeholder',
    },
  });
  console.log(`Created admin user: ${admin.email}`);

  // Create Categories
  const categoryMap = new Map();
  for (const cat of categories) {
    const createdCat = await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat,
    });
    categoryMap.set(cat.slug, createdCat.id);
    console.log(`Created category: ${cat.name}`);
  }

  // Create Products
  for (const prod of products) {
    const categoryId = categoryMap.get(prod.categorySlug);
    
    // Remove categorySlug from the object to match Prisma schema
    const { categorySlug, ...productData } = prod;
    
    await prisma.product.upsert({
      where: { slug: prod.slug },
      update: {},
      create: {
        ...productData,
        // @ts-ignore - Types mismatch due to Enums but Prisma will parse strings
        careLevel: prod.careLevel,
        // @ts-ignore
        lightReq: prod.lightReq,
        categories: { connect: [{ id: categoryId }] }
      },
    });
    console.log(`Created product: ${prod.name}`);
  }

  console.log('Seeding finished.');
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
