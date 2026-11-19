import React from 'react';
import Link from '@docusaurus/Link';

export type SkCardKind = 'relic' | 'category' | 'feature' | 'path';

export interface SkCardProps {
  /** Content family, reserved for future variant styling. */
  kind: SkCardKind;
  title: string;
  description: string;
  /** Optional metadata shown at the bottom of the card. */
  meta?: string[];
  icon: React.ReactNode;
  /** Internal route or external URL. The entire card becomes one link. */
  href?: string;
  /** A sealed card remains visible but is non-interactive. */
  sealed?: boolean;
  /** Small status label, for example "LIVE". */
  status?: string;
  className?: string;
  children?: React.ReactNode;
}

export default function SkCard({
  kind,
  title,
  description,
  meta = [],
  icon,
  href,
  sealed = false,
  status,
  className = '',
  children,
}: SkCardProps): React.JSX.Element {
  const content = (
    <>
      {status && (
        <span className={`pe-card__status pe-card__status--${status === 'LIVE' ? 'live' : 'sealed'}`}>
          {status}
        </span>
      )}
      <div className="pe-card__icon" aria-hidden="true">{icon}</div>
      <h3 className="pe-card__title">{title}</h3>
      <p className="pe-card__desc">{description}</p>
      {meta.length > 0 && (
        <div className="pe-card__meta">
          {meta.map((item) => <span key={item}>{item}</span>)}
        </div>
      )}
      {children}
    </>
  );

  const classes = ['sk-card', 'pe-card', `sk-card--${kind}`, className].filter(Boolean).join(' ');

  if (sealed || !href) {
    return (
      <div className={classes} aria-disabled={sealed || undefined}>
        {content}
      </div>
    );
  }

  return (
    <Link className={`${classes} sk-focus`} to={href}>
      {content}
    </Link>
  );
}
