import React from 'react';
import Link from '@docusaurus/Link';
import Head from '@docusaurus/Head';
import Layout from '@theme/Layout';
import {ArrowRight, BookOpen, Search, FileText, Route, Github, Instagram, MessageCircle, ScrollText, Vault, ListChecks, Pyramid, ShieldCheck} from 'lucide-react';
import CategoryIcon from '@site/src/components/CategoryIcon';
import manifest from '@site/src/data/manifest.json';
import styles from './index.module.css';

type Category = {key: string; label: string; slug: string; docs: number; pdfs: number; platform: string};

const ARCHITECT = {
  name: 'Dev Ahmed Sabry',
  handle: 'sabriigsxr',
  avatar: 'https://github.com/sabriigsxr.png',
  github: 'https://github.com/sabriigsxr',
  instagram: 'https://www.instagram.com/ahmedsabriigsxr1000',
  whatsapp: 'https://wa.me/201284123811',
};
const UPSTREAM_URL = 'https://github.com/m14r41/PentestingEverything';
const UPSTREAM_CONTENT_POLICY = 'https://github.com/m14r41/PentestingEverything/blob/main/CONTENT_REMOVAL.md';

const LEARNING_PATHS = [
  {title: 'Web Application Security', desc: 'From recon to OWASP Top 10 exploitation and reporting.', slug: '/web-application-pentesting'},
  {title: 'Cloud & Containers', desc: 'AWS, Azure, GCP and Kubernetes assessment workflows.', slug: '/cloud-pentesting'},
  {title: 'Mobile & API', desc: 'Android, iOS, REST and GraphQL testing methodology.', slug: '/mobile-pentesting'},
];

function Hero(): React.JSX.Element {
  const {stats} = manifest;
  return (
    <header className={styles.hero}>
      {/* Layered silhouettes: distant dunes, mid pyramids, near pillar shadow */}
      <svg className={styles.sky} viewBox="0 0 1440 340" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
        <circle cx="1150" cy="52" r="26" className={styles.moon} />
        <circle cx="240" cy="70" r="1.6" className={styles.star} />
        <circle cx="420" cy="36" r="1.1" className={styles.star} />
        <circle cx="640" cy="90" r="1.4" className={styles.star} />
        <circle cx="880" cy="40" r="1.2" className={styles.star} />
        <circle cx="1025" cy="120" r="1.5" className={styles.star} />
        <circle cx="1300" cy="110" r="1.1" className={styles.star} />
        <path d="M-40 340 L240 118 L520 340 Z" className={styles.pyramidFar} />
        <path d="M330 340 L610 168 L890 340 Z" className={styles.pyramidMid} />
        <path d="M720 340 L1010 96 L1300 340 Z" className={styles.pyramidNear} />
        <path d="M1075 340 L1268 205 L1462 340 Z" className={styles.pyramidFar} />
      </svg>
      <div className="container">
        <div className={styles.heroInner}>
          <span className={`${styles.badge} pe-rise`}>
            <ShieldCheck size={15} /> The Pharaoh&rsquo;s Pentest Codex
          </span>
          <h1 className={`${styles.title} pe-rise pe-rise--d1`}>SEKHEM</h1>
          <p className={`${styles.tagline} pe-rise pe-rise--d2`}>Every door has a name. This is the codex.</p>
          <p className={`${styles.subtitle} pe-rise pe-rise--d2`}>
            Methodology, references and field proof across 24 domains of offensive
            security — web, API, cloud, mobile, network, Active Directory and more.
            One static codex with search that runs in your browser. No logins. No telemetry. No mercy for blind spots.
          </p>
          <div className={`${styles.actions} pe-rise pe-rise--d3`}>
            <Link className="pe-btn pe-btn--primary" to="/overview">
              <BookOpen size={18} /> Enter the Codex
            </Link>
            <Link className="pe-btn pe-btn--ghost" to="/learning-paths">
              <Route size={18} /> Learning paths
            </Link>
          </div>
          <div className={`${styles.statsBar} pe-rise pe-rise--d3`}>
            <div className={styles.stat}><div className={styles.statNum}>{stats.docs}</div><div className={styles.statLabel}>Codex pages</div></div>
            <div className={styles.stat}><div className={styles.statNum}>{stats.pdfs}</div><div className={styles.statLabel}>Reference PDFs</div></div>
            <div className={styles.stat}><div className={styles.statNum}>{stats.categories}</div><div className={styles.statLabel}>Domains</div></div>
            <div className={styles.stat}><div className={styles.statNum}>{stats.topics}+</div><div className={styles.statLabel}>Topics</div></div>
          </div>
          <p className={styles.creditLine}>
            Redesigned &amp; maintained by <a href="https://github.com/sabriigsxr" target="_blank" rel="noopener noreferrer">Dev Ahmed Sabry</a>
            {' · '}<a href="https://wa.me/201284123811" target="_blank" rel="noopener noreferrer">WhatsApp</a>
            {' · '}<a href="https://www.instagram.com/ahmedsabriigsxr1000" target="_blank" rel="noopener noreferrer">Instagram</a>
          </p>
        </div>
      </div>
    </header>
  );
}

