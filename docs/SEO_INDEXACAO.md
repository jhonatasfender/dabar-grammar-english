# SEO e indexação (Search + IA)

Este documento descreve a **base técnica** e a **política de crawlers** usadas neste site, alinhadas a orientações atuais de Google Search, Bing/Copilot, OpenAI, Anthropic e Perplexity.

## URL canônica do site

Defina **`NEXT_PUBLIC_SITE_URL`** no ambiente de produção (ex.: `https://seu-dominio.com`, **sem** barra final). Em Vercel, `VERCEL_URL` funciona como fallback, mas a URL pública estável deve ser a canônica.

Veja também [`.env.example`](../.env.example).

## Arquivos gerados

| Recurso    | Origem no código        |
| ---------- | ----------------------- |
| `robots.txt` | [`src/app/robots.ts`](../src/app/robots.ts) |
| `sitemap.xml` | [`src/app/sitemap.ts`](../src/app/sitemap.ts) |

## Política de bots (matriz)

| User-agent        | Função típica                         | Padrão neste projeto                                      |
| ----------------- | ------------------------------------- | --------------------------------------------------------- |
| `*`               | Crawlers genéricos                    | `Allow: /`                                                |
| `OAI-SearchBot`   | Busca no ecossistema ChatGPT          | `Allow: /` (recomendado para aparecer em respostas com links) |
| `Claude-SearchBot` | Melhoria de busca Anthropic         | `Allow: /`                                                |
| `PerplexityBot`   | Índice Perplexity (não treino foundation, segundo documentação Perplexity) | `Allow: /` |
| `GPTBot`          | Treino de modelos OpenAI              | `Disallow: /` **salvo** se treino for permitido (ver abaixo) |
| `ClaudeBot`       | Treino Anthropic                      | `Disallow: /` **salvo** se treino for permitido           |
| `Google-Extended` | Usos de IA Google separados do core Search | `Disallow: /` **salvo** se treino/uso estendido for permitido |

**Importante:** bloquear `Google-Extended` **não** remove o site do Google Search; o controle de indexação clássico continua sendo `Googlebot` + metadados (`noindex`, etc.), conforme documentação Google.

### Variáveis de ambiente

| Variável | Efeito |
| -------- | ------ |
| `ROBOTS_ALLOW_AI_TRAINING=true` ou `NEXT_PUBLIC_ROBOTS_ALLOW_AI_TRAINING=true` | Remove `Disallow: /` para `GPTBot`, `ClaudeBot` e `Google-Extended` (permite treino/uso conforme política de cada fornecedor). |

Alterações em `robots.txt` podem levar **até ~24h** para serem refletidas em alguns sistemas de IA.

### Fetches iniciados por usuário

Ferramentas como **ChatGPT-User**, **Claude-User** e **Perplexity-User** podem buscar URLs em resposta a ações do usuário; isso **não** substitui a política de indexação automática documentada acima. Consulte a documentação oficial de cada provedor ao decidir bloqueios em WAF/CDN.

## Metadados multilíngue

- **`alternates.languages`**: `en`, `pt`, `es`, `x-default` (default editorial: `pt`).
- **`canonical`**: auto-referencial por idioma da página.

Implementação: [`src/lib/seo/alternates.ts`](../src/lib/seo/alternates.ts).

## Dados estruturados (JSON-LD)

- **`WebSite`** (+ `SearchAction` genérico apontando para busca em `pt`): [`src/components/seo/json-ld.tsx`](../src/components/seo/json-ld.tsx) no layout raiz.
- **`Article`** + **`BreadcrumbList`**: páginas de artigo.
- **`WebPage`**: busca, sobre, contribuir.

O campo opcional `summary` no frontmatter do artigo é exposto como **`abstract`** no JSON-LD quando presente.

## Medição e QA contínuo

### Após cada deploy relevante

1. Abrir `robots.txt` e `sitemap.xml` na origem pública.
2. Validar uma URL de artigo em cada idioma no [Rich Results Test](https://search.google.com/test/rich-results) (Google).
3. Google Search Console: cobertura / sitemaps; amostrar `hreflang` se houver propriedade multilíngue.
4. Bing Webmaster Tools: envio de sitemap; monitorar **AI/Copilot** conforme recursos disponíveis na conta.

### Checklist editorial

Ver também [PUBLICACAO.md](./PUBLICACAO.md) — seção **Indexação e resposta rápida (Search / IA)**.

## IndexNow (opcional)

O protocolo [IndexNow](https://www.indexnow.org/) pode acelerar descoberta no ecossistema Bing; não está acoplado ao código por padrão. Avalie integração no pipeline de deploy se o tempo de indexação for crítico.
