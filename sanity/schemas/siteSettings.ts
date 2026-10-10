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
      description:
        "Contact email shown on Contact page; receives form notifications.",
    }),
    defineField({
      name: "portrait",
      title: "Portrait",
      type: "image",
      options: { hotspot: true },
      description: "Professional photo for homepage hero.",
    }),
    defineField({
      name: "metaDescriptionEn",
      title: "Meta Description (English)",
      type: "text",
      rows: 3,
      description: "Short description for Google/WhatsApp previews (English).",
    }),
    defineField({
      name: "metaDescriptionUr",
      title: "Meta Description (Urdu)",
      type: "text",
      rows: 3,
      description: "Short description for Google/WhatsApp previews (Urdu).",
    }),
    defineField({
      name: "ogImage",
      title: "Social Share Image",
      type: "image",
      options: { hotspot: true },
      description:
        "Optional image for link previews (1200×630). Falls back to portrait.",
    }),
  ],
});
