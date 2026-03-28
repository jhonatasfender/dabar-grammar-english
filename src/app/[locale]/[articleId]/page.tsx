import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ReadingLayout } from "@/components/reading/reading-layout";
import { ArticleJsonLd } from "@/components/seo/json-ld";
import { getArticle } from "@/lib/content/articles";
import { isLocale, type Locale } from "@/lib/content/constants";
import { articleAlternates } from "@/lib/seo/alternates";
import { openGraphLocales } from "@/lib/seo/open-graph-locale";
import { allArticles } from "contentlayer/generated";

export function generateStaticParams() {
  return allArticles.map((a) => ({
    locale: a.locale,
    articleId: a.articleId,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; articleId: string }>;
}): Promise<Metadata> {
  const { locale: raw, articleId } = await params;
  if (!isLocale(raw)) return {};
  const article = getArticle(raw as Locale, articleId);
  if (!article) return {};
  const locale = raw as Locale;
  const { locale: ogLoc, alternateLocale } = openGraphLocales(locale);
  const path = `/${locale}/${articleId}`;
  return {
    title: article.title,
    description: article.description,
    alternates: articleAlternates(articleId, locale),
    openGraph: {
      type: "article",
      title: article.title,
      description: article.description,
      url: path,
      locale: ogLoc,
      alternateLocale,
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ locale: string; articleId: string }>;
}) {
  const { locale: raw, articleId } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const article = getArticle(locale, articleId);
  if (!article) notFound();

  return (
    <>
      <ArticleJsonLd article={article} locale={locale} />
      <ReadingLayout article={article} locale={locale} />
    </>
  );
}
