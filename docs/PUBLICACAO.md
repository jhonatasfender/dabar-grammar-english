# Fluxo editorial (Git)

Este projeto publica conteúdo **longo** como **MDX** versionado no repositório. Não usamos biblioteca i18n para parágrafos: cada idioma é um arquivo completo.

## Onde escrever

### Artigos

- `src/content/articles/en/` — artigos em contexto inglês / metalinguagem em inglês
- `src/content/articles/pt/` — explicações e notas em português (mesmo `articleId` que o par EN quando for “tradução” do mesmo texto)
- `src/content/articles/es/` — idem em espanhol

### Páginas institucionais (About / Contribute)

- `src/content/pages/{en,pt,es}/about.mdx` — rota fixa `/{locale}/about`
- `src/content/pages/{en,pt,es}/contribute.mdx` — rota fixa `/{locale}/contribute`

Frontmatter do tipo **SitePage**: `locale`, `slug` (`about` \| `contribute`), `title`, `description` (opcional).

## Contrato do frontmatter (artigos)

Campos validados pelo Contentlayer (ver também [`src/lib/content/schema.ts`](../src/lib/content/schema.ts)):

| Campo          | Obrigatório | Descrição                                                                                                                              |
| -------------- | ----------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| `articleId`    | sim         | ID estável **igual** em todos os idiomas do mesmo artigo                                                                               |
| `locale`       | sim         | `en` \| `pt` \| `es` (deve bater com a pasta)                                                                                          |
| `title`        | sim         | Título exibido                                                                                                                         |
| `theme`        | sim         | Um dos valores canónicos em `contentlayer.config.ts` / [`src/lib/content/taxonomy.ts`](../src/lib/content/taxonomy.ts) (ordem da home) |
| `subtheme`     | sim         | Slug `kebab-case`; rótulos en/pt/es devem existir em `taxonomy.ts` para slugs novos                                                    |
| `orderInTheme` | não         | Número (default `0`): ordem entre artigos do mesmo `theme` + `subtheme` + `locale`                                                     |
| `description`  | não         | Resumo (SEO + busca no site)                                                                                                           |
| `summary`      | não         | Resposta curta (1–3 frases) exibida no topo do artigo e usada como `abstract` em JSON-LD — útil para snippets e superfícies com IA     |
| `tags`         | não         | Lista de strings                                                                                                                       |
| `references`   | não         | Lista de strings (bibliografia curta)                                                                                                  |

**Nota editorial:** não há campo de “nível” no frontmatter. A progressão do mais acessível ao mais avançado fica **no corpo do MDX** (secções) e, se houver vários textos no mesmo subtema, em `orderInTheme`.

## Indexação e resposta rápida (Search / IA)

1. Defina **`NEXT_PUBLIC_SITE_URL`** no deploy (ver [`.env.example`](../.env.example) e [docs/SEO_INDEXACAO.md](./SEO_INDEXACAO.md)).
2. Prefira **`summary`** + **`description`** coerentes com o corpo do texto (sem prometer conteúdo que não está na página).
3. Novo `subtheme`: adicione rótulos em [`src/lib/content/taxonomy.ts`](../src/lib/content/taxonomy.ts) **no mesmo PR** que o MDX.
4. Após publicar: validar `robots.txt`, `sitemap.xml` e uma URL de artigo no Rich Results Test (Google); registrar sitemaps no Search Console e Bing Webmaster quando o domínio estiver ativo.

## Passos para publicar uma mudança

1. Crie ou edite `*.mdx` em `src/content/articles/<locale>/` ou `src/content/pages/<locale>/`.
2. Para artigos: garanta que `articleId` + `locale` são únicos (um arquivo por par).
3. Rode localmente:
   - `npm run dev` — desenvolvimento (webpack + Contentlayer via plugin).
   - `npm run build` — valida MDX e gera site estático.
4. Commit apenas dos **fontes** (`src/content/`, código). A pasta `.contentlayer/` é gerada no build e está no `.gitignore`.
5. No deploy (ex.: Vercel), use `npm run build`; o script já executa `contentlayer2 build` antes do `next build`.

## Revisão em equipe

- Use PRs para alterações de conteúdo acadêmico; descreva o ângulo do texto quando ajudar a revisão.
- Para artigos bilíngues/trilíngues, prefira revisar **os três MDX** no mesmo PR para manter `articleId` alinhado.

## Troca de idioma na UI

O seletor de idioma do artigo usa `articleId` para encontrar a versão em outro locale. Nas páginas About/Contribute, usa-se o mesmo `slug` entre idiomas. Se faltar um arquivo para um idioma, a UI mostra “versão não publicada”.
