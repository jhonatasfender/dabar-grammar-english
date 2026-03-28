import type { Article } from "contentlayer/generated";
import Link from "next/link";
import { InlineMarkdown } from "@/components/reading/inline-markdown";
import { LanguageSwitch } from "@/components/reading/language-switch";
import { MdxBody } from "@/components/reading/mdx-body";
import { TypographyControls } from "@/components/reading/typography-controls";
import type { Locale } from "@/lib/content/constants";
import {
  getAllArticleIds,
  getArticle,
  getArticleSiblings,
} from "@/lib/content/articles";
import { formatThemeLine } from "@/lib/content/taxonomy";
import { getUi } from "@/lib/ui/strings";

export function ReadingLayout({
  article,
  locale,
}: {
  article: Article;
  locale: Locale;
}) {
  const ui = getUi(locale);
  const siblings = getArticleSiblings(article) as Partial<
    Record<Locale, Article>
  >;
  const validArticleIds = getAllArticleIds();
  const relatedResolved = article.relatedArticles
    .map((id) => ({ id, doc: getArticle(locale, id) }))
    .filter(
      (x): x is { id: string; doc: Article } =>
        x.doc !== undefined && x.id !== article.articleId,
    );

  return (
    <article className="reading-root mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <header className="mb-10 space-y-4 border-b border-stone-200 pb-8 dark:border-stone-700">
        <p className="text-sm tracking-wide text-amber-800 uppercase dark:text-amber-400">
          {formatThemeLine(article.theme, article.subtheme, locale)}
        </p>
        <h1 className="font-serif text-3xl leading-tight font-semibold tracking-tight text-stone-900 sm:text-4xl dark:text-stone-50">
          <InlineMarkdown text={article.title} variant="inline" />
        </h1>
        {article.description ? (
          <div className="space-y-2 text-lg leading-relaxed text-stone-600 dark:text-stone-400">
            <InlineMarkdown text={article.description} variant="block" />
          </div>
        ) : null}
        {article.summary ? (
          <aside
            className="rounded-xl border border-amber-200/80 bg-amber-50/90 px-4 py-3 text-base leading-relaxed text-stone-800 dark:border-amber-500/30 dark:bg-amber-950/25 dark:text-amber-50"
            aria-label={ui.summaryLabel}
          >
            <p className="font-sans text-xs font-semibold tracking-wide text-amber-900 uppercase dark:text-amber-200/90">
              {ui.summaryLabel}
            </p>
            <div className="mt-2 space-y-2 font-serif text-stone-900 dark:text-stone-100">
              <InlineMarkdown text={article.summary} variant="block" />
            </div>
          </aside>
        ) : null}
        <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
          <p className="text-sm text-stone-500 dark:text-stone-500">
            {ui.readingTime(article.readingTimeMinutes)}
          </p>
          <TypographyControls label={ui.textSize} />
        </div>
        <LanguageSwitch
          article={article}
          siblings={siblings}
          labelArticleLanguage={ui.articleLanguage}
          notPublishedTitle={ui.notPublished}
        />
      </header>

      <div className="reading-prose font-serif">
        <MdxBody
          code={article.body.code}
          locale={locale}
          validArticleIds={validArticleIds}
        />
      </div>

      {relatedResolved.length > 0 ? (
        <section
          className="mt-10 border-t border-stone-200 pt-8 dark:border-stone-700"
          aria-label={ui.relatedArticles}
        >
          <h2 className="mb-3 font-sans text-sm font-semibold tracking-wide text-stone-700 uppercase dark:text-stone-300">
            {ui.relatedArticles}
          </h2>
          <ul className="list-inside list-disc space-y-2 text-base text-stone-700 dark:text-stone-300">
            {relatedResolved.map(({ id, doc }) => (
              <li key={id}>
                <Link
                  href={`/${locale}/${id}`}
                  className="text-amber-900 underline decoration-amber-700/40 underline-offset-2 hover:decoration-amber-700 dark:text-amber-200 dark:decoration-amber-400/50 dark:hover:decoration-amber-300"
                >
                  {doc.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {article.references.length > 0 ? (
        <footer className="mt-12 border-t border-stone-200 pt-8 dark:border-stone-700">
          <h2 className="mb-3 font-sans text-sm font-semibold tracking-wide text-stone-700 uppercase dark:text-stone-300">
            {ui.references}
          </h2>
          <ul className="list-inside list-disc space-y-1 text-sm text-stone-600 dark:text-stone-400">
            {article.references.map((ref) => (
              <li key={ref}>{ref}</li>
            ))}
          </ul>
        </footer>
      ) : null}
    </article>
  );
}
