import type { StructureResolver } from "sanity/structure";

// Custom Studio layout: Site Settings as a single document, then Products & Categories as lists.
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Nursery Content")
    .items([
      S.listItem()
        .title("Site Settings")
        .id("siteSettings")
        .child(
          S.document()
            .schemaType("siteSettings")
            .documentId("siteSettings")
        ),
      S.divider(),
      S.documentTypeListItem("product").title("Products"),
      S.documentTypeListItem("category").title("Categories"),
    ]);
