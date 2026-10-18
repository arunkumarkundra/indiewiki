/**
 * Sharing images (Open Graph / X cards), 1200 x 630 pixels, one per page.
 *
 * Each image shows the page's own title, what kind of page it is, and where it
 * sits on the 8-stage route, in the same style as the hand-made home image
 * (static/img/og-default.png). They are drawn at build time with Satori
 * (layout to SVG) and resvg (SVG to PNG), so new pages get a matching image
 * automatically and nobody has to make one by hand.
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';

export const OG_WIDTH = 1200;
export const OG_HEIGHT = 630;

const C = { paper: '#f6f7f5', ink: '#17202b', ink2: '#4a5563', marker: '#fbdb54' };

const LOGO = `data:image/svg+xml;base64,${Buffer.from(
  '<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 32 32"><rect width="32" height="32" rx="7" fill="#17202b"/>'
  + '<path d="M10.5 8.5H7.5v15h3M21.5 8.5h3v15h-3" fill="none" stroke="#f6f7f5" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>'
  + '<circle cx="16" cy="10.6" r="2.3" fill="#fbdb54"/><path d="M16 15v8.2" stroke="#f6f7f5" stroke-width="3.2" stroke-linecap="round"/></svg>',
).toString('base64')}`;

/** Where the image for a page path is published: "/ship/seo-checklist/" -> "/og/ship/seo-checklist.png". */
export function ogImagePath(pagePath) {
  return `/og${pagePath.replace(/\/$/, '')}.png`;
}

/** Tiny element helper so the layout below reads like HTML. */
const h = (type, style, ...children) => ({
  type,
  props: { style: { display: 'flex', ...style }, children: children.length === 1 ? children[0] : children },
});

/** Big titles get smaller as they get longer, so every title fits in three lines. */
function titleSize(title) {
  const n = title.length;
  if (n <= 24) return 84;
  if (n <= 40) return 72;
  if (n <= 60) return 62;
  return 54;
}

function card({ title, kicker, meta, stage }, { host, stages }) {
  const size = titleSize(title);
  const route = h('div', { position: 'relative', marginTop: 'auto', width: 1056, height: 86 },
    h('div', { position: 'absolute', left: 66, right: 66, top: 21, height: 4, background: C.ink }),
    ...stages.map((s) => h('div', { position: 'relative', width: 132, flexDirection: 'column', alignItems: 'center' },
      h('div', {
        width: 46, height: 46, borderRadius: 23, border: `4px solid ${C.ink}`,
        background: s.stage === stage ? C.marker : C.paper,
        alignItems: 'center', justifyContent: 'center', fontSize: 21, fontWeight: 800,
      }, String(s.stage)),
      h('div', { marginTop: 8, fontSize: 21, fontWeight: 700, color: s.stage === stage ? C.ink : C.ink2 }, s.title),
    )),
  );
  const content = h('div', { position: 'absolute', top: 60, left: 72, width: 1056, height: 514, flexDirection: 'column' },
    h('div', { width: 1056, alignItems: 'center', justifyContent: 'space-between' },
      h('div', { alignItems: 'center', fontSize: 40, fontWeight: 800, letterSpacing: -0.8 },
        { type: 'img', props: { src: LOGO, width: 64, height: 64, style: { marginRight: 18 } } },
        'IndieWiki'),
      h('div', { fontFamily: 'Atkinson Mono', fontSize: 24, color: C.ink2 }, host),
    ),
    h('div', { marginTop: 40 },
      h('div', { background: C.marker, padding: '5px 14px', borderRadius: 4, fontSize: 26, fontWeight: 700 }, kicker)),
    h('div', { marginTop: 22, fontSize: size, fontWeight: 800, lineHeight: 1.06, letterSpacing: -0.03 * size, width: 1000 }, title),
    ...(meta ? [h('div', { marginTop: 18, fontSize: 28, fontWeight: 700, color: C.ink2 }, meta)] : []),
    route,
  );
  return h('div', { width: OG_WIDTH, height: OG_HEIGHT, background: C.paper, color: C.ink, fontFamily: 'Atkinson', position: 'relative' }, content);
}

let fontsCache;
function fonts(root) {
  if (fontsCache) return fontsCache;
  const next = (w) => readFileSync(join(root, `node_modules/@fontsource/atkinson-hyperlegible-next/files/atkinson-hyperlegible-next-latin-${w}-normal.woff`));
  const mono = readFileSync(join(root, 'node_modules/@fontsource/atkinson-hyperlegible-mono/files/atkinson-hyperlegible-mono-latin-400-normal.woff'));
  fontsCache = [
    { name: 'Atkinson', data: next(700), weight: 700, style: 'normal' },
    { name: 'Atkinson', data: next(800), weight: 800, style: 'normal' },
    { name: 'Atkinson Mono', data: mono, weight: 400, style: 'normal' },
  ];
  return fontsCache;
}

/** Draw one card as PNG bytes. */
export async function renderOgPng(cardInfo, { root, host, stages }) {
  const svg = await satori(card(cardInfo, { host, stages }), { width: OG_WIDTH, height: OG_HEIGHT, fonts: fonts(root) });
  return new Resvg(svg, { fitTo: { mode: 'width', value: OG_WIDTH }, font: { loadSystemFonts: false } }).render().asPng();
}

/** Draw every collected card into dist. `cards` is a Map of page path -> card info. */
export async function writeOgImages(cards, { root, out, host, stages }) {
  for (const [pagePath, info] of cards) {
    const file = join(out, ogImagePath(pagePath));
    mkdirSync(dirname(file), { recursive: true });
    writeFileSync(file, await renderOgPng(info, { root, host, stages }));
  }
}
