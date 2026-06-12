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
      description: "Organization name in English.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "nameUr",
      title: "Name (Urdu)",
      type: "string",
      description: "Organization name in Urdu.",
    }),
    defineField({
      name: "roleEn",
      title: "Role (English)",
      type: "string",
      description: "Your role at this organization.",
    }),
    defineField({
      name: "roleUr",
      title: "Role (Urdu)",
      type: "string",
      description: "Your role in Urdu.",
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
      description: "Current or former affiliation.",
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      description: "Upload organization logo.",
    }),
    defineField({
      name: "url",
      title: "Website URL",
      type: "url",
      description: "Organization website link.",
    }),
    defineField({
      name: "order",
      title: "Sort Order",
      type: "number",
      initialValue: 0,
      description: "Lower numbers appear first on About page.",
    }),
  ],
  preview: {
    select: { title: "nameEn", role: "roleEn", media: "logo", status: "status" },
    prepare({ title, role, media, status }) {
      return { title, subtitle: [role, status].filter(Boolean).join(" · "), media };
    },
  },
});
