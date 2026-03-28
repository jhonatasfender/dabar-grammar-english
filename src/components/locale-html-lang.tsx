"use client";

import { useEffect } from "react";
import type { Locale } from "@/lib/content/constants";

export function LocaleHtmlLang({ locale }: { locale: Locale }) {
  useEffect(() => {
    document.documentElement.lang =
      locale === "en" ? "en" : locale === "es" ? "es" : "pt-BR";
  }, [locale]);
  return null;
}