function Relics(): React.JSX.Element {
  const relics = [
    {icon: <ScrollText size={24} />, status: 'LIVE', live: true, title: 'The Codex', desc: 'The vault of knowledge you are inside — methodology & playbooks across 24 domains, fully searchable offline.', cta: 'Open The Codex', to: '/overview'},
    {icon: <Vault size={24} />, status: 'LIVE', live: true, title: 'The Tomb', desc: 'The Vault — 104 important PDFs across 17 domains, each with a SHA-256 seal, searchable and downloadable.', cta: 'Open The Tomb', to: '/vault'},
    {icon: <ListChecks size={24} />, status: 'LIVE', live: true, title: 'The Scarab', desc: 'The Checklist — tick-as-you-go assessments (WebApp & API), progress, notes, MD/JSON export. Local-first.', cta: 'Open The Scarab', to: '/scarab'},
  ];
  return (
    <section className={`pe-section ${styles.relicsSection}`} id="relics">
      <div className="container">
        <div className="pe-section__head">
          <div className="pe-eyebrow">The Three Relics</div>
          <h2 className="pe-section__title">One tomb, three chambers</h2>
          <p className="pe-section__sub">The product line, carved from the same stone.</p>
        </div>
        <div className="pe-grid pe-grid--3">
          {relics.map((r) =>
            r.live ? (
              <Link key={r.title} className="pe-card" to={r.to}>
                <div className={styles.relicStatusLive}>{r.status}</div>
                <div className="pe-card__icon">{r.icon}</div>
                <h3 className="pe-card__title">{r.title}</h3>
                <p className="pe-card__desc">{r.desc}</p>
                <div className="pe-card__meta"><span>{r.cta} <ArrowRight size={13} style={{verticalAlign: '-2px'}} /></span></div>
              </Link>
            ) : (
              <div key={r.title} className={`pe-card ${styles.relicSealed}`} aria-disabled="true">
                <div className={styles.relicStatusSealed}>{r.status}</div>
                <div className="pe-card__icon">{r.icon}</div>
                <h3 className="pe-card__title">{r.title}</h3>
                <p className="pe-card__desc">{r.desc}</p>
                <div className="pe-card__meta"><span>{r.cta}</span></div>
              </div>
            ),
          )}
        </div>
      </div>
    </section>
  );
}

