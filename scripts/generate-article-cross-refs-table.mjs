#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const articlesRoot = path.join(root, "src/content/articles");
const locales = ["en", "pt", "es"];
const linkRe = /\]\(\/(en|pt|es)\/([a-z0-9-]+)\)/g;
const rows = [];

for (const loc of locales) {
  const dir = path.join(articlesRoot, loc);
  for (const f of fs.readdirSync(dir).filter((x) => x.endsWith(".mdx"))) {
    const rel = `src/content/articles/${loc}/${f}`;
    const content = fs.readFileSync(path.join(dir, f), "utf8");
    const lines = content.split("\n");
    const srcArticleId = f.replace(/\.mdx$/, "");
    lines.forEach((line, i) => {
      const re = new RegExp(linkRe.source, "g");
      let m;
      while ((m = re.exec(line)) !== null) {
        const linkLoc = m[1];
        const destId = m[2];
        const destRel = `src/content/articles/${linkLoc}/${destId}.mdx`;
        const note =
          linkLoc !== loc
            ? `locale do href (${linkLoc}) ≠ locale do arquivo (${loc})`
            : "inline";
        rows.push({
          origFile: rel,
          origLine: i + 1,
          point: line.trim().replace(/\|/g, "\\|").slice(0, 200),
          destFile: destRel,
          destLocal: "—",
          srcArticleId,
          destArticleId: destId,
          note,
        });
      }
    });
  }
}

rows.sort(
  (a, b) => a.origFile.localeCompare(b.origFile) || a.origLine - b.origLine,
);

let md = `# Referências cruzadas entre artigos

Este ficheiro mapeia **links internos** entre artigos MDX: ficheiro e linha de origem, destino e \`articleId\` (útil para rotas \`/{locale}/{articleId}\`).

**Regra editorial:** ao adicionar ou alterar um link no corpo de um artigo, atualize a linha correspondente nesta tabela (e os números de linha se o MDX mover). Para repovoar a tabela a partir do código:

\`\`\`bash
npm run doc:cross-refs
\`\`\`

| Arquivo origem | Local (linha) | Ponto (trecho) | Arquivo destino | Local destino | articleId origem | articleId destino | Notas |
| --- | --- | --- | --- | --- | --- | --- | --- |
`;

for (const r of rows) {
  md += `| \`${r.origFile}\` | L${r.origLine} | ${r.point} | \`${r.destFile}\` | ${r.destLocal} | \`${r.srcArticleId}\` | \`${r.destArticleId}\` | ${r.note} |\n`;
}

md += `\n## Total\n\n${rows.length} referências listadas.\n`;

fs.writeFileSync(path.join(root, "docs/REFERENCIAS_ENTRE_ARTIGOS.md"), md);
console.log(`Wrote ${rows.length} rows to docs/REFERENCIAS_ENTRE_ARTIGOS.md`);
