---
title: SEO checklist for indie products
description: Everything that gets a new site indexed and ranking, in the order to do it, from Search Console and sitemaps to search intent, internal links and backlinks.
type: checklist
updated: 2026-10-16
order: 2
nav_title: SEO checklist
time: Half a day for the first pass
tags: [seo, search engine optimisation, google, indexing, sitemap, robots.txt, canonical, meta description, backlinks, core web vitals, keywords]
faq:
  - q: How long until my new site shows up on Google?
    a: Often a few days to a few weeks for the first pages to be indexed after you submit a sitemap in Search Console. Ranking for competitive terms takes months of useful content and links.
  - q: Does FAQ schema still help?
    a: Google shows FAQ rich results mainly for well-known government and health sites since 2023, so most sites will not get the expanded result. The markup is harmless, and a clear questions section still helps readers and AI assistants that read your page.
  - q: Do I need server-side rendering for SEO?
    a: You need pages whose main content arrives in the HTML, either as static files or rendered on the server. Google can run JavaScript, but slowly and not always. Static or server-rendered pages are indexed faster and more reliably.
  - q: Is AI-written content bad for SEO?
    a: Google ranks helpful content regardless of how it was made, and acts against mass-produced pages that add nothing. Use AI to draft, then add what only you know, real examples, data and screenshots, and cut the filler.
sources:
  - title: "Google Search Central: SEO guide for web developers"
    url: https://developers.google.com/search/docs/fundamentals/get-started-developers
  - title: Google Search Central documentation
    url: https://developers.google.com/search/docs
related: [/ship/google-search-console/, /grow/content-and-seo/, /ship/website-essentials/]
---

SEO for a small product is mostly three things: make sure search engines can find and read every page, make each page clearly answer one search, and earn a few links from places people trust. Work through this list in order; the early items unblock everything after them.

Tools for every step are in [SEO tools](/tools/seo-tools/).

## Get indexed

- [ ] [[tool:google-search-console]] is set up for the domain and verified. See [Google Search Console](/ship/google-search-console/).
- [ ] [[tool:bing-webmaster-tools]] is set up too (import from Search Console in one click).
- [ ] A `sitemap.xml` lists every public page and is submitted to both.
- [ ] `robots.txt` allows Googlebot and other crawlers, and points to the sitemap.
- [ ] No page you want found has a `noindex` tag (a common leftover from development or staging).
- [ ] Main content is in the HTML the server sends, not added later by JavaScript only.
- [ ] Search Console's page indexing report shows no unexpected "Excluded" or "Error" pages.

## Clean URLs and duplicates

- [ ] Every page has one address. The other versions (http, www or not, trailing slash or not) redirect to it with a single 301 redirect.
- [ ] A canonical link on each page points to that main address.
- [ ] URLs are short, lowercase, use hyphens and describe the page: `/pricing/`, `/blog/custom-domain-email/`.
- [ ] Broken links, 404s and redirect chains are fixed. A crawl with [[tool:screaming-frog]] finds them.
- [ ] Parameters such as `?ref=` and `?utm_` do not create indexable duplicate pages.

## Each page, one search

- [ ] Each important page targets one search intent: what the searcher wants to know or do.
- [ ] The title is 50 to 60 characters, starts with the main topic, and ends with your brand.
- [ ] Each page has a unique meta description that would make someone click.
- [ ] One `<h1>`, then `<h2>` and `<h3>` headings in order, describing the sections.
- [ ] The first two sentences answer the question the page is about. No long warm-up.
- [ ] Images are compressed, sized correctly, and have descriptive alt text.
- [ ] Important pages are linked from the home page or main navigation, and from related pages, with descriptive link text.
- [ ] No orphan pages: every page is reached by at least one internal link.

## Structured data

- [ ] Breadcrumbs on deeper pages, with BreadcrumbList markup.
- [ ] Organization or WebSite markup on the home page.
- [ ] Article, Product or SoftwareApplication markup where it fits.
- [ ] Every markup type tested in the [[tool:rich-results-test]].

## Speed and mobile

- [ ] The site works and reads well on a phone without zooming.
- [ ] [[tool:pagespeed-insights]] shows good Core Web Vitals on mobile, or you know which issue to fix next.
- [ ] Images and fonts load without making the layout jump.
- [ ] Third-party scripts are few, and none block the page from showing.

## Content that earns its place

- [ ] A page for each main feature and each main use case, written in the words customers use.
- [ ] Comparison and "alternative to" pages for the big tools you compete with, honest about where they are better.
- [ ] Thin or overlapping pages are merged, so two of your pages do not compete for the same search.
- [ ] Each article shows the author and the date it was last updated, and the date changes only when the content does.
- [ ] Obvious AI filler is cut: no generic intros, no repeated summaries, no claims without examples.

## Links and mentions

- [ ] Your product is listed in the directories and launch sites where your users look. See [Where to launch](/launch/where-to-launch/).
- [ ] Sites that mention you without linking are asked politely for a link.
- [ ] You know who links to your competitors and have contacted the relevant ones with something useful.
- [ ] You show up helpfully in community threads that already rank for your topic.

## Quick wins after a month

- [ ] Pages with many impressions but a low click rate in Search Console get a better title and description.
- [ ] Pages ranking on page two for a useful query get updated and better linked internally first.
- [ ] Questions from "People also ask" and from your support inbox become short answer sections or pages.
- [ ] Pages losing traffic are refreshed before they drop further.
- [ ] A search for `site:yourdomain.com` shows titles that are not cut off and include the main keyword.
