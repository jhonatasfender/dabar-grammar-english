import type { Locale } from "@/lib/content/constants";

const OG_BY_LOCALE: Record<Locale, string> = {
  en: "en_US",
  pt: "pt_BR",
  es: "es_ES",
};

const ALL_OG = ["en_US", "pt_BR", "es_ES"] as const;

export function openGraphLocales(current: Locale): {
  locale: string;
  alternateLocale: string[];
} {
  const locale = OG_BY_LOCALE[current];
  return {
    locale,
    alternateLocale: ALL_OG.filter((l) => l !== locale),
  };
}
