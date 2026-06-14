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
  },
  {
    slug: "decorative-plants-for-home-online-india",
    title: "The Ultimate Guide to Buying Decorative Plants for Your Home Online",
    excerpt: "Eight decorative plants you can buy online for Indian homes right now. Real prices, honest care notes, and only plants that actually survive Indian apartments.",
    category: "Home Decor + Plant Buying",
    date: "June 15, 2026",
    readTime: "9 min read",
    image: "https://lightgrey-nightingale-217677.hostingersite.com/wp-content/uploads/2026/06/decorative-plants-for-home-online-india.webp",
    metaTitle: "Decorative Plants for Indian Homes — Buy Online Guide 2026",
    metaDescription: "Eight decorative plants you can buy online for Indian homes right now. Real prices, honest care notes, and only plants that actually survive Indian apartments. From Rs 299.",
    keywords: [
      "decorative plants for home online India",
      "buy decorative plants online India",
      "indoor decorative plants India",
      "best plants for home decor India",
      "decorative indoor plants for Indian homes",
      "indoor plants buy online India"
    ],
    author: {
      name: "Dr. Anjali Desai",
      role: "Lead Horticulturist",
      avatar: "AD"
    },
    content: `
<p class="lead text-xl text-gray-650 mb-8 leading-relaxed font-light">
  Most people buy a plant because it looks beautiful in a photo. Six weeks later it is dropping leaves in a corner, the nursery pot is cracking, and the soil has gone bone dry because nobody told them this particular plant needs watering twice a week in peak Indian summer.
</p>
<p class="mb-6 text-gray-700 leading-relaxed">
  This guide exists to stop that from happening.
</p>
<p class="mb-8 text-gray-700 leading-relaxed">
  Every plant mentioned below is available right now on <a href="/shop" class="text-[#2D6A4F] hover:text-[#1B4332] underline font-bold">indoorplant.in/shop</a>, with the current price verified today. The care notes are honest. The "not ideal for" sections are real. No plant is described as perfect because no plant is perfect for every home.
</p>

<h2 class="text-2xl md:text-3xl font-extrabold text-[#1B4332] font-playfair mt-12 mb-6 border-b border-gray-150 pb-2 flex items-center gap-2">
  <span>💡</span> Before You Buy — The 4 Questions That Actually Matter
</h2>

<div class="grid grid-cols-1 gap-6 my-8">
  <!-- Question 1 -->
  <div class="bg-emerald-50/20 border border-emerald-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
    <h3 class="text-xl font-bold text-gray-900 mt-0 mb-3 flex items-center gap-2">
      <span class="flex items-center justify-center w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 text-sm font-bold">1</span>
      Which room, and exactly where in it?
    </h3>
    <p class="text-gray-700 leading-relaxed mb-4">
      The biggest mistake people make is buying a plant for a room rather than a specific spot. A Monstera Broken Heart near a bright south-facing window and a Monstera Broken Heart in a dim north-facing corner are two completely different plants in practice. One looks like the photos. One does not.
    </p>
    <p class="text-gray-700 leading-relaxed font-semibold text-emerald-800 mb-0">
      Before ordering anything, go stand in the spot you have in mind. Note whether direct sunlight hits that spot at any point during the day, or whether it only gets ambient room light. That answer determines everything.
    </p>
  </div>

  <!-- Question 2 -->
  <div class="bg-emerald-50/20 border border-emerald-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
    <h3 class="text-xl font-bold text-gray-900 mt-0 mb-3 flex items-center gap-2">
      <span class="flex items-center justify-center w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 text-sm font-bold">2</span>
      How much light does that spot actually get?
    </h3>
    <div class="space-y-3 text-gray-700">
      <p class="leading-relaxed">
        <strong class="text-[#2D6A4F]">Low light:</strong> No direct sun ever reaches the spot. North-facing rooms in Indian apartments are typically low light. So are spots more than 3 metres from any window. Low-light plants survive here but rarely look their best. The right low-light plants — both aglaonemas in this guide — actually look good here.
      </p>
      <p class="leading-relaxed">
        <strong class="text-[#2D6A4F]">Bright indirect light:</strong> The spot is near a window but the plant itself is not sitting in a sunbeam. This is what most plants need and what most Indian living rooms near east or south-facing windows can offer.
      </p>
      <p class="leading-relaxed">
        <strong class="text-[#2D6A4F]">Direct light:</strong> The sun actually falls on the plant for some hours. This is what the Lucky Jade Plant needs to look its best. Most Indian balconies provide this.
      </p>
    </div>

    <!-- City Specific Note -->
    <div class="mt-4 bg-amber-50/30 border border-amber-100 rounded-xl p-4 text-xs text-gray-700 leading-relaxed">
      <strong class="text-amber-800 font-bold">🏙️ Indian City Context:</strong> Air pollution in Delhi, Mumbai, and parts of Bangalore reduces indoor light noticeably compared to the same spot in a cleaner-air city. Plants described as "bright indirect light" may need to be placed closer to windows than you expect.
    </div>
  </div>

  <!-- Question 3 -->
  <div class="bg-emerald-50/20 border border-emerald-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
    <h3 class="text-xl font-bold text-gray-900 mt-0 mb-3 flex items-center gap-2">
      <span class="flex items-center justify-center w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 text-sm font-bold">3</span>
      How often will you actually water it?
    </h3>
    <p class="text-gray-700 leading-relaxed mb-4">
      This is the question to answer honestly, not optimistically.
    </p>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-gray-700">
      <div class="bg-white border border-gray-150 rounded-xl p-4 shadow-xs">
        <strong class="block text-[#2D6A4F] mb-1 font-bold">Once a Week</strong>
        Golden money plants, variegated money plants, aglaonemas, and monstera.
      </div>
      <div class="bg-white border border-gray-150 rounded-xl p-4 shadow-xs">
        <strong class="block text-[#2D6A4F] mb-1 font-bold">Every 2-3 Weeks</strong>
        Lucky Jade Plant is succulent-built. Stores water and survives forgetful weeks.
      </div>
      <div class="bg-white border border-gray-150 rounded-xl p-4 shadow-xs">
        <strong class="block text-[#2D6A4F] mb-1 font-bold">Irregular/Flexible</strong>
        Bamboo palm and golden money plant tolerate some irregularity well.
      </div>
    </div>
  </div>

  <!-- Question 4 -->
  <div class="bg-emerald-50/20 border border-emerald-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
    <h3 class="text-xl font-bold text-gray-900 mt-0 mb-3 flex items-center gap-2">
      <span class="flex items-center justify-center w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 text-sm font-bold">4</span>
      Do you have pets or small children at home?
    </h3>
    <p class="text-gray-700 leading-relaxed mb-4">
      Several of the most popular decorative plants are toxic if chewed or ingested. This includes money plants and monstera. If you have cats, dogs, or young children who put things in their mouths, check the pet safety column in the comparison table below before buying.
    </p>
    <p class="text-gray-700 leading-relaxed font-semibold text-emerald-800 mb-0">
      The two aglaonemas in this guide (Red Lipstick and Snow White) are pet safe. The Lucky Jade Plant and Bamboo Palm are also pet safe. These four are your options if this is a concern.
    </p>
  </div>
</div>

<h2 class="text-2xl md:text-3xl font-extrabold text-[#1B4332] font-playfair mt-12 mb-6 border-b border-gray-150 pb-2">
  🌿 The 8 Decorative Plants Available Now at IndoorPlant.in
</h2>
<p class="mb-8 text-gray-750 leading-relaxed">
  These are all the plants currently in stock, with live prices verified as of June 2026 and honest notes on each one.
</p>

<div class="space-y-8 my-8">
  <!-- Plant 1: N'Joy Money Plant -->
  <div class="bg-white border border-gray-150 rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-md transition-all duration-200">
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4 pb-4 border-b border-gray-100">
      <div>
        <span class="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-50 border border-amber-100 px-2.5 py-1 rounded-full">Best Value Option</span>
        <h3 class="text-2xl font-bold text-gray-900 mt-2 mb-0 font-playfair">N'Joy Money Plant</h3>
      </div>
      <div class="flex items-baseline gap-2">
        <span class="text-2xl font-extrabold text-emerald-700">Rs 299</span>
        <span class="text-sm text-gray-400 line-through">Rs 878</span>
      </div>
    </div>
    
    <div class="flex flex-wrap items-center gap-x-4 gap-y-2 mb-6 text-xs text-gray-600">
      <div class="flex items-center gap-1">
        <span class="text-amber-500 font-bold">★ 4.4</span>
        <span class="text-gray-400">(21 reviews)</span>
      </div>
      <span class="text-gray-300">•</span>
      <div class="inline-flex items-center text-red-650 bg-red-50/50 px-2.5 py-0.5 rounded text-xs font-semibold">
        ✗ NOT PET SAFE
      </div>
      <span class="text-gray-300">•</span>
      <a href="/product/njoy-money-plant" class="text-[#2D6A4F] hover:underline font-bold">View Product Details →</a>
    </div>

    <p class="text-gray-700 leading-relaxed mb-6">
      This is the variegated version of the classic money plant. The leaves are compact and crisply divided between pure white and deep green in a pattern that looks nothing like a typical money plant. It is one of the more interesting-looking plants on the site at the lowest price point. Water once a week. Bright indirect light gives the best variegation — in low light the white patches will gradually reduce and you end up with a more ordinary-looking plant.
    </p>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
      <div class="bg-emerald-50/20 border border-emerald-100/50 rounded-xl p-4">
        <h4 class="text-sm font-bold text-emerald-800 mt-0 mb-1 flex items-center gap-1.5">
          ✅ Good For
        </h4>
        <p class="text-xs text-gray-600 m-0 leading-relaxed">
          Desk corners, shelves, small tables. Works especially well against a white or pale wall because the white in the leaves picks up and reflects the background.
        </p>
      </div>
      <div class="bg-amber-50/20 border border-amber-100/50 rounded-xl p-4">
        <h4 class="text-sm font-bold text-amber-800 mt-0 mb-1 flex items-center gap-1.5">
          ⚠️ Not Ideal For
        </h4>
        <p class="text-xs text-gray-600 m-0 leading-relaxed">
          Very dim rooms. The white variegation is the point of this plant. If the room cannot give it reasonable light, it will not look like the photos within a few months.
        </p>
      </div>
    </div>

    <div class="bg-gray-50 border border-gray-150 rounded-xl p-4 text-xs text-gray-750">
      <span class="font-bold text-gray-900 block mb-1">📝 Horticulturist's Note:</span>
      At Rs 299 this is the best-value option on the site right now. If you are unsure what to start with and your room gets decent indirect light, start here.
    </div>
  </div>

  <!-- Plant 2: Golden Money Plant -->
  <div class="bg-white border border-gray-150 rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-md transition-all duration-200">
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4 pb-4 border-b border-gray-100">
      <div>
        <span class="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-full">Most Popular Vastu</span>
        <h3 class="text-2xl font-bold text-gray-900 mt-2 mb-0 font-playfair">Golden Money Plant</h3>
      </div>
      <div class="flex items-baseline gap-2">
        <span class="text-2xl font-extrabold text-emerald-700">Rs 309</span>
        <span class="text-sm text-gray-400 line-through">Rs 680</span>
      </div>
    </div>
    
    <div class="flex flex-wrap items-center gap-x-4 gap-y-2 mb-6 text-xs text-gray-600">
      <div class="flex items-center gap-1">
        <span class="text-amber-500 font-bold">★ 4.4</span>
        <span class="text-gray-400">(25 reviews)</span>
      </div>
      <span class="text-gray-300">•</span>
      <div class="inline-flex items-center text-red-650 bg-red-50/50 px-2.5 py-0.5 rounded text-xs font-semibold">
        ✗ NOT PET SAFE
      </div>
      <span class="text-gray-300">•</span>
      <a href="/product/golden-money-plant" class="text-[#2D6A4F] hover:underline font-bold">View Product Details →</a>
    </div>

    <p class="text-gray-700 leading-relaxed mb-6">
      India's most-grown indoor plant for a reason. Heart-shaped golden-green leaves, grows in almost any light from low to bright indirect, and handles an irregular watering schedule better than most. Water every 7-10 days. Common Vastu plant in Indian homes, often placed near entrances or in living rooms.
    </p>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
      <div class="bg-emerald-50/20 border border-emerald-100/50 rounded-xl p-4">
        <h4 class="text-sm font-bold text-emerald-800 mt-0 mb-1 flex items-center gap-1.5">
          ✅ Good For
        </h4>
        <p class="text-xs text-gray-600 m-0 leading-relaxed">
          Any room with any light level. This is the plant you buy when you are not completely confident about your light conditions. It adjusts.
        </p>
      </div>
      <div class="bg-amber-50/20 border border-amber-100/50 rounded-xl p-4">
        <h4 class="text-sm font-bold text-amber-800 mt-0 mb-1 flex items-center gap-1.5">
          ⚠️ Not Ideal For
        </h4>
        <p class="text-xs text-gray-600 m-0 leading-relaxed">
          Homes with cats or dogs. Mildly toxic if eaten.
        </p>
      </div>
    </div>

    <div class="bg-gray-50 border border-gray-150 rounded-xl p-4 text-xs text-gray-750">
      <span class="font-bold text-gray-900 block mb-1">📝 Horticulturist's Note:</span>
      This plant looks underwhelming when it is small. Give it 4-6 months and it becomes the plant in the room that people comment on.
    </div>
  </div>

  <!-- Plant 3: Money Plant Variegated -->
  <div class="bg-white border border-gray-150 rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-md transition-all duration-200">
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4 pb-4 border-b border-gray-100">
      <div>
        <span class="text-[10px] font-bold uppercase tracking-wider text-[#2D6A4F] bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-full">Highly Versatile</span>
        <h3 class="text-2xl font-bold text-gray-900 mt-2 mb-0 font-playfair">Money Plant Variegated</h3>
      </div>
      <div class="flex items-baseline gap-2">
        <span class="text-2xl font-extrabold text-emerald-700">Rs 299</span>
        <span class="text-sm text-gray-400 line-through">Rs 657</span>
      </div>
    </div>
    
    <div class="flex flex-wrap items-center gap-x-4 gap-y-2 mb-6 text-xs text-gray-600">
      <div class="flex items-center gap-1">
        <span class="text-amber-500 font-bold">★ 4.4</span>
        <span class="text-gray-400">(20 reviews)</span>
      </div>
      <span class="text-gray-300">•</span>
      <div class="inline-flex items-center text-red-650 bg-red-50/50 px-2.5 py-0.5 rounded text-xs font-semibold">
        ✗ NOT PET SAFE
      </div>
      <span class="text-gray-300">•</span>
      <a href="/product/money-plant-variegated" class="text-[#2D6A4F] hover:underline font-bold">View Product Details →</a>
    </div>

    <p class="text-gray-700 leading-relaxed mb-6">
      Heart-shaped leaves in creamy white, pale yellow, and green. More visually layered than the standard golden money plant. Grows in water or soil, which makes it unusually versatile — keep it in a glass vase on a kitchen counter and it actually looks intentional. Water once a week. Tolerates low to medium light.
    </p>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
      <div class="bg-emerald-50/20 border border-emerald-100/50 rounded-xl p-4">
        <h4 class="text-sm font-bold text-emerald-800 mt-0 mb-1 flex items-center gap-1.5">
          ✅ Good For
        </h4>
        <p class="text-xs text-gray-600 m-0 leading-relaxed">
          Kitchens, bathrooms, shelves where you want something that looks styled rather than just placed. Can trail over a shelf edge attractively once it gets going.
        </p>
      </div>
      <div class="bg-amber-50/20 border border-amber-100/50 rounded-xl p-4">
        <h4 class="text-sm font-bold text-amber-800 mt-0 mb-1 flex items-center gap-1.5">
          ⚠️ Not Ideal For
        </h4>
        <p class="text-xs text-gray-600 m-0 leading-relaxed">
          Homes with cats or dogs. Mildly toxic if eaten.
        </p>
      </div>
    </div>

    <div class="bg-gray-50 border border-gray-150 rounded-xl p-4 text-xs text-gray-750">
      <span class="font-bold text-gray-900 block mb-1">📝 Horticulturist's Note:</span>
      Grows more slowly than the golden variety. More of a showpiece than a fast-filler.
    </div>
  </div>

  <!-- Plant 4: Aglaonema Red Lipstick -->
  <div class="bg-white border border-gray-150 rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-md transition-all duration-200">
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4 pb-4 border-b border-gray-100">
      <div>
        <span class="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-full">Pet Safe & Colorful</span>
        <h3 class="text-2xl font-bold text-gray-900 mt-2 mb-0 font-playfair">Aglaonema Red Lipstick</h3>
      </div>
      <div class="flex items-baseline gap-2">
        <span class="text-2xl font-extrabold text-emerald-700">Rs 399</span>
        <span class="text-sm text-gray-400 line-through">Rs 878</span>
      </div>
    </div>
    
    <div class="flex flex-wrap items-center gap-x-4 gap-y-2 mb-6 text-xs text-gray-600">
      <div class="flex items-center gap-1">
        <span class="text-amber-500 font-bold">★ 4.4</span>
        <span class="text-gray-400">(23 reviews)</span>
      </div>
      <span class="text-gray-300">•</span>
      <div class="inline-flex items-center text-green-700 bg-green-50 px-2.5 py-0.5 rounded text-xs font-semibold border border-green-200">
        ✓ PET SAFE
      </div>
      <span class="text-gray-300">•</span>
      <a href="/product/aglaonema-red-lipstick-plant" class="text-[#2D6A4F] hover:underline font-bold">View Product Details →</a>
    </div>

    <p class="text-gray-700 leading-relaxed mb-6">
      Dark green leaves edged in bold cherry-red. One of the only genuinely colourful plants that tolerates low light — most plants with coloured foliage need strong indirect light to keep their colour and will fade in a dim corner. This one does not. Water once a week. Low to medium indirect light.
    </p>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
      <div class="bg-emerald-50/20 border border-emerald-100/50 rounded-xl p-4">
        <h4 class="text-sm font-bold text-emerald-800 mt-0 mb-1 flex items-center gap-1.5">
          ✅ Good For
        </h4>
        <p class="text-xs text-gray-600 m-0 leading-relaxed">
          North-facing rooms, dim hallways, corners far from windows, offices. If you have tried other colourful plants and watched them fade, this is the one that will not.
        </p>
      </div>
      <div class="bg-amber-50/20 border border-amber-100/50 rounded-xl p-4">
        <h4 class="text-sm font-bold text-amber-800 mt-0 mb-1 flex items-center gap-1.5">
          ⚠️ Not Ideal For
        </h4>
        <p class="text-xs text-gray-600 m-0 leading-relaxed">
          Rapid growth. It is a slow grower and won't change the size of the room quickly.
        </p>
      </div>
    </div>

    <div class="bg-gray-50 border border-gray-150 rounded-xl p-4 text-xs text-gray-750">
      <span class="font-bold text-gray-900 block mb-1">📝 Horticulturist's Note:</span>
      Slow grower. It will not dramatically change the room in the first few months. But it stays looking good for years without becoming difficult to manage, which is something few colourful plants can claim.
    </div>
  </div>

  <!-- Plant 5: Aglaonema Snow White -->
  <div class="bg-white border border-gray-150 rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-md transition-all duration-200">
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4 pb-4 border-b border-gray-100">
      <div>
        <span class="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-full">Pet Safe & Elegant</span>
        <h3 class="text-2xl font-bold text-gray-900 mt-2 mb-0 font-playfair">Aglaonema Snow White</h3>
      </div>
      <div class="flex items-baseline gap-2">
        <span class="text-2xl font-extrabold text-emerald-700">Rs 349</span>
        <span class="text-sm text-gray-400 line-through">Rs 768</span>
      </div>
    </div>
    
    <div class="flex flex-wrap items-center gap-x-4 gap-y-2 mb-6 text-xs text-gray-600">
      <div class="flex items-center gap-1">
        <span class="text-amber-500 font-bold">★ 4.3</span>
        <span class="text-gray-400">(29 reviews)</span>
      </div>
      <span class="text-gray-300">•</span>
      <div class="inline-flex items-center text-green-700 bg-green-50 px-2.5 py-0.5 rounded text-xs font-semibold border border-green-200">
        ✓ PET SAFE
      </div>
      <span class="text-gray-300">•</span>
      <a href="/product/aglaonema-snow-white-plant" class="text-[#2D6A4F] hover:underline font-bold">View Product Details →</a>
    </div>

    <p class="text-gray-700 leading-relaxed mb-6">
      Broad leaves in cream and pale green. Where the Red Lipstick is bold and graphic, the Snow White is quieter — better in minimalist or monochrome interiors where you want contrast without colour. Water once a week. Low to medium indirect light.
    </p>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
      <div class="bg-emerald-50/20 border border-emerald-100/50 rounded-xl p-4">
        <h4 class="text-sm font-bold text-emerald-800 mt-0 mb-1 flex items-center gap-1.5">
          ✅ Good For
        </h4>
        <p class="text-xs text-gray-655 m-0 leading-relaxed">
          Bedrooms, home offices, modern flat interiors. Works particularly well on a white desk or pale shelf where the cream in the leaves ties the look together.
        </p>
      </div>
      <div class="bg-amber-50/20 border border-amber-100/50 rounded-xl p-4">
        <h4 class="text-sm font-bold text-amber-800 mt-0 mb-1 flex items-center gap-1.5">
          ⚠️ Not Ideal For
        </h4>
        <p class="text-xs text-gray-655 m-0 leading-relaxed">
          Zero-light spots. It needs stable light to recover if it experiences shipping stress.
        </p>
      </div>
    </div>

    <div class="bg-gray-50 border border-gray-150 rounded-xl p-4 text-xs text-gray-750">
      <span class="font-bold text-gray-900 block mb-1">📝 Horticulturist's Note:</span>
      One reviewer received leaves that were yellowing on arrival and was told to move the plant near a window — it recovered. This is worth knowing. Aglaonemas can yellow from transit stress and usually recover with stable light in a week.
    </div>
  </div>

  <!-- Plant 6: Monstera Broken Heart -->
  <div class="bg-white border border-gray-150 rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-md transition-all duration-200">
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4 pb-4 border-b border-gray-100">
      <div>
        <span class="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-full">Statement Climber</span>
        <h3 class="text-2xl font-bold text-gray-900 mt-2 mb-0 font-playfair">Monstera Broken Heart</h3>
      </div>
      <div class="flex items-baseline gap-2">
        <span class="text-2xl font-extrabold text-emerald-700">Rs 349</span>
        <span class="text-sm text-gray-400 line-through">Rs 768</span>
      </div>
    </div>
    
    <div class="flex flex-wrap items-center gap-x-4 gap-y-2 mb-6 text-xs text-gray-600">
      <div class="flex items-center gap-1">
        <span class="text-amber-500 font-bold">★ 4.5</span>
        <span class="text-gray-400">(22 reviews)</span>
      </div>
      <span class="text-gray-300">•</span>
      <div class="inline-flex items-center text-red-650 bg-red-50/50 px-2.5 py-0.5 rounded text-xs font-semibold">
        ✗ NOT PET SAFE
      </div>
      <span class="text-gray-300">•</span>
      <a href="/product/monstera-broken-heart" class="text-[#2D6A4F] hover:underline font-bold">View Product Details →</a>
    </div>

    <p class="text-gray-700 leading-relaxed mb-6">
      Compact climbing plant with split, fenestrated leaves. This is the smaller relative of Monstera deliciosa — the same aesthetic at a fraction of the space requirement. Grows fast in Indian conditions, especially during monsoon when the humidity suits it well. Water every 5-7 days. Bright indirect light.
    </p>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
      <div class="bg-emerald-50/20 border border-emerald-100/50 rounded-xl p-4">
        <h4 class="text-sm font-bold text-emerald-800 mt-0 mb-1 flex items-center gap-1.5">
          ✅ Good For
        </h4>
        <p class="text-xs text-gray-655 m-0 leading-relaxed">
          Near balcony doors, bright living room corners, anywhere with good natural light and some vertical space for it to climb.
        </p>
      </div>
      <div class="bg-amber-50/20 border border-amber-100/50 rounded-xl p-4">
        <h4 class="text-sm font-bold text-amber-800 mt-0 mb-1 flex items-center gap-1.5">
          ⚠️ Not Ideal For
        </h4>
        <p class="text-xs text-gray-655 m-0 leading-relaxed">
          Dim rooms. The fenestrations (splits) that make this plant worth having only develop in reasonable light. In low light it produces plain un-split leaves.
        </p>
      </div>
    </div>

    <div class="bg-gray-50 border border-gray-150 rounded-xl p-4 text-xs text-gray-750">
      <span class="font-bold text-gray-900 block mb-1">📝 Horticulturist's Note:</span>
      Grows faster than most people expect. In Indian monsoon humidity with good light it will be asking for a moss pole or a trellis within 6-8 months. Factor that into whether the spot works long-term.
    </div>
  </div>

  <!-- Plant 7: Lucky Jade Plant -->
  <div class="bg-white border border-gray-150 rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-md transition-all duration-200">
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4 pb-4 border-b border-gray-100">
      <div>
        <span class="text-[10px] font-bold uppercase tracking-wider text-[#2D6A4F] bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-full">Top Rated & Hardy</span>
        <h3 class="text-2xl font-bold text-gray-900 mt-2 mb-0 font-playfair">Lucky Jade Plant</h3>
      </div>
      <div class="flex items-baseline gap-2">
        <span class="text-2xl font-extrabold text-emerald-700">Rs 299</span>
        <span class="text-sm text-gray-400 line-through">Rs 649</span>
      </div>
    </div>
    
    <div class="flex flex-wrap items-center gap-x-4 gap-y-2 mb-6 text-xs text-gray-605">
      <div class="flex items-center gap-1">
        <span class="text-amber-500 font-bold">★ 4.5</span>
        <span class="text-gray-400">(62 reviews)</span>
      </div>
      <span class="text-gray-300">•</span>
      <div class="inline-flex items-center text-green-700 bg-green-50 px-2.5 py-0.5 rounded text-xs font-semibold border border-green-200">
        ✓ PET SAFE
      </div>
      <span class="text-gray-300">•</span>
      <a href="/product/lucky-jade-plant" class="text-[#2D6A4F] hover:underline font-bold">View Product Details →</a>
    </div>

    <p class="text-gray-700 leading-relaxed mb-6">
      A succulent that stores water in its thick trunk and fleshy leaves. The correct watering schedule is once every 2-3 weeks. This is not a plant that needs attention. It needs light. Common Vastu and good-luck plant in Indian homes. Grows slowly into a tree shape over several years.
    </p>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
      <div class="bg-emerald-50/20 border border-emerald-100/50 rounded-xl p-4">
        <h4 class="text-sm font-bold text-emerald-800 mt-0 mb-1 flex items-center gap-1.5">
          ✅ Good For
        </h4>
        <p class="text-xs text-gray-655 m-0 leading-relaxed">
          Sunny south or west-facing windowsills, covered balconies with direct light, anywhere that gets 3-4 hours of sun. Also the right choice for anyone who has killed every plant they have ever owned.
        </p>
      </div>
      <div class="bg-amber-50/20 border border-amber-100/50 rounded-xl p-4">
        <h4 class="text-sm font-bold text-amber-800 mt-0 mb-1 flex items-center gap-1.5">
          ⚠️ Not Ideal For
        </h4>
        <p class="text-xs text-gray-655 m-0 leading-relaxed">
          Dim rooms or corners with no direct light. More than any plant on this list, the jade plant needs light to look good. Give it a dim corner and it will stretch.
        </p>
      </div>
    </div>

    <div class="bg-gray-50 border border-gray-150 rounded-xl p-4 text-xs text-gray-750">
      <span class="font-bold text-gray-900 block mb-1">📝 Horticulturist's Note:</span>
      This is the most forgiving plant on the list for people who forget to water. It is also the least forgiving for people who put it in the wrong light.
    </div>
  </div>

  <!-- Plant 8: Bamboo Palm -->
  <div class="bg-white border border-gray-150 rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-md transition-all duration-200">
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4 pb-4 border-b border-gray-100">
      <div>
        <span class="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-full">NASA Clean Air Study</span>
        <h3 class="text-2xl font-bold text-gray-900 mt-2 mb-0 font-playfair">Bamboo Palm</h3>
      </div>
      <div class="flex items-baseline gap-2">
        <span class="text-2xl font-extrabold text-emerald-700">Rs 389</span>
        <span class="text-sm text-gray-400 line-through">Rs 449</span>
      </div>
    </div>
    
    <div class="flex flex-wrap items-center gap-x-4 gap-y-2 mb-6 text-xs text-gray-600">
      <div class="flex items-center gap-1">
        <span class="text-amber-500 font-bold">★ 4.3</span>
        <span class="text-gray-400">(20 reviews)</span>
      </div>
      <span class="text-gray-300">•</span>
      <div class="inline-flex items-center text-green-700 bg-green-50 px-2.5 py-0.5 rounded text-xs font-semibold border border-green-200">
        ✓ PET SAFE
      </div>
      <span class="text-gray-300">•</span>
      <a href="/product/bamboo-palm-plant" class="text-[#2D6A4F] hover:underline font-bold">View Product Details →</a>
    </div>

    <p class="text-gray-700 leading-relaxed mb-6">
      Grows to 4-5 feet. This is the only plant on this list that fills real floor space. It has tropical fronds that spread outward and add presence to a large corner or entryway in a way that nothing smaller can. Handles low to bright indirect light. Water every 7-10 days. Air purifying — identified in the NASA Clean Air Study.
    </p>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
      <div class="bg-emerald-50/20 border border-emerald-100/50 rounded-xl p-4">
        <h4 class="text-sm font-bold text-emerald-800 mt-0 mb-1 flex items-center gap-1.5">
          ✅ Good For
        </h4>
        <p class="text-xs text-gray-655 m-0 leading-relaxed">
          Large living room corners, near balcony doors, entryways with decent height. If you have a corner that feels empty and nothing smaller seems to fix it, this plant will.
        </p>
      </div>
      <div class="bg-amber-50/20 border border-amber-100/50 rounded-xl p-4">
        <h4 class="text-sm font-bold text-amber-800 mt-0 mb-1 flex items-center gap-1.5">
          ⚠️ Not Ideal For
        </h4>
        <p class="text-xs text-gray-655 m-0 leading-relaxed">
          Small rooms under 150 square feet. The spread of the fronds takes real space. In a cramped room it will make the space feel cluttered, not designed.
        </p>
      </div>
    </div>

    <div class="bg-gray-50 border border-gray-150 rounded-xl p-4 text-xs text-gray-750">
      <span class="font-bold text-gray-900 block mb-1">📝 Horticulturist's Note:</span>
      The nursery pot this arrives in is functional, not attractive. The plant is worth it, but add Rs 400-600 to your budget for a proper terracotta or ceramic floor planter. The combination is what looks good.
    </div>
  </div>
</div>

<h2 class="text-2xl md:text-3xl font-extrabold text-[#1B4332] font-playfair mt-12 mb-6 border-b border-gray-150 pb-2">
  📊 Comparison — All 8 Plants at a Glance
</h2>

<div class="overflow-x-auto my-8 border border-gray-200 rounded-2xl shadow-sm">
  <table class="w-full text-left border-collapse text-sm text-stone-600 m-0">
    <thead>
      <tr class="bg-emerald-50/40 border-b border-gray-200 text-[#1B4332] font-bold">
        <th class="p-4">Plant</th>
        <th class="p-4">Price</th>
        <th class="p-4">Light Needed</th>
        <th class="p-4">Water</th>
        <th class="p-4">Pet Safe</th>
        <th class="p-4">Best For</th>
      </tr>
    </thead>
    <tbody class="divide-y divide-gray-100 bg-white font-medium">
      <tr class="hover:bg-gray-50/50 transition-colors">
        <td class="p-4 font-bold text-stone-900"><a href="/product/njoy-money-plant" class="hover:underline text-emerald-800">N'Joy Money Plant</a></td>
        <td class="p-4 text-emerald-700 font-extrabold">Rs 299</td>
        <td class="p-4"><span class="inline-block px-2 py-0.5 text-xs rounded bg-emerald-50 text-emerald-800 border border-emerald-100">Bright indirect</span></td>
        <td class="p-4">Once a week</td>
        <td class="p-4"><span class="inline-block px-2 py-0.5 text-xs rounded bg-red-50 text-red-700 border border-red-150">No</span></td>
        <td class="p-4 text-xs font-normal">Desk, shelf, pale walls</td>
      </tr>
      <tr class="hover:bg-gray-50/50 transition-colors">
        <td class="p-4 font-bold text-stone-900"><a href="/product/golden-money-plant" class="hover:underline text-emerald-800">Golden Money Plant</a></td>
        <td class="p-4 text-emerald-700 font-extrabold">Rs 309</td>
        <td class="p-4"><span class="inline-block px-2 py-0.5 text-xs rounded bg-blue-50 text-blue-800 border border-blue-100">Low to bright</span></td>
        <td class="p-4">Every 7-10d</td>
        <td class="p-4"><span class="inline-block px-2 py-0.5 text-xs rounded bg-red-50 text-red-700 border border-red-150">No</span></td>
        <td class="p-4 text-xs font-normal">Any room, any light</td>
      </tr>
      <tr class="hover:bg-gray-50/50 transition-colors">
        <td class="p-4 font-bold text-stone-900"><a href="/product/money-plant-variegated" class="hover:underline text-emerald-800">Money Plant Variegated</a></td>
        <td class="p-4 text-emerald-700 font-extrabold">Rs 299</td>
        <td class="p-4"><span class="inline-block px-2 py-0.5 text-xs rounded bg-blue-50 text-blue-800 border border-blue-100">Low to medium</span></td>
        <td class="p-4">Once a week</td>
        <td class="p-4"><span class="inline-block px-2 py-0.5 text-xs rounded bg-red-50 text-red-700 border border-red-150">No</span></td>
        <td class="p-4 text-xs font-normal">Kitchen, bathroom, trailing shelf</td>
      </tr>
      <tr class="hover:bg-gray-50/50 transition-colors">
        <td class="p-4 font-bold text-stone-900"><a href="/product/aglaonema-red-lipstick-plant" class="hover:underline text-emerald-800">Aglaonema Red Lipstick</a></td>
        <td class="p-4 text-emerald-700 font-extrabold">Rs 399</td>
        <td class="p-4"><span class="inline-block px-2 py-0.5 text-xs rounded bg-blue-50 text-blue-800 border border-blue-100">Low to medium</span></td>
        <td class="p-4">Once a week</td>
        <td class="p-4"><span class="inline-block px-2 py-0.5 text-xs rounded bg-green-50 text-green-700 border border-green-200">Yes</span></td>
        <td class="p-4 text-xs font-normal">Dim corners, north-facing rooms</td>
      </tr>
      <tr class="hover:bg-gray-50/50 transition-colors">
        <td class="p-4 font-bold text-stone-900"><a href="/product/aglaonema-snow-white-plant" class="hover:underline text-emerald-800">Aglaonema Snow White</a></td>
        <td class="p-4 text-emerald-700 font-extrabold">Rs 349</td>
        <td class="p-4"><span class="inline-block px-2 py-0.5 text-xs rounded bg-blue-50 text-blue-800 border border-blue-100">Low to medium</span></td>
        <td class="p-4">Once a week</td>
        <td class="p-4"><span class="inline-block px-2 py-0.5 text-xs rounded bg-green-50 text-green-700 border border-green-200">Yes</span></td>
        <td class="p-4 text-xs font-normal">Bedroom, home office, minimal decor</td>
      </tr>
      <tr class="hover:bg-gray-50/50 transition-colors">
        <td class="p-4 font-bold text-stone-900"><a href="/product/monstera-broken-heart" class="hover:underline text-emerald-800">Monstera Broken Heart</a></td>
        <td class="p-4 text-emerald-700 font-extrabold">Rs 349</td>
        <td class="p-4"><span class="inline-block px-2 py-0.5 text-xs rounded bg-emerald-50 text-emerald-800 border border-emerald-100">Bright indirect</span></td>
        <td class="p-4">Every 5-7d</td>
        <td class="p-4"><span class="inline-block px-2 py-0.5 text-xs rounded bg-red-50 text-red-700 border border-red-150">No</span></td>
        <td class="p-4 text-xs font-normal">Bright corners, balcony doors</td>
      </tr>
      <tr class="hover:bg-gray-50/50 transition-colors">
        <td class="p-4 font-bold text-stone-900"><a href="/product/lucky-jade-plant" class="hover:underline text-emerald-800">Lucky Jade Plant</a></td>
        <td class="p-4 text-emerald-700 font-extrabold">Rs 299</td>
        <td class="p-4"><span class="inline-block px-2 py-0.5 text-xs rounded bg-amber-50 text-amber-800 border border-amber-100">Direct or bright</span></td>
        <td class="p-4">Every 2-3w</td>
        <td class="p-4"><span class="inline-block px-2 py-0.5 text-xs rounded bg-green-50 text-green-700 border border-green-200">Yes</span></td>
        <td class="p-4 text-xs font-normal">Sunny windowsill, balcony, travel homes</td>
      </tr>
      <tr class="hover:bg-gray-50/50 transition-colors">
        <td class="p-4 font-bold text-stone-900"><a href="/product/bamboo-palm-plant" class="hover:underline text-emerald-800">Bamboo Palm</a></td>
        <td class="p-4 text-emerald-700 font-extrabold">Rs 389</td>
        <td class="p-4"><span class="inline-block px-2 py-0.5 text-xs rounded bg-blue-50 text-blue-800 border border-blue-100">Low to bright</span></td>
        <td class="p-4">Every 7-10d</td>
        <td class="p-4"><span class="inline-block px-2 py-0.5 text-xs rounded bg-green-50 text-green-700 border border-green-200">Yes</span></td>
        <td class="p-4 text-xs font-normal">Large floor corner, entryway</td>
      </tr>
    </tbody>
  </table>
</div>

<h2 class="text-2xl md:text-3xl font-extrabold text-[#1B4332] font-playfair mt-12 mb-6 border-b border-gray-150 pb-2">
  ⚠️ What Goes Wrong When You Buy Plants Online — And Why
</h2>

<div class="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
  <div class="border border-gray-150 rounded-2xl p-6 bg-white shadow-xs">
    <h3 class="text-lg font-bold text-gray-900 mt-0 mb-2">Wrong Spot Chosen</h3>
    <p class="text-xs text-gray-650 leading-relaxed m-0">
      This is the reason behind most failed plant purchases. The plant arrives healthy. You put it somewhere that looks good to you. Three weeks later it declines. You assume it was a bad plant.
    </p>
  </div>
  <div class="border border-gray-150 rounded-2xl p-6 bg-white shadow-xs">
    <h3 class="text-lg font-bold text-gray-900 mt-0 mb-2">Crude Nursery Pots</h3>
    <p class="text-xs text-gray-650 leading-relaxed m-0">
      Almost every plant arrives in a plain plastic nursery pot. It is functional, not decorative. Budget for a terracotta or ceramic planter to make it look like a deliberate design choice.
    </p>
  </div>
  <div class="border border-gray-150 rounded-2xl p-6 bg-white shadow-xs">
    <h3 class="text-lg font-bold text-gray-900 mt-0 mb-2">Chose Photo, Not Plant</h3>
    <p class="text-xs text-gray-650 leading-relaxed m-0">
      Every plant looks good in a product photo. The question is if it will thrive in your home's actual lighting. If unsure, use the AI Plant Advisor at <a href="/ai-advisor" class="text-primary hover:underline font-bold">indoorplant.in/ai-advisor</a>.
    </p>
  </div>
</div>

<h2 class="text-2xl md:text-3xl font-extrabold text-[#1B4332] font-playfair mt-12 mb-6 border-b border-gray-150 pb-2">
  📦 What to Do When Your Plant Arrives
</h2>

<p class="mb-6 text-gray-750 leading-relaxed">
  The first 48 hours after delivery are not the time to judge the plant. It has been through packaging, transit, temperature changes, and darkness. Some drooping or slight wilting is normal and typically resolves within 3-5 days.
</p>

<div class="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
  <div class="border border-emerald-100 bg-emerald-50/10 rounded-2xl p-6">
    <h3 class="text-lg font-bold text-emerald-900 mt-0 mb-2">📅 Day 1-2: Settling In</h3>
    <p class="text-xs text-gray-700 leading-relaxed m-0">
      Place the plant in its intended spot. Do not water immediately — check the soil first. If it arrived with moist soil, leave it. If it is bone dry, give it a moderate watering.
    </p>
  </div>
  <div class="border border-emerald-100 bg-emerald-50/10 rounded-2xl p-6">
    <h3 class="text-lg font-bold text-emerald-900 mt-0 mb-2">🌿 Day 3 Onwards</h3>
    <p class="text-xs text-gray-700 leading-relaxed m-0">
      Let it settle. Most plants that look sad on arrival look noticeably better by day 5 once they have had stable light and temperature.
    </p>
  </div>
</div>

<div class="bg-amber-50 border border-amber-200/80 rounded-2xl p-6 my-8">
  <h4 class="font-bold text-amber-900 mt-0 mb-2 flex items-center gap-2">
    ⚠️ Transit Damage Reporting Window: 12 Hours
  </h4>
  <p class="text-xs text-gray-700 m-0 leading-relaxed">
    If your plant arrives visibly damaged — broken stems, root ball collapsed, severe physical damage from transit — photograph it and contact IndoorPlant.in at <a href="mailto:support@indoorplant.in" class="text-primary hover:underline font-bold">support@indoorplant.in</a> within 12 hours of delivery. This is the official window for reporting damage on arrival. Change-of-mind returns are not accepted.
  </p>
</div>

<p class="mb-8 text-gray-750 leading-relaxed">
  For ongoing care once your plant is settled in, the care guides at <a href="/care" class="text-primary hover:underline font-bold">indoorplant.in/care</a> cover seasonal watering schedules and light requirements written specifically for Indian conditions.
</p>

<h2 class="text-2xl md:text-3xl font-extrabold text-[#1B4332] font-playfair mt-12 mb-6 border-b border-gray-150 pb-2">
  ☀️ Light Conditions in Indian Apartments — Quick Reference
</h2>

<ul class="list-none pl-0 mb-8 space-y-4">
  <li class="border-l-4 border-emerald-500 pl-4 py-1">
    <strong class="text-gray-900 block font-bold">North-facing rooms</strong>
    <span class="text-xs text-gray-650">Low light year-round. Best options from this list: Aglaonema Red Lipstick, Aglaonema Snow White, Golden Money Plant, Bamboo Palm.</span>
  </li>
  <li class="border-l-4 border-emerald-500 pl-4 py-1">
    <strong class="text-gray-900 block font-bold">South and west-facing rooms</strong>
    <span class="text-xs text-gray-650">Strongest light in summer afternoons. Best options: Lucky Jade Plant, Monstera Broken Heart, N'Joy Money Plant.</span>
  </li>
  <li class="border-l-4 border-emerald-500 pl-4 py-1">
    <strong class="text-gray-900 block font-bold">East-facing rooms</strong>
    <span class="text-xs text-gray-650">Good morning light, dim afternoons. Most plants on this list work well here.</span>
  </li>
  <li class="border-l-4 border-emerald-500 pl-4 py-1">
    <strong class="text-gray-900 block font-bold">High-rise apartments</strong>
    <span class="text-xs text-gray-650">Typically better light than ground-floor units because surrounding buildings block less sky. The same plant variety will look better on the 12th floor than the 2nd in a dense urban area.</span>
  </li>
  <li class="border-l-4 border-emerald-500 pl-4 py-1">
    <strong class="text-gray-900 block font-bold">Rooms with ACs running most of the day</strong>
    <span class="text-xs text-gray-650">Air conditioning reduces humidity which affects moisture-loving plants. The Monstera Broken Heart appreciates occasional misting during dry winter months if AC is on frequently.</span>
  </li>
</ul>

<h2 class="text-2xl md:text-3xl font-extrabold text-[#1B4332] font-playfair mt-12 mb-6 border-b border-gray-150 pb-2">
  📌 Quick Recommendations By Need
</h2>

<div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-6 text-xs">
  <div class="bg-gray-50 border border-gray-150 rounded-xl p-4 flex justify-between items-center gap-2">
    <span>Forgot to water the last three plants owned?</span>
    <strong class="text-[#2D6A4F] shrink-0 text-right">Lucky Jade Plant (Rs 299)</strong>
  </div>
  <div class="bg-gray-50 border border-gray-150 rounded-xl p-4 flex justify-between items-center gap-2">
    <span>Want something cheap that looks interesting?</span>
    <strong class="text-[#2D6A4F] shrink-0 text-right">N'Joy Money Plant (Rs 299)</strong>
  </div>
  <div class="bg-gray-50 border border-gray-150 rounded-xl p-4 flex justify-between items-center gap-2">
    <span>Dark north-facing room, need colour?</span>
    <strong class="text-[#2D6A4F] shrink-0 text-right">Aglaonema Red Lipstick (Rs 399)</strong>
  </div>
  <div class="bg-gray-50 border border-gray-150 rounded-xl p-4 flex justify-between items-center gap-2">
    <span>Safe around cats or dogs?</span>
    <strong class="text-[#2D6A4F] shrink-0 text-right">Aglaonema Snow White (Rs 349) / Jade (Rs 299)</strong>
  </div>
  <div class="bg-gray-50 border border-gray-150 rounded-xl p-4 flex justify-between items-center gap-2">
    <span>Large empty corner with decent light?</span>
    <strong class="text-[#2D6A4F] shrink-0 text-right">Bamboo Palm (Rs 389)</strong>
  </div>
  <div class="bg-gray-50 border border-gray-150 rounded-xl p-4 flex justify-between items-center gap-2">
    <span>Statement plant on budget?</span>
    <strong class="text-[#2D6A4F] shrink-0 text-right">Monstera Broken Heart (Rs 349)</strong>
  </div>
  <div class="bg-gray-50 border border-gray-150 rounded-xl p-4 md:col-span-2 flex justify-between items-center gap-2">
    <span>Most adaptable plant for uncertain conditions?</span>
    <strong class="text-[#2D6A4F] shrink-0 text-right">Golden Money Plant (Rs 309)</strong>
  </div>
</div>

<p class="mb-8 text-gray-700 leading-relaxed font-semibold">
  All of these are available now at <a href="/shop" class="text-primary hover:underline font-bold">indoorplant.in/shop</a> with free delivery across India.
</p>

<h2 class="text-2xl md:text-3xl font-extrabold text-[#1B4332] font-playfair mt-12 mb-6 border-b border-gray-150 pb-2">
  ❓ FAQ
</h2>

<div class="space-y-6 my-8">
  <div class="border-l-4 border-[#2D6A4F] bg-gray-50/50 p-5 rounded-r-xl">
    <strong class="block text-gray-900 font-bold mb-2">Q: Which plant from this list needs the least watering?</strong>
    <p class="text-gray-705 leading-relaxed m-0 text-xs">
      A: The Lucky Jade Plant by a clear margin. It is a succulent that stores water in its own tissues and needs watering only once every 2-3 weeks. In winter or in an air-conditioned home you can stretch that to once a month and it will be fine. Every other plant on this list needs watering at least weekly.
    </p>
  </div>

  <div class="border-l-4 border-[#2D6A4F] bg-gray-50/50 p-5 rounded-r-xl">
    <strong class="block text-gray-900 font-bold mb-2">Q: I have a north-facing room in a Delhi apartment that gets almost no direct light. What should I buy?</strong>
    <p class="text-gray-705 leading-relaxed m-0 text-xs">
      A: Either aglaonema. Both the Red Lipstick and Snow White are specifically suited to low-light conditions and will hold their colour in a north-facing Indian room. The Bamboo Palm and Golden Money Plant are also reasonable in low light, though they look better with more.
    </p>
  </div>

  <div class="border-l-4 border-[#2D6A4F] bg-gray-50/50 p-5 rounded-r-xl">
    <strong class="block text-gray-900 font-bold mb-2">Q: Can I keep any of these plants on a covered balcony?</strong>
    <p class="text-gray-705 leading-relaxed m-0 text-xs">
      A: The Lucky Jade Plant thrives on a covered balcony that gets some direct light. The Bamboo Palm also does well outdoors in a sheltered spot. The money plant varieties can handle partial outdoor exposure. The aglaonemas and Monstera Broken Heart prefer the stable temperature and indirect light of an indoor spot.
    </p>
  </div>

  <div class="border-l-4 border-[#2D6A4F] bg-gray-50/50 p-5 rounded-r-xl">
    <strong class="block text-gray-900 font-bold mb-2">Q: These prices seem lower than what I see on other sites. Are they correct?</strong>
    <p class="text-gray-750 leading-relaxed m-0 text-xs">
      A: These prices are the current sale prices as shown on each IndoorPlant.in product page as of June 2026. The original prices are higher — the crossed-out price you see on the site. Whether these sale prices are permanent or limited-time is not stated on the site, so buy when you see the price you are happy with.
    </p>
  </div>

  <div class="border-l-4 border-[#2D6A4F] bg-gray-50/50 p-5 rounded-r-xl">
    <strong class="block text-gray-900 font-bold mb-2">Q: What is the return policy if my plant arrives damaged?</strong>
    <p class="text-gray-705 leading-relaxed m-0 text-xs">
      A: IndoorPlant.in accepts returns for plants that arrive visibly damaged. You must report it within 12 hours of delivery with a photo. Email support@indoorplant.in with your order number and photos of the damage. Change-of-mind returns are not accepted.
    </p>
  </div>
</div>
`
  }
];
