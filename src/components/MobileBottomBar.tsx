"use client";

import { MessageCircle, Phone } from "lucide-react";
import { useTranslations } from "next-intl";
import { useContactDrawer } from "@/components/ContactDrawerProvider";

export function MobileBottomBar() {
  const t = useTranslations("common");
  const tNav = useTranslations("nav");
  const tContact = useTranslations("contact");
  const { open } = useContactDrawer();

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-card md:hidden">
      <div className="mx-auto grid max-w-6xl grid-cols-3 divide-x divide-border">
        <a
          href="#"
          className="tap-target flex flex-col items-center gap-1 py-2 text-xs font-medium text-brand"
          aria-label={t("call")}
          onClick={(e) => e.preventDefault()}
        >
          <Phone className="size-5" />
          <span>{t("call")}</span>
        </a>
        <a
          href="#"
          className="tap-target flex flex-col items-center gap-1 py-2 text-xs font-medium text-brand"
          aria-label={t("whatsapp")}
          onClick={(e) => e.preventDefault()}
        >
          <MessageCircle className="size-5" />
          <span>{t("whatsapp")}</span>
        </a>
        <button
          type="button"
          onClick={open}
          className="tap-target flex flex-col items-center gap-1 py-2 text-xs font-medium text-brand"
          aria-label={tContact("openForm")}
        >
          <span className="text-base leading-none">✉</span>
          <span>{tNav("contact")}</span>
        </button>
      </div>
    </div>
  );
}
