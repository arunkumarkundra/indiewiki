---
title: "Set a practical web performance budget"
description: "A lightweight approach to keeping important pages responsive by measuring real user experience and avoiding unnecessary assets."
slug: web-performance-budget
category: quality
kind: article
tags: [performance, Core Web Vitals, web]
audience: [independent builders, solo founders, small teams]
status: published
evidence: mixed
confidence: moderate
lastVerified: 2026-10-07
reviewBy: 2027-01-07
reviewTrigger: "Recheck after upstream documentation, security advisories, pricing, supported versions, or relevant platform policies change."
related: [quality]
featured: false
seedSources: []
sources:
  - title: "Defining Core Web Vitals thresholds"
    url: https://web.dev/articles/defining-core-web-vitals-thresholds
    publisher: "web.dev"
    accessed: 2026-10-07
---

## Measure a user journey before setting a budget

A performance budget is a limit you choose to prevent regressions in the parts of a product users feel. Begin with a real task—open the landing page, search, load a dashboard, save a record—on a representative low-end device and network. Record a baseline before optimizing. Do not treat a single Lighthouse score as a complete description of real user experience.

## Use field and lab data for different questions

Lab tests are repeatable and useful for finding regressions. Field data shows what actual users experienced across devices, networks, and locations, but may be sparse for a new product. Check both where available. Google’s current Core Web Vitals “good” thresholds at the 75th percentile are LCP ≤2.5 seconds, INP ≤200 milliseconds, and CLS ≤0.1; these are population thresholds, not a promise every visit feels fast. See [web.dev’s definitions](https://web.dev/articles/defining-core-web-vitals-thresholds).

Track the user-visible bottleneck. A page can meet a metric while its key interaction remains confusing or slow. Use performance traces and network waterfalls to identify whether the cost is images, JavaScript, fonts, API latency, database queries, or third-party scripts.

## Set a budget tied to the product

For a content site, you might cap initial transfer size, client-side JavaScript, and third-party requests. For an interactive app, set an acceptable response time for the main action and a target for the slowest common query. Write the environment and measurement method next to each limit. A budget without a repeatable test is only an aspiration.

## Fix the largest cost first

- Resize and compress images; provide responsive variants and reserve dimensions to prevent layout shift.
- Remove unused JavaScript and load nonessential code only on pages that need it.
- Prefer platform features and semantic HTML over shipping a library for a small interaction.
- Cache public, stable content safely; do not cache private responses across accounts.
- Reduce database round trips and request duplicate work only after observing traces.
- Defer third-party widgets until they are needed and monitor their impact.

After each change, repeat the same measurement and verify visual behavior. Keep the budget in CI for automated regressions where practical, and review field metrics after release. Do not trade security, readable content, or accessibility for a small synthetic score improvement.
