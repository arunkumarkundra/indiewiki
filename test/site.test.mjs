/**
 * Whole-site tests. Builds the real site into a temporary folder, then checks
 * every page for the things readers and search engines rely on: valid HTML,
 * working links, one H1, descriptions, canonical URLs, sharing tags,
 * structured data and a strict security policy.
 */
import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, rmSync, readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, relative, dirname } from 'node:path';
import { tmpdir } from 'node:os';
import { fileURLToPath } from 'node:url';
import { HtmlValidate } from 'html-validate';
import { build } from '../src/build.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
let out;
let outBase;
let result;
let SITE; // the site address from data/site.yml, e.g. https://indie.pi3.in
const pages = []; // { file, url, html }

function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const p = join(dir, name);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });
}

before(() => {
  out = mkdtempSync(join(tmpdir(), 'indiewiki-'));
  outBase = mkdtempSync(join(tmpdir(), 'indiewiki-base-'));
  result = build({ root: ROOT, out, base: '', quiet: true });
  assert.ok(result.ok, `build failed:\n${(result.problems || []).join('\n')}`);
  SITE = result.ctx.site.url;
  for (const file of walk(out).filter((f) => f.endsWith('.html'))) {
    const rel = `/${relative(out, file).replace(/\\/g, '/')}`;
    const url = rel.endsWith('/index.html') ? rel.slice(0, -'index.html'.length) : rel;
    pages.push({ file, url, html: readFileSync(file, 'utf8') });
  }
});

after(() => {
  rmSync(out, { recursive: true, force: true });
  rmSync(outBase, { recursive: true, force: true });
});

const all = (re, s) => [...s.matchAll(re)];

test('the site builds with every expected page and file', () => {
  assert.ok(pages.length > 60, `only ${pages.length} pages`);
  for (const f of ['index.html', '404.html', 'sitemap.xml', 'robots.txt', 'feed.xml', 'llms.txt', 'llms-full.txt',
    'search-index.json', 'manifest.webmanifest', '.well-known/security.txt', 'CNAME', '.nojekyll',
    'favicon.svg', 'favicon-32.png', 'apple-touch-icon.png', 'icon-192.png', 'icon-512.png', 'icon-maskable-512.png',
    'img/og-default.png', 'img/screenshot-wide.webp', 'img/screenshot-narrow.webp',
    'assets/css/site.css', 'assets/js/site.js', 'assets/js/theme.js', 'assets/fonts/atkinson-next-latin.woff2']) {
    assert.ok(existsSync(join(out, f)), `missing ${f}`);
  }
  assert.equal(readFileSync(join(out, 'CNAME'), 'utf8').trim(), new URL(SITE).hostname);
});

test('every page has exactly one H1, a title, a description and lang', () => {
  for (const p of pages) {
    assert.equal(all(/<h1[\s>]/g, p.html).length, 1, `${p.url} must have one <h1>`);
    assert.match(p.html, /<html lang="en"/, p.url);
    const title = /<title>([^<]+)<\/title>/.exec(p.html)?.[1];
    assert.ok(title && title.length <= 90, `${p.url} title: ${title}`);
    const desc = /<meta name="description" content="([^"]*)">/.exec(p.html)?.[1];
    assert.ok(desc && desc.length >= 40 && desc.length <= 200, `${p.url} description length ${desc?.length}`);
  }
});

test('indexable pages have canonical, Open Graph and Twitter tags; utility pages are noindex', () => {
  for (const p of pages) {
    const noindex = /<meta name="robots" content="noindex/.test(p.html);
    if (p.url === '/404.html' || p.url === '/search/') {
      assert.ok(noindex, `${p.url} should be noindex`);
      continue;
    }
    assert.ok(!noindex, `${p.url} must not be noindex`);
    const canonical = /<link rel="canonical" href="([^"]+)">/.exec(p.html)?.[1];
    assert.equal(canonical, `${SITE}${p.url}`, `${p.url} canonical`);
    for (const tag of ['og:title', 'og:description', 'og:image', 'og:url', 'og:type']) {
      assert.match(p.html, new RegExp(`<meta property="${tag}" content="[^"]+">`), `${p.url} ${tag}`);
    }
    assert.match(p.html, /<meta name="twitter:card" content="summary_large_image">/, p.url);
  }
});

