import type { Article } from "contentlayer/generated";
import type { Locale } from "@/lib/content/constants";
import { DEFAULT_LOCALE } from "@/lib/content/constants";
import { absoluteUrl, getSiteUrl } from "@/lib/site/url";

const SITE_NAME = "Dabar Grammar English";

function JsonLdScript({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function WebsiteJsonLd() {
  const base = getSiteUrl();
  const data = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: base,
    inLanguage: ["en", "pt", "es"],
    potentialAction: {
      "@type": "SearchAction",
      target: `${base}/${DEFAULT_LOCALE}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
  return <JsonLdScript data={data} />;
}

export function ArticleJsonLd({
  article,
  locale,
}: {
  article: Article;
  locale: Locale;
}) {
  const url = absoluteUrl(`/${locale}/${article.articleId}`);
  const base = getSiteUrl();
  const inLanguage =
    locale === "en" ? "en" : locale === "es" ? "es" : "pt-BR";

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: SITE_NAME,
        item: `${base}/${locale}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: article.title,
        item: url,
      },
    ],
  };

  const articleEntity: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    inLanguage,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    isPartOf: {
      "@type": "WebSite",
      name: SITE_NAME,
      url: base,
    },
    url,
  };

  if (article.description) {
    articleEntity.description = article.description;
  }
  if (article.summary) {
    articleEntity.abstract = article.summary;
  }

  return (
    <>
      <JsonLdScript data={articleEntity} />
      <JsonLdScript data={breadcrumb} />
    </>
  );
}

export function WebPageJsonLd({
  title,
  description,
  locale,
  path,
}: {
  title: string;
  description?: string;
  locale: Locale;
  path: string;
}) {
  const url = absoluteUrl(path);
  const inLanguage =
    locale === "en" ? "en" : locale === "es" ? "es" : "pt-BR";
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    url,
    inLanguage,
    isPartOf: {
      "@type": "WebSite",
      name: SITE_NAME,
      url: getSiteUrl(),
    },
  };
  if (description) data.description = description;
  return <JsonLdScript data={data} />;
}
