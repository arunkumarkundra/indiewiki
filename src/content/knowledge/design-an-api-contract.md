---
title: "Design an API contract before wiring up screens"
description: "Define requests, responses, validation, errors, and access rules so the client and server agree on behavior from the first feature."
slug: design-an-api-contract
category: build
kind: article
tags: [api, backend, product-development]
audience: [independent builders, solo founders, small teams]
status: published
evidence: primary
confidence: moderate
lastVerified: 2026-10-07
reviewBy: 2027-01-07
reviewTrigger: "Recheck after upstream documentation, security advisories, pricing, supported versions, or relevant platform policies change."
related: [build]
featured: false
seedSources: []
sources:
  - title: "Overview of HTTP"
    url: https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview
    publisher: "MDN Web Docs"
    accessed: 2026-10-07
  - title: "OWASP REST Security Cheat Sheet"
    url: https://cheatsheetseries.owasp.org/cheatsheets/REST_Security_Cheat_Sheet.html
    publisher: "OWASP"
    accessed: 2026-10-07
---

## Start with one user action

An API contract is an agreement about what a client may ask for and what the server promises in return. Define it around a user outcome, such as creating a draft, inviting a teammate, or exporting a report. Avoid exposing database tables directly; the public shape should reflect the product’s stable concepts, not today’s internal schema.

Write a short endpoint sketch before implementation:

```text
POST /api/projects
Request: { "name": "April launch" }
Success: 201 with project id, name, and createdAt
Errors: 400 invalid name; 401 signed out; 403 not allowed; 409 duplicate
```

Specify required fields, limits, allowed values, null behavior, pagination, and whether retries are safe. Use predictable naming and a consistent JSON shape. If a field is optional, decide whether omitted and explicit `null` mean the same thing. This avoids accidental destructive updates in forms.

## Validate at the boundary

Treat all client input as untrusted, including values from your own frontend. Parse and validate request bodies on the server: type, length, format, allowed enum values, and relationships. Reject unknown or invalid values deliberately. Database constraints remain useful as the final guard for uniqueness and referential integrity.

Return errors that help the caller recover without exposing implementation details. A validation response can identify `name` and say it must be under 80 characters. Do not return stack traces, SQL errors, secret values, or the existence of another person’s private record. Keep one error format across endpoints so the UI can show field errors and a general fallback consistently.

Use HTTP semantics consistently: successful creation normally returns a created response; missing resources are distinct from invalid input; authentication failures are distinct from permission failures. Avoid returning success when the server silently discarded a requested change. Clients need a reliable signal to show accurate state.

## Design for permissions and retries

Each endpoint needs an authorization rule, including list, search, export, and nested-resource routes. Scope database queries to the caller’s verified ownership or membership. Never assume that because a button is hidden, the request cannot be made directly. Use HTTPS and avoid placing access tokens or private data in URLs, which are more likely to appear in logs and referrers.

Networks fail after the server may already have completed a request. For operations that create charges, orders, invitations, or other costly duplicates, support an idempotency key or another deduplication rule. A repeated request with the same key should return the original outcome rather than repeat the side effect. Define what happens when the same key is reused with different input.

For long work, return a job identifier and let the client check status instead of holding a request open indefinitely. Set request and payload size limits, paginate large lists, and provide cancellation or clear progress when users would otherwise wait without feedback.

## Keep the contract understandable

Document a few real request and response examples. Generate a schema or API specification when the number of endpoints makes manual documentation unreliable. When a change would break existing clients, add a compatible field or version the interface intentionally; do not break a deployed app just because the frontend and backend are in one repository.

Before shipping, test valid input, malformed JSON, boundary lengths, no session, wrong tenant, duplicate submission, server error, and slow network behavior. Include a user-visible recovery path for errors. An API contract is most valuable when it prevents ambiguity at implementation time and gives you a repeatable way to check behavior later.
