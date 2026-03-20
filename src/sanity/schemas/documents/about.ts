import { defineField, defineType } from "sanity";

export const about = defineType({
  name: "about",
  title: "About Page",
  type: "document",
  fields: [
    defineField({ name: "missionTitle", title: "Mission Title", type: "string", initialValue: "Making Homeownership Accessible" }),
    defineField({ name: "missionText", title: "Mission Text", type: "text", rows: 6 }),
    defineField({
      name: "blocks",
      title: "Page Blocks",
      type: "array",
      of: [
        { type: "heroBlock" },
        { type: "statsCounterBlock" },
        { type: "processStepsBlock" },
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
  preview: { prepare: () => ({ title: "About Page" }) },
});
