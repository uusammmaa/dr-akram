#!/usr/bin/env python3
"""One-shot script to write Phase 2 files. Run: python scripts/write_phase2.py"""
import json
import os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


def write(rel: str, content: str) -> None:
    full = os.path.join(ROOT, rel.replace("/", os.sep))
    os.makedirs(os.path.dirname(full), exist_ok=True)
    with open(full, "w", encoding="utf-8", newline="\n") as f:
        f.write(content.rstrip() + "\n")
    print(f"Wrote: {rel}")


# --- Components ---
write(
    "src/components/lectures/YouTubeFacade.tsx",
    '''"use client";

import { useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";
import { getYouTubeThumbnail, getYouTubeVideoId } from "@/lib/sanity/youtube";

type Props = {
  youtubeUrl: string;
  title: string;
  playLabel: string;
};

export function YouTubeFacade({ youtubeUrl, title, playLabel }: Props) {
  const [loaded, setLoaded] = useState(false);
  const videoId = getYouTubeVideoId(youtubeUrl);
  const thumbnail = getYouTubeThumbnail(youtubeUrl);

  if (!videoId) return null;

  if (loaded) {
    return (
      <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-muted">
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 h-full w-full border-0"
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setLoaded(true)}
      className="group relative aspect-video w-full overflow-hidden rounded-lg bg-muted"
      aria-label={playLabel}
    >
      {thumbnail ? (
        <Image
          src={thumbnail}
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, 400px"
          className="object-cover transition-transform group-hover:scale-105"
        />
      ) : null}
      <span className="absolute inset-0 flex items-center justify-center bg-black/30 transition-colors group-hover:bg-black/40">
        <span className="flex size-14 items-center justify-center rounded-full bg-brand text-brand-foreground shadow-lg">
          <Play className="size-7 fill-current" aria-hidden />
        </span>
      </span>
    </button>
  );
}
''',
)

write(
    "src/components/lectures/LecturesPageContent.tsx",
    '''"use client";

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
    () => ["all", ...new Set(lectures.map((l) => l.category).filter(Boolean))],
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
''',
)

write(
    "src/components/honors/HonorsPageContent.tsx",
    '''"use client";

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
    () => ["all", ...new Set(honors.map((h) => h.type).filter(Boolean))],
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
''',
)

write(
    "src/components/afkar/AfkarCarousel.tsx",
    '''"use client";

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
''',
)

write(
    "src/lib/sanity/plaiceholder.ts",
    '''import { getPlaiceholder } from "plaiceholder";

export async function getBlurDataUrl(src: string): Promise<string | undefined> {
  if (!src) return undefined;
  try {
    const res = await fetch(src);
    if (!res.ok) return undefined;
    const buffer = Buffer.from(await res.arrayBuffer());
    const { base64 } = await getPlaiceholder(buffer, { size: 10 });
    return base64;
  } catch {
    return undefined;
  }
}

export async function getBlurMap(
  items: { id: string; imageUrl?: string }[]
): Promise<Record<string, string>> {
  const entries = await Promise.all(
    items
      .filter((item) => item.imageUrl)
      .map(async (item) => {
        const blur = await getBlurDataUrl(item.imageUrl!);
        return blur ? ([item.id, blur] as const) : null;
      })
  );
  return Object.fromEntries(entries.filter(Boolean) as [string, string][]);
}
''',
)

# --- Pages ---
write(
    "src/app/[locale]/about/page.tsx",
    '''import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { CareerTimeline } from "@/components/about/CareerTimeline";
import { OrgCard } from "@/components/organizations/OrgCard";
import { localizedText } from "@/lib/i18n/cms";
import { PORTRAIT_SRC } from "@/lib/site-images";
import { sanityImageUrl } from "@/lib/sanity/image";
import { getBlurDataUrl } from "@/lib/sanity/plaiceholder";
import {
  getAboutPage,
  getOrganizations,
  getSiteSettings,
  sortMilestones,
} from "@/lib/sanity/queries";

type Props = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();

  const [about, settings, organizations] = await Promise.all([
    getAboutPage(),
    getSiteSettings(),
    getOrganizations(),
  ]);

  const bio =
    (about && localizedText(about, "bio", locale)) || t("about.bio");
  const milestones = about?.careerMilestones
    ? sortMilestones(about.careerMilestones)
    : [];
  const portraitSrc = settings?.portrait
    ? sanityImageUrl(settings.portrait, { width: 800 })
    : PORTRAIT_SRC;
  const portraitBlur = settings?.portrait
    ? await getBlurDataUrl(portraitSrc)
    : undefined;

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:py-12">
      <h1 className="text-2xl font-semibold text-brand sm:text-3xl">
        {t("about.title")}
      </h1>

      <div className="relative mx-auto mt-6 aspect-[5/6] w-full max-w-xs overflow-hidden rounded-2xl border border-border bg-muted shadow-sm">
        <Image
          src={portraitSrc}
          alt={t("common.siteName")}
          fill
          sizes="(max-width: 768px) 80vw, 320px"
          placeholder={portraitBlur ? "blur" : "empty"}
          blurDataURL={portraitBlur}
          className="object-cover object-[center_28%]"
        />
      </div>

      <article
        className="prose prose-lg mt-6 max-w-none text-foreground prose-headings:text-brand"
        dir={locale === "ur" ? "rtl" : "ltr"}
      >
        <p>{bio}</p>
      </article>

      {milestones.length > 0 && (
        <section className="mt-12">
          <h2 className="text-xl font-semibold text-brand">
            {t("about.timelineTitle")}
          </h2>
          <CareerTimeline milestones={milestones} locale={locale} />
        </section>
      )}

      {organizations.length > 0 && (
        <section className="mt-12">
          <h2 className="text-xl font-semibold text-brand">
            {t("organizations.title")}
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {organizations.map((org) => (
              <OrgCard
                key={org._id}
                org={org}
                locale={locale}
                labels={{
                  current: t("organizations.current"),
                  former: t("organizations.former"),
                }}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
''',
)

