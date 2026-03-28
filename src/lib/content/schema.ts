import type { ArticleTheme } from "./taxonomy";

export type ArticleFrontmatterShape = {
  articleId: string;
  locale: "en" | "pt" | "es";
  title: string;
  description?: string;
  summary?: string;
  theme: ArticleTheme;
  subtheme: string;
  orderInTheme?: number;
  tags?: string[];
  references?: string[];
};
