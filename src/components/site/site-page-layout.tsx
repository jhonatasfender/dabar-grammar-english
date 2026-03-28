import type { SitePage } from "contentlayer/generated";
import { InlineMarkdown } from "@/components/reading/inline-markdown";
import { MdxBody } from "@/components/reading/mdx-body";
import { TypographyControls } from "@/components/reading/typography-controls";
import { SitePageLanguageSwitch } from "@/components/site/site-page-language-switch";
import type { Locale } from "@/lib/content/constants";
import { getSitePageSiblings } from "@/lib/content/site-pages";
import { getUi } from "@/lib/ui/strings";

export function SitePageLayout({
  page,
  locale,
}: {
  page: SitePage;
  locale: Locale;
}) {
  const ui = getUi(locale);
  const siblings = getSitePageSiblings(page) as Partial<
    Record<Locale, SitePage>
  >;

  return (
    <article className="reading-root mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <header className="mb-10 space-y-4 border-b border-stone-200 pb-8 dark:border-stone-700">
        <p className="text-sm tracking-wide text-amber-800 uppercase dark:text-amber-400">
          {page.slug === "about"
            ? ui.sitePageKickerAbout
            : ui.sitePageKickerContribute}
        </p>
        <h1 className="font-serif text-3xl leading-tight font-semibold tracking-tight text-stone-900 sm:text-4xl dark:text-stone-50">
          <InlineMarkdown text={page.title} variant="inline" />
        </h1>
        {page.description ? (
          <div className="space-y-2 text-lg leading-relaxed text-stone-600 dark:text-stone-400">
            <InlineMarkdown text={page.description} variant="block" />
          </div>
        ) : null}
        <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
          <p className="text-sm text-stone-500 dark:text-stone-500">
            {ui.readingTime(page.readingTimeMinutes)}
          </p>
          <TypographyControls label={ui.textSize} />
        </div>
        <SitePageLanguageSwitch
          page={page}
          siblings={siblings}
          labelPageLanguage={ui.pageLanguage}
          notPublishedTitle={ui.notPublished}
        />
      </header>

      <div className="reading-prose font-serif">
        <MdxBody code={page.body.code} locale={locale} />
      </div>
    </article>
  );
}
