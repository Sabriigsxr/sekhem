# SEKHEM Design System

**Version 1.0 · The Pharaoh's Pentest Codex · Design System Architect deliverable**

> A comprehensive, HIG-level design system for SEKHEM — a dark-first, reading-first
> static pentest codex. This document is the single source of truth for visual
> language, component behavior, and developer handoff tokens.

---

## Design principles (Apple HIG, adapted for a codex)

1. **Clarity** — Content is the artifact. Every surface, ornament, and motion exists
   to make dense technical reference material faster to read, never to decorate for
   its own sake. Text remains legible at every size; hierarchy is unmistakable.
2. **Deference** — The frame recedes so the page speaks. Navigation, chrome, and
   glow are quiet by default and intensify only on intent (hover, focus, scroll).
   The reader's task always outranks the interface's personality.
3. **Depth** — Information is layered: landing → domain → page → reference, with
   progressive disclosure (`<details>`, TOC, collapsible sidebar). Motion and light
   convey hierarchy and state, never mere spectacle.

---

## 1. FOUNDATIONS

### 1.1 Color system

#### Primary palette (dark theme — default)

| Token | Name | Hex | RGB | HSL | Contrast on `#0b0908` | Rating |
|---|---|---|---|---|---|---|
| `--sk-gold` | Antique Gold | `#c9a227` | 201,162,39 | 46°, 68%, 47% | 8.21:1 | AAA |
| `--sk-gold-bright` | Torchlight | `#e8c766` | 232,199,102 | 44°, 73%, 65% | 12.10:1 | AAA |
| `--sk-faience` | Faience | `#1fb6a6` | 31,182,166 | 175°, 71%, 42% | 7.85:1 | AAA |
| `--sk-scarab` | Scarab Green | `#3ddc97` | 61,220,151 | 154°, 69%, 55% | 11.24:1 | AAA |
| `--sk-muted` | Sandstone | `#a89f8a` | 168,159,138 | 42°, 15%, 60% | 7.56:1 | AAA |
| `--sk-blood` | Carnelian | `#a04444` | 160,68,68 | 0°, 40%, 45% | 3.22:1 | AA Large only |

Additional surfaces: `--sk-bg #0b0908`, `--sk-surface #14100d`, `--sk-card #171411`,
`--sk-border #2a241d`, `--sk-text #f3ecdc` (16.88:1 AAA), `--sk-ink #1a1408`.

#### Primary palette (light theme — papyrus)

| Token | Name | Hex | Contrast on `#f3ecdc` | Rating |
|---|---|---|---|---|
| `--sk-gold` | Antique Gold | `#8a6413` | 4.56:1 | AA |
| `--sk-gold-bright` | Gilded | `#caa53f` | 1.99:1 | Decorative only |
| `--sk-faience` | Faience | `#0f766e` | 4.65:1 | AA |
| `--sk-scarab` | Scarab Green | `#15803d` | 4.26:1 | AA Large |
| `--sk-muted` | Umber | `#6f6244` | 5.09:1 | AA |
| `--sk-blood` | Carnelian | `#8c2f2f` | 6.96:1 | AA |

Additional surfaces: `--sk-bg #f3ecdc`, `--sk-surface #efe6d2`, `--sk-card #faf4e6`,
`--sk-border #d8cbae`, `--sk-text #0b0908` (16.88:1 AAA).

#### Semantic colors

| Semantic | Dark | On bg | Light | On bg | Meaning |
|---|---|---|---|---|---|
| Success | `#3ddc97` | 11.24:1 AAA | `#15803d` | 4.26:1 AA-L | Completed, verified, sealed |
| Warning | `#e8c766` | 12.10:1 AAA | `#8a6413` | 4.56:1 AA | Attention, in-progress |
| Error | `#a04444` | 3.22:1 AA-L | `#8c2f2f` | 6.96:1 AA | Failure, invalid, danger |
| Info | `#1fb6a6` | 7.85:1 AAA | `#0f766e` | 4.65:1 AA | Neutral information, reference |

