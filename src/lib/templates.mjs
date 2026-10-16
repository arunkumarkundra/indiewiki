/**
 * HTML templates. Plain functions that return strings: easy to read, no
 * framework to learn. Every value that comes from content is escaped with
 * esc() unless it is HTML we rendered ourselves from Markdown.
 *
 * Security notes that shape this file:
 *  - No inline <script> code and no style="" attributes anywhere, so the
 *    Content-Security-Policy can stay strict ('self' only).
 *  - JSON-LD blocks are data, not code, and are serialised safely.
 */
import { esc, humanDate, monthYear } from './util.mjs';
import { icons, logoMark } from './icons.mjs';
import { PAGE_TYPES, PRICING_MODELS } from './content.mjs';

export const CSP = [
  "default-src 'self'",
  "script-src 'self'",
  "style-src 'self'",
  "img-src 'self' data:",
  "font-src 'self'",
  "connect-src 'self'",
  "manifest-src 'self'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  'upgrade-insecure-requests',
].join('; ');

/** Serialise structured data so "</script>" inside text cannot break out. */
function jsonLd(data) {
  const json = JSON.stringify(data).replace(/</g, '\\u003c').replace(/>/g, '\\u003e').replace(/&/g, '\\u0026');
  return `<script type="application/ld+json">${json}</script>`;
}

/* ------------------------------------------------------------------------ */
/* Shared chrome                                                             */
/* ------------------------------------------------------------------------ */

function head(ctx, p) {
  const { site } = ctx;
  const fullTitle = p.path === '/' ? `${site.name}: ${site.tagline}` : `${p.title} | ${site.name}`;
  const canonical = ctx.canonical(p.path);
  const image = `${site.url}/img/og-default.png`;
  const robots = p.noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large';
  return `<!DOCTYPE html>
<html lang="${esc(site.language)}" data-base="${esc(ctx.base)}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta http-equiv="Content-Security-Policy" content="${CSP}">
<meta name="referrer" content="strict-origin-when-cross-origin">
<title>${esc(fullTitle)}</title>
<meta name="description" content="${esc(p.description)}">
<meta name="robots" content="${robots}">
${p.noindex ? '' : `<link rel="canonical" href="${esc(canonical)}">\n`}<meta name="theme-color" content="#f6f7f5" media="(prefers-color-scheme: light)">
<meta name="theme-color" content="#11161d" media="(prefers-color-scheme: dark)">
<meta name="color-scheme" content="light dark">
<link rel="icon" href="${ctx.url('/favicon.svg')}" type="image/svg+xml">
<link rel="icon" href="${ctx.url('/favicon-32.png')}" type="image/png" sizes="32x32">
<link rel="apple-touch-icon" href="${ctx.url('/apple-touch-icon.png')}">
<link rel="manifest" href="${ctx.url('/manifest.webmanifest')}">
<link rel="alternate" type="application/atom+xml" title="${esc(site.name)} updates" href="${ctx.url('/feed.xml')}">
<link rel="preload" href="${ctx.url('/assets/fonts/atkinson-next-latin.woff2')}" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="${ctx.asset('/assets/css/site.css')}">
<script src="${ctx.asset('/assets/js/theme.js')}"></script>
<script src="${ctx.asset('/assets/js/site.js')}" defer></script>
<meta property="og:type" content="${p.ogType || 'website'}">
<meta property="og:site_name" content="${esc(site.name)}">
<meta property="og:title" content="${esc(p.path === '/' ? fullTitle : p.title)}">
<meta property="og:description" content="${esc(p.description)}">
<meta property="og:url" content="${esc(canonical)}">
<meta property="og:image" content="${image}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="${esc(site.name)}: ${esc(site.tagline)}">
<meta property="og:locale" content="en_US">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(p.path === '/' ? fullTitle : p.title)}">
<meta name="twitter:description" content="${esc(p.description)}">
<meta name="twitter:image" content="${image}">
${p.updated ? `<meta property="article:modified_time" content="${p.updated}">\n` : ''}${(p.jsonLd || []).map(jsonLd).join('\n')}
</head>`;
}

function header(ctx, activeTop) {
  const top = [
    ['/tools/', 'Toolbox'],
    ['/checklists/', 'Checklists'],
    ['/contribute/', 'Contribute'],
  ];
  return `<a class="skip-link" href="#main">Skip to content</a>
<header class="site-header">
  <div class="site-header__inner">
    <button class="icon-btn nav-toggle" type="button" aria-controls="site-nav" aria-expanded="false">${icons.menu}<span class="visually-hidden">Open menu</span></button>
    <a class="brand" href="${ctx.url('/')}">${logoMark}<span class="brand__name">${esc(ctx.site.name)}</span></a>
    <form class="search" role="search" aria-label="Site search" action="${ctx.url('/search/')}" method="get" data-search>
      <label class="visually-hidden" for="search-input">Search ${esc(ctx.site.name)}</label>
      <span class="search__icon">${icons.search}</span>
      <input class="search__input" id="search-input" name="q" type="search" placeholder="Search the wiki" autocomplete="off" spellcheck="false" maxlength="80" aria-describedby="search-hint" data-search-input>
      <span class="visually-hidden" id="search-hint">Press slash on any page to jump here.</span>
      <kbd class="search__key" aria-hidden="true">/</kbd>
      <button class="visually-hidden" type="submit" tabindex="-1">Search</button>
      <div class="search__panel" data-search-panel hidden>
        <p class="search__status" role="status" aria-live="polite" data-search-status></p>
        <ul class="search__results" data-search-results></ul>
      </div>
    </form>
    <nav class="top-links" aria-label="Main">
      <ul>${top.map(([href, label]) => `<li><a href="${ctx.url(href)}"${activeTop === href ? ' aria-current="page"' : ''}>${label}</a></li>`).join('')}</ul>
    </nav>
    <button class="icon-btn theme-toggle" type="button" data-theme-toggle aria-pressed="false">
      <span class="theme-toggle__dark">${icons.moon}</span><span class="theme-toggle__light">${icons.sun}</span>
      <span class="visually-hidden">Dark theme</span>
    </button>
  </div>
</header>`;
}

