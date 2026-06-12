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
      description: "Lecture title in English.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "titleUr",
      title: "Title (Urdu)",
      type: "string",
      description: "Lecture title in Urdu.",
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
      name: "youtubeUrl",
      title: "YouTube URL",
      type: "url",
      description: "Paste the YouTube URL only — thumbnail loads automatically.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: { list: categories },
      description: "Filter category on Lectures page.",
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
    defineField({
      name: "publishedAt",
      title: "Published Date",
      type: "date",
      description: "When the video was published.",
    }),
  ],
  preview: {
    select: { title: "titleEn", category: "category", date: "publishedAt" },
    prepare({ title, category, date }) {
      return { title, subtitle: [category, date].filter(Boolean).join(" · ") };
    },
  },
});
