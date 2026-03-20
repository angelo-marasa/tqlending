import { defineField, defineType } from "sanity";

export const guide = defineType({
  name: "guide",
  title: "Guide / Whitepaper",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title", maxLength: 96 }, validation: (rule) => rule.required() }),
    defineField({ name: "description", title: "Description", type: "text", rows: 3 }),
    defineField({ name: "coverImage", title: "Cover Image", type: "image", options: { hotspot: true } }),
    defineField({ name: "pdfFile", title: "PDF File", type: "file", options: { accept: ".pdf" } }),
    defineField({ name: "pages", title: "Page Count", type: "string" }),
    defineField({ name: "seo", title: "SEO", type: "seo" }),
  ],
  preview: {
    select: { title: "title", pages: "pages" },
    prepare: ({ title, pages }) => ({ title, subtitle: pages ? `${pages} pages` : undefined }),
  },
});