> **Rule:** Carnelian (`--sk-blood`) fails AA for body text in dark mode (3.22:1).
> Use it only for large text (≥18.66px bold / ≥24px regular), borders, icons, or
> pair it with the 12px torchlight text label. Never use it for small body copy.

#### Color usage rules

- **Gold** = navigation, links, primary actions, active state, brand marks. It is
  the only accent allowed on interactive controls.
- **Faience** = reference/PDF metadata, badges, "verified/sealed" secondary meaning.
- **Scarab** = completion and difficulty "Beginner"; progress that is finished.
- **Carnelian** = errors, "Advanced" difficulty, destructive or irreversible states.
- **Muted/Sandstone** = secondary text, metadata, captions — never primary body text.
- **Never** use gold text on gold surfaces; never use `--sk-gold-bright` as body text
  in light mode (1.99:1).

### 1.2 Typography

Four families, each with a single job:

| Family | Role | Weights used |
|---|---|---|
| **Cinzel Decorative** | Display / wordmark | 700, 900 |
| **Cinzel** | Headings, eyebrow, buttons | 500, 600, 700 |
| **Spectral** | Body, UI text | 400, 500, 600 (+ italics) |
| **JetBrains Mono** | Code, metadata, numbers, chips | 400, 500, 600 |

**Pairing strategy:** Display/headings in Cinzel (engraved, monumental) + body in
Spectral (serif, papyrus-readable) + data in JetBrains Mono (precise, technical).
Never set body text in Cinzel; never set long prose in JetBrains Mono.

**Type scale (desktop ≥997px / tablet 768px / mobile 375px):**

| Role | Font | Desktop | Tablet | Mobile | Line height | Tracking |
|---|---|---|---|---|---|---|
| Display | Cinzel Dec. 900 | 48/56 | 40/48 | 34/40 | 1.0–1.1 | 0.08em |
| H1 | Cinzel 700 | 40/48 | 34/42 | 30/36 | 1.15 | 0.01em |
| H2 | Cinzel 700 | 28/36 | 25/32 | 22/28 | 1.25 | 0.005em |
| H3 | Cinzel 600 | 18/24 | 17/23 | 16/22 | 1.35 | 0.015em |
| Body | Spectral 400 | 17/31 | 16.5/29 | 16/28 | 1.72–1.85 | 0 |
| Callout | Spectral 500 | 15/24 | 15/24 | 14.5/23 | 1.6 | 0 |
| Subheadline | Spectral 600 | 14/22 | 14/22 | 13.5/21 | 1.6 | 0.01em |
| Footnote | Spectral 400 | 13/20 | 13/20 | 12.5/19 | 1.6 | 0.02em |
| Caption | JetBrains Mono 500 | 12/18 | 12/18 | 11.5/17 | 1.5 | 0.06em |

**Accessibility minimums:** body ≥16px; captions ≥12px; metadata ≥11.5px only when
non-essential and paired with an accessible label. All fonts ship with
`font-display: swap`. Line length capped at 44rem in reading views (≈66 characters).

### 1.3 Layout grid

| Breakpoint | Width | Columns | Gutter | Margin | Notes |
|---|---|---|---|---|---|
| Mobile | 375px | 4 | 16px | 16px | Single-column stacks; safe-area insets |
| Tablet | 768px | 8 | 20px | 24px | 2-up cards; sidebar collapses |
| Desktop | 1440px | 12 | 24px | 32px | Max content 1320px; 310px doc sidebar |

- **Container:** `max-width: 1320px`, centered, horizontal padding per breakpoint above.
- **Doc reading column:** `max-width: 44rem`, centered (`article` 56rem for non-doc pages).
- **Safe areas:** respect `env(safe-area-inset-*)` on notched devices; ≥16px touch
  targets from viewport edges.
- **Sidebar:** 310px fixed on desktop; hideable/collapsible below 997px.

### 1.4 Spacing system (8px base)

