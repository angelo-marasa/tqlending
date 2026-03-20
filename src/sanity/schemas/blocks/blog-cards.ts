import { defineField, defineType } from "sanity";

export const blogCardsBlock = defineType({
  name: "blogCardsBlock",
  title: "Blog Cards",
  type: "object",
  fields: [
    defineField({ name: "title", title: "Section Title", type: "string" }),
    defineField({ name: "subtitle", title: "Section Subtitle", type: "string" }),
    defineField({ name: "limit", title: "Number to Display", type: "number", initialValue: 3 }),
    defineField({ name: "category", title: "Filter by Category", type: "string", options: { list: ["Refinancing", "FHA Loans", "VA Loans", "Education", "Tips", "HELOC", "Market Updates"] } }),
    defineField({ name: "showViewAll", title: "Show View All Link", type: "boolean", initialValue: true }),
  ],
  preview: { prepare: () => ({ title: "Blog Cards" }) },
});
