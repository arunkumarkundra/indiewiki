---
title: Analytics without the creepiness
description: Measure what matters with privacy-friendly analytics, set up the few numbers worth watching, and avoid consent banners where you can.
type: guide
updated: 2026-10-16
order: 1
nav_title: Analytics
time: 9 min read
tags: [analytics, plausible, umami, posthog, google analytics, cloudflare web analytics, metrics, activation, retention, privacy]
faq:
  - q: Do I need Google Analytics?
    a: No. Cookie-free tools such as Cloudflare Web Analytics, Plausible or Umami give most small products the traffic numbers they need without a consent banner. Use Google Analytics if you run Google Ads or need its specific reports.
  - q: Which numbers should I track first?
    a: Visitors and where they came from, sign-ups, activation (the first moment a user gets real value), and how many users come back after one or two weeks. Revenue once you charge.
sources:
  - title: PostHog pricing and free allowances
    url: https://posthog.com/pricing
  - title: Umami pricing
    url: https://umami.is/pricing
related: [/ship/privacy-and-legal/, /grow/first-100-users/, /tools/analytics/]
---

Analytics should answer a few questions you will act on, not fill a dashboard you never open. For a small product, that means: where do people come from, do they sign up, do they get value, and do they come back? Compare tools in [Analytics](/tools/analytics/).

## Two layers

**Website traffic**: visits, sources, pages, countries. Use a light, cookie-free tool on your marketing site: [[tool:cloudflare-web-analytics]] (free), [[tool:umami]] (free cloud plan, or self-host), or [[tool:plausible]] (paid, with a trial). No cookies usually means no consent banner.

**Product usage**: what signed-in users do inside the app. Use event-based product analytics such as [[tool:posthog]], whose free allowance covers 1 million events a month. Track a handful of meaningful events, not every click.

## The few numbers that matter

| Number | Question it answers |
| --- | --- |
| Visitors by source | Which channels bring people? |
| Sign-up rate | Does the landing page convince? |
| Activation rate | Do new users reach the first real value? |
| Week 1 and week 4 retention | Do they come back? |
| Conversion to paid | Is it worth paying for? |
| Monthly recurring revenue (MRR) and churn | Is the business growing? |

Decide your **activation event** carefully: the moment a user gets the result they came for (first invoice sent, first report generated). Most early improvements come from getting more sign-ups to that moment.

## Set up events with intent

- Name events consistently in past tense: `signed_up`, `project_created`, `invoice_sent`, `plan_upgraded`.
- Attach useful properties (plan, source) but no personal data such as email addresses or message contents.
- Keep a short list of your events and what each means in your repository.

## Privacy and consent

- Cookie-free, aggregate analytics usually needs no banner. Session recordings, heatmaps and advertising pixels usually do, in the EU and UK.
- Mask text inputs and personal data in session replays.
- List every analytics tool in your privacy policy. See [Privacy, terms and the law](/ship/privacy-and-legal/).
- Turn on billing limits so a traffic spike cannot run up an analytics bill.

## Talk to users too

Numbers tell you **what** happens; conversations tell you **why**. When activation drops or a channel stops working, email five recent users and ask what happened. It is often faster than any dashboard.
