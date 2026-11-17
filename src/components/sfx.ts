/**
 * SEKHEM SFX — Web Audio synthesized sound effects. Zero audio assets.
 * Default: muted. Opt-in via the navbar speaker toggle (localStorage `sekhem.sfx.v1`).
 * Spec: motion & sound design v1.0. All UI sounds ≤ 110 ms; ceremonial gong is not fired by this module.
 */

type SfxState = {enabled: boolean; gain: number};

const KEY = 'sekhem.sfx.v1';

function readState(): SfxState {
  try {
    const raw = localStorage.getItem(KEY);
    const parsed = raw ? (JSON.parse(raw) as Partial<SfxState>) : {};
    return {
      enabled: parsed.enabled === true,
      gain: typeof parsed.gain === 'number' ? Math.min(1.5, Math.max(0.5, parsed.gain)) : 1,
    };
  } catch {
    return {enabled: false, gain: 1};
  }
}

export function isSfxEnabled(): boolean {
  return readState().enabled;
}

export function setSfxEnabled(enabled: boolean): void {
  try {
    localStorage.setItem(KEY, JSON.stringify({...readState(), enabled}));
  } catch {
    /* private mode — ignore */
  }
}

function env(g: GainNode, t0: number, peak: number, decay: number): void {
  g.gain.setValueAtTime(0.0001, t0);
  g.gain.exponentialRampToValueAtTime(Math.max(peak, 0.0002), t0 + 0.003);
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + decay);
}

class Sfx {
  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;
  private noiseBuf: AudioBuffer | null = null;
  private voices: {stop: () => void}[] = [];
  private lastTick = 0;

  private getCtx(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const Ctor = window.AudioContext ?? (window as unknown as {webkitAudioContext?: typeof AudioContext}).webkitAudioContext;
      if (!Ctor) return null;
      this.ctx = new Ctor();
      this.master = this.ctx.createGain();
      this.master.gain.value = 0.6 * readState().gain;
      const comp = this.ctx.createDynamicsCompressor();
      comp.threshold.value = -18;
      comp.knee.value = 12;
      comp.ratio.value = 4;
      comp.attack.value = 0.003;
      comp.release.value = 0.12;
      this.master.connect(comp);
      comp.connect(this.ctx.destination);
      this.noiseBuf = this.makeNoise(this.ctx);
    }
    if (this.ctx.state === 'suspended') void this.ctx.resume();
    return this.ctx;
  }

  private makeNoise(ctx: AudioContext): AudioBuffer {
    const buf = ctx.createBuffer(1, ctx.sampleRate, ctx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < data.length; i += 1) data[i] = (Math.random() * 2 - 1) * 0.9;
    return buf;
  }

  private limitVoice(voice: {stop: () => void}): void {
    while (this.voices.length >= 4) this.voices.shift()?.stop();
    this.voices.push(voice);
  }

  tick(intensity = 0.5): void {
    if (!isSfxEnabled()) return;
    const now = performance.now();
    if (now - this.lastTick < 90) return; // stone-tick guard
    this.lastTick = now;
    const ctx = this.getCtx();
    if (!ctx || !this.master) return;
    const t = ctx.currentTime;
    const master = this.master;

    const o1 = ctx.createOscillator();
    o1.type = 'sine';
    o1.frequency.setValueAtTime(310, t);
    o1.frequency.exponentialRampToValueAtTime(255, t + 0.05);
    const g1 = ctx.createGain();
    env(g1, t, 0.22 * intensity, 0.07);
    o1.connect(g1).connect(master);
    o1.start(t);
    o1.stop(t + 0.08);

    const o2 = ctx.createOscillator();
    o2.type = 'triangle';
    o2.frequency.setValueAtTime(1240, t);
    o2.frequency.exponentialRampToValueAtTime(1150, t + 0.03);
    const g2 = ctx.createGain();
    env(g2, t, 0.26 * intensity, 0.055);
    o2.connect(g2).connect(master);
    o2.start(t);
    o2.stop(t + 0.06);

    const n = ctx.createBufferSource();
    n.buffer = this.noiseBuf;
    n.playbackRate.value = 1.6;
    const bp = ctx.createBiquadFilter();
    bp.type = 'bandpass';
    bp.frequency.value = 3200;
    bp.Q.value = 0.9;
    const g3 = ctx.createGain();
    env(g3, t, 0.16 * intensity, 0.032);
    n.connect(bp).connect(g3).connect(master);
    n.start(t, 0, 0.05);
    n.stop(t + 0.05);

    this.limitVoice({stop: () => { try { o1.stop(); o2.stop(); n.stop(); } catch { /* already stopped */ } }});
  }

  whoosh(open: boolean, intensity = 0.55): void {
    if (!isSfxEnabled()) return;
    const ctx = this.getCtx();
    if (!ctx || !this.master) return;
    const t = ctx.currentTime;
    const dur = 0.11;
    const master = this.master;

    const n = ctx.createBufferSource();
    n.buffer = this.noiseBuf;
    const bp = ctx.createBiquadFilter();
    bp.type = 'bandpass';
    bp.Q.value = 1.4;
    const from = open ? 240 : 1750;
    const to = open ? 1750 : 240;
    bp.frequency.setValueAtTime(from, t);
    bp.frequency.exponentialRampToValueAtTime(to, t + dur * 0.8);
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(0.34 * intensity, t + 0.015);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    n.connect(bp).connect(g).connect(master);
    n.start(t);
    n.stop(t + dur + 0.01);

    const o = ctx.createOscillator();
    o.type = 'sine';
    o.frequency.setValueAtTime(open ? 180 : 150, t);
    o.frequency.exponentialRampToValueAtTime(open ? 95 : 85, t + dur);
    const go = ctx.createGain();
    env(go, t, 0.12 * intensity, dur);
    o.connect(go).connect(master);
    o.start(t);
    o.stop(t + dur + 0.01);

    this.limitVoice({stop: () => { try { o.stop(); n.stop(); } catch { /* noop */ } }});
  }
}

export const sfx = new Sfx();
