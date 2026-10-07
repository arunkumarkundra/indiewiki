---
title: "Integrate an external service with webhooks"
description: "Build a dependable event receiver that authenticates deliveries, handles retries and duplicates, and gives you a path to recover missed work."
slug: integrate-an-external-service-with-webhooks
category: build
kind: article
tags: [integrations, webhooks, reliability, security]
audience: [independent builders, solo founders, small teams]
status: published
evidence: multiple-sources
confidence: moderate
lastVerified: 2026-10-07
reviewBy: 2027-01-07
reviewTrigger: "Recheck provider delivery guarantees, signature formats, event retention, API versions, and retry behavior before implementing or after an upstream change."
related: [build, operate, quality]
featured: false
seedSources: []
sources:
  - title: "Best practices for using webhooks"
    url: https://docs.github.com/en/webhooks/using-webhooks/best-practices-for-using-webhooks
    publisher: "GitHub Docs"
    accessed: 2026-10-07
  - title: "Validating webhook deliveries"
    url: https://docs.github.com/en/webhooks/using-webhooks/validating-webhook-deliveries
    publisher: "GitHub Docs"
    accessed: 2026-10-07
  - title: "Troubleshooting webhooks"
    url: https://docs.github.com/en/webhooks/testing-and-troubleshooting-webhooks/troubleshooting-webhooks
    publisher: "GitHub Docs"
    accessed: 2026-10-07
  - title: "Idempotent requests"
    url: https://docs.stripe.com/api/idempotent_requests
    publisher: "Stripe Docs"
    accessed: 2026-10-07
---

## Decide whether an event callback fits

A webhook lets another service tell your app that something changed, such as a repository issue opening, a CRM contact updating, or a file finishing an export. It is useful when the service can push timely events and you need to react without repeatedly asking for changes.

Before choosing it, check the provider’s event catalog, delivery guarantees, retry policy, event history, API rate limits, and whether you can query current resource state. Webhooks are not a durable event log by default. Some providers do not retry automatically; others retry only for a limited period. If missing an event would leave money, access, or customer data wrong, plan reconciliation from the start.

Write the intended effect in plain language: “When this provider marks an export complete, make the matching export available to the correct workspace.” Name the authoritative source of truth, the resource identifier used to match records, what the customer sees during delay, and what to do when the integration is disconnected. Avoid subscribing to every event when you need only a few; each extra event adds code paths and noise.

## Establish the trust boundary

Create a dedicated HTTPS endpoint and use the provider’s documented signature verification library or algorithm. Verify the signature against the exact request bytes before parsing or acting on the payload; frameworks that parse or rewrite the body first can break verification. Use a high-entropy secret stored in a secret manager or protected environment configuration, not in source control or the URL. Compare signatures with a constant-time comparison where the provider’s method requires one.

Providers sign messages differently. Some include a signed timestamp that lets you reject stale requests; some provide a stable delivery identifier; some use both. Follow that provider’s current documentation rather than implementing a generic format. GitHub recommends HMAC-SHA256 signatures in `X-Hub-Signature-256`, a secret, HTTPS, and its delivery ID for deduplication. A delivery identifier prevents repeat processing when recorded durably; signature verification proves payload integrity and origin under the configured secret. Neither should be omitted because the endpoint path is hard to guess.

After verification, validate the event type and action against an allowlist, then validate required fields and the account/workspace association. Treat all payload values as untrusted input. Never let an event from one connected customer update another customer’s records just because an object ID was supplied. Keep secrets, raw payloads, and request logs out of public error messages.

## Receive quickly; process durably

For anything beyond a very small deterministic update, separate delivery acknowledgement from business processing:

1. Read the raw request and verify the signature.
2. Check that the event type is one you handle and that its payload is structurally valid.
3. In a database transaction, insert an inbox record with a unique constraint on the provider’s delivery or event ID, plus the minimum data needed to process it.
4. Commit the record (and enqueue work transactionally if your queue supports it).
5. Return the success response required by that provider.
6. Process the record asynchronously; update its state and attempt information.

If the provider sends the same identifier again, return the expected successful acknowledgement after recognizing the existing record; do not create another business effect. If the database is unavailable and you could not persist the event, return a retryable failure according to the provider’s contract. Do not acknowledge an event that has neither been safely processed nor durably recorded. GitHub, for example, expects a 2xx response within 10 seconds and recommends asynchronous processing for work that may take longer.

