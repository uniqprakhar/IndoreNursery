// One-time / re-runnable seed script: populates your Sanity dataset with the
// demo nursery content (site settings, categories, and ~14 demo products)
// so the live site has something to show immediately after setup.
//
// Usage:
//   1. Create a Sanity project (see README.md "Getting Started").
//   2. Fill in .env.local with your project ID, dataset, and a write token
//      (Sanity dashboard -> API -> Tokens -> Add API token -> "Editor").
//   3. Run: npm run seed
//
// Safe to re-run — documents use deterministic IDs and are upserted.

import { createClient } from "@sanity/client";
import "dotenv/config";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !token) {
  console.error(
    "\nMissing config. Please set NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_WRITE_TOKEN in .env.local before seeding.\n" +
      "See README.md -> 'Getting Started' for step-by-step instructions.\n"
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2024-06-01",
  token,
  useCdn: false,
});

// Placeholder photos are the same locally-generated SVGs the site's demo
// mode uses (public/demo/*.svg, see scripts/generate-placeholders.mjs) —
// no external image host required. Swap for real photos in /studio afterwards.
async function uploadImage(seed, filename) {
  const filePath = path.join(__dirname, "..", "public", "demo", `${seed}.svg`);
  const buffer = await readFile(filePath);
  const asset = await client.assets.upload("image", buffer, { filename, contentType: "image/svg+xml" });
  return { _type: "image", asset: { _type: "reference", _ref: asset._id } };
}

const CATEGORIES = [
  { slug: "indoor-plants", title: "Indoor Plants", description: "Air-purifying, low-maintenance greens for every room.", order: 1, imgSeed: "indoor-cat" },
  { slug: "outdoor-plants", title: "Outdoor Plants", description: "Hardy, sun-loving plants for gardens, balconies & terraces.", order: 2, imgSeed: "outdoor-cat" },
  { slug: "succulents-cacti", title: "Succulents & Cacti", description: "Low-water, high-character desk and shelf companions.", order: 3, imgSeed: "succulent-cat" },
  { slug: "pots-accessories", title: "Pots & Accessories", description: "Ceramic, terracotta & concrete pots to complete the look.", order: 4, imgSeed: "pots-cat" },
];

