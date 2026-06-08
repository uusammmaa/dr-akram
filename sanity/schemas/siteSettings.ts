import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "taglineEn",
      title: "Tagline (English)",
      type: "string",
      description: "Shown on the homepage hero card when locale is English.",
    }),
    defineField({
      name: "taglineUr",
      title: "Tagline (Urdu)",
      type: "string",
      description: "Shown on the homepage hero card when locale is Urdu.",
    }),
    defineField({
      name: "phone",
      title: "Phone",
      type: "string",
      description: "Public phone number for Call button and Contact page.",
    }),
    defineField({
      name: "whatsapp",
      title: "WhatsApp",
      type: "string",
      description: "WhatsApp number (with country code) for mobile bar link.",
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      description: "Contact email shown on the Contact page.",
    }),
    defineField({
      name: "portrait",
      title: "Portrait",
      type: "image",
      options: { hotspot: true },
      description: "Professional photo for homepage hero and credentials section.",
    }),
  ],
});
