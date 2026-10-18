/**
 * Loads and validates everything in content/ and data/.
 *
 * Every rule here exists to protect readers: a page without a description
 * hurts search, a tool without a "checked" date hides stale prices, and so on.
 * Problems are collected (not thrown one at a time) so a contributor sees
 * every issue in one run, each with the file name and a plain fix.
 */
import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { join, basename, relative } from 'node:path';
import { load as parseYaml } from 'js-yaml';
import { isIsoDate, linkProblem } from './util.mjs';

export const PAGE_TYPES = {
  guide: 'Guide',
  checklist: 'Checklist',
  reference: 'Reference',
  playbook: 'Playbook',
  comparison: 'Comparison',
  page: 'Page',
};

export const PRICING_MODELS = {
  free: 'Free',
  freemium: 'Free tier',
  paid: 'Paid',
  'open-source': 'Open source',
  'usage': 'Pay as you go',
  'one-time': 'One-time fee',
};

const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function readYaml(file, problems) {
  try {
    return parseYaml(readFileSync(file, 'utf8')) ?? {};
  } catch (err) {
    problems.push(`${file}: YAML could not be read. ${err.reason || err.message}`);
    return {};
  }
}

/** Split "---\nyaml\n---\nbody" into its parts. */
export function parseFrontmatter(raw, file, problems) {
  const text = raw.replace(/^﻿/, '').replace(/\r\n/g, '\n');
  const match = /^---\n([\s\S]*?)\n---\n?([\s\S]*)$/.exec(text);
  if (!match) {
    problems.push(`${file}: missing front matter. The file must start with a "---" block (see CONTRIBUTING.md).`);
    return { data: {}, body: text };
  }
  try {
    return { data: parseYaml(match[1]) ?? {}, body: match[2] };
  } catch (err) {
    problems.push(`${file}: front matter is not valid YAML (${err.reason || err.message}). Tip: if a value contains a colon followed by a space, wrap the whole value in "double quotes".`);
    return { data: {}, body: match[2] };
  }
}

/** Validate one page's front matter. Returns nothing; appends to `problems`. */
export function validatePage(fm, file, problems, today) {
  const say = (msg) => problems.push(`${file}: ${msg}`);
  if (typeof fm.title !== 'string' || !fm.title.trim()) say('"title" is required.');
  else if (fm.title.length > 70) say(`"title" is ${fm.title.length} characters. Keep it to 70 or fewer so it fits in search results.`);

  if (typeof fm.description !== 'string') say('"description" is required. It becomes the meta description and the search snippet.');
  else if (fm.description.length < 50 || fm.description.length > 170) {
    say(`"description" is ${fm.description.length} characters. Make it 50 to 170 characters.`);
  }

  if (!PAGE_TYPES[fm.type]) say(`"type" must be one of: ${Object.keys(PAGE_TYPES).join(', ')}.`);

  if (!isIsoDate(fm.updated)) say('"updated" must be a real date written as YYYY-MM-DD, in quotes or plain.');
  else if (today && fm.updated > today) say(`"updated" (${fm.updated}) is in the future.`);

  if (fm.order !== undefined && !Number.isFinite(fm.order)) say('"order" must be a number.');
  if (fm.tags !== undefined && (!Array.isArray(fm.tags) || fm.tags.some((t) => typeof t !== 'string'))) say('"tags" must be a list of words. Put numbers in quotes, like "404".');
  if (fm.time !== undefined && typeof fm.time !== 'string') say('"time" must be text such as "20 min".');

  if (fm.faq !== undefined) {
    if (!Array.isArray(fm.faq)) say('"faq" must be a list of { q, a } items.');
    else fm.faq.forEach((item, i) => {
      if (!item || typeof item.q !== 'string' || typeof item.a !== 'string') say(`"faq" item ${i + 1} needs both "q" and "a" as text.`);
    });
  }
  if (fm.sources !== undefined) {
    if (!Array.isArray(fm.sources)) say('"sources" must be a list of { title, url } items.');
    else fm.sources.forEach((s, i) => {
      if (!s || typeof s.title !== 'string' || typeof s.url !== 'string' || !/^https:\/\//.test(s.url)) {
        say(`"sources" item ${i + 1} needs a "title" and an https:// "url".`);
      } else if (linkProblem(s.url)) say(`"sources" item ${i + 1}: ${linkProblem(s.url)}`);
    });
  }
  if (fm.related !== undefined && (!Array.isArray(fm.related) || fm.related.some((r) => typeof r !== 'string' || !r.startsWith('/')))) {
    say('"related" must be a list of site paths that start with "/".');
  }
  const known = new Set(['title', 'description', 'type', 'updated', 'order', 'tags', 'time', 'faq', 'sources', 'related', 'nav_title', 'noindex_reason']);
  for (const key of Object.keys(fm)) if (!known.has(key)) say(`unknown front matter field "${key}". Check the spelling against CONTRIBUTING.md.`);
}