const PRODUCTS = [
  { slug: "monstera-deliciosa", name: "Monstera Deliciosa", category: "indoor-plants", shortDescription: "The iconic split-leaf philodendron — an instant statement piece.", description: "Monstera Deliciosa is prized for its dramatic, naturally-perforated leaves. Thrives in bright, indirect light and makes a striking centrepiece for any living room or office.", featured: true, price: 799, compareAtPrice: 999, stockStatus: "in-stock", variants: [{ label: "Small (8 inch pot)", price: 499, stockStatus: "in-stock" }, { label: "Medium (12 inch pot)", price: 799, stockStatus: "in-stock" }, { label: "Large (16 inch pot)", price: 1499, stockStatus: "limited-stock" }], careLevel: "Easy", lightRequirement: "Indirect Light", petFriendly: false, tags: ["Air-Purifying", "Statement Plant"], images: ["monstera-1", "monstera-2"] },
  { slug: "snake-plant", name: "Snake Plant (Sansevieria)", category: "indoor-plants", shortDescription: "Nearly indestructible and one of the best air-purifiers around.", description: "Snake Plant tolerates low light and irregular watering, making it perfect for beginners. Releases oxygen at night, ideal for bedrooms.", featured: true, price: 349, stockStatus: "in-stock", variants: [{ label: "Small (6 inch pot)", price: 249, stockStatus: "in-stock" }, { label: "Medium (10 inch pot)", price: 349, stockStatus: "in-stock" }], careLevel: "Easy", lightRequirement: "Low Light", petFriendly: false, tags: ["Air-Purifying", "Low Maintenance"], images: ["snake-1", "snake-2"] },
  { slug: "money-plant-golden-pothos", name: "Money Plant (Golden Pothos)", category: "indoor-plants", shortDescription: "A trailing favourite believed to bring good fortune.", description: "Golden Pothos is one of the easiest houseplants to grow — thrives in water or soil, and its trailing vines look beautiful on shelves or hanging baskets.", featured: true, price: 199, stockStatus: "in-stock", careLevel: "Easy", lightRequirement: "Indirect Light", petFriendly: false, tags: ["Low Maintenance", "Gift-Worthy"], images: ["money-plant-1"] },
  { slug: "peace-lily", name: "Peace Lily", category: "indoor-plants", shortDescription: "Elegant white blooms and glossy dark green leaves.", description: "Peace Lily is a top-rated air purifier that flags its watering needs by drooping slightly — hard to kill by accident and rewarding to grow.", price: 449, stockStatus: "limited-stock", careLevel: "Moderate", lightRequirement: "Indirect Light", petFriendly: false, tags: ["Air-Purifying", "Flowering"], images: ["peace-lily-1"] },
  { slug: "fiddle-leaf-fig", name: "Fiddle Leaf Fig", category: "indoor-plants", shortDescription: "Large violin-shaped leaves for a bold, editorial look.", description: "A designer favourite — the Fiddle Leaf Fig makes a dramatic architectural statement in bright rooms with consistent indirect light.", price: 1299, stockStatus: "in-stock", careLevel: "Expert", lightRequirement: "Indirect Light", tags: ["Statement Plant"], images: ["fiddle-1"] },
  { slug: "areca-palm", name: "Areca Palm", category: "outdoor-plants", shortDescription: "Feathery fronds that soften balconies, patios & entryways.", description: "Areca Palm brings a tropical, resort-like feel outdoors or in bright indoor corners, and doubles as a natural humidifier.", featured: true, price: 899, stockStatus: "in-stock", careLevel: "Moderate", lightRequirement: "Full Sun", tags: ["Air-Purifying"], images: ["areca-1"] },
  { slug: "hibiscus", name: "Hibiscus", category: "outdoor-plants", shortDescription: "Bold, vivid blooms that flower nearly year-round.", description: "A garden classic — Hibiscus rewards full sun with a continuous show of large, colourful flowers through most of the year.", price: 249, stockStatus: "in-stock", careLevel: "Easy", lightRequirement: "Full Sun", tags: ["Flowering"], images: ["hibiscus-1"] },
  { slug: "bougainvillea", name: "Bougainvillea", category: "outdoor-plants", shortDescription: "Vibrant papery bracts, perfect for gates, fences & trellises.", description: "Bougainvillea is a hardy, drought-tolerant climber that thrives on neglect in full sun — ideal for Indore's climate.", price: 299, stockStatus: "in-stock", careLevel: "Easy", lightRequirement: "Full Sun", tags: ["Flowering", "Low Maintenance"], images: ["bougain-1"] },
  { slug: "tulsi-holy-basil", name: "Tulsi (Holy Basil)", category: "outdoor-plants", shortDescription: "Sacred, fragrant and useful — a courtyard essential.", description: "Tulsi is treasured for its medicinal properties and fragrance, and grows easily in pots or garden beds with regular sun.", price: 99, stockStatus: "in-stock", careLevel: "Easy", lightRequirement: "Full Sun", tags: ["Low Maintenance"], images: ["tulsi-1"] },
  { slug: "echeveria-rosette", name: "Echeveria Rosette", category: "succulents-cacti", shortDescription: "Perfectly symmetrical rosettes in soft pastel tones.", description: "A classic desk succulent — Echeveria needs minimal water and bright light to keep its tight, colourful rosette shape.", featured: true, price: 149, stockStatus: "in-stock", careLevel: "Easy", lightRequirement: "Full Sun", tags: ["Low Maintenance", "Gift-Worthy"], images: ["echeveria-1"] },
  { slug: "golden-barrel-cactus", name: "Golden Barrel Cactus", category: "succulents-cacti", shortDescription: "A sculptural, spiky sphere that barely needs watering.", description: "Golden Barrel Cactus is an architectural accent piece that thrives on neglect — water sparingly and give it full sun.", price: 349, stockStatus: "out-of-stock", careLevel: "Easy", lightRequirement: "Full Sun", tags: ["Low Maintenance"], images: ["cactus-1"] },
  { slug: "jade-plant", name: "Jade Plant", category: "succulents-cacti", shortDescription: "Thick, glossy leaves said to bring prosperity.", description: "Jade Plant is an easy-care succulent tree that can live for decades, becoming a beautiful bonsai-like feature over time.", price: 199, stockStatus: "in-stock", careLevel: "Easy", lightRequirement: "Full Sun", tags: ["Low Maintenance", "Gift-Worthy"], images: ["jade-1"] },
  { slug: "handmade-terracotta-pot", name: "Handmade Terracotta Pot", category: "pots-accessories", shortDescription: "Breathable, classic terracotta — 8 inch diameter.", description: "Locally handmade terracotta pot with drainage hole, perfect for both indoor and outdoor plants. Natural, breathable material keeps roots healthy.", price: 179, stockStatus: "in-stock", tags: ["Locally Made"], images: ["terracotta-1"] },
  { slug: "glazed-ceramic-planter", name: "Glazed Ceramic Planter", category: "pots-accessories", shortDescription: "Matte-glazed finish in earthy sage green — 10 inch.", description: "A premium glazed ceramic planter with saucer included, designed to complement medium to large indoor plants.", price: 599, stockStatus: "in-stock", tags: ["Gift-Worthy"], images: ["ceramic-1"] },
];

