// Generates local SVG placeholder "photos" for the demo catalog, so the site
// never depends on an external image host (works offline, on any deploy
// target, with no rate limits). Run with: node scripts/generate-placeholders.mjs
// Output goes to public/demo/*.svg — referenced by lib/demo-data.ts and
// uploaded as seed content by scripts/seed.mjs.

import { mkdirSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, "..", "public", "demo");
mkdirSync(outDir, { recursive: true });

// Earthy / emerald palette pairs: [background, accent]
const PALETTES = [
  ["#e7f0e6", "#2f6b4f"],
  ["#f3ece1", "#a67c47"],
  ["#e3ede9", "#1f5c46"],
  ["#f0e6d8", "#8a6338"],
  ["#dcebe1", "#215d43"],
  ["#efe4d3", "#6f4e2e"],
];

function paletteFor(seed) {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  return PALETTES[hash % PALETTES.length];
}

function leafPath(cx, cy, scale, color) {
  return `<g transform="translate(${cx} ${cy}) scale(${scale})" fill="${color}" opacity="0.9">
    <path d="M0 -60 C 34 -60 60 -34 60 0 C 60 34 34 60 0 60 C -34 60 -60 34 -60 0 C -60 -34 -34 -60 0 -60 Z" opacity="0.15"/>
    <path d="M0 -46 C 20 -30 26 -6 14 18 C 8 30 -4 40 -18 42 C -20 20 -14 -4 0 -22 C -8 -12 -14 0 -16 14 C -22 4 -22 -14 -12 -28 C -6 -38 4 -44 0 -46 Z"/>
  </g>`;
}

function makeSvg({ width, height, label, sublabel }) {
  const [bg, accent] = paletteFor(label);
  const fontSize = Math.round(width * 0.045);
  const subFontSize = Math.round(width * 0.028);

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${bg}"/>
      <stop offset="1" stop-color="#ffffff"/>
    </linearGradient>
  </defs>
  <rect width="${width}" height="${height}" fill="url(#g)"/>
  ${leafPath(width / 2, height * 0.42, width / 260, accent)}
  <text x="50%" y="${height * 0.72}" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="${fontSize}" fill="${accent}" font-weight="600">${label}</text>
  ${sublabel ? `<text x="50%" y="${height * 0.72 + subFontSize * 1.6}" text-anchor="middle" font-family="Arial, sans-serif" font-size="${subFontSize}" fill="${accent}" opacity="0.7">${sublabel}</text>` : ""}
</svg>`;
}

const ENTRIES = [
  { seed: "nursery-hero", label: "Green Leaf Nursery", sublabel: "Indore", width: 1600, height: 1000 },
  { seed: "indoor-cat", label: "Indoor Plants", width: 800, height: 600 },
  { seed: "outdoor-cat", label: "Outdoor Plants", width: 800, height: 600 },
  { seed: "succulent-cat", label: "Succulents & Cacti", width: 800, height: 600 },
  { seed: "pots-cat", label: "Pots & Accessories", width: 800, height: 600 },
  { seed: "monstera-1", label: "Monstera Deliciosa", sublabel: "Photo 1", width: 800, height: 1000 },
  { seed: "monstera-2", label: "Monstera Deliciosa", sublabel: "Photo 2", width: 800, height: 1000 },
  { seed: "snake-1", label: "Snake Plant", sublabel: "Photo 1", width: 800, height: 1000 },
  { seed: "snake-2", label: "Snake Plant", sublabel: "Photo 2", width: 800, height: 1000 },
  { seed: "money-plant-1", label: "Golden Pothos", width: 800, height: 1000 },
  { seed: "peace-lily-1", label: "Peace Lily", width: 800, height: 1000 },
  { seed: "fiddle-1", label: "Fiddle Leaf Fig", width: 800, height: 1000 },
  { seed: "areca-1", label: "Areca Palm", width: 800, height: 1000 },
  { seed: "hibiscus-1", label: "Hibiscus", width: 800, height: 1000 },
  { seed: "bougain-1", label: "Bougainvillea", width: 800, height: 1000 },
  { seed: "tulsi-1", label: "Tulsi", width: 800, height: 1000 },
  { seed: "echeveria-1", label: "Echeveria", width: 800, height: 1000 },
  { seed: "cactus-1", label: "Golden Barrel Cactus", width: 800, height: 1000 },
  { seed: "jade-1", label: "Jade Plant", width: 800, height: 1000 },
  { seed: "terracotta-1", label: "Terracotta Pot", width: 800, height: 1000 },
  { seed: "ceramic-1", label: "Ceramic Planter", width: 800, height: 1000 },
];

for (const entry of ENTRIES) {
  const svg = makeSvg(entry);
  writeFileSync(path.join(outDir, `${entry.seed}.svg`), svg, "utf8");
}

console.log(`Generated ${ENTRIES.length} placeholder images in public/demo/`);
