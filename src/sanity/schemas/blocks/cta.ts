import { defineField, defineType } from "sanity";

export const ctaBlock = defineType({
  name: "ctaBlock",
  title: "Call to Action",
  type: "object",
  fields: [
    defineField({ name: "title", title: "Heading", type: "string" }),
    defineField({ name: "description", title: "Description", type: "text", rows: 2 }),
    defineField({ name: "primaryText", title: "Button Text", type: "string", initialValue: "Check Your Rates" }),
    defineField({ name: "primaryHref", title: "Button Link", type: "string", initialValue: "/apply" }),
    defineField({ name: "showPhone", title: "Show Phone Number", type: "boolean", initialValue: true }),
    defineField({ name: "variant", title: "Variant", type: "string", options: { list: ["default", "centered"] }, initialValue: "default" }),
  ],
  preview: {
    select: { title: "title" },
    prepare: ({ title }) => ({ title: title || "CTA", subtitle: "Call to Action" }),
  },
});
