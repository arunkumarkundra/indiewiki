# IndieWiki

**The indie founder's field manual.** Practical guides, checklists and honest tool picks for solo founders and small teams, from first idea to paying customers.

Live site: <https://indie.pi3.in>

- 8 stages, from validating an idea to running a business
- Interactive checklists (SEO, security, accessibility, launch, app stores and more) that save progress in the reader's browser and copy as Markdown
- A Toolbox of 100+ tools with free-plan facts, trade-offs and the month they were checked
- Fast search across every guide, tool and glossary term, entirely in the browser
- No ads, no trackers, no cookies, no affiliate links

## How it works

Pages are Markdown files in `content/`. Tools and glossary terms are YAML files in `data/`. A small Node.js program in `src/` checks everything and turns it into a plain, static website in `dist/`. GitHub Actions runs that program and publishes the result to GitHub Pages every time `main` changes. Nobody needs to run anything on their own computer.

The build refuses to publish if anything is wrong: a broken link, a missing description, a page without a review date, a tool without a checked month. Tests then check every page for valid HTML, one H1, canonical and sharing tags, structured data, a strict Content-Security-Policy, and working links.

## Contributing

Anyone with a GitHub account can help, from the browser. See the [contribution guide](CONTRIBUTING.md) or <https://indie.pi3.in/contribute/>.

## Maintainers

Setting up hosting, reviewing contributions and keeping facts fresh: see [docs/MAINTAINING.md](docs/MAINTAINING.md).

## Project layout

```
.github/            Workflows (build and publish, check pull requests), issue forms, Dependabot
content/            Wiki pages by stage, plus About, Contribute, Privacy, Terms and Contact
data/               Toolbox categories, glossary and site settings
docs/               Maintainer guide
src/                Build program: content loading, Markdown, templates, feeds
static/             CSS, JavaScript, icons and images, published as they are
test/               Unit and whole-site tests (node --test)
```

## Licence

- Text and data: [Creative Commons Attribution-ShareAlike 4.0](LICENSE-CONTENT.md)
- Code: [MIT](LICENSE)
- Fonts: Atkinson Hyperlegible Next and Mono by the Braille Institute, SIL Open Font License, installed from npm and self-hosted.

Published by [Prisha iCube](https://pi3.in/).
