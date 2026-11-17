import React, {useMemo, useState} from 'react';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import {ArrowLeft, Search, FileText, ShieldCheck, Copy, Check, Download, Lock} from 'lucide-react';
import styles from './vault.module.css';
import vault from '@site/src/data/vault.json';

type VaultFile = {id: string; title: string; path: string; category: string; size: number; sha256: string};

const FILES = vault.files as VaultFile[];
const CATEGORIES = [...new Set(FILES.map((f) => f.category))].sort();

const prettyCategory = (c: string): string => c.replace(/-pentesting|-assessment$/i, '').replace(/-/g, ' ').replace(/\b\w/g, (m) => m.toUpperCase());
const fmtSize = (bytes: number): string => {
  const mb = bytes / 1024 / 1024;
  return mb >= 1 ? `${mb.toFixed(1)} MB` : `${Math.round(bytes / 1024)} KB`;
};

export default function Vault(): React.JSX.Element {
  const [query, setQuery] = useState('');
  const baseUrl = useBaseUrl('/');
  const [category, setCategory] = useState<string>('all');
  const [copied, setCopied] = useState<string | null>(null);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return FILES.filter((f) => {
      if (category !== 'all' && f.category !== category) return false;
      if (!q) return true;
      return (
        f.title.toLowerCase().includes(q) ||
        f.category.toLowerCase().includes(q) ||
        f.sha256.startsWith(q)
      );
    });
  }, [query, category]);

  const totalSize = useMemo(() => FILES.reduce((acc, f) => acc + f.size, 0), []);

  const copySha = async (id: string, sha: string): Promise<void> => {
    try {
      await navigator.clipboard.writeText(sha);
      setCopied(id);
      window.setTimeout(() => setCopied(null), 1600);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <Layout>
      <Head>
        <title>The Tomb — SEKHEM Vault</title>
        <meta
          name="description"
          content="The Tomb: curated penetration testing reference PDFs — cryptographically checksummed, catalogued by domain, free to read. One search away."
        />
      </Head>

      <main className={styles.page}>
        <div className="container">
          <Link to="/" className={styles.back}><ArrowLeft size={16} /> The Codex</Link>

          <header className={styles.hero}>
            <div className="pe-eyebrow" style={{marginTop: '1rem'}}>The Tomb</div>
            <h1 className={styles.title}>Sealed. Checksummed. Yours.</h1>
            <p className={styles.sub}>
              Every reference PDF the Codex stands on — {FILES.length} files across {CATEGORIES.length} domains,
              each bearing its SHA-256 seal. Read them here, or take them with you. Nothing hidden, nothing hidden-in-plain-sight.
            </p>
            <div className={styles.stats}>
              <span><Lock size={13} /> {FILES.length} sealed files</span>
              <span><FileText size={13} /> {fmtSize(totalSize)}</span>
              <span><ShieldCheck size={13} /> SHA-256 verified</span>
            </div>
          </header>

          <div className={styles.controls}>
            <div className={styles.searchBox}>
              <Search size={17} aria-hidden="true" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by title, domain, or SHA-256 prefix…"
                aria-label="Search the vault"
              />
              <span className={styles.count}>{visible.length} / {FILES.length}</span>
            </div>
            <div className={styles.chips} role="group" aria-label="Filter by domain">
              <button type="button" className={`${styles.chip} ${category === 'all' ? styles.chipActive : ''}`} onClick={() => setCategory('all')}>All</button>
              {CATEGORIES.map((c) => (
                <button key={c} type="button" className={`${styles.chip} ${category === c ? styles.chipActive : ''}`} onClick={() => setCategory(c)}>
                  {prettyCategory(c)}
                </button>
              ))}
            </div>
          </div>

          <ul className={styles.grid}>
            {visible.map((f) => (
              <li key={f.id} className={styles.card}>
                <div className={styles.cardTop}>
                  <div className={styles.fileIcon}><FileText size={22} /></div>
                  <div className={styles.cardHead}>
                    <h2 className={styles.fileName} title={f.title}>{f.title}</h2>
                    <span className={styles.fileCat}>{prettyCategory(f.category)} · {fmtSize(f.size)}</span>
                  </div>
                </div>
                <div className={styles.shaRow}>
                  <code className={styles.sha} title={f.sha256}>sha256:{f.sha256.slice(0, 24)}…</code>
                  <button
                    type="button"
                    className={styles.copyBtn}
                    onClick={() => copySha(f.id, f.sha256)}
                    aria-label={`Copy SHA-256 for ${f.title}`}>
                    {copied === f.id ? <Check size={14} /> : <Copy size={14} />}
                  </button>
                </div>
                <a className={styles.download} href={`${baseUrl}${f.path.replace(/^\/+/, '')}`} download>
                  <Download size={15} /> Download PDF
                </a>
              </li>
            ))}
            {visible.length === 0 && (
              <li className={styles.empty}>Nothing in the tomb matches “{query}”. Try fewer letters.</li>
            )}
          </ul>

          <p className={styles.legal}>
            Third-party PDFs belong to their respective owners, redistributed in good faith for education; the manifest
            and SHA-256 seals are computed locally at build time. Found yours and want it credited or removed?{' '}
            <a href="https://github.com/m14r41/PentestingEverything/blob/main/CONTENT_REMOVAL.md" target="_blank" rel="noopener noreferrer">Takedown policy</a>
            {' '}· SEKHEM redesign &amp; vault by <strong>Dev Ahmed Sabry</strong>.
          </p>
        </div>
      </main>
    </Layout>
  );
}
