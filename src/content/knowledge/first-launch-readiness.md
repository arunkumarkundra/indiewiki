---
title: "A pre-launch checklist for an independent product"
description: "A practical release gate covering the core user journey, recovery, data handling, support, and measurement before inviting a wider audience."
slug: first-launch-readiness
category: checklists
kind: checklist
tags: [launch, release, checklist]
audience: [independent builders, solo founders, small teams]
status: published
evidence: mixed
confidence: moderate
lastVerified: 2026-10-07
related: [checklists]
featured: false
seedSources: []
sources:
  - title: "WCAG 2.2 Understanding"
    url: https://www.w3.org/WAI/WCAG22/Understanding/
    publisher: "W3C"
    accessed: 2026-10-07
  - title: "OWASP Top Ten"
    url: https://owasp.org/www-project-top-ten/
    publisher: "OWASP"
    accessed: 2026-10-07
---

## Launch when the promised path is dependable

A launch is an invitation for real people to use the product. The bar is not “every feature is done”; the bar is that the product’s stated promise is clear, its core path works, and users have a safe way to recover or ask for help.

## Product and content

- State who the product is for, the problem it solves, and what it does not do.
- Complete the primary task with a realistic account and realistic data.
- Test first visit, empty account, invalid input, slow network, error, retry, and successful completion.
- Check mobile layout, keyboard operation, labels, and critical accessibility barriers.
- Remove placeholder text, stale copy, broken links, sample customer data, and claims you cannot support.
- Explain setup prerequisites, known limitations, support route, pricing, renewal, cancellation, and data deletion where relevant.

## Security and operations

- Verify authentication and server-side authorization for every private action.
- Check secrets are not in the repository, browser bundle, logs, screenshots, or AI prompts.
- Review dependency and deployment changes; use HTTPS and supported runtime versions.
- Know how to deploy, roll back, restore a backup, rotate access, and contact providers.
- Confirm error reporting works without capturing passwords or unnecessary personal data.
- Set a realistic support expectation and nominate a backup operator if the main builder is unavailable.

If the product stores important user data, make and restore a backup before broad access. If an incident could affect safety, money, regulated data, or many customers, get qualified review before launch.

## Release in a way you can learn from

Choose a small first cohort you can support. Define what counts as meaningful activation and the one or two product outcomes you will inspect. Tell users what is experimental and what is stable. Provide a clear way to report a problem and stop onboarding if a severe issue appears.

Before release, record the commit/version, deployment time, smoke checks, known issues, and rollback action. Afterward, watch logs and user messages during the first real uses. If the core outcome fails, pause promotion, fix the blocker, and contact affected users when appropriate. Do not interpret traffic as success if users cannot complete the task.

## Do not use a checklist as a substitute for judgment

A static brochure site has a different risk profile from a product that handles payments, identity documents, or health data. Tailor the release review to what the system can do and what failure costs. See [security review](/wiki/secure-an-ai-built-app/), [accessible product basics](/wiki/accessible-product-basics/), and [deployment with GitHub Pages](/wiki/deployment-with-github-pages/).
