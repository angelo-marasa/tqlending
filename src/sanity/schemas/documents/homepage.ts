import { defineField, defineType } from "sanity";

export const homepage = defineType({
  name: "homepage",
  title: "Homepage",
  type: "document",
  fields: [
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
        { type: "blogCardsBlock" },
        { type: "faqBlock" },
        { type: "ctaBlock" },
        { type: "leadCaptureFormBlock" },
        { type: "guideDownloadBlock" },
        { type: "codeEmbedBlock" },
        { type: "richTextBlock" },
        { type: "markdownBlock" },
      ],
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
    }),
  ],
  preview: {
    prepare: () => ({ title: "Homepage" }),
  },
});
