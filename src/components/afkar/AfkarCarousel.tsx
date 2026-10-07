"use client";

import { useCallback } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, ExternalLink, FileDown } from "lucide-react";
import { useTranslations } from "next-intl";
import type { AfkarIssue } from "@/lib/sanity/types";
import { sanityImageUrl } from "@/lib/sanity/image";
import { cn } from "@/lib/utils";

type Props = {
  issues: AfkarIssue[];
  imageBlurs?: Record<string, string>;
};

export function AfkarCarousel({ issues, imageBlurs }: Props) {
  const t = useTranslations("afkar");
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: "start", loop: issues.length > 2 });

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  if (issues.length === 0) {
    return (
      <p className="mt-8 rounded-xl border border-dashed border-border px-6 py-12 text-center text-muted-foreground">
        {t("emptyIssues")}
      </p>
    );
  }

  return (
    <div className="relative mt-8">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-4">
          {issues.map((issue) => {
            const coverUrl = issue.cover
              ? sanityImageUrl(issue.cover, { width: 400 })
              : undefined;
            const link = issue.externalLink;
            const Card = (
              <div className="flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm">
                <div className="relative aspect-[3/4] w-full bg-muted">
                  {coverUrl ? (
                    <Image
                      src={coverUrl}
                      alt={issue.title ?? ""}
                      fill
                      sizes="220px"
                      placeholder={imageBlurs?.[issue._id] ? "blur" : "empty"}
                      blurDataURL={imageBlurs?.[issue._id]}
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center p-4 text-center text-sm text-muted-foreground">
                      {issue.title}
                    </div>
                  )}
                </div>
                <div className="flex flex-1 flex-col p-4">
                  <h3 className="font-semibold text-brand">{issue.title}</h3>
                  {issue.month && issue.year && (
                    <p className="mt-1 text-sm text-muted-foreground">
                      {new Date(issue.year, issue.month - 1).toLocaleString("en", {
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                  )}
                  <div className="mt-3 flex flex-wrap gap-2">
                    {link && (
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-brand">
                        <ExternalLink className="size-3" />
                        {t("viewIssue")}
                      </span>
                    )}
                    {issue.pdf && (
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-gold">
                        <FileDown className="size-3" />
                        {t("downloadPdf")}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );

            if (link) {
              return (
                <a
                  key={issue._id}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn("tap-target min-w-0 shrink-0 basis-[220px] sm:basis-[260px]")}
                >
                  {Card}
                </a>
              );
            }

            return (
              <div
                key={issue._id}
                className="min-w-0 shrink-0 basis-[220px] sm:basis-[260px]"
              >
                {Card}
              </div>
            );
          })}
        </div>
      </div>

      {issues.length > 1 && (
        <>
          <button
            type="button"
            onClick={scrollPrev}
            className="tap-target absolute -start-3 top-1/2 z-10 flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-card shadow-sm rtl:start-auto rtl:-end-3"
            aria-label="Previous"
          >
            <ChevronLeft className="size-5 rtl:rotate-180" />
          </button>
          <button
            type="button"
            onClick={scrollNext}
            className="tap-target absolute -end-3 top-1/2 z-10 flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-card shadow-sm rtl:end-auto rtl:-start-3"
            aria-label="Next"
          >
            <ChevronRight className="size-5 rtl:rotate-180" />
          </button>
        </>
      )}
    </div>
  );
}
