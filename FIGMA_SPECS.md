# SEKHEM — Figma Auto-Layout Technical Specs

**Generator #5 · Figma Auto-Layout Expert · Design Ops Specialist**
*Audience: a junior designer who can build this in Figma perfectly from this document.*

---

## 1. FRAME STRUCTURE

### Page organization
```
📄 00 · Foundations      → color/typography/effect/grid styles, token swatches
📄 01 · Web — Landing    → desktop 1440, tablet 768, mobile 375 frames
📄 02 · Web — Docs       → desktop/tablet/mobile reader frames
📄 03 · Web — App        → search modal, vault, Scarab, references
📄 04 · Components       → masters + variants (all 35)
📄 05 · Patterns         → templates & flow maps
📄 99 · Archive / Notes  → decisions, exports
```
**Naming convention:** `[Screen] / [State] / [Breakpoint]` — e.g. `Landing / Default / Desktop`, `Button / Primary Hover / 1440`.
**Layer order:** background → decorative SVG → content containers → text → icons → overlays. Lock background layers.

### Grid system setup
- Desktop 1440: 12 columns, 24px gutter, 32px margin, max content 1320px.
- Tablet 768: 8 columns, 20px gutter, 24px margin.
- Mobile 375: 4 columns, 16px gutter, 16px margin.
- Create as **Layout Grids** and save as **Grid styles**: `Grid/Desktop-12`, `Grid/Tablet-8`, `Grid/Mobile-4`.
- Reading column 44rem (704px) centered on doc frames — save as `Grid/Reading-704`.

### Responsive behavior (constraints)
- Navbar: horizontal `Left & Right` (fill width), vertical `Top` (pin).
- Sidebar: `Left` + `Top & Bottom` (fixed width 310); hidden below 997 via variant.
- Cards: `Scale` with grid; inner padding fixed; icon `Top-left`.
- Reading column: `Center` horizontally, `Top & Bottom` vertically.

---

## 2. AUTO-LAYOUT SPECIFICATIONS

| Component | Direction | Padding (T/R/B/L) | Item spacing | Distribution | Alignment | Resizing |
|---|---|---|---|---|---|---|
| Button | Horizontal | 9/17/9/17 | 6px | Packed | Center | Hug contents |
| Card (stele) | Vertical | 22/22/22/22 | 10px | Packed | Top-left | Fill container width, Hug height |
| Card meta row | Horizontal | 0 | 12px | Space-between | Center | Fill width |
| Navbar | Horizontal | 8/32/8/32 | 16px | Space-between | Center | Fill width, Hug height |
| Sidebar group | Vertical | 16/10/16/10 | 4px | Packed | Top-left | Fill width |
| Reference row | Horizontal | 11/14/11/14 | 14px | Packed | Center | Fill width |
| Stat tile | Vertical | 8/8/8/8 | 4px | Packed | Center | Hug |
| Chip | Horizontal | 4/10/4/10 | 6px | Packed | Center | Hug |
| Search dropdown | Vertical | 10/10/10/10 | 8px | Packed | Top-left | Fill width |
| Toast | Horizontal | 10/14/10/14 | 8px | Packed | Center | Hug |
| Modal panel | Vertical | 24/24/24/24 | 16px | Packed | Top-left | Fixed 512px |

*All values in px at 1× from the 8px token scale (4/8/12/16/24/32...).*

---

## 3. COMPONENT ARCHITECTURE

### Master: `Button`
- **Variants:** `Type` (Primary, Ghost, Outline, Destructive, Icon, Loading) × `Size` (Small, Medium, Large) × `State` (Default, Hover, Active, Disabled, Focus).
- **Properties:** `Label` (text), `Icon left` (boolean + instance swap), `Icon right` (boolean + instance swap), `Size` (variant), `Type` (variant), `State` (variant).
- **Combination matrix:** 6 × 3 × 5 = 90 variants (prune impossible pairs, e.g. Loading+Disabled).

### Master: `Card / Stele`
- **Variants:** `Kind` (Relic, Category, Feature, Path) × `State` (Default, Hover, Focus, Sealed).
- **Properties:** `Title`, `Description`, `Meta` (text), `Icon` (instance swap), `Status` (text), `Live` (boolean).

### Master: `Chip`
- **Variants:** `Tone` (Neutral, Beginner, Intermediate, Advanced, Success, Info) × `Size` (Sm, Md).
- **Properties:** `Label` (text), `Icon` (boolean + instance swap).

### Other masters
`Navbar`, `Sidebar`, `Breadcrumbs`, `MetaBar`, `SearchField`, `PdfRef`, `ReferenceRow`, `Toggle`, `Checkbox`, `Progress`, `Alert`, `Toast`, `Modal`, `Avatar`, `Skeleton`, `BackToTop`, `CodeBlock`, `Tooltip`.

