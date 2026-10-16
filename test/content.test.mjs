/**
 * Tests for the content rules that protect readers, and for the small helpers.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { validatePage, validateTool, parseFrontmatter } from '../src/lib/content.mjs';
import { slugify, isIsoDate, humanDate, monthYear, plainText, truncate } from '../src/lib/util.mjs';

const goodPage = {
  title: 'A good title',
  description: 'A description that is comfortably longer than fifty characters in total.',
  type: 'guide',
  updated: '2026-10-01',
};

test('a valid page passes', () => {
  const problems = [];
  validatePage(goodPage, 'x.md', problems, '2026-10-16');
  assert.deepEqual(problems, []);
});

test('page rules catch the common mistakes', () => {
  const cases = [
    [{ ...goodPage, title: undefined }, '"title" is required'],
    [{ ...goodPage, title: 'x'.repeat(71) }, '70 or fewer'],
    [{ ...goodPage, description: 'too short' }, '50 to 170'],
    [{ ...goodPage, type: 'blog' }, '"type" must be one of'],
    [{ ...goodPage, updated: '2026-02-30' }, 'real date'],
    [{ ...goodPage, updated: '2027-01-01' }, 'in the future'],
    [{ ...goodPage, tags: [404] }, 'Put numbers in quotes'],
    [{ ...goodPage, sources: [{ title: 'x', url: 'http://insecure.example' }] }, 'https://'],
    [{ ...goodPage, related: ['ship/seo/'] }, 'start with "/"'],
    [{ ...goodPage, colour: 'red' }, 'unknown front matter field'],
  ];
  for (const [fm, expected] of cases) {
    const problems = [];
    validatePage(fm, 'x.md', problems, '2026-10-16');
    assert.ok(problems.some((p) => p.includes(expected)), `expected "${expected}" for ${JSON.stringify(fm)}, got ${JSON.stringify(problems)}`);
  }
});

const goodTool = {
  id: 'example-tool',
  name: 'Example',
  url: 'https://example.com',
  summary: 'A summary that is long enough to pass the rule.',
  best_for: 'People who need an example.',
  pros: ['Good'],
  cons: ['Bad'],
  pricing: { model: 'freemium', note: 'Free tier available.', url: 'https://example.com/pricing' },
  checked: '2026-10',
};

test('a valid tool passes and broken tools are explained', () => {
  const ok = [];
  validateTool(goodTool, 'tools.yml', ok);
  assert.deepEqual(ok, []);

  const bad = [];
  validateTool({ ...goodTool, id: 'Bad Id', url: 'http://x', checked: '2026-13', pros: [{ Private: 'oops' }], pricing: { model: 'cheap' } }, 'tools.yml', bad);
  const text = bad.join('\n');
  for (const expected of ['"id" must start with a letter', '"url" must start', '"checked" must be', 'wrap the whole point in', '"pricing.model"', '"pricing.note"']) {
    assert.ok(text.includes(expected), `missing "${expected}" in:\n${text}`);
  }
});

test('front matter parsing reports YAML colons helpfully', () => {
  const problems = [];
  parseFrontmatter('---\ntitle: ok\nfaq:\n  - q: x\n    a: one: two\n---\nbody', 'x.md', problems);
  assert.ok(problems[0].includes('double quotes'));
  const missing = [];
  parseFrontmatter('no front matter', 'y.md', missing);
  assert.ok(missing[0].includes('missing front matter'));
});

test('helpers', () => {
  assert.equal(slugify('Send mail as: Gmail (2027)'), 'send-mail-as-gmail-2027');
  assert.equal(slugify('Café & Crème'), 'cafe-and-creme');
  assert.ok(isIsoDate('2026-10-16'));
  assert.ok(!isIsoDate('2026-10-32'));
  assert.equal(humanDate('2026-10-16'), '16 Oct 2026');
  assert.equal(monthYear('2026-01'), 'Jan 2026');
  assert.equal(plainText('## Hi [link](/a) **bold** [[tool:resend]]'), 'Hi link bold resend');
  assert.equal(truncate('one two three four', 10), 'one two…');
});
