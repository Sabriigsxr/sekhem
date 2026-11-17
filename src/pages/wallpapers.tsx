import React from 'react';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';
import Link from '@docusaurus/Link';
import {Download, ArrowLeft, ShieldCheck} from 'lucide-react';
import styles from './wallpapers.module.css';

const WALLPAPERS = [
  {
    id: 'giza-night',
    src: '/wallpapers/sekhem-giza-night.svg',
    title: 'Giza at Night',
    desc: 'The black desert, the obsidian pyramids, a torch of geometry and sand. Pyramids engraved with faint hieroglyphs, aurora-dim amber moon.',
    tag: 'SCENE',
  },
  {
    id: 'eye',
    src: '/wallpapers/sekhem-eye.svg',
    title: 'The Eye',
    desc: 'Eye of Horus rendered in aged gold — circuit traces in faience teal beneath the sand. The mark of SEKHEM, for those who see.',
    tag: 'EMBLEM',
  },
  {
    id: 'hieroglyphs',
    src: '/wallpapers/sekhem-hieroglyphs.svg',
    title: 'Hieroglyph Field',
    desc: 'A full wall of the codex: ankh, eye, scarab, feather, water and sun, in a repeating cartouche grid under a black veil.',
    tag: 'PATTERN',
  },
];

export default function Wallpapers(): React.JSX.Element {
  return (
    <Layout>
      <Head>
        <title>Wallpapers — SEKHEM</title>
        <meta
          name="description"
          content="Original SEKHEM wallpaper art — vector masters that scale to 8K: Giza at Night, The Eye, Hieroglyph Field. Free to download (CC-BY Dev Ahmed Sabry)."
        />
      </Head>

      <main className={styles.page}>
        <div className="container">
          <div className={styles.head}>
            <Link to="/" className={styles.back}><ArrowLeft size={16} /> The Codex</Link>
            <div className="pe-eyebrow" style={{marginTop: '1.5rem'}}>The Arsenal</div>
            <h1 className={styles.title}>SEKHEM Wallpapers</h1>
            <p className={styles.sub}>
              Pure-vector masters — they scale cleanly to 4K/8K and beyond, no compression, no banding.
              Download and set them everywhere.
            </p>
            <div className={styles.credit}>
              <ShieldCheck size={15} /> Artwork © 2026 <strong>Dev Ahmed Sabry</strong> · CC&nbsp;BY&nbsp;4.0 · free personal &amp; commercial use with attribution
            </div>
          </div>

          <div className={styles.grid}>
            {WALLPAPERS.map((w) => (
              <article key={w.id} className={styles.card}>
                <div className={styles.frame}>
                  <img src={w.src} alt={`SEKHEM wallpaper — ${w.title}`} loading="lazy" />
                  <span className={styles.tag}>{w.tag}</span>
                </div>
                <div className={styles.body}>
                  <h2 className={styles.cardTitle}>{w.title}</h2>
                  <p className={styles.cardDesc}>{w.desc}</p>
                  <div className={styles.footer}>
                    <span className={styles.meta}>SVG · 3840×2160 · ∞ resolution</span>
                    <a className="pe-btn pe-btn--primary pe-btn--sm" href={w.src} download>
                      <Download size={15} /> Download
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <p className={styles.footNote}>
            Want a 16:9 / 21:9 / phone crop? Open the SVG — every shape scales.
            Built by <strong>Dev Ahmed Sabry</strong> · WhatsApp <a href="https://wa.me/201284123811">+20 128 412 3811</a> · GitHub <a href="https://github.com/sabriigsxr">sabriigsxr</a>
          </p>
        </div>
      </main>
    </Layout>
  );
}
