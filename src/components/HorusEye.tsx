import React from 'react';

/**
 * The Eye of Horus — a 28px reading-depth mirror.
 * Reads `--pe-read-progress` (0..1) set by Root.tsx on <html>.
 * Appearance is driven entirely by CSS (see .pe-horus in custom.css).
 */
export default function HorusEye(): React.JSX.Element {
  return (
    <span className="pe-horus" role="img" aria-label="Reading depth indicator" aria-hidden="true" title="Reading depth">
      <svg className="pe-horus__svg" viewBox="0 0 32 20" width="28" height="18" aria-hidden="true" focusable="false">
        <defs>
          <radialGradient id="peIrisGrad" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor="#e8c766" />
            <stop offset="0.55" stopColor="#c9a227" />
            <stop offset="1" stopColor="#c9a227" stopOpacity="0" />
          </radialGradient>
        </defs>
        <path
          className="pe-horus__outline"
          d="M2 10c3.6-5 8.4-7.4 14-7.4S26.4 5 30 10c-3.6 5-8.4 7.4-14 7.4S5.6 15 2 10Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <path className="pe-horus__brow" d="M4 4.5 9 1.8 14 .8" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        <circle className="pe-horus__iris" cx="16" cy="10" r="4.6" fill="url(#peIrisGrad)" />
        <circle className="pe-horus__pupil" cx="16" cy="10" r="1.7" fill="#1a1408" />
        <path className="pe-horus__drop" d="M15 14.6 12.6 19h3.2l1-3.1" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path className="pe-horus__curl" d="M22 13.5c2.6.9 3.6 2.6 3.2 4.4" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    </span>
  );
}
