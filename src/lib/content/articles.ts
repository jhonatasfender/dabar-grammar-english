import { allArticles } from "contentlayer/generated";
import type { Article } from "contentlayer/generated";
import type { Locale } from "./constants";
import { isLocale } from "./constants";
import {
  ARTICLE_THEME_OPTIONS,
  type ArticleTheme,
  getThemeIndex,
} from "./taxonomy";

export type { Article };

export function compareArticlesForListing(a: Article, b: Article): number {
  const ti = getThemeIndex(a.theme) - getThemeIndex(b.theme);
  if (ti !== 0) return ti;
  const sub = a.subtheme.localeCompare(b.subtheme);
  if (sub !== 0) return sub;
  const o = a.orderInTheme - b.orderInTheme;
  if (o !== 0) return o;
  return a.title.localeCompare(b.title);
}

export type ArticleSubthemeGroup = {
  subtheme: string;
  articles: Article[];
};

export type ArticleThemeGroup = {
  theme: ArticleTheme;
  subthemes: ArticleSubthemeGroup[];
};

export function groupArticlesForHome(articles: Article[]): ArticleThemeGroup[] {
  const sorted = [...articles].sort(compareArticlesForListing);
  const themeMap = new Map<ArticleTheme, Map<string, Article[]>>();
  for (const a of sorted) {
    if (!themeMap.has(a.theme)) themeMap.set(a.theme, new Map());
    const sm = themeMap.get(a.theme)!;
    if (!sm.has(a.subtheme)) sm.set(a.subtheme, []);
    sm.get(a.subtheme)!.push(a);
  }
  const result: ArticleThemeGroup[] = [];
  for (const theme of ARTICLE_THEME_OPTIONS) {
    const subMap = themeMap.get(theme);
    if (!subMap) continue;
    const subthemes = [...subMap.entries()].map(([subtheme, arts]) => ({
      subtheme,
      articles: arts,
    }));
    result.push({ theme, subthemes });
  }
  return result;
}

export function getArticlesByLocale(locale: Locale): Article[] {
  return allArticles.filter((a) => a.locale === locale);
}

export function getArticle(
  locale: Locale,
  articleId: string,
): Article | undefined {
  return allArticles.find(
    (a) => a.locale === locale && a.articleId === articleId,
  );
}

export function getArticleSiblings(
  article: Article,
): Partial<Record<Locale, Article>> {
  const map: Partial<Record<Locale, Article>> = {};
  for (const other of allArticles) {
    if (
      other.articleId === article.articleId &&
      isLocale(other.locale) &&
      other._id !== article._id
    ) {
      map[other.locale] = other;
    }
  }
  return map;
}

export function getAllArticleIds(): string[] {
  return [...new Set(allArticles.map((a) => a.articleId))];
}
