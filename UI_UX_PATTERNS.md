# SEKHEM — UI/UX Pattern Library

**Generator #3 · UI/UX Pattern Master · Apple Senior UI Designer (web)**

---

## Briefing inputs
- **Primary user:** Technical security practitioner (pentester, red teamer, bug-bounty
  hunter, student) — time-poor, expert, skeptical of friction, often working offline
  or on a laptop in a client environment.
- **Top 3 goals:** (1) find methodology fast, (2) reference payloads/commands offline,
  (3) track assessment progress (Scarab).
- **Pain points:** gated/paid knowledge bases, telemetry and logins, weak search,
  dense unreadable walls of text, broken mobile reading.

---

## 1. HIERARCHY & LAYOUT

**Visual hierarchy strategy.** First: the wordmark/identity and the single primary CTA
("Enter the Codex"). Second: the domain grid — the "hunting grounds" — because domain
selection is the most frequent task. Third: reading content once inside a doc. On doc
pages, first is the H1 + meta bar, then prose, then the right-hand TOC for orientation.

**F-pattern & Z-pattern.** Landing hero uses a Z-pattern (badge → wordmark → tagline →
CTA, with stats bar closing the bottom edge). Doc pages use an F-pattern: sidebar
(left) → heading → body, with the TOC at right for scanning.

**Content density.** Deliberately low on landing (generous 4rem section padding),
medium-high on doc pages (1.85 line-height, 44rem measure) — enough density to feel
like a real codex, enough breathing room to read for 30+ minutes.

**Liquid Glass note.** Not applicable — the stele-and-torchlight identity rejects
translucent glass in favor of obsidian surfaces and engraved hairlines. The navbar's
`backdrop-filter` blur is the sole concession, used only ≥997px.

---

## 2. PLATFORM-SPECIFIC PATTERNS (Web)

- **Navigation:** persistent left doc sidebar (310px) + top utility navbar; horizontal
  card grid for domain landing. No bottom tab bar on web.
- **Modals:** centered, `aria-modal`, focus-trapped, `Esc` to dismiss, scrim `rgba(0,0,0,.7)`.
  Used only for confirmations (e.g. export/reset), never for reading.
- **Gestures:** swipe-to-open sidebar on touch; pull-to-refresh is disabled (static
  content); pinch-zoom enabled; no gesture-only actions (single-pointer alternative required).
- **Context menus/action sheets:** right-click or long-press on a reference row reveals
  Open / Download / Copy link — every item also present as a visible button.

---

## 3. SCREEN DESIGNS (8 key screens)

### 1. Onboarding / Welcome (landing hero)
- **Wireframe:** full-bleed hero, layered pyramid SVG backdrop, badge → H1 "SEKHEM" →
  tagline → subtitle → two CTAs → 4-stat bar → credit line.
- **Components:** `ShieldCheck` badge, H1, two buttons (primary/ghost), stats, links.
- **Interactions:** CTA scroll/navigate; card hover torch glow; reduced-motion collapses rise animations.
- **Empty/error:** n/a. **Loading:** fonts `font-display:swap`; stats render from local manifest.
- **Designer's note:** One primary action only — the second is visually subordinate.

### 2. Home / Dashboard (Codex overview)
- **Wireframe:** breadcrumb + meta bar → running-header ornament → reading column →
  TOC right → three relic cards → domain links.
- **Components:** meta chips, drop cap, TOC, cards, breadcrumbs.
- **Interactions:** TOC active item auto-scrolls within its own pane; progress bar + Eye of Horus mirror depth.
- **States:** empty TOC on short pages; skeleton not needed (static).
- **Designer's note:** Chrome dims so the page speaks — the core HIG "deference" principle.

### 3. Primary task screen (Domain page, e.g. Web Application Pentesting)
- **Wireframe:** domain H1 + doc/PDF counts → methodology sections with `<details>`
  progressive disclosure → inline reference cards.
- **Components:** sections, code blocks, PdfRef, ReferenceList, chips.
- **Interactions:** expand/collapse details; copy code; open PDF in new tab; download.
- **Empty:** "No references match this filter" + browse-all link. **Error:** broken external link → inline notice.
- **Designer's note:** Progressive disclosure keeps a 53-doc domain scannable.

### 4. Detail view (Reference / PDF page)
- **Wireframe:** PdfRef card (icon, title, size, Open/Download, tags) → cross-linked methodology.
- **Components:** PdfRef card, buttons, chips, `aria-label`ed actions.
- **Interactions:** Open (new tab, `noopener`), Download (`download` attr), SHA-256 seal shown as verified chip.
- **States:** loading = none (static); error = missing PDF notice.
- **Designer's note:** No embedded PDF — keeps pages fast and respects data savers.

