# AGENTS.md — make.fun best-national-statistics-site entry

## Overview

Competition `best-national-statistics-site-20261126-0539` ($50, 10 places x $5).
Build an original national statistics site for Indonesia as static files
under `app/` (no build step, zero network requests), with real figures each
labelled with source + year. An AI judge compares entries pairwise by
screenshots + a dossier outline; places go by win rate. Blind rounds: next
cutoff Fri 2026-11-27 06:39 WIB; deadline Sun 2026-11-29 12:39 WIB.

- **Entry in progress.** Site name: NusaData — Indonesia in Numbers.
  `app/` holds `index.html`, `styles.css`, `data.js` (figures),
  `charts.js` (own canvas charts), `app.js` (render + interactions).
  `main.ts` copies `app/` + `screenshots/` to the output dir and writes
  `dossier.json` with `vendor/makefun-frontend.ts` (kit copy, unchanged).
- **Kit:** `~/workspace/scripts/makefun-watch/kits/best-national-statistics-site-20261126-0539-kit/`
  (competition.yaml + RULES.txt read; starter/ is a layout reference only,
  never submitted unchanged — its dossier is a house site).
- **Requirements (live endpoint, checked 2026-11-26):** README.md with the
  3 live make.fun badges (competition, rank, reward), owner/repo filled,
  referral code `em5379j4`; repo About: homepage
  `https://make.fun/bounty/best-national-statistics-site-20261126-0539`,
  topics `makefun, ai-agents, bounties, code`; LICENSE MIT (OSI-approved);
  `.makefun/owner.json` names the entry wallet.
- **Submit only after Sep reviews** (parent agent's turn, not this build).

## Commands

- Serve locally: `node serve.ts` (serves `app/` on http://localhost:8080,
  `--port <n>` for another port).
- Screenshots: `/tmp/shot.mjs` (pure-Node CDP driver, recreate if /tmp was
  cleared) against `/opt/meta-chromium/chrome` on port 9222 with the WebGL
  policy switches (see Troubleshooting). 4 shots: `01-overview.png`
  (cover, desktop), `02-economy.png`, `03-provinces.png`,
  `04-phone.png` (390 x 844).
- Build the hand-in: `mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts`,
  then read `out/dossier.json` — check the Totals line and that the gate
  rows (app_files, references, screenshots, dossier_matches) would pass.
- Re-run main.ts after retaking screenshots so `out/` carries the new ones.

## Conventions

- **Build ONLY in the builder session** (this one, started after the
  competition opened 2026-11-26 12:39 WIB). Every build step here, tool
  calls naming the repo path.
- **Write all entry code yourself in-session** via write/edit. Do NOT copy
  code from the kit starter, other entries or repos into `app/` or
  `main.ts` (transcript gate: >= 30% authored lines, main.ts >= 1 authored
  line, some file revised in >= 2 messages, >= 5 assistant turns with
  text). The starter is a layout reference only.
- **Copy verbatim (required, not authored code):** `vendor/makefun-frontend.ts`
  (byte-identical to the kit copy) and the MIT `LICENSE` text.
- Corrections 2026-11-26 (follow-up fix session): poverty Sep 2023 is
  9.36, not 9.03 (9.03% was Mar 2024); population 2020-2022 is
  274.8/276.8/278.8 (World Bank WDI current values); "latest published
  values" wording dropped — the entry is a 2024 dataset, figures are
  published values for the years shown.
- Keep the first load small: system font stack only, no external
  libraries, no network requests of any kind. Split source into files
  with one clear job each, named for what they do.
- Every link and control on the site must actually work — nothing empty,
  broken or placeholder. Charts are drawn with own canvas code.

## Boundaries

- **NEVER** touch Sep's wallets or keys. No keypair, no API key in this
  project. No spending, no sign-ins except the GitHub repo upload the
  parent agent arranges (browser web UI — this build has no browser).
- **NEVER** submit or build from `~/workspace/scripts/makefun-watch/`.
  Builds live here, in their own project folder.
- **NEVER** write, rebuild, or summarise a session from memory to fill a
  transcript gap.
- **NEVER** copy another site's brand, text or images. NusaData is an
  original design; BPS/World Bank/UN appear only as cited sources.
- **NEVER** add a network request to the site (no fonts, no CDN, no
  fetch). The gate refuses any absolute URL in app/ source.

## Dependencies

- Node.js 22.18+ (have 24.22.1 at /usr/bin/node). No installs needed.
- A desktop browser (Hatch Chromium) to test the site and take
  screenshots; the kit CLI needs no install.

## Config

- Entry wallet (public Solana address, for `.makefun/owner.json`):
  `AYRJrdsoEfTh15XpfzF1axYJcH87t5JdF7EnDgBYdi1A` (agent account
  @tidy-sparrow-83-7051; NOT Sep's wallet).
- GitHub repo (created by the parent agent 2026-11-26): https://github.com/Anonone404/makefun-stats-site, public, HEAD b125024fc32d53da786283a16d206e2d83aae422 (16 files, sizes match local exactly; About set: description, homepage, topics makefun/ai-agents/bounties/code). NOT submitted to make.fun yet — Sep reviews first.

## Error Handling

- `main.ts` failing on dossier build: read the buildDossier error — it
  names the offending reference or limit; fix app/ and re-run.
- Screenshot over 256 KiB or long side over 1280: re-shoot at a smaller
  viewport or save as JPEG quality ~80.
- Gate `references` failures are almost always an absolute URL or a
  `data:` script/style in app/ source — grep app/ for `http` and `data:`.

## Troubleshooting

- Hatch Chromium CLI `--screenshot`/`--dump-dom` silently produce
  nothing — screenshots need the CDP driver on port 9222. Chrome refuses
  to start without the WebGL policy switches:
  `--hatch-webgl-allowed-domains-file=/var/lib/hatch-browser/rootfs-base/usr/share/hatch/chromium/webgl-allowed-domains.txt`
  `--hatch-webgl-allowed-domains-sha256=8097045f0459c96c4cdc76e3a1af4e0f43f640b4b59c43d6db35e3641c0264c6`
  `/json/new` ignores its `url` param: create the target, then
  `Page.navigate` and wait for `Page.loadEventFired`.
- `/tmp` does not survive VM restarts: `shot.mjs` and the requirements
  snapshot (`/tmp/stats-req.json`) must be recreated if missing.
- The grader runs Node 22; this VM has Node 24. Keep main.ts erasable
  TypeScript (no enums, no parameter properties).
