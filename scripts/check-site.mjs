import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join, resolve } from 'node:path';

const dist = resolve('dist');
const failures = [];
const assert = (condition, message) => { if (!condition) failures.push(message); };

assert(existsSync(join(dist, 'index.html')), 'homepage was not generated');
assert(existsSync(join(dist, '404.html')), '404 page was not generated');
assert(existsSync(join(dist, 'robots.txt')), 'robots.txt is missing');
assert(existsSync(join(dist, 'CNAME')), 'GitHub Pages CNAME is missing');
assert(readdirSync(dist).some((name) => name.startsWith('sitemap')), 'sitemap was not generated');
assert(existsSync(join(dist, 'pagefind', 'pagefind.js')), 'Pagefind search index was not generated');

function htmlFiles(dir) {
  return readdirSync(dir).flatMap((name) => {
    const file = join(dir, name);
    if (statSync(file).isDirectory()) return htmlFiles(file);
    return file.endsWith('.html') ? [file] : [];
  });
}

const pages = htmlFiles(dist);
assert(pages.length >= 30, `expected a complete starter wiki; found only ${pages.length} HTML pages`);
let checkedLinks = 0;
for (const file of pages) {
  const html = readFileSync(file, 'utf8');
  assert(/<title>[^<]+<\/title>/.test(html), `${file}: missing title`);
  assert(/<meta name="description" content="[^"]+"/.test(html), `${file}: missing description`);
  assert(/<link rel="canonical" href="https:\/\/indie\.pi3\.in\//.test(html), `${file}: missing production canonical URL`);
  for (const match of html.matchAll(/\b(?:href|src)="(\/[^"#?]*)(?:[?#][^"]*)?"/g)) {
    const path = decodeURIComponent(match[1]);
    if (path.startsWith('//')) continue;
    const candidate = path.endsWith('/') ? join(dist, path, 'index.html') : join(dist, path);
    if (existsSync(candidate) || existsSync(candidate + '.html')) checkedLinks++;
    else failures.push(`${file}: broken local link ${path}`);
  }
}

const robots = readFileSync(join(dist, 'robots.txt'), 'utf8');
assert(/Sitemap:\s*https:\/\/indie\.pi3\.in\/sitemap-index\.xml/i.test(robots), 'robots.txt does not reference production sitemap');
const sitemap = readdirSync(dist).find((name) => name.startsWith('sitemap-index'));
if (sitemap) assert(readFileSync(join(dist, sitemap), 'utf8').includes('https://indie.pi3.in/'), 'sitemap does not use production canonical host');

if (failures.length) {
  console.error(failures.join('\n'));
  process.exit(1);
}
console.log(`Generated-site checks passed: ${pages.length} pages, ${checkedLinks} local links, sitemap, robots, canonicals, Pagefind, and 404.`);
