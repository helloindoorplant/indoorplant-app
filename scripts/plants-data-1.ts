import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const plants = [
  // PRODUCT 1
  {
    name: "Aglaonema Red Lipstick Plant",
    slug: "aglaonema-red-lipstick-plant",
    description: "A showstopper that demands zero drama — its deep green leaves edged in vivid cherry-red make it one of the most striking indoor plants you can own. Bold enough to be a centrepiece, easy enough for the most forgetful plant parent.",
    categoryName: "Air Purifying Plants",
    categorySlug: "air-purifying",
    price: 878,
    salePrice: 399,
    stock: 50,
    isFeatured: true,
    careLevel: "EASY",
    lightReq: "BRIGHT_INDIRECT",
    waterReq: "Water once every 7-10 days. Allow top 1 inch of soil to dry between waterings. Do not overwater.",
    petFriendly: false,
    airPurifier: true,
    images: JSON.stringify([
      "https://lightgrey-nightingale-217677.hostingersite.com/wp-content/uploads/2026/04/Aglaonema-Red-Lipstick-Plant-2.webp",
      "https://lightgrey-nightingale-217677.hostingersite.com/wp-content/uploads/2026/04/Aglaonema-Red-Lipstick-Plant-4.webp",
      "https://lightgrey-nightingale-217677.hostingersite.com/wp-content/uploads/2026/04/Aglaonema-Red-Lipstick-Plant-5.webp",
      "https://lightgrey-nightingale-217677.hostingersite.com/wp-content/uploads/2026/04/Aglaonema-Red-Lipstick-Plant-6.webp",
      "https://lightgrey-nightingale-217677.hostingersite.com/wp-content/uploads/2026/04/Aglaonema-Red-Lipstick-Plant-7.webp",
      "https://lightgrey-nightingale-217677.hostingersite.com/wp-content/uploads/2026/04/Aglaonema-Red-Lipstick-Plant-8.webp"
    ]),
    faqs: JSON.stringify([
      { q: "What is the Aglaonema Red Lipstick plant?", a: "The Aglaonema Red Lipstick is a tropical foliage plant known for its deep green leaves dramatically edged in vivid cherry-red. It belongs to the Chinese Evergreen family (Aglaonema spp.) and is one of the most sought-after indoor plants in India for its bold colour contrast and near-zero maintenance needs." },
      { q: "Is the Aglaonema Red Lipstick good for Indian homes?", a: "Absolutely. It thrives in India's warm climate and adapts easily to the low-light, AC-cooled environments of urban Indian flats and offices. It handles irregular watering and occasional neglect better than most houseplants." },
      { q: "How much sunlight does the Aglaonema Red Lipstick need?", a: "It prefers bright indirect light — near a window with filtered sunlight is ideal. It can survive in low-light conditions, but the red leaf edges are most vivid with more light. Avoid harsh direct afternoon sun, which scorches the leaves." },
      { q: "How often should I water the Aglaonema Red Lipstick?", a: "Water once every 7-10 days in summer and once every 12-15 days in winter. Always allow the top inch of soil to dry out before watering again. The self-watering pot included in your kit regulates moisture automatically and prevents overwatering." },
      { q: "Is the Aglaonema Red Lipstick an air-purifying plant?", a: "Yes. NASA's Clean Air Study lists Aglaonema among its top air-purifying indoor plants. It actively filters toxins like formaldehyde, benzene, and carbon monoxide from indoor air — making it ideal for homes, offices, and bedrooms in Indian cities." },
      { q: "Can I keep the Aglaonema Red Lipstick in my bedroom?", a: "Yes — it is one of the best bedroom plants available. It releases oxygen, purifies the air, and has a calming visual presence. Ensure it receives some indirect light from a nearby window for best results." },
      { q: "Why is my Aglaonema Red Lipstick losing its red colour?", a: "Fading red edges are almost always caused by insufficient light. Move the plant closer to a window with bright indirect sunlight. Within 2-4 weeks, the red colouration should return. Avoid fertilising excessively, which can also cause colour loss." },
      { q: "Is the Aglaonema Red Lipstick toxic to pets?", a: "Yes — it contains calcium oxalate crystals that are mildly toxic to cats and dogs if ingested. Keep it on a high shelf or in a room that pets and small children do not access freely." },
      { q: "What soil is best for the Aglaonema Red Lipstick?", a: "A well-draining, loose potting mix: 40% coco peat + 30% perlite or coarse sand + 30% compost. The pre-mixed soil media included with your order is ready to use and perfectly suited for this plant." },
      { q: "Does the Aglaonema Red Lipstick need fertiliser?", a: "During the growing season (March-October), feed with a balanced liquid fertiliser at half strength once a month. Avoid fertilising in winter (November-February) when the plant is resting." },
      { q: "How do I propagate the Aglaonema Red Lipstick?", a: "Propagate by stem cuttings in water or moist coco peat. Cut a healthy stem with 2-3 nodes, allow the cut to dry for one hour, then place in water or moist coco peat. Roots develop in 3-5 weeks. Best done in spring or early summer." },
      { q: "Is the Aglaonema Red Lipstick a good gift plant?", a: "It is one of the finest gifting plants in India. Its striking red-and-green foliage looks premium on any shelf, it requires minimal care, and it carries positive associations with good luck and prosperity in both Vastu Shastra and Feng Shui traditions. Perfect for housewarmings, Diwali, and birthdays." }
    ])
  },
  // PRODUCT 2
  {
    name: "Aglaonema Snow White Plant",
    slug: "aglaonema-snow-white-plant",
    description: "A rare kind of beautiful — its broad leaves painted in creamy white and soft green look like morning light filtered through frosted glass. It brings clean, elegant calm to any room and asks almost nothing in return.",
    categoryName: "Air Purifying Plants",
    categorySlug: "air-purifying",
    price: 768,
    salePrice: 349,
    stock: 50,
    isFeatured: true,
    careLevel: "EASY",
    lightReq: "BRIGHT_INDIRECT",
    waterReq: "Water once every 7-10 days in summer, 12-15 days in winter. Never let roots sit in standing water.",
    petFriendly: false,
    airPurifier: true,
    images: JSON.stringify([
      "https://lightgrey-nightingale-217677.hostingersite.com/wp-content/uploads/2026/04/Aglaonema-Snow-White-Plant-2.webp",
      "https://lightgrey-nightingale-217677.hostingersite.com/wp-content/uploads/2026/04/Aglaonema-Snow-White-Plant-3.webp",
      "https://lightgrey-nightingale-217677.hostingersite.com/wp-content/uploads/2026/04/Aglaonema-Snow-White-Plant-5.webp",
      "https://lightgrey-nightingale-217677.hostingersite.com/wp-content/uploads/2026/04/Aglaonema-Snow-White-Plant-6.webp",
      "https://lightgrey-nightingale-217677.hostingersite.com/wp-content/uploads/2026/04/Aglaonema-Snow-White-Plant-7.webp",
      "https://lightgrey-nightingale-217677.hostingersite.com/wp-content/uploads/2026/04/Aglaonema-Snow-White-Plant-9.webp"
    ]),
    faqs: JSON.stringify([
      { q: "What is the Aglaonema Snow White plant?", a: "The Aglaonema Snow White is a tropical foliage plant prized for its broad, creamy-white and soft-green variegated leaves. Part of the Chinese Evergreen family, it is one of the most elegant low-maintenance indoor plants available in India — combining striking visual beauty with exceptional adaptability to indoor conditions." },
      { q: "Is the Aglaonema Snow White suitable for Indian homes?", a: "Yes. It thrives in India's warm climate and adapts well to the low-light, AC-cooled environments of urban Indian homes and offices. It handles the dry air of air-conditioned rooms better than most variegated plants." },
      { q: "How much sunlight does the Aglaonema Snow White need?", a: "Bright indirect light is ideal — near a north or east-facing window with filtered light throughout the day. The white variegation requires slightly more light than all-green varieties. In very low light, the white fades to green. Never place in direct afternoon sun." },
      { q: "How often should I water the Aglaonema Snow White?", a: "Water once every 7-10 days in summer and every 12-15 days in winter. Allow the top 1-2 inches of soil to dry between waterings. The self-watering pot included in your kit manages moisture levels automatically and prevents the most common cause of plant death — overwatering." },
      { q: "Does the Aglaonema Snow White purify air?", a: "Yes. Like all Aglaonemas, the Snow White is an effective air purifier that removes formaldehyde, benzene, and xylene from indoor air. These are pollutants common in Indian homes with new furniture, paints, and city air quality." },
      { q: "Can I keep the Aglaonema Snow White in my bedroom?", a: "Absolutely. Its calming white-and-green appearance combined with its air-purifying ability makes it one of the finest bedroom plants. It does not release CO2 at night, making it completely safe to keep near your sleeping area." },
      { q: "Why is the white colour fading on my Aglaonema Snow White?", a: "Fading white variegation is the most common sign of insufficient light. Move the plant closer to a bright, indirect light source — a north or east window works best. Within 2-4 weeks of increased light exposure, the white colouration will return." },
      { q: "Is the Aglaonema Snow White toxic to pets?", a: "Yes — it contains calcium oxalate crystals that are toxic to cats and dogs if ingested, causing mouth irritation and vomiting. Keep it on elevated shelves away from pets and small children at all times." },
      { q: "What is the best soil mix for Aglaonema Snow White?", a: "A well-draining, lightweight mix works best: 40% coco peat + 30% perlite + 30% compost. The soil media included with your order is pre-mixed and ideal for this variety. Avoid heavy garden soil that retains excess moisture and causes root rot." },
      { q: "Can the Aglaonema Snow White survive in an air-conditioned room?", a: "Yes, but with some care. AC rooms tend to be too dry for most tropical plants. Mist the leaves 2-3 times a week or place a water-filled pebble tray beneath the pot. Keep the plant away from direct AC airflow, which dries out leaves rapidly." },
      { q: "How do I propagate the Aglaonema Snow White?", a: "Propagate by stem cuttings in spring or early summer. Cut a healthy stem with 2-3 nodes, allow it to dry for an hour, then place in moist coco peat or water. Roots appear in 3-5 weeks. Division during repotting is another effective method." },
      { q: "Is the Aglaonema Snow White a good gift plant?", a: "It is one of the most elegant gifting plants in India. Its pristine white-and-green foliage looks luxurious, it requires minimal care, and it carries positive Vastu symbolism. Ideal for housewarmings, corporate gifts, birthdays, and festive occasions." }
    ])
  },
  // PRODUCT 3
  {
    name: "Bamboo Palm Plant",
    slug: "bamboo-palm-plant",
    description: "The Bamboo Palm brings the unhurried elegance of a tropical resort into your living room — its slender reed-like stems and arching feathery fronds create a lush, layered look that genuinely transforms the feeling of any space.",
    categoryName: "Pet-Friendly Plants",
    categorySlug: "pet-safe",
    price: 449,
    salePrice: null,
    stock: 50,
    isFeatured: false,
    careLevel: "EASY",
    lightReq: "BRIGHT_INDIRECT",
    waterReq: "Water every 5-7 days in summer, 10-12 days in winter. Keep soil consistently moist but never waterlogged. Mist leaves daily for best results.",
    petFriendly: true,
    airPurifier: true,
    images: JSON.stringify([
      "https://lightgrey-nightingale-217677.hostingersite.com/wp-content/uploads/2026/04/Bamboo-Palm-Plant-2.webp",
      "https://lightgrey-nightingale-217677.hostingersite.com/wp-content/uploads/2026/04/Bamboo-Palm-Plant3.webp",
      "https://lightgrey-nightingale-217677.hostingersite.com/wp-content/uploads/2026/04/Bamboo-Palm-Plant-4.webp",
      "https://lightgrey-nightingale-217677.hostingersite.com/wp-content/uploads/2026/04/Bamboo-Palm-Plant-5.webp",
      "https://lightgrey-nightingale-217677.hostingersite.com/wp-content/uploads/2026/04/Bamboo-Palm-Plant-6.webp",
      "https://lightgrey-nightingale-217677.hostingersite.com/wp-content/uploads/2026/04/Bamboo-Palm-Plant-7.webp"
    ]),
    faqs: JSON.stringify([
      { q: "What is a Bamboo Palm plant?", a: "The Bamboo Palm (Chamaedorea seifrizii) is a tropical palm native to Central America, named for its slender bamboo-like cane stems. Indoors, it grows as a multi-stemmed, lush plant with arching feathery fronds. It is one of NASA's highest-rated air-purifying houseplants and one of the few palms that thrives in low-light indoor conditions." },
      { q: "Is the Bamboo Palm good for Indian homes?", a: "Extremely. It thrives in India's warm, humid climate and handles the dim lighting of urban Indian flats beautifully. It purifies air from chemicals common in Indian homes — formaldehyde from furniture and ammonia from cleaning products — making it both beautiful and functional." },
      { q: "How much sunlight does a Bamboo Palm need?", a: "Bright indirect light is ideal — near an east or north-facing window. It tolerates low light well and is one of the few palms that can survive in office conditions with only fluorescent lighting. Avoid direct harsh afternoon sun, which scorches the delicate fronds." },
      { q: "How often should I water my Bamboo Palm?", a: "Water every 5-7 days in summer and every 10-12 days in winter. Unlike most indoor plants, the Bamboo Palm prefers consistently moist (not soaked) soil. Check by pressing a finger 1 inch into the soil — water when the top layer feels dry." },
      { q: "Is the Bamboo Palm an air-purifying plant?", a: "Yes — it is one of NASA's highest-rated air-purifying indoor plants. It actively removes formaldehyde, benzene, xylene, toluene, and ammonia from indoor air. One medium-sized Bamboo Palm can effectively clean the air in a 100 sq. ft. room." },
      { q: "Is the Bamboo Palm safe for pets and children?", a: "Yes — the Bamboo Palm is listed as completely non-toxic to cats and dogs by the ASPCA. It is one of the very few large indoor plants that is safe for pet-friendly Indian homes, making it an outstanding choice for families with animals." },
      { q: "How tall does a Bamboo Palm grow indoors?", a: "Indoors, a Bamboo Palm typically grows to 1.5-2.5 metres over several years. In a 4-6 inch pot, it remains compact and manageable for 2-3 years before needing repotting. Growth rate depends on light levels and how regularly it is fertilised." },
      { q: "What soil mix is best for a Bamboo Palm?", a: "Use a moisture-retentive yet well-draining mix: 40% coco peat + 20% perlite + 40% compost. The plant needs consistent moisture but should never sit in waterlogged soil, which causes root rot. The pre-mixed soil in your kit is ideal." },
      { q: "Why are the tips of my Bamboo Palm turning brown?", a: "Brown tips are most commonly caused by low humidity. Increase misting or place a pebble tray with water beneath the pot. Other causes include underwatering, fluoride in tap water (switch to filtered water), or direct sunlight (move to indirect light)." },
      { q: "Can I keep a Bamboo Palm in my office?", a: "Absolutely. The Bamboo Palm is one of the best office plants available — it tolerates fluorescent lighting, infrequent watering, and AC conditions. It also significantly improves air quality in closed office environments and creates a calming tropical atmosphere." },
      { q: "Does the Bamboo Palm need fertiliser?", a: "Apply a balanced liquid fertiliser at half strength every 3-4 weeks from April to September. Avoid nitrogen-heavy fertilisers that cause excessive soft growth susceptible to pests. Do not fertilise from October to March when the plant is in its rest phase." },
      { q: "Is the Bamboo Palm a good housewarming or gifting plant?", a: "Yes — its tall, elegant tropical form makes it a statement gift. It is pet-safe, a top-rated air purifier, and carries positive Vastu energy as a plant that brings calm and tropical warmth into a new home. Perfect for housewarmings, office openings, and corporate gifting." }
    ])
  },
  // PRODUCT 4
  {
    name: "Bamboo Palm Plant (Premium)",
    slug: "bamboo-palm-plant-premium",
    description: "The Bamboo Palm brings the unhurried elegance of a tropical resort straight into your living room. Its slender reed-like stems and arching feathery fronds create a lush, layered look that no artificial plant can replicate.",
    categoryName: "Pet-Friendly Plants",
    categorySlug: "pet-safe",
    price: 856,
    salePrice: 389,
    stock: 50,
    isFeatured: true,
    careLevel: "EASY",
    lightReq: "BRIGHT_INDIRECT",
    waterReq: "Water every 5-7 days in summer, 10-12 days in winter. Keep soil consistently moist. Mist fronds daily in dry or AC rooms.",
    petFriendly: true,
    airPurifier: true,
    images: JSON.stringify([
      "https://lightgrey-nightingale-217677.hostingersite.com/wp-content/uploads/2026/04/Bamboo-Palm-Plant-10.webp",
      "https://lightgrey-nightingale-217677.hostingersite.com/wp-content/uploads/2026/04/Bamboo-Palm-Plant-2.webp",
      "https://lightgrey-nightingale-217677.hostingersite.com/wp-content/uploads/2026/04/Bamboo-Palm-Plant3.webp",
      "https://lightgrey-nightingale-217677.hostingersite.com/wp-content/uploads/2026/04/Bamboo-Palm-Plant-4.webp",
      "https://lightgrey-nightingale-217677.hostingersite.com/wp-content/uploads/2026/04/Bamboo-Palm-Plant-5.webp",
      "https://lightgrey-nightingale-217677.hostingersite.com/wp-content/uploads/2026/04/Bamboo-Palm-Plant-6.webp"
    ]),
    faqs: JSON.stringify([
      { q: "What is a Bamboo Palm plant?", a: "The Bamboo Palm (Chamaedorea seifrizii) is a multi-stemmed tropical palm prized for its slender cane-like stems and arching feathery fronds. It is one of NASA's top-rated air-purifying houseplants, completely safe for pets, and thrives in the low-light conditions of Indian homes and offices." },
      { q: "Is the Bamboo Palm good for Indian homes?", a: "Extremely well-suited. It thrives in India's warm, humid climate, adapts to low-light urban flats, and purifies indoor air from formaldehyde, ammonia, and benzene — chemicals common in Indian homes with new furniture and cleaning products." },
      { q: "How much sunlight does a Bamboo Palm need?", a: "Bright indirect light is ideal, near an east or north-facing window. It is one of the most shade-tolerant palms available and can survive in rooms with only artificial lighting. Never expose it to direct afternoon sun, which scorches the fronds." },
      { q: "How often should I water a Bamboo Palm?", a: "Water every 5-7 days in summer and every 10-12 days in winter. The Bamboo Palm prefers consistently moist (not waterlogged) soil. Press a finger 1 inch into the soil — water when the top layer feels dry." },
      { q: "Is the Bamboo Palm an air-purifying plant?", a: "Yes — NASA rates it among its highest-performing air-purifying indoor plants. It removes formaldehyde, benzene, xylene, toluene, and ammonia — five of the most harmful indoor air pollutants. Ideal for homes near busy roads or with new furniture and paints." },
      { q: "Is the Bamboo Palm safe for pets?", a: "Yes — the ASPCA lists it as completely non-toxic to cats and dogs. It is one of the very few large, statement indoor plants that is 100% safe in pet-friendly homes. Perfect for families with dogs, cats, or small children." },
      { q: "How tall does the Bamboo Palm grow indoors?", a: "In an indoor pot, the Bamboo Palm grows to 1.5-2.5 metres over several years. It grows upright rather than outward, making it ideal for corners and narrow spaces in Indian flats. Regular fertilising encourages lush, faster growth." },
      { q: "What soil is best for the Bamboo Palm?", a: "A moisture-retentive, well-draining mix: 40% coco peat + 20% perlite + 40% compost. The plant needs consistent moisture but must never sit in waterlogged soil. The pre-mixed soil media included with your order is perfectly suited for this palm." },
      { q: "Why are my Bamboo Palm frond tips turning brown?", a: "Brown tips are caused by low humidity in dry or AC rooms. Mist the fronds daily or place a water-filled pebble tray beneath the pot. Other causes include underwatering, fluoride in tap water (switch to filtered water), or direct sunlight." },
      { q: "Does the Bamboo Palm need fertiliser?", a: "Feed every 3-4 weeks from April to September with a balanced liquid fertiliser at half strength. Avoid nitrogen-heavy fertilisers. Do not fertilise from October to March. Regular feeding during the growing season produces lusher, fuller fronds." },
      { q: "Can I keep a Bamboo Palm in my office?", a: "The Bamboo Palm is one of the finest office plants available. It tolerates fluorescent lighting and AC conditions, improves indoor air quality dramatically, and creates a calming, resort-like atmosphere in any workspace." },
      { q: "Is the Bamboo Palm a good gift?", a: "Yes — its tall, elegant tropical form makes it a premium statement gift. It is pet-safe, a top NASA air purifier, and carries positive Vastu energy. Ideal for housewarmings, office openings, corporate events, and festive gifting in India." }
    ])
  }
];

export { plants };
