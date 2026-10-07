"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";
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
  const sectionRef = useRef<HTMLElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const resolvedTagline = tagline ?? t("common.tagline");
  const resolvedPortrait = portraitSrc ?? PORTRAIT_SRC;
  const imageProps = portraitBlur
    ? { placeholder: "blur" as const, blurDataURL: portraitBlur }
    : {};

  useGSAP(
    () => {
      if (prefersReducedMotion || !portraitRef.current || !sectionRef.current) {
        return;
      }

      gsap.registerPlugin(ScrollTrigger);
      gsap.fromTo(
        portraitRef.current,
        { yPercent: -6 },
        {
          yPercent: 6,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    },
    { scope: sectionRef, dependencies: [prefersReducedMotion] }
  );

  return (
    <section
      ref={sectionRef}
      className="hero-circles relative min-h-[calc(100svh-var(--site-header-height))]"
    >
      <div className="absolute inset-0 overflow-hidden">
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
          <div
            ref={portraitRef}
            className="absolute -inset-x-[10%] -top-[14%] -bottom-[14%]"
          >
            <Image
              src={resolvedPortrait}
              alt={t("common.siteName")}
              fill
              priority
              sizes="100vw"
              className="object-cover object-[center_28%]"
              {...imageProps}
            />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-brand/85 via-brand/70 to-brand/90" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[calc(100svh-var(--site-header-height))] max-w-6xl flex-col justify-center px-4 pt-8 pb-[calc(var(--mobile-bar-height)+6.5rem)] sm:pt-12 sm:pb-[calc(var(--mobile-bar-height)+7.5rem)] md:pt-16 md:pb-32 [@media(max-height:720px)]:pt-4 [@media(max-height:720px)]:pb-[calc(var(--mobile-bar-height)+5.5rem)]">
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
            "mt-4 max-w-md rounded-2xl border border-brand-foreground/20 bg-card/95 p-4 shadow-xl backdrop-blur-sm sm:mt-8 sm:max-w-lg sm:p-6 [@media(max-height:720px)]:mt-3 [@media(max-height:720px)]:p-3",
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
          <div className="mt-5 flex flex-wrap gap-3 [@media(max-height:720px)]:mt-3">
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
        className="absolute start-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-1 text-brand-foreground/80 transition-colors hover:text-brand-foreground bottom-[calc(var(--mobile-bar-height)+3.25rem)] sm:bottom-[calc(var(--mobile-bar-height)+4.25rem)] md:bottom-24 rtl:translate-x-1/2"
        aria-label={t("home.scrollDown")}
      >
        <span className="text-xs">{t("home.scrollDown")}</span>
        <ChevronDown
          className={cn("size-5", !prefersReducedMotion && "animate-bounce")}
        />
      </a>

      <div className="pointer-events-none absolute inset-x-0 bottom-[var(--mobile-bar-height)] z-0 text-background md:bottom-0">
        <WaveDivider />
      </div>
    </section>
  );
}
