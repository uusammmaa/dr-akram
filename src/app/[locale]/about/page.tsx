import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { CareerTimeline } from "@/components/about/CareerTimeline";
import { OrgCard } from "@/components/organizations/OrgCard";
import { localizedText } from "@/lib/i18n/cms";
import { PORTRAIT_SRC } from "@/lib/site-images";
import { sanityImageUrl } from "@/lib/sanity/image";
import { getBlurDataUrl } from "@/lib/sanity/plaiceholder";
import {
  getAboutPage,
  getOrganizations,
  getSiteSettings,
  sortMilestones,
} from "@/lib/sanity/queries";

type Props = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();

  const [about, settings, organizations] = await Promise.all([
    getAboutPage(),
    getSiteSettings(),
    getOrganizations(),
  ]);

  const bio =
    (about && localizedText(about, "bio", locale)) || t("about.bio");
  const milestones = about?.careerMilestones
    ? sortMilestones(about.careerMilestones)
    : [];
  const portraitSrc = settings?.portrait
    ? sanityImageUrl(settings.portrait, { width: 800 })
    : PORTRAIT_SRC;
  const portraitBlur = settings?.portrait
    ? await getBlurDataUrl(portraitSrc)
    : undefined;

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:py-12">
      <h1 className="text-2xl font-semibold text-brand sm:text-3xl">
        {t("about.title")}
      </h1>

      <div className="relative mx-auto mt-6 aspect-[5/6] w-full max-w-xs overflow-hidden rounded-2xl border border-border bg-muted shadow-sm">
        <Image
          src={portraitSrc}
          alt={t("common.siteName")}
          fill
          sizes="(max-width: 768px) 80vw, 320px"
          placeholder={portraitBlur ? "blur" : "empty"}
          blurDataURL={portraitBlur}
          className="object-cover object-[center_28%]"
        />
      </div>

      <article
        className="prose prose-lg mt-6 max-w-none text-foreground prose-headings:text-brand"
        dir={locale === "ur" ? "rtl" : "ltr"}
      >
        <p>{bio}</p>
      </article>

      {milestones.length > 0 && (
        <section className="mt-12">
          <h2 className="text-xl font-semibold text-brand">
            {t("about.timelineTitle")}
          </h2>
          <CareerTimeline milestones={milestones} locale={locale} />
        </section>
      )}

      {organizations.length > 0 && (
        <section className="mt-12">
          <h2 className="text-xl font-semibold text-brand">
            {t("organizations.title")}
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {organizations.map((org) => (
              <OrgCard
                key={org._id}
                org={org}
                locale={locale}
                labels={{
                  current: t("organizations.current"),
                  former: t("organizations.former"),
                }}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
