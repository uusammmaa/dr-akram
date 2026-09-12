"use client";

import { useMemo, useState } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useTranslations } from "next-intl";
import type { FaqEntry } from "@/lib/sanity/types";
import { localizedText } from "@/lib/i18n/cms";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AskQuestionForm } from "@/components/questions/AskQuestionForm";
import { cn } from "@/lib/utils";
import { QUESTION_TOPICS } from "@/lib/questions/topics";

type Props = {
  locale: string;
  entries: FaqEntry[];
};

export function QuestionsPageContent({ locale, entries }: Props) {
  const t = useTranslations("questions");
  const [topicFilter, setTopicFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [askOpen, setAskOpen] = useState(false);
  const [listRef] = useAutoAnimate<HTMLDivElement>();

  const availableTopics = useMemo(
    () => ["all", ...QUESTION_TOPICS.filter((topic) => entries.some((e) => e.topic === topic))],
    [entries]
  );

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return entries.filter((entry) => {
      if (topicFilter !== "all" && entry.topic !== topicFilter) return false;
      if (!query) return true;
      const question = localizedText(entry, "question", locale) ?? "";
      const answer = localizedText(entry, "answer", locale) ?? "";
      return (
        question.toLowerCase().includes(query) || answer.toLowerCase().includes(query)
      );
    });
  }, [entries, topicFilter, search, locale]);

  return (
    <div className="mt-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={t("searchPlaceholder")}
          className="min-h-12 max-w-sm text-base"
        />
        <Dialog open={askOpen} onOpenChange={setAskOpen}>
          <DialogTrigger
            render={
              <Button className="tap-target bg-brand text-brand-foreground hover:bg-brand/90" />
            }
          >
            {t("askButton")}
          </DialogTrigger>
          <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-md">
            <DialogHeader>
              <DialogTitle>{t("askButton")}</DialogTitle>
            </DialogHeader>
            <AskQuestionForm locale={locale} onSuccess={() => setAskOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      {availableTopics.length > 1 && (
        <div className="mt-6 flex flex-wrap gap-2">
          {availableTopics.map((topic) => (
            <button
              key={topic}
              type="button"
              onClick={() => setTopicFilter(topic)}
              className={cn(
                "tap-target rounded-full border px-3 py-1 text-sm",
                topicFilter === topic
                  ? "border-brand bg-brand text-brand-foreground"
                  : "border-border"
              )}
            >
              {topic === "all" ? t("allTopics") : t(`topics.${topic}`)}
            </button>
          ))}
        </div>
      )}

      <p className="mt-6 rounded-lg border border-dashed border-border bg-card px-4 py-3 text-sm text-muted-foreground">
        {t("disclaimer")}
      </p>

      <div ref={listRef} className="mt-6">
        {filtered.length === 0 ? (
          <p className="rounded-xl border border-dashed border-border px-6 py-12 text-center text-muted-foreground">
            {entries.length === 0 ? t("emptyAll") : t("emptyFiltered")}
          </p>
        ) : (
          <Accordion multiple>
            {filtered.map((entry) => {
              const question = localizedText(entry, "question", locale);
              const answer = localizedText(entry, "answer", locale);
              if (!question || !answer) return null;
              return (
                <AccordionItem key={entry._id} value={entry._id}>
                  <AccordionTrigger className="text-base">{question}</AccordionTrigger>
                  <AccordionContent>
                    <p className="whitespace-pre-line pb-2 text-muted-foreground">{answer}</p>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        )}
      </div>
    </div>
  );
}
