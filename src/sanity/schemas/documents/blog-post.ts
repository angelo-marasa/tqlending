import { defineField, defineType } from "sanity";

export const blogPost = defineType({
  name: "blogPost",
  title: "Blog Post",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title", maxLength: 96 }, validation: (rule) => rule.required() }),
    defineField({ name: "excerpt", title: "Excerpt", type: "text", rows: 3 }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Refinancing", value: "Refinancing" },
          { title: "FHA Loans", value: "FHA Loans" },
          { title: "VA Loans", value: "VA Loans" },
          { title: "Education", value: "Education" },
          { title: "Tips", value: "Tips" },
          { title: "HELOC", value: "HELOC" },
          { title: "Market Updates", value: "Market Updates" },
        ],
      },
    }),
    defineField({
      name: "featuredImage",
      title: "Featured Image",
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alt Text", type: "string" })],
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "markdown",
      description: "Write the blog post content in Markdown format",
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "reference",
      to: [{ type: "teamMember" }],
    }),
    defineField({ name: "publishDate", title: "Publish Date", type: "date", validation: (rule) => rule.required() }),
    defineField({ name: "readTime", title: "Read Time", type: "string", description: "e.g. '5 min read'" }),
    defineField({ name: "seo", title: "SEO", type: "seo" }),
  ],
  orderings: [
    {
      title: "Publish Date (Newest)",
      name: "publishDateDesc",
      by: [{ field: "publishDate", direction: "desc" }],
    },
  ],
  preview: {
    select: { title: "title", subtitle: "category", media: "featuredImage" },
  },
});
