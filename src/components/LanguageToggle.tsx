"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

type LanguageToggleProps = {
  className?: string;
};

export function LanguageToggle({ className }: LanguageToggleProps) {
  const locale = useLocale();
  const pathname = usePathname();
  const t = useTranslations("common");

  const nextLocale = locale === "en" ? "ur" : "en";
  const label = locale === "en" ? t("languageToggle") : "EN";

  return (
    <Link
      href={pathname}
      locale={nextLocale}
      className={cn(
        "tap-target inline-flex rounded-lg border border-border bg-card px-4 text-sm font-medium text-brand hover:bg-accent",
        className
      )}
      aria-label={`Switch to ${nextLocale === "ur" ? "Urdu" : "English"}`}
    >
      {label}
    </Link>
  );
}
