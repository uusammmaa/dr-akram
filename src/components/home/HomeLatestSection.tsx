"use client";

import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { latestItems } from "@/lib/home-data";
import {
  FadeInStagger,
  FadeInItem,
} from "@/components/motion/FadeIn";
import { SectionHeading } from "@/components/home/SectionHeading";

export function HomeLatestSection() {
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
            {latestItems.map((item) => (
              <FadeInItem key={item.id}>
                <Link
                  href={item.href}
                  className="group flex h-full flex-col rounded-2xl border border-dashed border-border bg-card p-6 transition-colors hover:border-brand/40 hover:bg-accent/30"
                >
                  <div className="flex size-12 items-center justify-center rounded-xl bg-accent">
                    <item.icon className="size-6 text-gold" aria-hidden />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-brand">
                    {t(item.titleKey)}
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
            ))}
          </div>
        </FadeInStagger>
      </div>
    </section>
  );
}
