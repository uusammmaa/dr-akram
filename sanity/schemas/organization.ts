import { defineField, defineType } from "sanity";

export const organization = defineType({
  name: "organization",
  title: "Organization",
  type: "document",
  fields: [
    defineField({
      name: "nameEn",
      title: "Name (English)",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "nameUr",
      title: "Name (Urdu)",
      type: "string",
    }),
    defineField({
      name: "roleEn",
      title: "Role (English)",
      type: "string",
    }),
    defineField({
      name: "roleUr",
      title: "Role (Urdu)",
      type: "string",
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "Current", value: "current" },
          { title: "Former", value: "former" },
        ],
      },
      initialValue: "current",
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
    }),
    defineField({
      name: "url",
      title: "Website URL",
      type: "url",
    }),
    defineField({
      name: "order",
      title: "Sort Order",
      type: "number",
      initialValue: 0,
    }),
  ],
  preview: {
    select: { title: "nameEn", role: "roleEn", media: "logo", status: "status" },
    prepare({ title, role, media, status }) {
      return { title, subtitle: [role, status].filter(Boolean).join(" · "), media };
    },
  },
});
