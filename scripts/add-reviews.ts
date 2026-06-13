import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const rawReviews = [
  { name: "Arjun K.", text: "Love it.", rating: 5 },
  { name: "Sneha P.", text: "Plant arrived in decent condition but the soil was a bit dry. After watering, it perked right up.", rating: 4 },
  { name: "Ravi", text: "looks beautiful in my living room corner", rating: 5 },
  { name: "Anjali Desai", text: "The packaging was honestly incredible. I was so worried about buying a plant online because of transit damage, but it was secured so well. The self-watering pot is a lifesaver since I travel a lot for work.", rating: 5 },
  { name: "Vikram", text: "Smaller than expected.", rating: 3 },
  { name: "Priya", text: "perfect", rating: 5 },
  { name: "Rahul Sharma", text: "My cat keeps trying to chew on it, but the plant is doing great. Really healthy.", rating: 4 },
  { name: "Neha M.", text: "Worth the price.", rating: 5 },
  { name: "Aditya Singh", text: "This is my third purchase from them. Consistent quality.", rating: 5 },
  { name: "Kavya", text: "A bit pricey but the pot makes up for it.", rating: 4 },
  { name: "Karthik R.", text: "I've killed three money plants before this one. Whatever soil mix they use, it works. Going strong for two months now.", rating: 5 },
  { name: "Simran", text: "Good buy.", rating: 4 },
  { name: "Manoj", text: "Leaves were yellowing when I got it. Support team asked me to keep it near a window and it recovered.", rating: 3 },
  { name: "Pooja", text: "Amazing!", rating: 5 },
  { name: "Suresh", text: "It's okay. Nothing special.", rating: 3 },
  { name: "Aarti V.", text: "I gifted this to my mom for her birthday. She absolutely loved the planter.", rating: 5 },
  { name: "Deepak", text: "The delivery took longer than they said.", rating: 3 },
  { name: "Divya", text: "Really low maintenance. I barely remember to water it.", rating: 5 },
  { name: "Sameer", text: "beautiful plant", rating: 5 },
  { name: "Anita", text: "It died after two weeks, probably my fault.", rating: 2 },
  { name: "Rohan", text: "Looks exactly like the picture. Very green, very fresh.", rating: 5 },
  { name: "Meera", text: "Highly recommend this.", rating: 5 },
  { name: "Amit", text: "Nice.", rating: 4 },
  { name: "Shruti", text: "I didn't realize how big it would be. Make sure you check the dimensions!", rating: 4 },
  { name: "Kiran", text: "Not bad.", rating: 3 },
  { name: "Nitin", text: "The self watering mechanism is actually genius. Saves me so much time.", rating: 5 },
  { name: "Pallavi", text: "so pretty", rating: 5 },
  { name: "Varun", text: "Great packaging. Plant is healthy.", rating: 4 },
  { name: "Ritu", text: "I've ordered plants from other websites before and they always arrive sad and wilted. This one looked like it was just picked up from a local nursery. Impressive.", rating: 5 },
  { name: "Vishal", text: "Superb.", rating: 5 },
  { name: "Sonal", text: "Bought it for my office desk. Getting a lot of compliments.", rating: 5 },
  { name: "Gaurav", text: "Quality is fine.", rating: 4 },
  { name: "Sunita", text: "It's growing really fast! Almost needs a repotting soon.", rating: 5 },
  { name: "Rajesh", text: "Decent.", rating: 3 },
  { name: "Swati", text: "Absolutely gorgeous.", rating: 5 }
];

async function main() {
  console.log("Starting to seed humanized reviews...");

  // 1. Create fake users
  const userIds: string[] = [];
  for (let i = 0; i < rawReviews.length; i++) {
    const reviewer = rawReviews[i];
    const email = `reviewer_${i}_${Date.now()}@example.com`;
    const user = await prisma.user.upsert({
      where: { email },
      update: {},
      create: {
        name: reviewer.name,
        email: email,
        role: "USER"
      }
    });
    userIds.push(user.id);
  }

  console.log(`Created ${userIds.length} users.`);

  // 2. Fetch all products
  const products = await prisma.product.findMany();
  console.log(`Found ${products.length} products.`);

  // 3. Add reviews to each product
  for (const product of products) {
    // Determine random number of reviews between 20 and 30
    const numReviews = Math.floor(Math.random() * 11) + 20;
    
    // Shuffle the reviews array to get a random mix
    const shuffledIndices = Array.from({ length: rawReviews.length }, (_, i) => i)
      .sort(() => 0.5 - Math.random())
      .slice(0, numReviews);

    let count = 0;
    for (const index of shuffledIndices) {
      const reviewData = rawReviews[index];
      
      // Randomize the created date so they don't all look like they were posted at the exact same second
      const daysAgo = Math.floor(Math.random() * 180); // Up to 6 months ago
      const createdAt = new Date();
      createdAt.setDate(createdAt.getDate() - daysAgo);

      await prisma.review.create({
        data: {
          rating: reviewData.rating,
          comment: reviewData.text,
          productId: product.id,
          userId: userIds[index],
          createdAt: createdAt
        }
      });
      count++;
    }
    console.log(`Added ${count} reviews to product: ${product.name}`);
  }

  console.log("Successfully seeded reviews.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
