import { defineField, defineType } from "sanity";

const categories = [
  "Islamic Economics",
  "Dars",
  "General",
  "Current Affairs",
];

export const lecture = defineType({
  name: "lecture",
  title: "Lecture",
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
      name: "youtubeUrl",
      title: "YouTube URL",
      type: "url",
      description: "صرف YouTube link چپکائیں — thumbnail خود آ جائے گی",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: { list: categories },
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
    defineField({
      name: "publishedAt",
      title: "Published Date",
      type: "date",
    }),
  ],
  preview: {
    select: { title: "titleEn", category: "category", date: "publishedAt" },
    prepare({ title, category, date }) {
      return { title, subtitle: [category, date].filter(Boolean).join(" · ") };
    },
  },
});
