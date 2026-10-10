import type { StructureResolver } from "sanity/structure";
import { HelpDeskPane } from "./components/HelpDeskPane";

const singleton = (
  S: Parameters<StructureResolver>[0],
  type: string,
  title: string,
  id: string,
  tourId?: string
) =>
  S.listItem()
    .title(title)
    .id(tourId ?? id)
    .child(S.document().schemaType(type).documentId(id));

const documentList = (
  S: Parameters<StructureResolver>[0],
  type: string,
  title: string,
  tourId?: string
) =>
  S.listItem()
    .title(title)
    .id(tourId ?? type)
    .child(S.documentTypeList(type).title(title));

const filteredFaqList = (
  S: Parameters<StructureResolver>[0],
  title: string,
  status: "pending" | "published",
  tourId: string
) =>
  S.listItem()
    .title(title)
    .id(tourId)
    .child(
      S.documentList()
        .title(title)
        .filter(`_type == "faqEntry" && status == "${status}"`)
        .schemaType("faqEntry")
    );

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Site Settings")
        .id("tour-site-settings")
        .child(
          S.list()
            .title("Site Settings")
            .items([
              singleton(
                S,
                "siteSettings",
                "Site Settings",
                "siteSettings",
                "tour-site-settings-doc"
              ),
              singleton(
                S,
                "aboutPage",
                "About Page",
                "aboutPage",
                "tour-about-page"
              ),
            ])
        ),
      S.divider(),
      S.listItem()
        .title("Books")
        .id("tour-books")
        .child(
          S.list()
            .title("Books")
            .items([
              documentList(S, "book", "My Books", "tour-my-books"),
              documentList(
                S,
                "readingRecommendation",
                "Recommended Reading",
                "tour-recommended-reading"
              ),
            ])
        ),
      S.listItem()
        .title("Q&A")
        .id("tour-qa")
        .child(
          S.list()
            .title("Q&A")
            .items([
              filteredFaqList(
                S,
                "Inbox (pending)",
                "pending",
                "tour-qa-inbox"
              ),
              filteredFaqList(
                S,
                "Published FAQ",
                "published",
                "tour-qa-published"
              ),
            ])
        ),
      documentList(S, "honor", "Honors & Awards", "tour-honors"),
      documentList(S, "lecture", "Lectures", "tour-lectures"),
      documentList(S, "afkarIssue", "Afkar-e-Muallim", "tour-afkar"),
      documentList(S, "organization", "Organizations", "tour-organizations"),
      S.divider(),
      S.listItem()
        .title("Help")
        .id("tour-help")
        .child(S.component(HelpDeskPane).title("Help")),
    ]);
