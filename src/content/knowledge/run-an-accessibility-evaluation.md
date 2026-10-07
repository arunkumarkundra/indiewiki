---
title: "Run a scoped accessibility evaluation for a small product"
description: "Define an honest evaluation scope, inspect representative pages and journeys, combine manual and automated checks, and report limitations clearly."
slug: run-an-accessibility-evaluation
category: quality
kind: recipe
tags: [accessibility, WCAG, evaluation]
audience: [independent builders, solo founders, small teams]
status: published
evidence: primary
confidence: high
lastVerified: 2026-10-07
reviewBy: 2027-01-07
reviewTrigger: "Recheck when WCAG or WCAG-EM changes, the supported user journeys or technologies change, or a legal requirement applies to a new jurisdiction."
related: [quality, product, ship]
featured: false
seedSources: []
sources:
  - title: "WCAG Evaluation Methodology (WCAG-EM) 2.0"
    url: https://www.w3.org/TR/wcag-em-2/
    publisher: "W3C"
    accessed: 2026-10-07
  - title: "Web Content Accessibility Guidelines (WCAG) 2.2"
    url: https://www.w3.org/TR/WCAG22/
    publisher: "W3C"
    accessed: 2026-10-07
  - title: "Testing for accessibility"
    url: https://www.gov.uk/service-manual/helping-people-to-use-your-service/testing-for-accessibility
    publisher: "GOV.UK Service Manual"
    accessed: 2026-10-07
---

## Be clear about the claim you are evaluating

An accessibility evaluation is a structured review of a defined product against a chosen version and conformance level of the Web Content Accessibility Guidelines (WCAG). A quick scan, automated tool, or checklist is useful for finding some barriers; none establishes complete conformance by itself.

W3C’s [WCAG-EM 2.0](https://www.w3.org/TR/wcag-em-2/) was published as a Group Note on 23 July 2026. It describes a process for scoping, exploring, sampling, evaluating, and reporting. It is an evaluation methodology, not a new WCAG requirement or a substitute for the normative [WCAG 2.2 standard](https://www.w3.org/TR/WCAG22/). Record the target, version, level, language, and environments before you begin. Legal requirements vary by jurisdiction and product type; do not copy a government service’s legal scope onto a private product without checking local rules.

For a first internal pass, set an honest limited target such as “the signup and first-project journey in the current desktop web app, reviewed against WCAG 2.2 AA.” Do not describe that limited pass as “the site is WCAG compliant.” Use [accessible product basics](/wiki/accessible-product-basics/) for direct checks on the most common barriers.

## Explore and choose representative samples

List the product views, templates, technologies, and essential actions. Include the parts that repeat through a shared component (forms, navigation, dialogs), as well as unique or risky content: checkout, authentication, file upload, data tables, interactive charts, settings, error states, and help pages. Note user journeys that cross pages or third-party services.

Choose a sample that covers both common views and essential functionality. For a small app, the sample might be one page from each template plus full signup, core-task, payment, and recovery journeys. Add states that appear only after errors, loading, empty data, or permission changes. If you omit views or technologies, state the omission and why. A page sample is not representative if it excludes the product’s most complex controls.

## Combine tools with human inspection

For each sampled view and journey:

1. Run an automated checker and inspect each finding; tools can report false positives and miss barriers that depend on meaning or sequence.
2. Use the interface by keyboard only. Check logical focus order, visible focus, keyboard access to every action, and a safe way out of menus and dialogs.
3. Inspect page titles, heading structure, landmarks, control names and instructions, text alternatives, error messages, status updates, contrast, zoom/reflow, and reduced motion where relevant.
4. Complete the critical flow with at least one assistive technology used by your audience, such as a screen reader or speech input. Browser/assistive-technology combinations should be chosen from actual audience and platform evidence, not a universal list.
5. Include disabled people in usability research when feasible. Tool output cannot tell you whether the end-to-end task is understandable or workable in someone’s real context.

GOV.UK guidance for its services calls for both automated and manual testing and includes assistive-technology evaluation; the mandated level and audit requirements there belong to that public-sector context. W3C’s evaluation method is technology-agnostic, but a full conformance claim requires the defined evaluation scope and all applicable criteria in that scope—not a quick check of a few components.

## Record, fix, and report findings

For each barrier, record: sample and URL; steps to reproduce; expected and actual behavior; the affected criterion if known; user impact; environment and assistive technology; evidence; owner; and status. Prioritize barriers that block the core task, affect more than one component, expose or lose user data, or have no usable workaround. Fix shared components at their source and retest all affected paths.

Your report should state who evaluated the product, date, scope, WCAG version/level, selected pages and journeys, tools and manual methods, environments, findings, unresolved issues, and limitations. Keep the report with the release decision and update it when the interface changes materially. For public-facing accessibility statements or legal conformance claims, get an appropriately qualified evaluation for the applicable rules. For the ongoing product loop, connect the findings to [requirements and acceptance criteria](/wiki/turn-user-needs-into-requirements/) and [first-launch readiness](/wiki/first-launch-readiness/).
