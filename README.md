# Dabar Grammar English

Portal web para estudo **avançado** de inglês (incluindo graduação em Letras), com leitura confortável e conteúdo editorial em **EN / PT / ES** em **MDX** no Git (sem i18n para textos longos).

**Repositório:** [github.com/jhonatasfender/dabar-grammar-english](https://github.com/jhonatasfender/dabar-grammar-english)

## Contribuir

Quer corrigir um texto, propor um artigo ou melhorar uma tradução?

1. Leia o guia **[CONTRIBUTING.md](CONTRIBUTING.md)** (fluxo de PR, pastas de conteúdo, checklist).
2. Use **[Issues](https://github.com/jhonatasfender/dabar-grammar-english/issues)** para ideias ou dúvidas antes de mudanças grandes.
3. No site: página **Contribuir** em cada idioma (`/pt/contribute`, `/en/contribute`, `/es/contribute`) com links diretos para o GitHub e o `CONTRIBUTING.md`.

Comportamento na comunidade: [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md).

## Stack

- [Next.js](https://nextjs.org/) (App Router) + TypeScript
- [Contentlayer2](https://github.com/timlrx/contentlayer2) + [next-contentlayer2](https://www.npmjs.com/package/next-contentlayer2)
- [MiniSearch](https://lucaong.github.io/minisearch/) para busca no cliente
- [next-themes](https://github.com/pacocoursey/next-themes) para tema claro/escuro

O Next.js 16 usa Turbopack por padrão; este projeto usa **`--webpack`** no `dev` e no `build` por causa da integração do Contentlayer.

## Comandos

```bash
npm install
npm run dev
npm run build
npm start
```

## Conteúdo

- Artigos: `src/content/articles/{en,pt,es}/*.mdx`
- Páginas About / Contribute: `src/content/pages/{en,pt,es}/`
- Schema de artigos: [`src/lib/content/schema.ts`](src/lib/content/schema.ts)
- Fluxo editorial (PT): [`docs/PUBLICACAO.md`](docs/PUBLICACAO.md)

## Rotas

- `/` → redireciona para `/pt`
- `/{locale}` — lista de artigos
- `/{locale}/{articleId}` — leitura de artigo
- `/{locale}/about` — sobre o projeto
- `/{locale}/contribute` — como contribuir
- `/{locale}/search` — busca

## SEO, sitemap e crawlers (Search + IA)

- **`NEXT_PUBLIC_SITE_URL`**: URL pública canônica (sem barra final); alimenta `metadataBase`, `sitemap.xml`, `robots.txt` e JSON-LD. Ver [`.env.example`](./.env.example).
- **Documentação**: [docs/SEO_INDEXACAO.md](./docs/SEO_INDEXACAO.md) (matriz de bots, variáveis `ROBOTS_ALLOW_AI_TRAINING`, checklist pós-deploy).
- **`/llms.txt`**: índice opcional para descoberta por LLMs ([`public/llms.txt`](./public/llms.txt)); substitua `https://YOUR_DOMAIN` pelo domínio real.

## Licença

Conteúdo e código: conforme decisão do mantenedor do repositório.