| Token | Value | Use |
|---|---|---|
| `space-1` | 4px | Icon-to-label gaps, micro-adjustments |
| `space-2` | 8px | Tight inline gaps, chip padding |
| `space-3` | 12px | Button internals, list row gaps |
| `space-4` | 16px | Default component padding, card gaps |
| `space-6` | 24px | Grid gap, section sub-elements |
| `space-8` | 32px | Card padding, block separation |
| `space-12` | 48px | Between sub-sections |
| `space-16` | 64px | Section vertical rhythm |
| `space-24` | 96px | Major landing sections |
| `space-32` | 128px | Hero-to-content breathing room |

**Rule:** spacing always follows the scale; no arbitrary values. Use 4px only for
optical alignment inside components.

---

## 2. COMPONENTS (35 components)

Each entry: **anatomy · states · usage · accessibility · spec**.

### Navigation

**1. Header / Navbar**
- Anatomy: brand (logo + wordmark), left nav items, right utilities (HorusEye, SFX toggle, GitHub), mobile toggle.
- States: default; scrolled (gold hairline + shadow); mobile expanded.
- Use: global navigation only. Don't: duplicate actions in page headers.
- A11y: `<nav aria-label="Primary">`; toggle has `aria-expanded`/`aria-controls`; brand link is first focusable.
- Spec: height 4.1rem; sticky; translucent blur ≥997px; logo 30px; link padding 0.5rem.

**2. Tab bar**
- Anatomy: tab list, tab items, active indicator, optional count badge.
- States: default, hover, active (inset gold underline), disabled, keyboard focus.
- Use: switching views within one context. Don't: use for navigation between pages.
- A11y: `role="tablist"`, `role="tab"`, `aria-selected`, arrow-key navigation.
- Spec: 44px min height; active border-bottom 2px `--sk-gold-bright`.

**3. Sidebar (doc tree)**
- Anatomy: category groups, collapsible toggles, links, active marker.
- States: collapsed, expanded, active, hover.
- Use: docs navigation. Don't: nest deeper than 3 levels.
- A11y: `<nav aria-label="Documentation">`; `aria-expanded` on toggles; active link `aria-current="page"`.
- Spec: width 310px; font 0.84rem; active background `--sk-menu-active`.

**4. Breadcrumbs**
- Anatomy: link list, separators, current page.
- States: link hover, current (non-interactive).
- Use: orientation in docs. Don't: use on landing pages.
- A11y: `<nav aria-label="Breadcrumb">`; `aria-current="page"` on last item.
- Spec: font 0.78rem, `--sk-muted`; separator `›`.

### Input

**5. Button — Primary**
- Anatomy: label, leading icon, container.
- States: default, hover (lift), active, focus-visible, disabled, loading.
- Use: one primary action per view. Don't: two primaries adjacent.
- A11y: `<button>` or `<a>` with role; `aria-busy` when loading; 44px target min.
- Spec: padding 0.55rem 1.05rem; radius 8px; gold gradient; ink `#1a1408` (7.57:1 AAA).

**6. Button — Ghost**
- Same anatomy; transparent background, gold border/text. Use for secondary actions.
- Spec: border 1px `--sk-gold`; hover surface tint + glow; focus-visible outline 2px.

**7. Button — Outline**
- Border-only, neutral text. Use for tertiary/neutral actions (e.g. "Download").
- Spec: border `--sk-border`; hover border gold.

**8. Button — Icon**
- Anatomy: icon only, optional tooltip.
- Use: compact toolbars (SFX, back-to-top). Don't: without `aria-label`.
- A11y: `aria-label` required; `aria-pressed` for toggles.
- Spec: 40–46px square; radius 10–12px.

**9. Button — Destructive**
- Carnelian border/text; used for reset/clear in local-first tools.
- A11y: confirm irreversible actions; pair icon with text label.

**10. Button — Loading**
- Spinner replaces leading icon; label retained; `aria-busy="true"`; width stable.

**11. Text field**
- Anatomy: label, input, placeholder, helper text, error text, icon slot.
- States: default, focus (gold ring), filled, disabled, error, read-only.
- Use: search/filter/notes. Don't: placeholder as the only label.
- A11y: `<label for>`; `aria-describedby` for helper/error; `aria-invalid` on error.
- Spec: height 44px; radius 12px; border `--sk-border`; focus ring `0 0 0 1px gold`.

