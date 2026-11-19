# SEKHEM — Brand Identity System

**Generator #2 · Brand Identity Creator · Pentagram Creative Director**
*Applied to the confirmed SEKHEM briefing (v1.0)*

---

## 1. BRAND STRATEGY DOCUMENT

### Brand story (challenge → transformation → resolution)

**Challenge.** Offensive-security knowledge is fragmented. Methodologies live in
gated wikis, scattered PDFs, and paid courses. Practitioners burn hours reconstructing
what should be instantly available — and the tools that promise speed add logins,
telemetry, and noise.

**Transformation.** SEKHEM treats knowledge as an excavated artifact. It gathers
124 methodology pages and 104 vetted PDF references across 24 domains into one
static, browser-searchable codex. The Egyptian stele metaphor turns a dry reference
library into a world to explore — every domain a hunting ground, every PDF a sealed
relic. No account, no tracking, no friction.

**Resolution.** The practitioner walks in blind and leaves named: *every door has a
name*. SEKHEM converts scattered uncertainty into focused, offline-capable action —
and gives the community an open, MIT-licensed foundation to build on.

### Brand personality (archetypes)

| Archetype | Weight | Human trait | Expression |
|---|---|---|---|
| **The Sage** | 45% | Expert, truth-seeker | Rigorous methodology, SHA-256 sealed references, honest attribution |
| **The Explorer** | 30% | Adventurous, curious | "Hunting grounds," "relics," "tomb," "scarab" navigation |
| **The Magician** | 15% | Transformative | Turns scattered knowledge into a single Searchable codex |
| **The Everyman** | 10% | Accessible, grounded | Free, open, no gatekeeping, plain-language guidance |

### Voice and tone matrix

| Dimension | Position | Guideline |
|---|---|---|
| Funny ↔ Serious | **Serious** (7/10) | Wit is dry and sparing; never undercut technical accuracy |
| Casual ↔ Formal | **Casual-formal** (6/10) | Direct, second-person, contractions okay; no corporate stiffness |
| Irreverent ↔ Respectful | **Respectful** (8/10) | Bold theme, but reverent toward the material and its authors |
| Enthusiastic ↔ Matter-of-fact | **Matter-of-fact** (8/10) | Confident, quiet intensity; "No mercy for blind spots," not hype |

**Voice in one line:** A seasoned operator handing you a field manual — precise,
unimpressed, generous.

### Messaging hierarchy

- **Tagline:** *Every door has a name. This is the codex.*
- **Value proposition:** One static, offline-searchable codex of 24 offensive-security
  domains — 124 methodology pages and 104 sealed PDF references — with no logins
  and no telemetry.
- **Key messages**
  1. *Depth without the dig* — everything cross-linked, nothing gated.
  2. *Fast by design* — local `⌘K` search, reading-first typography, no external calls.
  3. *Open by conviction* — MIT-licensed, attributable, community-maintained.
- **Proof points:** 24 domains · 124 pages · 104 PDFs · SHA-256 seals · 13 contributors ·
  browser-only search · upstream MIT attribution retained unchanged.

---

## 2. VISUAL IDENTITY SYSTEM

### Logo concept — three directions

**Direction A — Wordmark ("The Carved Name")**
Set "SEKHEM" in Cinzel Decorative 900, letter-spaced 0.08em, with a thin gold hairline
running beneath the baseline like a chiseled stele edge. Strategic rationale: the
name is already the strongest asset; a typographic mark signals authority and
readability at every size, exactly like the codex itself. Best for the navbar and
social avatars.

**Direction B — Symbol ("The Eye & The Door")**
A minimal Eye of Horus whose iris doubles as a keyhole, enclosed in a cartouche
(the oval rope seal of pharaonic naming). Strategic rationale: merges the brand's
two core promises — *seeing* (discovery) and *naming/entering* (access). Works as a
favicon and app icon where type fails. Use the existing `HorusEye` motif as the seed.

**Direction C — Combination ("The Sealed Stele")**
Wordmark above, symbol set within a rounded-top stele silhouette with engraved
corner marks. Strategic rationale: unifies A and B into a single lockup for the
hero, brand card, and wallpapers; the stele shape echoes the card component
(`4px 4px 16px 16px` radius) so brand and product share one silhouette.

**Recommendation:** Adopt **C** as primary, **A** as horizontal lockup, **B** as
app/favicon mark.

### Logo variations

- **Primary (full color):** gold gradient wordmark + faience iris on obsidian.
- **Secondary (simplified):** wordmark only, no stele frame.
- **Monochrome:** pure `#0b0908` on light, `#f3ecdc` on dark.
- **Reversed:** gold-bright `#e8c766` on dark surfaces, with 0 0 18px glow.
- **Minimum size:** wordmark ≥120px wide digital; symbol ≥24px; favicon ≥16px.
- **Clear space:** ≥1× the symbol height on all sides; ≥0.5× cap-height above/below wordmark.

### Logo usage rules