### 5. Settings / Profile (Preferences)
- **Wireframe:** theme toggle (dark/light), SFX opt-in toggle, reading preferences.
- **Components:** switches with `aria-pressed`, labels, helper text.
- **Interactions:** toggles persist to localStorage; SFX muted by default; no sound autoplay.
- **Designer's note:** Opt-in audio is an ethical default, not an afterthought.

### 6. Search / Filter (local `⌘K`)
- **Wireframe:** trigger in navbar → modal dropdown with input, result count, grouped hits,
  highlighted terms, keyboard hints.
- **Components:** searchbox, listbox, highlight, footer hints.
- **Interactions:** arrow keys navigate, Enter opens, `Esc` closes, `⌘K` toggles; SFX whoosh on open (opt-in).
- **Empty:** "No results for '…'" + clear button + browse domains.
- **Designer's note:** Fully local — search runs in-browser, no query leaves the device.

### 7. Checkout / Action completion (Scarab export)
- **Wireframe:** assessment checklist → progress ring → notes field → Export MD / Export JSON buttons → success toast.
- **Components:** checkboxes, progress, textarea, buttons, toast.
- **Interactions:** tick items (SFX tick opt-in), autosave to localStorage, export downloads file.
- **Empty:** fresh checklist with all items unticked. **Success:** "Assessment exported" toast.
- **Designer's note:** Local-first means "completion" is a file on the user's device, not a server.

### 8. Error / Empty state
- **Wireframe:** centered icon (scarab/faience), plain-language headline, one recovery action.
- **Components:** icon, H2, body, button/link.
- **Copy example:** "Nothing sealed here yet." / "No references matched that search." / "Try another domain or clear your filters."
- **Designer's note:** Never a bare 404 — always offer a way back into the codex.

---

## 4. COMPONENT SPECIFICATIONS

- **Button hierarchy:** Primary (gold gradient, one per view) → Secondary/ghost (gold outline)
  → Tertiary/outline (neutral) → Destructive (carnelian + label). Full specs in DESIGN_SYSTEM.md §2.
- **Form patterns:** visible `<label>`, helper text via `aria-describedby`, inline errors with
  icon + text, success confirmed by toast; never color-only validation.
- **Card layouts:** icon → eyebrow → title → description → meta row; one link target per card;
  sealed cards use `aria-disabled` rather than fake buttons.
- **Data visualization:** stats as mono numerals; progress via bar + ring; semantic palette;
  all charts paired with a textual/table equivalent.

---

## 5. ACCESSIBILITY COMPLIANCE

- **Dynamic Type / 200% zoom:** fluid rem units; layouts reflow at 320px equivalent; no truncation of labels.
- **VoiceOver/screen reader labels:** every icon button has `aria-label`; nav landmarks named;
  active items use `aria-current`; progress bar is `aria-hidden` with textual equivalent elsewhere.
- **Contrast:** body ≥4.5:1, UI ≥3:1, target AAA 7:1 — verified ratios in DESIGN_SYSTEM.md §1.1.
  Carnelian is restricted to large text/borders in dark mode.
- **Reduce Motion:** all animation and `scroll-behavior` collapse under `prefers-reduced-motion`.
- **Focus indicators:** global 2px gold `:focus-visible` outline, 2px offset, never removed.
- **Pointer:** all gestures have single-pointer/button alternatives.

---

## 6. MICRO-INTERACTIONS

- **Transitions:** UI 200ms, UI-high 240ms, micro 120ms, easing `cubic-bezier(.16,1,.3,1)`;
  card lift 0.3s; bar shine 2.4s linear.
- **Haptic mapping:** optional (not available on web) — tick on checklist completion,
  whoosh on search open; mirrored by the opt-in SFX system.
- **Sound:** synthesized stone tick / sand whoosh, **muted by default**, persisted per device,
  never autoplaying — respects user control and public-space use.

---

## 7. RESPONSIVE BEHAVIOR

- **Mobile (375px):** 4-col grid, single-column cards, collapsible sidebar under 997px,
  stat bar 2×2, touch targets ≥44px.
- **Tablet (768px):** 8-col grid, 2-up cards, TOC hidden on narrow.
- **Desktop (1440px):** 12-col, 1320px container, sidebar + reading column + TOC three-pane.
- **Orientation:** fluid; no orientation lock. **Foldables:** content stays within `env(safe-area-inset-*)`;
  no spans across hinges.

---

### Designer's Notes (summary)
The through-line is **deference**: motion and ornament are earned by intent (hover,
focus, scroll), not sprayed everywhere. The site behaves like a field manual — quiet,
fast, and entirely under the reader's control.