async function seedSiteSettings() {
  console.log("Seeding site settings...");
  await client.createOrReplace({
    _id: "siteSettings",
    _type: "siteSettings",
    businessName: "Green Leaf Nursery",
    tagline: "Rooted in Indore, grown with care",
    whatsappNumber: "911234567890",
    whatsappGreeting:
      "Hello, I am interested in purchasing the {{product}} ({{variant}}) listed at {{price}}. Is it available?",
    heroImage: await uploadImage("nursery-hero", "hero.svg"),
    heroHeadline: "Bring nature home",
    heroSubheadline:
      "Hand-picked indoor & outdoor plants, potted with care and ready to thrive in your space.",
    address: "123 Nursery Road, Indore, Madhya Pradesh",
    phoneDisplay: "+91 12345 67890",
    instagramUrl: "https://instagram.com",
  });
  console.log(
    "  NOTE: businessName / whatsappNumber above are placeholders — update them in /studio -> Site Settings before going live.\n"
  );
}

async function seedCategories() {
  console.log("Seeding categories...");
  const idBySlug = {};
  for (const category of CATEGORIES) {
    const image = await uploadImage(category.imgSeed, `${category.slug}.svg`);
    const doc = await client.createOrReplace({
      _id: `category-${category.slug}`,
      _type: "category",
      title: category.title,
      slug: { _type: "slug", current: category.slug },
      description: category.description,
      order: category.order,
      image,
    });
    idBySlug[category.slug] = doc._id;
    console.log(`  - ${category.title}`);
  }
  return idBySlug;
}

async function seedProducts(categoryIdBySlug) {
  console.log("Seeding products...");
  for (const product of PRODUCTS) {
    const images = await Promise.all(
      product.images.map((seed, i) => uploadImage(seed, `${product.slug}-${i}.svg`))
    );
    await client.createOrReplace({
      _id: `product-${product.slug}`,
      _type: "product",
      name: product.name,
      slug: { _type: "slug", current: product.slug },
      category: { _type: "reference", _ref: categoryIdBySlug[product.category] },
      images,
      shortDescription: product.shortDescription,
      description: product.description,
      featured: Boolean(product.featured),
      price: product.price,
      compareAtPrice: product.compareAtPrice,
      stockStatus: product.stockStatus,
      variants: product.variants,
      careLevel: product.careLevel,
      lightRequirement: product.lightRequirement,
      petFriendly: product.petFriendly,
      tags: product.tags,
    });
    console.log(`  - ${product.name}`);
  }
}

async function main() {
  await seedSiteSettings();
  const categoryIdBySlug = await seedCategories();
  await seedProducts(categoryIdBySlug);
  console.log("\nDone! Visit /studio to review and edit the seeded content.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
