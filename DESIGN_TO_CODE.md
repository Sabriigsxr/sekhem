# SEKHEM — Design-to-Code Handoff

**Generator #9 · Design-to-Code Translator · Vercel Design Engineer**
*Source: DESIGN_SYSTEM.md · Tech stack: React 18 + TypeScript + Docusaurus 3.8.1 + CSS Modules / CSS variables*

> This handoff is **live in the codebase**: `src/css/tokens.css` holds the generated
> `--sk-*` token layer, imported at the top of `src/css/custom.css`. The primitives below
> are copy-paste ready and preserve the stele-and-torchlight design intent.

---

## 1. COMPONENT ARCHITECTURE

```
Layout
├── Navbar (brand, items, HorusEye, SfxToggle, GitHub)
└── <main>
    ├── Hero (badge, h1, tagline, CTAs, stats)
    ├── Section (eyebrow, title, sub)
    │   └── Grid ── Card[] (Relic / Category / Feature / Path)
    ├── MetaBar ── Chip[]
    └── ReadingColumn ── PdfRef / ReferenceList / CodeBlock
Global: ReadingProgress, BackToTop
```

### Props interface (TypeScript)

```ts
export type ButtonVariant = 'primary' | 'ghost' | 'outline' | 'destructive' | 'icon';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface SkButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual treatment. One primary per view. */
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Leading lucide icon component. */
  iconLeft?: React.ComponentType<{size?: number}>;
  /** Shows spinner and sets aria-busy. */
  loading?: boolean;
  children: React.ReactNode;
}

export interface SkCardProps {
  kind: 'relic' | 'category' | 'feature' | 'path';
  title: string;
  description: string;
  meta?: string[];
  icon: React.ReactNode;
  href?: string;        // renders whole card as a single <a> focus target
  sealed?: boolean;     // aria-disabled, no link
  status?: string;      // e.g. "LIVE"
}
```

**State management:** local `useState` only (SfxToggle, Scarab checklist); persistence via
`localStorage` with 6h TTL for GitHub stats. No global store needed.

**Data flow:** `manifest.json` → static import → Hero stats + Categories grid; no runtime
fetch except the optional GitHub stats widget (graceful dash fallback).

---

## 2. PRODUCTION CODE

### Token-driven Button (`SkButton.tsx`)

```tsx
import React from 'react';
import styles from './SkButton.module.css';

type Variant = 'primary' | 'ghost' | 'outline' | 'destructive' | 'icon';
type Size = 'sm' | 'md' | 'lg';

export interface SkButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  iconLeft?: React.ReactNode;
}

/** Designer's Intent: one primary per view; gold is reserved for action. */
export default function SkButton({
  variant = 'primary', size = 'md', loading = false, iconLeft,
  className = '', children, disabled, ...rest
}: SkButtonProps): React.JSX.Element {
  return (
    <button
      type="button"
      className={[styles.btn, styles[variant], styles[size], className].join(' ')}
      aria-busy={loading || undefined}
      disabled={disabled || loading}
      {...rest}>
      {loading ? <span className={styles.spinner} aria-hidden="true" /> : iconLeft}
      <span>{children}</span>
    </button>
  );
}
```

```css
/* SkButton.module.css — token mapping */
.btn { display:inline-flex; align-items:center; gap:var(--sk-space-2);
  font-family:var(--sk-font-heading); font-weight:600; font-size:.82rem;
  letter-spacing:.05em; border-radius:var(--sk-radius-md); border:1px solid transparent;
  padding:.55rem 1.05rem; cursor:pointer; }
.btn:focus-visible { outline:2px solid var(--sk-gold-bright); outline-offset:2px; }
.primary { background:var(--sk-gold-grad); color:var(--sk-ink); box-shadow:var(--sk-shadow-gold); }
.ghost { color:var(--sk-gold-bright); background:transparent; border-color:var(--sk-gold); }
.outline { color:var(--sk-text); border-color:var(--sk-border); }
.destructive { color:var(--sk-error); border-color:var(--sk-error); }
.icon { padding:var(--sk-space-3); }
.sm { padding:.35rem .75rem; font-size:.76rem; }
.lg { padding:.75rem 1.4rem; font-size:.95rem; }
.spinner { width:14px; height:14px; border:2px solid currentColor;
  border-right-color:transparent; border-radius:50%; animation:spin .7s linear infinite; }
@keyframes spin { to { transform:rotate(360deg); } }
@media (prefers-reduced-motion:reduce) { .spinner { animation-duration:0s; } }
```

### Stele Card (`SkCard.tsx`) — anatomy from DESIGN_SYSTEM.md §2

