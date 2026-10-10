import { getTranslations } from "next-intl/server";
import { buildPageMetadata } from "./metadata";
import { getDefaultOgImageUrl } from "./og-image";

type Locale = "en" | "ur";

export async function buildStaticPageMetadata(
  locale: Locale,
  path: string,
  pageKey:
    | "home"
    | "about"
    | "books"
    | "lectures"
    | "honors"
    | "services"
    | "afkar"
    | "contact"
    | "questions",
  overrides?: { title?: string; description?: string; imageUrl?: string }
) {
  const t = await getTranslations({ locale, namespace: "metadata" });
  const imageUrl = overrides?.imageUrl ?? (await getDefaultOgImageUrl());

  return buildPageMetadata({
    locale,
    path,
    title: overrides?.title ?? t(`${pageKey}.title`),
    description: overrides?.description ?? t(`${pageKey}.description`),
    imageUrl,
  });
}
