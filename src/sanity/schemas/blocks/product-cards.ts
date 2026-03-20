import { defineField, defineType } from "sanity";

export const productCardsBlock = defineType({
  name: "productCardsBlock",
  title: "Product Cards",
  type: "object",
  fields: [
    defineField({ name: "title", title: "Section Title", type: "string" }),
    defineField({ name: "subtitle", title: "Section Subtitle", type: "string" }),
    defineField({ name: "showAll", title: "Show All Products", type: "boolean", initialValue: true }),
  ],
  preview: { prepare: () => ({ title: "Product Cards" }) },
});
