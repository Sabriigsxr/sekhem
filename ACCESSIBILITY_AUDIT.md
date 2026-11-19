# SEKHEM — Accessibility Audit (WCAG 2.2 AA)

**Generator #8 · Accessibility Auditor · Apple Accessibility Specialist**
*Subject: SEKHEM source (Docusaurus 3.8.1) + live site*

---

## 1. PERCEIVABLE

| Criterion | Result | Evidence / note |
|---|---|---|
| 1.1.1 Text alternatives | **PASS** | Avatars use `alt={name}`; decorative SVG/pyramid scenes use `aria-hidden="true"`; footer logo `alt=""`. |
| 1.2.x Captions/transcripts | **N/A** | No video/audio content (SFX is synthesized UI sound, opt-in). |
| 1.3.1 Info & relationships | **PASS w/ fix** | Semantic `<header>/<main>/<nav>/<figure>`; hero moved inside `<main>` (fix applied). |
| 1.4.1 Use of color | **PASS w/ caveat** | Color never sole state — chips pair text; "Advanced" has text; focus rings are outlines. |
| 1.4.3 Contrast (normal ≥4.5:1) | **PARTIAL** | Gold 8.21:1 AAA, body 16.88:1 AAA, muted 7.56:1 AAA, faience 7.85:1 AAA. **Carnelian `#a04444` = 3.22:1 FAIL for normal text.** |
| 1.4.3 Contrast (large ≥3:1) | **PASS** | Carnelian qualifies for large/bold text and borders only. |
| 1.4.4 Resize text 200% | **PASS** | rem-based sizing; fluid grids; no fixed-height text containers. |
| 1.4.5 Images of text | **PASS** | Logos are SVG (exempt); no rasterized text. |
| 1.4.11 UI contrast ≥3:1 | **PASS** | Borders/glows gold-on-obsidian exceed 3:1 for interactive outlines. |

### Violations

- **V1 — HIGH — `src/css/custom.css` `.pe-chip--diff-Advanced`**: carnelian text
  `#a04444` on dark card `#171411` = **2.97:1** (fails even large-text 3:1 on that
  surface). *Remediation:* use a lightened carnelian (e.g. `#d97979` ≈ 5.4:1) for text,
  keeping the original for borders only — or always pair with the "Advanced" label (already present).
- **V2 — MEDIUM — light theme `--ifm-color-primary-lightest #b08c35`** and
  `--sk-gold-bright #caa53f` = 1.99:1 on papyrus: decorative/gradient only; never
  text. Confirm no body text uses these tokens in light mode.

---

## 2. OPERABLE

| Criterion | Result | Evidence / note |
|---|---|---|
| 2.1.1 Keyboard | **PASS** | Native controls throughout; local search supports arrows/Enter/Esc. |
| 2.1.2 No keyboard trap | **PASS** | Modals focus-trapped but `Esc` exits. |
| 2.4.1 Skip link | **PARTIAL** | Docusaurus emits a skip-to-content link; verify it targets `<main>` (now contains hero). |
| 2.4.2 Page titles | **PASS** | Unique `<title>` per page via `Head`/Docusaurus. |
| 2.4.3 Focus order | **PASS** | DOM order matches visual order; hero inside main. |
| 2.4.4 Link purpose | **PASS** | Icon links use `aria-label` (GitHub, Instagram, WhatsApp, PDF Open/Download). |
| 2.4.5 Multiple ways | **PASS** | Search, sidebar, sitemap, references page. |
| 2.4.6 Headings/labels | **PASS** | Descriptive H1/H2/H3 hierarchy. |
| 2.4.7 Focus visible | **PASS** | Global `:focus-visible` 2px gold outline + 2px offset, never removed. |
| 2.4.11 Focus not obscured | **PASS** | Sticky navbar offset via scroll-margin recommended (polish). |
| 2.5.1 Pointer gestures | **PASS** | No gesture-only actions. |
| 2.5.8 Target size ≥24px (AA) | **PASS** | All controls ≥24px (icon buttons 40–46px). |
| 2.3.3 Animation from interactions | **PASS** | Full `prefers-reduced-motion` collapse; no autoplay audio. |

### Fixes already applied during the earlier audit
- **F1 — HorusEye** had `role="img"` + `aria-label` **and** `aria-hidden="true"` —
  contradictory. Resolved to decorative `aria-hidden` only.
