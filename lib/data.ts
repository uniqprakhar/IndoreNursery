import { client, isSanityConfigured } from "./sanity/client";
import {
  ALL_CATEGORIES_QUERY,
  ALL_PRODUCTS_QUERY,
  FEATURED_PRODUCTS_QUERY,
  PRODUCT_BY_SLUG_QUERY,
  PRODUCTS_BY_CATEGORY_QUERY,
  RELATED_PRODUCTS_QUERY,
  SITE_SETTINGS_QUERY,
} from "./sanity/queries";
import { mapCategory, mapProduct, mapSiteSettings } from "./sanity/mappers";
import type { Category, Product, SiteSettings } from "./sanity/types";
import {
  DEMO_CATEGORIES,
  DEMO_PRODUCTS,
  DEMO_SITE_SETTINGS,
  getDemoFeaturedProducts,
  getDemoProductBySlug,
  getDemoProductsByCategory,
  getDemoRelatedProducts,
} from "./demo-data";
import type { CategoryView, ProductView, SiteSettingsView } from "./types";

// Every function below reads from Sanity when NEXT_PUBLIC_SANITY_PROJECT_ID is
// set, and transparently falls back to the local demo dataset otherwise —
// so the site works immediately, and switches to live CMS content the
// moment Sanity is connected. See README.md for setup.

export async function getAllCategories(): Promise<CategoryView[]> {
  if (!isSanityConfigured) return DEMO_CATEGORIES;
  const categories = await client.fetch<Category[]>(ALL_CATEGORIES_QUERY);
  return categories.map(mapCategory);
}

export async function getAllProducts(): Promise<ProductView[]> {
  if (!isSanityConfigured) return DEMO_PRODUCTS;
  const products = await client.fetch<Product[]>(ALL_PRODUCTS_QUERY);
  return products.map(mapProduct);
}

export async function getFeaturedProducts(): Promise<ProductView[]> {
  if (!isSanityConfigured) return getDemoFeaturedProducts();
  const products = await client.fetch<Product[]>(FEATURED_PRODUCTS_QUERY);
  return products.map(mapProduct);
}

export async function getProductsByCategory(categorySlug: string): Promise<ProductView[]> {
  if (!isSanityConfigured) return getDemoProductsByCategory(categorySlug);
  const products = await client.fetch<Product[]>(PRODUCTS_BY_CATEGORY_QUERY, { categorySlug });
  return products.map(mapProduct);
}

export async function getProductBySlug(slug: string): Promise<ProductView | undefined> {
  if (!isSanityConfigured) return getDemoProductBySlug(slug);
  const product = await client.fetch<Product | null>(PRODUCT_BY_SLUG_QUERY, { slug });
  return product ? mapProduct(product) : undefined;
}

export async function getRelatedProducts(categorySlug: string, slug: string): Promise<ProductView[]> {
  if (!isSanityConfigured) return getDemoRelatedProducts(categorySlug, slug);
  const products = await client.fetch<Product[]>(RELATED_PRODUCTS_QUERY, { categorySlug, slug });
  return products.map(mapProduct);
}

export async function getSiteSettings(): Promise<SiteSettingsView> {
  if (!isSanityConfigured) return DEMO_SITE_SETTINGS;
  const settings = await client.fetch<SiteSettings | null>(SITE_SETTINGS_QUERY);
  return settings ? mapSiteSettings(settings) : DEMO_SITE_SETTINGS;
}
