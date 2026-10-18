/**
 * Machine-readable files: sitemap, robots.txt, Atom feed, llms.txt,
 * the search index, security.txt and the web app manifest.
 */
import { esc, plainText, truncate } from './util.mjs';
import { PAGE_TYPES, PRICING_MODELS } from './content.mjs';

export function sitemapXml(ctx, entries) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.map((e) => `  <url><loc>${esc(ctx.canonical(e.path))}</loc>${e.updated ? `<lastmod>${e.updated}</lastmod>` : ''}</url>`).join('\n')}
</urlset>
`;
}

export function robotsTxt(ctx) {
  // Everyone may crawl every page. Blocked: the search results page (it only
  // repeats what the rest of the site says) and the data file behind search.
  // Nothing secret is listed here, because anyone can read robots.txt.
  return `# ${ctx.site.name} welcomes search engines and AI crawlers.
User-agent: *
Allow: /
Disallow: /search/
Disallow: /search-index.json

Sitemap: ${ctx.site.url}/sitemap.xml
`;
}

export function atomFeed(ctx) {
  const items = ctx.pages.filter((p) => !p.section.isMeta)
    .sort((a, b) => b.fm.updated.localeCompare(a.fm.updated)).slice(0, 30);
  const newest = items[0]?.fm.updated || ctx.buildDate;
  return `<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>${esc(ctx.site.name)}: recently reviewed</title>
  <subtitle>${esc(ctx.site.tagline)}</subtitle>
  <link href="${ctx.site.url}/feed.xml" rel="self"/>
  <link href="${ctx.site.url}/"/>
  <id>${ctx.site.url}/</id>
  <updated>${newest}T00:00:00Z</updated>
  <author><name>${esc(ctx.site.name)} contributors</name></author>
${items.map((p) => `  <entry>
    <title>${esc(p.fm.title)}</title>
    <link href="${esc(ctx.canonical(p.path))}"/>
    <id>${esc(ctx.canonical(p.path))}</id>
    <updated>${p.fm.updated}T00:00:00Z</updated>
    <summary>${esc(p.fm.description)}</summary>
  </entry>`).join('\n')}
</feed>
`;
}

/** llms.txt: a short, structured map of the site for AI assistants (llmstxt.org). */
export function llmsTxt(ctx) {
  const lines = [
    `# ${ctx.site.name}`,
    '',
    `> ${ctx.site.description}`,
    '',
    'All content is free to read and reuse under CC BY-SA 4.0 with attribution. Every page shows the date an editor last reviewed it; prices in the Toolbox show the month they were checked.',
    '',
  ];
  for (const s of ctx.sections.filter((x) => !x.isMeta)) {
    lines.push(`## ${s.title}`, '');
    for (const p of s.pages) lines.push(`- [${p.fm.title}](${ctx.canonical(p.path)}): ${p.fm.description}`);
    lines.push('');
  }
  lines.push('## Toolbox', '');
  for (const c of ctx.categories) lines.push(`- [${c.title}](${ctx.canonical(c.path)}): ${c.description}`);
  lines.push('', '## Optional', '');
  lines.push(`- [Full text of every guide](${ctx.site.url}/llms-full.txt): all pages in one Markdown file`);
  lines.push(`- [Glossary](${ctx.canonical('/glossary/')}): plain definitions of common terms`);
  lines.push(`- [About and editorial policy](${ctx.canonical('/about/')})`);
  return `${lines.join('\n')}\n`;
}

/** llms-full.txt: every page as Markdown, plus the Toolbox as text. */
export function llmsFullTxt(ctx) {
  const parts = [`# ${ctx.site.name}: full text`, '', `Source: ${ctx.site.url}/ (CC BY-SA 4.0). Generated ${ctx.buildDate}.`, ''];
  for (const s of ctx.sections.filter((x) => !x.isMeta)) {
    for (const p of s.pages) {
      const body = p.body
        .replace(/\[\[tool:([^\]]+)\]\]/g, (_, id) => ctx.tools.get(id)?.name || id)
        .replace(/\[\[term:([^\]]+)\]\]/g, (_, id) => ctx.glossary.get(id)?.term || id)
        .replace(/\[\[kbd:([^\]]+)\]\]/g, '$1')
        .replace(/\[\[email:[^\]]+\]\]/g, `the contact page (${ctx.site.url}/contact/)`)
        .replace(/\]\(\//g, `](${ctx.site.url}/`);
      parts.push('---', '', `# ${p.fm.title}`, '', `URL: ${ctx.canonical(p.path)}`, `Reviewed: ${p.fm.updated}`, '', p.fm.description, '', body.trim(), '');
    }
  }
  parts.push('---', '', '# Toolbox', '');
  for (const c of ctx.categories) {
    parts.push(`## ${c.title}`, '', c.description, '');
    for (const t of c.tools) {
      parts.push(`### ${t.name}${t.pick ? ' (start here)' : ''}`, '', t.summary, '',
        `- Best for: ${t.best_for}`,
        `- Pricing: ${PRICING_MODELS[t.pricing.model]}. ${t.pricing.note} (checked ${t.checked})`,
        `- Strengths: ${t.pros.join('; ')}`,
        `- Trade-offs: ${t.cons.join('; ')}`,
        `- Website: ${t.url}`, '');
    }
  }
  return `${parts.join('\n')}\n`;
}

