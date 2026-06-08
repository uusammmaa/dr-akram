import { defineField, defineType } from "sanity";
import { coverEnhancerFields } from "./shared";

export const afkarIssue = defineType({
  name: "afkarIssue",
  title: "Afkar-e-Muallim Issue",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description: 'e.g. "March 2024 Issue"',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "month",
      title: "Month",
      type: "number",
      validation: (rule) => rule.min(1).max(12),
    }),
    defineField({
      name: "year",
      title: "Year",
      type: "number",
    }),
    defineField({
      name: "cover",
      title: "Cover Image",
      type: "image",
      options: { hotspot: true },
    }),
    ...coverEnhancerFields,
    defineField({
      name: "pdf",
      title: "PDF File",
      type: "file",
    }),
    defineField({
      name: "externalLink",
      title: "External Link",
      type: "url",
      description: "Link if PDF is hosted elsewhere.",
    }),
    defineField({
      name: "order",
      title: "Sort Order",
      type: "number",
      initialValue: 0,
    }),
  ],
  preview: {
    select: { title: "title", media: "cover", month: "month", year: "year" },
    prepare({ title, media, month, year }) {
      const date =
        month && year
          ? new Date(year, month - 1).toLocaleString("en", {
              month: "short",
              year: "numeric",
            })
          : undefined;
      return { title, subtitle: date, media };
    },
  },
});
