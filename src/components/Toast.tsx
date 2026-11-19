import React from 'react';
import {Check} from 'lucide-react';

export interface ToastProps {
  /** Announced message. Keep short (e.g. "Assessment exported"). */
  message: string;
  /** Whether the toast is currently shown. */
  visible: boolean;
}

/**
 * Transient success confirmation — UI/UX Pattern Library §Feedback patterns.
 * Designer's Intent: scarab green + check icon signals completion; role="status"
 * with polite live region announces it without interrupting the reader.
 * Never used for errors requiring action (those use an inline alert instead).
 */
export default function Toast({message, visible}: ToastProps): React.JSX.Element {
  return (
    <div className={`sk-toast${visible ? ' is-visible' : ''}`} role="status" aria-live="polite" aria-atomic="true">
      <span className="sk-toast__icon" aria-hidden="true"><Check size={16} strokeWidth={2.5} /></span>
      <span>{message}</span>
    </div>
  );
}
