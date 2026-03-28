"use client";

import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { useEffect } from "react";
import type { Locale } from "@/lib/content/constants";

type ArticleLinkProps = Omit<ComponentProps<typeof Link>, "href" | "locale"> & {
  articleId: string;
  locale: Locale;
  validArticleIds?: readonly string[];
  children?: ReactNode;
};

export function ArticleLink({
  articleId,
  locale,
  validArticleIds,
  children,
  ...linkProps
}: ArticleLinkProps) {
  const href = `/${locale}/${articleId}`;

  useEffect(() => {
    if (process.env.NODE_ENV !== "development" || !validArticleIds?.length) {
      return;
    }
    const set = new Set(validArticleIds);
    if (!set.has(articleId)) {
      console.warn(
        `[ArticleLink] unknown articleId "${articleId}" (locale ${locale})`,
      );
    }
  }, [articleId, locale, validArticleIds]);

  return (
    <Link href={href} {...linkProps}>
      {children}
    </Link>
  );
}
