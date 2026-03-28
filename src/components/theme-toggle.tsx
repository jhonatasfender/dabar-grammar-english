"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};

export function ThemeToggle({
  lightLabel,
  darkLabel,
  ariaLight,
  ariaDark,
}: {
  lightLabel: string;
  darkLabel: string;
  ariaLight: string;
  ariaDark: string;
}) {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );

  if (!mounted) {
    return (
      <span className="h-8 w-14 rounded-md border border-stone-200 dark:border-stone-700" />
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="inline-flex items-center gap-1.5 rounded-md border border-stone-300 bg-stone-100 px-2 py-1 text-xs font-medium text-stone-800 hover:bg-stone-200 dark:border-stone-600 dark:bg-stone-800 dark:text-stone-100 dark:hover:bg-stone-700"
      aria-label={isDark ? ariaLight : ariaDark}
    >
      {isDark ? (
        <Sun className="size-3.5 shrink-0" aria-hidden />
      ) : (
        <Moon className="size-3.5 shrink-0" aria-hidden />
      )}
      {isDark ? lightLabel : darkLabel}
    </button>
  );
}
