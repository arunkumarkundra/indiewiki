/**
 * Markdown renderer for IndieWiki pages.
 *
 * Contributors write plain Markdown plus a few small extras:
 *   ::: tip / note / warning / danger / india [optional title]   -> callout boxes
 *   ::: steps                                                     -> numbered step list styling
 *   - [ ] item                                                    -> interactive checklist item
 *   [[tool:resend]]                                               -> link to a tool in the Toolbox
 *   [[term:dns]]                                                  -> link to a Glossary entry
 *   [[kbd:Ctrl+Shift+P]]                                          -> keyboard keys
 *   [[email:contact]]                                             -> the contact address, assembled in the browser
 *
 * Raw HTML is switched OFF on purpose: contributors cannot inject scripts,
 * and every page keeps the same look. The build records problems (broken
 * links, missing alt text, a second H1 ...) in env.errors so the whole site
 * fails fast with a clear message instead of publishing a broken page.
 */
import MarkdownIt from 'markdown-it';
import container from 'markdown-it-container';
import { esc, slugify, shortHash } from './util.mjs';

export const CALLOUTS = {
  tip: 'Tip',
  note: 'Note',
  warning: 'Watch out',
  danger: 'Stop',
  india: 'If you are in India',
};

/** Build one configured markdown-it instance. Rendering state lives in `env`. */
export function createMarkdown() {
  const md = new MarkdownIt({ html: false, linkify: true, typographer: true });

  // ---- Callouts: ::: warning Optional title -------------------------------
  for (const [kind, defaultTitle] of Object.entries(CALLOUTS)) {
    md.use(container, kind, {
      validate: (params) => params.trim().split(/\s+/)[0] === kind,
      render(tokens, idx) {
        const token = tokens[idx];
        if (token.nesting !== 1) return '</div></aside>\n';
        const custom = token.info.trim().slice(kind.length).trim();
        const title = custom || defaultTitle;
        return `<aside class="callout callout--${kind}" aria-label="${esc(title)}">` +
          `<p class="callout__title">${esc(title)}</p><div class="callout__body">\n`;
      },
    });
  }

  // ---- ::: steps wraps an ordered list in step styling ---------------------
  md.use(container, 'steps', {
    validate: (params) => params.trim() === 'steps',
    render: (tokens, idx) => (tokens[idx].nesting === 1 ? '<div class="steps">\n' : '</div>\n'),
  });

  // ---- Inline extras: [[tool:id]] [[term:id]] [[kbd:Keys]] -----------------
  md.inline.ruler.before('link', 'wiki_refs', (state, silent) => {
    const src = state.src.slice(state.pos);
    const match = /^\[\[(tool|term|kbd|email):([^\]\n]+)\]\]/.exec(src);
    if (!match) return false;
    if (!silent) {
      const token = state.push('wiki_ref', '', 0);
      token.meta = { kind: match[1], value: match[2].trim() };
    }
    state.pos += match[0].length;
    return true;
  });

  md.renderer.rules.wiki_ref = (tokens, idx, _opts, env) => {
    const { kind, value } = tokens[idx].meta;
    if (kind === 'kbd') {
      return value.split('+').map((k) => `<kbd>${esc(k.trim())}</kbd>`).join('<span class="kbd-plus">+</span>');
    }
    if (kind === 'email') {
      return `<a href="${esc(env.url('/contact/'))}" data-email="${esc(env.emailCode || '')}" data-email-show>the project email address (turn on JavaScript to see it)</a>`;
    }
    if (kind === 'tool') {
      const tool = env.tools?.get(value);
      if (!tool) {
        env.errors.push(`Unknown tool "[[tool:${value}]]". Add it to data/tools/ or fix the id.`);
        return esc(value);
      }
      env.toolRefs.add(value);
      return `<a class="tool-ref" href="${esc(env.url(tool.href))}">${esc(tool.name)}</a>`;
    }
    const term = env.glossary?.get(value);
    if (!term) {
      env.errors.push(`Unknown glossary term "[[term:${value}]]". Add it to data/glossary.yml or fix the id.`);
      return esc(value);
    }
    return `<a class="term-ref" href="${esc(env.url(`/glossary/#${value}`))}">${esc(term.term)}</a>`;
  };

  // ---- Headings: ids, anchor links, table of contents, one-H1 rule ---------
  md.renderer.rules.heading_open = (tokens, idx, opts, env, self) => {
    const token = tokens[idx];
    const level = Number(token.tag.slice(1));
    if (level === 1) {
      env.errors.push('Do not use "# " (H1) inside a page. The page title is the only H1. Start sections with "## ".');
    }
    const inline = tokens[idx + 1];
    const text = inline.children.map((c) => (c.type === 'wiki_ref' ? c.meta.value : c.content)).join('');
    let id = slugify(text);
    while (env.ids.has(id)) id = `${id}-${env.ids.size}`;
    env.ids.add(id);
    token.attrSet('id', id);
    if (level === 2 || level === 3) env.headings.push({ level, id, text });
    return self.renderToken(tokens, idx, opts);
  };
  md.renderer.rules.heading_close = (tokens, idx, opts, env, self) => {
    const id = tokens[idx - 2].attrGet('id');
    const level = Number(tokens[idx].tag.slice(1));
    const anchor = level >= 2 && level <= 3
      ? `<a class="heading-anchor" href="#${id}"><span class="visually-hidden">Link to this section</span><span aria-hidden="true">#</span></a>`
      : '';
    return `${anchor}${self.renderToken(tokens, idx, opts)}`;
  };

  // ---- Links: validate internal ones, apply base path, mark external -------
  md.renderer.rules.link_open = (tokens, idx, opts, env, self) => {
    const token = tokens[idx];
    const href = token.attrGet('href') || '';
    if (href.startsWith('/')) {
      env.links.push(href);
      token.attrSet('href', env.url(href));
    } else if (/^https?:\/\//i.test(href)) {
      token.attrJoin('class', 'ext');
      token.attrSet('rel', 'noopener');
    } else if (href.startsWith('#')) {
      env.anchors.push(href.slice(1));
    } else if (!/^mailto:/i.test(href)) {
      env.errors.push(`Link "${href}" is not allowed. Use a full https:// address, or a site path that starts with "/".`);
    }
    return self.renderToken(tokens, idx, opts);
  };

  // ---- Images: alt text is mandatory, lazy loading, base path ---------------
  md.renderer.rules.image = (tokens, idx, _opts, env) => {
    const token = tokens[idx];
    const src = token.attrGet('src') || '';
    const alt = token.children.map((c) => c.content).join('').trim();
    if (!alt) env.errors.push(`Image "${src}" has no alt text. Describe what the image shows: ![What it shows](${src})`);
    if (src.startsWith('/')) env.images.push(src);
    else env.errors.push(`Image "${src}" must be stored in static/img/ and linked as /img/... so it loads fast and stays private.`);
    const title = token.attrGet('title');
    return `<img src="${esc(env.url(src))}" alt="${esc(alt)}" loading="lazy" decoding="async"${title ? ` title="${esc(title)}"` : ''}>`;
  };

  // ---- Tables become keyboard-scrollable regions on small screens ----------
  md.renderer.rules.table_open = () => '<div class="table-wrap" tabindex="0" role="region" aria-label="Scrollable table"><table>\n';
  md.renderer.rules.table_close = () => '</table></div>\n';

  // ---- Code blocks keep a language label for the copy button ---------------
  md.renderer.rules.fence = (tokens, idx) => {
    const token = tokens[idx];
    const lang = token.info.trim().split(/\s+/)[0];
    const label = lang ? `<span class="code-lang">${esc(lang)}</span>` : '';
    return `<div class="code-block">${label}<pre tabindex="0"><code${lang ? ` class="language-${esc(lang)}"` : ''}>${esc(token.content)}</code></pre></div>\n`;
  };

  // ---- Checklists: "- [ ] text" becomes a real, saveable checkbox ----------
  md.core.ruler.after('inline', 'checklists', (state) => {
    const tokens = state.tokens;
    for (let i = 2; i < tokens.length; i++) {
      const inline = tokens[i];
      if (inline.type !== 'inline' || tokens[i - 1].type !== 'paragraph_open' || tokens[i - 2].type !== 'list_item_open') continue;
      const first = inline.children[0];
      if (!first || first.type !== 'text') continue;
      const mark = /^\[( |x|X)\]\s+/.exec(first.content);
      if (!mark) continue;

      first.content = first.content.slice(mark[0].length);
      const itemText = inline.children.map((c) => c.content).join('').trim();
      const env = state.env;
      let id = `ck-${shortHash(`${env.path}|${itemText}`, 7)}`;
      while (env.ids.has(id)) id = `${id}x`;
      env.ids.add(id);
      env.checklistItems.push({ id, text: itemText });

      const open = new state.Token('html_inline', '', 0);
      open.content = `<input type="checkbox" class="check__box" id="${id}" aria-labelledby="${id}-l"><span class="check__label" id="${id}-l">`;
      const close = new state.Token('html_inline', '', 0);
      close.content = '</span>';
      inline.children.unshift(open);
      inline.children.push(close);

      tokens[i - 2].attrJoin('class', 'check');
      // Mark the nearest enclosing list so CSS can drop the bullet.
      for (let j = i - 3; j >= 0; j--) {
        if (tokens[j].type === 'bullet_list_open' && tokens[j].level === tokens[i - 2].level - 1) {
          tokens[j].attrSet('class', 'checklist');
          break;
        }
      }
    }
  });

  return md;
}

/** Fresh per-page render state. `url` turns a site path into a base-path-aware href. */
export function createEnv({ path, url, tools, glossary, emailCode }) {
  return {
    path,
    emailCode,
    url,
    tools,
    glossary,
    errors: [],
    links: [],
    anchors: [],
    images: [],
    headings: [],
    checklistItems: [],
    toolRefs: new Set(),
    ids: new Set(['main', 'top', 'search', 'nav', 'toc', 'faq', 'sources', 'tools-mentioned']),
  };
}
