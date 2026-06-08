import { Suspense } from "react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { BooksPageContent } from "@/components/books/BooksPageContent";
import { getBooks, getReadingRecommendations } from "@/lib/sanity/queries";

type Props = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function BooksPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("books");

  const [books, recommendations] = await Promise.all([
    getBooks(),
    getReadingRecommendations(),
  ]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:py-12">
      <h1 className="text-2xl font-semibold text-brand sm:text-3xl">
        {t("title")}
      </h1>
      <Suspense fallback={<p className="mt-8 text-muted-foreground">{t("loading")}</p>}>
        <BooksPageContent
          locale={locale}
          books={books}
          recommendations={recommendations}
        />
      </Suspense>
    </div>
  );
}