**12. Dropdown / Select**
- Anatomy: trigger, menu, options, selected marker.
- States: closed, open, hover, selected, disabled.
- A11y: `aria-haspopup="listbox"`; `aria-expanded`; keyboard type-ahead.
- Spec: menu radius 12px; max-height `min(70vh,32rem)`; `overscroll-behavior: contain`.

**13. Toggle (switch)**
- Anatomy: track, thumb, label.
- Use: immediate on/off (sound, theme). Don't: for submit-style choices.
- A11y: `<button role="switch" aria-checked>` or checkbox; visible label.
- Spec: track 44×24px; thumb 20px; gold when on.

**14. Checkbox**
- Use: multi-select in checklists. A11y: native `<input type="checkbox">` + label;
  never remove focus ring. Spec: 20px box, 4px radius.

**15. Radio button**
- Use: single choice from 3–5 options. A11y: native input + `<fieldset><legend>`.
- Spec: 20px circle; gold fill when selected.

**16. Slider**
- Use: bounded numeric choice (e.g. font size). A11y: native range, `aria-valuetext`.
- Spec: track 4px; thumb 20px; ≥44px hit area.

**17. Search field (local search)**
- Anatomy: search icon, input, result count, shortcut hint (`⌘K`).
- States: default, focus-within (gold ring), results open, empty.
- A11y: `role="searchbox"`; results in `role="listbox"`; announce count via `aria-live`.
- Spec: max-width 32rem; radius 12px; local search dropdown radius 14px.

### Feedback

**18. Alert**
- Anatomy: icon, title, body, optional action, dismiss.
- Variants: info/success/warning/error mapped to semantic colors.
- A11y: `role="alert"` for urgent, `role="status"` for passive; don't auto-dismiss errors.
- Spec: padding 16px; radius 12px; 1px semantic border; left icon 20px.

**19. Toast**
- Use: transient confirmation ("Notes exported"). Don't: for errors requiring action.
- A11y: `role="status"`; `aria-live="polite"`; pause on hover.
- Spec: bottom-center or bottom-right; 8px radius; 4s auto-dismiss.

**20. Modal / Dialog**
- Anatomy: overlay, panel, header, body, actions, close.
- A11y: `role="dialog" aria-modal="true"`; focus trap; `Esc` closes; return focus.
- Spec: panel max-width 32rem; radius 16px; scrim `rgba(0,0,0,0.7)`.

**21. Progress indicator (reading bar)**
- Use: reading depth. Anatomy: fixed top bar, gradient fill.
- States: 0–100%, hidden at 0. A11y: `aria-hidden` (decorative mirror); provide
  textual progress elsewhere if it conveys task state.
- Spec: height 3px; `z-index: 9999`; gradient `--sk-progress`.

**22. Skeleton screen**
- Use: loading placeholder for cards/lists. A11y: `aria-hidden`; announce loading in region.
- Spec: shimmer gradient; matches final component geometry; no layout shift.

**23. Tooltip**
- Use: icon-button explanation. A11y: `aria-describedby` on hover/focus; dismiss with `Esc`.
- Spec: 12px caption text; 8px padding; radius 6px; no interactive content.

### Data display

**24. Card (stele)**
- Anatomy: icon, eyebrow, title, description, meta row, engraved corners.
- States: default, hover (torch follows cursor + lift), focus-within, disabled (sealed).
- Use: category/relic/feature groupings. Don't: nest cards.
- A11y: link cards are single `<a>`; whole card is one focus target; `aria-disabled` for sealed.
- Spec: padding 1.35rem; radius `4px 4px 16px 16px`; border 1px; inner 1px gold frame.

**25. Table**
- Use: structured comparison data. Don't: for layout.
- A11y: `<caption>`, `<th scope="col/row">`; scroll container is focusable (`tabindex="0"`).
- Spec: full width; radius 12px; header `--sk-surface`; zebra rows; `overflow-x:auto`.

**26. List**
- Use: reference rows. Anatomy: icon, title, sub, actions.
- A11y: semantic `<ul>/<li>`; action links have `aria-label` including item title.
- Spec: row padding 0.7rem 0.9rem; radius 10px; hover translateX(4px).