function Categories(): React.JSX.Element {
  const categories = manifest.categories as Category[];
  return (
    <section className="pe-section">
      <div className="container">
        <div className="pe-section__head">
          <div className="pe-eyebrow">The Hunting Grounds</div>
          <h2 className="pe-section__title">Every major attack surface</h2>
          <p className="pe-section__sub">Jump straight into the domain you are testing today.</p>
        </div>
        <div className="pe-grid pe-grid--4">
          {categories.map((c) => (
            <Link key={c.key} className="pe-card" to={c.slug}>
              <div className="pe-card__icon"><CategoryIcon categoryKey={c.key} /></div>
              <h3 className="pe-card__title">{c.label}</h3>
              <p className="pe-card__desc">{c.platform} security testing</p>
              <div className="pe-card__meta">
                <span>{c.docs} docs</span>
                {c.pdfs > 0 && <span>{c.pdfs} PDFs</span>}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function Features(): React.JSX.Element {
  const items = [
    {icon: <Search size={22} />, title: 'Instant local search', desc: 'Fully static search with Ctrl/Cmd + K — fuzzy matching and in-page highlighting, run in your browser with no external service.'},
    {icon: <FileText size={22} />, title: 'Reference vault', desc: '100+ curated PDFs with clean open & download actions, cross-linked to the written methodology throughout.'},
    {icon: <BookOpen size={22} />, title: 'Reading-first codex', desc: 'Reading progress, estimated time, comfortable papyrus typography, dark stele theme by default.'},
  ];
  return (
    <section className={`pe-section ${styles.surface}`}>
      <div className="container">
        <div className="pe-section__head">
          <div className="pe-eyebrow">Why SEKHEM</div>
          <h2 className="pe-section__title">Built for fast, focused reference</h2>
        </div>
        <div className="pe-grid pe-grid--3">
          {items.map((f) => (
            <div key={f.title} className="pe-card">
              <div className="pe-card__icon">{f.icon}</div>
              <h3 className="pe-card__title">{f.title}</h3>
              <p className="pe-card__desc">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Paths(): React.JSX.Element {
  return (
    <section className="pe-section">
      <div className="container">
        <div className="pe-section__head">
          <div className="pe-eyebrow">Choose Your Trial</div>
          <h2 className="pe-section__title">Suggested learning paths</h2>
          <p className="pe-section__sub">Structured routes through the material for common engagements.</p>
        </div>
        <div className="pe-grid pe-grid--3">
          {LEARNING_PATHS.map((p) => (
            <Link key={p.title} className="pe-card" to={p.slug}>
              <div className="pe-card__icon"><Route size={22} /></div>
              <h3 className="pe-card__title">{p.title}</h3>
              <p className="pe-card__desc">{p.desc}</p>
              <div className="pe-card__meta"><span>Start path <ArrowRight size={13} style={{verticalAlign: '-2px'}} /></span></div>
            </Link>
          ))}
        </div>
        <div style={{textAlign: 'center', marginTop: '2rem'}}>
          <Link className="pe-btn pe-btn--ghost" to="/learning-paths">See all learning paths <ArrowRight size={16} /></Link>
        </div>
      </div>
    </section>
  );
}

function Architect(): React.JSX.Element {
  return (
    <section className={`pe-section ${styles.surface}`}>
      <div className="container">
        <div className="pe-section__head">
          <div className="pe-eyebrow">The Architect &amp; the Origin</div>
          <h2 className="pe-section__title">Who stands behind the stele</h2>
        </div>

        <div className="pe-people">
          <figure className="pe-people__maintainer">
            <img className="pe-people__avatar" src={ARCHITECT.avatar} alt={ARCHITECT.name} loading="lazy" width={96} height={96} />
            <figcaption className="pe-people__body">
              <span className="pe-people__badge">Project Architect</span>
              <p className="pe-people__name">{ARCHITECT.name}</p>
              <p className="pe-people__handle">@{ARCHITECT.handle}</p>
              <div className="pe-people__links">
                <a className="pe-iconbtn" href={ARCHITECT.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub"><Github size={18} /></a>
                <a className="pe-iconbtn" href={ARCHITECT.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram"><Instagram size={18} /></a>
                <a className="pe-iconbtn" href={ARCHITECT.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"><MessageCircle size={18} /></a>
              </div>
            </figcaption>
          </figure>

          <div className="pe-people__contrib">
            <h3 className="pe-people__contrib-title">
              <Pyramid size={20} /> Origin &amp; credits
            </h3>
            <p className="pe-card__desc" style={{marginBottom: '1rem'}}>
              <strong>SEKHEM</strong> is a redesign of <strong>PentestingEverything</strong>, created by
              Madhurendra Kumar (<code>m14r41</code>) and released under the MIT license.
              The original <code>LICENSE</code> and <code>NOTICE.md</code> are retained unchanged in the
              repository — full credit for the underlying knowledge base belongs to the original
              author and its contributors. The SEKHEM identity, theme and presentation are by
              Dev Ahmed Sabry.
            </p>
            <p className="pe-card__desc">
              Found your content here and it should be credited differently — or removed?
              Use the upstream takedown policy; requests are handled promptly, without dispute.
            </p>
            <div className="pe-people__actions">
              <a className="pe-btn pe-btn--primary pe-btn--sm" href={UPSTREAM_URL} target="_blank" rel="noopener noreferrer">
                <Github size={15} /> Original project — m14r41
              </a>
              <a className="pe-btn pe-btn--ghost pe-btn--sm" href={UPSTREAM_CONTENT_POLICY} target="_blank" rel="noopener noreferrer">
                Content &amp; takedown policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home(): React.JSX.Element {
  return (
    <Layout>
      <Head>
        <title>SEKHEM — The Pharaoh&rsquo;s Pentest Codex</title>
        <meta
          name="description"
          content="SEKHEM: an open-source, static, searchable penetration-testing codex — methodology, checklists, payloads and commands across web, API, cloud, mobile, network, AD & OSINT. Redesigned by Dev Ahmed Sabry; based on PentestingEverything (MIT)."
        />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="SEKHEM — The Pharaoh’s Pentest Codex" />
        <meta
          property="og:description"
          content="An open-source pentesting knowledge base spanning 24 domains: web, API, cloud, mobile, network, Active Directory, OSINT and more."
        />
        <meta name="twitter:title" content="SEKHEM — The Pharaoh’s Pentest Codex" />
        <meta
          name="twitter:description"
          content="Every door has a name. Open-source pentesting codex across 24 domains."
        />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Person',
            name: 'Dev Ahmed Sabry',
            url: 'https://sabriigsxr.github.io/sekhem/',
            sameAs: [
              'https://github.com/sabriigsxr',
              'https://www.instagram.com/ahmedsabriigsxr1000',
              'https://wa.me/201284123811',
            ],
          })}
        </script>
      </Head>
      <main>
        <Hero />
        <Relics />
        <Categories />
        <Features />
        <Paths />
        <Architect />
      </main>
    </Layout>
  );
}
