import { defineField, defineType } from "sanity";

const bookLevels = [
  "M.A.",
  "M.Sc.",
  "B.Com.",
  "B.A.",
  "B.Sc.",
  "I.Com.",
  "F.A.",
  "General",
];

export const book = defineType({
  name: "book",
  title: "My Book",
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
      name: "level",
      title: "Level",
      type: "string",
      options: { list: bookLevels },
    }),
    defineField({
      name: "descriptionEn",
      title: "Description (English)",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "descriptionUr",
      title: "Description (Urdu)",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "buyLink",
      title: "Buy Link",
      type: "url",
    }),
    defineField({
      name: "cover",
      title: "Cover Image",
      type: "image",
      options: { hotspot: true },
      description: "Upload the book cover directly.",
    }),
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
    select: { title: "titleEn", media: "cover", level: "level" },
    prepare({ title, media, level }) {
      return { title: level ? `${title} (${level})` : title, media };
    },
  },
});
