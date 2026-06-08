import { defineField, defineType } from "sanity";
import { honorEnhancerFields } from "./shared";

const honorTypes = ["Shield", "Trophy", "Certificate", "Memento", "Other"];

export const honor = defineType({
  name: "honor",
  title: "Honor & Award",
  type: "document",
  fields: [
    defineField({
      name: "titleEn",
      title: "Title (English)",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "titleUr",
      title: "Title (Urdu)",
      type: "string",
    }),
    defineField({
      name: "type",
      title: "Type",
      type: "string",
      options: { list: honorTypes },
    }),
    defineField({
      name: "organization",
      title: "Organization",
      type: "string",
    }),
    defineField({
      name: "event",
      title: "Event",
      type: "string",
    }),
    defineField({
      name: "year",
      title: "Year",
      type: "number",
    }),
    defineField({
      name: "image",
      title: "Photo",
      type: "image",
      options: { hotspot: true },
      description: "Upload the honor photo directly.",
    }),
    ...honorEnhancerFields,
    defineField({
      name: "featured",
      title: "Featured on Homepage",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "order",
      title: "Sort Order",
      type: "number",
      initialValue: 0,
    }),
  ],
  preview: {
    select: { title: "titleEn", year: "year", media: "image", type: "type" },
    prepare({ title, year, media, type }) {
      return { title, subtitle: [type, year].filter(Boolean).join(" · "), media };
    },
  },
});
