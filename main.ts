// NusaData entrypoint (Node 22, standard library only).
//
// The site lives in app/ beside this file: plain static files, no build
// step, no network requests. This program hands the entry in: it copies
// app/ and screenshots/ into the output directory and writes
// dossier.json there with the vendored make.fun library, so the judge can
// read the site's screenshots, first-load totals and source outline.
//
// Outside the grader, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
//
// Keep vendor/makefun-frontend.ts byte-identical to the kit copy: the
// scorer rebuilds the dossier with its own copy and compares the bytes.

import { cpSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-frontend.ts';

const repoRoot = fileURLToPath(new URL('.', import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

mkdirSync(outDir, { recursive: true });
cpSync(join(repoRoot, 'app'), join(outDir, 'app'), { recursive: true });

const shotsDir = join(outDir, 'screenshots');
mkdirSync(shotsDir, { recursive: true });
if (existsSync(join(repoRoot, 'screenshots'))) {
  cpSync(join(repoRoot, 'screenshots'), shotsDir, { recursive: true });
}

// Caps mirror the gate: at most 4 screenshots of 256 KiB, at most 993
// files / 16 MiB in app/, dossier text capped at 160 KiB.
writeFileSync(
  join(outDir, 'dossier.json'),
  buildDossier(outDir, {
    text_max_bytes: 163840,
    screenshots: { max: 4, max_bytes: 262144 },
    app_max_files: 993,
    app_max_bytes: 16777216,
  }),
);

console.log(`entry written to ${outDir}`);
