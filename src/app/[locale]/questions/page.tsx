import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { buildStaticPageMetadata } from "@/lib/seo/page-metadata";
import { EmptyState } from "@/components/EmptyState";

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
  return <EmptyState titleKey="nav.questions" />;
}