**Correct (5):** on obsidian hero; on papyrus cards with dark ink; as reversed navbar
mark; as 24px favicon; inside the stele lockup on wallpapers.
**Incorrect (5, "do not"):** stretching or rotating; recoloring outside the approved
gold/faience/mono set; placing on gold backgrounds; adding dropshadows beyond the
specified glow; setting below minimum size or inside busy imagery.

### Color palette (with print conversions)

**Primary**
| Name | Hex | RGB | HSL | Pantone (approx) | CMYK | Psychology |
|---|---|---|---|---|---|---|
| Antique Gold | `#c9a227` | 201,162,39 | 46°,68%,47% | 871 C | 0,19,81,21 | Authority, antiquity, value |
| Obsidian | `#0b0908` | 11,9,8 | 20°,16%,4% | Black 6 C | 0,18,27,96 | Depth, focus, mystery |

**Secondary**
| Name | Hex | Pantone | Psychology |
|---|---|---|---|
| Faience | `#1fb6a6` | 3205 C | Clarity, restoration, trust |
| Scarab Green | `#3ddc97` | 7481 C | Completion, growth, verification |
| Torchlight | `#e8c766` | 7405 C | Illumination, guidance |

**Neutrals (UI):** `#f3ecdc` papyrus · `#efe6d2` surface · `#d8cbae` border ·
`#a89f8a` muted · `#2a241d` dark border · `#171411` dark card · `#0b0908` ink.

**Accents (CTA):** gold gradient `linear-gradient(135deg,#caa53f,#8a6413)` for primary
buttons; faience `#0f766e` badges in light mode; carnelian `#8c2f2f` for destructive
and "Advanced" difficulty.

**Rationale:** Gold carries the "excavated treasure/authority" promise; obsidian
provides the deepest possible canvas for reading; faience and scarab are historical
Egyptian pigments re-engineered as accessible UI accents. The palette is deliberately
dark-first to reduce eye strain during long reference sessions.

### Typography

- **Primary/display:** Cinzel Decorative (wordmark, hero, section titles).
- **Secondary/body:** Spectral (reading text, UI copy) + JetBrains Mono (metadata, code).
- **Hierarchy:** Display 48 → H1 40 → H2 28 → H3 18 → Body 17 → Caption 12 (see DESIGN_SYSTEM.md §1.2).

### Imagery style

- **Photography:** minimal; if used, macro textures of stone, papyrus, and sand in
  low raking torchlight — never stock "hacker" imagery or faces other than the architect.
- **Illustration:** vector silhouettes (pyramids, dunes, Eye of Horus) with flat fills
  and gold hairlines; no gradients except the torch glow.
- **Iconography:** lucide-react, 1.6–2px stroke, rounded caps, no filled blobs; 24px
  default, 15–18px inline; gold on hover for interactive icons.
- **Graphic patterns:** engraved corner marks, hairline dividers, faint SVG turbulence
  grain at 5% opacity, radial torch glow.

---

## 3. BRAND APPLICATIONS

**Business cards** — Front: obsidian, stele lockup centered, gold foil wordmark,
faience rule. Back: papyrus, name/handle in Cinzel, contact in JetBrains Mono, QR to `/sekhem/`.

**Letterhead/stationery** — Top hairline in gold, wordmark left, "THE PHARAOH'S
PENTEST CODEX" tracked caption right; footer with MIT attribution + site URL.

**Email signature** — 24px symbol + name in Cinzel 600, role in mono caption, three
icon links (GitHub/Instagram/WhatsApp), 1px gold divider.

**Social templates (5 platforms)** — Avatar: symbol on obsidian (400×400). X/Twitter
cover: wordmark + tagline on obsidian (1500×500). GitHub profile README: stats row +
relic trio. Instagram: 1080×1080 quote cards ("Every door has a name"). LinkedIn:
1600×840 papyrus card with value proposition.

**Presentation template** — Title (obsidian, wordmark + tagline), Content (papyrus,
Cinzel H1 + Spectral body), Data (mono numerals, faience/gold bars), Closing (gold
gradient full-bleed with CTA). See PRESENTATION.md for the full deck.

---

## 4. BRAND GUIDELINES DOCUMENT

**20-page brand book structure:** 1) Foreword 2) Origin & attribution 3) Mission/
vision/values 4) Audience 5) Brand archetypes 6) Voice & tone 7) Messaging hierarchy
8) Logo construction 9) Logo variations 10) Clear space & minimum size 11) Logo misuse
12) Color system 13) Color in print 14) Typography 15) Imagery 16) Iconography 17)
Graphic elements 18) Applications 19) Digital guidelines 20) Governance & requests.

**Asset library organization:**
```
/assets/brand/
  logo/primary.svg  logo/wordmark.svg  logo/symbol.svg  logo/mono-dark.svg  logo/mono-light.svg
  color/palette.tokens.json  color/palette.pdf
  type/webfonts/  type/specimen.pdf
  social/  templates/  wallpapers/
  governance/usage-requests.md
```

*Every decision above traces to the confirmed briefing: bold professional personality,
trust + discovery emotion, open MIT values, dark-first web platform.*
