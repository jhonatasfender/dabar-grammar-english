import Link from "next/link";
import {
  BookOpen,
  GitBranch,
  GraduationCap,
  HeartHandshake,
  Info,
  Search,
} from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import type { Locale } from "@/lib/content/constants";
import { LOCALE_LABELS } from "@/lib/content/constants";
import { getUi } from "@/lib/ui/strings";
import { GITHUB_REPO_URL } from "@/lib/site/github";

export function SiteHeader({ locale }: { locale: Locale }) {
  const ui = getUi(locale);
  return (
    <header className="sticky top-0 z-50 border-b border-stone-200/80 bg-[var(--surface)]/90 backdrop-blur-md dark:border-stone-700/80">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link
          href={`/${locale}`}
          className="inline-flex items-center gap-2 font-semibold tracking-tight text-stone-900 dark:text-stone-100"
        >
          <GraduationCap
            className="size-5 shrink-0 text-amber-800 dark:text-amber-400"
            aria-hidden
          />
          <span className="flex min-w-0 flex-col leading-tight">
            <span className="truncate">Dabar</span>
            <span className="text-xs font-normal text-stone-600 dark:text-stone-400">
              Grammar English
            </span>
          </span>
        </Link>
        <nav className="flex max-w-[min(100%,42rem)] flex-wrap items-center justify-end gap-x-3 gap-y-2 text-sm sm:max-w-none">
          <Link
            href={`/${locale}`}
            className="inline-flex items-center gap-1.5 text-stone-600 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100"
          >
            <BookOpen className="size-4 shrink-0 opacity-90" aria-hidden />
            {ui.navArticles}
          </Link>
          <Link
            href={`/${locale}/about`}
            className="inline-flex items-center gap-1.5 text-stone-600 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100"
          >
            <Info className="size-4 shrink-0 opacity-90" aria-hidden />
            {ui.navAbout}
          </Link>
          <Link
            href={`/${locale}/contribute`}
            className="inline-flex items-center gap-1.5 text-stone-600 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100"
          >
            <HeartHandshake
              className="size-4 shrink-0 opacity-90"
              aria-hidden
            />
            {ui.navContribute}
          </Link>
          <Link
            href={`/${locale}/search`}
            className="inline-flex items-center gap-1.5 text-stone-600 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100"
          >
            <Search className="size-4 shrink-0 opacity-90" aria-hidden />
            {ui.navSearch}
          </Link>
          <a
            href={GITHUB_REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-stone-600 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100"
            title={ui.navGithubTitle}
          >
            <GitBranch className="size-4 shrink-0 opacity-90" aria-hidden />
            {ui.navGithub}
          </a>
          <span
            className="hidden text-stone-400 sm:inline"
            title={ui.navLocaleHint}
          >
            {LOCALE_LABELS[locale]}
          </span>
          <ThemeToggle
            lightLabel={ui.themeLight}
            darkLabel={ui.themeDark}
            ariaLight={ui.themeAriaLight}
            ariaDark={ui.themeAriaDark}
          />
        </nav>
      </div>
    </header>
  );
}
