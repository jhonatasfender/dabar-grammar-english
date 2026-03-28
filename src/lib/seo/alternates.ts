import type { Metadata } from "next";
import { getArticle } from "@/lib/content/articles";
import { DEFAULT_LOCALE, LOCALES, type Locale } from "@/lib/content/constants";
import { getSitePage, type SitePageSlug } from "@/lib/content/site-pages";
import { absoluteUrl } from "@/lib/site/url";

export function localeAlternatesForPath(
  pathWithoutLocale: string,
  currentLocale: Locale,
): Metadata["alternates"] {
  const suffix =
    pathWithoutLocale === "" || pathWithoutLocale === "/"
      ? ""
      : pathWithoutLocale.startsWith("/")
        ? pathWithoutLocale
        : `/${pathWithoutLocale}`;

  const languages: Record<string, string> = {};
  for (const loc of LOCALES) {
    languages[loc] = absoluteUrl(`/${loc}${suffix}`);
  }
  languages["x-default"] = absoluteUrl(`/${DEFAULT_LOCALE}${suffix}`);

  return {
    canonical: absoluteUrl(`/${currentLocale}${suffix}`),
    languages,
  };
}

export function sitePageAlternates(
  slug: SitePageSlug,
  currentLocale: Locale,
): Metadata["alternates"] | undefined {
  const current = getSitePage(currentLocale, slug);
  if (!current) return undefined;

  const languages: Record<string, string> = {};
  for (const loc of LOCALES) {
    if (getSitePage(loc, slug)) {
      languages[loc] = absoluteUrl(`/${loc}/${slug}`);
    }
  }
  const defaultPage =
    getSitePage(DEFAULT_LOCALE, slug) ??
    LOCALES.map((l) => getSitePage(l, slug)).find(Boolean);
  if (defaultPage) {
    languages["x-default"] = absoluteUrl(`/${defaultPage.locale}/${slug}`);
  }
  return {
    canonical: absoluteUrl(`/${currentLocale}/${slug}`),
    languages,
  };
}

export function articleAlternates(
  articleId: string,
  currentLocale: Locale,
): Metadata["alternates"] {
  const languages: Record<string, string> = {};
  for (const loc of LOCALES) {
    if (getArticle(loc, articleId)) {
      languages[loc] = absoluteUrl(`/${loc}/${articleId}`);
    }
  }
  const defaultArticle =
    getArticle(DEFAULT_LOCALE, articleId) ??
    LOCALES.map((l) => getArticle(l, articleId)).find(Boolean);
  if (defaultArticle) {
    languages["x-default"] = absoluteUrl(
      `/${defaultArticle.locale}/${articleId}`,
    );
  }
  return {
    canonical: absoluteUrl(`/${currentLocale}/${articleId}`),
    languages,
  };
}
