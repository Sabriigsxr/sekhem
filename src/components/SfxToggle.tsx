import React, {useEffect, useState} from 'react';
import {Volume2, VolumeX} from 'lucide-react';
import {isSfxEnabled, setSfxEnabled, sfx} from './sfx';

/**
 * Navbar speaker — opt-in synthesized sounds (stone tick / sand whoosh).
 * Muted by default; persisted per-device in localStorage.
 */
export default function SfxToggle(): React.JSX.Element {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    setEnabled(isSfxEnabled());
  }, []);

  const toggle = (): void => {
    const next = !enabled;
    setSfxEnabled(next);
    setEnabled(next);
    if (next) sfx.tick(0.6); // audition the stone
  };

  return (
    <button
      type="button"
      className="pe-sfxbtn"
      aria-pressed={enabled}
      aria-label={enabled ? 'Sound: on' : 'Sound: off'}
      title={enabled ? 'Sound: on' : 'Sound: off'}
      onClick={toggle}>
      {enabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
    </button>
  );
}
