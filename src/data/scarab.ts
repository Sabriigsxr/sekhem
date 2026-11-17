/**
 * The Scarab — SEKHEM's checklist ledger.
 * Content is ORIGINAL (author: Dev Ahmed Sabry), aligned to public guidance
 * (OWASP WSTG / OWASP API Security Top 10 / NIST), paraphrased in our own words.
 * Do NOT paste third-party checklist text here.
 */

export type Severity = 'critical' | 'high' | 'medium' | 'low' | 'info';

export interface ScarabCheck {
  id: string;
  title: string;
  severity: Severity;
}
export interface ScarabGroup {
  id: string;
  title: string;
  why: string;
  checks: ScarabCheck[];
}
export interface ScarabPlatform {
  id: string;
  title: string;
  tagline: string;
  groups: ScarabGroup[];
}

export const SCARAB_PLATFORMS: ScarabPlatform[] = [
  {
    id: 'webapp',
    title: 'Web Application',
    tagline: 'From fingerprinting to business-logic abuse — the full loop.',
    groups: [
      {
        id: 'webapp-recon',
        title: 'Information Gathering',
        why: 'Map the surface before touching it; most findings start as leaked signal.',
        checks: [
          {id: 'webapp.recon.dns', title: 'Enumerate DNS records and zone-transfers; list every subdomain in scope.', severity: 'info'},
          {id: 'webapp.recon.certs', title: 'Mine certificate transparency logs for forgotten hosts and internal names.', severity: 'info'},
          {id: 'webapp.recon.dirs', title: 'Brute-force directories, files and backup artifacts; check traversal and listable paths.', severity: 'medium'},
          {id: 'webapp.recon.js', title: 'Read shipped JavaScript for secrets, endpoints and dangerous sinks; check source maps.', severity: 'medium'},
          {id: 'webapp.recon.meta', title: 'Check robots.txt, sitemap, security.txt, .well-known paths and metafile leaks.', severity: 'info'},
          {id: 'webapp.recon.stack', title: 'Fingerprint framework, server, CMS and CDN; note versions and EOL warnings.', severity: 'info'},
          {id: 'webapp.recon.waf', title: 'Detect WAF/CDN and note which paths bypass it; adjust testing to that reality.', severity: 'low'},
          {id: 'webapp.recon.defaults', title: 'Probe for default install pages, sample apps and forgotten admin consoles.', severity: 'high'},
        ],
      },
      {
        id: 'webapp-authn',
        title: 'Authentication & Sessions',
        why: 'Account takeover lives here — credentials, tokens, recovery flows.',
        checks: [
          {id: 'webapp.authn.password-policy', title: 'Verify password length/strength rules and breached-password rejection.', severity: 'medium'},
          {id: 'webapp.authn.mfa', title: 'Confirm MFA enforcement and attempt bypass (enrollment flow, step-up, recovery).', severity: 'critical'},
          {id: 'webapp.authn.jwt', title: 'Attack JWT verification: algorithm confusion, none alg, kid injection, weak HMAC secrets.', severity: 'critical'},
          {id: 'webapp.authn.oauth', title: 'Test OAuth/OIDC redirect_uri handling, state/nonce, and PKCE enforcement.', severity: 'high'},
          {id: 'webapp.authn.session', title: 'Check session issuance, fixation, rotation on login, idle/absolute timeout, logout invalidation.', severity: 'high'},
          {id: 'webapp.authn.lockout', title: 'Test lockout, rate limiting and brute-force resistance; try credential-stuffing shape.', severity: 'high'},
          {id: 'webapp.authn.recovery', title: 'Walk the password-reset flow end to end: token predictability, lifetime, single use, host header poisoning.', severity: 'critical'},
          {id: 'webapp.authn.cookies', title: 'Verify cookie flags (HttpOnly, Secure, SameSite) and scoping; confirm no secrets in URL fragments.', severity: 'medium'},
          {id: 'webapp.authn.credential-exposure', title: 'Hunt credentials in URLs, logs, error messages, and localStorage/sessionStorage.', severity: 'high'},
        ],
      },
      {
        id: 'webapp-authz',
        title: 'Access Control & Multi-Tenancy',
        why: 'The bugs scanners miss — authorization is business-logic shaped.',
        checks: [
          {id: 'webapp.authz.idor', title: 'Probe every object reference (ids, uuids, slugs) for missing object-level authorization.', severity: 'critical'},
          {id: 'webapp.authz.vertical', title: 'Attempt vertical escalation: user → admin functions via forced browsing and method tampering.', severity: 'critical'},
          {id: 'webapp.authz.horizontal', title: 'Attempt horizontal escalation: read/modify another user’s objects and actions.', severity: 'high'},
          {id: 'webapp.authz.mass-assignment', title: 'Inject unexpected fields (role, is_admin, price) into bindable bodies; watch for autobinding.', severity: 'high'},
          {id: 'webapp.authz.tenant', title: 'Test multi-tenancy isolation: cross-tenant reads, writes, and enumeration by id.', severity: 'critical'},
          {id: 'webapp.authz.rbac', title: 'Build the role/permission matrix; verify enforcement server-side on every action.', severity: 'high'},
          {id: 'webapp.authz.forced-browsing', title: 'Enumerate unlinked admin/debug/internal endpoints and verbs (TRACE, PUT, DELETE, PATCH).', severity: 'medium'},
        ],
      },
      {
        id: 'webapp-injection',
        title: 'Input Handling & Injection',
        why: 'Wherever untrusted input meets an interpreter — SQL to templates to browsers.',
        checks: [
          {id: 'webapp.inject.sqli', title: 'Test parameters for SQL injection (error-based, boolean, time-based, out-of-band).', severity: 'critical'},
          {id: 'webapp.inject.nosqli', title: 'Test JSON/NoSQL endpoints for operator injection and JavaScript evaluation.', severity: 'high'},
          {id: 'webapp.inject.os-command', title: 'Probe any parameter reaching system calls, converters or image processors.', severity: 'critical'},
          {id: 'webapp.inject.ssti', title: 'Test template rendering for Server-Side Template Injection; escalate to RCE proof-of-concept.', severity: 'critical'},
          {id: 'webapp.inject.xxe', title: 'Test XML parsers for XXE and entity expansion; include SAML and file-upload vectors.', severity: 'high'},
          {id: 'webapp.inject.ldap', title: 'Test LDAP filters for injection and authentication bypass.', severity: 'high'},
          {id: 'webapp.inject.xss', title: 'Test reflected, stored and DOM XSS with context-aware payloads and CSP evasion.', severity: 'high'},
          {id: 'webapp.inject.ssrf', title: 'Test server-side request paths for SSRF: metadata endpoints, internal services, redirect chains.', severity: 'critical'},
          {id: 'webapp.inject.redirect', title: 'Test open redirects in parameters, OAuth flows and post-login return URLs.', severity: 'medium'},
          {id: 'webapp.inject.deserialization', title: 'Inspect serialization sinks (Java, PHP, Python, .NET) and gadget-chain reachability.', severity: 'high'},
          {id: 'webapp.inject.upload', title: 'Exercise upload handling: extension/MIME bypass, web shell placement, path traversal, polyglots.', severity: 'critical'},
        ],
      },
      {
        id: 'webapp-config',
        title: 'Configuration & Transport',
        why: 'Misconfigurations are silent vulnerabilities with loud impact.',
        checks: [
          {id: 'webapp.config.tls', title: 'Verify TLS versions, cipher suites, HSTS, and certificate chain; flag downgrade paths.', severity: 'high'},
          {id: 'webapp.config.headers', title: 'Check CSP, X-Content-Type-Options, frame-ancestors / X-Frame-Options, Referrer-Policy, Permissions-Policy.', severity: 'medium'},
          {id: 'webapp.config.cors', title: 'Test CORS for origin reflection, null origin, and credentialed cross-origin access.', severity: 'high'},
          {id: 'webapp.config.errors', title: 'Trigger errors and confirm no stack traces, framework versions or internal paths leak.', severity: 'low'},
          {id: 'webapp.config.debug', title: 'Probe for debug endpoints, actuator/metrics, environment dumps and console access.', severity: 'high'},
          {id: 'webapp.config.secrets', title: 'Hunt committed secrets in repo, CI configs, and build artifacts; check git history.', severity: 'critical'},
          {id: 'webapp.config.dmrac', title: 'Verify SPF, DKIM and DMARC posture for the sending domain.', severity: 'medium'},
          {id: 'webapp.config.takeover', title: 'Check dangling CNAMEs and orphaned cloud resources for subdomain takeover.', severity: 'high'},
        ],
      },
      {
        id: 'webapp-logic',
        title: 'Business Logic & Abuse',
        why: 'The workflow flaws that reward creativity — where money and rules leak.',
        checks: [
          {id: 'webapp.logic.price', title: 'Tamper with prices, quantities, totals, and discount logic; server must own the math.', severity: 'high'},
          {id: 'webapp.logic.workflow', title: 'Skip, replay or reorder multi-step flows; test client-side trust of order and state.', severity: 'high'},
          {id: 'webapp.logic.race', title: 'Race the critical actions: redeem, withdraw, apply-coupon, vote, claim-reward.', severity: 'high'},
          {id: 'webapp.logic.abuse', title: 'Test anti-automation on sensitive actions: resend, enumerate, mass-signup, gift-flood.', severity: 'medium'},
          {id: 'webapp.logic.rate-limit', title: 'Verify rate limits on auth, reset, OTP, and any costly endpoint; test bypass via IP rotation headers.', severity: 'medium'},
        ],
      },
    ],
  },
  {
    id: 'api',
    title: 'API (REST & GraphQL)',
    tagline: 'Object-level, function-level, and everything in between.',
    groups: [
      {
        id: 'api-inventory',
        title: 'Discovery & Inventory',
        why: 'You cannot attack what you cannot see — map every route and version first.',
        checks: [
          {id: 'api.inventory.docs', title: 'Find OpenAPI/Swagger, GraphQL introspection and legacy version endpoints; diff them.', severity: 'info'},
          {id: 'api.inventory.shadow', title: 'Hunt shadow/zombie routes: old versions, debug paths, unused partners.', severity: 'medium'},
          {id: 'api.inventory.methods', title: 'Enumerate verbs per route (OPTIONS, PUT, PATCH, DELETE) and note drift vs docs.', severity: 'info'},
          {id: 'api.inventory.authn-required', title: 'Confirm every route actually enforces auth — no accidental public doors.', severity: 'critical'},
        ],
      },
      {
        id: 'api-access',
        title: 'Authorization',
        why: 'API #1 and #5 of the OWASP API Top 10 live here — always the first stop.',
        checks: [
          {id: 'api.authz.bola', title: 'Test object-level authorization (BOLA/IDOR): swap ids across users on every object route.', severity: 'critical'},
          {id: 'api.authz.bfla', title: 'Test function-level authorization (BFLA): user calling admin functions via method/path tampering.', severity: 'critical'},
          {id: 'api.authz.mass-assignment', title: 'Bind unexpected writeable fields (role, owner, verified) in POST/PATCH bodies.', severity: 'high'},
          {id: 'api.authz.tenant', title: 'Test tenant isolation on read/write/delete and on list endpoints.', severity: 'critical'},
        ],
      },
      {
        id: 'api-authn',
        title: 'Authentication & Keys',
        why: 'Tokens, keys and sessions — what the API trusts to say who you are.',
        checks: [
          {id: 'api.authn.jwt', title: 'Attack JWT handling: algorithm confusion, weak HMAC keys, kid/header injection, missing expiry checks.', severity: 'critical'},
          {id: 'api.authn.keys', title: 'Hunt API keys in repos, mobile apps, and docs; test key scope and rotation.', severity: 'high'},
          {id: 'api.authn.oauth', title: 'Test OAuth/OIDC flows, PKCE, redirect URIs and token leakage via referrers.', severity: 'high'},
          {id: 'api.authn.session', title: 'Check session/token invalidation on logout and on password change.', severity: 'medium'},
        ],
      },
      {
        id: 'api-consumption',
        title: 'Resource Consumption & Abuse',
        why: 'APIs fail quietly — then fall over from the traffic designed to feed them.',
        checks: [
          {id: 'api.excess.rate-limit', title: 'Verify rate limiting per key/user/IP; test header-based bypasses and burst shape.', severity: 'medium'},
          {id: 'api.excess.payload', title: 'Test oversized payloads, deeply nested JSON, and pagination abuse for DoS.', severity: 'medium'},
          {id: 'api.excess.cost', title: 'Identify costly endpoints (export, report, generate) and confirm quotas/timeouts exist.', severity: 'medium'},
          {id: 'api.excess.ssrf', title: 'Test URL-accepting fields for SSRF, including redirect follow on the server side.', severity: 'critical'},
        ],
      },
      {
        id: 'api-data',
        title: 'Data Exposure & Injection',
        why: 'Responses are the leak; every field returned is a decision, not a default.',
        checks: [
          {id: 'api.data.excessive', title: 'Diff documented vs actual responses; flag over-fetched PII and internal fields.', severity: 'high'},
          {id: 'api.data.error', title: 'Force errors and inspect messages for internals: stack traces, queries, versions.', severity: 'low'},
          {id: 'api.data.sql', title: 'Test query parameters for SQL/NoSQL injection, including sort/filter/search fields.', severity: 'high'},
          {id: 'api.data.graphql', title: 'Test GraphQL introspection, batching, depth/complexity limits, and alias-based brute force.', severity: 'high'},
        ],
      },
    ],
  },
];

export const SCARAB_STORAGE_KEY = 'sekhem.scarab.v1';
export const SCARAB_VERSION = 1 as const;
