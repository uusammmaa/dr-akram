import type { Metadata } from "next";
import { getSiteUrl } from "./site-url";

type Locale = "en" | "ur";

export type PageMetadataInput = {
  locale: Locale;
  path: string;
  title: string;
  description: string;
  imageUrl?: string;
};

const SITE_NAME_EN = "Prof. Dr. Mian Muhammad Akram";
const SITE_NAME_UR = "پروفیسر ڈاکٹر میاں محمد اکرم";

export function siteName(locale: Locale): string {
  return locale === "ur" ? SITE_NAME_UR : SITE_NAME_EN;
}

export function buildPageMetadata({
  locale,
  path,
  title,
  description,
  imageUrl,
}: PageMetadataInput): Metadata {
  const siteUrl = getSiteUrl();
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const canonical = `${siteUrl}/${locale}${normalizedPath === "/" ? "" : normalizedPath}`;
  const enUrl = `${siteUrl}/en${normalizedPath === "/" ? "" : normalizedPath}`;
  const urUrl = `${siteUrl}/ur${normalizedPath === "/" ? "" : normalizedPath}`;

  const fullTitle = `${title} | ${siteName(locale)}`;
  const ogLocale = locale === "ur" ? "ur_PK" : "en_PK";
  const ogLocaleAlternate = locale === "ur" ? "en_PK" : "ur_PK";

  return {
    title: fullTitle,
    description,
    alternates: {
      canonical,
      languages: {
        en: enUrl,
        ur: urUrl,
        "x-default": enUrl,
      },
    },
    openGraph: {
      type: "website",
      locale: ogLocale,
      alternateLocale: [ogLocaleAlternate],
      url: canonical,
      title: fullTitle,
      description,
      siteName: siteName(locale),
      ...(imageUrl
        ? {
            images: [
              {
                url: imageUrl,
                width: 1200,
                height: 630,
                alt: siteName(locale),
              },
            ],
          }
        : {}),
    },
    twitter: {
      card: imageUrl ? "summary_large_image" : "summary",
      title: fullTitle,
      description,
      ...(imageUrl ? { images: [imageUrl] } : {}),
    },
  };
}

export function excerpt(text: string | undefined, max = 155): string {
  if (!text) return "";
  const trimmed = text.replace(/\s+/g, " ").trim();
  if (trimmed.length <= max) return trimmed;
  return `${trimmed.slice(0, max - 1).trim()}…`;
}
