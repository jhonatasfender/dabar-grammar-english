import type { Locale } from "@/lib/content/constants";

export type Ui = {
  siteTitle: string;
  navPrimaryAria: string;
  navMenuOpenAria: string;
  navMenuCloseAria: string;
  navArticles: string;
  navSearch: string;
  navAbout: string;
  navContribute: string;
  navGithub: string;
  navGithubTitle: string;
  sitePageKickerAbout: string;
  sitePageKickerContribute: string;
  pageLanguage: string;
  navLocaleHint: string;
  readingTime: (min: number) => string;
  articleLanguage: string;
  notPublished: string;
  references: string;
  relatedArticles: string;
  summaryLabel: string;
  homeIntro: string;
  homeThemeIndex: string;
  searchTitle: string;
  searchMetaDescription: string;
  searchPlaceholder: string;
  searchEmpty: string;
  searchNoResults: string;
  themeLight: string;
  themeDark: string;
  themeAriaLight: string;
  themeAriaDark: string;
  textSize: string;
  articleAudioLabel: string;
  articleAudioUnavailable: string;
};

const STRINGS: Record<Locale, Ui> = {
  pt: {
    siteTitle: "Dabar Grammar English",
    navPrimaryAria: "Navegação principal",
    navMenuOpenAria: "Abrir menu de navegação",
    navMenuCloseAria: "Fechar menu de navegação",
    navArticles: "Artigos",
    navSearch: "Buscar",
    navAbout: "Sobre",
    navContribute: "Contribuir",
    navGithub: "GitHub",
    navGithubTitle: "Repositório no GitHub (abre em nova aba)",
    sitePageKickerAbout: "Sobre o projeto",
    sitePageKickerContribute: "Comunidade",
    pageLanguage: "Idioma desta página:",
    navLocaleHint: "Idioma da interface",
    readingTime: (min) => `Tempo estimado de leitura: ~${min} min`,
    articleLanguage: "Idioma do artigo:",
    notPublished: "Versão ainda não publicada",
    references: "Referências",
    relatedArticles: "Leia também",
    summaryLabel: "Em resumo",
    homeIntro:
      "Bem-vindo ao Dabar Grammar English: gramática inglesa avançada em artigos editoriais, organizados por temas e subtemas. Você pode usar a interface em português e, quando quiser, abrir o mesmo tópico em inglês ou espanhol — cada idioma traz o artigo completo, redigido para essa língua.",
    homeThemeIndex: "Índice por tema",
    searchTitle: "Buscar artigos",
    searchMetaDescription:
      "Busca no índice de artigos de gramática inglesa avançada do Dabar Grammar English (português, inglês e espanhol).",
    searchPlaceholder: "Busque por título, tema, tag…",
    searchEmpty: "Digite para ver resultados neste idioma.",
    searchNoResults: "Nenhum resultado neste idioma.",
    themeLight: "Claro",
    themeDark: "Escuro",
    themeAriaLight: "Ativar tema claro",
    themeAriaDark: "Ativar tema escuro",
    textSize: "Texto:",
    articleAudioLabel: "Ouvir leitura em áudio",
    articleAudioUnavailable:
      "Áudio ainda não disponível neste idioma ou não carregou.",
  },
  en: {
    siteTitle: "Dabar Grammar English",
    navPrimaryAria: "Main navigation",
    navMenuOpenAria: "Open navigation menu",
    navMenuCloseAria: "Close navigation menu",
    navArticles: "Articles",
    navSearch: "Search",
    navAbout: "About",
    navContribute: "Contribute",
    navGithub: "GitHub",
    navGithubTitle: "GitHub repository (opens in a new tab)",
    sitePageKickerAbout: "About the project",
    sitePageKickerContribute: "Community",
    pageLanguage: "Page language:",
    navLocaleHint: "UI language",
    readingTime: (min) => `Estimated reading time: ~${min} min`,
    articleLanguage: "Article language:",
    notPublished: "Version not published yet",
    references: "References",
    relatedArticles: "See also",
    summaryLabel: "In short",
    homeIntro:
      "Welcome to Dabar Grammar English: advanced English grammar in editorial articles, organized by theme and subtopic. Use the site in English and open the same topic in Portuguese or Spanish when you like — each language offers a full article written for that audience.",
    homeThemeIndex: "Browse by theme",
    searchTitle: "Search articles",
    searchMetaDescription:
      "Search the Dabar Grammar English article index — advanced English grammar in English, Portuguese, and Spanish.",
    searchPlaceholder: "Search title, topic, tag…",
    searchEmpty: "Type to see results in this locale.",
    searchNoResults: "No results in this locale.",
    themeLight: "Light",
    themeDark: "Dark",
    themeAriaLight: "Switch to light theme",
    themeAriaDark: "Switch to dark theme",
    textSize: "Text:",
    articleAudioLabel: "Listen to audio",
    articleAudioUnavailable:
      "Audio not available for this page or failed to load.",
  },
  es: {
    siteTitle: "Dabar Grammar English",
    navPrimaryAria: "Navegación principal",
    navMenuOpenAria: "Abrir menú de navegación",
    navMenuCloseAria: "Cerrar menú de navegación",
    navArticles: "Artículos",
    navSearch: "Buscar",
    navAbout: "Acerca de",
    navContribute: "Contribuir",
    navGithub: "GitHub",
    navGithubTitle: "Repositorio en GitHub (abre en una pestaña nueva)",
    sitePageKickerAbout: "Acerca del proyecto",
    sitePageKickerContribute: "Comunidad",
    pageLanguage: "Idioma de esta página:",
    navLocaleHint: "Idioma de la interfaz",
    readingTime: (min) => `Tiempo de lectura estimado: ~${min} min`,
    articleLanguage: "Idioma del artículo:",
    notPublished: "Versión aún no publicada",
    references: "Referencias",
    relatedArticles: "Ver también",
    summaryLabel: "En resumen",
    homeIntro:
      "Bienvenido a Dabar Grammar English: gramática inglesa avanzada en artículos editoriales, organizados por tema y subtema. Puede usar la interfaz en español y abrir el mismo tema en inglés o portugués cuando quiera — cada idioma ofrece el artículo completo, redactado para esa lengua.",
    homeThemeIndex: "Índice por tema",
    searchTitle: "Buscar artículos",
    searchMetaDescription:
      "Busca en el índice de artículos de gramática inglesa avanzada de Dabar Grammar English (inglés, portugués y español).",
    searchPlaceholder: "Buscar título, tema, etiqueta…",
    searchEmpty: "Escribe para ver resultados en este idioma.",
    searchNoResults: "Sin resultados en este idioma.",
    themeLight: "Claro",
    themeDark: "Oscuro",
    themeAriaLight: "Activar tema claro",
    themeAriaDark: "Activar tema oscuro",
    textSize: "Texto:",
    articleAudioLabel: "Escuchar lectura en audio",
    articleAudioUnavailable:
      "Audio aún no disponible en este idioma o no se pudo cargar.",
  },
};

export type SiteHeaderUi = Pick<
  Ui,
  | "navPrimaryAria"
  | "navMenuOpenAria"
  | "navMenuCloseAria"
  | "navArticles"
  | "navSearch"
  | "navAbout"
  | "navContribute"
  | "navGithubTitle"
  | "navLocaleHint"
  | "themeLight"
  | "themeDark"
  | "themeAriaLight"
  | "themeAriaDark"
>;

export function getUi(locale: Locale): Ui {
  return STRINGS[locale];
}

export function getSiteHeaderUi(locale: Locale): SiteHeaderUi {
  const u = STRINGS[locale];
  return {
    navPrimaryAria: u.navPrimaryAria,
    navMenuOpenAria: u.navMenuOpenAria,
    navMenuCloseAria: u.navMenuCloseAria,
    navArticles: u.navArticles,
    navSearch: u.navSearch,
    navAbout: u.navAbout,
    navContribute: u.navContribute,
    navGithubTitle: u.navGithubTitle,
    navLocaleHint: u.navLocaleHint,
    themeLight: u.themeLight,
    themeDark: u.themeDark,
    themeAriaLight: u.themeAriaLight,
    themeAriaDark: u.themeAriaDark,
  };
}
