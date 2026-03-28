import { allSitePages } from "contentlayer/generated";
import type { SitePage } from "contentlayer/generated";
import type { Locale } from "./constants";
import { isLocale } from "./constants";

export type SitePageSlug = SitePage["slug"];

export function getSitePage(
  locale: Locale,
  slug: SitePageSlug,
): SitePage | undefined {
  return allSitePages.find((p) => p.locale === locale && p.slug === slug);
}

export function getSitePageSiblings(
  page: SitePage,
): Partial<Record<Locale, SitePage>> {
  const map: Partial<Record<Locale, SitePage>> = {};
  for (const other of allSitePages) {
    if (
      other.slug === page.slug &&
      isLocale(other.locale) &&
      other._id !== page._id
    ) {
      map[other.locale] = other;
    }
  }
  return map;
}
