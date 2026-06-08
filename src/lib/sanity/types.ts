export type SanityImage = {
  asset?: {
    _ref: string;
    _type: "reference";
  };
  _type?: "image";
};

export type SiteSettings = {
  taglineEn?: string;
  taglineUr?: string;
  phone?: string;
  whatsapp?: string;
  email?: string;
  portrait?: SanityImage;
};
