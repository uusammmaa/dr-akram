import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { HomeMotionShell } from "@/components/home/HomeMotionShell";
import { JsonLd } from "@/components/seo/JsonLd";
import { localizedText } from "@/lib/i18n/cms";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { buildPerson, buildWebSite } from "@/lib/seo/json-ld";
import { getDefaultOgImageUrl } from "@/lib/seo/og-image";
import { sanityImageUrl } from "@/lib/sanity/image";
import { getBlurDataUrl, getBlurMap } from "@/lib/sanity/plaiceholder";
import {
  getAboutPage,
  getFeaturedBooks,
  getFeaturedHonors,
  getLatestLectures,
  getSiteSettings,
  sortMilestones,
} from "@/lib/sanity/queries";
import type { FeaturedHomeItem } from "@/lib/sanity/types";

type Props = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  const settings = await getSiteSettings();
  const cmsDescription =
    settings && localizedText(settings, "metaDescription", locale);
  const imageUrl = await getDefaultOgImageUrl();

  return buildPageMetadata({
    locale: locale as "en" | "ur",
    path: "/",
    title: t("home.title"),
    description: cmsDescription ?? t("home.description"),
    imageUrl,
  });
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [settings, about, featuredBooks, featuredHonors, latestLectures] =
    await Promise.all([
      getSiteSettings(),
      getAboutPage(),
      getFeaturedBooks(),
      getFeaturedHonors(),
      getLatestLectures(),
    ]);

  const tagline = settings ? localizedText(settings, "tagline", locale) : undefined;
  const portraitSrc = settings?.portrait
    ? sanityImageUrl(settings.portrait, { width: 1400 })
    : undefined;
  const portraitBlur = portraitSrc ? await getBlurDataUrl(portraitSrc) : undefined;

  const milestones = about?.careerMilestones
    ? sortMilestones(about.careerMilestones)
    : undefined;

  const featuredItems: FeaturedHomeItem[] = [];
  for (const book of featuredBooks) {
    const title = localizedText(book, "title", locale);
    if (!title) continue;
    featuredItems.push({
      id: book._id,
      kind: "book",
      title,
      href: "/books",
      imageUrl: book.cover ? sanityImageUrl(book.cover, { width: 600 }) : undefined,
      badge: book.level,
    });
  }
  for (const honor of featuredHonors) {
    const title = localizedText(honor, "title", locale);
    if (!title) continue;
    featuredItems.push({
      id: honor._id,
      kind: "honor",
      title,
      href: "/honors",
      imageUrl: honor.image ? sanityImageUrl(honor.image, { width: 600 }) : undefined,
      badge: honor.type,
    });
  }

  const featuredBlurs = await getBlurMap(
    featuredItems.map((item) => ({ id: item.id, imageUrl: item.imageUrl }))
  );

  const ogImageUrl = await getDefaultOgImageUrl();
  const loc = locale as "en" | "ur";

  return (
    <>
      <JsonLd
        data={[
          buildWebSite(loc),
          buildPerson(loc, ogImageUrl),
        ]}
      />
      <HomeMotionShell
        locale={locale}
        tagline={tagline}
        portraitSrc={portraitSrc}
        portraitBlur={portraitBlur}
        milestones={milestones}
        featuredItems={featuredItems.length > 0 ? featuredItems : undefined}
        featuredBlurs={featuredBlurs}
        latestLectures={latestLectures.length > 0 ? latestLectures : undefined}
      />
    </>
  );
}
