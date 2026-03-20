import { defineField, defineType } from "sanity";

export const statsCounterBlock = defineType({
  name: "statsCounterBlock",
  title: "Stats Counter",
  type: "object",
  fields: [
    defineField({
      name: "stats",
      title: "Stats",
      type: "array",
      of: [{
        type: "object",
        fields: [
          defineField({ name: "value", title: "Value (number)", type: "number" }),
          defineField({ name: "prefix", title: "Prefix", type: "string", initialValue: "" }),
          defineField({ name: "suffix", title: "Suffix", type: "string", initialValue: "" }),
          defineField({ name: "label", title: "Label", type: "string" }),
        ],
        preview: { select: { title: "label", subtitle: "value" } },
      }],
    }),
  ],
  preview: { prepare: () => ({ title: "Stats Counter" }) },
});
