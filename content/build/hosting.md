---
title: Hosting your website
description: Compare free hosting on Cloudflare Pages, GitHub Pages, Netlify and Vercel, including the commercial-use rules that catch founders out after launch.
type: comparison
updated: 2026-10-16
order: 2
time: 10 min read
tags: [hosting, github pages, cloudflare pages, netlify, vercel, free hosting, static site, commercial use]
faq:
  - q: Can I host my SaaS landing page on GitHub Pages?
    a: GitHub's own documentation says Pages is not intended or allowed as free hosting for commercial purposes, including online businesses and commercial software as a service. Use Cloudflare Pages or a paid plan elsewhere for a product that sells something.
  - q: Is Vercel free for commercial projects?
    a: No. Vercel's Hobby plan is restricted to personal, non-commercial use. Commercial projects need the Pro plan, which is billed per developer seat plus usage.
  - q: Which free host is best for a commercial site?
    a: Cloudflare Pages is the usual choice. Its free plan allows commercial use, includes 500 builds a month, and does not meter static traffic.
sources:
  - title: GitHub Pages limits and prohibited uses
    url: https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits
  - title: Vercel Hobby plan
    url: https://vercel.com/docs/plans/hobby
  - title: Cloudflare Pages limits
    url: https://developers.cloudflare.com/pages/platform/limits
  - title: Netlify credit-based pricing plans
    url: https://docs.netlify.com/manage/accounts-and-billing/billing/billing-for-credit-based-plans/credit-based-pricing-plans/
related: [/build/choose-your-stack/, /setup/dns-explained/, /ship/security-headers/]
---

Free hosting for websites is excellent in 2026, but each host has rules in the small print. The one that matters most is **whether you may use it for a business**. Read this before launch, not after an account review.

## The short answer

- Selling something, or likely to soon: **[[tool:cloudflare-pages]]**.
- Free tool, docs, portfolio or open-source project: **[[tool:github-pages]]** is fine and very simple.
- Next.js app with a budget: **[[tool:vercel]] Pro**.
- Want built-in form handling and can live within monthly credits: **[[tool:netlify]]**.

## Side by side

| What | Cloudflare Pages | GitHub Pages | Netlify | Vercel |
| --- | --- | --- | --- | --- |
| Commercial use on free plan | Allowed | Not allowed | Allowed within credits | Not allowed on Hobby |
| Free plan shape | 500 builds a month | 1 GB site, 100 GB a month soft limit | 300 credits a month, hard stop | Monthly allowances; features pause for up to 30 days if exceeded |
| Custom domain and HTTPS | Yes | Yes | Yes | Yes |
| Custom response headers | Yes | No | Yes | Yes |
| Server code | Workers and Pages Functions | None | Functions | Functions |
| Private repository on free plan | Yes | Needs paid GitHub | Yes | Yes |

The figures come from each provider's documentation, checked in October 2026. Prices and limits change; follow the links in the Toolbox before you decide.

## Why commercial-use rules matter

GitHub's documentation says Pages is not to be used as free hosting for online businesses, e-commerce or commercial SaaS. Vercel's Hobby plan is for personal, non-commercial use only. Hosts rarely act on a small site straight away, but if your account is reviewed after launch you may have to move in a hurry, at the worst possible moment. Choose the right home from day one.

## Static, server-rendered or single-page app?

- **Static**: every page is a ready-made HTML file. Fastest, cheapest, most secure, best for search. Ideal for landing pages, docs and blogs. This wiki is static.
- **Server-rendered**: pages are built on a server for each request or cached. Good when pages depend on live data and still need search visibility.
- **Single-page app**: one HTML page that JavaScript fills in. Fine behind a login, weaker for search unless you add pre-rendering.

## Move your site later without breaking links

Keep URLs stable when you change hosts. Every host can serve the same paths. Before switching DNS, deploy to the new host, test it on its temporary address, then change the DNS records. Keep the old host running for a day in case you need to switch back.
