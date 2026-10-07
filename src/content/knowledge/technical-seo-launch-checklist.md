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
---

## Before publishing

- Give each indexable page a unique title and accurate summary.
- Confirm canonical URLs point to the preferred HTTPS domain.
- Include only public, canonical pages in the sitemap.
- Ensure robots.txt does not block assets or pages that should be crawled.
- Use working internal links and human-readable URL paths.
- Provide Open Graph title, description, and image with correct absolute URLs.
- Keep private drafts, internal search results, and error pages out of search indexing.

## After deployment

Open the deployed canonical page and check response status, source HTML, sitemap, and robots file. Submit the sitemap through the relevant webmaster tools if used. Watch for DNS/TLS errors, redirects to an unintended hostname, duplicate canonical variants, and indexing reports. Search visibility takes time and is not assured by passing this checklist.

Google recommends clear site structure and crawlable content in its [developer SEO guide](https://developers.google.com/search/docs/fundamentals/get-started-developers). See the official [sitemap guidance](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap) for format and submission details.
