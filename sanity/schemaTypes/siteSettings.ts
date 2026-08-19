import { defineField, defineType } from "sanity";

export default defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "businessName",
      title: "Business Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
      description: "Shown under the business name in the header/hero.",
    }),
    defineField({
      name: "whatsappNumber",
      title: "WhatsApp Number",
      type: "string",
      description:
        "Full number with country code, digits only (e.g. 919876543210 for +91 98765 43210). Used to build every 'Inquire via WhatsApp' link.",
      validation: (Rule) =>
        Rule.required().regex(/^\d{10,15}$/, {
          name: "digits-only",
          invert: false,
        }).error("Enter digits only, with country code, no + or spaces (e.g. 919876543210)."),
    }),
    defineField({
      name: "whatsappGreeting",
      title: "WhatsApp Message Template",
      type: "text",
      rows: 3,
      description:
        "Use {{product}}, {{variant}}, {{price}} as placeholders. Example: \"Hello, I am interested in purchasing the {{product}} ({{variant}}) listed at {{price}}. Is it available?\"",
      initialValue:
        "Hello, I am interested in purchasing the {{product}} ({{variant}}) listed at {{price}}. Is it available?",
    }),
    defineField({
      name: "heroImage",
      title: "Homepage Hero Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "heroHeadline",
      title: "Homepage Hero Headline",
      type: "string",
    }),
    defineField({
      name: "heroSubheadline",
      title: "Homepage Hero Subheadline",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "address",
      title: "Nursery Address",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "phoneDisplay",
      title: "Phone Number (display only)",
      type: "string",
    }),
    defineField({
      name: "instagramUrl",
      title: "Instagram URL",
      type: "url",
    }),
  ],
  preview: {
    select: { title: "businessName" },
  },
});
