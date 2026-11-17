import React, {type ReactElement} from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import {Github, Instagram, MessageCircle, Globe} from 'lucide-react';
import styles from './styles.module.css';

interface FooterLinkItem {
  label: string;
  to?: string;
  href?: string;
}
interface FooterColumn {
  title: string;
  items: FooterLinkItem[];
}

const ARCHITECT = {
  name: 'Dev Ahmed Sabry',
  github: 'https://github.com/sabriigsxr',
  instagram: 'https://www.instagram.com/ahmedsabriigsxr1000',
  whatsapp: 'https://wa.me/201284123811',
};
const UPSTREAM_URL = 'https://github.com/m14r41/PentestingEverything';

function FooterLink({item}: {item: FooterLinkItem}): ReactElement {
  if (item.href) {
    return (
      <a href={item.href} target="_blank" rel="noopener noreferrer">
        {item.label}
      </a>
    );
  }
  return <Link to={item.to ?? '#'}>{item.label}</Link>;
}

/**
 * Custom footer (swizzled). Replaces the default link grid with a branded layout:
 * a brand/description block with social + companion links, the configured link
 * columns, and a meta bar with a dynamic copyright year.
 */
export default function Footer(): ReactElement {
  const {siteConfig} = useDocusaurusContext();
  const logo = useBaseUrl('img/brand.svg');
  const themeFooter = (
    siteConfig.themeConfig as {
      footer?: {links?: FooterColumn[]; copyright?: string};
    }
  ).footer;
  const columns = themeFooter?.links ?? [];
  const copyright = themeFooter?.copyright;

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.top}>
          <div className={styles.brand}>
            <div className={styles.brandTitle}>
              <img src={logo} alt="" width={30} height={30} />
              <span>{siteConfig.title}</span>
            </div>
            <p className={styles.brandDesc}>
              SEKHEM — the Pharaoh&apos;s pentest codex. A static, searchable,
              offline-capable knowledge base of real-world penetration testing:
              methodology, payloads, commands, and field references across 23 domains.
              Redesigned &amp; maintained by Dev Ahmed Sabry; originally created by
              m14r41 (MIT).
            </p>
            <div className={styles.social}>
              <a
                className={styles.iconBtn}
                href={ARCHITECT.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub — sabriigsxr">
                <Github size={18} />
              </a>
              <a
                className={styles.iconBtn}
                href={ARCHITECT.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram — @ahmedsabriigsxr1000">
                <Instagram size={18} />
              </a>
              <a
                className={styles.iconBtn}
                href={ARCHITECT.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp — +20 128 412 3811">
                <MessageCircle size={18} />
              </a>
              <a
                className={styles.iconBtn}
                href={UPSTREAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Original project — PentestingEverything by m14r41 (MIT)">
                <Globe size={18} />
              </a>
            </div>
          </div>

          <div className={styles.columns}>
            {columns.map((col) => (
              <div key={col.title} className={styles.column}>
                <h3>{col.title}</h3>
                <ul>
                  {col.items.map((item) => (
                    <li key={item.label}>
                      <FooterLink item={item} />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.meta}>
          {copyright ? (
            <span dangerouslySetInnerHTML={{__html: copyright}} />
          ) : (
            <span>
              © {new Date().getFullYear()} {siteConfig.title}
            </span>
          )}
          <span className={styles.metaRight}>
            Based on{' '}
            <a href="https://github.com/m14r41/PentestingEverything" target="_blank" rel="noopener noreferrer">
              PentestingEverything
            </a>{' '}
            (MIT) · Redesigned by{' '}
            <a href="https://github.com/sabriigsxr" target="_blank" rel="noopener noreferrer">
              Dev Ahmed Sabry
            </a>{' '}
            · <a href="https://wa.me/201284123811" target="_blank" rel="noopener noreferrer">+20 128 412 3811</a>
          </span>
        </div>
        <div className={styles.metaCredits}>
          <a href="https://github.com/sabriigsxr" target="_blank" rel="noopener noreferrer">github.com/sabriigsxr</a>
          <span aria-hidden="true">◆</span>
          <a href="https://www.instagram.com/ahmedsabriigsxr1000" target="_blank" rel="noopener noreferrer">instagram.com/ahmedsabriigsxr1000</a>
          <span aria-hidden="true">◆</span>
          <a href="https://wa.me/201284123811" target="_blank" rel="noopener noreferrer">wa.me/201284123811</a>
        </div>
      </div>
    </footer>
  );
}
