<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Before writing code, read the App Router docs under `node_modules/next/dist/docs/01-app/` (e.g. upgrading notes for this major version). Heed deprecation notices.

<!-- END:nextjs-agent-rules -->

# Dabar Grammar English (este repositório)

- **Produto:** portal de gramática **avançada** em inglês; conteúdo editorial em **en / pt / es** (MDX no repositório).
- **Repositório canônico:** https://github.com/jhonatasfender/dabar-grammar-english

## Stack e comandos

- Next.js App Router + TypeScript + Tailwind v4 + **Contentlayer2** (`contentlayer2`, `next-contentlayer2`).
- **Produção:** definir `NEXT_PUBLIC_SITE_URL` para sitemap, `robots.txt`, canônicos e JSON-LD (ver `docs/SEO_INDEXACAO.md` e `.env.example`).
- **Dev e build usam `--webpack`** (`next dev --webpack`, `next build --webpack`) por causa do Contentlayer — não remover sem validar o pipeline.
- Fluxo típico: `npm run dev`, `npm run build` (roda `contentlayer2 build` antes do Next).

## Conteúdo e contratos

- **Artigos (MDX):** `src/content/articles/{en,pt,es}/*.mdx` — cada idioma é um arquivo por `articleId` (paridade en/pt/es quando fizer sentido editorial).
- **Páginas do site (MDX):** `src/content/pages/{en,pt,es}/*.mdx` — `slug` permitidos: `about`, `contribute` (ver `contentlayer.config.ts`).
- **Campos e tipos de documento:** definição Contentlayer em **`contentlayer.config.ts`**; tipos TS / contrato alinhado em **`src/lib/content/schema.ts`** — novos campos costumam exigir ambos.
- **Taxonomia de artigos:** `theme` (enum fechado) e `subtheme` (slug); ordem na home e rótulos en/pt/es em **`src/lib/content/taxonomy.ts`**. Novo subtema → adicionar traduções lá no mesmo PR. Sem `level`/`domain`: a progressão de dificuldade é no **conteúdo MDX** (e `orderInTheme` entre artigos do mesmo subtema).
- Fluxo editorial: `docs/PUBLICACAO.md`.
- Contribuições: `CONTRIBUTING.md` e `CODE_OF_CONDUCT.md`.
- Após mudanças em MDX ou em config do Contentlayer, validar com `npm run build:content` ou `npm run build`.

## Rotas (referência)

- `/` redireciona para `/pt`.
- `/{locale}`, `/{locale}/{articleId}`, `/{locale}/search` — ver README se precisar de detalhe.

## Tom e escopo

- Precisão gramatical e clareza; tom respeitoso, alinhado à missão do projeto (ver README / páginas Sobre quando existirem).
- Mudanças focadas no pedido: evitar refatorações amplas não solicitadas.
