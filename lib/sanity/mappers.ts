import { urlForImage } from "./image";
import type { Category, Product, SiteSettings } from "./types";
import type { CategoryView, ProductView, SiteSettingsView } from "../types";

export function mapProduct(product: Product): ProductView {
  return {
    id: product._id,
    name: product.name,
    slug: product.slug,
    categoryTitle: product.category?.title ?? "Uncategorized",
    categorySlug: product.category?.slug ?? "",
    images: (product.images ?? [])
      .map((img) => urlForImage(img)?.width(800).height(1000).fit("crop").url())
      .filter((url): url is string => Boolean(url)),
    shortDescription: product.shortDescription,
    description: product.description,
    featured: product.featured,
    price: product.price,
    compareAtPrice: product.compareAtPrice,
    stockStatus: product.stockStatus,
    variants: product.variants,
    careLevel: product.careLevel,
    lightRequirement: product.lightRequirement,
    petFriendly: product.petFriendly,
    tags: product.tags,
  };
}

export function mapCategory(category: Category): CategoryView {
  return {
    id: category._id,
    title: category.title,
    slug: category.slug,
    description: category.description,
    image: urlForImage(category.image)?.width(800).height(600).fit("crop").url(),
    order: category.order,
  };
}

export function mapSiteSettings(settings: SiteSettings): SiteSettingsView {
  return {
    businessName: settings.businessName,
    tagline: settings.tagline,
    whatsappNumber: settings.whatsappNumber,
    whatsappGreeting:
      settings.whatsappGreeting ||
      "Hello, I am interested in purchasing the {{product}} ({{variant}}) listed at {{price}}. Is it available?",
    heroImage: urlForImage(settings.heroImage)?.width(1600).height(1000).fit("crop").url(),
    heroHeadline: settings.heroHeadline,
    heroSubheadline: settings.heroSubheadline,
    address: settings.address,
    phoneDisplay: settings.phoneDisplay,
    instagramUrl: settings.instagramUrl,
  };
}