function footer(ctx) {
  const { site } = ctx;
  const year = ctx.buildDate.slice(0, 4);
  const stages = ctx.sections.filter((s) => !s.isMeta);
  return `<footer class="site-footer">
  <div class="site-footer__inner">
    <div class="site-footer__about">
      <a class="brand brand--footer" href="${ctx.url('/')}">${logoMark}<span class="brand__name">${esc(site.name)}</span></a>
      <p>${esc(site.tagline)}. Free to read, open to edit. Text is shared under ${esc(site.contentLicense)}.</p>
    </div>
    <nav class="site-footer__nav" aria-label="Footer">
      <div><h2>The route</h2><ul>${stages.map((s) => `<li><a href="${ctx.url(s.path)}">${esc(s.title)}</a></li>`).join('')}</ul></div>
      <div><h2>Reference</h2><ul>
        <li><a href="${ctx.url('/tools/')}">Toolbox</a></li>
        <li><a href="${ctx.url('/checklists/')}">Checklists</a></li>
        <li><a href="${ctx.url('/glossary/')}">Glossary</a></li>
        <li><a href="${ctx.url('/updates/')}">Recently reviewed</a></li>
      </ul></div>
      <div><h2>The project</h2><ul>
        <li><a href="${ctx.url('/about/')}">About and editorial policy</a></li>
        <li><a href="${ctx.url('/contribute/')}">How to contribute</a></li>
        <li><a href="${esc(ctx.repoUrl)}">Source on GitHub</a></li>
        <li><a href="${ctx.url('/feed.xml')}">Updates feed (Atom)</a></li>
      </ul></div>
    </nav>
  </div>
  <div class="site-footer__legal">
    <p>&copy; ${year} <a href="${esc(site.ownerUrl)}">${esc(site.owner)}</a></p>
    <ul>
      <li><a href="${ctx.url('/privacy/')}">Privacy</a></li>
      <li><a href="${ctx.url('/terms/')}">Terms</a></li>
      <li><a href="${ctx.url('/contact/')}" data-email="${esc(ctx.emailCode)}">Contact</a></li>
    </ul>
  </div>
</footer>`;
}

/** Left navigation: every stage and its pages, then reference pages. */
function sidebar(ctx, currentPath) {
  const stageList = ctx.sections.filter((s) => !s.isMeta).map((s) => {
    const inSection = currentPath.startsWith(s.path);
    const items = s.pages.map((p) =>
      `<li><a href="${ctx.url(p.path)}"${p.path === currentPath ? ' aria-current="page"' : ''}>${esc(p.fm.nav_title || p.fm.title)}</a></li>`).join('');
    return `<li class="nav-group${inSection ? ' is-open' : ''}">
      <a class="nav-group__title" href="${ctx.url(s.path)}"${s.path === currentPath ? ' aria-current="page"' : ''}><span class="nav-group__num">${s.stage}</span>${esc(s.title)}</a>
      <ul class="nav-group__items">${items}</ul>
    </li>`;
  }).join('');
  const ref = [['/tools/', 'Toolbox'], ['/checklists/', 'All checklists'], ['/glossary/', 'Glossary'], ['/updates/', 'Recently reviewed']];
  return `<nav class="sidebar" id="site-nav" aria-label="Wiki" data-nav>
  <div class="sidebar__head"><span class="sidebar__label">Menu</span><button class="icon-btn nav-close" type="button" data-nav-close>${icons.close}<span class="visually-hidden">Close menu</span></button></div>
  <p class="sidebar__heading">The route</p>
  <ol class="nav-stages">${stageList}</ol>
  <p class="sidebar__heading">Reference</p>
  <ul class="nav-ref">${ref.map(([h, l]) => `<li><a href="${ctx.url(h)}"${currentPath.startsWith(h) ? ' aria-current="page"' : ''}>${l}</a></li>`).join('')}</ul>
  <p class="sidebar__heading">Mobile shortcuts</p>
  <ul class="nav-ref nav-ref--mobile"><li><a href="${ctx.url('/contribute/')}">Contribute</a></li><li><a href="${ctx.url('/about/')}">About</a></li></ul>
</nav>`;
}

