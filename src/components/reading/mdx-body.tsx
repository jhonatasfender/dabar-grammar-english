"use client";

import { useMDXComponent } from "next-contentlayer2/hooks";
import type { ComponentProps } from "react";
import { useMemo } from "react";
import { ArticleLink } from "@/components/reading/article-link";
import type { Locale } from "@/lib/content/constants";

export function MdxBody({
  code,
  locale,
  validArticleIds,
}: {
  code: string;
  locale: Locale;
  validArticleIds?: readonly string[];
}) {
  const globals = useMemo(
    () => ({
      ArticleLink: (
        props: Omit<
          ComponentProps<typeof ArticleLink>,
          "locale" | "validArticleIds"
        >,
      ) => (
        <ArticleLink
          {...props}
          locale={locale}
          validArticleIds={validArticleIds}
        />
      ),
    }),
    [locale, validArticleIds],
  );

  const Component = useMDXComponent(code, globals);
  return <Component />;
}
