import Link from "next/link";
import type { Article } from "contentlayer/generated";
import type { Locale } from "@/lib/content/constants";
import { LOCALE_LABELS } from "@/lib/content/constants";
import {
  readingLocaleActiveChipClass,
  readingLocaleLinkChipClass,
  readingLocaleMissingChipClass,
} from "@/lib/ui/reading-locale-chip-classes";

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
                className={readingLocaleMissingChipClass}
                title={notPublishedTitle}
              >
                {LOCALE_LABELS[loc]} (—)
              </span>
            );
          }
          if (isCurrent) {
            return (
              <span key={loc} className={readingLocaleActiveChipClass}>
                {LOCALE_LABELS[loc]}
              </span>
            );
          }
          return (
            <Link
              key={loc}
              href={target.url}
              className={readingLocaleLinkChipClass}
            >
              {LOCALE_LABELS[loc]}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