write(
    "src/app/[locale]/books/page.tsx",
    '''import { Suspense } from "react";
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
''',
)

write(
    "src/app/[locale]/lectures/page.tsx",
    '''import { getTranslations, setRequestLocale } from "next-intl/server";
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
''',
)

write(
    "src/app/[locale]/honors/page.tsx",
    '''import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { HonorsPageContent } from "@/components/honors/HonorsPageContent";
import { localizedText } from "@/lib/i18n/cms";
import { sanityImageUrl } from "@/lib/sanity/image";
import { getBlurMap } from "@/lib/sanity/plaiceholder";
import { getHonors } from "@/lib/sanity/queries";

type Props = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function HonorsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("honors");
  const honors = await getHonors();

  const imageBlurs = await getBlurMap(
    honors.map((h) => ({
      id: h._id,
      imageUrl: h.image ? sanityImageUrl(h.image, { width: 200 }) : undefined,
    }))
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:py-12">
      <h1 className="text-2xl font-semibold text-brand sm:text-3xl">
        {t("title")}
      </h1>
      <HonorsPageContent locale={locale} honors={honors} imageBlurs={imageBlurs} />
    </div>
  );
}
''',
)

write(
    "src/app/[locale]/services/page.tsx",
    '''import { BookOpen, GraduationCap, Mic } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { Button } from "@/components/ui/button";

type Props = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const sections = [
  { id: "dars", icon: BookOpen, titleKey: "darsTitle", descKey: "darsDesc" },
  {
    id: "economics",
    icon: GraduationCap,
    titleKey: "economicsTitle",
    descKey: "economicsDesc",
    linkKey: "economicsLink",
    href: "/books?tab=recommendations" as const,
  },
  { id: "speaking", icon: Mic, titleKey: "speakingTitle", descKey: "speakingDesc" },
] as const;

export default async function ServicesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("services");

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:py-12">
      <h1 className="text-2xl font-semibold text-brand sm:text-3xl">
        {t("title")}
      </h1>
      <p className="mt-4 text-muted-foreground">{t("intro")}</p>

      <div className="mt-10 space-y-8">
        {sections.map((section) => {
          const Icon = section.icon;
          return (
            <section
              key={section.id}
              className="rounded-2xl border border-border bg-card p-6 shadow-sm"
            >
              <div className="flex items-start gap-4">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-accent">
                  <Icon className="size-6 text-gold" aria-hidden />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-brand">
                    {t(section.titleKey)}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {t(section.descKey)}
                  </p>
                  {"linkKey" in section && section.href && (
                    <Link
                      href={section.href}
                      className="tap-target mt-4 inline-flex text-sm font-medium text-brand hover:underline"
                    >
                      {t(section.linkKey)}
                    </Link>
                  )}
                </div>
              </div>
            </section>
          );
        })}
      </div>

      <div className="mt-10 text-center">
        <Button render={<Link href="/contact" />} className="tap-target">
          {t("contactCta")}
        </Button>
      </div>
    </div>
  );
}
''',
)

write(
    "src/app/[locale]/afkar/page.tsx",
    '''import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { AfkarCarousel } from "@/components/afkar/AfkarCarousel";
import { sanityImageUrl } from "@/lib/sanity/image";
import { getBlurMap } from "@/lib/sanity/plaiceholder";
import { getAfkarIssues } from "@/lib/sanity/queries";

type Props = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function AfkarPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("afkar");
  const issues = await getAfkarIssues();

  const imageBlurs = await getBlurMap(
    issues.map((issue) => ({
      id: issue._id,
      imageUrl: issue.cover ? sanityImageUrl(issue.cover, { width: 200 }) : undefined,
    }))
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:py-12">
      <h1 className="text-2xl font-semibold text-brand sm:text-3xl">
        {t("title")}
      </h1>
      <p className="mt-4 max-w-2xl text-muted-foreground">{t("description")}</p>
      <AfkarCarousel issues={issues} imageBlurs={imageBlurs} />
    </div>
  );
}
''',
)

print("All Phase 2 files written")
