/**
 * IndieWiki build.
 *
 * Reads content/ and data/, checks everything, and writes a complete static
 * website to dist/. GitHub Actions runs this on every change; nobody needs to
 * run it on their own computer (though `npm run build` works if you want to).
 *
 * Environment variables (all optional):
 *   BASE_PATH          URL prefix when the site is not served at a domain root,
 *                      e.g. "/indiewiki" on username.github.io/indiewiki.
 *                      GitHub Actions fills this in automatically.
 *   GITHUB_REPOSITORY  "owner/repo"; used for "Edit this page" links.
 *   BUILD_DATE         YYYY-MM-DD; defaults to today (UTC).
 */
import { mkdirSync, rmSync, writeFileSync, readFileSync, cpSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadSite } from './lib/content.mjs';
import { createMarkdown, createEnv } from './lib/markdown.mjs';
import { readingMinutes, shortHash, plainText } from './lib/util.mjs';
import * as T from './lib/templates.mjs';
import * as F from './lib/feeds.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

/** Build the site. Returns { ok, problems, dist, ctx }. Writes nothing if content is invalid. */
export function build({ root = ROOT, out = join(root, 'dist'), base = process.env.BASE_PATH, quiet = false } = {}) {
  const buildDate = process.env.BUILD_DATE || new Date().toISOString().slice(0, 10);
  const loaded = loadSite(root, { today: buildDate });
  const problems = [...loaded.problems];
  const { site, sections, pages, categories, tools, glossary } = loaded;

  // ---- Context shared by every template ------------------------------------
  const basePath = (base || '').replace(/\/+$/, '');
  const repo = process.env.GITHUB_REPOSITORY || site.repo;
  const ctx = {
    site, sections, pages, categories, tools, glossary, buildDate,
    base: basePath,
    branch: site.branch || 'main',
    repoUrl: `https://github.com/${repo}`,
    stageCount: sections.filter((s) => !s.isMeta).length,
    url: (path) => `${basePath}${path}`,
    canonical: (path) => `${site.url}${path === '/index.html' ? '/' : path}`,
    // Reversed and base64-encoded so simple scrapers do not harvest the address.
    emailCode: Buffer.from([...site.email].reverse().join('')).toString('base64'),
  };
  ctx.stageTitle = (stage) => sections.find((s) => s.stage === stage)?.title || `Stage ${stage}`;
  ctx.pagesByPath = new Map(pages.map((p) => [p.path, p]));
  // Title and description for any linkable page: used by "Read next" boxes.
  ctx.linkInfo = (path) => {
    const page = ctx.pagesByPath.get(path);
    if (page) return { path, title: page.fm.title, description: page.fm.description };
    const section = sections.find((s) => s.path === path);
    if (section) return { path, title: `Stage ${section.stage}: ${section.title}`, description: section.description };
    const cat = categories.find((c) => c.path === path);
    if (cat) return { path, title: `Toolbox: ${cat.title}`, description: cat.description };
    return null;
  };

  const md = createMarkdown();
  const makeEnv = (path) => createEnv({ path, url: ctx.url, tools, glossary, emailCode: ctx.emailCode });
  const sharedEnv = makeEnv('/inline/');
  ctx.renderInline = (text, page) => md.renderInline(String(text), page ? page.env : sharedEnv);
  ctx.plainInline = (text) => plainText(String(text)
    .replace(/\[\[tool:([^\]]+)\]\]/g, (_, id) => tools.get(id)?.name || id)
    .replace(/\[\[term:([^\]]+)\]\]/g, (_, id) => glossary.get(id)?.term || id)
    .replace(/\[\[kbd:([^\]]+)\]\]/g, '$1'));

  // ---- Render Markdown --------------------------------------------------------
  for (const page of pages) {
    page.env = makeEnv(page.path);
    page.html = md.render(page.body, page.env);
    page.headings = page.env.headings;
    page.checklistItems = page.env.checklistItems;
    page.toolRefs = page.env.toolRefs;
    page.minutes = readingMinutes(page.body);
    if (page.fm.type === 'checklist' && page.checklistItems.length === 0) {
      problems.push(`${page.file}: type is "checklist" but the page has no "- [ ]" items.`);
    }
  }
  // FAQ answers are rendered inside the page, so links in them are checked too.
  for (const page of pages) for (const f of page.fm.faq || []) md.renderInline(String(f.a), page.env);
  for (const section of sections) {
    if (section.intro) {
      section.env = makeEnv(section.path);
      section.introHtml = md.render(section.intro, section.env);
    }
  }
  for (const cat of categories) {
    if (cat.intro) {
      cat.env = makeEnv(cat.path);
      cat.introHtml = md.render(cat.intro, cat.env);
    }
  }
  for (const g of glossary.values()) md.renderInline(g.definition, sharedEnv);

  // Which pages mention which tools (shown on Toolbox cards).
  ctx.toolUsage = new Map();
  for (const page of pages) for (const id of page.toolRefs) {
    if (!ctx.toolUsage.has(id)) ctx.toolUsage.set(id, []);
    ctx.toolUsage.get(id).push(page);
  }
  ctx.readingOrder = sections.filter((s) => !s.isMeta).flatMap((s) => s.pages);

  // ---- Known routes, used to check every internal link -------------------------
  const routes = new Map(); // path -> Set of anchor ids on that page
  const addRoute = (path, ids = []) => routes.set(path, new Set(ids));
  addRoute('/', []);
  for (const p of pages) addRoute(p.path, p.env.ids);
  for (const s of sections.filter((x) => !x.isMeta)) addRoute(s.path, ['pages', ...(s.env ? s.env.ids : [])]);
  addRoute('/tools/', []);
  for (const c of categories) addRoute(c.path, ['at-a-glance', ...c.tools.map((t) => t.id), ...(c.env ? c.env.ids : [])]);
  addRoute('/checklists/', []);
  addRoute('/glossary/', [...glossary.keys()]);
  addRoute('/updates/', []);
  addRoute('/search/', []);
  for (const file of ['/feed.xml', '/sitemap.xml', '/llms.txt', '/llms-full.txt', '/robots.txt', '/.well-known/security.txt']) addRoute(file, []);

  const staticDir = join(root, 'static');
  const checkEnv = (owner, env) => {
    if (!env) return;
    for (const e of env.errors) problems.push(`${owner}: ${e}`);
    for (const href of env.links) {
      const [pathAndQuery, hash] = href.split('#');
      const path = pathAndQuery.split('?')[0];
      if (!routes.has(path)) {
        if (existsSync(join(staticDir, path))) continue;
        problems.push(`${owner}: link to "${href}" goes nowhere. Pages end with "/", e.g. "/ship/seo-checklist/".`);
      } else if (hash && !routes.get(path).has(hash)) {
        problems.push(`${owner}: link to "${href}" points at a section that does not exist on that page.`);
      }
    }
    for (const id of env.anchors) if (!env.ids.has(id)) problems.push(`${owner}: in-page link "#${id}" has no matching heading.`);
    for (const src of env.images) if (!existsSync(join(staticDir, src))) problems.push(`${owner}: image "${src}" was not found in static${src}.`);
  };
  for (const p of pages) {
    checkEnv(p.file, p.env);
    for (const r of p.fm.related || []) if (!ctx.linkInfo(r)) problems.push(`${p.file}: "related" lists "${r}", which is not a page, stage or Toolbox list.`);
  }
  for (const s of sections) checkEnv(`content/${s.id}/index.md`, s.env);
  for (const c of categories) checkEnv(`data/tools/${c.id}.yml (intro)`, c.env);
  checkEnv('data/glossary.yml', sharedEnv);
  for (const g of glossary.values()) {
    if (g.see && !routes.has(g.see.split('#')[0])) problems.push(`data/glossary.yml (${g.id}): "see" points to "${g.see}", which is not a page.`);
  }
  for (const s of site.suggestions || []) if (typeof s !== 'string') problems.push('data/site.yml: "suggestions" must be a list of words.');

  if (problems.length) {
    if (!quiet) {
      console.error(`\nThe site was NOT built. Fix ${problems.length} problem${problems.length === 1 ? '' : 's'}:\n`);
      for (const p of [...new Set(problems)]) console.error(`  - ${p}`);
      console.error('');
    }
    return { ok: false, problems: [...new Set(problems)], ctx };
  }

  // ---- Write the site ------------------------------------------------------------
  rmSync(out, { recursive: true, force: true });
  mkdirSync(out, { recursive: true });
  cpSync(staticDir, out, { recursive: true });

  // Fonts come from npm packages (open source, SIL OFL) and are self-hosted:
  // no request ever goes to a font CDN, which is faster and more private.
  const fontSrc = join(root, 'node_modules/@fontsource-variable');
  const fonts = {
    'atkinson-next-latin.woff2': 'atkinson-hyperlegible-next/files/atkinson-hyperlegible-next-latin-wght-normal.woff2',
    'atkinson-next-latin-ext.woff2': 'atkinson-hyperlegible-next/files/atkinson-hyperlegible-next-latin-ext-wght-normal.woff2',
    'atkinson-next-latin-italic.woff2': 'atkinson-hyperlegible-next/files/atkinson-hyperlegible-next-latin-wght-italic.woff2',
    'atkinson-mono-latin.woff2': 'atkinson-hyperlegible-mono/files/atkinson-hyperlegible-mono-latin-wght-normal.woff2',
  };
  mkdirSync(join(out, 'assets/fonts'), { recursive: true });
  for (const [name, src] of Object.entries(fonts)) cpSync(join(fontSrc, src), join(out, 'assets/fonts', name));

  // Cache-busting: ?v=<hash of file> so visitors get new CSS/JS right after a deploy.
  const hashes = {};
  ctx.asset = (path) => {
    if (!hashes[path]) hashes[path] = shortHash(readFileSync(join(out, path)));
    return `${ctx.url(path)}?v=${hashes[path]}`;
  };

  const write = (path, html) => {
    const file = path.endsWith('/') ? join(out, path, 'index.html') : join(out, path);
    mkdirSync(dirname(file), { recursive: true });
    writeFileSync(file, html);
  };

  write('/', T.renderHome(ctx));
  for (const s of sections.filter((x) => !x.isMeta)) write(s.path, T.renderSection(ctx, s));
  for (const p of pages) write(p.path, T.renderDocPage(ctx, p));
  write('/tools/', T.renderToolsIndex(ctx));
  for (const c of categories) write(c.path, T.renderCategory(ctx, c));
  write('/checklists/', T.renderChecklists(ctx));
  write('/glossary/', T.renderGlossary(ctx));
  write('/updates/', T.renderUpdates(ctx));
  write('/search/', T.renderSearchPage(ctx));
  write('/404.html', T.renderNotFound(ctx));

  const sitemapEntries = [
    { path: '/', updated: buildDate },
    ...sections.filter((s) => !s.isMeta).map((s) => ({ path: s.path, updated: s.pages.map((p) => p.fm.updated).sort().at(-1) })),
    ...pages.map((p) => ({ path: p.path, updated: p.fm.updated })),
    { path: '/tools/', updated: buildDate },
    ...categories.map((c) => ({ path: c.path, updated: buildDate })),
    { path: '/checklists/' }, { path: '/glossary/' }, { path: '/updates/' },
  ];
  write('/sitemap.xml', F.sitemapXml(ctx, sitemapEntries));
  write('/robots.txt', F.robotsTxt(ctx));
  write('/feed.xml', F.atomFeed(ctx));
  write('/llms.txt', F.llmsTxt(ctx));
  write('/llms-full.txt', F.llmsFullTxt(ctx));
  write('/search-index.json', F.searchIndex(ctx));
  write('/.well-known/security.txt', F.securityTxt(ctx));
  write('/manifest.webmanifest', F.manifest(ctx));
  write('/.nojekyll', '');
  if (!basePath) write('/CNAME', `${new URL(site.url).hostname}\n`);

  if (!quiet) {
    const count = countHtml(out);
    console.log(`Built ${count} pages, ${tools.size} tools, ${glossary.size} glossary terms into ${out}${basePath ? ` (base path ${basePath})` : ''}.`);
    // Freshness report. Never fails the build; it tells maintainers what to re-check next.
    const monthsAgo = (iso) => {
      const [y, m] = iso.split('-').map(Number);
      const [by, bm] = buildDate.split('-').map(Number);
      return (by - y) * 12 + (bm - m);
    };
    const staleTools = [...tools.values()].filter((t) => monthsAgo(t.checked) >= 6);
    const stalePages = pages.filter((p) => monthsAgo(p.fm.updated) >= 12);
    if (staleTools.length || stalePages.length) {
      console.log('\nDue for a fact check (not an error):');
      for (const t of staleTools) console.log(`  - tool "${t.id}" in data/tools/${t.category.id}.yml, checked ${t.checked}`);
      for (const p of stalePages) console.log(`  - ${p.file}, reviewed ${p.fm.updated}`);
    }
  }
  return { ok: true, problems: [], dist: out, ctx };
}

function countHtml(dir) {
  let n = 0;
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) n += countHtml(p);
    else if (name.endsWith('.html')) n += 1;
  }
  return n;
}

// Run when called directly: `node src/build.mjs`
if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const result = build();
  if (!result.ok) process.exit(1);
}
