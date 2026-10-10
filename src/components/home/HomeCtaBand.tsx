"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/motion/FadeIn";

export function HomeCtaBand() {
  const t = useTranslations();

  return (
    <section className="relative overflow-hidden">
      <div
        className="absolute inset-0 bg-gradient-to-br from-brand via-brand/95 to-[#2d6a4f]"
        aria-hidden
      />
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 50%, var(--gold) 0%, transparent 50%), radial-gradient(circle at 80% 20%, var(--gold) 0%, transparent 40%)",
        }}
        aria-hidden
      />
      <div className="home-section relative mx-auto max-w-3xl px-4 text-center">
        <FadeIn>
          <h2 className="text-2xl font-semibold text-brand-foreground sm:text-3xl">
            {t("home.ctaBandTitle")}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-brand-foreground/85">
            {t("home.ctaBandDesc")}
          </p>
          <Button
            render={<Link href="/contact" />}
            className="tap-target mt-8 bg-gold text-gold-foreground hover:bg-gold/90"
            size="lg"
          >
            {t("home.ctaBandButton")}
          </Button>
        </FadeIn>
      </div>
    </section>
  );
}