An inbox record can be as small as:

| Field | Why it exists |
| --- | --- |
| Provider + account ID | Route the event to the correct integration |
| Delivery/event ID (unique) | Prevent duplicate effects |
| Type + subject/resource ID | Select a handler and affected record |
| Received time + provider event time | Diagnose delay and ordering |
| Status + attempt count | Find pending, failed, and retried work |
| Minimal payload or safe reference | Resume work without retaining unnecessary personal data |
| Last error class + processed time | Diagnose and audit completion |

Do not keep complete payloads indefinitely by default. They may contain personal or commercially sensitive information. Retain only fields required for processing or debugging, restrict access, and set a deletion period. If you need the exact payload for replay, encrypt it, limit access, and make the retention purpose explicit.

## Make repeated work safe

Delivery systems retry when they do not receive the expected response. Your app can also retry after a timeout even when the provider completed an action. Assume a delivery may be repeated and design each handler so another attempt does not send a second email, create a duplicate record, overwrite newer data, or charge again.

Use a unique event/delivery key to deduplicate inbound deliveries. Separately use an idempotency key or an application-level operation record for outbound side effects. These solve different duplication problems. For example, one inbound “export ready” event may be retried after your app successfully sends the customer a notification but crashes before marking the event complete. Persist the notification operation so the next attempt can detect that it has already been sent. Stripe’s idempotency API is one provider-specific example for safely repeating supported API requests; its retention and behavior are provider-specific, not a universal guarantee.

Do not assume arrival order equals event order. GitHub documents that deliveries can arrive out of order. When the event includes a trustworthy resource version or sequence, compare it before applying an update. Otherwise, use the event as a signal to fetch the resource’s current state from the provider API, then update your local copy from that canonical state. If neither is possible, define explicit state-transition rules so a late “pending” update cannot undo a known “complete” state.

## Plan retries and recovery

Classify processing failures:

- **Temporary:** provider API timeout, rate limit, or brief database outage. Retry with bounded exponential backoff and jitter; respect provider rate-limit instructions.
- **Permanent or invalid:** unsupported event version, missing required identifier, revoked permission, or invalid business state. Record the reason and stop automatic rapid retries; surface a repair action or alert.
- **Unknown outcome:** a remote request timed out after it may have succeeded. Query the remote resource or retry with the same supported idempotency key before issuing another side effect.

Keep failed records available for inspection and controlled replay. A replay must pass through the same authentication assumptions and idempotency checks as a normal delivery. Require an authorized operator, record who replayed it and when, and allow replaying one event without replaying every event for the account. Do not expose a button that blindly repeats a payment, email, or destructive action.

Add a reconciliation path. Depending on the provider, this may mean listing changed records since a stored cursor, comparing a periodic snapshot, or reviewing missed-delivery logs and requesting redelivery. GitHub says failed deliveries are not automatically redelivered, and its troubleshooting guidance notes they can be out of order; its delivery log and redelivery path therefore matter operationally. Provider event history may have a retention limit, so do not assume you can reconstruct an old event forever.

## Observe the integration and test its failure modes

Track at least: accepted deliveries, signature failures, duplicates, unsupported event types, processing failures, retry count, oldest pending item, and reconciliation differences. Alert on a growing backlog, repeated failures for one account, or a reconciliation gap that could affect customer-visible state. Log provider event IDs and internal record IDs, not secrets or unnecessary payload data.

Before launch, exercise the cases that can cause silent loss or duplicate effects: valid event, invalid signature, missing required field, duplicate delivery, out-of-order update, provider API timeout, handler crash after the external side effect, database unavailable before acknowledgement, unsupported event type, revoked connection, and manual replay. Confirm the system eventually converges to the correct provider state and that a customer can see or report a delayed sync.

Start with one event type and one effect. Add more only when a real workflow needs them. Use [background jobs and retries](/wiki/background-jobs-and-retries/) for worker design, [API contracts](/wiki/design-an-api-contract/) for boundaries you expose yourself, and [payments and subscriptions](/wiki/payments-and-subscriptions/) for the provider-specific payment lifecycle.
