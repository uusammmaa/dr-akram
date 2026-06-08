"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useTranslations } from "next-intl";
import type { Honor } from "@/lib/sanity/types";
import { localizedText } from "@/lib/i18n/cms";
import { sanityImageUrl } from "@/lib/sanity/image";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const PAGE_SIZE = 12;

type Props = {
  locale: string;
  honors: Honor[];
  imageBlurs?: Record<string, string>;
};

export function HonorsPageContent({ locale, honors, imageBlurs }: Props) {
  const t = useTranslations("honors");
  const [typeFilter, setTypeFilter] = useState("all");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [selected, setSelected] = useState<Honor | null>(null);
  const [gridRef] = useAutoAnimate<HTMLDivElement>();

  const types = useMemo(
    () => ["all", ...new Set(honors.map((h) => h.type).filter((v): v is string => !!v))],
    [honors]
  );

  const filtered = honors.filter(
    (h) => typeFilter === "all" || h.type === typeFilter
  );
  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  const selectedTitle = selected ? localizedText(selected, "title", locale) : undefined;
  const selectedImageUrl = selected?.image
    ? sanityImageUrl(selected.image, { width: 1200 })
    : undefined;

  if (honors.length === 0) {
    return (
      <p className="mt-8 rounded-xl border border-dashed border-border px-6 py-12 text-center text-muted-foreground">
        {t("emptyHonors")}
      </p>
    );
  }

  return (
    <>
      <div className="mt-8">
        {types.length > 1 && (
          <div className="mb-6 flex flex-wrap gap-2">
            {types.map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => {
                  setTypeFilter(type);
                  setVisibleCount(PAGE_SIZE);
                }}
                className={cn(
                  "tap-target rounded-full border px-3 py-1 text-sm",
                  typeFilter === type
                    ? "border-brand bg-brand text-brand-foreground"
                    : "border-border"
                )}
              >
                {type === "all" ? t("allTypes") : type}
              </button>
            ))}
          </div>
        )}

        <div ref={gridRef} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((honor) => {
            const title = localizedText(honor, "title", locale);
            const imageUrl = honor.image
              ? sanityImageUrl(honor.image, { width: 600 })
              : undefined;
            if (!title) return null;
            return (
              <button
                key={honor._id}
                type="button"
                onClick={() => setSelected(honor)}
                className="tap-target group overflow-hidden rounded-xl border border-border bg-card text-start shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="relative aspect-[4/3] w-full bg-muted">
                  {imageUrl ? (
                    <Image
                      src={imageUrl}
                      alt={title}
                      fill
                      sizes="(max-width: 640px) 50vw, 300px"
                      placeholder={imageBlurs?.[honor._id] ? "blur" : "empty"}
                      blurDataURL={imageBlurs?.[honor._id]}
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                      {honor.type ?? t("honor")}
                    </div>
                  )}
                </div>
                <div className="p-4">
                  {honor.type && (
                    <span className="text-xs font-medium text-gold">{honor.type}</span>
                  )}
                  <h3 className="mt-1 font-semibold text-brand">{title}</h3>
                  {(honor.organization || honor.year) && (
                    <p className="mt-1 text-sm text-muted-foreground">
                      {[honor.organization, honor.year].filter(Boolean).join(" · ")}
                    </p>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {hasMore && (
          <div className="mt-8 text-center">
            <button
              type="button"
              onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
              className="tap-target rounded-full border border-brand bg-brand px-6 py-2 text-sm font-medium text-brand-foreground"
            >
              {t("loadMore")}
            </button>
          </div>
        )}
      </div>

      <Dialog open={!!selected} onOpenChange={(open) => !open && setSelected(null)}>
        <DialogContent className="max-w-lg sm:max-w-2xl">
          {selected && selectedTitle && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedTitle}</DialogTitle>
                <DialogDescription>
                  {[selected.type, selected.organization, selected.event, selected.year]
                    .filter(Boolean)
                    .join(" · ")}
                </DialogDescription>
              </DialogHeader>
              {selectedImageUrl && (
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-muted">
                  <Image
                    src={selectedImageUrl}
                    alt={selectedTitle}
                    fill
                    sizes="(max-width: 768px) 100vw, 600px"
                    className="object-contain"
                  />
                </div>
              )}
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