**27. Stats**
- Anatomy: number, label. Use: landing-page counts.
- A11y: number in mono; label adjacent; not a sole source of meaning.
- Spec: number 1.75rem bold mono; label 0.78rem muted.

**28. Chart**
- Use: progress/score visualization. A11y: `<figure>` with `<figcaption>` and a data table.
- Spec: use semantic palette; never encode meaning by color alone.

**29. Chip / Tag**
- Use: metadata, difficulty, tags. A11y: text must accompany color.
- Spec: radius 999px; padding 0.25rem 0.62rem; font 0.76rem mono; 1px border.

**30. Code block**
- Anatomy: title bar, copy action, highlighted lines, scroll area.
- A11y: copy button `aria-label`; highlighted lines not color-only; `tabindex="0"` for scroll.
- Spec: radius 12px; 1px border; inset highlight; mono 0.85em; horizontal scroll.

**31. Meta bar**
- Use: per-page reading time, difficulty, platform chips. A11y: `<ul>` of labeled chips.
- Spec: flex-wrap; border-bottom; gap 0.5rem.

### Media

**32. Image container / Avatar**
- Use: architect and contributor portraits. A11y: `alt` with name; decorative images `alt=""`.
- Spec: avatar 96px (maintainer), 56px (contributors); circle; 2–3px gold border; lazy load.

**33. Video player**
- Use: embedded walkthroughs. A11y: captions required; keyboard controls; no autoplay audio.
- Spec: 16:9 container; radius 12px; native controls preferred.

**34. Figure / Quote**
- Anatomy: image or quote, caption. A11y: `<figure><figcaption>`.
- Spec: centered; caption 0.78rem muted.

**35. Back-to-top**
- Use: long pages. A11y: `<button aria-label="Back to top">`; appears after 600px scroll.
- Spec: 46px square; fixed bottom-right; respects reduced motion (instant scroll).

---

## 3. PATTERNS

### Page templates
- **Landing** — Hero (wordmark, tagline, CTAs, stats) → Relics → Categories grid → Features → Paths → Architect → Footer.
- **Docs reader** — Breadcrumb → meta bar → narrow reading column (44rem) with drop cap, running header, TOC right, sidebar left → progress + Horus + back-to-top.
- **Reference library** — Hero with search → category groups → reference rows (Open/Download).
- **Checklist (Scarab)** — local-first assessment with checkboxes, notes, progress, MD/JSON export.
- **Vault (Tomb)** — searchable PDF grid with SHA-256 seals and open/download actions.

### User flows
- **Onboarding** — Landing → "Enter the Codex" → overview → pick learning path or domain.
- **Search** — `⌘K` → fuzzy results → in-page highlight → scroll to match.
- **Reference lookup** — Domain page → reference list → Open PDF (new tab) or Download.
- **Assessment** — Scarab → select WebApp/API → tick items → add notes → export MD/JSON.
- **Empty state** — "No references match" → clear search + browse all domains link.

### Feedback patterns
- **Success** — Scarab green + check icon + toast; sealed PDF shows SHA-256 verified chip.
- **Error** — Carnelian + text label; never color alone; keep actionable message.
- **Loading** — skeleton matching final geometry; reading bar animates.
- **Empty** — friendly explanation + next action; retain search query for context.

---

## 4. TOKENS (developer handoff)

