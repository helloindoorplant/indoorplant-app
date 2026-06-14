export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  featured?: boolean;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  content: string;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "10-best-plants-for-bedrooms",
    title: "10 Best Bedroom Plants India — For Sleep, Air Quality and Low Light",
    excerpt: "The 10 best indoor plants for Indian bedrooms — chosen for night oxygen release, low light, and Indian room sizes.",
    category: "Plant Benefits",
    date: "June 10, 2026",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1540932239986-30128078f3c5?auto=format&fit=crop&w=800&q=80",
    featured: true,
    metaTitle: "10 Best Bedroom Plants India — For Sleep, Air Quality and Low Light | IndoorPlant.in",
    metaDescription: "The 10 best indoor plants for Indian bedrooms — chosen for night oxygen release, low light, and Indian room sizes. Written by Dr Anjali Desai, horticulturist.",
    keywords: ["best bedroom plants India", "plants for bedroom India", "plants that release oxygen at night India", "bedroom plants low light India", "sleep improving plants India", "snake plant bedroom India"],
    author: {
      name: "Dr. Anjali Desai",
      role: "Lead Horticulturist",
      avatar: "AD"
    },
    content: `
<p class="lead text-xl text-gray-600 mb-8">
  Snake plants and aloe vera release oxygen continuously at night because they use CAM photosynthesis, unlike most plants that absorb CO2 after dark. In Indian bedrooms with air conditioning, where air recirculates rather than ventilating, this difference matters more than in naturally ventilated rooms.
</p>

<h2 class="text-2xl font-bold text-gray-900 font-playfair mt-12 mb-6">1. The Snake Plant (Sansevieria)</h2>
<p class="mb-6">
  The Snake Plant is unique because it continues to convert CO2 into oxygen during the night. It's incredibly low-maintenance and thrives on neglect, making it perfect for the bedroom. It's an excellent choice for bedrooms of any size.
</p>

<div class="bg-primary/5 border border-primary/20 rounded-xl p-6 my-8">
  <h4 class="font-bold text-primary mb-2 flex items-center">
    🌿 Quick Care Tip
  </h4>
  <p class="text-sm text-gray-700 m-0">
    Water your Snake Plant only when the soil is completely dry. In a bedroom with standard AC, this might mean watering only once every 3-4 weeks!
  </p>
</div>

<h2 class="text-2xl font-bold text-gray-900 font-playfair mt-12 mb-6">2. Aloe Vera</h2>
<p class="mb-6">
  Similar to the Snake Plant, Aloe Vera releases oxygen at night. Plus, the gel inside its leaves can be used for minor burns, dry skin, and insect bites. It needs a bright spot in your room near a window to thrive.
</p>

<h2 class="text-2xl font-bold text-gray-900 font-playfair mt-12 mb-6">3. Areca Palm</h2>
<p class="mb-6">
  Areca Palms are fantastic natural humidifiers. If you run air conditioning in your bedroom during hot Indian summers, it can dry out your nasal passages. An Areca Palm introduces gentle moisture back into the room, reducing throat irritation.
</p>

<h2 class="text-2xl font-bold text-gray-900 font-playfair mt-12 mb-6">4. Peace Lily</h2>
<p class="mb-6">
  Peace Lilies are excellent for removing household toxins. They bloom with beautiful white flowers and signify tranquility, perfect for bedroom aesthetics.
</p>
    `
  },
  {
    slug: "how-to-care-for-monstera",
    title: "How to Care for Monstera Deliciosa in India — Complete Guide",
    excerpt: "Monstera care in Indian conditions: water every 5-7 days in summer, less in winter. Humidity tips for Delhi, light guide for Bangalore flats.",
    category: "Plant Care",
    date: "June 08, 2026",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=800&q=80",
    metaTitle: "How to Care for Monstera Deliciosa in India — Complete Guide | IndoorPlant.in",
    metaDescription: "Monstera care in Indian conditions: water every 5-7 days in summer, less in winter. Humidity tips for Delhi, light guide for Bangalore flats. By Dr Anjali Desai.",
    keywords: ["monstera care India", "how to care for monstera deliciosa India", "monstera watering India", "monstera light requirements India", "swiss cheese plant care India", "monstera yellowing leaves India", "monstera humidity India"],
    author: {
      name: "Dr. Anjali Desai",
      role: "Lead Horticulturist",
      avatar: "AD"
    },
    content: `
<p class="lead text-xl text-gray-600 mb-8">
  Growing Monstera Deliciosa (the Swiss Cheese Plant) in India can be incredibly rewarding. Thanks to their tropical heritage, they absolutely love Indian humidity, but need special care when facing peak summers and dry monsoons.
</p>

<h2 class="text-2xl font-bold text-gray-900 font-playfair mt-12 mb-6">Watering Schedule for Indian Climates</h2>
<p class="mb-6">
  During the hot summer months, water your Monstera every 5-7 days. Always test the soil first — water only when the top 2 inches feel dry. In winter, reduce watering to once every 10-14 days.
</p>

<div class="bg-primary/5 border border-primary/20 rounded-xl p-6 my-8">
  <h4 class="font-bold text-primary mb-2 flex items-center">
    💡 Light Guide
  </h4>
  <p class="text-sm text-gray-700 m-0">
    Place your Monstera in bright, indirect light. Direct Indian afternoon sun will easily scorch and yellow their beautiful fenestrated leaves. If you live in Bangalore, a north or east-facing balcony is perfect.
  </p>
</div>

<h2 class="text-2xl font-bold text-gray-900 font-playfair mt-12 mb-6">Humidity and Temperature Tips</h2>
<p class="mb-6">
  Monsteras love humidity (above 60%). If you live in dry regions like Delhi or Rajasthan, mist your plant's leaves daily or place a humidifier nearby. Wipe the dust off leaves with a damp cloth weekly to help them photosynthesize.
</p>
    `
  },
  {
    slug: "pet-safe-indoor-plants",
    title: "Pet Safe Indoor Plants India — Non-Toxic for Dogs and Cats",
    excerpt: "A vet-reviewed list of indoor plants safe for dogs and cats in India. Spider plants, areca palms, Boston ferns.",
    category: "Guides",
    date: "June 05, 2026",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1545241047-6083a36cb15f?auto=format&fit=crop&w=800&q=80",
    metaTitle: "Pet Safe Indoor Plants India — Non-Toxic for Dogs and Cats | IndoorPlant.in",
    metaDescription: "A vet-reviewed list of indoor plants safe for dogs and cats in India. Spider plants, areca palms, Boston ferns — with toxicity notes and where to buy each online.",
    keywords: ["pet safe plants India", "non toxic plants cats India", "non toxic indoor plants dogs India", "plants safe for pets India", "safe houseplants India", "cat safe plants India", "aspca non toxic plants India"],
    author: {
      name: "Dr. Anjali Desai",
      role: "Lead Horticulturist",
      avatar: "AD"
    },
    content: `
<p class="lead text-xl text-gray-600 mb-8">
  As a plant parent and a pet owner, keeping your furry friends safe is always a priority. Many common indoor plants can cause stomach upset or worse in dogs and cats. Here is a curated, vet-reviewed list of beautiful non-toxic houseplants that are ASPCA-verified.
</p>

<h2 class="text-2xl font-bold text-gray-900 font-playfair mt-12 mb-6">Top Pet-Friendly Plants for Your Home</h2>
<p class="mb-6">
  These plants are completely safe if your curious dog or cat takes a playful nibble:
</p>

<ul class="list-disc pl-6 mb-6 space-y-2 text-gray-700">
  <li><strong>Areca Palm:</strong> A stunning, tall plant that adds a tropical vibe and cleans the air.</li>
  <li><strong>Spider Plant:</strong> Fun, dangling foliage that cats love to play with — completely non-toxic!</li>
  <li><strong>Boston Fern:</strong> Loves high humidity and works beautifully in hanging baskets.</li>
  <li><strong>N'Joy Money Plant (Pothos Alternative):</strong> While pothos is toxic, Peperomia or Spider plants are perfect safe alternatives.</li>
</ul>

<div class="overflow-x-auto my-8">
  <table class="w-full text-left border-collapse border border-gray-200">
    <thead>
      <tr class="bg-gray-50">
        <th class="p-3 border border-gray-200 font-bold">Plant Name</th>
        <th class="p-3 border border-gray-200 font-bold">Cat Safe</th>
        <th class="p-3 border border-gray-200 font-bold">Dog Safe</th>
        <th class="p-3 border border-gray-200 font-bold">Ingestion Action</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="p-3 border border-gray-200">Areca Palm</td>
        <td class="p-3 border border-gray-200 text-green-600">Yes</td>
        <td class="p-3 border border-gray-200 text-green-600">Yes</td>
        <td class="p-3 border border-gray-200 text-gray-500">None required</td>
      </tr>
      <tr>
        <td class="p-3 border border-gray-200">Spider Plant</td>
        <td class="p-3 border border-gray-200 text-green-600">Yes</td>
        <td class="p-3 border border-gray-200 text-green-600">Yes</td>
        <td class="p-3 border border-gray-200 text-gray-500">None required</td>
      </tr>
      <tr>
        <td class="p-3 border border-gray-200">Boston Fern</td>
        <td class="p-3 border border-gray-200 text-green-600">Yes</td>
        <td class="p-3 border border-gray-200 text-green-600">Yes</td>
        <td class="p-3 border border-gray-200 text-gray-500">None required</td>
      </tr>
    </tbody>
  </table>
</div>
    `
  },
  {
    slug: "watering-mistakes",
    title: "Overwatering Indoor Plants — Signs, Fixes and What to Do",
    excerpt: "Overwatering kills more Indian houseplants than anything else. How to tell if you are doing it, and how to fix root rot.",
    category: "Plant Care",
    date: "May 28, 2026",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1592150621744-aca64f48394a?auto=format&fit=crop&w=800&q=80",
    metaTitle: "Overwatering Indoor Plants — Signs, Fixes and What to Do | IndoorPlant.in",
    metaDescription: "Overwatering kills more Indian houseplants than anything else. How to tell if you are doing it, what yellowing leaves actually mean, and how to fix root rot.",
    keywords: ["overwatering indoor plants India", "how often to water indoor plants India", "plant watering mistakes India", "yellow leaves indoor plant India", "root rot indoor plant India", "how to water houseplants India"],
    author: {
      name: "Dr. Anjali Desai",
      role: "Lead Horticulturist",
      avatar: "AD"
    },
    content: `
<p class="lead text-xl text-gray-600 mb-8">
  Overwatering is the single most common cause of houseplant death in India. Many plant parents mistake yellowing leaves as a sign of dry soil, watering their plants even more, which ultimately triggers fatal root rot.
</p>

<h2 class="text-2xl font-bold text-gray-900 font-playfair mt-12 mb-6">Signs You Are Overwatering</h2>
<p class="mb-6">
  Watch out for these symptoms on your plant:
</p>
<ul class="list-disc pl-6 mb-6 space-y-2 text-gray-700">
  <li>Soggy soil that takes more than 10 days to dry out</li>
  <li>Soft, mushy, yellowing leaves starting from the bottom of the plant</li>
  <li>Fungus gnats flying around the damp soil surface</li>
  <li>A musty, sour smell coming from the pot (indicator of root rot)</li>
</ul>

<h2 class="text-2xl font-bold text-gray-900 font-playfair mt-12 mb-6">How to Prevent Root Rot</h2>
<p class="mb-6">
  Make sure your pots have functioning drainage holes. Always press your finger 1-2 inches deep into the soil before watering; if it feels damp, wait a few days and check again.
</p>
    `
  }
];
