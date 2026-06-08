"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { useContactDrawer } from "@/components/ContactDrawerProvider";

export function ContactFormMobile() {
  const t = useTranslations("contact");
  const { open } = useContactDrawer();

  return (
    <Button
      type="button"
      onClick={open}
      className="tap-target w-full bg-brand text-brand-foreground hover:bg-brand/90"
    >
      {t("openForm")}
    </Button>
  );
}
