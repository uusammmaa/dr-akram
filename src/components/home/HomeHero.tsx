"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";
import { Parallax } from "react-scroll-parallax";
import { Link } from "@/i18n/navigation";
import { PORTRAIT_SRC } from "@/lib/site-images";
import type { HomeHeroProps } from "@/lib/home-types";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { WaveDivider } from "@/components/home/WaveDivider";

export function HomeHero({
  tagline,
  portraitSrc,
  portraitBlur,
  locale,
}: HomeHeroProps) {
  const t = useTranslations();
  const prefersReducedMotion = useReducedMotion();
  const resolvedTagline = tagline ?? t("common.tagline");
  const resolvedPortrait = portraitSrc ?? PORTRAIT_SRC;
  const imageProps = portraitBlur
    ? { placeholder: "blur" as const, blurDataURL: portraitBlur }
    : {};

  return (
    <section className="hero-circles relative min-h-[90vh] overflow-hidden">
      <div className="absolute inset-0">
        {prefersReducedMotion ? (
          <Image
            src={resolvedPortrait}
            alt={t("common.siteName")}
            fill
            priority
            sizes="100vw"
            className="object-cover object-[center_28%]"
            {...imageProps}
          />
        ) : (
          <Parallax speed={-12} className="relative h-[115%] w-full">
            <Image
              src={resolvedPortrait}
              alt={t("common.siteName")}
              fill
              priority
              sizes="100vw"
              className="object-cover object-[center_28%]"
              {...imageProps}
            />
          </Parallax>
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-brand/85 via-brand/70 to-brand/90" />
      </div>

      <div className="relative mx-auto flex min-h-[90vh] max-w-6xl flex-col justify-center px-4 py-20">
        <motion.h1
          className={cn(
            "max-w-3xl text-3xl font-bold leading-tight text-brand-foreground sm:text-4xl lg:text-5xl",
            locale === "ur" && "font-urdu leading-relaxed"
          )}
          initial={prefersReducedMotion ? false : { opacity: 0, x: -32 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {t("common.siteName")}
        </motion.h1>

        <motion.div
          className={cn(
            "mt-8 max-w-md rounded-2xl border border-brand-foreground/20 bg-card/95 p-6 shadow-xl backdrop-blur-sm sm:max-w-lg",
            locale === "ur" ? "ms-auto" : "me-auto sm:me-0"
          )}
          initial={prefersReducedMotion ? false : { opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-gold">
            {t("home.heroCardTitle")}
          </p>
          <p className="mt-2 text-base font-medium text-brand">
            {resolvedTagline}
          </p>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            {t("home.intro")}
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Button
              render={<Link href="/contact" />}
              className="tap-target bg-brand text-brand-foreground hover:bg-brand/90"
            >
              {t("home.heroCtaContact")}
            </Button>
            <Button
              variant="outline"
              render={<Link href="/books" />}
              className="tap-target"
            >
              {t("home.heroCtaBooks")}
            </Button>
          </div>
        </motion.div>
      </div>

      <a
        href="#about"
        className="absolute bottom-24 start-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-1 text-brand-foreground/80 transition-colors hover:text-brand-foreground rtl:translate-x-1/2"
        aria-label={t("home.scrollDown")}
      >
        <span className="text-xs">{t("home.scrollDown")}</span>
        <ChevronDown className="size-5 animate-bounce" />
      </a>

      <div className="absolute inset-x-0 bottom-0 text-background">
        <WaveDivider />
      </div>
    </section>
  );
}
