---
title: Set up Google Search Console
description: Verify your domain, submit your sitemap, request indexing and read the reports that matter, step by step, in about fifteen minutes.
type: guide
updated: 2026-10-16
order: 3
nav_title: Google Search Console
time: 15 min
tags: [google search console, gsc, sitemap, indexing, verification, dns txt, seo, bing webmaster]
faq:
  - q: Domain property or URL prefix property?
    a: Choose Domain. It covers every version of your site (http, https, www and subdomains) in one place. It needs a DNS TXT record, which takes two minutes.
  - q: Search Console says "Discovered, currently not indexed". What do I do?
    a: Nothing urgent on a new site. Google knows the page and will crawl it later. Make sure it is linked from other pages on your site and in the sitemap. If it stays that way for weeks, improve the page or merge it with a similar one.
  - q: Does requesting indexing make my page rank?
    a: No. It only asks Google to crawl the page sooner. Ranking depends on the page being useful and trusted.
related: [/ship/seo-checklist/, /setup/dns-explained/, /ship/site-reputation/]
---

Search Console is Google's free dashboard for your site. It is the only place that tells you exactly which pages Google has indexed, which searches show your site, and what is broken. Set it up on launch day. It also helps if a security filter ever flags your domain, because it is where you request reviews. Compare it with other tools in [SEO tools](/tools/seo-tools/).

## Verify your domain

::: steps
1. **Open Search Console.** Go to search.google.com/search-console and sign in with a Google account you will keep (ideally one tied to the business, not a personal account you might lose).
2. **Add a property and choose "Domain".** Type your domain without `https://` or `www`, for example `yourproduct.com`.
3. **Copy the TXT record.** Google shows a value starting with `google-site-verification=`.
4. **Add it to DNS.** In your DNS provider, add a **TXT** record with name `@` (the root) and the value you copied. If you use Cloudflare, it does not matter whether the cloud is orange or grey for TXT records.
5. **Click Verify.** If it fails, wait ten minutes and try again. DNS changes can take a little while.
:::

::: tip Keep the TXT record forever
Search Console checks the record from time to time. If you delete it, you lose access.
:::

## Submit your sitemap

::: steps
1. **Find your sitemap address.** Usually `https://yourproduct.com/sitemap.xml`. Open it in a browser to check it loads and lists your pages.
2. **Open Sitemaps** in the left menu.
3. **Enter `sitemap.xml`** and click Submit.
4. **Check the status** later the same day. It should say Success with a count of discovered pages.
:::

Also make sure your `robots.txt` contains a `Sitemap:` line with the full sitemap address, so every search engine finds it.

## Ask Google to look at important pages

For your home page and two or three key pages, paste the full address into the **URL inspection** bar at the top. If it says "URL is not on Google", click **Request indexing**. There is a daily limit, so do not use it for every page; the sitemap handles the rest.

## The reports worth checking

| Report | Look for | Do |
| --- | --- | --- |
| Performance | Queries with many impressions and few clicks | Rewrite that page's title and meta description |
| Performance | Pages at positions 8 to 20 | Improve and link to them internally |
| Pages (indexing) | "Not indexed" reasons | Fix noindex tags, redirects, duplicates and 404s |
| Core Web Vitals | Poor mobile URLs | Fix slow or jumpy pages first |
| Security issues | Anything at all | Follow the steps; this affects browser warnings |
| Manual actions | Anything at all | Fix and request reconsideration |

Check once a week for the first month, then monthly.

## Do the same for Bing

Bing Webmaster Tools can import your verified Search Console property in one click, including the sitemap. It covers Bing and the services that use its index, so the five minutes are worth it.

## Common mistakes

- Verifying a **URL prefix** for `https://www.` only, then wondering why other versions have no data.
- Leaving a `noindex` tag from a staging site on the live site.
- A sitemap listing addresses that redirect or return errors.
- Removing the verification TXT record during a DNS clean-up.
