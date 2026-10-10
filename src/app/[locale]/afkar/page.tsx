import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { AfkarCarousel } from "@/components/afkar/AfkarCarousel";
import { FadeIn } from "@/components/motion/FadeIn";
import { buildStaticPageMetadata } from "@/lib/seo/page-metadata";
import { sanityImageUrl } from "@/lib/sanity/image";
import { getBlurMap } from "@/lib/sanity/plaiceholder";
import { getAfkarIssues } from "@/lib/sanity/queries";

type Props = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return buildStaticPageMetadata(locale as "en" | "ur", "/afkar", "afkar");
}

export default async function AfkarPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("afkar");
  const issues = await getAfkarIssues();

  const imageBlurs = await getBlurMap(
    issues.map((issue) => ({
      id: issue._id,
      imageUrl: issue.cover ? sanityImageUrl(issue.cover, { width: 200 }) : undefined,
    }))
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:py-12">
      <FadeIn>
        <h1 className="text-2xl font-semibold text-brand sm:text-3xl">
          {t("title")}
        </h1>
        <p className="mt-4 max-w-2xl text-muted-foreground">{t("description")}</p>
      </FadeIn>
      <AfkarCarousel issues={issues} imageBlurs={imageBlurs} />
    </div>
  );
}
