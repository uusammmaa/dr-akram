import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { getFaqEntryBySlug, getPublishedFaqEntries } from "@/lib/sanity/queries";
import { localizedText } from "@/lib/i18n/cms";
import { buildPageMetadata, excerpt } from "@/lib/seo/metadata";
import { getDefaultOgImageUrl } from "@/lib/seo/og-image";
import { buildQaPage } from "@/lib/seo/json-ld";
import { JsonLd } from "@/components/seo/JsonLd";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateStaticParams() {
  const entries = await getPublishedFaqEntries();
  return routing.locales.flatMap((locale) =>
    entries
      .filter((entry) => entry.slug?.current)
      .map((entry) => ({ locale, slug: entry.slug!.current }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const entry = await getFaqEntryBySlug(slug);
  if (!entry) return {};

  const question = localizedText(entry, "question", locale) ?? "";
  const answer = localizedText(entry, "answer", locale) ?? "";
  const imageUrl = await getDefaultOgImageUrl();

  return buildPageMetadata({
    locale: locale as "en" | "ur",
    path: `/questions/${slug}`,
    title: question,
    description: excerpt(answer),
    imageUrl,
  });
}

export default async function QuestionDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const entry = await getFaqEntryBySlug(slug);
  if (!entry) notFound();

  const question = localizedText(entry, "question", locale);
  const answer = localizedText(entry, "answer", locale);
  if (!question || !answer) notFound();

  const qaPageJsonLd = buildQaPage(locale as "en" | "ur", `/questions/${slug}`, {
    question,
    answer,
  });

  return (
    <div className="mx-auto max-w-2xl px-4 py-8 sm:py-12">
      <JsonLd data={qaPageJsonLd} />
      <h1 className="text-xl font-semibold text-brand sm:text-2xl">{question}</h1>
      <p className="mt-4 whitespace-pre-line text-muted-foreground">{answer}</p>
    </div>
  );
}
