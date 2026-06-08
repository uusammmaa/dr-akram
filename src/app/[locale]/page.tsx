import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { HomeMotionShell } from "@/components/home/HomeMotionShell";

type Props = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <HomeMotionShell
      locale={locale}
    />
  );
}
