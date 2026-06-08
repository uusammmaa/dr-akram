import { defineField } from "sanity";

export const coverEnhancerFields = [
  defineField({
    name: "coverSource",
    type: "string",
    title: "Cover Source",
    options: { list: ["direct", "enhanced"] },
    hidden: true,
  }),
  defineField({
    name: "rawCover",
    type: "image",
    title: "Raw Cover (backup)",
    hidden: true,
  }),
  defineField({
    name: "coverStyle",
    type: "string",
    title: "Cover Style",
    options: {
      list: [
        { title: "Flat Cream", value: "cover-flat-cream" },
        { title: "Flat Green", value: "cover-flat-green" },
        { title: "Flat Gold", value: "cover-flat-gold" },
      ],
    },
    hidden: true,
  }),
  defineField({
    name: "autoEnhanced",
    type: "boolean",
    title: "Auto Enhanced",
    hidden: true,
  }),
];

export const honorEnhancerFields = [
  defineField({
    name: "rawImage",
    type: "image",
    title: "Raw Image (backup)",
    hidden: true,
  }),
  defineField({
    name: "backgroundStyle",
    type: "string",
    title: "Background Style",
    options: {
      list: [
        { title: "Velvet Green", value: "honor-velvet-green" },
        { title: "Gold Gradient", value: "honor-gold-gradient" },
        { title: "Cream Neutral", value: "honor-cream-neutral" },
      ],
    },
    hidden: true,
  }),
  defineField({
    name: "autoEnhanced",
    type: "boolean",
    title: "Auto Enhanced",
    hidden: true,
  }),
];

export const logoEnhancerFields = [
  defineField({
    name: "logoSource",
    type: "string",
    title: "Logo Source",
    options: { list: ["direct", "enhanced"] },
    hidden: true,
  }),
  defineField({
    name: "rawLogo",
    type: "image",
    title: "Raw Logo (backup)",
    hidden: true,
  }),
  defineField({
    name: "autoEnhanced",
    type: "boolean",
    title: "Auto Enhanced",
    hidden: true,
  }),
];
