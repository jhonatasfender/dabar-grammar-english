import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getArticlesByLocale,
  groupArticlesForHome,
} from "@/lib/content/articles";
import { isLocale, type Locale } from "@/lib/content/constants";
import { buildLocalePageMetadata } from "@/lib/seo/build-metadata";
import { getSubthemeLabel, getThemeLabel } from "@/lib/content/taxonomy";
import { InlineMarkdown } from "@/components/reading/inline-markdown";
import { HomeSubthemeDetails } from "@/components/home-subtheme-details";
import { getUi } from "@/lib/ui/strings";
import type { ArticleTheme } from "@/lib/content/taxonomy";
import { LocaleSwitchLinks } from "@/components/locale-switch-links";

/** Full-width rows on small screens: easier taps and no awkward chip wrapping. */
const homeThemeMobileIndexLinkClass = [
  "block min-h-11 w-full px-4 py-3 text-left text-sm leading-snug font-medium text-stone-800",
  "transition-colors",
  "hover:bg-stone-100 active:bg-stone-200",
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-amber-600",
  "dark:text-stone-100 dark:hover:bg-stone-800/80 dark:active:bg-stone-800",
  "dark:focus-visible:outline-amber-500",
].join(" ");

const homeThemeHeadingClass = [
  "border-b border-stone-200 pb-2 font-sans text-sm font-semibold tracking-wide",
  "text-stone-700 uppercase dark:border-stone-600 dark:text-stone-300",
].join(" ");

const homeArticleCardLinkClass = [
  "group/link block rounded-lg border border-transparent bg-stone-50/80 p-4 transition",
  "hover:border-amber-600/45 dark:bg-stone-900/40 dark:hover:border-amber-500/35",
].join(" ");

function themeSectionId(theme: ArticleTheme): string {
  return `theme-${theme}`;
}

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
      <h1 className="font-serif text-3xl font-semibold tracking-tight text-stone-900 sm:text-4xl dark:text-stone-50">
        {ui.navArticles}
      </h1>
      <p className="mt-4 text-lg leading-relaxed text-stone-600 dark:text-stone-400">
        {ui.homeIntro}
      </p>
      <div className="mt-6">
        <LocaleSwitchLinks
          locale={locale}
          ariaLabel={ui.navLocaleHint}
          leadingLabel={`${ui.navLocaleHint}:`}
        />
      </div>

      <div className="mt-10 lg:grid lg:grid-cols-[minmax(0,1fr)_11.5rem] lg:gap-x-10 xl:grid-cols-[minmax(0,1fr)_13rem]">
        <div className="min-w-0">
          <nav aria-label={ui.homeThemeIndex} className="mb-8 lg:hidden">
            <p className="mb-2 text-xs font-semibold tracking-wide text-stone-500 uppercase dark:text-stone-400">
              {ui.homeThemeIndex}
            </p>
            <ul
              className={[
                "overflow-hidden rounded-xl border border-stone-200 bg-(--surface)",
                "dark:border-stone-600",
              ].join(" ")}
            >
              {grouped.map(({ theme }, i) => (
                <li
                  key={theme}
                  className={
                    i > 0
                      ? "border-t border-stone-200 dark:border-stone-600"
                      : undefined
                  }
                >
                  <a
                    href={`#${themeSectionId(theme)}`}
                    className={homeThemeMobileIndexLinkClass}
                  >
                    {getThemeLabel(theme, locale)}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="space-y-12">
            {grouped.map(({ theme, subthemes }) => (
              <section
                key={theme}
                id={themeSectionId(theme)}
                className="scroll-mt-28 space-y-4"
              >
                <h2 className={homeThemeHeadingClass}>
                  {getThemeLabel(theme, locale)}
                </h2>
                <div className="space-y-3">
                  {subthemes.map(({ subtheme, articles }) => (
                    <HomeSubthemeDetails
                      key={`${theme}-${subtheme}`}
                      defaultOpen
                      summary={getSubthemeLabel(subtheme, locale)}
                    >
                      <ul className="space-y-3 border-t border-stone-200 px-3 py-4 dark:border-stone-600">
                        {articles.map((a) => (
                          <li key={a._id}>
                            <Link
                              href={a.url}
                              className={homeArticleCardLinkClass}
                            >
                              <span className="font-medium text-stone-900 group-hover/link:text-amber-950 dark:text-stone-50 dark:group-hover/link:text-amber-100">
                                <InlineMarkdown
                                  text={a.title}
                                  variant="inline"
                                />
                              </span>
                              {a.description ? (
                                <div className="mt-2 space-y-1 text-sm text-stone-600 dark:text-stone-400">
                                  <InlineMarkdown
                                    text={a.description}
                                    variant="block"
                                  />
                                </div>
                              ) : null}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </HomeSubthemeDetails>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>

        <nav aria-label={ui.homeThemeIndex} className="hidden lg:block">
          <div className="sticky top-24 space-y-3 border-l border-stone-200 pl-5 dark:border-stone-600">
            <p className="text-xs font-semibold tracking-wide text-stone-500 uppercase dark:text-stone-400">
              {ui.homeThemeIndex}
            </p>
            <ul className="space-y-2">
              {grouped.map(({ theme }) => (
                <li key={theme}>
                  <a
                    href={`#${themeSectionId(theme)}`}
                    className="block text-sm leading-snug text-stone-600 transition hover:text-amber-900 dark:text-stone-400 dark:hover:text-amber-200"
                  >
                    {getThemeLabel(theme, locale)}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
}
