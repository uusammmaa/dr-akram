"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Landmark } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { featuredItems } from "@/lib/home-data";
import type { FeaturedHomeItem } from "@/lib/sanity/types";
import {
  FadeInStagger,
  FadeInItem,
} from "@/components/motion/FadeIn";
import { SectionHeading } from "@/components/home/SectionHeading";

type Props = {
  items?: FeaturedHomeItem[];
  imageBlurs?: Record<string, string>;
};

export function HomeFeaturedGrid({ items, imageBlurs }: Props) {
  const t = useTranslations();
  const hasCms = items && items.length > 0;

  return (
    <section className="home-section bg-muted/40">
      <div className="mx-auto max-w-6xl px-4">
        <FadeInStagger>
          <FadeInItem>
            <SectionHeading
              label={t("home.featuredLabel")}
              title={t("home.featuredTitle")}
              centered
              className="mx-auto"
            />
          </FadeInItem>

          {hasCms ? (
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {items.map((item) => (
                <FadeInItem key={item.id}>
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Link
                      href={item.href}
                      className="group relative flex aspect-[4/5] flex-col justify-end overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-sm"
                    >
                      {item.imageUrl ? (
                        <Image
                          src={item.imageUrl}
                          alt={item.title}
                          fill
                          sizes="(max-width: 640px) 50vw, 280px"
                          placeholder={imageBlurs?.[item.id] ? "blur" : "empty"}
                          blurDataURL={imageBlurs?.[item.id]}
                          className="object-cover transition-transform group-hover:scale-105"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-brand/80 via-brand/30 to-accent/50">
                          {item.kind === "book" ? (
                            <BookOpen className="size-16 text-brand-foreground/40" aria-hidden />
                          ) : (
                            <Landmark className="size-16 text-brand-foreground/40" aria-hidden />
                          )}
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-brand/80 via-brand/20 to-transparent" />
                      <div className="relative">
                        {item.badge && (
                          <span className="inline-block rounded-full bg-gold/90 px-2 py-0.5 text-xs font-medium text-gold-foreground">
                            {item.badge}
                          </span>
                        )}
                        <h3 className="mt-2 text-lg font-semibold text-brand-foreground">
                          {item.title}
                        </h3>
                        <span className="mt-2 inline-flex items-center gap-1 text-sm text-brand-foreground/80 group-hover:text-brand-foreground">
                          {t("home.viewAll")}
                          <ArrowRight className="size-4 rtl:rotate-180" />
                        </span>
                      </div>
                    </Link>
                  </motion.div>
                </FadeInItem>
              ))}
            </div>
          ) : (
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {featuredItems.map((item) => (
                <FadeInItem key={item.id}>
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Link
                      href={item.href}
                      className="group relative flex aspect-[4/5] flex-col justify-end overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-sm"
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-brand/80 via-brand/30 to-accent/50 transition-opacity group-hover:from-brand/90" />
                      <div className="absolute inset-0 flex items-center justify-center opacity-30">
                        <item.icon className="size-16 text-brand" aria-hidden />
                      </div>
                      <div className="relative">
                        <span className="inline-block rounded-full bg-gold/90 px-2 py-0.5 text-xs font-medium text-gold-foreground">
                          {t("common.comingSoon")}
                        </span>
                        <h3 className="mt-2 text-lg font-semibold text-brand-foreground">
                          {t(item.titleKey)}
                        </h3>
                        <span className="mt-2 inline-flex items-center gap-1 text-sm text-brand-foreground/80 group-hover:text-brand-foreground">
                          {t("home.viewAll")}
                          <ArrowRight className="size-4 rtl:rotate-180" />
                        </span>
                      </div>
                    </Link>
                  </motion.div>
                </FadeInItem>
              ))}
            </div>
          )}
        </FadeInStagger>
      </div>
    </section>
  );
}
