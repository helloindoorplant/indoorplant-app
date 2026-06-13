import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const indianNames = [
  "Aarav Patel", "Diya Sharma", "Rohan Kumar", "Ananya Singh", "Vihaan Gupta",
  "Priya Desai", "Aditya Reddy", "Neha Joshi", "Krishna Iyer", "Sneha Verma",
  "Kabir Mehra", "Meera Nair", "Arjun Bhatia", "Kavya Menon", "Siddharth Rao",
  "Riya Kapoor", "Dev Agarwal", "Ishita Chawla", "Aryan Nanda", "Anika Jain",
  "Rishi Banerjee", "Pooja Das", "Yash Soni", "Tara Malhotra", "Karan Ahluwalia"
];

const comments = [
  "Absolutely love this plant! It arrived in perfect condition and the packaging was completely secure. It has added so much life to my living room.",
  "I'm usually terrible with plants, but this one has been so forgiving. The care instructions provided were spot on. Highly recommend!",
  "Beautiful foliage and exactly as described. It's been a week and it's already showing new growth. Very happy with this purchase.",
  "The size was slightly smaller than I expected based on the photos, but it's very healthy and the roots look strong. Overall, a good buy.",
  "This is my third purchase from IndoorPlant.in and they never disappoint. The plant is lush, vibrant, and looks amazing on my work desk.",
  "Stunning plant! The leaves are glossy and it completely transforms the corner of my bedroom. Delivery was prompt and safe.",
  "I bought this as a gift for my mother and she was absolutely thrilled. The pot it came in is also of very high quality.",
  "Five stars! The plant was well-hydrated upon arrival and there wasn't a single damaged leaf. Truly premium quality.",
  "Such a gorgeous addition to my indoor jungle. It requires minimal maintenance, just like the description said.",
  "I was hesitant to order plants online, but this arrived looking healthier than the ones at my local nursery! Will definitely buy more.",
  "Great plant, but the soil was a bit too wet when it arrived. I had to let it dry out for a few days. Still, it's thriving now.",
  "Incredible value for money. The plant is huge and so full of life. It immediately became the centerpiece of my dining area.",
  "Perfect for beginners! I've only watered it twice and it's doing wonderfully. The dark green leaves are absolutely beautiful.",
  "The packaging was eco-friendly and kept the plant totally secure. The plant itself is gorgeous and exactly what I wanted.",
  "I'm in love with this plant! It brings such a fresh, calming vibe to my apartment. Customer service was also very helpful.",
  "Really healthy root system and beautiful variegation on the leaves. You can tell they take great care of their plants.",
  "Arrived a day late, but the plant was in pristine condition so I can't complain. It's a robust, beautiful specimen.",
  "I placed this in my bathroom and it's loving the humidity. A truly stunning plant that requires almost zero effort.",
  "Exceeded my expectations! The plant is much fuller and bushier than the pictures. A fantastic addition to my home.",
  "Beautiful, healthy, and vibrant. It's been thriving on my balcony. Thank you for such a high-quality product!"
];

async function seedReviews() {
  console.log('Seeding reviews...');

  const products = await prisma.product.findMany();

  if (products.length === 0) {
    console.log('No products found. Please seed products first.');
    return;
  }

  // Create users first
  const createdUsers = [];
  for (const name of indianNames) {
    const email = `${name.toLowerCase().replace(' ', '.')}@example.com`;
    // Using a realistic human face avatar from an open API
    const image = `https://api.dicebear.com/7.x/notionists/svg?seed=${encodeURIComponent(name)}&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf`;
    
    const user = await prisma.user.upsert({
      where: { email },
      update: { image },
      create: {
        name,
        email,
        image,
        role: 'USER',
      }
    });
    createdUsers.push(user);
  }

  // Assign reviews randomly to products
  let reviewCount = 0;
  for (const comment of comments) {
    const user = createdUsers[Math.floor(Math.random() * createdUsers.length)];
    const product = products[Math.floor(Math.random() * products.length)];
    
    // Bias rating towards 4 and 5
    const rating = Math.random() > 0.2 ? 5 : 4;
    
    // Generate a random date within the last 6 months
    const date = new Date();
    date.setDate(date.getDate() - Math.floor(Math.random() * 180));

    await prisma.review.create({
      data: {
        rating,
        comment,
        userId: user.id,
        productId: product.id,
        createdAt: date,
      }
    });
    reviewCount++;
  }

  // Add a few more random reviews just to have multiple per product
  for (let i = 0; i < 15; i++) {
    const user = createdUsers[Math.floor(Math.random() * createdUsers.length)];
    const product = products[Math.floor(Math.random() * products.length)];
    const rating = Math.random() > 0.1 ? 5 : (Math.random() > 0.5 ? 4 : 3);
    const date = new Date();
    date.setDate(date.getDate() - Math.floor(Math.random() * 180));
    
    const randomComment = comments[Math.floor(Math.random() * comments.length)];

    await prisma.review.create({
      data: {
        rating,
        comment: randomComment,
        userId: user.id,
        productId: product.id,
        createdAt: date,
      }
    });
    reviewCount++;
  }

  console.log(`Successfully seeded ${reviewCount} reviews across ${products.length} products using real Indian names.`);
}

seedReviews()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
