import { defineField, defineType } from "sanity";

export const codeEmbedBlock = defineType({
  name: "codeEmbedBlock",
  title: "Code Embed",
  type: "object",
  fields: [
    defineField({ name: "title", title: "Label (internal)", type: "string" }),
    defineField({ name: "code", title: "Embed Code", type: "text", rows: 10, description: "Paste script tags or embed code here" }),
  ],
  preview: {
    select: { title: "title" },
    prepare: ({ title }) => ({ title: title || "Code Embed", subtitle: "Embedded Script" }),
  },
});
