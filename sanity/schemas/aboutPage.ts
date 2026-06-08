import { defineField, defineType } from "sanity";

export const aboutPage = defineType({
  name: "aboutPage",
  title: "About Page (میرے بارے میں)",
  type: "document",
  fields: [
    defineField({
      name: "bioEn",
      title: "Biography (English)",
      type: "text",
      rows: 8,
    }),
    defineField({
      name: "bioUr",
      title: "Biography (Urdu)",
      type: "text",
      rows: 8,
    }),
    defineField({
      name: "careerMilestones",
      title: "Career Timeline",
      type: "array",
      of: [{ type: "careerMilestone" }],
    }),
  ],
});
