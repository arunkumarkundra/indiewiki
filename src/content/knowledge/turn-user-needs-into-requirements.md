---
title: "Turn user needs into testable product requirements"
description: "Translate evidence about a user’s job into small requirements and acceptance criteria without prematurely prescribing screens or technology."
slug: turn-user-needs-into-requirements
category: product
kind: article
tags: [requirements, user-stories, product-planning]
audience: [independent builders, solo founders, small teams]
status: published
evidence: mixed
confidence: moderate
lastVerified: 2026-10-07
reviewBy: 2027-04-07
reviewTrigger: "Recheck when user research changes the need, when implementation reveals a missing constraint, or when a legal or accessibility requirement changes."
related: [product, validate]
featured: false
seedSources: []
sources:
  - title: "Writing user stories"
    url: https://www.gov.uk/service-manual/agile-delivery/writing-user-stories
    publisher: "GOV.UK Service Manual"
    accessed: 2026-10-07
  - title: "Understand user needs"
    url: https://www.gov.uk/service-manual/service-standard/point-1-understand-user-needs
    publisher: "GOV.UK Service Manual"
    accessed: 2026-10-07
---

## Keep the need separate from the solution

Begin with a need statement grounded in an observed job: “When a client changes a project brief, a freelance designer needs to see what changed so they can estimate the impact before agreeing to the new deadline.” Avoid turning a proposed solution into the need: “I need a diff view” assumes an implementation before explaining why it matters.

Connect each need to evidence: a research session, support message, workflow observation, or experiment result. Label an unverified belief as an assumption. One person’s request may reveal a real need, but it does not establish how common it is. Track who experiences the need, when it occurs, the consequence, and what is still uncertain.

The [GOV.UK guide to user needs](https://www.gov.uk/service-manual/service-standard/point-1-understand-user-needs) recommends writing from the user’s perspective and validating needs through research. The public-service context differs from a commercial product; use its separation of observed need and proposed feature as a practical discipline rather than a required format.

## Write a story around the goal

A lightweight story makes the actor, task, and outcome explicit:

> As a **[specific user in context]**, I need to **[do a task]**, so I can **[reach an outcome]**.

Example:

> As a studio owner reviewing an invoice, I need to see which approved project changes affected the estimate, so I can explain the amount to my client.

If the story is only “As a user, I want a dashboard,” the user and goal are too vague to prioritize or verify. Split stories when they contain different outcomes, roles, or permission rules. A story that cannot be completed and learned from in a reasonable iteration may be an epic; describe the outcome first, then split along meaningful user value or a testable risk.

## Add acceptance criteria as observable outcomes

Acceptance criteria say how you will know the user’s need is met. Keep them concise and implementation-neutral. Include a normal path and the consequential edge cases:

```text
Need: Explain the estimate change after an approved brief revision.

Done when:
- The owner can see the prior and current estimate and the recorded reason.
- A user without billing permission cannot see or change financial details.
- If the estimate cannot be recalculated, the previous value remains visible
  and the product explains that review is needed.
- The owner can export or share the explanation without exposing other clients.
```

Do not write acceptance criteria such as “the page uses a blue card” unless appearance itself is an evidenced need or an approved design constraint. GOV.UK’s [user-story guidance](https://www.gov.uk/service-manual/agile-delivery/writing-user-stories) describes criteria as outcome checks that help confirm the service has met the need. Link each criterion to research or a risk it addresses, rather than treating a story template as evidence.

## Include constraints and quality needs

Requirements can cover more than visible features. Add constraints for accessibility, privacy, authorization, reliability, performance, data portability, and support when they affect the user outcome. State a measurable threshold only when you can explain its basis. “Loads instantly” is not testable; “the saved draft remains after a refresh” is.

For a small product, record the smallest set that prevents ambiguity:

| Field | What to write |
|---|---|
| User/context | Who is doing what, under which conditions? |
| Need/outcome | What result matters and why? |
| Evidence | What observation supports it; how strong is that evidence? |
| Acceptance checks | What visible or system outcome proves it works? |
| Constraints | Permissions, data, accessibility, failure, and operational limits |
| Open questions | What must be learned before implementation or release? |

## Keep the record useful, not ceremonial

Prioritize stories using user impact, evidence, risk, dependencies, effort, and reversibility—not story points as a proxy for value. Update the story when research changes the need. Remove criteria that only protect a proposed solution. Keep a short decision note when you defer or reject an item so the same debate does not recur without new evidence.

Before implementation, trace the requirement to the [user flow and states](/wiki/map-a-core-user-flow-and-states/) and define what you will observe after release in [product metrics](/wiki/measure-product-progress/). Use [MVP scope](/wiki/product-scope-mvp/) to decide which outcomes belong in the first usable release.
