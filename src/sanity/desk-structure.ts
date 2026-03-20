import type { StructureBuilder } from "sanity/structure";
import { CogIcon, HomeIcon, DocumentIcon } from "@sanity/icons";

export const deskStructure = (S: StructureBuilder) =>
  S.list()
    .title("Content")
    .items([
      // Settings singleton
      S.listItem()
        .title("Site Settings")
        .icon(CogIcon)
        .child(
          S.document()
            .schemaType("settings")
            .documentId("settings")
            .title("Site Settings")
        ),
      // Homepage singleton
      S.listItem()
        .title("Homepage")
        .icon(HomeIcon)
        .child(
          S.document()
            .schemaType("homepage")
            .documentId("homepage")
            .title("Homepage")
        ),
      // About Page singleton
      S.listItem()
        .title("About Page")
        .icon(DocumentIcon)
        .child(
          S.document()
            .schemaType("about")
            .documentId("about")
            .title("About Page")
        ),
      S.divider(),
      // Filter out singleton types from the default list
      ...S.documentTypeListItems().filter(
        (listItem) => !["settings", "homepage", "about"].includes(listItem.getId() || "")
      ),
    ]);