function breadcrumbs(ctx, trail) {
  return `<nav class="breadcrumbs" aria-label="Breadcrumb"><ol>${trail.map((c, i) =>
    i === trail.length - 1
      ? `<li><span aria-current="page">${esc(c.title)}</span></li>`
      : `<li><a href="${ctx.url(c.path)}">${esc(c.title)}</a></li>`).join('')}</ol></nav>`;
}

function breadcrumbLd(ctx, trail) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.title, item: ctx.canonical(c.path) })),
  };
}

/** Wrap a page body in the full document. `shell` = sidebar layout or plain wide layout. */
export function documentPage(ctx, p, mainHtml, { shell = 'docs', toc = '' } = {}) {
  const body = shell === 'docs'
    ? `<div class="shell${toc ? ' shell--toc' : ''}">
${sidebar(ctx, p.path)}
<main id="main" class="main" tabindex="-1">${mainHtml}</main>
${toc}
</div>`
    : `<main id="main" class="main main--wide" tabindex="-1">${mainHtml}</main>`;
  return `${head(ctx, p)}
<body class="page-${esc(p.kind || 'doc')}">
${header(ctx, p.activeTop)}
${body}
${footer(ctx)}
<div class="toast" role="status" aria-live="polite" data-toast hidden></div>
<div class="nav-scrim" data-nav-scrim hidden></div>
</body>
</html>
`;
}

/* ------------------------------------------------------------------------ */
/* Content page                                                              */
/* ------------------------------------------------------------------------ */

function tocHtml(headings) {
  const h2s = headings.filter((h) => h.level === 2);
  if (h2s.length < 2) return '';
  return `<aside class="toc" aria-labelledby="toc-title">
  <p class="toc__title" id="toc-title">On this page</p>
  <ol>${headings.map((h) => `<li class="toc__l${h.level}"><a href="#${h.id}">${esc(h.text)}</a></li>`).join('')}</ol>
</aside>`;
}

function pageActions(ctx, page) {
  const editUrl = `${ctx.repoUrl}/edit/${ctx.branch}/${page.file}`;
  const reportUrl = `${ctx.repoUrl}/issues/new?template=report-problem.yml&page=${encodeURIComponent(ctx.canonical(page.path))}&title=${encodeURIComponent(`[Page] ${page.fm.title}`)}`;
  return `<div class="page-actions">
  <a class="btn btn--quiet" href="${esc(editUrl)}">${icons.edit}<span>Edit this page</span></a>
  <a class="btn btn--quiet" href="${esc(reportUrl)}">${icons.flag}<span>Report a problem</span></a>
  <button class="btn btn--quiet" type="button" data-share data-title="${esc(page.fm.title)}">${icons.share}<span>Share</span></button>
</div>`;
}

function checklistToolbar(count) {
  return `<div class="checklist-bar" data-checklist data-total="${count}">
  <div class="checklist-bar__progress">
    <label for="checklist-progress"><span data-checklist-count>0</span> of ${count} done</label>
    <progress id="checklist-progress" max="${count}" value="0" data-checklist-progress>0 of ${count}</progress>
  </div>
  <div class="checklist-bar__actions">
    <button class="btn btn--quiet" type="button" data-checklist-copy>${icons.copy}<span>Copy as Markdown</span></button>
    <button class="btn btn--quiet" type="button" data-checklist-print>${icons.print}<span>Print</span></button>
    <button class="btn btn--quiet" type="button" data-checklist-reset>${icons.reset}<span>Reset</span></button>
  </div>
  <p class="checklist-bar__note">Ticks are saved in this browser only. Nothing is sent anywhere.</p>
</div>`;
}

