import { cache } from "react";
import { getSanityClient, isSanityConfigured } from "@/lib/sanity/client";
import type {
  AboutPage,
  AfkarIssue,
  Book,
  FaqEntry,
  Honor,
  Lecture,
  Organization,
  ReadingRecommendation,
  SiteSettings,
} from "@/lib/sanity/types";

const REVALIDATE = { next: { revalidate: 60 } } as const;

async function fetchSanity<T>(query: string, params: Record<string, unknown> = {}): Promise<T | null> {
  if (!isSanityConfigured()) return null;
  const client = getSanityClient();
  if (!client) return null;
  try {
    return (await client.fetch<T | null>(query, params, REVALIDATE)) ?? null;
  } catch {
    return null;
  }
}

const siteSettingsQuery = `*[_type == "siteSettings" && _id == "siteSettings"][0]{
  taglineEn, taglineUr, phone, whatsapp, email, portrait,
  metaDescriptionEn, metaDescriptionUr, ogImage
}`;

const aboutPageQuery = `*[_type == "aboutPage" && _id == "aboutPage"][0]{
  bioEn, bioUr,
  careerMilestones[]{ _key, year, titleEn, titleUr, descriptionEn, descriptionUr, order }
}`;

const booksQuery = `*[_type == "book"] | order(order asc, titleEn asc){
  _id, titleEn, titleUr, level, descriptionEn, descriptionUr, buyLink, cover, featured, order
}`;

const recommendationsQuery = `*[_type == "readingRecommendation"] | order(order asc, titleEn asc){
  _id, titleEn, titleUr, authorEn, authorUr, topic,
  recommendationNoteEn, recommendationNoteUr, audienceEn, audienceUr,
  buyLink, cover, featured, order
}`;

const lecturesQuery = `*[_type == "lecture"] | order(publishedAt desc, order asc){
  _id, titleEn, titleUr, descriptionEn, descriptionUr, youtubeUrl, category, featured, order, publishedAt
}`;

const honorsQuery = `*[_type == "honor"] | order(order asc, year desc){
  _id, titleEn, titleUr, type, organization, event, year, image, featured, order
}`;

const organizationsQuery = `*[_type == "organization"] | order(order asc, nameEn asc){
  _id, nameEn, nameUr, roleEn, roleUr, status, logo, url, order
}`;

const afkarQuery = `*[_type == "afkarIssue"] | order(year desc, month desc, order asc){
  _id, title, month, year, cover, pdf, externalLink, order
}`;

const featuredBooksQuery = `*[_type == "book" && featured == true] | order(order asc)[0...4]{
  _id, titleEn, titleUr, level, cover, order
}`;

const featuredHonorsQuery = `*[_type == "honor" && featured == true] | order(order asc)[0...4]{
  _id, titleEn, titleUr, type, image, order
}`;

const latestLecturesQuery = `*[_type == "lecture"] | order(publishedAt desc, order asc)[0...3]{
  _id, titleEn, titleUr, youtubeUrl, category, publishedAt
}`;

const faqFields = `
  _id, _updatedAt, questionEn, questionUr, answerEn, answerUr, topic,
  featured, order, slug, answeredAt
`;

const publishedFaqQuery = `*[_type == "faqEntry" && status == "published"] | order(order asc, answeredAt desc){
  ${faqFields}
}`;

const featuredFaqQuery = `*[_type == "faqEntry" && status == "published" && featured == true] | order(order asc, answeredAt desc)[0...3]{
  ${faqFields}
}`;

const faqBySlugQuery = `*[_type == "faqEntry" && status == "published" && slug.current == $slug][0]{
  ${faqFields}
}`;

export const getSiteSettings = cache(async (): Promise<SiteSettings | null> =>
  fetchSanity<SiteSettings>(siteSettingsQuery)
);

export const getAboutPage = cache(async (): Promise<AboutPage | null> =>
  fetchSanity<AboutPage>(aboutPageQuery)
);

export const getBooks = cache(async (): Promise<Book[]> =>
  (await fetchSanity<Book[]>(booksQuery)) ?? []
);

export const getReadingRecommendations = cache(async (): Promise<ReadingRecommendation[]> =>
  (await fetchSanity<ReadingRecommendation[]>(recommendationsQuery)) ?? []
);

export const getLectures = cache(async (): Promise<Lecture[]> =>
  (await fetchSanity<Lecture[]>(lecturesQuery)) ?? []
);

export const getHonors = cache(async (): Promise<Honor[]> =>
  (await fetchSanity<Honor[]>(honorsQuery)) ?? []
);

export const getOrganizations = cache(async (): Promise<Organization[]> =>
  (await fetchSanity<Organization[]>(organizationsQuery)) ?? []
);

export const getAfkarIssues = cache(async (): Promise<AfkarIssue[]> =>
  (await fetchSanity<AfkarIssue[]>(afkarQuery)) ?? []
);

export const getFeaturedBooks = cache(async (): Promise<Book[]> =>
  (await fetchSanity<Book[]>(featuredBooksQuery)) ?? []
);

export const getFeaturedHonors = cache(async (): Promise<Honor[]> =>
  (await fetchSanity<Honor[]>(featuredHonorsQuery)) ?? []
);

export const getLatestLectures = cache(async (): Promise<Lecture[]> =>
  (await fetchSanity<Lecture[]>(latestLecturesQuery)) ?? []
);

export const getPublishedFaqEntries = cache(async (): Promise<FaqEntry[]> =>
  (await fetchSanity<FaqEntry[]>(publishedFaqQuery)) ?? []
);

export const getFeaturedFaqEntries = cache(async (): Promise<FaqEntry[]> =>
  (await fetchSanity<FaqEntry[]>(featuredFaqQuery)) ?? []
);

export const getFaqEntryBySlug = cache(async (slug: string): Promise<FaqEntry | null> =>
  fetchSanity<FaqEntry>(faqBySlugQuery, { slug })
);

export const getCurrentOrganizations = cache(async (): Promise<Organization[]> => {
  const orgs = await getOrganizations();
  return orgs.filter((o) => o.status === "current").slice(0, 4);
});

export function sortMilestones<T extends { order?: number }>(items: T[]): T[] {
  return [...items].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}
