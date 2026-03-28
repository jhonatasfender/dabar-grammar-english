import { allArticles } from "contentlayer/generated";
import type { Locale } from "@/lib/content/constants";
import { formatThemeLine } from "@/lib/content/taxonomy";

export type SearchDoc = {
  id: string;
  title: string;
  locale: string;
  articleId: string;
  description: string;
  tags: string;
  theme: string;
  subtheme: string;
  topicLine: string;
  url: string;
};

export function getSearchDocuments(): SearchDoc[] {
  return allArticles.map((a) => {
    const loc = a.locale as Locale;
    return {
      id: `${a.locale}__${a.articleId}`,
      title: a.title,
      locale: a.locale,
      articleId: a.articleId,
      description: a.description ?? "",
      tags: a.tags.join(" "),
      theme: a.theme,
      subtheme: a.subtheme,
      topicLine: formatThemeLine(a.theme, a.subtheme, loc),
      url: a.url,
    };
  });
}
