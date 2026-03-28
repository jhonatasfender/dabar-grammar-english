import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { WebPageJsonLd } from "@/components/seo/json-ld";
import { SitePageLayout } from "@/components/site/site-page-layout";
import { isLocale, type Locale } from "@/lib/content/constants";
import { getSitePage } from "@/lib/content/site-pages";
import { buildSitePageMetadata } from "@/lib/seo/build-metadata";
import { allSitePages } from "contentlayer/generated";

export function generateStaticParams() {
  return allSitePages
    .filter((p) => p.slug === "contribute")
    .map((p) => ({ locale: p.locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const page = getSitePage(raw as Locale, "contribute");
  if (!page) return {};
  return buildSitePageMetadata({
    locale: raw as Locale,
    slug: "contribute",
    title: page.title,
    description: page.description,
  });
}

export default async function ContributePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const page = getSitePage(locale, "contribute");
  if (!page) notFound();
  return (
    <>
      <WebPageJsonLd
        title={page.title}
        description={page.description}
        locale={locale}
        path={`/${locale}/contribute`}
      />
      <SitePageLayout page={page} locale={locale} />
    </>
  );
}