```tsx
export interface SkCardProps {
  title: string; description: string; icon: React.ReactNode;
  meta?: string[]; href?: string; sealed?: boolean; status?: string;
}
export function SkCard({title, description, icon, meta = [], href, sealed, status}: SkCardProps) {
  const inner = (
    <>
      {status && <span className="pe-card__status">{status}</span>}
      <div className="pe-card__icon" aria-hidden="true">{icon}</div>
      <h3 className="pe-card__title">{title}</h3>
      <p className="pe-card__desc">{description}</p>
      {meta.length > 0 && <div className="pe-card__meta">{meta.map(m => <span key={m}>{m}</span>)}</div>}
    </>
  );
  if (sealed || !href) return <div className="sk-card" aria-disabled={sealed || undefined}>{inner}</div>;
  return <a className="sk-card sk-card--link sk-focus" href={href}>{inner}</a>;
}
```
*Designer's Intent:* the whole card is one focus target (no nested links); sealed cards are
non-interactive `div`s with `aria-disabled`, never fake buttons.

### Tokens — token integration
`src/css/tokens.css` maps every token from DESIGN_SYSTEM.md §4 to a CSS variable:
`--sk-bg`, `--sk-gold`, `--sk-space-4`, `--sk-radius-stele`, `--sk-ease`, etc.
Dark overrides live under `[data-theme='dark']`. Both namespaces (`--sk-*`, `--pe-*`)
share identical values so legacy components keep working during migration.

---

## 3. STYLING SPECIFICATIONS

- **Mobile-first:** base styles target 375px; `@media (min-width: 768px)` and `(min-width: 997px)`
  layer in tablet/desktop grid behavior.
- **Dark mode:** Docusaurus sets `data-theme` on `<html>`; tokens switch automatically.
- **States:** hover lifts cards/buttons; `:focus-visible` 2px gold ring; active pressed;
  loading sets `aria-busy`; disabled prevents pointer events.
- **Breakpoints:** mobile 375 / tablet 768 / desktop 997 / wide 1440 (from tokens).

---

## 4. DESIGN TOKEN INTEGRATION (summary)

| Token group | CSS vars | Source |
|---|---|---|
| Color | `--sk-bg`, `--sk-surface`, `--sk-gold`, `--sk-faience`… | DESIGN_SYSTEM §1.1 |
| Typography | `--sk-font-*`, `--sk-fs-*`, `--sk-lh-*` | §1.2 |
| Spacing | `--sk-space-1…32` | §1.4 |
| Radius / shadow | `--sk-radius-*`, `--sk-shadow-*` | tokens.css |
| Motion | `--sk-ease`, `--sk-dur-*` | §5 |

---

## 5. ASSET OPTIMIZATION

- **Images:** `loading="lazy"`, explicit `width`/`height` (prevents CLS); architect avatar 96×96.
- **SVG:** inline for icons via lucide-react (tree-shaken); brand/wallpapers as optimized SVG.
- **Fonts:** self-hosted WOFF2 with `font-display: swap`; only used weights (4 families × needed weights).
- **Icons:** lucide-react named imports; no sprite needed at this bundle size.

---

## 6. PERFORMANCE CONSIDERATIONS

- Static site → all content pre-rendered; no client data fetch except optional GitHub stats.
- `React.memo` on `SkCard` lists (manifest is static); `useMemo` for filtered reference lists.
- CSS Modules scoped; no runtime CSS-in-JS. Tokens are plain custom properties (zero cost).
- `prefers-reduced-motion` disables transitions/spinners animation at CSS level.

---

## 7. TESTING STRATEGY

```tsx
// SkButton.test.tsx — React Testing Library
it('renders primary variant with accessible name', () => {
  render(<SkButton>Enter the Codex</SkButton>);
  expect(screen.getByRole('button', {name:/enter the codex/i})).toBeInTheDocument();
});
it('exposes busy state while loading', () => {
  render(<SkButton loading>Saving</SkButton>);
  expect(screen.getByRole('button')).toHaveAttribute('aria-busy', 'true');
});
it('does not fire when disabled', () => {
  const onClick = vi.fn();
  render(<SkButton disabled onClick={onClick}>Go</SkButton>);
  fireEvent.click(screen.getByRole('button'));
  expect(onClick).not.toHaveBeenCalled();
});
```
- **Visual regression:** Playwright snapshots of Landing, Doc reader, Search modal at 375/768/1440, both themes, with reduced-motion on/off.
- **Accessibility (axe-core):** zero serious/critical violations; verify focus ring, `aria-label`s, contrast flags.
- **Responsive:** no horizontal overflow at 320px; TOC/sidebar collapse correctly.

---

## 8. DOCUMENTATION

- **JSDoc** on every prop (see `SkButtonProps` above) with Designer's Intent notes.
- **Usage examples:** (1) primary hero CTA, (2) ghost secondary CTA, (3) destructive in Scarab reset.
- **Do's:** one primary per view · use token vars · keep whole card as one link · label icon buttons.
- **Don'ts:** hardcode colors · nest links · remove focus rings · autoplay audio.
- **Changelog template:** `## [x.y.z] — date · Added / Changed / Fixed / Tokens updated`.

---

### Migration status
✅ `src/css/tokens.css` created and imported · ✅ typecheck-safe primitives defined ·
⏭ Optional next step: replace legacy `--pe-*` usages with `--sk-*` tokens component by component.
