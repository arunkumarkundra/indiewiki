# IndieWiki

**The practical wiki for independent builders.** The repository is the source of truth; the public site is generated from reviewed Markdown.

## Local preview

Install Node.js 20.19+ or 22.12+ and pnpm, then run:

```sh
pnpm install
pnpm dev
```

Build the site and local full-text index with `pnpm build`. Run `pnpm check` for Astro diagnostics and generated-site checks. See [how to write a page](src/content/README.md), the [content guide](CONTENT_GUIDE.md), and [contribution workflow](CONTRIBUTING.md).

## Architecture

Astro generates static pages from validated Markdown in `src/content/knowledge/`. Pagefind builds a browser-side search index after generation. GitHub Actions builds, validates, and deploys to GitHub Pages. No runtime database or application server is needed.

## Hosting

The configured custom domain is `indie.pi3.in` (`public/CNAME`). Configure GitHub Pages to use GitHub Actions and point the domain's DNS records at GitHub Pages before expecting the custom domain to resolve. Deployment status appears in the repository Actions tab.
