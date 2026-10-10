import { defineField, defineType } from "sanity";

const topics = [
  "Islamic Economics",
  "Dars / Quran",
  "Lectures",
  "Books",
  "General",
];

export const faqEntry = defineType({
  name: "faqEntry",
  title: "Q&A Entry",
  type: "document",
  fields: [
    defineField({
      name: "questionEn",
      title: "Question (English)",
      type: "string",
      description: "English version of the question.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "questionUr",
      title: "Question (Urdu)",
      type: "string",
      description: "Urdu version of the question.",
    }),
    defineField({
      name: "answerEn",
      title: "Answer (English)",
      type: "text",
      rows: 6,
      description: "Approved answer in English — leave empty while pending.",
    }),
    defineField({
      name: "answerUr",
      title: "Answer (Urdu)",
      type: "text",
      rows: 6,
      description: "Approved answer in Urdu — leave empty while pending.",
    }),
    defineField({
      name: "topic",
      title: "Topic",
      type: "string",
      options: { list: topics },
      description: "Category for filtering on the Q&A page.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "Pending (Inbox)", value: "pending" },
          { title: "Published", value: "published" },
          { title: "Private", value: "private" },
        ],
      },
      initialValue: "pending",
      description:
        "Pending = inbox only. Published = live on site. Private = answered off-site.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "submitterName",
      title: "Submitter Name",
      type: "string",
      description: "Optional — from ask form.",
    }),
    defineField({
      name: "submitterPhone",
      title: "Submitter Phone",
      type: "string",
      description: "Optional — from ask form.",
    }),
    defineField({
      name: "submitterEmail",
      title: "Submitter Email",
      type: "string",
      description: "Optional — from ask form.",
    }),
    defineField({
      name: "language",
      title: "Question Language",
      type: "string",
      options: {
        list: [
          { title: "Urdu", value: "ur" },
          { title: "English", value: "en" },
          { title: "Both", value: "both" },
        ],
      },
      initialValue: "ur",
      description: "Language the visitor asked in.",
    }),
    defineField({
      name: "answeredAt",
      title: "Answered At",
      type: "datetime",
      description: "Set automatically when status changes to Published.",
      readOnly: true,
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
      description: "Lower numbers appear first within topic.",
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "questionEn", maxLength: 96 },
      description: "URL for individual Q&A page.",
    }),
    defineField({
      name: "aiReady",
      title: "AI Ready",
      type: "boolean",
      initialValue: false,
      description: "Mark when approved for AI corpus (Phase 5).",
      hidden: true,
    }),
  ],
  preview: {
    select: {
      question: "questionEn",
      status: "status",
      topic: "topic",
    },
    prepare({ question, status, topic }) {
      return {
        title: question ?? "Untitled question",
        subtitle: [status, topic].filter(Boolean).join(" · "),
      };
    },
  },
});
