import { defineField, defineType } from "sanity";

export const markdownBlock = defineType({
  name: "markdownBlock",
  title: "Markdown",
  type: "object",
  fields: [
    defineField({
      name: "content",
      title: "Content",
      type: "markdown",
    }),
  ],
  preview: { prepare: () => ({ title: "Markdown" }) },
});
