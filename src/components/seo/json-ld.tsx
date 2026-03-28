import type { Article } from "contentlayer/generated";
import type { Locale } from "@/lib/content/constants";
import { DEFAULT_LOCALE } from "@/lib/content/constants";
import { stripInlineMarkdown } from "@/lib/markdown/strip-inline-markdown";
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
  const inLanguage = locale === "en" ? "en" : locale === "es" ? "es" : "pt-BR";

  const titlePlain = stripInlineMarkdown(article.title);
  const descriptionPlain = article.description
    ? stripInlineMarkdown(article.description)
    : undefined;
  const summaryPlain = article.summary
    ? stripInlineMarkdown(article.summary)
    : undefined;

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
        name: titlePlain,
        item: url,
      },
    ],
  };

  const articleEntity: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: titlePlain,
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

  if (descriptionPlain) {
    articleEntity.description = descriptionPlain;
  }
  if (summaryPlain) {
    articleEntity.abstract = summaryPlain;
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
  const inLanguage = locale === "en" ? "en" : locale === "es" ? "es" : "pt-BR";
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: stripInlineMarkdown(title),
    url,
    inLanguage,
    isPartOf: {
      "@type": "WebSite",
      name: SITE_NAME,
      url: getSiteUrl(),
    },
  };
  if (description) data.description = stripInlineMarkdown(description);
  return <JsonLdScript data={data} />;
}
