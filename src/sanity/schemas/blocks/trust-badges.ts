import { defineField, defineType } from "sanity";

export const trustBadgesBlock = defineType({
  name: "trustBadgesBlock",
  title: "Trust Badges",
  type: "object",
  fields: [
    defineField({ name: "variant", title: "Variant", type: "string", options: { list: ["light", "dark"] }, initialValue: "light" }),
  ],
  preview: { prepare: () => ({ title: "Trust Badges" }) },
});
