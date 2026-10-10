"use client";

import Image from "next/image";
import { ArrowRight, BookOpen, Mic, Newspaper } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { Lecture } from "@/lib/sanity/types";
import { localizedText } from "@/lib/i18n/cms";
import { getYouTubeThumbnail } from "@/lib/sanity/youtube";
import {
  FadeInStagger,
  FadeInItem,
} from "@/components/motion/FadeIn";
import { SectionHeading } from "@/components/home/SectionHeading";

type Props = {
  locale: string;
  lectures?: Lecture[];
};

export function HomeLatestSection({ locale, lectures = [] }: Props) {
  const t = useTranslations();

  return (
    <section className="home-section bg-background">
      <div className="mx-auto max-w-6xl px-4">
        <FadeInStagger>
          <FadeInItem>
            <SectionHeading
              label={t("home.latestLabel")}
              title={t("home.latestTitle")}
              centered
              className="mx-auto"
            />
          </FadeInItem>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {lectures.length > 0
              ? lectures.map((lecture) => {
                  const title = localizedText(lecture, "title", locale);
                  const thumbnail = lecture.youtubeUrl
                    ? getYouTubeThumbnail(lecture.youtubeUrl)
                    : null;
                  if (!title) return null;
                  return (
                    <FadeInItem key={lecture._id}>
                      <Link
                        href="/lectures"
                        className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-colors hover:border-brand/40"
                      >
                        {thumbnail && (
                          <div className="relative aspect-video w-full bg-muted">
                            <Image
                              src={thumbnail}
                              alt=""
                              fill
                              sizes="(max-width: 640px) 100vw, 360px"
                              className="object-cover"
                            />
                          </div>
                        )}
                        <div className="flex flex-1 flex-col p-5">
                          {lecture.category && (
                            <span className="text-xs font-medium text-gold">
                              {lecture.category}
                            </span>
                          )}
                          <h3 className="mt-1 text-lg font-semibold text-brand">
                            {title}
                          </h3>
                          <span className="tap-target mt-4 inline-flex items-center gap-2 text-sm font-medium text-brand">
                            {t("home.watchLectures")}
                            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5" />
                          </span>
                        </div>
                      </Link>
                    </FadeInItem>
                  );
                })
              : (
                <FadeInItem>
                  <Link
                    href="/lectures"
                    className="group flex h-full flex-col rounded-2xl border border-dashed border-border bg-card p-6 transition-colors hover:border-brand/40 hover:bg-accent/30"
                  >
                    <div className="flex size-12 items-center justify-center rounded-xl bg-accent">
                      <Mic className="size-6 text-gold" aria-hidden />
                    </div>
                    <h3 className="mt-4 text-lg font-semibold text-brand">
                      {t("home.latestLectures")}
                    </h3>
                    <p className="mt-2 flex-1 text-sm text-muted-foreground">
                      {t("common.comingSoon")}
                    </p>
                    <span className="tap-target mt-4 inline-flex items-center gap-2 text-sm font-medium text-brand">
                      {t("home.viewAll")}
                      <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5" />
                    </span>
                  </Link>
                </FadeInItem>
              )}

            <FadeInItem>
              <Link
                href="/questions"
                className="group flex h-full flex-col rounded-2xl border border-dashed border-border bg-card p-6 transition-colors hover:border-brand/40 hover:bg-accent/30"
              >
                <div className="flex size-12 items-center justify-center rounded-xl bg-accent">
                  <BookOpen className="size-6 text-gold" aria-hidden />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-brand">
                  {t("home.latestQuestions")}
                </h3>
                <p className="mt-2 flex-1 text-sm text-muted-foreground">
                  {t("common.comingSoon")}
                </p>
                <span className="tap-target mt-4 inline-flex items-center gap-2 text-sm font-medium text-brand">
                  {t("home.viewAll")}
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5" />
                </span>
              </Link>
            </FadeInItem>

            <FadeInItem>
              <Link
                href="/afkar"
                className="group flex h-full flex-col rounded-2xl border border-dashed border-border bg-card p-6 transition-colors hover:border-brand/40 hover:bg-accent/30"
              >
                <div className="flex size-12 items-center justify-center rounded-xl bg-accent">
                  <Newspaper className="size-6 text-gold" aria-hidden />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-brand">
                  {t("home.latestAfkar")}
                </h3>
                <p className="mt-2 flex-1 text-sm text-muted-foreground">
                  {t("home.viewAll")}
                </p>
                <span className="tap-target mt-4 inline-flex items-center gap-2 text-sm font-medium text-brand">
                  {t("home.viewAll")}
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5" />
                </span>
              </Link>
            </FadeInItem>
          </div>
        </FadeInStagger>
      </div>
    </section>
  );
}
