import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { PUBLIC_ROUTES } from "@/lib/seo/routes";
import { getSiteUrl } from "@/lib/seo/site-url";
import { getPublishedFaqEntries } from "@/lib/sanity/queries";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = getSiteUrl();

  const staticEntries = PUBLIC_ROUTES.flatMap((path) =>
    routing.locales.map((locale) => ({
      url: `${siteUrl}/${locale}${path}`,
      lastModified: new Date(),
      changeFrequency: (path === "" ? "weekly" : "monthly") as "weekly" | "monthly",
      priority: path === "" ? 1 : path === "/questions" ? 0.7 : 0.8,
    }))
  );

  const faqEntries = await getPublishedFaqEntries();
  const faqSitemapEntries = faqEntries
    .filter((entry) => entry.slug?.current)
    .flatMap((entry) =>
      routing.locales.map((locale) => ({
        url: `${siteUrl}/${locale}/questions/${entry.slug!.current}`,
        lastModified: entry._updatedAt ? new Date(entry._updatedAt) : new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.6,
      }))
    );

  return [...staticEntries, ...faqSitemapEntries];
}
