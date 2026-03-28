import type { Metadata } from "next";
import type { Locale } from "@/lib/content/constants";
import { stripInlineMarkdown } from "@/lib/markdown/strip-inline-markdown";
import { localeAlternatesForPath, sitePageAlternates } from "./alternates";
import type { SitePageSlug } from "@/lib/content/site-pages";
import { openGraphLocales } from "./open-graph-locale";

export function buildLocalePageMetadata(opts: {
  locale: Locale;
  pathSegment: string;
  title: string;
  description: string;
}): Metadata {
  const { locale, alternateLocale } = openGraphLocales(opts.locale);
  const path =
    opts.pathSegment === ""
      ? `/${opts.locale}`
      : `/${opts.locale}/${opts.pathSegment}`;

  return {
    title: opts.title,
    description: opts.description,
    alternates: localeAlternatesForPath(opts.pathSegment, opts.locale),
    openGraph: {
      title: opts.title,
      description: opts.description,
      url: path,
      locale,
      alternateLocale,
    },
  };
}

export function buildSitePageMetadata(opts: {
  locale: Locale;
  slug: SitePageSlug;
  title: string;
  description?: string;
}): Metadata {
  const title = stripInlineMarkdown(opts.title);
  const description = opts.description
    ? stripInlineMarkdown(opts.description)
    : undefined;
  const { locale, alternateLocale } = openGraphLocales(opts.locale);
  const path = `/${opts.locale}/${opts.slug}`;
  const alternates = sitePageAlternates(opts.slug, opts.locale);
  return {
    title,
    description,
    ...(alternates ? { alternates } : {}),
    openGraph: {
      title,
      description,
      url: path,
      locale,
      alternateLocale,
    },
  };
}