/** Validate one tool entry inside a category file. */
export function validateTool(tool, file, problems) {
  const where = `${file} (${tool?.id || 'tool without id'})`;
  const say = (msg) => problems.push(`${where}: ${msg}`);
  if (!tool || typeof tool !== 'object') return say('each tool must be a block of fields.');
  if (typeof tool.id !== 'string' || !SLUG.test(tool.id) || !/^[a-z]/.test(tool.id)) {
    say('"id" must start with a letter and use lowercase words joined by hyphens, like "cloudflare-pages" or "onepassword".');
  }
  if (typeof tool.name !== 'string' || !tool.name.trim()) say('"name" is required.');
  if (typeof tool.url !== 'string' || !/^https:\/\//.test(tool.url)) say('"url" must start with https://.');
  else if (linkProblem(tool.url)) say(`"url": ${linkProblem(tool.url)}`);
  if (typeof tool.summary !== 'string' || tool.summary.length < 20 || tool.summary.length > 220) say('"summary" must be 20 to 220 characters.');
  if (typeof tool.best_for !== 'string' || !tool.best_for.trim()) say('"best_for" is required: who should pick this?');
  for (const key of ['pros', 'cons']) {
    if (!Array.isArray(tool[key]) || tool[key].length === 0) say(`"${key}" needs at least one point.`);
    else if (tool[key].some((x) => typeof x !== 'string')) {
      say(`a "${key}" point is not plain text. If it contains a colon followed by a space, wrap the whole point in "double quotes".`);
    }
  }
  const p = tool.pricing;
  if (!p || typeof p !== 'object') say('"pricing" is required.');
  else {
    if (!PRICING_MODELS[p.model]) say(`"pricing.model" must be one of: ${Object.keys(PRICING_MODELS).join(', ')}.`);
    if (typeof p.note !== 'string' || !p.note.trim()) say('"pricing.note" is required: one line on what is free and what costs money.');
    if (p.url !== undefined && (typeof p.url !== 'string' || !/^https:\/\//.test(p.url))) say('"pricing.url" must start with https://.');
    else if (p.url && linkProblem(p.url)) say(`"pricing.url": ${linkProblem(p.url)}`);
  }
  if (typeof tool.checked !== 'string' || !/^\d{4}-(0[1-9]|1[0-2])$/.test(tool.checked)) {
    say('"checked" must be the month you last verified the facts, written as YYYY-MM.');
  }
  if (tool.open_source !== undefined && typeof tool.open_source !== 'boolean') say('"open_source" must be true or false.');
  if (tool.pick !== undefined && typeof tool.pick !== 'boolean') say('"pick" must be true or false.');
  const known = new Set(['id', 'name', 'url', 'summary', 'best_for', 'pros', 'cons', 'pricing', 'checked', 'open_source', 'pick', 'tags', 'note']);
  for (const key of Object.keys(tool)) if (!known.has(key)) say(`unknown field "${key}".`);
}

/** Load the whole site. Returns { site, sections, pages, categories, tools, glossary, problems }. */
export function loadSite(root, { today } = {}) {
  const problems = [];
  const rel = (file) => relative(root, file);

  const site = readYaml(join(root, 'data/site.yml'), problems);
  for (const key of ['name', 'tagline', 'description', 'url', 'owner', 'ownerUrl', 'email', 'language']) {
    if (!site[key]) problems.push(`data/site.yml: "${key}" is required.`);
  }
  if (site.url && !/^https:\/\/[a-z0-9.-]+$/i.test(site.url)) {
    problems.push(`data/site.yml: "url" must be just the address, like https://indie.pi3.in (https, no slash or path at the end). It is "${site.url}".`);
  }
  if (site.email && !/^[^@\s]+@[^@\s]+\.[a-z]{2,}$/i.test(site.email)) problems.push(`data/site.yml: "email" does not look like an email address: "${site.email}".`);

  // ---- Sections and their pages --------------------------------------------
  const contentDir = join(root, 'content');
  const sections = [];
  const pages = [];
  for (const dirName of readdirSync(contentDir).sort()) {
    const dir = join(contentDir, dirName);
    if (!statSync(dir).isDirectory()) continue;
    const isMeta = dirName === 'pages';
    let meta = { title: dirName, order: 99 };
    if (!isMeta) {
      const metaFile = join(dir, '_section.yml');
      if (!existsSync(metaFile)) {
        problems.push(`${rel(dir)}: missing _section.yml (title, description, order).`);
      } else {
        meta = readYaml(metaFile, problems);
        for (const key of ['title', 'description', 'order', 'summary']) {
          if (meta[key] === undefined) problems.push(`${rel(metaFile)}: "${key}" is required.`);
        }
      }
      if (!SLUG.test(dirName)) problems.push(`${rel(dir)}: folder names must be lowercase words joined by hyphens.`);
    }
    const section = { id: dirName, isMeta, ...meta, path: isMeta ? null : `/${dirName}/`, pages: [], intro: null };

    for (const fileName of readdirSync(dir).sort()) {
      if (!fileName.endsWith('.md')) continue;
      const file = join(dir, fileName);
      const slug = basename(fileName, '.md');
      if (slug !== 'index' && !SLUG.test(slug)) {
        problems.push(`${rel(file)}: file names must be lowercase words joined by hyphens, like "custom-domain-email.md".`);
        continue;
      }
      const { data, body } = parseFrontmatter(readFileSync(file, 'utf8'), rel(file), problems);
      if (slug === 'index') {
        section.intro = body.trim();
        continue;
      }
      validatePage(data, rel(file), problems, today);
      const path = isMeta ? `/${slug}/` : `/${dirName}/${slug}/`;
      const page = { file: rel(file), section, slug, path, fm: data, body };
      section.pages.push(page);
      pages.push(page);
    }
    section.pages.sort((a, b) => (a.fm.order ?? 50) - (b.fm.order ?? 50) || String(a.fm.title).localeCompare(String(b.fm.title)));
    sections.push(section);
  }
  sections.sort((a, b) => a.order - b.order);

  // ---- Toolbox ---------------------------------------------------------------
  const toolsDir = join(root, 'data/tools');
  const categories = [];
  const tools = new Map();
  for (const fileName of readdirSync(toolsDir).sort()) {
    if (!fileName.endsWith('.yml')) continue;
    const file = join(toolsDir, fileName);
    const cat = readYaml(file, problems);
    const id = basename(fileName, '.yml');
    if (cat.id !== id) problems.push(`${rel(file)}: "id" must match the file name ("${id}").`);
    for (const key of ['title', 'description', 'order', 'stage']) {
      if (cat[key] === undefined) problems.push(`${rel(file)}: "${key}" is required.`);
    }
    if (typeof cat.description === 'string' && (cat.description.length < 50 || cat.description.length > 170)) {
      problems.push(`${rel(file)}: "description" is ${cat.description.length} characters. Make it 50 to 170 characters.`);
    }
    if (!Array.isArray(cat.tools) || cat.tools.length === 0) {
      problems.push(`${rel(file)}: "tools" must list at least one tool.`);
      cat.tools = [];
    }
    cat.path = `/tools/${id}/`;
    for (const tool of cat.tools) {
      validateTool(tool, rel(file), problems);
      if (tools.has(tool.id)) problems.push(`${rel(file)}: tool id "${tool.id}" is already used in another category.`);
      tool.category = cat;
      tool.href = `${cat.path}#${tool.id}`;
      tools.set(tool.id, tool);
    }
    categories.push(cat);
  }
  categories.sort((a, b) => a.order - b.order || a.title.localeCompare(b.title));

  // ---- Glossary --------------------------------------------------------------
  const glossaryFile = join(root, 'data/glossary.yml');
  const glossaryList = readYaml(glossaryFile, problems).terms || [];
  const glossary = new Map();
  for (const entry of glossaryList) {
    if (!entry || !SLUG.test(entry.id || '') || typeof entry.term !== 'string' || typeof entry.definition !== 'string') {
      problems.push(`data/glossary.yml: every term needs "id" (lowercase-hyphen), "term" and "definition". Problem near "${entry?.term || entry?.id}".`);
      continue;
    }
    if (glossary.has(entry.id)) problems.push(`data/glossary.yml: duplicate id "${entry.id}".`);
    glossary.set(entry.id, entry);
  }

  return { site, sections, pages, categories, tools, glossary, problems };
}
