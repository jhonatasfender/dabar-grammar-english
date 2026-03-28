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
import { LocaleSwitchLinks } from "@/components/locale-switch-links";
import type { Locale } from "@/lib/content/constants";
import { getUi } from "@/lib/ui/strings";
import { GITHUB_REPO_URL } from "@/lib/site/github";

const navLinkClass =
  "inline-flex items-center gap-1.5 rounded-md px-1 py-0.5 text-stone-600 transition-colors hover:bg-stone-100 hover:text-stone-900 sm:gap-0 sm:px-0 sm:py-0 sm:hover:bg-transparent dark:text-stone-400 dark:hover:bg-stone-800 dark:hover:text-stone-100 sm:dark:hover:bg-transparent";

const navIconClass = "size-4 shrink-0 opacity-90 sm:hidden";

export function SiteHeader({ locale }: { locale: Locale }) {
  const ui = getUi(locale);

  return (
    <header className="sticky top-0 z-50 border-b border-stone-200/80 bg-(--surface)/90 backdrop-blur-md dark:border-stone-700/80">
      <div className="mx-auto max-w-5xl px-4 py-3 sm:px-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between md:gap-6">
          <Link
            href={`/${locale}`}
            className="inline-flex w-fit shrink-0 items-center gap-2 font-semibold tracking-tight text-stone-900 dark:text-stone-100"
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

          <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-center sm:justify-between md:flex-1 md:justify-end md:gap-5">
            <nav
              aria-label={ui.navPrimaryAria}
              className="flex flex-wrap items-center gap-x-1 gap-y-1 text-sm sm:gap-x-3"
            >
              <Link href={`/${locale}`} className={navLinkClass}>
                <BookOpen className={navIconClass} aria-hidden />
                {ui.navArticles}
              </Link>
              <span
                className="hidden text-stone-300 select-none sm:inline dark:text-stone-600"
                aria-hidden
              >
                ·
              </span>
              <Link href={`/${locale}/about`} className={navLinkClass}>
                <Info className={navIconClass} aria-hidden />
                {ui.navAbout}
              </Link>
              <span
                className="hidden text-stone-300 select-none sm:inline dark:text-stone-600"
                aria-hidden
              >
                ·
              </span>
              <Link href={`/${locale}/contribute`} className={navLinkClass}>
                <HeartHandshake className={navIconClass} aria-hidden />
                {ui.navContribute}
              </Link>
              <span
                className="hidden text-stone-300 select-none sm:inline dark:text-stone-600"
                aria-hidden
              >
                ·
              </span>
              <Link href={`/${locale}/search`} className={navLinkClass}>
                <Search className={navIconClass} aria-hidden />
                {ui.navSearch}
              </Link>
            </nav>

            <div className="flex flex-wrap items-center gap-2 border-t border-stone-200/90 pt-3 sm:border-t-0 sm:border-l sm:pt-0 sm:pl-4 dark:border-stone-700/90">
              <div className="inline-flex items-center gap-2 rounded-lg bg-stone-100/90 px-2 py-1 dark:bg-stone-800/70">
                <a
                  href={GITHUB_REPO_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex size-8 shrink-0 items-center justify-center rounded-md text-stone-600 transition-colors hover:bg-stone-200 hover:text-stone-900 dark:text-stone-400 dark:hover:bg-stone-700 dark:hover:text-stone-100"
                  aria-label={ui.navGithubTitle}
                  title={ui.navGithubTitle}
                >
                  <GitBranch className="size-4" aria-hidden />
                </a>
                <span
                  className="h-5 w-px shrink-0 bg-stone-300 dark:bg-stone-600"
                  aria-hidden
                />
                <LocaleSwitchLinks
                  locale={locale}
                  ariaLabel={ui.navLocaleHint}
                  variant="compact"
                />
                <span
                  className="h-5 w-px shrink-0 bg-stone-300 dark:bg-stone-600"
                  aria-hidden
                />
                <ThemeToggle
                  lightLabel={ui.themeLight}
                  darkLabel={ui.themeDark}
                  ariaLight={ui.themeAriaLight}
                  ariaDark={ui.themeAriaDark}
                  showLabel={false}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