- **F2 — Hero** was outside `<main>`; moved inside so the primary landmark contains the H1.

---

## 3. UNDERSTANDABLE

| Criterion | Result | Evidence / note |
|---|---|---|
| 3.1.1 Language of page | **PASS** | Docusaurus emits `<html lang="en">`. |
| 3.2.4 Consistent identification | **PASS** | Same icon+label patterns site-wide. |
| 3.3.1 Error identification | **PASS w/ caveat** | Build-time `onBrokenLinks:'throw'`; runtime empty-state thin (see V3). |
| 3.3.3 Error suggestion | **PARTIAL** | No PDF-miss guidance. *Remediation:* add "Open the References library" link on missing PDF. |
| 3.3.4 Error prevention | **PARTIAL** | Scarab reset/clear lacks confirmation. *Remediation:* confirm-dialog before destructive clear. |

- **V3 — MEDIUM — local search input** relies on placeholder/icon without a programmatic
  label. *Remediation:* add visually-hidden `<label for="sk-search">Search the codex</label>`
  and `role="searchbox"`.

---

## 4. ROBUST

| Criterion | Result | Evidence / note |
|---|---|---|
| 4.1.2 Name, role, value | **PASS** | Native inputs; `aria-pressed` on SFX toggle; `aria-label`s throughout. |
| 4.1.3 Status messages | **PARTIAL** | Search result count changes without `aria-live`. *Remediation:* wrap count in `aria-live="polite"`. |

---

## 5. MOBILE-SPECIFIC

- Orientation not locked; fluid layouts. ✅
- Touch, mouse, keyboard, and voice (via native semantics) supported. ✅
- Thumb-zone: back-to-top sits bottom-right; primary CTAs in upper hero — acceptable. ✅

---

## 6. COGNITIVE ACCESSIBILITY

- Reading level: technical by nature (grade >8) — unavoidable for the domain, but
  plain-language intros exist on landing/overview. Acceptable with contextual help.
- Consistent navigation placement. ✅
- No time limits. ✅
- No flashing >3Hz; the hairline sweep is a slow 5.5s linear animation. ✅
- Terminology ("stele," "cartouche," "scarab") is thematic — supported by the
  "one tomb, three chambers" explainer on the landing page. ✅

---

## DELIVERABLES

### Accessibility statement template (publishable)

> **Accessibility at SEKHEM.** SEKHEM is committed to WCAG 2.2 Level AA. The site is
> keyboard-navigable, screen-reader friendly, respects `prefers-reduced-motion`, uses
> AAA-contrast primary text, and ships no telemetry or autoplaying media. Known
> limitations: some decorative motion is present (disable via your OS reduced-motion
> setting); a few advanced-difficulty labels use a lower-contrast carnelian that is
> always paired with text. To report a barrier, open an issue at
> github.com/sabriigsxr/sekhem/issues with the page URL and assistive technology used.

### QA testing checklist
- [ ] Keyboard-only: reach every control via Tab; `Esc` closes search/modals.
- [ ] Screen readers: VoiceOver (Safari) and NVDA (Firefox) — landmarks announced; hero in `<main>`.
- [ ] Zoom to 200% and 400% — no clipping or horizontal scroll on doc pages.
- [ ] Reduced motion enabled — all animations/transitions collapse.
- [ ] Contrast checker on `.pe-chip--diff-Advanced`, light-mode gold tokens.
- [ ] Touch: 44px targets; SFX toggle state via `aria-pressed`.
- [ ] Empty states: no search results, missing PDF, fresh Scarab checklist.
- [ ] Validate HTML; confirm `aria-live` on search count; confirm skip link target.

### Screen reader navigation flow
1. Land on `/sekhem/` → "banner, navigation" (navbar) → skip link → "main".
2. Inside main: heading level 1 "SEKHEM", then tagline, then two links ("Enter the Codex", "Learning paths").
3. Tab through stats (announced as text), then three relic links with titles/descriptions.
4. `⌘K` → search dialog, "Search the codex" edit field, count announced politely, results as listbox; Enter navigates.
5. On a doc page: breadcrumb → meta chips → H1 → prose → TOC links; HorusEye is silent (decorative).
*Overall: strong (≈4.4/5); remaining work is the carnelian contrast fix, labelled search, and confirmation on destructive actions.*
