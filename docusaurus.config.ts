import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// --- Deployment identity -----------------------------------------------------
// SEKHEM — redesigned & maintained by Dev Ahmed Sabry.
// Content originates from PentestingEverything by m14r41 (MIT © 2023
// Madhurendra Kumar) — see LICENSE / NOTICE.md, retained unchanged.
// Everything is env-overridable for forks or alternate hosting.
const ORG = process.env.GH_ORG ?? 'sabriigsxr';
const REPO = process.env.GH_REPO ?? 'sekhem';
const SITE_URL = process.env.SITE_URL ?? 'https://sekhem.pages.dev';
const BASE_URL = process.env.BASE_URL ?? '/';
const GITHUB_URL = `https://github.com/${ORG}/${REPO}`;

const config: Config = {
  title: 'SEKHEM',
  tagline: 'The Pharaoh’s Pentest Codex — methodology, references and proof across every attack surface',
  favicon: 'img/brand.svg',

  url: SITE_URL,
  baseUrl: BASE_URL,

  organizationName: ORG,
  projectName: REPO,
  trailingSlash: false,
  deploymentBranch: 'gh-pages',

  // Messy upstream markdown — warn rather than fail so the build always completes,
  // while still surfacing issues in CI logs for incremental cleanup.
  onBrokenLinks: 'warn',
  onBrokenAnchors: 'warn',
  onDuplicateRoutes: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  // CommonMark-leaning parsing keeps the large body of hand-written markdown
  // (raw <details>, task lists, stray angle brackets) from breaking the build,
  // while still allowing real .mdx pages to use full MDX.
  markdown: {
    format: 'detect',
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },

  themes: [
    [
      // Fully static, build-time local search. No Algolia / external service.
      '@easyops-cn/docusaurus-search-local',
      {
        hashed: true,
        indexBlog: false,
        docsRouteBasePath: '/',
        highlightSearchTermsOnTargetPage: true,
        searchResultLimits: 20,
        searchResultContextMaxLength: 130,
        explicitSearchResultPath: true,
      },
    ],
  ],

  presets: [
    [
      'classic',
      {
        docs: {
          path: 'docs',
          routeBasePath: '/', // docs ARE the site
          sidebarPath: './sidebars.ts',
          showLastUpdateTime: true,
          // Per-page `custom_edit_url` (emitted by the migration script) points each
          // page at its true original source file in the repo.
          editUrl: undefined,
          breadcrumbs: true,
          sidebarCollapsible: true,
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
        sitemap: {
          changefreq: 'weekly',
          priority: 0.5,
          ignorePatterns: ['/tags/**'],
          filename: 'sitemap.xml',
        },
      } satisfies Preset.Options,
    ],
  ],

  headTags: [
    {
      tagName: 'meta',
      attributes: {name: 'robots', content: 'index, follow'},
    },
    {
      tagName: 'meta',
      attributes: {name: 'theme-color', content: '#0b0908'},
    },
  ],

  themeConfig: {
    image: 'img/social-card.svg',
    metadata: [
      {name: 'keywords', content: 'sekhem, pentesting, penetration testing, cybersecurity, offensive security, web security, cloud security, mobile security, OSINT, red team, bug bounty'},
      {name: 'twitter:card', content: 'summary_large_image'},
    ],
    colorMode: {
      defaultMode: 'dark',
      respectPrefersColorScheme: false,
    },
    docs: {
      sidebar: {
        hideable: true,
        autoCollapseCategories: false,
      },
    },
    navbar: {
      title: 'SEKHEM',
      logo: {
        alt: 'SEKHEM — The Pharaoh’s Pentest Codex',
        src: 'img/brand.svg',
      },
      hideOnScroll: false,
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'docsSidebar',
          position: 'left',
          label: 'The Codex',
        },
        {to: '/references', label: 'References', position: 'left'},
        {to: '/learning-paths', label: 'Learning Paths', position: 'left'},
        {to: '/contributing', label: 'Contribute', position: 'left'},
        {
          className: 'header-github-link',
          href: GITHUB_URL,
          position: 'right',
          'aria-label': 'GitHub — sabriigsxr/sekhem',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'The Codex',
          items: [
            {label: 'Start Pentesting', to: '/'},
            {label: 'Learning Paths', to: '/learning-paths'},
            {label: 'References Library', to: '/references'},
          ],
        },
        {
          title: 'Dev Ahmed Sabry',
          items: [
            {label: 'GitHub — sabriigsxr', href: 'https://github.com/sabriigsxr'},
            {label: 'Instagram — @ahmedsabriigsxr1000', href: 'https://www.instagram.com/ahmedsabriigsxr1000'},
            {label: 'WhatsApp — +20 128 412 3811', href: 'https://wa.me/201284123811'},
          ],
        },
        {
          title: 'Origin & License',
          items: [
            {label: 'Based on PentestingEverything (MIT)', href: 'https://github.com/m14r41/PentestingEverything'},
            {label: 'LICENSE & NOTICE (attribution)', href: 'https://github.com/sabriigsxr/sekhem/blob/main/NOTICE.md'},
            {label: 'Content & Attribution — m14r41', href: 'https://github.com/m14r41/PentestingEverything/blob/main/CONTENT_REMOVAL.md'},
          ],
        },
      ],
      copyright: `© ${new Date().getFullYear()} SEKHEM · Redesigned & maintained by <a href="https://github.com/sabriigsxr" target="_blank" rel="noopener noreferrer">Dev Ahmed Sabry</a> · Based on <a href="https://github.com/m14r41/PentestingEverything" target="_blank" rel="noopener noreferrer">PentestingEverything</a> © 2023 Madhurendra Kumar (MIT)`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: [
        'bash', 'powershell', 'python', 'php', 'ruby', 'java', 'go', 'rust',
        'sql', 'json', 'yaml', 'docker', 'nginx', 'http', 'markup-templating',
        'csharp', 'kotlin', 'swift', 'toml', 'ini', 'diff',
      ],
      magicComments: [
        {className: 'theme-code-block-highlighted-line', line: 'highlight-next-line', block: {start: 'highlight-start', end: 'highlight-end'}},
      ],
    },
    tableOfContents: {
      minHeadingLevel: 2,
      maxHeadingLevel: 4,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
