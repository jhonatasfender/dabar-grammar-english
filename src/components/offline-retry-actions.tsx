"use client";

import Link from "next/link";
import { cn } from "@/lib/cn";

type Props = {
  homeHref: string;
};

const actionLayout = [
  "inline-flex min-h-11 items-center justify-center rounded-lg px-5",
  "text-sm font-medium transition",
] as const;

export function OfflineRetryActions({ homeHref }: Props) {
  return (
    <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
      <button
        type="button"
        onClick={() => window.location.reload()}
        className={cn(actionLayout, [
          "bg-stone-900 text-white shadow-sm",
          "hover:bg-stone-800 active:scale-[0.99]",
          "dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-stone-200",
        ])}
      >
        Recarregar
      </button>
      <Link
        href={homeHref}
        className={cn(actionLayout, [
          "border border-stone-300 bg-(--surface) text-stone-800",
          "hover:border-stone-400 hover:bg-stone-50",
          "dark:border-stone-600 dark:text-stone-100",
          "dark:hover:border-stone-500 dark:hover:bg-stone-800/80",
        ])}
      >
        Ir ao início
      </Link>
    </div>
  );
}
