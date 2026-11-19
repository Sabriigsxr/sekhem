import React from 'react';
import styles from './SkButton.module.css';

export type ButtonVariant = 'primary' | 'ghost' | 'outline' | 'destructive' | 'icon';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface SkButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual treatment. Use one primary action per view. */
  variant?: ButtonVariant;
  /** Controls the horizontal and vertical padding. */
  size?: ButtonSize;
  /** Shows a spinner and exposes the loading state to assistive technology. */
  loading?: boolean;
  /** Optional icon rendered before the label. */
  iconLeft?: React.ReactNode;
  children: React.ReactNode;
}

export default function SkButton({
  variant = 'primary',
  size = 'md',
  loading = false,
  iconLeft,
  className = '',
  children,
  disabled,
  type = 'button',
  ...rest
}: SkButtonProps): React.JSX.Element {
  return (
    <button
      type={type}
      className={[styles.btn, styles[variant], styles[size], className].filter(Boolean).join(' ')}
      aria-busy={loading || undefined}
      disabled={disabled || loading}
      {...rest}>
      {loading ? <span className={styles.spinner} aria-hidden="true" /> : iconLeft}
      <span>{children}</span>
    </button>
  );
}