```json
{
  "sk": {
    "color": {
      "dark": {
        "bg": "#0b0908", "surface": "#14100d", "card": "#171411",
        "border": "#2a241d", "text": "#f3ecdc", "muted": "#a89f8a", "ink": "#1a1408",
        "gold": "#c9a227", "goldBright": "#e8c766", "faience": "#1fb6a6",
        "scarab": "#3ddc97", "blood": "#a04444"
      },
      "light": {
        "bg": "#f3ecdc", "surface": "#efe6d2", "card": "#faf4e6",
        "border": "#d8cbae", "text": "#0b0908", "muted": "#6f6244", "ink": "#0b0908",
        "gold": "#8a6413", "goldBright": "#caa53f", "faience": "#0f766e",
        "scarab": "#15803d", "blood": "#8c2f2f"
      },
      "semantic": {
        "success": {"dark": "#3ddc97", "light": "#15803d"},
        "warning": {"dark": "#e8c766", "light": "#8a6413"},
        "error": {"dark": "#a04444", "light": "#8c2f2f"},
        "info": {"dark": "#1fb6a6", "light": "#0f766e"}
      }
    },
    "font": {
      "display": "Cinzel Decorative, Cinzel, serif",
      "heading": "Cinzel, Spectral, serif",
      "body": "Spectral, Georgia, serif",
      "mono": "JetBrains Mono, ui-monospace, monospace",
      "weight": {"regular": 400, "medium": 500, "semibold": 600, "bold": 700, "black": 900}
    },
    "space": {"1":"4px","2":"8px","3":"12px","4":"16px","6":"24px","8":"32px","12":"48px","16":"64px","24":"96px","32":"128px"},
    "radius": {"sm":"6px","md":"8px","lg":"12px","xl":"16px","pill":"999px","stele":"4px 4px 16px 16px"},
    "shadow": {
      "card": "inset 0 1px 0 rgba(255,255,255,.03)",
      "hover": "0 18px 44px rgba(0,0,0,.45), 0 0 0 1px rgba(201,162,39,.4), 0 0 34px rgba(201,162,39,.14)",
      "goldGlow": "0 0 18px rgba(201,162,39,.35)"
    },
    "breakpoint": {"mobile":"375px","tablet":"768px","desktop":"997px","wide":"1440px"},
    "grid": {"columns":12,"gutter":"24px","margin":"32px","maxWidth":"1320px","readingWidth":"44rem","sidebarWidth":"310px"},
    "motion": {
      "ease": "cubic-bezier(.16,1,.3,1)",
      "durMicro":"120ms","durUi":"200ms","durUiHi":"240ms",
      "reduce": "@media (prefers-reduced-motion: reduce)"
    }
  }
}
```

---

## 5. DOCUMENTATION

### 5.1 Three core principles with examples
1. **Content first** — Example: the reading column is 44rem with 1.85 line-height and a drop cap; all chrome dims so the page speaks.
2. **Gold means action** — Example: only links, primary buttons, active nav, and focus rings use gold; body text never does.
3. **Motion is meaning** — Example: cards brighten on hover/focus (intent), the navbar hairline appears on scroll (progress), and every animation collapses under reduced motion.

### 5.2 Do's and Don'ts (10)
1. **Do** use Spectral for body. **Don't** set prose in Cinzel.
2. **Do** keep gold for interactive elements. **Don't** use gold-bright as light-mode body text (1.99:1).
3. **Do** pair Carnelian with a text label. **Don't** use it for small dark-mode body copy (3.22:1).
4. **Do** mark the active nav item with `aria-current`. **Don't** rely on color alone for state.
5. **Do** give icon buttons `aria-label`. **Don't** ship an unnamed icon control.
6. **Do** keep focus-visible rings (2px gold, 2px offset). **Don't** remove outlines.
7. **Do** use native inputs. **Don't** build custom controls without keyboard support.
8. **Do** respect `prefers-reduced-motion`. **Don't** autoplay sound (SFX is opt-in).
9. **Do** cap line length at ~66 characters. **Don't** stretch text across 1320px.
10. **Do** use the 8px scale. **Don't** introduce arbitrary spacing values.

### 5.3 Implementation guide for developers
- Map `sk.*` tokens to CSS custom properties in `src/css/custom.css`; theme dark via
  `[data-theme='dark']`, light via `:root`.
- Use component classes (`pe-card`, `pe-btn`, `pe-chip`, `pe-pdf`) as the shared
  primitives; page-specific geometry lives in CSS Modules.
- All interactive elements must pass the focus-visible rule globally (already defined).
- Every new component must declare anatomy, all six states, and ARIA contract before ship.
- Validate contrast with the ratios in §1.1; AA (4.5:1) is the floor for body text,
  AAA (7:1) the target for the SEKHEM theme.
- Re-run `npm run typecheck` and `npm run build` after token or component changes.
