#!/usr/bin/env node

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { ElevenLabsClient } from "@elevenlabs/elevenlabs-js";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import { toString } from "mdast-util-to-string";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const articlesRoot = path.join(root, "src/content/articles");
const audioRoot = path.join(root, "public/article-audio");
const LOCALES = ["en", "pt", "es"];

function loadEnvLocal() {
  const p = path.join(root, ".env.local");
  if (!fs.existsSync(p)) return;
  const text = fs.readFileSync(p, "utf8");
  for (const line of text.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq <= 0) continue;
    const key = trimmed.slice(0, eq).trim();
    let val = trimmed.slice(eq + 1).trim();
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    }
    if (process.env[key] === undefined) process.env[key] = val;
  }
}

function splitFrontmatter(content) {
  if (!content.startsWith("---\n")) return { fm: "", body: content };
  const end = content.indexOf("\n---\n", 4);
  if (end === -1) return { fm: "", body: content };
  return {
    fm: content.slice(4, end),
    body: content.slice(end + 5),
  };
}

function extractTitle(fmBlock) {
  const m = fmBlock.match(/^title:\s*(.+)$/m);
  if (!m) return "";
  let t = m[1].trim();
  if (
    (t.startsWith('"') && t.endsWith('"')) ||
    (t.startsWith("'") && t.endsWith("'"))
  ) {
    t = t.slice(1, -1);
  }
  return t;
}

function markdownToPlain(markdown) {
  const tree = unified().use(remarkParse).use(remarkGfm).parse(markdown);
  let plain = toString(tree);
  plain = plain.replace(/\n{3,}/g, "\n\n").trim();
  return plain;
}

function chunkText(text, maxLen) {
  if (text.length <= maxLen) return [text];
  const parts = [];
  const paragraphs = text.split(/\n\n+/);
  let acc = "";
  const pushAcc = () => {
    if (acc) {
      parts.push(acc);
      acc = "";
    }
  };
  const flushSliceLong = (p) => {
    for (let i = 0; i < p.length; i += maxLen) {
      parts.push(p.slice(i, i + maxLen));
    }
  };
  for (const p of paragraphs) {
    const sep = acc ? "\n\n" : "";
    if ((acc + sep + p).length <= maxLen) {
      acc = acc ? acc + sep + p : p;
      continue;
    }
    pushAcc();
    if (p.length <= maxLen) acc = p;
    else flushSliceLong(p);
  }
  pushAcc();
  return parts;
}

async function streamToBuffer(stream) {
  const chunks = [];
  for await (const chunk of stream) {
    chunks.push(Buffer.from(chunk));
  }
  return Buffer.concat(chunks);
}

