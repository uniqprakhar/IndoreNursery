import { defineField, defineType } from "sanity";

export const STOCK_STATUS_OPTIONS = [
  { title: "In Stock", value: "in-stock" },
  { title: "Limited Stock", value: "limited-stock" },
  { title: "Out of Stock", value: "out-of-stock" },
];

export default defineType({
  name: "product",
  title: "Product",
  type: "document",
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "pricing", title: "Pricing & Stock" },
    { name: "details", title: "Plant Details" },
  ],
  fields: [
    defineField({
      name: "name",
      title: "Product Name",
      type: "string",
      group: "content",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "content",
      options: { source: "name", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "reference",
      to: [{ type: "category" }],
      group: "content",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "images",
      title: "Photos",
      type: "array",
      group: "content",
      of: [{ type: "image", options: { hotspot: true } }],
      validation: (Rule) => Rule.min(1).error("Add at least one photo."),
    }),
    defineField({
      name: "shortDescription",
      title: "Short Description",
      type: "text",
      group: "content",
      rows: 2,
      description: "One or two lines shown on the product card.",
      validation: (Rule) => Rule.max(160),
    }),
    defineField({
      name: "description",
      title: "Full Description",
      type: "text",
      group: "content",
      rows: 6,
      description: "Shown on the product detail page.",
    }),
    defineField({
      name: "featured",
      title: "Featured on Homepage",
      type: "boolean",
      group: "content",
      initialValue: false,
    }),

    // Pricing & stock
    defineField({
      name: "price",
      title: "Price (₹)",
      type: "number",
      group: "pricing",
      description: "Base price shown on the catalog. Used in the WhatsApp inquiry message.",
      validation: (Rule) => Rule.required().positive(),
    }),
    defineField({
      name: "compareAtPrice",
      title: "Original Price (₹) — optional",
      type: "number",
      group: "pricing",
      description: "Set this higher than Price to show a strikethrough discount.",
      validation: (Rule) => Rule.positive(),
    }),
    defineField({
      name: "stockStatus",
      title: "Stock Status",
      type: "string",
      group: "pricing",
      options: { list: STOCK_STATUS_OPTIONS, layout: "radio" },
      initialValue: "in-stock",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "variants",
      title: "Size / Variant Options",
      type: "array",
      group: "pricing",
      description:
        "Optional. Add different sizes (e.g. Small, Medium, Large) each with its own price and stock status. Leave empty for a single-size product.",
      of: [
        {
          type: "object",
          name: "variant",
          fields: [
            defineField({ name: "label", title: "Size / Variant Label", type: "string", validation: (Rule) => Rule.required() }),
            defineField({ name: "price", title: "Price (₹)", type: "number", validation: (Rule) => Rule.required().positive() }),
            defineField({
              name: "stockStatus",
              title: "Stock Status",
              type: "string",
              options: { list: STOCK_STATUS_OPTIONS },
              initialValue: "in-stock",
            }),
          ],
          preview: {
            select: { title: "label", subtitle: "price" },
            prepare({ title, subtitle }) {
              return { title, subtitle: subtitle ? `₹${subtitle}` : "" };
            },
          },
        },
      ],
    }),

    // Plant details
    defineField({
      name: "careLevel",
      title: "Care Level",
      type: "string",
      group: "details",
      options: { list: ["Easy", "Moderate", "Expert"] },
    }),
    defineField({
      name: "lightRequirement",
      title: "Light Requirement",
      type: "string",
      group: "details",
      options: { list: ["Low Light", "Indirect Light", "Full Sun"] },
    }),
    defineField({
      name: "petFriendly",
      title: "Pet Friendly",
      type: "boolean",
      group: "details",
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      group: "details",
      of: [{ type: "string" }],
      options: { layout: "tags" },
      description: "e.g. Air-Purifying, Low Maintenance, Flowering, Gift-Worthy",
    }),
  ],
  preview: {
    select: { title: "name", media: "images.0", subtitle: "price" },
    prepare({ title, media, subtitle }) {
      return { title, media, subtitle: subtitle ? `₹${subtitle}` : "" };
    },
  },
});
