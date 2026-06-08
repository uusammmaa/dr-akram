import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { HomeMotionShell } from "@/components/home/HomeMotionShell";
import { localized } from "@/lib/i18n/cms";
import { sanityImageUrl } from "@/lib/sanity/image";
import { getSiteSettings } from "@/lib/sanity/queries";

type Props = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const settings = await getSiteSettings();
  const tagline = settings ? localized(settings, "tagline", locale) : undefined;
  const portraitSrc = settings?.portrait
    ? sanityImageUrl(settings.portrait, { width: 1400 })
    : undefined;

  return (
    <HomeMotionShell
      locale={locale}
      tagline={tagline}
      portraitSrc={portraitSrc}
    />
  );
}
