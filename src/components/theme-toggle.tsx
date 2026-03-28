"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";
import { cn } from "@/lib/cn";

const emptySubscribe = () => () => {};

export function ThemeToggle({
  lightLabel,
  darkLabel,
  ariaLight,
  ariaDark,
  showLabel = true,
}: {
  lightLabel: string;
  darkLabel: string;
  ariaLight: string;
  ariaDark: string;
  showLabel?: boolean;
}) {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );

  if (!mounted) {
    return (
      <span
        className={cn(
          "rounded-md border border-stone-200 dark:border-stone-700",
          showLabel ? "h-8 w-14" : "size-8 shrink-0",
        )}
      />
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        "inline-flex items-center rounded-md border border-stone-300 bg-stone-100 text-stone-800 hover:bg-stone-200 dark:border-stone-600 dark:bg-stone-800 dark:text-stone-100 dark:hover:bg-stone-700",
        showLabel
          ? "gap-1.5 px-2 py-1 text-xs font-medium"
          : "size-8 shrink-0 justify-center",
      )}
      aria-label={isDark ? ariaLight : ariaDark}
    >
      {isDark ? (
        <Sun className="size-4 shrink-0" aria-hidden />
      ) : (
        <Moon className="size-4 shrink-0" aria-hidden />
      )}
      {showLabel ? (isDark ? lightLabel : darkLabel) : null}
    </button>
  );
}
