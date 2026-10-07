"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useTranslations } from "next-intl";
import type { Book, ReadingRecommendation } from "@/lib/sanity/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookCard, RecommendationCard } from "@/components/books/BookCard";
import { cn } from "@/lib/utils";

type Props = {
  locale: string;
  books: Book[];
  recommendations: ReadingRecommendation[];
};

export function BooksPageContent({ locale, books, recommendations }: Props) {
  const t = useTranslations("books");
  const searchParams = useSearchParams();
  const defaultTab = searchParams.get("tab") === "recommendations" ? "recommendations" : "books";
  const [bookFilter, setBookFilter] = useState("all");
  const [topicFilter, setTopicFilter] = useState("all");
  const [booksRef] = useAutoAnimate<HTMLDivElement>();
  const [recsRef] = useAutoAnimate<HTMLDivElement>();

  const bookLevels = useMemo(
    () => ["all", ...new Set(books.map((b) => b.level).filter((v): v is string => !!v))],
    [books]
  );
  const topics = useMemo(
    () => ["all", ...new Set(recommendations.map((r) => r.topic).filter((v): v is string => !!v))],
    [recommendations]
  );

  const filteredBooks = books.filter((b) => bookFilter === "all" || b.level === bookFilter);
  const filteredRecs = recommendations.filter((r) => topicFilter === "all" || r.topic === topicFilter);

  return (
    <Tabs defaultValue={defaultTab} className="mt-8">
      <TabsList className="grid w-full max-w-md grid-cols-2">
        <TabsTrigger value="books" className="tap-target">{t("myBooks")}</TabsTrigger>
        <TabsTrigger value="recommendations" className="tap-target">{t("recommended")}</TabsTrigger>
      </TabsList>

      <TabsContent value="books" className="mt-6">
        {bookLevels.length > 1 && (
          <div className="mb-6 flex flex-wrap gap-2">
            {bookLevels.map((level) => (
              <button key={level} type="button" onClick={() => setBookFilter(level)}
                className={cn("tap-target rounded-full border px-3 py-1 text-sm", bookFilter === level ? "border-brand bg-brand text-brand-foreground" : "border-border")}>
                {level === "all" ? t("allLevels") : level}
              </button>
            ))}
          </div>
        )}
        {filteredBooks.length === 0 ? (
          <p className="rounded-xl border border-dashed border-border px-6 py-12 text-center text-muted-foreground">{t("emptyBooks")}</p>
        ) : (
          <div ref={booksRef} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredBooks.map((book) => <BookCard key={book._id} item={book} locale={locale} />)}
          </div>
        )}
      </TabsContent>

      <TabsContent value="recommendations" className="mt-6">
        {topics.length > 1 && (
          <div className="mb-6 flex flex-wrap gap-2">
            {topics.map((topic) => (
              <button key={topic} type="button" onClick={() => setTopicFilter(topic)}
                className={cn("tap-target rounded-full border px-3 py-1 text-sm", topicFilter === topic ? "border-brand bg-brand text-brand-foreground" : "border-border")}>
                {topic === "all" ? t("allTopics") : topic}
              </button>
            ))}
          </div>
        )}
        {filteredRecs.length === 0 ? (
          <p className="rounded-xl border border-dashed border-border px-6 py-12 text-center text-muted-foreground">{t("emptyRecommendations")}</p>
        ) : (
          <div ref={recsRef} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredRecs.map((item) => (
              <RecommendationCard key={item._id} item={item} locale={locale} recommendedLabel={t("recommendedBadge")} />
            ))}
          </div>
        )}
      </TabsContent>
    </Tabs>
  );
}

