import { defineField, defineType } from "sanity";

export const heroBlock = defineType({
  name: "heroBlock",
  title: "Hero",
  type: "object",
  fields: [
    defineField({ name: "headline", title: "Headline", type: "string" }),
    defineField({ name: "subheadline", title: "Subheadline", type: "string" }),
    defineField({ name: "description", title: "Description", type: "text", rows: 2 }),
    defineField({ name: "ctaText", title: "CTA Button Text", type: "string", initialValue: "Check Your Rates" }),
    defineField({ name: "ctaHref", title: "CTA Button Link", type: "string", initialValue: "/apply" }),
    defineField({ name: "variant", title: "Variant", type: "string", options: { list: ["home", "product", "page"] }, initialValue: "home" }),
    defineField({ name: "showForm", title: "Show ZIP Code Form", type: "boolean", initialValue: true }),
    defineField({ name: "showStats", title: "Show Inline Stats", type: "boolean", initialValue: true }),
    defineField({ name: "backgroundImage", title: "Background Image", type: "image", options: { hotspot: true } }),
  ],
  preview: {
    select: { title: "headline" },
    prepare: ({ title }) => ({ title: title || "Hero", subtitle: "Hero Section" }),
  },
});
