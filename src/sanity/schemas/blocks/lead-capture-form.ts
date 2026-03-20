import { defineField, defineType } from "sanity";

export const leadCaptureFormBlock = defineType({
  name: "leadCaptureFormBlock",
  title: "Lead Capture Form",
  type: "object",
  fields: [
    defineField({ name: "title", title: "Heading", type: "string" }),
    defineField({ name: "description", title: "Description", type: "text", rows: 2 }),
    defineField({ name: "variant", title: "Variant", type: "string", options: { list: ["inline", "full"] }, initialValue: "inline" }),
  ],
  preview: { prepare: () => ({ title: "Lead Capture Form" }) },
});
