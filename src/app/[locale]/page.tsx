import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { HomeMotionShell } from "@/components/home/HomeMotionShell";
import { localizedText } from "@/lib/i18n/cms";
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

  return (
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
  );
}
