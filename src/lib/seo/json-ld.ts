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