export function renderDocPage(ctx, page) {
  const { fm } = page;
  const section = page.section;
  const trail = [{ title: 'Home', path: '/' }];
  if (!section.isMeta) trail.push({ title: section.title, path: section.path });
  trail.push({ title: fm.nav_title || fm.title, path: page.path });

  const metaBits = [];
  if (!section.isMeta) metaBits.push(`<span class="type-tag type-tag--${fm.type}">${PAGE_TYPES[fm.type]}</span>`);
  metaBits.push(`<span class="stamp" title="Last reviewed by an editor">Reviewed <time datetime="${fm.updated}">${humanDate(fm.updated)}</time></span>`);
  if (fm.time) metaBits.push(`<span class="meta-plain">${esc(fm.time)}</span>`);
  else if (!section.isMeta) metaBits.push(`<span class="meta-plain">${page.minutes} min read</span>`);
  if (page.checklistItems.length) metaBits.push(`<span class="meta-plain">${page.checklistItems.length} checks</span>`);

  const faq = fm.faq?.length
    ? `<section class="faq" aria-labelledby="faq"><h2 id="faq">Questions people ask</h2>${fm.faq.map((f) =>
      `<details class="faq__item"><summary>${esc(f.q)}</summary><div class="faq__answer">${ctx.renderInline(f.a, page)}</div></details>`).join('')}</section>`
    : '';

  const toolsUsed = [...page.toolRefs].map((id) => ctx.tools.get(id));
  const toolsBox = toolsUsed.length
    ? `<section class="mentioned" aria-labelledby="tools-mentioned"><h2 id="tools-mentioned">Tools on this page</h2><ul class="mentioned__list">${toolsUsed.map((t) =>
      `<li><a href="${ctx.url(t.href)}">${esc(t.name)}</a><span>${esc(PRICING_MODELS[t.pricing.model])}, checked ${monthYear(t.checked)}</span></li>`).join('')}</ul></section>`
    : '';

  const sources = fm.sources?.length
    ? `<section class="sources" aria-labelledby="sources"><h2 id="sources">Sources</h2><ol>${fm.sources.map((s) =>
      `<li><a class="ext" rel="noopener" href="${esc(s.url)}">${esc(s.title)}</a></li>`).join('')}</ol></section>`
    : '';

  const related = (fm.related || []).map((path) => ctx.linkInfo(path)).filter(Boolean);
  const relatedBox = related.length
    ? `<section class="related" aria-labelledby="related-title"><h2 id="related-title">Read next</h2><ul>${related.map((r) =>
      `<li><a href="${ctx.url(r.path)}">${esc(r.title)}</a><p>${esc(r.description)}</p></li>`).join('')}</ul></section>`
    : '';

  const pager = section.isMeta ? '' : prevNext(ctx, page);

  const main = `<article class="doc${fm.type === 'checklist' ? ' doc--checklist' : ''}">
${breadcrumbs(ctx, trail)}
<header class="doc__header">
  <h1>${esc(fm.title)}</h1>
  <p class="doc__lede">${esc(fm.description)}</p>
  <p class="doc__meta">${metaBits.join(' ')}</p>
</header>
${page.checklistItems.length ? checklistToolbar(page.checklistItems.length) : ''}
<div class="prose">
${page.html}
</div>
${faq}
${toolsBox}
${relatedBox}
${sources}
<footer class="doc__footer">
${pageActions(ctx, page)}
${pager}
</footer>
</article>`;

  const ld = [breadcrumbLd(ctx, trail)];
  if (!section.isMeta) {
    ld.push({
      '@context': 'https://schema.org',
      '@type': 'TechArticle',
      headline: fm.title,
      description: fm.description,
      dateModified: fm.updated,
      inLanguage: ctx.site.language,
      mainEntityOfPage: ctx.canonical(page.path),
      image: `${ctx.site.url}/img/og-default.png`,
      author: { '@type': 'Organization', name: `${ctx.site.name} contributors`, url: ctx.canonical('/contribute/') },
      publisher: { '@type': 'Organization', name: ctx.site.owner, url: ctx.site.ownerUrl, logo: { '@type': 'ImageObject', url: `${ctx.site.url}/icon-512.png` } },
      isAccessibleForFree: true,
      license: ctx.site.contentLicenseUrl,
    });
  }
  if (fm.faq?.length) {
    ld.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: fm.faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: ctx.plainInline(f.a) } })),
    });
  }

  return documentPage(ctx, {
    path: page.path, title: fm.title, description: fm.description, updated: fm.updated,
    ogType: section.isMeta ? 'website' : 'article', jsonLd: ld, kind: section.isMeta ? 'meta' : 'doc',
  }, main, { toc: tocHtml(page.headings) });
}

function prevNext(ctx, page) {
  const list = ctx.readingOrder;
  const i = list.indexOf(page);
  const prev = list[i - 1];
  const next = list[i + 1];
  if (!prev && !next) return '';
  const cell = (p, label, cls) => (p
    ? `<a class="pager__link ${cls}" href="${ctx.url(p.path)}"><span class="pager__label">${label}</span><span class="pager__title">${esc(p.fm.title)}</span></a>`
    : '<span></span>');
  return `<nav class="pager" aria-label="Previous and next page">${cell(prev, 'Previous', 'pager__link--prev')}${cell(next, 'Next', 'pager__link--next')}</nav>`;
}

/* ------------------------------------------------------------------------ */
/* Section landing                                                           */
/* ------------------------------------------------------------------------ */

function pageList(ctx, pages) {
  return `<ul class="page-list">${pages.map((p) => `<li>
  <a class="page-list__title" href="${ctx.url(p.path)}">${esc(p.fm.title)}</a>
  <span class="type-tag type-tag--${p.fm.type}">${PAGE_TYPES[p.fm.type]}</span>
  <p>${esc(p.fm.description)}</p>
</li>`).join('')}</ul>`;
}

export function renderSection(ctx, section) {
  const trail = [{ title: 'Home', path: '/' }, { title: section.title, path: section.path }];
  const next = ctx.sections.filter((s) => !s.isMeta).find((s) => s.order > section.order);
  const main = `<article class="doc">
${breadcrumbs(ctx, trail)}
<header class="doc__header">
  <p class="stage-label">Stage ${section.stage} of ${ctx.stageCount}</p>
  <h1>${esc(section.title)}</h1>
  <p class="doc__lede">${esc(section.description)}</p>
</header>
${section.introHtml ? `<div class="prose">${section.introHtml}</div>` : ''}
<h2 class="list-heading" id="pages">In this stage</h2>
${pageList(ctx, section.pages)}
${next ? `<p class="next-stage">When this stage is done, move on to <a href="${ctx.url(next.path)}">stage ${next.stage}: ${esc(next.title)}</a>.</p>` : ''}
</article>`;
  return documentPage(ctx, {
    path: section.path, title: `${section.title}: ${section.summary}`, description: section.description, kind: 'section',
    jsonLd: [breadcrumbLd(ctx, trail), { '@context': 'https://schema.org', '@type': 'CollectionPage', name: section.title, description: section.description, url: ctx.canonical(section.path) }],
  }, main);
}

