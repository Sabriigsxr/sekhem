# SEKHEM — The Pharaoh's Pentest Codex

> A practical, offline-capable penetration testing knowledge base — static, searchable, and yours. **Redesigned & maintained by Dev Ahmed Sabry.**
>
> SEKHEM is a redesign (identity, theme, presentation) of **[PentestingEverything](https://github.com/m14r41/PentestingEverything)** by **Madhurendra Kumar ([m14r41](https://github.com/m14r41))**, released under the MIT License. The original `LICENSE` and `NOTICE.md` are retained unchanged — full credit for the underlying knowledge base belongs to the original author and its contributors. This fork is published under the same MIT terms.

## Maintainer

**Dev Ahmed Sabry** — [github.com/sabriigsxr](https://github.com/sabriigsxr) · [@ahmedsabriigsxr1000](https://www.instagram.com/ahmedsabriigsxr1000) (Instagram) · [WhatsApp +20 128 412 3811](https://wa.me/201284123811)

SEKHEM is a redesign of [PentestingEverything](https://github.com/m14r41/PentestingEverything) by m14r41 (MIT © 2023).

## Live site

Configured via `SITE_URL` (default `https://sekhem.pages.dev`). Set your own domain with the `SITE_URL` env var or in `docusaurus.config.ts`.

## What's inside

- **124 documentation pages** of real-world pentesting methodology across **24 domains** — web, API, cloud, mobile, network, AD, LLM, OSINT and more
- **104 reference PDFs**, served from `static/pdfs/`
- **Fully static** — no backend, no database, no telemetry, no login
- **Offline-capable local search** (Ctrl/Cmd + K)
- **22+ learning paths / ordered navigation** through the Codex
- MIT-licensed code; content shared as-is from the upstream project

## Attribution (required by MIT — kept, not courtesy)

- **Original work**: PentestingEverything by Madhurendra Kumar (m14r41) — https://github.com/m14r41/PentestingEverything
- **Original license**: MIT (see [`LICENSE`](./LICENSE) and [`NOTICE.md`](./NOTICE.md))
- **Third-party PDFs** in this repository are the property of their respective owners, redistributed in good faith for education. See [`CONTENT_REMOVAL.md`](./CONTENT_REMOVAL.md) — takedown or re-attribution requests are handled promptly and without dispute.
- **Redesign & SEKHEM identity**: Dev Ahmed Sabry — GitHub [sabriigsxr](https://github.com/sabriigsxr) · Instagram [@ahmedsabriigsxr1000](https://www.instagram.com/ahmedsabriigsxr1000) · WhatsApp [+20 128 412 3811](https://wa.me/201284123811)

## Develop

```bash
npm install
npm run prebuild   # node scripts/migrate.ts — regenerates docs/ from the content folders
npm run start      # dev server
npm run build      # production build → ./build
npm run serve      # serve the production build
npm run typecheck  # tsc
```

Environment overrides: `SITE_URL`, `BASE_URL`, `GH_ORG`, `GH_REPO`, `GH_BRANCH`.

## Repository layout

- Top-level content folders (e.g. `Web Application Pentesting/`) are the **source of truth** for docs.
- `scripts/migrate.ts` rebuilds the Docusaurus `docs/` tree on every prebuild — never edit `docs/` directly.
- `src/pages/` — React pages (homepage, references, learning paths).
- `src/css/custom.css` — SEKHEM design system (stele & torchlight theme).
- `static/img/` — SEKHEM brand assets.

## License

MIT © 2023 Madhurendra Kumar (upstream) · SEKHEM redesign © 2026 Dev Ahmed Sabry.
See [`LICENSE`](./LICENSE) and [`NOTICE.md`](./NOTICE.md).
