---
title: "Set a practical web performance budget"
description: "A lightweight approach to keeping important pages responsive by measuring real user experience and avoiding unnecessary assets."
slug: web-performance-budget
category: quality
kind: article
tags: [performance, Core Web Vitals, web]
audience: [independent builders, solo founders, small teams]
status: published
evidence: multiple-sources
confidence: moderate
lastVerified: 2026-10-07
related: [quality]
featured: false
seedSources: []
sources:
  - title: "Defining Core Web Vitals thresholds"
    url: https://web.dev/articles/defining-core-web-vitals-thresholds
    publisher: "web.dev"
    accessed: 2026-10-07
---

## Make performance visible

Measure representative pages on a real device and network profile, not only on a developer laptop. Separate local lab checks, which help reproduce regressions, from field measurements, which show what users experienced. Track the main contentful area, input responsiveness, and layout stability.

As current reference thresholds, web.dev defines “good” Core Web Vitals at the 75th percentile as LCP at or below 2.5 seconds, INP at or below 200 milliseconds, and CLS at or below 0.1. These are population thresholds, not a guarantee that every device feels fast.

## Spend bytes deliberately

Prefer static HTML for content pages, responsive compressed images, system fonts or carefully subsetted local fonts, and small scripts loaded only when needed. Avoid shipping large UI libraries for interactions that native HTML can provide. Reserve image dimensions to reduce layout shifts. Defer nonessential third-party scripts.

Set a baseline, then investigate the largest measured bottleneck. Recheck after meaningful changes and on lower-end mobile hardware. See [web.dev’s Core Web Vitals thresholds](https://web.dev/articles/defining-core-web-vitals-thresholds) for definitions and context.
