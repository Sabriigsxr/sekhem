# SEKHEM — Design Critique

**Generator #6 · Design Critique Partner · Apple Design Director**
*Subject: the live SEKHEM site (sabriigsxr.github.io/sekhem) and its Docusaurus source*

---

## 1. HEURISTIC EVALUATION (Nielsen's 10, scored 1–5)

| # | Heuristic | Score | Specific example |
|---|---|---|---|
| 1 | Visibility of system status | 4 | Reading bar + Eye of Horus mirror depth; Scarab shows progress. Gap: no visible "searching…" state in local search. |
| 2 | Match system ↔ real world | 5 | "Tomb," "Relics," "Hunting Grounds," "Scarab" map the codex to an excavator's mental model. |
| 3 | User control and freedom | 4 | Sidebar hideable, theme switch, SFX opt-in, `Esc` modals. Gap: no global "reset preferences" affordance. |
| 4 | Consistency and standards | 5 | Card component reused across relics/categories/paths; gold = action everywhere; native Docusaurus patterns. |
| 5 | Error prevention | 3 | `onBrokenLinks: 'throw'` prevents bad builds. Gap: destructive reset in Scarab lacks a confirmation dialog. |
| 6 | Recognition rather than recall | 4 | Breadcrumbs, TOC, sidebar, search. Gap: icon-only GitHub/SFX buttons rely on `aria-label` (invisible to sighted newcomers). |
| 7 | Flexibility and efficiency | 4 | `⌘K` search, collapsible sidebar, local-first export, keyboard-friendly. |
| 8 | Aesthetic and minimalist design | 4 | Strong. Gap: v3.1/v3.2 "premium chrome" layers (glows, corner marks, hairline sweep) risk visual noise for a reference tool. |
| 9 | Recognize/diagnose/recover errors | 3 | Static site has few errors. Gap: empty-search state and missing-PDF fallback are thin. |
| 10 | Help and documentation | 5 | `help.md`, `CONTRIBUTING.md`, inline methodology, origin/attribution — excellent. |

**Average: 4.1/5** — a strong, coherent design. Critique below focuses on the gaps.

---

## 2. VISUAL HIERARCHY ANALYSIS

- **First thing seen:** the SEKHEM wordmark in gold Decorative caps with a torch glow.
  *Correct* — identity is the hook. The primary CTA ("Enter the Codex") is a close second.
- **CTA hierarchy:** two hero CTAs, but ghost vs. primary is clear. Good. On doc pages
  there is no competing CTA — correct for a reading tool.
- **Visual weight balance:** the gold navbar hairline and card corner marks pull the eye
  at the top; the stats bar balances the hero bottom. The 4-domain row is heavy but even.
- **White space:** generous on landing (4rem sections); the reading column's 44rem measure
  and 1.85 line-height are textbook. **Concern:** `.markdown::before` injects a tracked
  running header via CSS `content` — visible decoration, but invisible to the accessibility
  tree and unselectable; acceptable as ornament, questionable as "content."

---

## 3. TYPOGRAPHY AUDIT

- **Font choices:** Cinzel (engraved) + Spectral (papyrus serif) + JetBrains Mono —
  appropriate and distinctive for a codex. ✅
- **Type scale:** clear 48→40→28→18→17 hierarchy; desktop/tablet/mobile values specified. ✅
- **Line length:** 44rem reading column ≈ 66 characters — optimal. ✅
- **Contrast:** verified AAA for primary text; **one exception** — Carnelian `#a04444`
  on obsidian is 3.22:1, which fails AA for body text. It is used for "Advanced" chips
  and error semantics. ⚠️ Remediation in the Accessibility Audit (§violations).

---

## 4. COLOR ANALYSIS

- **Personality fit:** gold-on-obsidian is exactly the "excavated hacker codex" promise. ✅
- **Accessibility:** AAA for gold, faience, scarab, muted, and body text on dark. The
  light-mode gold-bright `#caa53f` is 1.99:1 — decorative only, never body text. ⚠️
- **Meaningful use:** gold = action, faience = reference, scarab = completion, carnelian
  = error/advanced. Consistent. ✅
- **Dark mode:** dark-first by design with a papyrus alternative. Excellent. ✅
- **Concern:** several decorative glows use low-alpha gold over dark surfaces — visually
  rich, but a *lot* of simultaneous animated light (bar shine + card torch + Horus pulse +
  hairline sweep) can be fatiguing. Reduced-motion handling mitigates it.

---

## 5. USABILITY CONCERNS

- **Cognitive load:** landing is dense with Egyptian vocabulary. Expert users will love
  it; first-timers may need the "one tomb, three chambers" explainer — which exists. Low risk.
- **Interaction clarity:** cards look clickable (hover lift/glow) and are links — correct.
  Sealed cards use `aria-disabled` but no visual "locked" treatment beyond a status label.
- **Touch targets:** icon buttons are 40–46px; ≥44px only partially met (SFX/Horus are 40px). ⚠️
- **Form usability:** search and notes fields have visible labels? The local search input
  relies on a placeholder/icon — needs a visually hidden `<label>`. ⚠️

---

## 6. STRATEGIC ALIGNMENT

- **Business/user goals:** serves awareness and adoption — free, open, offline, deep. ✅
- **Value proposition:** "Every door has a name" + 24 domains + no logins is unmistakable. ✅
- **Differentiation:** the theme is genuinely unique in security education; no competitor
  owns "Egyptian codex." Strong white space. ✅

---

## 7. PRIORITIZED RECOMMENDATIONS

**Critical (before launch / next release)**
1. Replace Carnelian `#a04444` body/label usages in dark mode with an AA-compliant
   treatment (lighter tint ≥4.5:1 or pair with text label) — *already partially addressed
   by pairing "Advanced" chip text.*
2. Add visible labels to icon-only controls (tooltip on hover/focus) and a visually
   hidden label for the search input.
3. Add a confirmation to destructive reset actions in Scarab.

**Important (next iteration)**
4. Bump SFX/Horus controls to 44px touch targets.
5. Add explicit empty/error states for local search and missing PDFs.
6. Consolidate the four simultaneous glow animations to two to reduce visual fatigue.

**Polish**
7. Add a global "reset preferences" control.
8. Convert the CSS-injected running header to a real element if it must be announced/selectable.
9. Add a "copy link" action to reference rows.

---

## 8. REDESIGN DIRECTION (two alternatives, described)

**Direction A — "The Quiet Archive".** Strip the v3.1/v3.2 chrome: remove the hairline
sweep, card corner marks, and pulsing glows. Keep only the wordmark, gold active states,
and a single subtle progress bar. Result: a calmer, more scholarly reference tool that
still reads as SEKHEM through typography and the stele card silhouette. Best for
long-session researchers.

**Direction B — "The Living Tomb".** Intensify the world-building: make the domain grid
a navigable map with the Eye of Horus as a cursor-following torch, and turn the relics
into a three-panel "chamber" reveal on scroll. Higher delight, higher cognitive load —
best for awareness/landing, with the *quiet* treatment retained on doc pages.

**Recommendation:** Hybrid — Direction B on the landing page, Direction A on all docs.
The brand earns its drama at the threshold and gets out of the way in the reading room.
