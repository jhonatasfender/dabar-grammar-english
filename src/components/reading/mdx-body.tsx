"use client";

import { useMDXComponent } from "next-contentlayer2/hooks";
import type { ComponentProps } from "react";
import { useMemo } from "react";
import { ArticleAudioPlayer } from "@/components/reading/article-audio";
import { ArticleLink } from "@/components/reading/article-link";
import type { Locale } from "@/lib/content/constants";
import { getUi } from "@/lib/ui/strings";

export function MdxBody({
  code,
  locale,
  validArticleIds,
  audioStem,
}: {
  code: string;
  locale: Locale;
  validArticleIds?: readonly string[];
  audioStem?: string;
}) {
  const globals = useMemo(() => {
    const ui = getUi(locale);
    return {
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
      ArticleAudio: (props: { src?: string; id?: string }) => (
        <ArticleAudioPlayer
          locale={locale}
          audioStem={audioStem}
          label={ui.articleAudioLabel}
          src={props.src}
          id={props.id}
        />
      ),
    };
  }, [locale, validArticleIds, audioStem]);

  const Component = useMDXComponent(code, globals);
  return <Component />;
}
