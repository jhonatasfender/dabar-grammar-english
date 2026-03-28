"use client";

import Link from "next/link";
import MiniSearch from "minisearch";
import { useMemo, useState } from "react";
import { InlineMarkdown } from "@/components/reading/inline-markdown";
import type { SearchDoc } from "@/lib/search/search-docs";

const searchInputClass = [
  "w-full rounded-lg border border-stone-300 bg-white px-4 py-3 text-stone-900 shadow-sm",
  "ring-amber-700/30 outline-none placeholder:text-stone-400",
  "focus:border-amber-700 focus:ring-2",
  "dark:border-stone-600 dark:bg-stone-900 dark:text-stone-100",
  "dark:placeholder:text-stone-500 dark:focus:border-amber-500",
].join(" ");

const searchResultLinkClass = [
  "block rounded-lg border border-stone-200 bg-[var(--surface)] p-4 transition",
  "hover:border-amber-600/60 dark:border-stone-700 dark:hover:border-amber-500/50",
].join(" ");

export function SearchPanel({
  locale,
  documents,
  placeholder,
  emptyHint,
  noResults,
}: {
  locale: string;
  documents: SearchDoc[];
  placeholder: string;
  emptyHint: string;
  noResults: string;
}) {
  const [query, setQuery] = useState("");

  const index = useMemo(() => {
    const ms = new MiniSearch<SearchDoc>({
      fields: ["title", "description", "tags", "theme", "subtheme"],
      storeFields: [
        "title",
        "description",
        "locale",
        "articleId",
        "url",
        "topicLine",
      ],
      searchOptions: {
        boost: { title: 2, tags: 1.5 },
        fuzzy: 0.2,
        prefix: true,
      },
    });
    ms.addAll(documents);
    return ms;
  }, [documents]);

  const results = useMemo(() => {
    const q = query.trim();
    if (!q) return [];
    return index.search(q, { filter: (r) => r.locale === locale });
  }, [index, query, locale]);

  return (
    <div className="mx-auto max-w-5xl space-y-6 px-4 py-10 sm:px-6">
      <label className="block">
        <span className="sr-only">{placeholder}</span>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className={searchInputClass}
          autoComplete="off"
        />
      </label>

      {!query.trim() ? (
        <p className="text-sm text-stone-500 dark:text-stone-400">
          {emptyHint}
        </p>
      ) : results.length === 0 ? (
        <p className="text-sm text-stone-500 dark:text-stone-400">
          {noResults}
        </p>
      ) : (
        <ul className="space-y-3">
          {results.map((r) => (
            <li key={r.id}>
              <Link href={r.url} className={searchResultLinkClass}>
                <span className="font-medium text-stone-900 dark:text-stone-50">
                  <InlineMarkdown text={r.title} variant="inline" />
                </span>
                {r.description ? (
                  <div className="mt-1 space-y-1 text-sm text-stone-600 dark:text-stone-400">
                    <InlineMarkdown text={r.description} variant="block" />
                  </div>
                ) : null}
                <span className="mt-2 block text-xs tracking-wide text-stone-400 uppercase">
                  {r.topicLine}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
