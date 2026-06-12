import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { buildStaticPageMetadata } from "@/lib/seo/page-metadata";
import { HonorsPageContent } from "@/components/honors/HonorsPageContent";
import { sanityImageUrl } from "@/lib/sanity/image";
import { getBlurMap } from "@/lib/sanity/plaiceholder";
import { getHonors } from "@/lib/sanity/queries";

type Props = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return buildStaticPageMetadata(locale as "en" | "ur", "/honors", "honors");
}

export default async function HonorsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("honors");
  const honors = await getHonors();

  const imageBlurs = await getBlurMap(
    honors.map((h) => ({
      id: h._id,
      imageUrl: h.image ? sanityImageUrl(h.image, { width: 200 }) : undefined,
    }))
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:py-12">
      <h1 className="text-2xl font-semibold text-brand sm:text-3xl">
        {t("title")}
      </h1>
      <HonorsPageContent locale={locale} honors={honors} imageBlurs={imageBlurs} />
    </div>
  );
}
