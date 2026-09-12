import { getSiteUrl } from "./site-url";
import { siteName } from "./metadata";

type Locale = "en" | "ur";

export function buildWebSite(locale: Locale) {
  const siteUrl = getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteName(locale),
    url: `${siteUrl}/${locale}`,
    inLanguage: locale === "ur" ? "ur" : "en",
  };
}

export function buildPerson(locale: Locale, imageUrl?: string) {
  const siteUrl = getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteName(locale),
    jobTitle: locale === "ur" ? "پروفیسر معاشیات" : "Professor of Economics",
    url: `${siteUrl}/${locale}`,
    knowsAbout: ["Islamic Economics", "Islamic Studies", "Education"],
    ...(imageUrl ? { image: imageUrl } : {}),
    sameAs: [
      "https://afaq.edu.pk/board-of-directors/",
      "https://www.tapak.pk/",
    ],
  };
}

export function buildFaqPage(
  locale: Locale,
  items: { question: string; answer: string }[]
) {
  if (items.length === 0) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: locale === "ur" ? "ur" : "en",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function buildQaPage(
  locale: Locale,
  path: string,
  item: { question: string; answer: string }
) {
  const siteUrl = getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "QAPage",
    inLanguage: locale === "ur" ? "ur" : "en",
    url: `${siteUrl}/${locale}${path}`,
    mainEntity: {
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    },
  };
}

export function buildBreadcrumbList(
  locale: Locale,
  items: { name: string; path: string }[]
) {
  const siteUrl = getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteUrl}/${locale}${item.path === "/" ? "" : item.path}`,
    })),
  };
}
