# Indore Nursery — Plant Catalog Website

A premium, mobile-responsive plant catalog website with WhatsApp-based
inquiries instead of a shopping cart, and a self-service content management
system so the (non-technical) nursery owner can add products, change prices,
update stock, and manage categories without touching code.

> **Note on placeholders:** business name, WhatsApp number, and demo product
> photos in this repo are placeholders. Real values go into Sanity Studio
> (`/studio`) — see [Getting Started](#getting-started).

---

## 1. Architecture Summary

```
                        ┌─────────────────────────┐
                        │        Sanity CMS         │
   Owner edits          │  (hosted, free tier)      │
   products/prices  ───▶│  • Products                │
   from a browser,      │  • Categories               │
   no code needed       │  • Site Settings             │
                        └───────────┬──────────────┘
                                    │ GROQ queries (read-only, public)
                                    ▼
                        ┌─────────────────────────┐
                        │   Next.js 14 (App Router)  │
                        │  • Server Components fetch  │
                        │    catalog data at request/  │
                        │    build time                │
                        │  • Embeds Sanity Studio at    │
                        │    /studio (same deployment)  │
                        └───────────┬──────────────┘
                                    │ generates
                                    ▼
                        ┌─────────────────────────┐
                        │   Static/SSR product pages  │
                        │  • Catalog grid              │
                        │  • Product detail             │
                        │  • "Inquire via WhatsApp"      │
                        │    buttons → wa.me deep links   │
                        └───────────┬──────────────┘
                                    │ click
                                    ▼
                             Customer's WhatsApp
                          (pre-filled inquiry message)
```

**Why this stack:**

| Concern | Choice | Why |
|---|---|---|
| Frontend | **Next.js 14 (App Router) + TypeScript + Tailwind CSS** | Fast, SEO-friendly (server-rendered/static product pages), huge ecosystem, free hosting on Vercel. |
| Backend / CMS | **Sanity.io** (hosted headless CMS) | Gives the owner a polished, non-technical visual editor out of the box — no custom admin panel, auth system, or database to build/host/secure. Generous free tier (plenty for a single nursery's catalog + images). Images are automatically optimized via Sanity's CDN. |
| "Database" | **Sanity's structured content** (documents: `product`, `category`, `siteSettings`) | Effectively a JSON document store with a real schema, versioning, and a built-in editorial UI — replaces both a traditional database *and* the admin CRUD you'd otherwise hand-write. |
| Ordering | **No cart/checkout** — WhatsApp deep links (`wa.me`) | Matches the "catalog only" requirement. Zero PCI/payment liability. Familiar UX for customers who already use WhatsApp with local businesses. |
| Hosting | **Vercel** | Zero-config Next.js deploys, free tier, auto-deploy from GitHub. |

There is **no traditional backend server to write or host** — Sanity *is* the
backend. This is deliberate: it means there's no auth system, no server code,
and no database to secure or maintain, which is what makes it realistically
"self-manageable" by a non-technical owner and low-maintenance for you.

---

## 2. CMS / "Database" Schema

Defined in [`sanity/schemaTypes/`](./sanity/schemaTypes). Three document types:

### `product` ([schema](./sanity/schemaTypes/product.ts))

| Field | Type | Notes |
|---|---|---|
| `name` | string | Required |
| `slug` | slug | Auto-generated from name, used in the product URL |
| `category` | reference → `category` | Required |
| `images` | array of image | At least 1 required; hotspot cropping enabled |
| `shortDescription` | text | Shown on product cards (max 160 chars) |
| `description` | text | Full text shown on the product page |
| `featured` | boolean | Shows the product in the homepage "Featured" section |
| `price` | number (₹) | Required. Base/default price. |
| `compareAtPrice` | number (₹) | Optional — shows a strikethrough "was" price |
| `stockStatus` | `in-stock` \| `limited-stock` \| `out-of-stock` | Drives the badge and disables the WhatsApp button when out of stock |
| `variants` | array of `{ label, price, stockStatus }` | Optional — e.g. Small/Medium/Large, each with its own price & stock. Leave empty for single-size products. |
| `careLevel` | `Easy` \| `Moderate` \| `Expert` | Optional detail shown on the product page |
| `lightRequirement` | `Low Light` \| `Indirect Light` \| `Full Sun` | Optional |
| `petFriendly` | boolean | Optional |
| `tags` | array of string | Free-form, e.g. "Air-Purifying", "Gift-Worthy" |

### `category` ([schema](./sanity/schemaTypes/category.ts))

`title`, `slug`, `description`, `image`, `order` (controls display order).

### `siteSettings` ([schema](./sanity/schemaTypes/siteSettings.ts)) — singleton

Business name, tagline, **WhatsApp number**, the **WhatsApp message
template** (with `{{product}}` / `{{variant}}` / `{{price}}` placeholders),
homepage hero image/headline/subheadline, address, phone, Instagram link.

This means the owner can change the WhatsApp number, the wording of every
inquiry message, and the homepage headline — all from the Studio, with zero
deploys.

---

## 3. "Backend API" — How Reads & Writes Work

There are intentionally **no hand-written REST/CRUD endpoints**. Sanity
provides a hosted, authenticated Content API automatically for every schema
you define:

- **Writes (create/update/delete a product, change a price, toggle stock,
  add a category):** done visually in Sanity Studio at **`/studio`**, which
  is embedded directly into this Next.js app (see
  [`app/studio/[[...tool]]/page.tsx`](./app/studio/%5B%5B...tool%5D%5D/page.tsx)
  and [`sanity.config.ts`](./sanity.config.ts)). Under the hood this calls
  Sanity's Mutate API — you never touch it directly.
- **Reads (rendering the catalog):** the frontend queries Sanity with GROQ
  (Sanity's query language) via [`lib/sanity/queries.ts`](./lib/sanity/queries.ts)
  and [`lib/data.ts`](./lib/data.ts). Key queries:

  | Query | Used by |
  |---|---|
  | `ALL_PRODUCTS_QUERY` | `/catalog` |
  | `PRODUCTS_BY_CATEGORY_QUERY` | `/catalog/[category]` |
  | `PRODUCT_BY_SLUG_QUERY` | `/product/[slug]` |
  | `FEATURED_PRODUCTS_QUERY` | Homepage |
  | `RELATED_PRODUCTS_QUERY` | "You may also like" on product page |
  | `ALL_CATEGORIES_QUERY` | Category pills, homepage category grid |
  | `SITE_SETTINGS_QUERY` | Header, footer, hero, WhatsApp number/template |

  All of these are read-only and safe to expose publicly (Sanity's default
  dataset visibility is used — no secret token needed for reads).

- **Local demo fallback:** [`lib/data.ts`](./lib/data.ts) transparently falls
  back to [`lib/demo-data.ts`](./lib/demo-data.ts) when
  `NEXT_PUBLIC_SANITY_PROJECT_ID` isn't set, so `npm run dev` works
  immediately out of the box, before you've connected a real Sanity project.

If you ever *do* want custom server logic (e.g. a contact form that emails
you), add a Next.js Route Handler under `app/api/*` — the project structure
supports it — but nothing in the current requirements needs one.

---

## 4. WhatsApp Integration

Core logic lives in [`lib/whatsapp.ts`](./lib/whatsapp.ts):

```ts
buildWhatsAppMessage(product, variant, template)
// "Hello, I am interested in purchasing the Monstera Deliciosa (Medium size)
//  listed at ₹799. Is it available?"

buildWhatsAppLink(whatsappNumber, message)
// "https://wa.me/919876543210?text=Hello%2C%20I%20am%20interested..."

getProductWhatsAppLink(whatsappNumber, product, variant, template)
// convenience wrapper combining both
```

- The message **template is editable by the owner** in Sanity (`siteSettings.whatsappGreeting`), using `{{product}}`, `{{variant}}`, `{{price}}` placeholders.
- Price is formatted as Indian Rupees (`₹799`) via `Intl.NumberFormat("en-IN", ...)`.
- The button is **disabled automatically** when a product (or the selected
  variant) is out of stock.
- Used in three places:
  - [`components/ProductCard.tsx`](./components/ProductCard.tsx) — catalog grid cards (uses base price)
  - [`components/ProductInquiryPanel.tsx`](./components/ProductInquiryPanel.tsx) — product detail page (client component; recalculates the link live as the shopper picks a size/variant)
  - [`components/Header.tsx`](./components/Header.tsx) — a general "Chat With Us" button in the site header

---

## 5. Frontend Structure

```
app/
  layout.tsx                 Root layout — fonts, header, footer, metadata
  page.tsx                   Homepage — hero, featured products, category grid
  catalog/page.tsx           All products + category filter pills
  catalog/[category]/page.tsx  Products filtered by one category
  product/[slug]/page.tsx    Product detail — gallery, variant picker, WhatsApp CTA, related products
  studio/[[...tool]]/page.tsx  Embedded Sanity Studio (owner's admin UI) at /studio
  not-found.tsx               404 page

components/
  Header.tsx / Footer.tsx / Hero.tsx
  ProductGrid.tsx             Responsive catalog grid (2/3/4 columns)
  ProductCard.tsx             Product card: image, price, stock badge, WhatsApp button
  ProductInquiryPanel.tsx     Client component: variant selector + live WhatsApp link (product page)
  CategoryPills.tsx           Category filter navigation
  WhatsAppButton.tsx          Reusable styled WhatsApp CTA (solid/outline/compact)
  PriceTag.tsx / StockBadge.tsx

lib/
  whatsapp.ts                 WhatsApp message + link generator (see §4)
  data.ts                     Data access layer (Sanity or demo fallback)
  types.ts                    Normalized ProductView/CategoryView/SiteSettingsView types
  demo-data.ts                Fallback demo catalog (~14 products)
  sanity/                     Sanity client, GROQ queries, image URL builder, type mappers

sanity/
  schemaTypes/                product.ts, category.ts, siteSettings.ts
  structure.ts                Custom Studio sidebar layout
```

**Design system:** emerald green + soft earth-tone palette, `Fraunces`
(serif, display headings) + `Inter` (body text), generous whitespace,
rounded cards with soft shadows, defined in
[`tailwind.config.ts`](./tailwind.config.ts). Fully responsive: 2-column
product grid on mobile, up to 4 columns on large screens.

---

## 6. Getting Started

### Run locally with demo data (no setup required)

```bash
npm install
npm run dev
```

Open http://localhost:3000 — the site runs immediately on the built-in demo
catalog (`lib/demo-data.ts`). This is enough to preview design/UX before
connecting a real CMS.

### Connect your real Sanity project

1. **Create a free Sanity project:** go to https://www.sanity.io/manage →
   "Create project". Note the **Project ID** it gives you.
2. **Copy env vars:**
   ```bash
   cp .env.local.example .env.local
   ```
   Fill in `NEXT_PUBLIC_SANITY_PROJECT_ID` (and leave `NEXT_PUBLIC_SANITY_DATASET=production`).
3. **Create a write token** (only needed to run the seed script): in the
   Sanity dashboard → your project → API → Tokens → "Add API token" → name it
   "Seed script", permission **Editor** → paste it into `.env.local` as
   `SANITY_API_WRITE_TOKEN`.
4. **Seed demo content into your real project (optional but recommended):**
   ```bash
   npm run seed
   ```
   This creates the site settings doc, 4 categories, and 14 demo products
   with placeholder photos directly in your Sanity dataset — a starting
   point the owner can then edit/replace.
5. **Run the app:**
   ```bash
   npm run dev
   ```
   The site now reads live from your Sanity project. Visit
   **http://localhost:3000/studio** to open the content editor.
6. **Update the real business details:** in `/studio` → **Site Settings** →
   set the real business name and **WhatsApp number** (digits only, with
   country code, e.g. `919876543210` for `+91 98765 43210`). Replace the
   demo products/categories with real ones (or edit the seeded ones in
   place) and upload real photos.

### Deploy to Vercel

1. Push this repository to GitHub (already done if you're reading this on
   the deploy branch).
2. Go to https://vercel.com/new, import the repo.
3. Add the same environment variables from `.env.local`
   (`NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`,
   `NEXT_PUBLIC_SANITY_API_VERSION`) in the Vercel project settings. The
   `SANITY_API_WRITE_TOKEN` is only needed locally to run `npm run seed` —
   you don't need to add it to Vercel.
4. Deploy. Every push to the connected branch auto-deploys.
5. In Sanity's dashboard → your project → API → CORS Origins, add your
   Vercel URL (and `http://localhost:3000` for local dev) so the embedded
   Studio and frontend are allowed to talk to your dataset.

### Owner's day-to-day workflow (no code, no deploys required)

1. Go to `yoursite.com/studio` and log in (Sanity handles auth/invites —
   you can invite the owner's email as an "Editor" from sanity.io/manage
   without giving them any code/hosting access).
2. **Add a product:** Products → "+" → fill in name, category, photos,
   price, stock status → Publish. It appears on the live site within
   seconds — no rebuild/redeploy needed (Sanity content is fetched at
   request time in production).
3. **Change a price / mark out of stock:** open the product, edit
   `Price` or `Stock Status`, Publish.
4. **Add/rename a category:** Categories → "+" or edit existing.
5. **Change the WhatsApp number or message wording:** Site Settings →
   update `WhatsApp Number` / `WhatsApp Message Template`, Publish.

---

## 7. Scripts

| Command | Purpose |
|---|---|
| `npm run dev` | Local dev server |
| `npm run build` | Production build |
| `npm run start` | Run the production build locally |
| `npm run lint` | Next.js/ESLint checks |
| `npm run typecheck` | TypeScript checks, no emit |
| `npm run generate-placeholders` | Regenerate the local demo placeholder images in `public/demo/` |
| `npm run seed` | Populate a connected Sanity dataset with demo content (see §6) |

---

## 8. Explicitly Out of Scope (by design)

- No shopping cart, checkout, or payment gateway — orders are confirmed via
  WhatsApp conversation, per the "catalog only" requirement.
- No customer accounts/login.
- No custom-built admin dashboard — Sanity Studio *is* the admin panel.
