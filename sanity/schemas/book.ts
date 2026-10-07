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
      description: "Book title in English.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "titleUr",
      title: "Title (Urdu)",
      type: "string",
      description: "Book title in Urdu.",
    }),
    defineField({
      name: "level",
      title: "Level",
      type: "string",
      options: { list: bookLevels },
      description: "Academic level filter on Books page.",
    }),
    defineField({
      name: "descriptionEn",
      title: "Description (English)",
      type: "text",
      rows: 3,
      description: "Short description in English.",
    }),
    defineField({
      name: "descriptionUr",
      title: "Description (Urdu)",
      type: "text",
      rows: 3,
      description: "Short description in Urdu.",
    }),
    defineField({
      name: "buyLink",
      title: "Buy Link",
      type: "url",
      description: "Link to purchase the book.",
    }),
    defineField({
      name: "cover",
      title: "Cover Image",
      type: "image",
      options: { hotspot: true },
      description: "Upload the publisher cover or a photo of the book.",
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
    select: { title: "titleEn", media: "cover", level: "level" },
    prepare({ title, media, level }) {
      return { title: level ? `${title} (${level})` : title, media };
    },
  },
});
