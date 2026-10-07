---
title: "Choose a simple architecture for a small web app"
description: "Choose boundaries and deployment shape around the product's real constraints, then record the decision and revisit it when evidence changes."
slug: architecture-for-a-small-web-app
category: build
kind: recipe
tags: [software-architecture, modular-monolith, technical-decisions]
audience: [independent builders, solo founders, small teams]
status: published
evidence: mixed
confidence: moderate
lastVerified: 2026-10-07
reviewBy: 2027-04-07
reviewTrigger: "Recheck when the deployment model, regulatory obligations, team size, traffic shape, or failure-isolation needs materially change."
related: [build, tech-stack, operate]
featured: false
seedSources: []
sources:
  - title: "Monolith First"
    url: https://martinfowler.com/bliki/MonolithFirst.html
    publisher: "Martin Fowler"
    accessed: 2026-10-07
  - title: "The Twelve-Factor App: Processes"
    url: https://12factor.net/processes
    publisher: "The Twelve-Factor App"
    accessed: 2026-10-07
  - title: "The Twelve-Factor App: Backing services"
    url: https://12factor.net/backing-services
    publisher: "The Twelve-Factor App"
    accessed: 2026-10-07
---

## Start with constraints, not a diagram

Architecture is a set of choices about where responsibilities live, how data moves, and what can fail independently. For a first version, write down the constraints that could change those choices: who builds and operates it, what data it stores, how quickly it must ship, what downtime costs, which integrations are essential, and any privacy or regulatory obligations. Add the rough usage you can explain today; do not design for a traffic forecast with no evidence.

For many solo products, one deployable application with clear internal modules and a managed database is a reasonable starting point. This is often called a modular monolith. It keeps deploys and local debugging understandable while still giving the code places for product boundaries. It is a starting hypothesis, not a rule: a separate worker, static front end, or provider-managed identity service can make sense when a concrete requirement justifies it.

Martin Fowler describes monolith-first as a practitioner position informed by industry cases, while explicitly calling the evidence anecdotal and tentative. Use it as a useful caution against premature service splitting, not as proof that every product should be one application. [The Twelve-Factor App](https://12factor.net/processes) gives a separate operational principle: processes should be stateless, with durable data held in backing services. That is a design lens, not a required framework or hosting platform.

## Draw the smallest useful boundary map

Make a one-page map with these boxes:

1. **User interface:** pages or client app, and what it calls.
2. **Application:** the actions and rules that define the product, grouped by domain (for example, accounts, projects, billing).
3. **Data stores:** database, object storage, search index, or other durable records, with an owner for each.
4. **External services:** authentication, payments, email, analytics, and any API dependency.
5. **Operations:** deploy path, secrets location, logs, backups, and the person who can recover access.

For each arrow, label what crosses the boundary and what happens if the destination is unavailable. Identify which operations must be atomic: for example, recording an order and scheduling its receipt email are different outcomes. Persist the order first; make email delivery retryable rather than pretending both systems share one transaction. See [payments and subscriptions](/wiki/payments-and-subscriptions/) and [background jobs](/wiki/background-jobs-and-retries/) for those failure patterns.

Keep module interfaces explicit. A billing module should own the rules for subscription state even if it shares a process and database with the rest of the app. Avoid both extremes: a single undifferentiated pile of code, and a service-per-feature architecture that adds deployment, network, and incident work before independent scaling or ownership is needed.

## Record the choice and its escape hatch

Write a short architecture decision note:

| Field | Example |
| --- | --- |
| Context | One founder, first paid workflow, low and uncertain traffic |
| Decision | One app, modular domains, managed relational database |
| Alternatives | Separate services; serverless functions; existing platform |
| Trade-offs | Simple deploy; shared failure and scaling boundary |
| Revisit when | Independent team ownership, sustained resource bottleneck, or required isolation |

Split a component when the cost of keeping it inside is demonstrated: distinct security boundary, different scaling or availability need, incompatible runtime, or a team that can own deployment and support. Before splitting, account for network failure, duplicated data, retries, monitoring, secrets, and another deploy pipeline. The split is successful only if the new boundary reduces a real constraint without making routine changes harder to ship.

Review the map after the first real users, a significant integration, or an incident. Update it when the system changes. For the everyday change-and-release loop, use [maintainable build workflow](/wiki/maintainable-build-workflow/); for operating ownership, see [operational basics](/wiki/operational-basics/).
