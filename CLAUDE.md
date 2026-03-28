@AGENTS.md

# Contexto para assistentes (CLAUDE.md)

- **Projeto:** **Dabar Grammar English** — gramática avançada em inglês; conteúdo multilíngue em MDX; URL do repositório e stack em **AGENTS.md**; visão geral em [README.md](./README.md).

## Antes de editar

1. Ler **AGENTS.md** (Next.js 16 + regras deste repo).
2. Para artigos ou traduções: **CONTRIBUTING.md**, **docs/PUBLICACAO.md**, **contentlayer.config.ts**, **src/lib/content/schema.ts** e **`src/lib/content/taxonomy.ts`** (`theme`/`subtheme` e rótulos — alinhar os três quando mudar o contrato).
3. Preferir o mesmo estilo de código, imports e padrões de UI já usados no app.

## Idioma

- O mantenedor costuma escrever em **português**; responda no idioma da conversa, com termos técnicos em inglês quando for o padrão do código (Next, rotas, nomes de arquivos).

## Documentação de agente vs skills globais

- Convenções **só deste repositório** ficam aqui e em **AGENTS.md**.
- Skills reutilizáveis entre projetos pertencem ao diretório de skills do Cursor/Claude, não duplicar processos longos nestes arquivos.
