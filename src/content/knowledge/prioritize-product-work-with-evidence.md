---
title: "Prioritize product work with evidence and explicit trade-offs"
description: "Choose the next product task by balancing user impact, evidence, risk, effort, dependencies, and the cost of waiting."
slug: prioritize-product-work-with-evidence
category: product
kind: article
tags: [prioritization, roadmap, product-management]
audience: [independent builders, solo founders, small teams]
status: published
evidence: practitioner
confidence: moderate
lastVerified: 2026-10-07
reviewBy: 2027-04-07
reviewTrigger: "Recheck when customer evidence, product stage, team capacity, operational risk, or business constraints materially change."
related: [product, operate]
featured: false
seedSources: []
sources:
  - title: "Deciding on priorities"
    url: https://www.gov.uk/service-manual/agile-delivery/deciding-on-priorities
    publisher: "GOV.UK Service Manual"
    accessed: 2026-10-07
  - title: "Core principles of agile"
    url: https://www.gov.uk/service-manual/agile-delivery/core-principles-agile
    publisher: "GOV.UK Service Manual"
    accessed: 2026-10-07
---

## Prioritize the next decision, not an impressive backlog

A backlog is a list of possible work, not evidence that each item should be built. Start with the goal for this stage: confirm that a problem recurs, help a first user complete the job, improve reliability, or learn whether the offer can support the business. The right next task is the one that meaningfully advances that goal while keeping unacceptable risks controlled.

GOV.UK guidance notes that priorities should change with the product’s phase and draw on performance data, user research, and other constraints. Its service-team context is larger than many indie projects, but the principle applies: do not let the feature list determine the work without checking the current user problem and operating condition.

## Build a small decision table

For each candidate, write down:

| Factor | Question |
|---|---|
| User outcome | Which user and task improve? What evidence connects this task to that outcome? |
| Consequence | What happens if the problem remains for another month? |
| Confidence | Is this supported by observed behavior, or only an internal guess? |
| Risk | Could delay cause data loss, security exposure, exclusion, financial harm, or a broken promise? |
| Effort and dependencies | What is the smallest meaningful test or change, and what must happen first? |
| Reversibility | Can we test cheaply, undo the decision, or migrate later? |
| Opportunity cost | Which more important task will wait if we choose this? |

Use a brief scale such as low/medium/high with one sentence of evidence. Do not multiply scores into a supposedly objective ranking unless the inputs are meaningful and consistently defined. A score can make assumptions visible; it cannot make weak evidence strong.

## Protect work that is easy to overlook

New features compete with support, accessibility, reliability, privacy, security, maintenance, and technical debt. Keep separate rows for recurring failures, customer promises, data retention or deletion, dependencies with known risk, and necessary operational work. A backlog made only of requested features gradually shifts cost onto users and future maintainers.

Use a simple decision sequence:

1. Address urgent safety, privacy, security, legal, or data-integrity risks.
2. Fix a core task that users cannot complete or recover from.
3. Test the riskiest assumption blocking a product or business decision.
4. Improve repeated friction in the most important user journey.
5. Defer speculative features until evidence or a concrete constraint makes them relevant.

This is a starting order, not a universal ranking. A product with a near-term legal deadline or a failing paid service will need a different queue. Explain exceptions in the decision note.

## Make the smallest useful commitment

Before taking a multi-week feature into development, look for a smaller way to answer the key question: a manual service, prototype, narrow cohort, or one supported file format. Specify the result that would justify expansion and the result that would change your mind. Separate work that creates immediate user value from work that reduces uncertainty or risk; both can be valuable, but they should not be mislabeled.

Revisit priorities at a cadence that matches your volume—perhaps after each research round, weekly if you have active users, or at each release. GOV.UK recommends regular prioritization and adapting it by development phase. A solo builder can simply keep a one-page list of the top three current tasks and revisit it when customer evidence, incidents, or costs change.

Record a short decision: selected task, evidence, trade-off, what was deferred, and a review trigger. This prevents a roadmap from silently becoming a promise. Use [the requirement guide](/wiki/turn-user-needs-into-requirements/) to keep stories tied to outcomes and [MVP scope](/wiki/product-scope-mvp/) to define what this release will leave out.
