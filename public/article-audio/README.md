# Áudio dos artigos (MP3 estático)

Ficheiros gerados pelo script `npm run generate-audio`, um por artigo e idioma:

```text
public/article-audio/{locale}/{articleId}.mp3
```

Ex.: `public/article-audio/en/articles-a-an-the.mp3`

## Gerar áudio

1. Configura `.env.local` (ver `.env.example`): `ELEVENLABS_API_KEY`, voz (`ELEVENLABS_VOICE_ID` ou `ELEVENLABS_VOICE_EN` / `PT` / `ES`).
2. Um artigo:  
   `npm run generate-audio -- --locale=en --article=articles-a-an-the`
3. Todos os artigos num idioma:  
   `npm run generate-audio -- --locale=pt`
4. Tudo (custo elevado na API):  
   `npm run generate-audio -- --all`
5. Só listar destinos:  
   `npm run generate-audio -- --dry-run --locale=en`

Opções úteis: `--force` (regenerar), `--delay-ms=600` (pausa entre pedidos).

## Git LFS

Os `.mp3` são grandes; a raiz do repo inclui `.gitattributes` para `public/article-audio/**/*.mp3` via LFS.

```bash
git lfs install
```

Antes do primeiro `git add` de `.mp3`, confirma que a regra LFS está ativa (`git lfs track` mostra o padrão ou vê `.gitattributes`). Quem clona precisa de [Git LFS](https://git-lfs.com/) instalado para receber os binários reais.

## Player no MDX

Nos artigos e nas páginas do site (`about`, `contribute`), usa o componente exposto no MDX:

```mdx
<ArticleAudio />
```

O `src` é derivado de `public/article-audio/{locale}/{articleId}.mp3` (artigos) ou `{slug}.mp3` (páginas), conforme o ficheiro atual.

Opcional: `src` absoluto no site ou `id` para outro ficheiro na mesma pasta de idioma:

```mdx
<ArticleAudio id="outro-trecho" />
<ArticleAudio src="/article-audio/en/custom.mp3" />
```

Se o ficheiro não existir, o bloco deixa de ser mostrado após erro de carregamento.
