import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { buildStaticPageMetadata } from "@/lib/seo/page-metadata";
import { QuestionsPageContent } from "@/components/questions/QuestionsPageContent";
import { getPublishedFaqEntries } from "@/lib/sanity/queries";
import { localizedText } from "@/lib/i18n/cms";
import { buildFaqPage } from "@/lib/seo/json-ld";
import { JsonLd } from "@/components/seo/JsonLd";

type Props = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return buildStaticPageMetadata(locale as "en" | "ur", "/questions", "questions");
}

export default async function QuestionsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("questions");
  const entries = await getPublishedFaqEntries();

  const faqPageJsonLd = buildFaqPage(
    locale as "en" | "ur",
    entries
      .map((entry) => ({
        question: localizedText(entry, "question", locale),
        answer: localizedText(entry, "answer", locale),
      }))
      .filter(
        (item): item is { question: string; answer: string } =>
          Boolean(item.question) && Boolean(item.answer)
      )
  );

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:py-12">
      {faqPageJsonLd && <JsonLd data={faqPageJsonLd} />}
      <h1 className="text-2xl font-semibold text-brand sm:text-3xl">{t("title")}</h1>
      <QuestionsPageContent locale={locale} entries={entries} />
    </div>
  );
}
