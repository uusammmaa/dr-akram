import type { StructureResolver } from "sanity/structure";

const singleton = (
  S: Parameters<StructureResolver>[0],
  type: string,
  title: string,
  id: string
) =>
  S.listItem()
    .title(title)
    .id(id)
    .child(S.document().schemaType(type).documentId(id));

const documentList = (
  S: Parameters<StructureResolver>[0],
  type: string,
  title: string
) =>
  S.listItem()
    .title(title)
    .child(S.documentTypeList(type).title(title));

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Site Settings")
        .child(
          S.list()
            .title("Site Settings")
            .items([
              singleton(S, "siteSettings", "Site Settings", "siteSettings"),
              singleton(S, "aboutPage", "About Page", "aboutPage"),
            ])
        ),
      S.divider(),
      documentList(S, "book", "My Books"),
      documentList(S, "readingRecommendation", "Recommended Reading"),
      documentList(S, "lecture", "Lectures"),
      documentList(S, "honor", "Honors & Awards"),
      documentList(S, "organization", "Organizations"),
      documentList(S, "afkarIssue", "Afkar Issues"),
    ]);