/* ------------------------------------------------------------------------ */
/* Home                                                                      */
/* ------------------------------------------------------------------------ */

export function renderHome(ctx) {
  const { site } = ctx;
  const stages = ctx.sections.filter((s) => !s.isMeta);
  const suggestions = site.suggestions || [];
  const checklists = ctx.readingOrder.filter((p) => p.fm.type === 'checklist');
  const recent = [...ctx.pages].filter((p) => !p.section.isMeta)
    .sort((a, b) => b.fm.updated.localeCompare(a.fm.updated) || a.fm.title.localeCompare(b.fm.title)).slice(0, 6);

  const main = `<section class="hero" aria-labelledby="hero-title">
  <h1 id="hero-title">${esc(site.headline)}</h1>
  <p class="hero__lede">${esc(site.description)}</p>
  <form class="hero-search" role="search" aria-label="Search the wiki" action="${ctx.url('/search/')}" method="get" data-hero-search>
    <label class="visually-hidden" for="hero-q">Search the wiki</label>
    <input id="hero-q" name="q" type="search" placeholder="What are you stuck on?" autocomplete="off" maxlength="80">
    <button class="btn btn--primary" type="submit">Search</button>
  </form>
  <div class="hero__try"><span id="try-label">Often searched:</span>
    <ul aria-labelledby="try-label">${suggestions.map((s) => `<li><a href="${ctx.url(`/search/?q=${encodeURIComponent(s)}`)}">${esc(s)}</a></li>`).join('')}</ul>
  </div>
</section>

<section class="route-block" aria-labelledby="route-title">
  <div class="block-head">
    <h2 id="route-title">The route from idea to income</h2>
    <p>Eight stages, in the order most products meet them. Jump in wherever you are.</p>
  </div>
  <ol class="route">${stages.map((s) => `<li class="route__stop">
    <span class="route__num" aria-hidden="true">${s.stage}</span>
    <div class="route__body">
      <h3><a href="${ctx.url(s.path)}">${esc(s.title)}</a></h3>
      <p>${esc(s.summary)}</p>
    </div>
    <ul class="route__links">${s.pages.slice(0, 3).map((p) => `<li><a href="${ctx.url(p.path)}">${esc(p.fm.nav_title || p.fm.title)}</a></li>`).join('')}</ul>
  </li>`).join('')}</ol>
</section>

<div class="home-grid">
  <section class="home-grid__checklists" aria-labelledby="checklists-title">
    <div class="block-head"><h2 id="checklists-title">Checklists</h2><p>Tick as you go. Progress stays in your browser.</p></div>
    <ul class="checklist-index">${checklists.map((p) => `<li>
      <a href="${ctx.url(p.path)}">${esc(p.fm.nav_title || p.fm.title)}</a>
      <span class="checklist-index__count" data-progress-for="${esc(p.path)}" data-total="${p.checklistItems.length}">${p.checklistItems.length} checks</span>
    </li>`).join('')}</ul>
  </section>
  <section aria-labelledby="toolbox-title">
    <div class="block-head"><h2 id="toolbox-title">Toolbox</h2><p>${ctx.tools.size} tools across ${ctx.categories.length} jobs, with free tiers and catches.</p></div>
    <ul class="tool-index">${ctx.categories.map((c) => `<li><a href="${ctx.url(c.path)}">${esc(c.title)}</a><span>${c.tools.length}</span></li>`).join('')}</ul>
  </section>
</div>

<section class="recent" aria-labelledby="recent-title">
  <div class="block-head"><h2 id="recent-title">Recently reviewed</h2><p>Every page carries the date an editor last checked it.</p></div>
  <ul class="recent__list">${recent.map((p) => `<li><time datetime="${p.fm.updated}">${humanDate(p.fm.updated)}</time><a href="${ctx.url(p.path)}">${esc(p.fm.title)}</a></li>`).join('')}</ul>
  <p><a href="${ctx.url('/updates/')}">See all review dates</a></p>
</section>

<section class="contribute-band" aria-labelledby="contribute-title">
  <h2 id="contribute-title">Found something wrong or out of date?</h2>
  <p>Prices change and tools die. This wiki stays useful because readers fix it. You need a free GitHub account and two minutes.</p>
  <ul class="contribute-band__ways">
    <li><a class="btn" href="${esc(ctx.repoUrl)}/issues/new?template=report-problem.yml">Report a problem</a></li>
    <li><a class="btn" href="${esc(ctx.repoUrl)}/issues/new?template=suggest-tool.yml">Suggest a tool</a></li>
    <li><a class="btn btn--quiet" href="${ctx.url('/contribute/')}">All the ways to help</a></li>
  </ul>
</section>`;

  return documentPage(ctx, {
    path: '/', title: site.name, description: site.description, kind: 'home',
    jsonLd: [{
      '@context': 'https://schema.org', '@type': 'WebSite', name: site.name, url: `${site.url}/`, description: site.description,
      inLanguage: site.language,
      publisher: { '@type': 'Organization', name: site.owner, url: site.ownerUrl },
      potentialAction: { '@type': 'SearchAction', target: { '@type': 'EntryPoint', urlTemplate: `${site.url}/search/?q={search_term_string}` }, 'query-input': 'required name=search_term_string' },
    }],
  }, main, { shell: 'wide' });
}

