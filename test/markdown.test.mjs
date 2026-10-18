/**
 * Unit tests for the Markdown extensions contributors use.
 * Run with: npm test
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createMarkdown, createEnv } from '../src/lib/markdown.mjs';

const tools = new Map([['resend', { name: 'Resend', href: '/tools/transactional-email/#resend' }]]);
const glossary = new Map([['dns', { term: 'DNS' }]]);
const md = createMarkdown();
const render = (src, base = '') => {
  const env = createEnv({ path: '/x/', url: (p) => `${base}${p}`, tools, glossary, emailCode: 'abc' });
  return { html: md.render(src, env), env };
};

test('checklist items become labelled checkboxes with stable ids', () => {
  const a = render('- [ ] Set up SPF\n- [ ] Set up DKIM\n');
  const b = render('- [ ] Set up SPF\n- [ ] Set up DKIM\n');
  assert.equal(a.env.checklistItems.length, 2);
  assert.match(a.html, /<ul class="checklist">/);
  assert.match(a.html, /<li class="check"><input type="checkbox" class="check__box" id="ck-[a-f0-9]{7}" aria-labelledby="ck-[a-f0-9]{7}-l">/);
  assert.deepEqual(a.env.checklistItems.map((i) => i.id), b.env.checklistItems.map((i) => i.id), 'ids must not change between builds');
  assert.notEqual(a.env.checklistItems[0].id, a.env.checklistItems[1].id);
});

test('ordinary lists are left alone', () => {
  const { html, env } = render('- one\n- two\n');
  assert.equal(env.checklistItems.length, 0);
  assert.doesNotMatch(html, /checkbox/);
});

test('callouts render with default and custom titles', () => {
  assert.match(render('::: warning\nCareful.\n:::\n').html, /<aside class="callout callout--warning" aria-label="Watch out"><p class="callout__title">Watch out<\/p>/);
  assert.match(render('::: tip Keep it short\nYes.\n:::\n').html, /<p class="callout__title">Keep it short<\/p>/);
  assert.match(render('::: india\nUPI.\n:::\n').html, /callout--india/);
});

test('tool, glossary, keyboard and email shortcuts', () => {
  const { html, env } = render('Use [[tool:resend]], see [[term:dns]], press [[kbd:Ctrl+K]], mail [[email:contact]].', '/base');
  assert.match(html, /<a class="tool-ref" href="\/base\/tools\/transactional-email\/#resend">Resend<\/a>/);
  assert.match(html, /<a class="term-ref" href="\/base\/glossary\/#dns">DNS<\/a>/);
  assert.match(html, /<kbd>Ctrl<\/kbd><span class="kbd-plus">\+<\/span><kbd>K<\/kbd>/);
  assert.match(html, /data-email="abc"/);
  assert.ok(env.toolRefs.has('resend'));
});

test('unknown tool or term is reported as an error', () => {
  const { env } = render('[[tool:nope]] and [[term:nada]]');
  assert.equal(env.errors.length, 2);
});

test('raw HTML is escaped, never executed', () => {
  const { html } = render('<script>alert(1)</script>\n\n<img src=x onerror=alert(1)>');
  assert.doesNotMatch(html, /<script>/);
  assert.doesNotMatch(html, /<img src=x/);
});

test('a second H1 inside a page is an error', () => {
  assert.equal(render('# Title again').env.errors.length, 1);
});

test('internal links get the base path and are recorded; bad schemes are rejected', () => {
  const { html, env } = render('[a](/ship/seo-checklist/) [b](https://example.com) [c](javascript:alert(1)) [d](relative/path)', '/iw');
  assert.match(html, /href="\/iw\/ship\/seo-checklist\/"/);
  assert.match(html, /class="ext" rel="noopener"/);
  assert.deepEqual(env.links, ['/ship/seo-checklist/']);
  assert.ok(env.errors.some((e) => e.includes('relative/path')));
  assert.doesNotMatch(html, /href="javascript:/, 'javascript: links must never become real links');
});

test('images need alt text and a site path', () => {
  assert.equal(render('![](/img/a.webp)').env.errors.length, 1);
  assert.equal(render('![A chart](https://example.com/a.png)').env.errors.length, 1);
  assert.match(render('![A chart](/img/a.webp)').html, /<img src="\/img\/a.webp" alt="A chart" loading="lazy" decoding="async">/);
});

test('headings get unique ids and table-of-contents entries', () => {
  const { html, env } = render('## Set up\n\n## Set up\n\n### Detail');
  assert.equal(env.headings.length, 3);
  assert.notEqual(env.headings[0].id, env.headings[1].id);
  assert.match(html, /<h2 id="set-up">/);
});

test('tables are wrapped in a keyboard-scrollable region', () => {
  assert.match(render('| a | b |\n| - | - |\n| 1 | 2 |').html, /<div class="table-wrap" tabindex="0" role="region" aria-label="Scrollable table"><table>/);
});

test('unclean links are reported: tracking parameters, .html pages, empty #, http://', () => {
  const bad = render('[a](https://x.com/?utm_source=nl) [b](https://x.com/p?srsltid=AfmB) [c](/ship/x.html) [d](#) [e](http://x.com)');
  assert.equal(bad.env.errors.length, 5, bad.env.errors.join('\n'));
  const good = render('[a](https://github.com/o/r/issues/new?template=x.yml) [b](https://news.ycombinator.com/showhn.html) [c](/ship/x/#top) [d](#top)');
  assert.deepEqual(good.env.errors, []);
});
