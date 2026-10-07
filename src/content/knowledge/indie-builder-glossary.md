---
title: "A glossary for independent product builders"
description: "Short definitions for recurring product, research, engineering, and business terms used across this wiki."
slug: indie-builder-glossary
category: reference
kind: glossary
tags: [glossary, concepts, reference]
audience: [independent builders, solo founders, small teams]
status: published
evidence: multiple-sources
confidence: moderate
lastVerified: 2026-10-07
related: [reference]
featured: false
seedSources: []
sources:
  - title: "Authentication Cheat Sheet"
    url: https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html
    publisher: "OWASP"
    accessed: 2026-10-07
  - title: "Authorization Cheat Sheet"
    url: https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html
    publisher: "OWASP"
    accessed: 2026-10-07
---

## Product and discovery

**Activation** — the first user action that demonstrates meaningful progress toward the product’s promised outcome. Signing up is not necessarily activation.

**Assumption** — something that must be true for a product or business plan to work but has not yet been established by evidence.

**Concierge test** — a test where the builder manually delivers part of the intended service to learn what customers value before automating it. Be transparent about the manual work.

**Customer discovery** — research into a target customer’s workflow, needs, and existing alternatives. It is not a pitch disguised as an interview.

**MVP (minimum viable product)** — the smallest credible product or service that can deliver a useful outcome and generate learning. It does not mean incomplete safety or quality.

**Problem–solution fit** — evidence that a proposed solution addresses a problem for a defined group. The phrase is often used loosely; state what evidence supports the claim.

**Prototype** — an artifact used to explore or test a design. It may be nonfunctional; label it clearly and do not imply that simulated features are live.

## Business and growth

**CAC (customer acquisition cost)** — acquisition spend divided by new customers acquired over a defined period and channel. Include the costs you choose to count and do not compare unlike calculations.

**Churn** — customers or recurring revenue lost over a specified period. State the cohort, period, and whether the measure is logo, seat, or revenue churn.

**Contribution margin** — revenue left after variable costs associated with serving or selling to a customer. It is not the same as profit after all fixed costs and taxes.

**Conversion rate** — people who complete a defined action divided by a defined eligible group in a stated period. Always state the action and denominator.

**Retention** — the degree to which users continue to return or receive value over time. Choose a return event tied to the product’s real use cycle.

**Runway** — how long available cash lasts at a stated burn rate. It changes when revenue, costs, or funding change; it is not a fixed date.

## Engineering and AI

**Authentication (AuthN)** — verifying an identity or account. It does not decide what that identity is allowed to do.

**Authorization (AuthZ)** — deciding whether a verified identity may perform an action on a particular resource. Enforce it at the server or data boundary.

**Idempotency** — a property where repeating the same operation does not repeat its effect, useful for retries in payments and background jobs.

**Observability** — signals such as logs, metrics, and traces that help explain what a system did and where it failed. Do not collect sensitive information just because logging is easy.

**Prompt injection** — untrusted content attempts to manipulate an AI system’s instructions or tool use. Permissions must be enforced outside the model.

**RLS (row-level security)** — database policies that restrict which rows a database role can read or change. It is not automatically safe; policies and privileged keys must be reviewed and tested.

**Technical debt** — future cost created by a shortcut or design choice. Some debt is deliberate; record what was traded away and when to revisit it.

## Reading this wiki’s terms

Words such as “validated,” “secure,” “accessible,” and “profitable” are claims, not badges. Each needs a stated test, scope, and evidence. See [MVP scope](/wiki/product-scope-mvp/), [business basics](/wiki/business-basics-for-indies/), and [security review](/wiki/secure-an-ai-built-app/) for the fuller context.