/* ------------------------------------------------------------------------ */
/* Toolbox                                                                   */
/* ------------------------------------------------------------------------ */

export function renderToolsIndex(ctx) {
  const trail = [{ title: 'Home', path: '/' }, { title: 'Toolbox', path: '/tools/' }];
  const byStage = new Map();
  for (const c of ctx.categories) {
    if (!byStage.has(c.stage)) byStage.set(c.stage, []);
    byStage.get(c.stage).push(c);
  }
  const groups = [...byStage.entries()].map(([stage, cats]) => `<section class="tool-group" aria-labelledby="g-${stage}">
  <h2 id="g-${stage}">${esc(ctx.stageTitle(stage))}</h2>
  <ul class="category-list">${cats.map((c) => `<li>
    <a href="${ctx.url(c.path)}">${esc(c.title)}</a> <span class="category-list__count">${c.tools.length} tools</span>
    <p>${esc(c.description)}</p>
  </li>`).join('')}</ul>
</section>`).join('');

  const main = `<article class="doc doc--wide">
${breadcrumbs(ctx, trail)}
<header class="doc__header">
  <h1>Toolbox</h1>
  <p class="doc__lede">${ctx.tools.size} tools sorted by the job they do. Each one lists who it suits, what the free tier really gives you, the catches, and the month we last checked the facts.</p>
</header>
<div class="prose">
<aside class="callout callout--note" aria-label="How we pick tools"><p class="callout__title">How we pick tools</p><div class="callout__body"><p>No paid placements and no affiliate links. A tool gets listed when people in this community use it for real work and the facts can be checked on the vendor's own pages. Read the full <a href="${ctx.url('/about/')}#how-we-choose-tools">editorial policy</a>.</p></div></aside>
</div>
${groups}
</article>`;
  return documentPage(ctx, {
    path: '/tools/', title: 'Toolbox: tools for indie founders, with free tiers and catches', description: `Honest picks for hosting, email, payments, analytics, auth and more. ${ctx.tools.size} tools with pros, cons and checked pricing.`,
    kind: 'tools', activeTop: '/tools/', jsonLd: [breadcrumbLd(ctx, trail)],
  }, main);
}

export function renderCategory(ctx, cat) {
  const trail = [{ title: 'Home', path: '/' }, { title: 'Toolbox', path: '/tools/' }, { title: cat.title, path: cat.path }];
  const sorted = [...cat.tools].sort((a, b) => Number(Boolean(b.pick)) - Number(Boolean(a.pick)));
  const table = `<div class="table-wrap" tabindex="0" role="region" aria-label="Comparison of ${esc(cat.title)}"><table class="compare">
<caption class="visually-hidden">${esc(cat.title)} compared</caption>
<thead><tr><th scope="col">Tool</th><th scope="col">Pricing</th><th scope="col">Best for</th></tr></thead>
<tbody>${sorted.map((t) => `<tr><th scope="row"><a href="#${t.id}">${esc(t.name)}</a>${t.pick ? ' <span class="pill pill--pick">Start here</span>' : ''}</th><td><span class="price-model">${esc(PRICING_MODELS[t.pricing.model])}</span> ${esc(t.pricing.note)}</td><td>${esc(t.best_for)}</td></tr>`).join('')}</tbody>
</table></div>`;

  const cards = sorted.map((t) => {
    const usedIn = ctx.toolUsage.get(t.id) || [];
    return `<section class="tool" id="${t.id}" aria-labelledby="${t.id}-name">
  <header class="tool__head">
    <h2 id="${t.id}-name">${esc(t.name)}</h2>
    <p class="tool__pills">${t.pick ? '<span class="pill pill--pick">Start here</span>' : ''}${t.open_source ? '<span class="pill">Open source</span>' : ''}<span class="pill">${esc(PRICING_MODELS[t.pricing.model])}</span></p>
  </header>
  <p class="tool__summary">${esc(t.summary)}</p>
  <dl class="tool__facts">
    <div><dt>Best for</dt><dd>${esc(t.best_for)}</dd></div>
    <div><dt>Pricing</dt><dd>${esc(t.pricing.note)}${t.pricing.url ? ` <a class="ext" rel="noopener" href="${esc(t.pricing.url)}">Pricing page<span class="visually-hidden"> for ${esc(t.name)}</span></a>` : ''}</dd></div>
    <div><dt>Facts checked</dt><dd><span class="stamp"><time datetime="${t.checked}">${monthYear(t.checked)}</time></span></dd></div>
  </dl>
  <div class="tool__pc">
    <div class="tool__pros"><h3>Strengths</h3><ul>${t.pros.map((x) => `<li>${esc(x)}</li>`).join('')}</ul></div>
    <div class="tool__cons"><h3>Trade-offs</h3><ul>${t.cons.map((x) => `<li>${esc(x)}</li>`).join('')}</ul></div>
  </div>
  ${t.note ? `<p class="tool__note">${esc(t.note)}</p>` : ''}
  <p class="tool__links"><a class="ext" rel="noopener" href="${esc(t.url)}">Visit ${esc(t.name)}</a>${usedIn.length ? `<span class="tool__used">Mentioned in ${usedIn.map((p) => `<a href="${ctx.url(p.path)}">${esc(p.fm.title)}</a>`).join(', ')}</span>` : ''}</p>
</section>`;
  }).join('\n');

  const others = ctx.categories.filter((c) => c !== cat && c.stage === cat.stage);
  const main = `<article class="doc doc--wide">
${breadcrumbs(ctx, trail)}
<header class="doc__header">
  <h1>${esc(cat.title)}</h1>
  <p class="doc__lede">${esc(cat.description)}</p>
  <p class="doc__meta"><span class="meta-plain">${cat.tools.length} tools</span> <span class="meta-plain">Prices change. Each tool shows the month its facts were checked.</span></p>
</header>
${cat.introHtml ? `<div class="prose">${cat.introHtml}</div>` : ''}
<h2 class="list-heading" id="at-a-glance">At a glance</h2>
${table}
<div class="tools">${cards}</div>
<footer class="doc__footer">
  <div class="page-actions">
    <a class="btn btn--quiet" href="${esc(`${ctx.repoUrl}/edit/${ctx.branch}/data/tools/${cat.id}.yml`)}">${icons.edit}<span>Edit this list</span></a>
    <a class="btn btn--quiet" href="${esc(`${ctx.repoUrl}/issues/new?template=suggest-tool.yml&category=${encodeURIComponent(cat.title)}`)}">${icons.flag}<span>Suggest a tool</span></a>
  </div>
  ${others.length ? `<p class="next-stage">Related lists: ${others.map((c) => `<a href="${ctx.url(c.path)}">${esc(c.title)}</a>`).join(', ')}.</p>` : ''}
</footer>
</article>`;
  return documentPage(ctx, {
    path: cat.path, title: `${cat.title}: compared for indie founders`, description: cat.description, kind: 'category', activeTop: '/tools/',
    jsonLd: [breadcrumbLd(ctx, trail), {
      '@context': 'https://schema.org', '@type': 'ItemList', name: cat.title,
      itemListElement: sorted.map((t, i) => ({ '@type': 'ListItem', position: i + 1, name: t.name, url: ctx.canonical(`${cat.path}#${t.id}`) })),
    }],
  }, main);
}

