import React, {useEffect, useState} from 'react';
import {ArrowUp} from 'lucide-react';
import {sfx} from '@site/src/components/sfx';

/**
 * Wraps the whole app (non-ejecting swizzle). Adds two global reading aids:
 *   - a top scroll-progress bar
 *   - a back-to-top button that appears after scrolling
 * Both are purely client-side and respect prefers-reduced-motion via CSS.
 */
export default function Root({children}: {children: React.ReactNode}): React.JSX.Element {
  const [progress, setProgress] = useState(0);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const el = document.documentElement;
        const max = el.scrollHeight - el.clientHeight;
        const pct = max > 0 ? (el.scrollTop / max) * 100 : 0;
        setProgress(pct);
        setShowTop(el.scrollTop > 600);
        el.style.setProperty('--pe-read-progress', String(pct / 100));
        el.classList.toggle('is-scrolled', el.scrollTop > 10);
        // Keep the active item visible inside the sticky right-hand TOC: Docusaurus
        // highlights it but does not scroll the TOC, so on long pages the highlight
        // drifts out of view. Nudge only the TOC's own scroll, never the page.
        const toc = document.querySelector('.theme-doc-toc-desktop');
        if (toc) {
          const actives = toc.querySelectorAll('.table-of-contents__link--active');
          const active = actives[actives.length - 1] as HTMLElement | undefined;
          if (active) {
            const t = toc.getBoundingClientRect();
            const a = active.getBoundingClientRect();
            const margin = 48;
            if (a.top < t.top + margin) {
              toc.scrollTop -= t.top + margin - a.top;
            } else if (a.bottom > t.bottom - margin) {
              toc.scrollTop += a.bottom - (t.bottom - margin);
            }
          }
        }
      });
    };
    // Synthesized UI sounds (opt-in via navbar speaker; no-ops while muted)
    const onKeyDown = (e: KeyboardEvent): void => {
      if ((e.metaKey || e.ctrlKey) && (e.key === 'k' || e.key === 'K')) {
        sfx.whoosh(true, 0.55);
      }
    };
    const onPointerDown = (e: PointerEvent): void => {
      const target = e.target as HTMLElement | null;
      if (target?.closest?.('input[type="checkbox"]')) sfx.tick(0.5);
    };
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('pointerdown', onPointerDown, {passive: true});
    window.addEventListener('scroll', onScroll, {passive: true});
    onScroll();
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('scroll', onScroll);
      document.documentElement.style.removeProperty('--pe-read-progress');
      document.documentElement.classList.remove('is-scrolled');
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <>
      <div className="pe-reading-progress" style={{width: `${progress}%`}} aria-hidden="true" />
      {children}
      <button
        type="button"
        className={`pe-back-to-top${showTop ? ' is-visible' : ''}`}
        aria-label="Back to top"
        onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
        <ArrowUp size={20} />
      </button>
    </>
  );
}