---

## 4. DESIGN TOKEN INTEGRATION

### Color styles (exact hex)
- `Color/Gold` `#c9a227` · `Color/GoldBright` `#e8c766` · `Color/Faience` `#1fb6a6`
- `Color/Scarab` `#3ddc97` · `Color/Blood` `#a04444` (large text/borders only)
- `Color/Obsidian` `#0b0908` · `Color/Surface` `#14100d` · `Color/Card` `#171411`
- `Color/Border` `#2a241d` · `Color/Text` `#f3ecdc` · `Color/Muted` `#a89f8a`
- Gradient style `Gradient/Gold` 135° `#caa53f → #8a6413`
- Light-mode set: `Color/Papyrus #f3ecdc`, `Color/Gold-L #8a6413`, `Color/Faience-L #0f766e`, etc. (mirrored in a `Light/` prefix).

### Text styles
| Style | Font | Weight | Size | Line height | Tracking |
|---|---|---|---|---|---|
| `Type/Display` | Cinzel Decorative | 900 | 48 | 56 | 0.08em |
| `Type/H1` | Cinzel | 700 | 40 | 48 | 0.01em |
| `Type/H2` | Cinzel | 700 | 28 | 36 | 0.005em |
| `Type/H3` | Cinzel | 600 | 18 | 24 | 0.015em |
| `Type/Body` | Spectral | 400 | 17 | 31 | 0 |
| `Type/Caption` | JetBrains Mono | 500 | 12 | 18 | 0.06em |

### Effect styles
- `Effect/GoldGlow` drop shadow `0 0 18px rgba(201,162,39,.35)`
- `Effect/CardHover` `0 18px 44px rgba(0,0,0,.45)`
- `Effect/Inset` inner shadow `0 1px 0 rgba(255,255,255,.03)`
- `Effect/Blur` background blur 16px, saturation 150% (navbar only)

### Grid styles — `Grid/Desktop-12`, `Grid/Tablet-8`, `Grid/Mobile-4`, `Grid/Reading-704`.

---

## 5. PROTOTYPE CONNECTIONS

**Interaction map**
```
Landing ──Enter the Codex──▶ Overview ──domain link──▶ Domain page
   │                            │                         │
   └──⌘K Search──▶ Search modal └─▶ Reference list ─▶ PDF (new tab)
Landing ──The Scarab──▶ Checklist ──export──▶ Download (MD/JSON)
Landing ──Learning paths──▶ Paths ──▶ Domain
```
- **Triggers:** On click (nav, cards, CTAs), On hover (card torch, tooltips), On drag (sidebar on touch), On key press (`⌘K` → overlay).
- **Animations:** Smart Animate 300ms `ease-out` for card→page; Dissolve 200ms for overlays; Move 240ms for TOC highlight; easing `cubic-bezier(.16,1,.3,1)`.
- **Delay/duration:** stagger 80ms per card; toast 4s auto-dismiss; reduced-motion = instant (Figma: duplicate frames with no animation).

---

## 6. DEVELOPER HANDOFF PREPARATION

- **Inspect panel:** group by component; annotate token names in the `Description` field (e.g. `padding: var(--sk-space-4)`).
- **CSS for key elements:** card `{ background: var(--sk-card); border: 1px solid var(--sk-border); border-radius: 4px 4px 16px 16px; padding: 22px; }`, button primary `{ background: var(--sk-gold-grad); color: var(--sk-ink); border-radius: 8px; }`.
- **Exports:** icons/logo as SVG at 1×; raster art at 2× and 3×; wallpapers as PDF/PNG; fonts as WOFF2.
- **Naming:** `sk-[component]-[variant]-[state]@[scale].svg` — e.g. `sk-button-primary-hover@2x.svg`.

---

## 7. ACCESSIBILITY ANNOTATIONS

- **Focus order:** numbered annotations on each frame — navbar → skip link → main → content → TOC → footer.
- **ARIA labels:** attach as text annotations to icon buttons: `aria-label="GitHub"`, `aria-pressed` on toggles, `aria-current="page"` on active nav.
- **Contrast notes:** body ≥4.5:1 (AAA 7:1 target); flag Carnelian `#a04444` as large-text/borders only (3.22:1 on obsidian); focus ring 2px gold at 3:1+.
- **Touch targets:** annotate 44×44px minimum on mobile frames.
- **Reduced motion:** companion static frames for every animated prototype flow.

---

*Every spec above maps 1:1 to the CSS tokens in `DESIGN_SYSTEM.md` and `src/css/tokens.css` — the Figma and code layers stay in sync.*