test('strict security policy: no inline scripts, no inline styles, no third-party assets', () => {
  for (const p of pages) {
    assert.match(p.html, /<meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self'; style-src 'self';/, p.url);
    for (const m of all(/<script([^>]*)>([\s\S]*?)<\/script>/g, p.html)) {
      const attrs = m[1];
      if (/type="application\/ld\+json"/.test(attrs)) continue;
      assert.match(attrs, /src="\//, `${p.url} has an inline script`);
      assert.equal(m[2].trim(), '', `${p.url} script with src must be empty`);
    }
    assert.doesNotMatch(p.html, /\sstyle="/, `${p.url} has a style attribute (blocked by CSP)`);
    assert.doesNotMatch(p.html, /\son[a-z]+="/, `${p.url} has an inline event handler`);
    for (const m of all(/<(?:script|link)[^>]+(?:src|href)="(https?:)?\/\/[^"]+"/g, p.html)) {
      if (/rel="(canonical|alternate)"/.test(m[0])) continue;
      assert.fail(`${p.url} loads a third-party asset: ${m[0]}`);
    }
  }
});

test('structured data is valid JSON with a known type', () => {
  for (const p of pages) {
    for (const m of all(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g, p.html)) {
      const data = JSON.parse(m[1]);
      assert.equal(data['@context'], 'https://schema.org', p.url);
      assert.ok(['WebSite', 'BreadcrumbList', 'TechArticle', 'FAQPage', 'CollectionPage', 'ItemList', 'DefinedTermSet'].includes(data['@type']), `${p.url} ${data['@type']}`);
    }
  }
  const home = pages.find((p) => p.url === '/');
  assert.match(home.html, /"@type":"SearchAction"/);
});

test('every internal link and asset resolves, including #anchors', () => {
  const ids = new Map(pages.map((p) => [p.url, new Set(all(/\sid="([^"]+)"/g, p.html).map((m) => m[1]))]));
  const broken = [];
  for (const p of pages) {
    for (const m of all(/\s(?:href|src)="(\/[^"]*)"/g, p.html)) {
      const raw = m[1].replace(/&amp;/g, '&');
      if (raw.startsWith('//')) { broken.push(`${p.url}: protocol-relative ${raw}`); continue; }
      const [pathQ, hash] = raw.split('#');
      const path = decodeURIComponent(pathQ.split('?')[0]);
      const file = path.endsWith('/') ? join(out, path, 'index.html') : join(out, path);
      if (!existsSync(file)) { broken.push(`${p.url} -> ${raw}`); continue; }
      if (hash && path.endsWith('/') && !ids.get(path)?.has(hash)) broken.push(`${p.url} -> ${raw} (missing #${hash})`);
    }
    for (const m of all(/\shref="#([^"]+)"/g, p.html)) {
      if (!ids.get(p.url).has(m[1])) broken.push(`${p.url} -> #${m[1]}`);
    }
  }
  assert.deepEqual(broken, []);
});

test('HTML is valid', async () => {
  const validator = new HtmlValidate({
    extends: ['html-validate:recommended'],
    rules: {
      'no-trailing-whitespace': 'off',
      'void-style': 'off',
      'attribute-boolean-style': 'off',
      'no-inline-style': 'error',
      'long-title': 'off',
      'tel-non-breaking': 'off',
      'no-redundant-role': 'off',
      'prefer-native-element': ['error', { exclude: ['region'] }],
    },
  });
  const failures = [];
  for (const p of pages) {
    const report = await validator.validateString(p.html, p.file);
    if (!report.valid) {
      for (const r of report.results) for (const msg of r.messages) failures.push(`${p.url}:${msg.line}:${msg.column} ${msg.ruleId} ${msg.message}`);
    }
  }
  assert.deepEqual(failures.slice(0, 40), []);
});

test('sitemap lists every indexable page and robots.txt points to it', () => {
  const sitemap = readFileSync(join(out, 'sitemap.xml'), 'utf8');
  const locs = new Set(all(/<loc>([^<]+)<\/loc>/g, sitemap).map((m) => m[1]));
  for (const p of pages) {
    if (p.url === '/404.html' || p.url === '/search/') {
      assert.ok(!locs.has(`${SITE}${p.url}`), `${p.url} should not be in sitemap`);
    } else {
      assert.ok(locs.has(`${SITE}${p.url}`), `${p.url} missing from sitemap`);
    }
  }
  const robots = readFileSync(join(out, 'robots.txt'), 'utf8');
  assert.match(robots, /User-agent: \*\nAllow: \//);
  assert.ok(robots.includes(`Sitemap: ${SITE}/sitemap.xml`), 'robots.txt must point to the sitemap');
});

test('search index, feed, llms.txt, manifest and security.txt are well formed', () => {
  const index = JSON.parse(readFileSync(join(out, 'search-index.json'), 'utf8'));
  assert.ok(index.entries.length > 200);
  for (const e of index.entries) assert.ok(e.u.startsWith('/') && e.t && typeof e.d === 'string', JSON.stringify(e));
  assert.ok(index.entries.some((e) => e.k === 'Tool' && e.t === 'Resend'));

  const feed = readFileSync(join(out, 'feed.xml'), 'utf8');
  assert.match(feed, /^<\?xml version="1.0" encoding="utf-8"\?>\n<feed xmlns="http:\/\/www.w3.org\/2005\/Atom">/);

  const llms = readFileSync(join(out, 'llms.txt'), 'utf8');
  assert.match(llms, /^# IndieWiki\n\n> /);
  assert.doesNotMatch(readFileSync(join(out, 'llms-full.txt'), 'utf8'), /\[\[(tool|term|kbd):/);

  const manifest = JSON.parse(readFileSync(join(out, 'manifest.webmanifest'), 'utf8'));
  assert.equal(manifest.start_url, '/');
  assert.ok(manifest.icons.some((i) => i.purpose === 'maskable'));
  assert.ok(manifest.screenshots.some((s) => s.form_factor === 'wide') && manifest.screenshots.some((s) => s.form_factor === 'narrow'));

  const sec = readFileSync(join(out, '.well-known/security.txt'), 'utf8');
  assert.match(sec, /^Contact: https:\/\/github\.com\/.+\/security\/advisories\/new$/m);
  const expires = /^Expires: (.+)$/m.exec(sec)[1];
  assert.ok(new Date(expires) > new Date(), 'security.txt has expired');
});

test('the contact email never appears as plain text in the HTML', () => {
  const email = result.ctx.site.email;
  for (const p of pages) assert.ok(!p.html.includes(email), `${p.url} exposes ${email}`);
  assert.ok(!readFileSync(join(out, 'llms-full.txt'), 'utf8').includes(email));
});

test('a build under a base path (github.io/repo) prefixes every internal URL', () => {
  const r = build({ root: ROOT, out: outBase, base: '/indiewiki', quiet: true });
  assert.ok(r.ok);
  assert.ok(!existsSync(join(outBase, 'CNAME')), 'no CNAME when served under a base path');
  const html = readFileSync(join(outBase, 'ship/seo-checklist/index.html'), 'utf8');
  const bad = all(/\s(?:href|src)="(\/[^"]*)"/g, html).map((m) => m[1]).filter((u) => !u.startsWith('/indiewiki/'));
  assert.deepEqual(bad, []);
  assert.match(html, /<html lang="en" data-base="\/indiewiki">/);
  const manifest = JSON.parse(readFileSync(join(outBase, 'manifest.webmanifest'), 'utf8'));
  assert.equal(manifest.start_url, '/indiewiki/');
});
