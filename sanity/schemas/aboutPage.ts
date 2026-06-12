import { defineField, defineType } from "sanity";

export const aboutPage = defineType({
  name: "aboutPage",
  title: "About Page",
  type: "document",
  fields: [
    defineField({
      name: "bioEn",
      title: "Biography (English)",
      type: "text",
      rows: 8,
      description: "Full biography in English — shown on About page.",
    }),
    defineField({
      name: "bioUr",
      title: "Biography (Urdu)",
      type: "text",
      rows: 8,
      description: "Full biography in Urdu — shown on About page.",
    }),
    defineField({
      name: "careerMilestones",
      title: "Career Timeline",
      type: "array",
      of: [{ type: "careerMilestone" }],
      description: "Career milestones in order — add or reorder as needed.",
    }),
  ],
});
