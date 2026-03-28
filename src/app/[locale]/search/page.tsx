import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { WebPageJsonLd } from "@/components/seo/json-ld";
import { SearchPanel } from "@/components/search/search-panel";
import { isLocale, type Locale } from "@/lib/content/constants";
import { buildLocalePageMetadata } from "@/lib/seo/build-metadata";
import { getSearchDocuments } from "@/lib/search/search-docs";
import { getUi } from "@/lib/ui/strings";

export function generateStaticParams() {
  return (["en", "pt", "es"] as const).map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const locale = raw as Locale;
  const ui = getUi(locale);
  return buildLocalePageMetadata({
    locale,
    pathSegment: "search",
    title: ui.searchTitle,
    description: ui.searchMetaDescription,
  });
}

export default async function SearchPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const ui = getUi(locale);
  const documents = getSearchDocuments();

  return (
    <div>
      <WebPageJsonLd
        title={ui.searchTitle}
        description={ui.searchMetaDescription}
        locale={locale}
        path={`/${locale}/search`}
      />
      <div className="border-b border-stone-200 bg-[var(--surface-muted)] px-4 py-8 sm:px-6 dark:border-stone-700">
        <h1 className="mx-auto max-w-5xl font-serif text-3xl font-semibold text-stone-900 dark:text-stone-50">
          {ui.searchTitle}
        </h1>
      </div>
      <SearchPanel
        locale={locale}
        documents={documents}
        placeholder={ui.searchPlaceholder}
        emptyHint={ui.searchEmpty}
        noResults={ui.searchNoResults}
      />
    </div>
  );
}