function parseArgs(argv) {
  const out = {
    locale: null,
    article: null,
    all: false,
    force: false,
    dryRun: false,
    delayMs: 400,
    help: false,
  };
  for (const a of argv) {
    if (a === "--help" || a === "-h") out.help = true;
    else if (a === "--all") out.all = true;
    else if (a === "--force") out.force = true;
    else if (a === "--dry-run") out.dryRun = true;
    else if (a.startsWith("--locale="))
      out.locale = a.slice("--locale=".length);
    else if (a.startsWith("--article="))
      out.article = a.slice("--article=".length);
    else if (a.startsWith("--delay-ms="))
      out.delayMs = Number(a.slice("--delay-ms=".length)) || 400;
  }
  return out;
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function voiceForLocale(locale) {
  const map = {
    en: process.env.ELEVENLABS_VOICE_EN,
    pt: process.env.ELEVENLABS_VOICE_PT,
    es: process.env.ELEVENLABS_VOICE_ES,
  };
  return map[locale]?.trim() || process.env.ELEVENLABS_VOICE_ID?.trim() || "";
}

async function main() {
  loadEnvLocal();
  const args = parseArgs(process.argv.slice(2));

  if (args.help) {
    console.log(`Usage:
  npm run generate-audio -- --locale=en --article=articles-a-an-the
  npm run generate-audio -- --locale=pt
  npm run generate-audio -- --all
  npm run generate-audio -- --dry-run --locale=en

Options:
  --locale=en|pt|es   Filtra idioma (obrigatório exceto com --all)
  --article=id       Só este articleId (ficheiro sem .mdx)
  --all              Todos os idiomas e artigos
  --force            Regenera mesmo se o MP3 já existir
  --dry-run          Só lista destinos; não chama API nem grava ficheiros
  --delay-ms=N       Pausa entre pedidos à API (default 400)
`);
    process.exit(0);
  }

  const apiKey = process.env.ELEVENLABS_API_KEY?.trim();
  if (!args.dryRun && !apiKey) {
    console.error(
      "Missing ELEVENLABS_API_KEY (.env.local). Use --dry-run to preview.",
    );
    process.exit(1);
  }

  const modelId =
    process.env.ELEVENLABS_MODEL_ID?.trim() || "eleven_multilingual_v2";
  const outputFormat =
    process.env.ELEVENLABS_OUTPUT_FORMAT?.trim() || "mp3_44100_128";
  const maxChunk = Math.max(
    1000,
    Number(process.env.ELEVENLABS_MAX_CHUNK_CHARS) || 8000,
  );

  const jobs = [];

  if (args.all) {
    for (const loc of LOCALES) {
      const dir = path.join(articlesRoot, loc);
      if (!fs.existsSync(dir)) continue;
      for (const f of fs.readdirSync(dir)) {
        if (!f.endsWith(".mdx")) continue;
        jobs.push({
          locale: loc,
          articleId: f.replace(/\.mdx$/, ""),
          mdxPath: path.join(dir, f),
        });
      }
    }
  } else {
    if (!args.locale || !LOCALES.includes(args.locale)) {
      console.error("Provide --locale=en|pt|es or use --all. See --help.");
      process.exit(1);
    }
    const dir = path.join(articlesRoot, args.locale);
    if (!fs.existsSync(dir)) {
      console.error("Missing directory:", dir);
      process.exit(1);
    }
    const files = args.article
      ? [`${args.article}.mdx`]
      : fs.readdirSync(dir).filter((f) => f.endsWith(".mdx"));
    for (const f of files) {
      const full = path.join(dir, f);
      if (!fs.existsSync(full)) {
        console.error("Article not found:", full);
        process.exit(1);
      }
      jobs.push({
        locale: args.locale,
        articleId: f.replace(/\.mdx$/, ""),
        mdxPath: full,
      });
    }
  }

  jobs.sort(
    (a, b) =>
      a.locale.localeCompare(b.locale) ||
      a.articleId.localeCompare(b.articleId),
  );

  const client = args.dryRun
    ? null
    : new ElevenLabsClient({ apiKey: apiKey ?? undefined });

  if (args.dryRun) {
    console.log(
      "\nDry-run: nenhum MP3 será gravado e a ElevenLabs não é chamada.",
    );
    console.log(
      "Para gerar de verdade, repete o comando sem --dry-run (e com ELEVENLABS_API_KEY + voz no .env.local).\n",
    );
  }

  let done = 0;
  let skipped = 0;
  let failed = 0;

  for (const job of jobs) {
    const voiceId = voiceForLocale(job.locale);
    if (!args.dryRun && !voiceId) {
      console.error(
        `[skip] ${job.locale}/${job.articleId}: set ELEVENLABS_VOICE_ID or ELEVENLABS_VOICE_${job.locale.toUpperCase()}`,
      );
      failed++;
      continue;
    }

    const outDir = path.join(audioRoot, job.locale);
    const outPath = path.join(outDir, `${job.articleId}.mp3`);

    if (!args.force && fs.existsSync(outPath)) {
      console.log(`[skip exists] ${job.locale}/${job.articleId}.mp3`);
      skipped++;
      continue;
    }

    const raw = fs.readFileSync(job.mdxPath, "utf8");
    const { fm, body } = splitFrontmatter(raw);
    const title = extractTitle(fm);
    const plainBody = markdownToPlain(body);
    const speechText = title
      ? `${title.replace(/[_*]+/g, "")}\n\n${plainBody}`
      : plainBody;

    if (!speechText.trim()) {
      console.error(`[skip empty] ${job.mdxPath}`);
      failed++;
      continue;
    }

    if (args.dryRun) {
      console.log(`[dry-run] → ${path.relative(root, outPath)}`);
      done++;
      continue;
    }

    fs.mkdirSync(outDir, { recursive: true });

    const chunks = chunkText(speechText, maxChunk);
    const buffers = [];

    try {
      for (let i = 0; i < chunks.length; i++) {
        const stream = await client.textToSpeech.convert(voiceId, {
          text: chunks[i],
          modelId,
          outputFormat,
          languageCode: job.locale,
        });
        buffers.push(await streamToBuffer(stream));
        if (i < chunks.length - 1) await sleep(args.delayMs);
      }
      fs.writeFileSync(outPath, Buffer.concat(buffers));
      console.log(
        `[ok] ${job.locale}/${job.articleId}.mp3 (${chunks.length} chunk(s))`,
      );
      done++;
      await sleep(args.delayMs);
    } catch (e) {
      console.error(`[fail] ${job.locale}/${job.articleId}:`, e?.message || e);
      failed++;
    }
  }

  console.log(
    `\nDone. ok/generate: ${done}, skipped (exists): ${skipped}, failed: ${failed}`,
  );
  if (args.dryRun) {
    console.log(
      "\n(Lembra-te: em dry-run os contadores são só “seriam processados”; nada foi escrito em disco.)",
    );
  }
  if (failed > 0) process.exit(1);
}

main();
