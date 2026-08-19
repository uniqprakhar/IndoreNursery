export type StockStatus = "in-stock" | "limited-stock" | "out-of-stock";

export interface SanityImageRef {
  asset: { _ref: string; _type: "reference" };
  _type: "image";
}

export interface Category {
  _id: string;
  title: string;
  slug: string;
  description?: string;
  image?: SanityImageRef;
  order?: number;
}

export interface Variant {
  label: string;
  price: number;
  stockStatus: StockStatus;
}

export interface Product {
  _id: string;
  name: string;
  slug: string;
  category: { title: string; slug: string } | null;
  images: SanityImageRef[];
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

export interface SiteSettings {
  businessName: string;
  tagline?: string;
  whatsappNumber: string;
  whatsappGreeting?: string;
  heroImage?: SanityImageRef;
  heroHeadline?: string;
  heroSubheadline?: string;
  address?: string;
  phoneDisplay?: string;
  instagramUrl?: string;
}
