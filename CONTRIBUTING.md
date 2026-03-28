# Contributing to Dabar Grammar English

Thank you for your interest in **[Dabar Grammar English](https://github.com/jhonatasfender/dabar-grammar-english)**. This document explains how to propose changes to code or MDX content.

## Code of conduct

Be respectful and constructive. See [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md).

## Ways to contribute

- **Issues** — typos, broken links, unclear explanations, or ideas for new topics.
- **Pull requests** — fixes and new MDX articles (prefer one logical change per PR when possible).
- **Translations** — keep `articleId` (articles) or `slug` (About/Contribute pages) aligned across `en`, `pt`, and `es`.

## Local setup

```bash
npm install
npm run dev
```

Use `npm run build` before opening a PR to ensure Contentlayer and Next.js compile.

## Content layout

| Kind       | Path pattern                                                 | Frontmatter type                                                                                                                                                     |
| ---------- | ------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Articles   | `src/content/articles/{en,pt,es}/*.mdx`                      | `Article` — requires `articleId`, `locale`, `title`, `theme`, `subtheme`; optional `orderInTheme`, `description`, `summary`, `tags`, `references`, `relatedArticles` |
| Site pages | `src/content/pages/{en,pt,es}/about.mdx` or `contribute.mdx` | `SitePage` — requires `locale`, `slug` (`about` \| `contribute`), `title`, optional `description`                                                                    |

URLs:

- Articles: `/{locale}/{articleId}`
- About: `/{locale}/about`
- Contribute: `/{locale}/contribute`

More detail (in Portuguese): [docs/PUBLICACAO.md](docs/PUBLICACAO.md). Cross-links between articles are tracked in [docs/REFERENCIAS_ENTRE_ARTIGOS.md](docs/REFERENCIAS_ENTRE_ARTIGOS.md) (regenerate with `npm run doc:cross-refs` after bulk edits).

## Pull request checklist

1. MDX builds without Contentlayer errors (`npm run build`).
2. For new articles, include all locales you can; if one locale is missing, note it in the PR.
3. Prefer clear commit messages (e.g. `content: add article on modality (en/pt/es)`).
4. Link related issues with `Fixes #123` or `Refs #123` when applicable.

## Questions

Open a [GitHub issue](https://github.com/jhonatasfender/dabar-grammar-english/issues) if something in this guide is unclear.
