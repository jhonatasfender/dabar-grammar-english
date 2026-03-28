import Link from "next/link";
import type { SitePage } from "contentlayer/generated";
import type { Locale } from "@/lib/content/constants";
import { LOCALE_LABELS } from "@/lib/content/constants";
import {
  readingLocaleActiveChipClass,
  readingLocaleLinkChipClass,
  readingLocaleMissingChipClass,
} from "@/lib/ui/reading-locale-chip-classes";

const ORDER: Locale[] = ["pt", "en", "es"];

export function SitePageLanguageSwitch({
  page,
  siblings,
  labelPageLanguage,
  notPublishedTitle,
}: {
  page: SitePage;
  siblings: Partial<Record<Locale, SitePage>>;
  labelPageLanguage: string;
  notPublishedTitle: string;
}) {
  return (
    <div className="reading-locale-switch flex flex-wrap items-center gap-2 text-sm">
      <span className="font-medium text-stone-600 dark:text-stone-400">
        {labelPageLanguage}
      </span>
      <div className="flex flex-wrap gap-2">
        {ORDER.map((loc) => {
          const isCurrent = loc === page.locale;
          const target = isCurrent ? page : siblings[loc];
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
