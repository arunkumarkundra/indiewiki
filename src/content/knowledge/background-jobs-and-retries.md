---
title: "Move slow work into reliable background jobs"
description: "Decide what belongs in a worker, then make jobs idempotent, bounded, observable, and safe to retry after partial failure."
slug: background-jobs-and-retries
category: build
kind: article
tags: [background-jobs, reliability, operations]
audience: [independent builders, solo founders, small teams]
status: published
evidence: practitioner
confidence: moderate
lastVerified: 2026-10-07
reviewBy: 2027-01-07
reviewTrigger: "Recheck after upstream documentation, security advisories, pricing, supported versions, or relevant platform policies change."
related: [build, operate]
featured: false
seedSources: []
sources:
  - title: "The Twelve-Factor App: Disposability"
    url: https://12factor.net/disposability
    publisher: "Heroku"
    accessed: 2026-10-07
---

## Move work when waiting harms the user

Use a background job when work is slow, unreliable, scheduled, or does not need to finish before the user can continue. Examples include sending email, generating a report, resizing an image, syncing data, and processing a webhook. Keep quick validation and the immediate confirmation in the request path so the user receives a clear result.

Before adding a queue, measure the task and estimate how often it runs. A small product may begin with a managed queue or a scheduled worker; a database-backed job table can be adequate when volume is modest and locking is implemented carefully. Avoid operating a complex message platform before you have a workload that needs it.

## Design the job payload and state

Pass stable identifiers and the minimum required data, not a large snapshot that becomes stale. Store job state such as queued, running, succeeded, failed, and canceled with timestamps and a safe summary of the last failure. Make the state visible to the user when the work takes long enough that they will wonder what happened.

Assume a job may run more than once. A worker can crash after completing an external action but before marking success. Give the operation an idempotency key or record its completed side effect so a retry does not send duplicate messages, charge twice, or create repeated reports. If one job has multiple steps, make each step safe to resume or persist progress between steps.

## Bound retries and resource use

Classify errors. Retry transient network failures and rate limits with exponential backoff and jitter; respect provider retry-after instructions. Do not retry invalid input forever. Cap attempts and total elapsed time, then move persistent failures to a state that an operator can inspect and replay after fixing the cause. Set timeouts on outbound calls and limit concurrency so a backlog cannot exhaust database connections or provider quotas.

A job should not hold a database transaction open while waiting for an external service. Persist the intended work first. When a database update and queue publish must stay consistent, consider an outbox table: write the business change and an outbox event in one transaction, then have a worker publish and mark that event. This pattern avoids the “database committed but job was never queued” gap; adopt it when that failure matters enough to justify the extra moving part.

## Make operations visible

Track queue depth, oldest-job age, success and failure rate, retry counts, and task duration. Alert on a growing backlog or repeated failures, not every isolated transient error. Include a correlation ID so support can connect the user action, job, and provider request. Keep logs free of passwords, tokens, sensitive message bodies, and unnecessary personal data.

Provide a safe replay action for operators and decide what happens to stale jobs after a deploy. Workers should shut down gracefully, finish or release current work, and tolerate interruption. If a job is user-visible, explain failure in plain language and offer a retry when that is safe.

When a third-party service initiates the job, apply the receiving and reconciliation pattern in [integrate an external service with webhooks](/wiki/integrate-an-external-service-with-webhooks/).

## Test the partial-failure path

Simulate worker shutdown midway through a task, duplicated delivery, provider timeout after the provider completed the action, rate limiting, malformed payload, and an exhausted retry budget. Confirm that the queue recovers and operators can identify the affected record. Reliability comes from explicit states, safe repetition, and a visible recovery path—not from assuming a worker will never fail.
