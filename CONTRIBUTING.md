# Contributing to IndieWiki

Thank you for helping. IndieWiki is useful only while it is accurate, so every correction matters, however small.

You can do everything in your web browser on GitHub. Nothing to install.

- **Quick fix or update:** open the page on the site, click **Edit this page**, change it, and propose the change.
- **Report something without editing:** click **Report a problem** on the page.
- **Suggest a tool:** click **Suggest a tool** on any Toolbox page.

The rest of this file explains how pages are written, so your change passes the automatic checks first time.

---

## How the site is organised

```
content/            The wiki pages, one Markdown file each
  start/            Stage 1: Start
  setup/            Stage 2: Set up
  build/            Stage 3: Build
  ship/             Stage 4: Ship
  launch/           Stage 5: Launch
  grow/             Stage 6: Grow
  earn/             Stage 7: Earn
  run/              Stage 8: Run
  pages/            About, Contribute, Privacy, Terms, Contact
data/
  tools/            The Toolbox: one file per category
  glossary.yml      Glossary terms
  site.yml          Site name, address and settings
static/             Images, icons, CSS and JavaScript, copied as they are
src/                The build program (you rarely need to touch this)
test/               Automatic tests
```

A file at `content/ship/seo-checklist.md` becomes the page `/ship/seo-checklist/`.

## Writing a page

Every page starts with a **front matter** block between two `---` lines, then the text in Markdown.

```markdown
---
title: Set up Google Search Console
description: Verify your domain, submit your sitemap and read the reports that matter, step by step, in about fifteen minutes.
type: guide
updated: 2026-10-16
order: 3
time: 15 min
tags: [google search console, sitemap, indexing]
faq:
  - q: Domain property or URL prefix property?
    a: Choose Domain. It covers every version of your site.
sources:
  - title: Google Search Central documentation
    url: https://developers.google.com/search/docs
related: [/ship/seo-checklist/, /tools/seo-tools/]
---

Opening paragraph that answers the main question straight away.

## First section
...
```

| Field | Required | What it is |
| --- | --- | --- |
| `title` | Yes | The page title and its only H1. Up to 70 characters. |
| `description` | Yes | One or two sentences, 50 to 170 characters. Shown in search results and link previews. |
| `type` | Yes | `guide`, `checklist`, `reference`, `playbook`, `comparison` or `page`. |
| `updated` | Yes | The date the facts were last checked, as `YYYY-MM-DD`. Change it when you change facts. |
| `order` | No | Position in the stage's menu (lower comes first). |
| `nav_title` | No | A shorter title for menus. |
| `time` | No | Reading or doing time, such as `20 min`. |
| `tags` | No | Extra words that help search. Put numbers in quotes: `"404"`. |
| `faq` | No | Questions and answers shown at the end of the page and in search engines' structured data. |
| `sources` | No | Official pages that back up the facts. Must be `https://`. |
| `related` | No | Up to four site paths shown as "Read next". |

**Tip about colons.** In front matter, if a value contains a colon followed by a space (`like: this`), wrap the whole value in double quotes. The automatic check tells you if you forget.

### Markdown basics

- `## Heading` for sections and `### Heading` for sub-sections. Never use a single `#`; the title is already the H1.
- `- item` for bullets, `1. item` for numbered lists.
- `**bold**`, `*italic*`, `` `code` ``.
- `[link text](https://example.com)` for outside links, `[link text](/ship/seo-checklist/)` for pages on this site (start with `/`, end with `/`).
- Images go in `static/img/` as WebP, and need alt text: `![What the image shows](/img/name.webp)`.
- Raw HTML is switched off on purpose.

### IndieWiki shortcuts

| You write | You get |
| --- | --- |
| `- [ ] Item` | A checklist item readers can tick. Ticks are saved in their browser. |
| `::: tip` … `:::` | A green tip box. Also `note`, `warning`, `danger` and `india`. Add a title after the word: `::: warning Gmail change` |
| `::: steps` + a numbered list + `:::` | Big numbered steps for how-to instructions. |
| `[[tool:resend]]` | A link to that tool in the Toolbox, listed again at the end of the page. |
| `[[term:dns]]` | A link to that glossary entry. |
| `[[kbd:Ctrl+Shift+P]]` | Keyboard keys. |

## Adding or updating a tool

Tools live in `data/tools/<category>.yml`. Copy an existing entry and change it:

```yaml
  - id: resend                       # lowercase-with-hyphens, starts with a letter, unique
    name: Resend
    url: https://resend.com/
    summary: One sentence on what it is (20 to 220 characters).
    best_for: Who should choose it.
    pick: true                       # optional: our "Start here" default for this category
    pricing:
      model: freemium                # free, freemium, paid, open-source, usage or one-time
      note: What is free and what costs money, with numbers where official.
      url: https://resend.com/pricing
    checked: 2026-10                 # the month you checked the facts on the vendor's site
    open_source: false               # optional
    pros:
      - A real strength.
    cons:
      - A real trade-off.
```

Rules for tools:

- Facts must be confirmed on the vendor's own website or docs. Put that page in `pricing.url`.
- Update `checked:` every time you confirm or change pricing.
- Every tool needs at least one honest trade-off.
- If a point contains `: ` (a colon and a space), wrap the point in double quotes.
- No affiliate or tracking links.

## Style guide

Write the way a helpful, experienced friend explains something.

- **Answer first.** The first two sentences should answer what the page is about.
- **Plain words.** Short sentences. Common words. Explain a term the first time you use it, or link it with `[[term:...]]`.
- **Specific.** Exact menu names, exact settings, real numbers with a source.
- **Active voice and "you".** "Add a TXT record", not "A TXT record should be added".
- **Sentence case headings.** "Set up DKIM", not "Set Up DKIM".
- **No filler.** Cut warm-up introductions, repeated summaries, hype words and vague claims. If AI helped you draft, edit hard.
- **Fair.** Name trade-offs. Disclose any connection to a company you mention.
- **Your own words.** Never copy text from another site. Summarise and link the source.
- **Dates as `16 Oct 2026`** in text. Money with the currency: `$20 a month`, `₹199`.
- **Not advice.** Pages on law, tax and money explain common situations. Keep the "not legal advice" note where it exists.

## What happens after you propose a change

1. Automatic checks build the whole site and run the tests (about two minutes).
2. If a check fails, click **Details**. The log lists each problem with the file name and how to fix it. Edit the same file in your branch and the checks run again.
3. A maintainer reviews the change and may suggest edits.
4. Once merged, the live site updates within a few minutes.

## Working on your own computer (optional)

You do not need this, but if you are comfortable with a terminal and Node.js 22 or newer:

```bash
npm ci          # install exact dependency versions
npm run build   # build into dist/
npm test        # run every test
```

## Licence

By contributing you agree that your text is published under [CC BY-SA 4.0](LICENSE-CONTENT.md) and any code under the [MIT licence](LICENSE). Please follow the [Code of Conduct](CODE_OF_CONDUCT.md).
