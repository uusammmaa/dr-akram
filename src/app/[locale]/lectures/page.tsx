import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { LecturesPageContent } from "@/components/lectures/LecturesPageContent";
import { getLectures } from "@/lib/sanity/queries";

type Props = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LecturesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("lectures");
  const lectures = await getLectures();

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:py-12">
      <h1 className="text-2xl font-semibold text-brand sm:text-3xl">
        {t("title")}
      </h1>
      <LecturesPageContent locale={locale} lectures={lectures} />
    </div>
  );
}
