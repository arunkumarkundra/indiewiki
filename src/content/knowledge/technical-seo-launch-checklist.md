---
title: "Technical SEO checks before publishing"
description: "A release checklist for making public wiki pages crawlable, canonical, shareable, and easy to inspect after deployment."
slug: technical-seo-launch-checklist
category: ship
kind: checklist
tags: [technical SEO, sitemap, launch]
audience: [independent builders, solo founders, small teams]
status: published
evidence: multiple-sources
confidence: moderate
lastVerified: 2026-10-07
related: [ship]
featured: false
seedSources: []
sources:
  - title: "Build and submit a sitemap"
    url: https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap
    publisher: "Google Search Central"
    accessed: 2026-10-07
  - title: "SEO guide for developers"
    url: https://developers.google.com/search/docs/fundamentals/get-started-developers
    publisher: "Google Search Central"
    accessed: 2026-10-07
---

## Before the first public deployment

### Indexable pages

- Confirm every intended public page returns a successful response and contains its main content in the delivered HTML.
- Give each page a unique, descriptive title and accurate meta description.
- Set the canonical URL to the preferred HTTPS hostname and verify there are no accidental staging canonicals.
- Use a stable, readable path. Redirect old paths when they change if the host supports it.
- Include only canonical, public, useful URLs in the XML sitemap.
- Keep search results, drafts, private previews, and error pages out of the sitemap and search index.

### Crawl and rendering

- Check `robots.txt` is reachable and does not block intended pages or assets needed to render them.
- Ensure pages link to each other with ordinary, crawlable anchors and descriptive text.
- Confirm the site works without requiring a search script before article content appears.
- Check internal links and external references; remove fragments that point nowhere.
- Avoid duplicate host and slash variants or configure one canonical behavior.

### Sharing and structured data

- Inspect Open Graph title, description, canonical URL, and image dimensions/absolute URL.
- Add structured data only if it reflects visible page content and the page qualifies for the relevant feature. Do not add ratings, authors, or dates that are not real.

## After deployment

Open the production hostname in a private browser window. Check the homepage, an article, a category, a deep link, a missing path, search, RSS, sitemap, robots file, and an image asset. Inspect response status and source HTML. Test mobile and keyboard navigation. Confirm HTTPS and the canonical host. If using a custom domain, verify DNS and TLS separately from site build status.

In Google Search Console or the equivalent service, verify ownership, submit the sitemap if useful, and inspect reported indexing errors. Search visibility is not guaranteed by a perfect technical checklist; write useful pages and let crawl data guide fixes.

Google’s [developer SEO guide](https://developers.google.com/search/docs/fundamentals/get-started-developers) and [sitemap instructions](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap) provide current search-engine guidance. See [SEO for documentation](/wiki/seo-for-documentation/) for content quality and [deployment with GitHub Pages](/wiki/deployment-with-github-pages/) for release troubleshooting.
