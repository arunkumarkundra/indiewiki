---
title: "Observe production errors without collecting too much data"
description: "Set up a small, privacy-aware production signal set that helps you detect user-visible failures and find their causes."
slug: observe-production-errors-without-overcollecting-data
category: operate
kind: recipe
tags: [observability, monitoring, privacy]
audience: [independent builders, solo founders, small teams]
status: published
evidence: mixed
confidence: moderate
lastVerified: 2026-10-07
reviewBy: 2027-04-07
reviewTrigger: "Recheck when telemetry vendors, privacy requirements, incident history, or the product's critical workflows change."
related: [operate, quality, privacy]
featured: false
seedSources: []
sources:
  - title: "Observability primer"
    url: https://opentelemetry.io/docs/concepts/observability-primer/
    publisher: "OpenTelemetry"
    accessed: 2026-10-07
  - title: "Signals"
    url: https://opentelemetry.io/docs/concepts/signals/
    publisher: "OpenTelemetry"
    accessed: 2026-10-07
  - title: "Monitoring Distributed Systems"
    url: https://sre.google/sre-book/monitoring-distributed-systems/
    publisher: "Google SRE Book"
    accessed: 2026-10-07
  - title: "Data minimisation"
    url: https://eur-lex.europa.eu/legal-content/EN/TXT/?toc=OJ%3AL%3A2016%3A119%3AFULL&uri=uriserv%3AOJ.L_.2016.119.01.0001.01.ENG
    publisher: "EUR-Lex"
    accessed: 2026-10-07
---

## Ask questions that lead to action

Production observability helps answer two questions: are users completing the product’s important jobs, and what failed when they could not? Start from the journey, not the monitoring vendor. Choose one or two user-facing outcomes—such as successful report exports or completed checkouts—and decide what failure would require you to act. “Server is up” is not enough if the app returns an error whenever a user saves.

Keep the initial signals small:

- **Errors:** exception type, affected route or operation, release version, and a correlation identifier.
- **Metrics:** request failures, latency, queue backlog, and success/failure counts for critical actions.
- **Logs:** timestamped events with a stable event name and useful operational context.
- **Traces:** only when work crosses enough boundaries that timing and request flow are hard to reconstruct from logs.

OpenTelemetry describes traces, metrics, and logs as different signal types. The [observability primer](https://opentelemetry.io/docs/concepts/observability-primer/) connects them to troubleshooting and user-oriented reliability measures. Google’s SRE monitoring chapter stresses choosing signals that identify symptoms and support diagnosis. A small app may start with host logs and error tracking; distributed tracing is an option when a concrete debugging question needs it.

## Minimize what telemetry can reveal

Treat event data as a product data collection decision. Do not log passwords, access tokens, full payment details, session cookies, secret URLs, or entire request bodies. Avoid sending names, email addresses, free-text fields, or uploaded content unless they are essential to a clearly described support purpose and properly protected. Prefer internal identifiers that are access-controlled and short-lived where possible. Redact before data leaves the application, set retention deliberately, restrict who can view it, and test the redaction path with synthetic values.

The [GDPR data minimisation principle](https://eur-lex.europa.eu/legal-content/EN/TXT/?toc=OJ%3AL%3A2016%3A119%3AFULL&uri=uriserv%3AOJ.L_.2016.119.01.0001.01.ENG) is one jurisdiction’s legal text and is not a complete privacy compliance guide. Its useful general design question is: can the failure be diagnosed with less data? For legal applicability, retention periods, and user rights, check the rules that apply to your users and get qualified advice when needed. Logging itself can create a sensitive dataset; include it in the [privacy inventory](/wiki/privacy-by-default/).

## Make alerts actionable

For every alert, write: what user impact it detects, how it is measured, who sees it, and the first safe action. Alert on sustained or repeated failures that need intervention, not every exception that can self-recover harmlessly. A one-person product can route high-priority alerts to email or a reliable notification channel and review lower-priority trends during a daily or weekly operating pass. Set quiet hours and an escalation route that you can actually maintain.

Review errors after a release and after user reports. Group duplicate incidents, record the affected journey, and compare the rate with normal traffic. If a new alert produces no action, change its threshold, owner, or purpose. If a support report arrives before any signal, add the smallest safe event that would have exposed the failure. Keep [operational basics](/wiki/operational-basics/) accessible alongside provider status and rollback instructions.
