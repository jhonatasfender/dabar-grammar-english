import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getArticlesByLocale,
  groupArticlesForHome,
} from "@/lib/content/articles";
import { isLocale, LOCALE_LABELS, type Locale } from "@/lib/content/constants";
import { buildLocalePageMetadata } from "@/lib/seo/build-metadata";
import { getSubthemeLabel, getThemeLabel } from "@/lib/content/taxonomy";
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
    pathSegment: "",
    title: ui.navArticles,
    description: ui.homeIntro,
  });
}

export default async function LocaleHomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const grouped = groupArticlesForHome(getArticlesByLocale(locale));
  const ui = getUi(locale);

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <p className="mb-2 text-sm font-medium text-amber-800 dark:text-amber-400">
        {LOCALE_LABELS[locale]}
      </p>
      <h1 className="font-serif text-3xl font-semibold tracking-tight text-stone-900 sm:text-4xl dark:text-stone-50">
        {ui.navArticles}
      </h1>
      <p className="mt-4 text-lg leading-relaxed text-stone-600 dark:text-stone-400">
        {ui.homeIntro}
      </p>

      <div className="mt-10 space-y-12">
        {grouped.map(({ theme, subthemes }) => (
          <section key={theme} className="space-y-6">
            <h2 className="border-b border-stone-200 pb-2 font-sans text-sm font-semibold tracking-wide text-stone-700 uppercase dark:border-stone-600 dark:text-stone-300">
              {getThemeLabel(theme, locale)}
            </h2>
            {subthemes.map(({ subtheme, articles }) => (
              <div key={`${theme}-${subtheme}`} className="space-y-3">
                <h3 className="font-sans text-xs font-medium tracking-wide text-stone-500 uppercase dark:text-stone-400">
                  {getSubthemeLabel(subtheme, locale)}
                </h3>
                <ul className="space-y-3">
                  {articles.map((a) => (
                    <li key={a._id}>
                      <Link
                        href={a.url}
                        className="group block rounded-xl border border-stone-200 bg-[var(--surface)] p-5 transition hover:border-amber-600/50 dark:border-stone-700 dark:hover:border-amber-500/40"
                      >
                        <span className="font-medium text-stone-900 group-hover:text-amber-950 dark:text-stone-50 dark:group-hover:text-amber-100">
                          {a.title}
                        </span>
                        {a.description ? (
                          <span className="mt-2 block text-sm text-stone-600 dark:text-stone-400">
                            {a.description}
                          </span>
                        ) : null}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </section>
        ))}
      </div>
    </div>
  );
}
