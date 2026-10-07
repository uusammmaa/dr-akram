import { defineField, defineType } from "sanity";

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
      description: "Award or honor title in English.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "titleUr",
      title: "Title (Urdu)",
      type: "string",
      description: "Award or honor title in Urdu.",
    }),
    defineField({
      name: "type",
      title: "Type",
      type: "string",
      options: { list: honorTypes },
      description: "Shield, Trophy, Certificate, etc.",
    }),
    defineField({
      name: "organization",
      title: "Organization",
      type: "string",
      description: "Organization that gave the honor.",
    }),
    defineField({
      name: "event",
      title: "Event",
      type: "string",
      description: "Event or function name.",
    }),
    defineField({
      name: "year",
      title: "Year",
      type: "number",
      description: "Year received.",
    }),
    defineField({
      name: "image",
      title: "Photo",
      type: "image",
      options: { hotspot: true },
      description: "Upload shield, trophy, or certificate photo.",
    }),
    defineField({
      name: "featured",
      title: "Featured on Homepage",
      type: "boolean",
      initialValue: false,
      description: "Turn on to show this item on the homepage.",
    }),
    defineField({
      name: "order",
      title: "Sort Order",
      type: "number",
      initialValue: 0,
      description: "Lower numbers appear first.",
    }),
  ],
  preview: {
    select: { title: "titleEn", year: "year", media: "image", type: "type" },
    prepare({ title, year, media, type }) {
      return { title, subtitle: [type, year].filter(Boolean).join(" · "), media };
    },
  },
});
