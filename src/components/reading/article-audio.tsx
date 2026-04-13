"use client";

import { useCallback, useState } from "react";
import type { Locale } from "@/lib/content/constants";

const figureClass = [
  "my-6 rounded-xl border border-stone-200 bg-stone-50/80 px-4 py-3",
  "dark:border-stone-600 dark:bg-stone-900/40",
].join(" ");

const captionClass = [
  "mb-2 font-sans text-xs font-semibold tracking-wide text-stone-600 uppercase",
  "dark:text-stone-400",
].join(" ");

export function ArticleAudioPlayer({
  locale,
  audioStem,
  label,
  src,
  id,
}: {
  locale: Locale;
  audioStem?: string;
  label: string;
  src?: string;
  id?: string;
}) {
  const [unavailable, setUnavailable] = useState(false);
  const onError = useCallback(() => setUnavailable(true), []);

  const stem = id ?? audioStem;
  const resolvedSrc =
    src?.trim() ||
    (stem
      ? `/article-audio/${locale}/${stem.replace(/^\//, "").replace(/\.mp3$/i, "")}.mp3`
      : null);

  if (!resolvedSrc || unavailable) return null;

  return (
    <figure className={figureClass}>
      <figcaption className={captionClass}>{label}</figcaption>
      <audio
        className="h-9 w-full max-w-full"
        controls
        preload="metadata"
        src={resolvedSrc}
        onError={onError}
      >
        {label}
      </audio>
    </figure>
  );
}