/** Compact index the browser downloads the first time someone searches. */
export function searchIndex(ctx) {
  const entries = [];
  for (const p of ctx.pages) {
    entries.push({
      u: p.path,
      t: p.fm.title,
      d: p.fm.description,
      s: p.section.isMeta ? 'About' : p.section.title,
      k: PAGE_TYPES[p.fm.type],
      h: p.headings.map((h) => h.text).join(' | '),
      g: (p.fm.tags || []).join(' '),
      x: truncate(plainText(p.html), 2400),
    });
  }
  for (const s of ctx.sections.filter((x) => !x.isMeta)) {
    entries.push({ u: s.path, t: s.title, d: s.description, s: `Stage ${s.stage}`, k: 'Stage', h: '', g: '', x: s.summary });
  }
  for (const c of ctx.categories) {
    entries.push({ u: c.path, t: c.title, d: c.description, s: 'Toolbox', k: 'Tool list', h: c.tools.map((t) => t.name).join(' | '), g: '', x: '' });
    for (const t of c.tools) {
      entries.push({
        u: `${c.path}#${t.id}`, t: t.name, d: t.summary, s: c.title, k: 'Tool',
        h: '', g: (t.tags || []).join(' '), x: `${t.best_for} ${t.pricing.note} ${t.pros.join(' ')} ${t.cons.join(' ')}`,
      });
    }
  }
  for (const g of ctx.glossary.values()) {
    entries.push({ u: `/glossary/#${g.id}`, t: g.term, d: truncate(ctx.plainInline(g.definition), 160), s: 'Glossary', k: 'Term', h: '', g: (g.aka || []).join(' '), x: '' });
  }
  for (const page of [['/tools/', 'Toolbox', 'All tool lists'], ['/checklists/', 'Checklists', 'Every checklist in one place'], ['/glossary/', 'Glossary', 'Plain definitions'], ['/updates/', 'Recently reviewed', 'Review dates for every page']]) {
    entries.push({ u: page[0], t: page[1], d: page[2], s: 'Reference', k: 'Page', h: '', g: '', x: '' });
  }
  return JSON.stringify({ v: 1, built: ctx.buildDate, entries });
}

/** /.well-known/security.txt (RFC 9116). Expires one year after each build. */
export function securityTxt(ctx) {
  const expires = new Date(`${ctx.buildDate}T00:00:00Z`);
  expires.setUTCFullYear(expires.getUTCFullYear() + 1);
  return `# Found a security problem on ${ctx.site.name}? Thank you. Please report it privately.
Contact: ${ctx.repoUrl}/security/advisories/new
Contact: mailto:${ctx.site.email}
Expires: ${expires.toISOString().replace(/\.\d{3}Z$/, '.000Z')}
Preferred-Languages: en
Canonical: ${ctx.site.url}/.well-known/security.txt
Policy: ${ctx.repoUrl}/blob/${ctx.branch}/SECURITY.md
`;
}

export function manifest(ctx) {
  return JSON.stringify({
    name: ctx.site.name,
    short_name: ctx.site.name,
    description: ctx.site.description,
    id: `${ctx.base}/`,
    start_url: `${ctx.base}/`,
    scope: `${ctx.base}/`,
    display: 'standalone',
    background_color: '#f6f7f5',
    theme_color: '#17202b',
    lang: ctx.site.language,
    categories: ['education', 'business', 'productivity'],
    icons: [
      { src: `${ctx.base}/favicon.svg`, sizes: 'any', type: 'image/svg+xml' },
      { src: `${ctx.base}/icon-192.png`, sizes: '192x192', type: 'image/png' },
      { src: `${ctx.base}/icon-512.png`, sizes: '512x512', type: 'image/png' },
      { src: `${ctx.base}/icon-maskable-512.png`, sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
    screenshots: [
      { src: `${ctx.base}/img/screenshot-wide.webp`, sizes: '1280x800', type: 'image/webp', form_factor: 'wide', label: `${ctx.site.name} home page on a laptop` },
      { src: `${ctx.base}/img/screenshot-narrow.webp`, sizes: '750x1334', type: 'image/webp', form_factor: 'narrow', label: `${ctx.site.name} checklist on a phone` },
    ],
  }, null, 2);
}

export { truncate };
