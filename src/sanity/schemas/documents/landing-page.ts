import { defineField, defineType } from "sanity";

export const landingPage = defineType({
  name: "landingPage",
  title: "Landing Page (PPC)",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title", maxLength: 96 }, validation: (rule) => rule.required() }),
    defineField({
      name: "blocks",
      title: "Page Blocks",
      type: "array",
      of: [
        { type: "heroBlock" },
        { type: "statsCounterBlock" },
        { type: "processStepsBlock" },
        { type: "productCardsBlock" },
        { type: "testimonialsBlock" },
        { type: "trustBadgesBlock" },
        { type: "faqBlock" },
        { type: "ctaBlock" },
        { type: "leadCaptureFormBlock" },
        { type: "codeEmbedBlock" },
        { type: "richTextBlock" },
        { type: "markdownBlock" },
      ],
    }),
    defineField({ name: "seo", title: "SEO", type: "seo" }),
  ],
  preview: {
    select: { title: "title", subtitle: "slug.current" },
  },
});
