"use client";

import { useEffect } from "react";

type LocaleHtmlAttributesProps = {
  locale: string;
};

export function LocaleHtmlAttributes({ locale }: LocaleHtmlAttributesProps) {
  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === "ur" ? "rtl" : "ltr";
  }, [locale]);

  return null;
}
