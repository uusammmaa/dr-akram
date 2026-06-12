"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { CareerMilestoneItem } from "@/lib/sanity/types";
import { localizedText } from "@/lib/i18n/cms";
import { cn } from "@/lib/utils";

type Props = {
  milestones: CareerMilestoneItem[];
  locale: string;
  variant?: "page" | "home";
};

export function CareerTimeline({ milestones, locale, variant = "page" }: Props) {
  const containerRef = useRef<HTMLOListElement>(null);

  useGSAP(
    () => {
      if (variant !== "page" || !containerRef.current) return;
      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (prefersReduced) return;

      gsap.registerPlugin(ScrollTrigger);

      const items = containerRef.current.querySelectorAll(".timeline-item");
      items.forEach((item) => {
        gsap.fromTo(
          item,
          { opacity: 0, x: locale === "ur" ? 24 : -24 },
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    },
    { scope: containerRef, dependencies: [locale, variant, milestones.length] }
  );

  if (milestones.length === 0) return null;

  if (variant === "page") {
    return (
      <ol
        ref={containerRef}
        className="mt-6 space-y-4 border-s-2 border-gold ps-6"
      >
        {milestones.map((item) => {
          const title = localizedText(item, "title", locale);
          const description = localizedText(item, "description", locale);
          if (!title) return null;
          return (
            <li key={item._key} className="timeline-item relative">
              <span className="absolute -start-[1.6rem] top-1 flex size-3 rounded-full bg-brand" />
              {item.year && (
                <span className="text-sm font-semibold text-gold">{item.year}</span>
              )}
              <p className="mt-1 text-base">{title}</p>
              {description && (
                <p className="mt-1 text-sm text-muted-foreground">{description}</p>
              )}
            </li>
          );
        })}
      </ol>
    );
  }

  return (
    <ol className="space-y-8">
      {milestones.map((item, index) => {
        const title = localizedText(item, "title", locale);
        if (!title) return null;
        const isEven = index % 2 === 0;
        return (
          <li
            key={item._key}
            className={cn(
              "relative md:grid md:grid-cols-2 md:gap-8",
              !isEven && "md:[&>div:first-child]:order-2"
            )}
          >
            <div className="hidden md:block" />
            <div
              className={cn(
                "relative rounded-xl border border-border bg-card p-5 shadow-sm md:max-w-sm",
                isEven ? "md:justify-self-end" : "md:justify-self-start"
              )}
            >
              <div className="absolute top-5 hidden size-3 rounded-full bg-gold md:-start-1.5 md:block" />
              {item.year && (
                <span className="text-sm font-semibold text-gold">{item.year}</span>
              )}
              <p className="mt-1 text-base leading-relaxed">{title}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
