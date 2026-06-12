import { defineField, defineType } from "sanity";

export const careerMilestone = defineType({
  name: "careerMilestone",
  title: "Career Milestone",
  type: "object",
  fields: [
    defineField({
      name: "year",
      title: "Year",
      type: "string",
      description: 'e.g. "2020" or "2015–2020"',
    }),
    defineField({
      name: "titleEn",
      title: "Title (English)",
      type: "string",
      description: "Milestone title in English.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "titleUr",
      title: "Title (Urdu)",
      type: "string",
      description: "Milestone title in Urdu.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "descriptionEn",
      title: "Description (English)",
      type: "text",
      rows: 3,
      description: "Optional details in English.",
    }),
    defineField({
      name: "descriptionUr",
      title: "Description (Urdu)",
      type: "text",
      rows: 3,
      description: "Optional details in Urdu.",
    }),
    defineField({
      name: "order",
      title: "Sort Order",
      type: "number",
      description: "Lower numbers appear first on the timeline.",
      initialValue: 0,
    }),
  ],
  preview: {
    select: { title: "titleEn", year: "year" },
    prepare({ title, year }) {
      return { title: year ? `${year} — ${title}` : title };
    },
  },
});
