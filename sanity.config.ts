import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { markdownSchema } from "sanity-plugin-markdown";
import { apiVersion, dataset, projectId } from "./src/lib/sanity/env";
import { schema } from "./src/sanity/schemas";
import { deskStructure } from "./src/sanity/desk-structure";

export default defineConfig({
  name: "tqlending",
  title: "TQ Lending",
  projectId,
  dataset,
  plugins: [
    structureTool({
      structure: deskStructure,
    }),
    visionTool({ defaultApiVersion: apiVersion }),
    markdownSchema(),
  ],
  schema,
});
