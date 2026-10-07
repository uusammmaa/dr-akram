"use client";

import { useMemo, useState } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useTranslations } from "next-intl";
import type { Lecture } from "@/lib/sanity/types";
import { localizedText } from "@/lib/i18n/cms";
import { cn } from "@/lib/utils";
import { YouTubeFacade } from "@/components/lectures/YouTubeFacade";

type Props = {
  locale: string;
  lectures: Lecture[];
};

export function LecturesPageContent({ locale, lectures }: Props) {
  const t = useTranslations("lectures");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [gridRef] = useAutoAnimate<HTMLDivElement>();

  const categories = useMemo(
    () => ["all", ...new Set(lectures.map((l) => l.category).filter((v): v is string => !!v))],
    [lectures]
  );

  const filtered = lectures.filter(
    (l) => categoryFilter === "all" || l.category === categoryFilter
  );

  if (lectures.length === 0) {
    return (
      <p className="mt-8 rounded-xl border border-dashed border-border px-6 py-12 text-center text-muted-foreground">
        {t("emptyLectures")}
      </p>
    );
  }

  return (
    <div className="mt-8">
      {categories.length > 1 && (
        <div className="mb-6 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategoryFilter(cat)}
              className={cn(
                "tap-target rounded-full border px-3 py-1 text-sm",
                categoryFilter === cat
                  ? "border-brand bg-brand text-brand-foreground"
                  : "border-border"
              )}
            >
              {cat === "all" ? t("allCategories") : cat}
            </button>
          ))}
        </div>
      )}

      <div ref={gridRef} className="grid gap-8 sm:grid-cols-2">
        {filtered.map((lecture) => {
          const title = localizedText(lecture, "title", locale);
          const description = localizedText(lecture, "description", locale);
          if (!title || !lecture.youtubeUrl) return null;
          return (
            <article
              key={lecture._id}
              className="flex flex-col rounded-xl border border-border bg-card p-4 shadow-sm"
            >
              <YouTubeFacade
                youtubeUrl={lecture.youtubeUrl}
                title={title}
                playLabel={t("watchVideo")}
              />
              <div className="mt-4">
                {lecture.category && (
                  <span className="text-xs font-medium text-gold">{lecture.category}</span>
                )}
                <h3 className="mt-1 font-semibold text-brand">{title}</h3>
                {description && (
                  <p className="mt-2 text-sm text-muted-foreground">{description}</p>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
