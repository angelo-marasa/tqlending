import { defineField, defineType } from "sanity";

export const processStepsBlock = defineType({
  name: "processStepsBlock",
  title: "Process Steps",
  type: "object",
  fields: [
    defineField({ name: "title", title: "Section Title", type: "string" }),
    defineField({ name: "subtitle", title: "Section Subtitle", type: "string" }),
    defineField({
      name: "steps",
      title: "Steps",
      type: "array",
      of: [{
        type: "object",
        fields: [
          defineField({ name: "step", title: "Step Number", type: "number" }),
          defineField({ name: "title", title: "Title", type: "string" }),
          defineField({ name: "description", title: "Description", type: "text", rows: 2 }),
        ],
        preview: { select: { title: "title", subtitle: "step" } },
      }],
    }),
  ],
  preview: { prepare: () => ({ title: "Process Steps" }) },
});
