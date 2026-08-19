import type { CategoryView, ProductView, SiteSettingsView } from "./types";

// Demo / fallback content used only when NEXT_PUBLIC_SANITY_PROJECT_ID is not
// configured, so the site is fully browsable immediately after `npm install && npm run dev`.
// Once Sanity is connected, every one of these is replaced by real CMS content —
// see README.md "Getting Started" and `npm run seed`.

const img = (seed: string) => `/demo/${seed}.svg`;

export const DEMO_SITE_SETTINGS: SiteSettingsView = {
  businessName: "Green Leaf Nursery",
  tagline: "Rooted in Indore, grown with care",
  whatsappNumber: "911234567890",
  whatsappGreeting:
    "Hello, I am interested in purchasing the {{product}} ({{variant}}) listed at {{price}}. Is it available?",
  heroImage: img("nursery-hero"),
  heroHeadline: "Bring nature home",
  heroSubheadline:
    "Hand-picked indoor & outdoor plants, potted with care and ready to thrive in your space.",
  address: "123 Nursery Road, Indore, Madhya Pradesh",
  phoneDisplay: "+91 12345 67890",
  instagramUrl: "https://instagram.com",
};

export const DEMO_CATEGORIES: CategoryView[] = [
  { id: "cat-indoor", title: "Indoor Plants", slug: "indoor-plants", description: "Air-purifying, low-maintenance greens for every room.", image: img("indoor-cat"), order: 1 },
  { id: "cat-outdoor", title: "Outdoor Plants", slug: "outdoor-plants", description: "Hardy, sun-loving plants for gardens, balconies & terraces.", image: img("outdoor-cat"), order: 2 },
  { id: "cat-succulents", title: "Succulents & Cacti", slug: "succulents-cacti", description: "Low-water, high-character desk and shelf companions.", image: img("succulent-cat"), order: 3 },
  { id: "cat-accessories", title: "Pots & Accessories", slug: "pots-accessories", description: "Ceramic, terracotta & concrete pots to complete the look.", image: img("pots-cat"), order: 4 },
];

const byCat = (slug: string) => DEMO_CATEGORIES.find((c) => c.slug === slug)!;

