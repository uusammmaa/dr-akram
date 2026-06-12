import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { PUBLIC_ROUTES } from "@/lib/seo/routes";
import { getSiteUrl } from "@/lib/seo/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();

  // Phase 4: append published faqEntry slugs × locales
  return PUBLIC_ROUTES.flatMap((path) =>
    routing.locales.map((locale) => ({
      url: `${siteUrl}/${locale}${path}`,
      lastModified: new Date(),
      changeFrequency: path === "" ? "weekly" : "monthly",
      priority: path === "" ? 1 : path === "/questions" ? 0.7 : 0.8,
    }))
  );
}
