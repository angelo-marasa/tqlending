import { defineField, defineType } from "sanity";

export const seo = defineType({
  name: "seo",
  title: "SEO",
  type: "object",
  fields: [
    defineField({
      name: "metaTitle",
      title: "Meta Title",
      type: "string",
      description:
        "Override the page title for search engines (max 60 characters)",
      validation: (rule) =>
        rule
          .max(60)
          .warning(
            "Meta titles over 60 characters may be truncated in search results",
          ),
    }),
    defineField({
      name: "metaDescription",
      title: "Meta Description",
      type: "text",
      rows: 3,
      description: "Description shown in search results (max 160 characters)",
      validation: (rule) =>
        rule
          .max(160)
          .warning(
            "Meta descriptions over 160 characters may be truncated",
          ),
    }),
    defineField({
      name: "ogImage",
      title: "Open Graph Image",
      type: "image",
      description:
        "Image shown when shared on social media (1200x630 recommended)",
      options: { hotspot: true },
    }),
    defineField({
      name: "canonicalUrl",
      title: "Canonical URL",
      type: "url",
      description:
        "Override the canonical URL if this page has a preferred version elsewhere",
    }),
    defineField({
      name: "noIndex",
      title: "No Index",
      type: "boolean",
      description: "Hide this page from search engines",
      initialValue: false,
    }),
  ],
});
