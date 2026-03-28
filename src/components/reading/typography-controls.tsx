"use client";

import { useCallback, useEffect, useState } from "react";
import { cn } from "@/lib/cn";

const STORAGE_KEY = "reading-font-scale";
const scales = [100, 112, 125] as const;

function readScaleFromStorage(): number {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    const n = stored ? Number.parseInt(stored, 10) : 100;
    return scales.includes(n as (typeof scales)[number]) ? n : 100;
  } catch {
    return 100;
  }
}

export function TypographyControls({ label }: { label: string }) {
  const [scale, setScale] = useState(100);

  useEffect(() => {
    setScale(readScaleFromStorage());
  }, []);

  const apply = useCallback((next: number) => {
    setScale(next);
    document.documentElement.style.setProperty(
      "--reading-font-pct",
      `${next}%`,
    );
    try {
      window.localStorage.setItem(STORAGE_KEY, String(next));
    } catch {}
  }, []);

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--reading-font-pct",
      `${scale}%`,
    );
  }, [scale]);

  return (
    <div
      className="flex flex-wrap items-center gap-2 text-sm text-stone-600 dark:text-stone-400"
      role="group"
      aria-label={label}
    >
      <span className="font-medium">{label}</span>
      {scales.map((s) => (
        <button
          key={s}
          type="button"
          onClick={() => apply(s)}
          className={cn(
            "rounded-md border px-2 py-1 transition",
            scale === s
              ? "border-amber-700 bg-amber-50 text-amber-950 dark:border-amber-500 dark:bg-amber-950/40 dark:text-amber-100"
              : "border-stone-300 bg-white hover:bg-stone-50 dark:border-stone-600 dark:bg-stone-900 dark:hover:bg-stone-800",
          )}
        >
          {s}%
        </button>
      ))}
    </div>
  );
}
