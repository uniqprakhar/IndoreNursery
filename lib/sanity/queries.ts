import { groq } from "next-sanity";

const productFields = groq`
  _id,
  name,
  "slug": slug.current,
  "category": category->{ title, "slug": slug.current },
  images,
  shortDescription,
  description,
  featured,
  price,
  compareAtPrice,
  stockStatus,
  variants,
  careLevel,
  lightRequirement,
  petFriendly,
  tags
`;

export const ALL_CATEGORIES_QUERY = groq`
  *[_type == "category"] | order(order asc, title asc) {
    _id,
    title,
    "slug": slug.current,
    description,
    image,
    order
  }
`;

export const ALL_PRODUCTS_QUERY = groq`
  *[_type == "product"] | order(name asc) {
    ${productFields}
  }
`;

export const FEATURED_PRODUCTS_QUERY = groq`
  *[_type == "product" && featured == true] | order(name asc) [0...8] {
    ${productFields}
  }
`;

export const PRODUCTS_BY_CATEGORY_QUERY = groq`
  *[_type == "product" && category->slug.current == $categorySlug] | order(name asc) {
    ${productFields}
  }
`;

export const PRODUCT_BY_SLUG_QUERY = groq`
  *[_type == "product" && slug.current == $slug][0] {
    ${productFields}
  }
`;

export const RELATED_PRODUCTS_QUERY = groq`
  *[_type == "product" && category->slug.current == $categorySlug && slug.current != $slug] | order(name asc) [0...4] {
    ${productFields}
  }
`;

export const SITE_SETTINGS_QUERY = groq`
  *[_type == "siteSettings"][0] {
    businessName,
    tagline,
    whatsappNumber,
    whatsappGreeting,
    heroImage,
    heroHeadline,
    heroSubheadline,
    address,
    phoneDisplay,
    instagramUrl
  }
`;
