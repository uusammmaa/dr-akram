import { defineField, defineType } from "sanity";

const topics = [
  "Islamic Economics",
  "Quran & Tafsir",
  "Islamic Studies",
  "History",
  "General",
];

export const readingRecommendation = defineType({
  name: "readingRecommendation",
  title: "Recommended Reading",
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
      name: "authorEn",
      title: "Author (English)",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "authorUr",
      title: "Author (Urdu)",
      type: "string",
    }),
    defineField({
      name: "topic",
      title: "Topic",
      type: "string",
      options: { list: topics },
    }),
    defineField({
      name: "recommendationNoteEn",
      title: "Why Dr. Akram Recommends (English)",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "recommendationNoteUr",
      title: "Why Dr. Akram Recommends (Urdu)",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "audienceEn",
      title: "Audience (English)",
      type: "string",
    }),
    defineField({
      name: "audienceUr",
      title: "Audience (Urdu)",
      type: "string",
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
    select: { title: "titleEn", author: "authorEn", media: "cover", topic: "topic" },
    prepare({ title, author, media, topic }) {
      return {
        title,
        subtitle: [author, topic].filter(Boolean).join(" · "),
        media,
      };
    },
  },
});
