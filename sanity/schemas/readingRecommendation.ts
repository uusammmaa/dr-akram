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
      name: "authorEn",
      title: "Author (English)",
      type: "string",
      description: "Author name in English.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "authorUr",
      title: "Author (Urdu)",
      type: "string",
      description: "Author name in Urdu.",
    }),
    defineField({
      name: "topic",
      title: "Topic",
      type: "string",
      options: { list: topics },
      description: "Topic filter on Recommended Reading tab.",
    }),
    defineField({
      name: "recommendationNoteEn",
      title: "Why Dr. Akram Recommends (English)",
      type: "text",
      rows: 4,
      description: "Why you recommend this book (English).",
    }),
    defineField({
      name: "recommendationNoteUr",
      title: "Why Dr. Akram Recommends (Urdu)",
      type: "text",
      rows: 4,
      description: "Why you recommend this book (Urdu).",
    }),
    defineField({
      name: "audienceEn",
      title: "Audience (English)",
      type: "string",
      description: "Who should read this book.",
    }),
    defineField({
      name: "audienceUr",
      title: "Audience (Urdu)",
      type: "string",
      description: "Who should read this book (Urdu).",
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
      description: "Upload the book cover.",
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
