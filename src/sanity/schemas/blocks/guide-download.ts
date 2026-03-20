import { defineField, defineType } from "sanity";

export const guideDownloadBlock = defineType({
  name: "guideDownloadBlock",
  title: "Guide Download",
  type: "object",
  fields: [
    defineField({
      name: "guide",
      title: "Guide",
      type: "reference",
      to: [{ type: "guide" }],
      description: "Select a guide/whitepaper to promote",
    }),
    defineField({ name: "variant", title: "Variant", type: "string", options: { list: ["card", "sidebar"] }, initialValue: "card" }),
  ],
  preview: { prepare: () => ({ title: "Guide Download" }) },
});
