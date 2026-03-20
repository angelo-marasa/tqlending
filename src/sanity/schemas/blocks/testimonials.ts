import { defineField, defineType } from "sanity";

export const testimonialsBlock = defineType({
  name: "testimonialsBlock",
  title: "Testimonials",
  type: "object",
  fields: [
    defineField({ name: "title", title: "Section Title", type: "string" }),
    defineField({ name: "subtitle", title: "Section Subtitle", type: "string" }),
    defineField({
      name: "testimonials",
      title: "Testimonials",
      type: "array",
      of: [{
        type: "object",
        fields: [
          defineField({ name: "name", title: "Name", type: "string" }),
          defineField({ name: "location", title: "Location", type: "string" }),
          defineField({ name: "rating", title: "Rating (1-5)", type: "number", validation: (rule) => rule.min(1).max(5) }),
          defineField({ name: "text", title: "Testimonial Text", type: "text", rows: 3 }),
          defineField({ name: "date", title: "Date", type: "string" }),
        ],
        preview: { select: { title: "name", subtitle: "location" } },
      }],
    }),
  ],
  preview: { prepare: () => ({ title: "Testimonials" }) },
});
