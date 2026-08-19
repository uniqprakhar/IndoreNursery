export type StockStatus = "in-stock" | "limited-stock" | "out-of-stock";

export interface Variant {
  label: string;
  price: number;
  stockStatus: StockStatus;
}

// Normalized shape every component/page works with, regardless of whether
// the data came from Sanity or the local demo fallback dataset.
export interface ProductView {
  id: string;
  name: string;
  slug: string;
  categoryTitle: string;
  categorySlug: string;
  images: string[];
  shortDescription?: string;
  description?: string;
  featured?: boolean;
  price: number;
  compareAtPrice?: number;
  stockStatus: StockStatus;
  variants?: Variant[];
  careLevel?: "Easy" | "Moderate" | "Expert";
  lightRequirement?: "Low Light" | "Indirect Light" | "Full Sun";
  petFriendly?: boolean;
  tags?: string[];
}

export interface CategoryView {
  id: string;
  title: string;
  slug: string;
  description?: string;
  image?: string;
  order?: number;
}

export interface SiteSettingsView {
  businessName: string;
  tagline?: string;
  whatsappNumber: string;
  whatsappGreeting: string;
  heroImage?: string;
  heroHeadline?: string;
  heroSubheadline?: string;
  address?: string;
  phoneDisplay?: string;
  instagramUrl?: string;
}
