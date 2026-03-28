"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/lib/content/constants";
import { isLocale, LOCALE_LABELS } from "@/lib/content/constants";
import { cn } from "@/lib/cn";

const ORDER: Locale[] = ["pt", "en", "es"];

const LOCALE_SHORT: Record<Locale, string> = {
  pt: "PT",
  en: "EN",
  es: "ES",
};

function hrefForPath(pathname: string, target: Locale): string {
  const segments = pathname.split("/").filter(Boolean);
  const [first, ...rest] = segments;
  if (isLocale(first)) {
    const suffix = rest.join("/");
    return suffix ? `/${target}/${suffix}` : `/${target}`;
  }
  return `/${target}`;
}

export function LocaleSwitchLinks({
  locale,
  ariaLabel,
  leadingLabel,
  variant = "default",
}: {
  locale: Locale;
  ariaLabel: string;
  leadingLabel?: string;
  variant?: "default" | "compact";
}) {
  const pathname = usePathname() || `/${locale}`;
  const compact = variant === "compact";
  const label = (loc: Locale) =>
    compact ? LOCALE_SHORT[loc] : LOCALE_LABELS[loc];

  return (
    <nav
      aria-label={ariaLabel}
      className={cn(
        "reading-locale-switch flex-wrap items-center",
        compact ? "inline-flex gap-1 text-xs" : "flex gap-2 text-sm",
      )}
    >
      {leadingLabel ? (
        <span className="font-medium text-stone-600 dark:text-stone-400">
          {leadingLabel}
        </span>
      ) : null}
      <div
        className={cn(
          "flex-wrap",
          compact ? "inline-flex gap-1" : "flex gap-2",
        )}
      >
        {ORDER.map((loc) => {
          const isCurrent = loc === locale;
          const href = hrefForPath(pathname, loc);
          if (isCurrent) {
            return (
              <span
                key={loc}
                className={cn(
                  "border border-amber-700 bg-amber-50 text-amber-950 dark:border-amber-500 dark:bg-amber-950/40 dark:text-amber-100",
                  compact
                    ? "rounded px-1.5 py-0.5 font-semibold tabular-nums"
                    : "rounded-md px-2 py-1 font-medium",
                )}
              >
                {label(loc)}
              </span>
            );
          }
          return (
            <Link
              key={loc}
              href={href}
              title={LOCALE_LABELS[loc]}
              className={cn(
                "border border-stone-300 bg-white text-stone-800 transition-colors hover:border-stone-500 hover:bg-stone-50 hover:text-stone-950 dark:border-stone-600 dark:bg-stone-900 dark:text-stone-100 dark:hover:border-stone-500 dark:hover:bg-stone-800 dark:hover:text-stone-50",
                compact
                  ? "rounded px-1.5 py-0.5 font-medium tabular-nums"
                  : "rounded-md px-2 py-1",
              )}
            >
              {label(loc)}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
