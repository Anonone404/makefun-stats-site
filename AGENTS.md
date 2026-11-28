# AGENTS.md — make.fun best-national-statistics-site entry

## Overview

Competition `best-national-statistics-site-20261126-0539` ($50, 10 places x $5).
Build an original national statistics site for Indonesia as static files
under `app/` (no build step, zero network requests), with real figures each
labelled with source + year. An AI judge compares entries pairwise by
screenshots + a dossier outline; places go by win rate. Blind rounds: next
cutoff Fri 2026-11-27 06:39 WIB; deadline Sun 2026-11-29 12:39 WIB.

- **Visual redesign pass 2026-11-28 ~11:05-11:15 WIB (this session, Sep: "redesign lagi biar ranknya naik", round 3 cutoff 18:39 WIB):** palette teal/green + slate wash → deep navy `#0f2a4a` + amber `#d97706` editorial data style on warm paper `#f5f1e8`; serif display type (Georgia) for h1/h2/h3, brand name and stat values; header navy with 3px amber bottom rule; stat cards with 3px navy top rule; panels radius 6px with a 48px amber rule under each h2; insight callout now navy left border on `#fdf6e3`; glance items navy top rule; charts recolored (line/bars navy, dots + highlight amber, grid `#d9dee7`); toggle-on navy; age bars navy; table header warm `#f5f1e8`, highlighted row `#fef3c7`; footer navy-deep; back-to-top amber circle. Content, figures, data, math, routes, controls UNCHANGED. Also fixed: hero `scroll-margin-top: 72px` so the kicker is no longer hidden behind the sticky header in the cover shot. Screenshots retaken (01 89,826 / 02 63,926 / 03 65,576 / 04 48,549 bytes, all ≤256 KiB, 0 console errors); controls verified live (pop/eco toggles, province search "Java" → 3 rows, sort, mobile menu open/close, back-to-top). Dossier Totals now "first load 5 files, 13698 bytes gzip-9 (45705 raw)". NOT uploaded, NOT bundled, NOT submitted — parent handles repo upload + bundle + submit. Local git HEAD after redesign: see git log.
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
- Mobile nav fix 2026-11-26 (follow-up fix session): inside the 720px
  media query only, the header is a single row (`.top-inner` no wrap) and
  the nav is one horizontally scrollable row (no wrap, `overflow-x: auto`,
  hidden scrollbar, links `white-space: nowrap`) — no hamburger, CSS only.
- Hamburger menu 2026-11-26 (follow-up fix session): replaces the
  scrollable nav row. A three-line button (`.menu-btn`, hidden on desktop)
  toggles `.nav-open` on the header; the nav is hidden by default on
  mobile and opens as a full-width dropdown under the header.
  `app.js` `initMenu()` wires toggle, link-click close and Escape close.
- Floating back-to-top 2026-11-26 (follow-up fix session): the footer
  "Back to top" link is replaced by a single floating button (`.to-top`,
  teal), fixed bottom-right with a clear offset from the edges (24px
  desktop, 16px mobile). Arrow-only since the second fix: a 48x48px
  circle showing just "↑" (aria-label "Back to top"), no visible text.
  CSS only, no JS.
- Rounding fix 2026-11-26 (follow-up fix session): TRADE_2024 "Foreign
  investment" corrected from $24.2B to $24.3B (World Bank WDI
  BX.KLT.DINV.CD.WD 2024 = 24,275,445,280 USD).
- ASEAN comparison 2026-11-26 (follow-up build session): new "How
  Indonesia compares" section (nav "Compare", between Economy and
  Prices & jobs) — horizontal bar chart of GDP per capita for the six
  largest ASEAN economies by that measure (Indonesia highlighted, chart
  uses `formatValue` + `highlight` options in charts.js) plus a table
  of all ten members with population and GDP per capita (Indonesia row
  highlighted). All figures World Bank WDI 2024, verified live by the
  parent. Insight line: largest population and economy in Southeast
  Asia, but only 5th-highest GDP per person. Human-scale lines: "About
  1 in 29 people on Earth lives in Indonesia" in Population (world
  population 8,140,897,523, World Bank 2024); Economy intro already
  said "the 16th largest economy in the world".
- Tourism + annotations + Java + provinces chart 2026-11-26 (follow-up
  build session, user approved all four): new "Tourism" section (nav
  "Tourism", between Welfare and Provinces) — 13.9M foreign arrivals
  (+19.05%), 1.02B domestic trips, Malaysia top source 2.28M, 5th in
  ASEAN; arrivals trend bar chart 2020–2024 (4.05/1.56/5.89/11.68/13.90M,
  BPS, 2022 uses the revised total) and an ASEAN arrivals horizontal bar
  chart (Thailand 35.5, Malaysia 25.0, Vietnam 17.5, Singapore 16.5,
  Indonesia 13.9, national tourism statistics 2024, verified live).
  Chart annotations (charts.js `options.annotations`, amber, `padTop`
  option on axes): inflation 2022 bar "Sep 2022: fuel prices raised",
  GDP growth 2020 point "2020: COVID-19". Java line in Population:
  "More than half of all Indonesians — about 156 million people — live
  on Java, an island with only about 7% of the country's land" (BPS,
  2024). Top-5 provinces horizontal bar chart at the top of the
  Provinces section (reuses PROVINCES). Header tightened for the 9th
  nav link: `.top-inner` gap 12px, nav gap 2px, links 13px / 6px 7px —
  desktop header must stay a single row at 1280px.
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
- GitHub repo (created by the parent agent 2026-11-26): https://github.com/Anonone404/makefun-stats-site, public, HEAD ee4a299ffc0bec446a0a4af95cb520262e5f8296 (About set: description, homepage, topics makefun/ai-agents/bounties/code). SUBMITTED 2026-11-26 ~19:45 WIB: submission 01a217e3-bb15-7518-a3b6-7990122b0647, claim code AF-9CNEY-N2RV8-F9VZ8-5B4QC, title "NusaData - Indonesia in Numbers". Server validity checks all pass; grading underway; blind round 1 of 4 (cutoff Fri 2026-11-27 06:39 WIB). Record: submission.json. Local git HEAD 718b5d0c (working copy only; GitHub HEAD is the submitted commit).

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
