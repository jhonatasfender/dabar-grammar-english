import { defineDocumentType, makeSource } from "contentlayer2/source-files";
import remarkGfm from "remark-gfm";
import { ARTICLE_THEME_OPTIONS } from "./src/lib/content/taxonomy";

export const Article = defineDocumentType(() => ({
  name: "Article",
  contentType: "mdx",
  filePathPattern: `articles/**/*.mdx`,
  fields: {
    articleId: {
      type: "string",
      required: true,
    },
    locale: {
      type: "enum",
      options: ["en", "pt", "es"],
      required: true,
    },
    title: { type: "string", required: true },
    description: {
      type: "string",
      required: false,
    },
    summary: {
      type: "string",
      required: false,
    },
    theme: {
      type: "enum",
      options: [...ARTICLE_THEME_OPTIONS],
      required: true,
    },
    subtheme: {
      type: "string",
      required: true,
    },
    orderInTheme: {
      type: "number",
      required: false,
      default: 0,
    },
    tags: {
      type: "list",
      of: { type: "string" },
      default: [],
    },
    references: {
      type: "list",
      of: { type: "string" },
      default: [],
    },
  },
  computedFields: {
    url: {
      type: "string",
      resolve: (doc) => `/${doc.locale}/${doc.articleId}`,
    },
    readingTimeMinutes: {
      type: "number",
      resolve: (doc) => {
        const raw = doc.body.raw as string;
        const words = raw.split(/\s+/).filter(Boolean).length;
        return Math.max(1, Math.round(words / 200));
      },
    },
  },
}));

export const SitePage = defineDocumentType(() => ({
  name: "SitePage",
  contentType: "mdx",
  filePathPattern: `pages/**/*.mdx`,
  fields: {
    locale: {
      type: "enum",
      options: ["en", "pt", "es"],
      required: true,
    },
    slug: {
      type: "enum",
      options: ["about", "contribute"],
      required: true,
    },
    title: { type: "string", required: true },
    description: {
      type: "string",
      required: false,
    },
  },
  computedFields: {
    url: {
      type: "string",
      resolve: (doc) => `/${doc.locale}/${doc.slug}`,
    },
    readingTimeMinutes: {
      type: "number",
      resolve: (doc) => {
        const raw = doc.body.raw as string;
        const words = raw.split(/\s+/).filter(Boolean).length;
        return Math.max(1, Math.round(words / 200));
      },
    },
  },
}));

export default makeSource({
  contentDirPath: "src/content",
  documentTypes: [Article, SitePage],
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [],
  },
});
