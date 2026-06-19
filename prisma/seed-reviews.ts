import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const indianNames = [
  "Aarav Sharma", "Vivaan Gupta", "Aditya Patel", "Vihaan Singh", "Arjun Kumar",
  "Sai Krishna", "Riyansh Reddy", "Ayaan Das", "Krishna Iyer", "Ishaan Verma",
  "Shaurya Chauhan", "Atharva Joshi", "Dhruv Menon", "Kabir Nair", "Ritvik Rao",
  "Ananya Sharma", "Diya Patel", "Saanvi Singh", "Pari Kumar", "Kavya Reddy",
  "Isha Das", "Navya Iyer", "Aarohi Verma", "Anushka Chauhan", "Riya Joshi",
  "Avni Menon", "Nisha Nair", "Neha Rao", "Sneha Agarwal", "Priya Jain",
  "Rahul Bose", "Vikram Malhotra", "Karan Kapoor", "Siddharth Mehra", "Rohan Ahuja",
  "Pooja Chawla", "Kriti Sanon", "Shruti Haasan", "Aditi Rao", "Divya Dutta",
  "Rahul Dravid", "Saurabh Ganguly", "Virender Sehwag", "Gautam Gambhir", "Yuvraj Singh",
  "Harbhajan Singh", "Zaheer Khan", "Ashish Nehra", "Anil Kumble", "Javagal Srinath",
  "Smriti Mandhana", "Mithali Raj", "Harmanpreet Kaur", "Jhulan Goswami", "Poonam Yadav",
  "Deepti Sharma", "Shikha Pandey", "Radha Yadav", "Taniya Bhatia", "Jemimah Rodrigues",
  "Sunil Chhetri", "Bhaichung Bhutia", "Gurpreet Singh", "Sandesh Jhingan", "Jeje Lalpekhlua",
  "Sushil Kumar", "Yogeshwar Dutt", "Bajrang Punia", "Vinesh Phogat", "Sakshi Malik",
  "Mary Kom", "Sarita Devi", "Lovlina Borgohain", "Amit Panghal", "Vikas Krishan",
  "Saina Nehwal", "P.V. Sindhu", "Kidambi Srikanth", "B. Sai Praneeth", "Parupalli Kashyap",
  "Viswanathan Anand", "Koneru Humpy", "Harika Dronavalli", "Vidit Gujrathi", "Pentala Harikrishna",
  "Abhinav Bindra", "Gagan Narang", "Jitu Rai", "Saurabh Chaudhary", "Manu Bhaker",
  "Neeraj Chopra", "Hima Das", "Dutee Chand", "Swapna Barman", "Manjit Singh"
];

const reviewTexts = [
  "Good plant.",
  "Nice.",
  "Loved it!",
  "Arrived well packaged and the leaves look healthy.",
  "My mom loved it.",
  "Looks exactly like the picture, very happy with the purchase.",
  "Just okay, smaller than expected.",
  "Growing well so far.",
  "The pot was slightly damaged but the plant is fine.",
  "Beautiful addition to my desk.",
  "Awesome packaging.",
  "Plant was a bit dry on arrival but recovered after watering.",
  "Very cute.",
  "Bought this for my office and it brightens up the space.",
  "Good value for money.",
  "Leaves were green and fresh.",
  "A bit pricey but good quality.",
  "Fast delivery.",
  "Highly recommend.",
  "Perfect size for a side table.",
  "Soil was spilling out of the box when I opened it.",
  "Really healthy roots.",
  "Got this as a gift for a friend, they were thrilled.",
  "It has already pushed out a new leaf in just a week.",
  "Looks fake it's so perfect.",
  "Not bad.",
  "Satisfied.",
  "It's okay.",
  "Much bigger than I thought it would be.",
  "I've killed every plant I owned but this one is surviving.",
  "Super fast shipping, plant was safe.",
  "Leaves were a little yellow but I pruned them.",
  "Looks great in my living room.",
  "Excellent quality.",
  "Worth every penny.",
  "Will order again.",
  "Customer support was helpful when I had care questions.",
  "Adds a nice touch to the balcony.",
  "I repotted it immediately and it's doing great.",
  "Exactly what I was looking for."
];

function shuffle<T>(array: T[]): T[] {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
}

function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function main() {
  const products = await prisma.product.findMany();

  if (products.length === 0) {
    console.log("No products found to add reviews to.");
    return;
  }

  for (const product of products) {
    // Determine how many reviews to add (10, 11, or 12)
    const numReviews = getRandomInt(10, 12);
    
    // Shuffle names and texts to ensure uniqueness per product
    const shuffledNames = shuffle(indianNames);
    const shuffledTexts = shuffle(reviewTexts);

    // Prepare reviews
    const reviewsToCreate = [];
    for (let i = 0; i < numReviews; i++) {
      const ratingOptions = [5, 5, 5, 4, 4, 4, 4, 3, 5, 4];
      const rating = ratingOptions[getRandomInt(0, ratingOptions.length - 1)];

      const daysAgo = getRandomInt(1, 180);
      const createdAt = new Date();
      createdAt.setDate(createdAt.getDate() - daysAgo);

      const name = shuffledNames[i];
      const email = `${name.replace(/\s+/g, '.').toLowerCase()}_${getRandomInt(100, 999)}@example.com`;

      // Find or create user
      let user = await prisma.user.findFirst({ where: { name } });
      if (!user) {
        user = await prisma.user.create({
          data: {
            name,
            email,
            role: "USER"
          }
        });
      }

      reviewsToCreate.push({
        productId: product.id,
        userId: user.id,
        rating: rating,
        comment: shuffledTexts[i],
        createdAt: createdAt
      });
    }

    // First delete existing reviews for this product to avoid duplicates if run multiple times
    await prisma.review.deleteMany({
      where: { productId: product.id }
    });

    // Insert new reviews
    await prisma.review.createMany({
      data: reviewsToCreate
    });

    console.log(`Added ${numReviews} reviews to ${product.name}`);
  }

  console.log("Finished adding reviews to all products.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