/* ------------------------------------------------------------------------ */
/* Reference pages: checklists, glossary, updates, search, 404               */
/* ------------------------------------------------------------------------ */

export function renderChecklists(ctx) {
  const trail = [{ title: 'Home', path: '/' }, { title: 'Checklists', path: '/checklists/' }];
  const lists = ctx.readingOrder.filter((p) => p.fm.type === 'checklist');
  const main = `<article class="doc">
${breadcrumbs(ctx, trail)}
<header class="doc__header">
  <h1>Checklists</h1>
  <p class="doc__lede">Work through these before you launch and again every few months. Tick items as you go; progress is saved in this browser, and you can copy any list as Markdown into your notes or your AI coding tool.</p>
</header>
<ul class="page-list page-list--checklists">${lists.map((p) => `<li>
  <a class="page-list__title" href="${ctx.url(p.path)}">${esc(p.fm.title)}</a>
  <span class="checklist-index__count" data-progress-for="${esc(p.path)}" data-total="${p.checklistItems.length}">${p.checklistItems.length} checks</span>
  <p>${esc(p.fm.description)}</p>
</li>`).join('')}</ul>
</article>`;
  return documentPage(ctx, {
    path: '/checklists/', title: 'Checklists for launching and running a product', description: 'Interactive checklists for SEO, security, privacy, accessibility, launch day and app stores. Progress saves in your browser.',
    kind: 'checklists', activeTop: '/checklists/', jsonLd: [breadcrumbLd(ctx, trail)],
  }, main);
}

export function renderGlossary(ctx) {
  const trail = [{ title: 'Home', path: '/' }, { title: 'Glossary', path: '/glossary/' }];
  const terms = [...ctx.glossary.values()].sort((a, b) => a.term.localeCompare(b.term, 'en', { sensitivity: 'base' }));
  const letters = [...new Set(terms.map((t) => t.term[0].toUpperCase()))];
  const main = `<article class="doc">
${breadcrumbs(ctx, trail)}
<header class="doc__header">
  <h1>Glossary</h1>
  <p class="doc__lede">Plain explanations of the words that show up in hosting dashboards, payment forms and launch threads.</p>
</header>
<nav class="letters" aria-label="Jump to letter"><ul>${letters.map((l) => `<li><a href="#letter-${l.toLowerCase()}">${l}</a></li>`).join('')}</ul></nav>
<div class="glossary">${letters.map((l) => `<section class="glossary__letter" id="letter-${l.toLowerCase()}" aria-labelledby="h-letter-${l.toLowerCase()}"><h2 class="glossary__heading" id="h-letter-${l.toLowerCase()}">${l}</h2><dl>${terms.filter((t) => t.term[0].toUpperCase() === l).map((t) =>
    `<div class="glossary__entry" id="${t.id}"><dt>${esc(t.term)}</dt><dd>${ctx.renderInline(t.definition)}${t.see ? ` <a href="${ctx.url(t.see)}">Read the guide<span class="visually-hidden"> about ${esc(t.term)}</span></a>` : ''}</dd></div>`).join('')}</dl></section>`).join('')}</div>
</article>`;
  return documentPage(ctx, {
    path: '/glossary/', title: 'Glossary of indie hacker and web terms', description: 'DNS, CNAME, MoR, RLS, CSP, MRR and other terms explained in plain English for founders without a technical background.',
    kind: 'glossary', jsonLd: [breadcrumbLd(ctx, trail), {
      '@context': 'https://schema.org', '@type': 'DefinedTermSet', name: `${ctx.site.name} glossary`,
      hasDefinedTerm: terms.map((t) => ({ '@type': 'DefinedTerm', name: t.term, description: ctx.plainInline(t.definition), url: ctx.canonical(`/glossary/#${t.id}`) })),
    }],
  }, main);
}

