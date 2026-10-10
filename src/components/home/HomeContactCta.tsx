"use client";

import { MessageCircle, Phone } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useContactDrawer } from "@/components/ContactDrawerProvider";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/motion/FadeIn";

export function HomeContactCta() {
  const t = useTranslations();
  const tContact = useTranslations("contact");
  const { open } = useContactDrawer();

  return (
    <section className="home-section border-t border-border bg-card">
      <div className="mx-auto max-w-3xl px-4 text-center">
        <FadeIn>
          <h2 className="text-2xl font-semibold text-brand sm:text-3xl">
            {t("home.contactSectionTitle")}
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            {t("home.contactSectionDesc")}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Button
              render={<Link href="/contact" />}
              className="tap-target bg-brand text-brand-foreground hover:bg-brand/90"
              size="lg"
            >
              <Phone className="size-4" />
              {t("nav.contact")}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={open}
              className="tap-target"
              size="lg"
            >
              <MessageCircle className="size-4" />
              {tContact("openForm")}
            </Button>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
