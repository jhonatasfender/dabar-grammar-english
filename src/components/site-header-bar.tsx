"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  GraduationCap,
  HeartHandshake,
  Info,
  Menu,
  Search,
  X,
} from "lucide-react";
import { SiGithub } from "react-icons/si";
import { ThemeToggle } from "@/components/theme-toggle";
import { LocaleSwitchLinks } from "@/components/locale-switch-links";
import type { Locale } from "@/lib/content/constants";
import type { SiteHeaderUi } from "@/lib/ui/strings";
import { GITHUB_REPO_URL } from "@/lib/site/github";
import { cn } from "@/lib/cn";

const navLinkClass = [
  "inline-flex items-center gap-1.5 rounded-md px-1 py-0.5",
  "text-stone-600 transition-colors",
  "hover:bg-stone-100 hover:text-stone-900",
  "sm:gap-0 sm:px-0 sm:py-0 sm:hover:bg-transparent",
  "dark:text-stone-400 dark:hover:bg-stone-800 dark:hover:text-stone-100",
  "sm:dark:hover:bg-transparent",
].join(" ");

const navIconClass = "size-4 shrink-0 opacity-90 sm:hidden";

const headerGithubLinkClass = [
  "inline-flex size-8 shrink-0 items-center justify-center rounded-md",
  "text-stone-600 transition-colors",
  "hover:bg-stone-200 hover:text-stone-900",
  "dark:text-stone-400 dark:hover:bg-stone-700 dark:hover:text-stone-100",
].join(" ");

const toolsShellClass = [
  "inline-flex max-w-[min(100%,18rem)] items-center gap-1.5 rounded-lg",
  "bg-stone-100/90 px-1.5 py-1 dark:bg-stone-800/70",
  "md:max-w-none md:gap-2 md:px-2",
].join(" ");

const mobileNavRowClass = [
  "flex items-center gap-3 rounded-md px-2 py-3 text-base font-medium",
  "text-stone-800 active:bg-stone-100",
  "dark:text-stone-100 dark:active:bg-stone-800",
].join(" ");

export function SiteHeaderBar({
  locale,
  ui,
}: {
  locale: Locale;
  ui: SiteHeaderUi;
}) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  useEffect(() => {
    if (menuOpen) {
      document.documentElement.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [menuOpen]);

  const closeMobile = () => setMenuOpen(false);

  return (
    <div className="mx-auto max-w-5xl px-4 py-3 sm:px-6">
      <div className="flex flex-col">
        <div className="flex min-h-10 items-center justify-between gap-2 md:min-h-0 md:gap-6">
          <Link
            href={`/${locale}`}
            className="inline-flex min-w-0 shrink items-center gap-2 font-semibold tracking-tight text-stone-900 dark:text-stone-100"
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

          <nav
            aria-label={ui.navPrimaryAria}
            className="hidden min-w-0 flex-1 flex-wrap items-center justify-end gap-x-1 gap-y-1 text-sm sm:gap-x-3 md:flex"
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

          <div className="flex shrink-0 items-center gap-1 md:gap-2">
            <div className={toolsShellClass}>
              <a
                href={GITHUB_REPO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={headerGithubLinkClass}
                aria-label={ui.navGithubTitle}
                title={ui.navGithubTitle}
              >
                <SiGithub className="size-4 shrink-0" aria-hidden />
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

            <button
              type="button"
              className={cn(
                "inline-flex size-10 shrink-0 items-center justify-center rounded-md border",
                "border-stone-300 bg-stone-100 text-stone-800",
                "hover:bg-stone-200 md:hidden",
                "dark:border-stone-600 dark:bg-stone-800 dark:text-stone-100 dark:hover:bg-stone-700",
              )}
              aria-expanded={menuOpen}
              aria-controls="site-header-mobile-nav"
              onClick={() => setMenuOpen((o) => !o)}
              aria-label={menuOpen ? ui.navMenuCloseAria : ui.navMenuOpenAria}
            >
              {menuOpen ? (
                <X className="size-5" strokeWidth={2} aria-hidden />
              ) : (
                <Menu className="size-5" strokeWidth={2} aria-hidden />
              )}
            </button>
          </div>
        </div>

        <nav
          id="site-header-mobile-nav"
          aria-label={ui.navPrimaryAria}
          aria-hidden={!menuOpen}
          className={cn(
            "border-t border-stone-200/90 md:hidden dark:border-stone-700/90",
            !menuOpen && "hidden",
          )}
        >
          <div className="flex flex-col py-1">
            <Link
              href={`/${locale}`}
              onClick={closeMobile}
              className={mobileNavRowClass}
            >
              <BookOpen className="size-5 shrink-0 opacity-90" aria-hidden />
              {ui.navArticles}
            </Link>
            <Link
              href={`/${locale}/about`}
              onClick={closeMobile}
              className={mobileNavRowClass}
            >
              <Info className="size-5 shrink-0 opacity-90" aria-hidden />
              {ui.navAbout}
            </Link>
            <Link
              href={`/${locale}/contribute`}
              onClick={closeMobile}
              className={mobileNavRowClass}
            >
              <HeartHandshake
                className="size-5 shrink-0 opacity-90"
                aria-hidden
              />
              {ui.navContribute}
            </Link>
            <Link
              href={`/${locale}/search`}
              onClick={closeMobile}
              className={mobileNavRowClass}
            >
              <Search className="size-5 shrink-0 opacity-90" aria-hidden />
              {ui.navSearch}
            </Link>
          </div>
        </nav>
      </div>
    </div>
  );
}
