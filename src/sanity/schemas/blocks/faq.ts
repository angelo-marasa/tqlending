import { defineField, defineType } from "sanity";

export const faqBlock = defineType({
  name: "faqBlock",
  title: "FAQ",
  type: "object",
  fields: [
    defineField({ name: "title", title: "Section Title", type: "string" }),
    defineField({ name: "subtitle", title: "Section Subtitle", type: "string" }),
    defineField({
      name: "faqs",
      title: "FAQ Items",
      type: "array",
      of: [{
        type: "object",
        fields: [
          defineField({ name: "question", title: "Question", type: "string" }),
          defineField({ name: "answer", title: "Answer", type: "text", rows: 4 }),
        ],
        preview: { select: { title: "question" } },
      }],
    }),
  ],
  preview: { prepare: () => ({ title: "FAQ Section" }) },
});
