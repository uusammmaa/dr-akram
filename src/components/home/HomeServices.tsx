"use client";

import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { servicesConfig } from "@/lib/home-data";
import { cn } from "@/lib/utils";
import {
  FadeInStagger,
  FadeInItem,
} from "@/components/motion/FadeIn";
import { SectionHeading } from "@/components/home/SectionHeading";

export function HomeServices() {
  const t = useTranslations();

  return (
    <section className="home-section bg-muted/40">
      <div className="mx-auto max-w-6xl px-4">
        <FadeInStagger>
          <FadeInItem>
            <SectionHeading
              label={t("home.servicesTitle")}
              title={t("home.servicesTitle")}
              centered
              className="mx-auto"
            />
          </FadeInItem>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {servicesConfig.map((service, index) => (
              <FadeInItem key={service.id}>
                <div
                  className={cn(
                    "flex h-full flex-col rounded-2xl border border-border bg-card p-6 transition-shadow",
                    index === 1 && "shadow-lg lg:-translate-y-2"
                  )}
                >
                  <div className="flex size-14 items-center justify-center rounded-xl bg-accent">
                    <service.icon className="size-7 text-gold" aria-hidden />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-brand">
                    {t(service.titleKey)}
                  </h3>
                  <p className="mt-2 flex-1 text-base leading-relaxed text-muted-foreground">
                    {t(service.descKey)}
                  </p>
                  <Link
                    href={service.href}
                    className="tap-target mt-4 inline-flex items-center gap-2 text-sm font-medium text-brand hover:text-brand/80"
                  >
                    {t("home.readMore")}
                    <ArrowRight className="size-4 rtl:rotate-180" />
                  </Link>
                </div>
              </FadeInItem>
            ))}
          </div>
        </FadeInStagger>
      </div>
    </section>
  );
}
