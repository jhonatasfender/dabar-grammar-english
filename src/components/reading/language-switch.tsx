import Link from "next/link";
import type { Article } from "contentlayer/generated";
import type { Locale } from "@/lib/content/constants";
import { LOCALE_LABELS } from "@/lib/content/constants";

const ORDER: Locale[] = ["pt", "en", "es"];

export function LanguageSwitch({
  article,
  siblings,
  labelArticleLanguage,
  notPublishedTitle,
}: {
  article: Article;
  siblings: Partial<Record<Locale, Article>>;
  labelArticleLanguage: string;
  notPublishedTitle: string;
}) {
  return (
    <div className="reading-locale-switch flex flex-wrap items-center gap-2 text-sm">
      <span className="font-medium text-stone-600 dark:text-stone-400">
        {labelArticleLanguage}
      </span>
      <div className="flex flex-wrap gap-2">
        {ORDER.map((loc) => {
          const isCurrent = loc === article.locale;
          const target = isCurrent ? article : siblings[loc];
          if (!target) {
            return (
              <span
                key={loc}
                className="rounded-md border border-dashed border-stone-300 px-2 py-1 text-stone-400 dark:border-stone-600 dark:text-stone-500"
                title={notPublishedTitle}
              >
                {LOCALE_LABELS[loc]} (—)
              </span>
            );
          }
          if (isCurrent) {
            return (
              <span
                key={loc}
                className="rounded-md border border-amber-700 bg-amber-50 px-2 py-1 font-medium text-amber-950 dark:border-amber-500 dark:bg-amber-950/40 dark:text-amber-100"
              >
                {LOCALE_LABELS[loc]}
              </span>
            );
          }
          return (
            <Link
              key={loc}
              href={target.url}
              className="rounded-md border border-stone-300 bg-white px-2 py-1 text-stone-800 transition-colors hover:border-stone-500 hover:bg-stone-50 hover:text-stone-950 dark:border-stone-600 dark:bg-stone-900 dark:text-stone-100 dark:hover:border-stone-500 dark:hover:bg-stone-800 dark:hover:text-stone-50"
            >
              {LOCALE_LABELS[loc]}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
