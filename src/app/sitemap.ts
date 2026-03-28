import type { MetadataRoute } from "next";
import { allArticles, allSitePages } from "contentlayer/generated";
import { LOCALES } from "@/lib/content/constants";
import { absoluteUrl } from "@/lib/site/url";

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of LOCALES) {
    entries.push({
      url: absoluteUrl(`/${locale}`),
      changeFrequency: "weekly",
      priority: 1,
    });
    entries.push({
      url: absoluteUrl(`/${locale}/search`),
      changeFrequency: "weekly",
      priority: 0.6,
    });
  }

  for (const page of allSitePages) {
    entries.push({
      url: absoluteUrl(`/${page.locale}/${page.slug}`),
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }

  for (const article of allArticles) {
    entries.push({
      url: absoluteUrl(`/${article.locale}/${article.articleId}`),
      changeFrequency: "monthly",
      priority: 0.8,
    });
  }

  const seen = new Set<string>();
  return entries.filter((e) => {
    if (seen.has(e.url)) return false;
    seen.add(e.url);
    return true;
  });
}
