export type SanityImage = {
  asset?: {
    _ref: string;
    _type: "reference";
  };
  _type?: "image";
};

export type SanityFile = {
  asset?: {
    _ref: string;
    _type: "reference";
  };
  _type?: "file";
};

export type SiteSettings = {
  taglineEn?: string;
  taglineUr?: string;
  phone?: string;
  whatsapp?: string;
  email?: string;
  portrait?: SanityImage;
};

export type CareerMilestoneItem = {
  _key: string;
  year?: string;
  titleEn?: string;
  titleUr?: string;
  descriptionEn?: string;
  descriptionUr?: string;
  order?: number;
};

export type AboutPage = {
  bioEn?: string;
  bioUr?: string;
  careerMilestones?: CareerMilestoneItem[];
};

export type Book = {
  _id: string;
  titleEn?: string;
  titleUr?: string;
  level?: string;
  descriptionEn?: string;
  descriptionUr?: string;
  buyLink?: string;
  cover?: SanityImage;
  featured?: boolean;
  order?: number;
};

export type ReadingRecommendation = {
  _id: string;
  titleEn?: string;
  titleUr?: string;
  authorEn?: string;
  authorUr?: string;
  topic?: string;
  recommendationNoteEn?: string;
  recommendationNoteUr?: string;
  audienceEn?: string;
  audienceUr?: string;
  buyLink?: string;
  cover?: SanityImage;
  featured?: boolean;
  order?: number;
};

export type Lecture = {
  _id: string;
  titleEn?: string;
  titleUr?: string;
  descriptionEn?: string;
  descriptionUr?: string;
  youtubeUrl?: string;
  category?: string;
  featured?: boolean;
  order?: number;
  publishedAt?: string;
};

export type Honor = {
  _id: string;
  titleEn?: string;
  titleUr?: string;
  type?: string;
  organization?: string;
  event?: string;
  year?: number;
  image?: SanityImage;
  featured?: boolean;
  order?: number;
};

export type Organization = {
  _id: string;
  nameEn?: string;
  nameUr?: string;
  roleEn?: string;
  roleUr?: string;
  status?: "current" | "former";
  logo?: SanityImage;
  url?: string;
  order?: number;
};

export type AfkarIssue = {
  _id: string;
  title?: string;
  month?: number;
  year?: number;
  cover?: SanityImage;
  pdf?: SanityFile;
  externalLink?: string;
  order?: number;
};

export type FeaturedHomeItem = {
  id: string;
  kind: "book" | "honor";
  title: string;
  href: "/books" | "/honors";
  imageUrl?: string;
  badge?: string;
};
