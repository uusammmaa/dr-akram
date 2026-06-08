"use client";

import Image from "next/image";
import { Play } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { credentialsKeys } from "@/lib/home-data";
import { PORTRAIT_SRC } from "@/lib/site-images";
import { FadeIn } from "@/components/motion/FadeIn";
import { SectionHeading } from "@/components/home/SectionHeading";

type HomeCredentialsProps = {
  portraitSrc?: string;
};

export function HomeCredentials({ portraitSrc }: HomeCredentialsProps) {
  const t = useTranslations();
  const resolvedPortrait = portraitSrc ?? PORTRAIT_SRC;

  return (
    <section id="about" className="home-section bg-background">
      <div className="mx-auto max-w-6xl px-4">
        <FadeIn>
          <SectionHeading
            label={t("home.aboutLabel")}
            title={t("home.credentialsTitle")}
          />
        </FadeIn>

        <div className="mt-10 grid items-center gap-10 md:grid-cols-2 md:gap-16">
          <FadeIn direction="left" className="relative mx-auto w-full max-w-sm">
            <div className="dot-pattern absolute -inset-4 rounded-full opacity-60" />
            <div className="relative mx-auto aspect-square w-full max-w-xs overflow-hidden rounded-full border-4 border-gold/30 bg-muted shadow-lg">
              <Image
                src={resolvedPortrait}
                alt={t("common.siteName")}
                fill
                sizes="(max-width: 768px) 80vw, 320px"
                className="object-cover object-[center_28%]"
              />
            </div>
            <Link
              href="/lectures"
              className="tap-target absolute bottom-2 end-2 flex size-12 items-center justify-center rounded-full bg-brand text-brand-foreground shadow-md transition-transform hover:scale-105"
              aria-label={t("home.watchLectures")}
            >
              <Play className="size-5 fill-current" />
            </Link>
          </FadeIn>

          <FadeIn direction="right" delay={0.15}>
            <ul className="space-y-4">
              {credentialsKeys.map((key) => (
                <li
                  key={key}
                  className="flex items-start gap-3 rounded-xl border border-border bg-card px-4 py-4 text-base shadow-sm"
                >
                  <span className="mt-1.5 size-2 shrink-0 rounded-full bg-gold" />
                  <span>{t(key)}</span>
                </li>
              ))}
            </ul>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