export function renderUpdates(ctx) {
  const trail = [{ title: 'Home', path: '/' }, { title: 'Recently reviewed', path: '/updates/' }];
  const all = ctx.pages.filter((p) => !p.section.isMeta).sort((a, b) => b.fm.updated.localeCompare(a.fm.updated) || a.fm.title.localeCompare(b.fm.title));
  const main = `<article class="doc">
${breadcrumbs(ctx, trail)}
<header class="doc__header">
  <h1>Recently reviewed</h1>
  <p class="doc__lede">Every page, newest review first. If a page you rely on has not been reviewed in six months, treat prices and limits with care, and please report anything that changed.</p>
  <p class="doc__meta"><a href="${ctx.url('/feed.xml')}">Follow updates in a feed reader</a></p>
</header>
<ul class="recent__list recent__list--full">${all.map((p) => `<li><time datetime="${p.fm.updated}">${humanDate(p.fm.updated)}</time><a href="${ctx.url(p.path)}">${esc(p.fm.title)}</a><span class="recent__section">${esc(p.section.title)}</span></li>`).join('')}</ul>
</article>`;
  return documentPage(ctx, {
    path: '/updates/', title: 'Recently reviewed pages', description: 'Every IndieWiki page with the date an editor last checked it, newest first, so you know how fresh the advice is.',
    kind: 'updates', jsonLd: [breadcrumbLd(ctx, trail)],
  }, main);
}

export function renderSearchPage(ctx) {
  const trail = [{ title: 'Home', path: '/' }, { title: 'Search', path: '/search/' }];
  const main = `<article class="doc">
${breadcrumbs(ctx, trail)}
<header class="doc__header">
  <h1>Search</h1>
  <p class="doc__lede">Search every guide, checklist, tool and glossary term.</p>
</header>
<form class="hero-search hero-search--page" role="search" aria-label="Search the wiki" action="${ctx.url('/search/')}" method="get" data-search-page>
  <label class="visually-hidden" for="page-q">Search terms</label>
  <input id="page-q" name="q" type="search" placeholder="For example: custom domain email" autocomplete="off" maxlength="80">
  <button class="btn btn--primary" type="submit">Search</button>
</form>
<p class="search-page__status" role="status" aria-live="polite" data-search-page-status></p>
<ol class="search-page__results" data-search-page-results></ol>
<noscript><p>Search needs JavaScript. You can still browse <a href="${ctx.url('/sitemap.xml')}">every page</a> or start from the <a href="${ctx.url('/')}">home page</a>.</p></noscript>
</article>`;
  return documentPage(ctx, {
    path: '/search/', title: 'Search', description: 'Search IndieWiki guides, checklists, tools and glossary terms for indie hackers and solo founders.', kind: 'search', noindex: true,
  }, main);
}

export function renderNotFound(ctx) {
  const stages = ctx.sections.filter((s) => !s.isMeta);
  const main = `<article class="doc">
<header class="doc__header">
  <h1>This page is not here</h1>
  <p class="doc__lede">The link may be old, or the page moved when we reorganised a section. Try a search, or start from one of the stages below.</p>
</header>
<form class="hero-search hero-search--page" role="search" aria-label="Search the wiki" action="${ctx.url('/search/')}" method="get">
  <label class="visually-hidden" for="nf-q">Search the wiki</label>
  <input id="nf-q" name="q" type="search" placeholder="Search guides and tools" autocomplete="off" maxlength="80">
  <button class="btn btn--primary" type="submit">Search</button>
</form>
<ul class="page-list">${stages.map((s) => `<li><a class="page-list__title" href="${ctx.url(s.path)}">${esc(s.title)}</a><p>${esc(s.summary)}</p></li>`).join('')}</ul>
<p>If a link on this site brought you here, <a href="${esc(ctx.repoUrl)}/issues/new?template=report-problem.yml&title=${encodeURIComponent('[Broken link]')}">tell us about the broken link</a>.</p>
</article>`;
  return documentPage(ctx, {
    path: '/404.html', title: 'Page not found', description: 'The page you asked for does not exist on IndieWiki. Search or browse the stages instead.', kind: 'notfound', noindex: true,
  }, main);
}
