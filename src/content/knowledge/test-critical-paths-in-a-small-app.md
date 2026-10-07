---
title: "Test the critical paths in a small app"
description: "Build a focused test plan around user harm and change risk, using the lightest check that gives useful confidence."
slug: test-critical-paths-in-a-small-app
category: quality
kind: recipe
tags: [testing, quality, release-readiness]
audience: [independent builders, solo founders, small teams]
status: published
evidence: mixed
confidence: moderate
lastVerified: 2026-10-07
reviewBy: 2027-04-07
reviewTrigger: "Recheck when the product's critical user journeys, test framework, data handling, or deployment architecture changes."
related: [quality, build, ship]
featured: false
seedSources: []
sources:
  - title: "Best Practices"
    url: https://playwright.dev/docs/best-practices
    publisher: "Playwright"
    accessed: 2026-10-07
  - title: "Isolation"
    url: https://playwright.dev/docs/browser-contexts
    publisher: "Playwright"
    accessed: 2026-10-07
  - title: "Fixing a Test Hourglass"
    url: https://testing.googleblog.com/2020/11/fixing-test-hourglass.html
    publisher: "Google Testing Blog"
    accessed: 2026-10-07
---

## Choose tests by risk

Tests are evidence that specified behavior held under checked conditions. They do not prove a system has no defects. Begin with the user journeys where a defect would lose data, expose another account's information, charge incorrectly, block access, or prevent the product's main job.

Write a small risk table before choosing tools:

| Journey or rule | What can go wrong? | User impact | Cheapest useful check |
| --- | --- | --- | --- |
| Create and save the main record | Validation or persistence fails | Lost work | Unit rule test plus database integration check |
| View a record as another account | Ownership filter is missing | Data exposure | Authorization integration test with two accounts |
| Subscribe or cancel | Duplicate or missed state transition | Incorrect billing/access | Provider sandbox plus webhook/idempotency checks |
| Complete first-use journey | Navigation or setup is blocked | User cannot reach value | One end-to-end test, then manual review of failure states |

Rank by impact and likelihood, then include the high-risk cases first. Add checks when code changes or an incident reveals a gap. A test that no longer protects a meaningful behavior is a maintenance cost; remove or rewrite it rather than keeping a large, brittle suite for its own sake.

## Match the check to the question

Use **unit tests** for deterministic rules that are cheap to isolate: price calculations, permissions policy functions, status transitions, and input validation. Use **integration tests** where correctness depends on the real boundary you control, such as database constraints, transactions, file permissions, or webhook deduplication. Keep **end-to-end tests** for a few complete user paths whose wiring across browser, app, and services matters. Test behavior a user can see rather than internal function names; Playwright’s [testing guidance](https://playwright.dev/docs/best-practices) recommends user-visible assertions and isolated test data. Its [browser contexts](https://playwright.dev/docs/browser-contexts) provide independent cookies and storage for browser tests.

Google’s testing blog discusses a test pyramid versus “hourglass” shape in the context of Google systems. Treat the article as an engineering case study, not a universal ratio. Your useful mix depends on framework, architecture, and defect history. A static marketing site may need a few build/link checks and manual device review. A multi-tenant app handling paid records needs more authorization and persistence checks than a brochure site.

For each critical path, include at least one unhappy case: invalid input, expired session, denied access, duplicate request, provider timeout, empty result, or retry. Use safe test accounts and non-production payment credentials. Never point a test that creates, edits, or deletes data at live customer records.

## Keep feedback trustworthy

Tests should start from known data and be safe to run repeatedly. Isolate accounts, cookies, files, and database rows; make cleanup explicit. Avoid relying on test order or on a third-party service being available. Stub a provider for ordinary tests, then use its sandbox or contract checks for the boundary where provider behavior matters.

When a test fails, first decide whether it found a product defect, an obsolete expectation, or a flaky setup. Do not mute retries and declare success without finding the cause. Keep a short release checklist for what automated checks cannot cover: keyboard flow, small-screen layout, email rendering, production configuration, and a smoke check after deployment.

For a compact selection of first-release paths, pair this page with [first launch readiness](/wiki/first-launch-readiness/) and [map a core user flow](/wiki/map-a-core-user-flow-and-states/). Reassess the risk table after changing authentication, payments, tenancy, or data storage.
