"use client";

import { useTranslations } from "next-intl";
import { careerMilestones } from "@/lib/home-data";
import { cn } from "@/lib/utils";
import { FadeIn } from "@/components/motion/FadeIn";
import { SectionHeading } from "@/components/home/SectionHeading";

export function HomeTimeline() {
  const t = useTranslations();

  return (
    <section className="home-section bg-background">
      <div className="mx-auto max-w-4xl px-4">
        <FadeIn>
          <SectionHeading
            label={t("home.experienceLabel")}
            title={t("home.experienceTitle")}
            description={t("home.experienceDesc")}
            centered
            className="mx-auto"
          />
        </FadeIn>

        <div className="relative mt-12">
          <div
            className="absolute start-1/2 top-0 hidden h-full w-0 -translate-x-1/2 border-s-2 border-dashed border-gold/50 md:block rtl:translate-x-1/2"
            aria-hidden
          />

          <ol className="space-y-8">
            {careerMilestones.map((milestone, index) => {
              const isEven = index % 2 === 0;
              const Icon = milestone.icon;

              return (
                <FadeIn key={milestone.id} delay={index * 0.08}>
                  <li
                    className={cn(
                      "relative md:grid md:grid-cols-2 md:gap-8",
                      !isEven && "md:[&>div:first-child]:order-2"
                    )}
                  >
                    <div
                      className={cn(
                        "hidden md:block",
                        isEven ? "md:pe-8 md:text-end" : "md:ps-8"
                      )}
                    />
                    <div
                      className={cn(
                        "relative rounded-xl border border-border bg-card p-5 shadow-sm md:max-w-sm",
                        isEven
                          ? "md:justify-self-end md:pe-12"
                          : "md:justify-self-start md:ps-12"
                      )}
                    >
                      <div className="absolute top-5 hidden size-10 items-center justify-center rounded-full bg-brand text-brand-foreground md:flex md:-start-5 rtl:md:-end-5 rtl:md:start-auto">
                        <Icon className="size-5" aria-hidden />
                      </div>
                      <div className="flex items-start gap-3 md:block">
                        <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-brand text-brand-foreground md:hidden">
                          <Icon className="size-5" aria-hidden />
                        </div>
                        <div>
                          {milestone.year !== "—" && (
                            <span className="text-sm font-semibold text-gold">
                              {milestone.year}
                            </span>
                          )}
                          <p className="mt-1 text-base leading-relaxed">
                            {t(milestone.titleKey)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </li>
                </FadeIn>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