export const DEMO_PRODUCTS: ProductView[] = [
  {
    id: "prod-monstera",
    name: "Monstera Deliciosa",
    slug: "monstera-deliciosa",
    categoryTitle: byCat("indoor-plants").title,
    categorySlug: "indoor-plants",
    images: [img("monstera-1"), img("monstera-2")],
    shortDescription: "The iconic split-leaf philodendron — an instant statement piece.",
    description:
      "Monstera Deliciosa is prized for its dramatic, naturally-perforated leaves. Thrives in bright, indirect light and makes a striking centrepiece for any living room or office.",
    featured: true,
    price: 799,
    compareAtPrice: 999,
    stockStatus: "in-stock",
    variants: [
      { label: "Small (8 inch pot)", price: 499, stockStatus: "in-stock" },
      { label: "Medium (12 inch pot)", price: 799, stockStatus: "in-stock" },
      { label: "Large (16 inch pot)", price: 1499, stockStatus: "limited-stock" },
    ],
    careLevel: "Easy",
    lightRequirement: "Indirect Light",
    petFriendly: false,
    tags: ["Air-Purifying", "Statement Plant"],
  },
  {
    id: "prod-snake-plant",
    name: "Snake Plant (Sansevieria)",
    slug: "snake-plant",
    categoryTitle: byCat("indoor-plants").title,
    categorySlug: "indoor-plants",
    images: [img("snake-1"), img("snake-2")],
    shortDescription: "Nearly indestructible and one of the best air-purifiers around.",
    description:
      "Snake Plant tolerates low light and irregular watering, making it perfect for beginners. Releases oxygen at night, ideal for bedrooms.",
    featured: true,
    price: 349,
    stockStatus: "in-stock",
    variants: [
      { label: "Small (6 inch pot)", price: 249, stockStatus: "in-stock" },
      { label: "Medium (10 inch pot)", price: 349, stockStatus: "in-stock" },
    ],
    careLevel: "Easy",
    lightRequirement: "Low Light",
    petFriendly: false,
    tags: ["Air-Purifying", "Low Maintenance"],
  },
  {
    id: "prod-money-plant",
    name: "Money Plant (Golden Pothos)",
    slug: "money-plant-golden-pothos",
    categoryTitle: byCat("indoor-plants").title,
    categorySlug: "indoor-plants",
    images: [img("money-plant-1")],
    shortDescription: "A trailing favourite believed to bring good fortune.",
    description:
      "Golden Pothos is one of the easiest houseplants to grow — thrives in water or soil, and its trailing vines look beautiful on shelves or hanging baskets.",
    featured: true,
    price: 199,
    stockStatus: "in-stock",
    careLevel: "Easy",
    lightRequirement: "Indirect Light",
    petFriendly: false,
    tags: ["Low Maintenance", "Gift-Worthy"],
  },
  {
    id: "prod-peace-lily",
    name: "Peace Lily",
    slug: "peace-lily",
    categoryTitle: byCat("indoor-plants").title,
    categorySlug: "indoor-plants",
    images: [img("peace-lily-1")],
    shortDescription: "Elegant white blooms and glossy dark green leaves.",
    description:
      "Peace Lily is a top-rated air purifier that flags its watering needs by drooping slightly — hard to kill by accident and rewarding to grow.",
    price: 449,
    stockStatus: "limited-stock",
    careLevel: "Moderate",
    lightRequirement: "Indirect Light",
    petFriendly: false,
    tags: ["Air-Purifying", "Flowering"],
  },
  {
    id: "prod-fiddle-leaf-fig",
    name: "Fiddle Leaf Fig",
    slug: "fiddle-leaf-fig",
    categoryTitle: byCat("indoor-plants").title,
    categorySlug: "indoor-plants",
    images: [img("fiddle-1")],
    shortDescription: "Large violin-shaped leaves for a bold, editorial look.",
    description:
      "A designer favourite — the Fiddle Leaf Fig makes a dramatic architectural statement in bright rooms with consistent indirect light.",
    price: 1299,
    stockStatus: "in-stock",
    careLevel: "Expert",
    lightRequirement: "Indirect Light",
    tags: ["Statement Plant"],
  },
  {
    id: "prod-areca-palm",
    name: "Areca Palm",
    slug: "areca-palm",
    categoryTitle: byCat("outdoor-plants").title,
    categorySlug: "outdoor-plants",
    images: [img("areca-1")],
    shortDescription: "Feathery fronds that soften balconies, patios & entryways.",
    description:
      "Areca Palm brings a tropical, resort-like feel outdoors or in bright indoor corners, and doubles as a natural humidifier.",
    featured: true,
    price: 899,
    stockStatus: "in-stock",
    careLevel: "Moderate",
    lightRequirement: "Full Sun",
    tags: ["Air-Purifying"],
  },
  {
    id: "prod-hibiscus",
    name: "Hibiscus",
    slug: "hibiscus",
    categoryTitle: byCat("outdoor-plants").title,
    categorySlug: "outdoor-plants",
    images: [img("hibiscus-1")],
    shortDescription: "Bold, vivid blooms that flower nearly year-round.",
    description:
      "A garden classic — Hibiscus rewards full sun with a continuous show of large, colourful flowers through most of the year.",
    price: 249,
    stockStatus: "in-stock",
    careLevel: "Easy",
    lightRequirement: "Full Sun",
    tags: ["Flowering"],
  },
  {
    id: "prod-bougainvillea",
    name: "Bougainvillea",
    slug: "bougainvillea",
    categoryTitle: byCat("outdoor-plants").title,
    categorySlug: "outdoor-plants",
    images: [img("bougain-1")],
    shortDescription: "Vibrant papery bracts, perfect for gates, fences & trellises.",
    description:
      "Bougainvillea is a hardy, drought-tolerant climber that thrives on neglect in full sun — ideal for Indore's climate.",
    price: 299,
    stockStatus: "in-stock",
    careLevel: "Easy",
    lightRequirement: "Full Sun",
    tags: ["Flowering", "Low Maintenance"],
  },
  {
    id: "prod-tulsi",
    name: "Tulsi (Holy Basil)",
    slug: "tulsi-holy-basil",
    categoryTitle: byCat("outdoor-plants").title,
    categorySlug: "outdoor-plants",
    images: [img("tulsi-1")],
    shortDescription: "Sacred, fragrant and useful — a courtyard essential.",
    description:
      "Tulsi is treasured for its medicinal properties and fragrance, and grows easily in pots or garden beds with regular sun.",
    price: 99,
    stockStatus: "in-stock",
    careLevel: "Easy",
    lightRequirement: "Full Sun",
    tags: ["Low Maintenance"],
  },
  {
    id: "prod-echeveria",
    name: "Echeveria Rosette",
    slug: "echeveria-rosette",
    categoryTitle: byCat("succulents-cacti").title,
    categorySlug: "succulents-cacti",
    images: [img("echeveria-1")],
    shortDescription: "Perfectly symmetrical rosettes in soft pastel tones.",
    description:
      "A classic desk succulent — Echeveria needs minimal water and bright light to keep its tight, colourful rosette shape.",
    featured: true,
    price: 149,
    stockStatus: "in-stock",
    careLevel: "Easy",
    lightRequirement: "Full Sun",
    tags: ["Low Maintenance", "Gift-Worthy"],
  },
  {
    id: "prod-barrel-cactus",
    name: "Golden Barrel Cactus",
    slug: "golden-barrel-cactus",
    categoryTitle: byCat("succulents-cacti").title,
    categorySlug: "succulents-cacti",
    images: [img("cactus-1")],
    shortDescription: "A sculptural, spiky sphere that barely needs watering.",
    description:
      "Golden Barrel Cactus is an architectural accent piece that thrives on neglect — water sparingly and give it full sun.",
    price: 349,
    stockStatus: "out-of-stock",
    careLevel: "Easy",
    lightRequirement: "Full Sun",
    tags: ["Low Maintenance"],
  },
  {
    id: "prod-jade-plant",
    name: "Jade Plant",
    slug: "jade-plant",
    categoryTitle: byCat("succulents-cacti").title,
    categorySlug: "succulents-cacti",
    images: [img("jade-1")],
    shortDescription: "Thick, glossy leaves said to bring prosperity.",
    description:
      "Jade Plant is an easy-care succulent tree that can live for decades, becoming a beautiful bonsai-like feature over time.",
    price: 199,
    stockStatus: "in-stock",
    careLevel: "Easy",
    lightRequirement: "Full Sun",
    tags: ["Low Maintenance", "Gift-Worthy"],
  },
  {
    id: "prod-terracotta-pot",
    name: "Handmade Terracotta Pot",
    slug: "handmade-terracotta-pot",
    categoryTitle: byCat("pots-accessories").title,
    categorySlug: "pots-accessories",
    images: [img("terracotta-1")],
    shortDescription: "Breathable, classic terracotta — 8 inch diameter.",
    description:
      "Locally handmade terracotta pot with drainage hole, perfect for both indoor and outdoor plants. Natural, breathable material keeps roots healthy.",
    price: 179,
    stockStatus: "in-stock",
    tags: ["Locally Made"],
  },
  {
    id: "prod-ceramic-planter",
    name: "Glazed Ceramic Planter",
    slug: "glazed-ceramic-planter",
    categoryTitle: byCat("pots-accessories").title,
    categorySlug: "pots-accessories",
    images: [img("ceramic-1")],
    shortDescription: "Matte-glazed finish in earthy sage green — 10 inch.",
    description:
      "A premium glazed ceramic planter with saucer included, designed to complement medium to large indoor plants.",
    price: 599,
    stockStatus: "in-stock",
    tags: ["Gift-Worthy"],
  },
];

export function getDemoProductsByCategory(categorySlug: string) {
  return DEMO_PRODUCTS.filter((p) => p.categorySlug === categorySlug);
}

export function getDemoFeaturedProducts() {
  return DEMO_PRODUCTS.filter((p) => p.featured);
}

export function getDemoProductBySlug(slug: string) {
  return DEMO_PRODUCTS.find((p) => p.slug === slug);
}

export function getDemoRelatedProducts(categorySlug: string, excludeSlug: string) {
  return DEMO_PRODUCTS.filter((p) => p.categorySlug === categorySlug && p.slug !== excludeSlug).slice(0, 4);
}
