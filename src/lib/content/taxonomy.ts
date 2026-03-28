import type { Locale } from "./constants";

export const ARTICLE_THEME_OPTIONS = [
  "nominal-groups",
  "verb-and-auxiliary",
  "modifiers-and-comparison",
  "prepositions-and-patterns",
  "clause-and-complexity",
  "discourse-and-pragmatics",
] as const;

export type ArticleTheme = (typeof ARTICLE_THEME_OPTIONS)[number];

const THEME_LABELS: Record<ArticleTheme, Record<Locale, string>> = {
  "nominal-groups": {
    en: "The noun phrase",
    pt: "Grupo nominal",
    es: "Grupo nominal",
  },
  "verb-and-auxiliary": {
    en: "Verb and auxiliaries",
    pt: "Verbo e auxiliares",
    es: "Verbo y auxiliares",
  },
  "modifiers-and-comparison": {
    en: "Modifiers and comparison",
    pt: "Modificadores e graus",
    es: "Modificadores y gradación",
  },
  "prepositions-and-patterns": {
    en: "Prepositions and patterns",
    pt: "Preposições e padrões",
    es: "Preposiciones y patrones",
  },
  "clause-and-complexity": {
    en: "Clause and complexity",
    pt: "Oração e complexidade",
    es: "Oración y complejidad",
  },
  "discourse-and-pragmatics": {
    en: "Discourse and pragmatics",
    pt: "Discurso e pragmática",
    es: "Discurso y pragmática",
  },
};

const SUBTHEME_LABELS: Record<string, Record<Locale, string>> = {
  modality: {
    en: "Modality",
    pt: "Modalidade",
    es: "Modalidad",
  },
  "constituency-structure": {
    en: "Constituent structure",
    pt: "Estrutura de constituintes",
    es: "Estructura de constituyentes",
  },
  "implicature-inference": {
    en: "Implicature and inference",
    pt: "Implicatura e inferência",
    es: "Implicatura e inferencia",
  },
  "verb-tenses-usage": {
    en: "Verb tenses in use",
    pt: "Tempos verbais em uso",
    es: "Tiempos verbales en uso",
  },
  "conditionals-overview": {
    en: "Conditionals",
    pt: "Condicionais",
    es: "Condicionales",
  },
  "prepositions-articles-essentials": {
    en: "Prepositions and articles",
    pt: "Preposições e artigos",
    es: "Preposiciones y artículos",
  },
  "punctuation-and-clauses": {
    en: "Punctuation and clause boundaries",
    pt: "Pontuação e limites de oração",
    es: "Puntuación y límites de oración",
  },
  "academic-style-grammar": {
    en: "Academic and professional style",
    pt: "Estilo acadêmico e profissional",
    es: "Estilo académico y profesional",
  },
  "l1-transfer-errors": {
    en: "L1 interference (PT/ES)",
    pt: "Interferência da L1 (PT/ES)",
    es: "Interferencia de la L1 (PT/ES)",
  },
  "adjective-preposition-collocations": {
    en: "Adjective + preposition",
    pt: "Adjetivo + preposição",
    es: "Adjetivo + preposición",
  },
  "participial-adjectives": {
    en: "Participial adjectives (-ed / -ing)",
    pt: "Adjetivos participiais (-ed / -ing)",
    es: "Adjetivos participiales (-ed / -ing)",
  },
  "comparison-and-degree": {
    en: "Comparison and degree",
    pt: "Comparação e grau",
    es: "Comparación y grado",
  },
  "determiners-and-articles": {
    en: "Determiners and articles",
    pt: "Determinantes e artigos",
    es: "Determinantes y artículos",
  },
  "countability": {
    en: "Countability and quantity",
    pt: "Contabilidade e quantidade",
    es: "Contabilidad y cantidad",
  },
  "possession-and-genitive": {
    en: "Possession and the genitive",
    pt: "Posse e genitivo saxão",
    es: "Posesión y genitivo sajón",
  },
  "place-and-time-prepositions": {
    en: "Place and time prepositions",
    pt: "Preposições de lugar e tempo",
    es: "Preposiciones de lugar y tiempo",
  },
  "core-present-system": {
    en: "Present tense system",
    pt: "Sistema do presente",
    es: "Sistema del presente",
  },
  "verb-patterns-complementation": {
    en: "Verb patterns and complementation",
    pt: "Padrões verbais e complementação",
    es: "Patrones verbales y complementación",
  },
  "existential-constructions": {
    en: "Existential there",
    pt: "Construções existenciais com there",
    es: "Construcciones existenciales con there",
  },
  "non-finite-clauses": {
    en: "Non-finite clauses",
    pt: "Orações não finitas",
    es: "Oraciones no finitas",
  },
};

export function getThemeIndex(theme: ArticleTheme): number {
  return ARTICLE_THEME_OPTIONS.indexOf(theme);
}

export function getThemeLabel(theme: ArticleTheme, locale: Locale): string {
  return THEME_LABELS[theme][locale];
}

export function getSubthemeLabel(subtheme: string, locale: Locale): string {
  const row = SUBTHEME_LABELS[subtheme];
  if (row) return row[locale];
  return subtheme
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export function formatThemeLine(
  theme: ArticleTheme,
  subtheme: string,
  locale: Locale,
): string {
  const t = getThemeLabel(theme, locale);
  const s = getSubthemeLabel(subtheme, locale);
  return `${t} › ${s}`;
}
