---
title: "Security review for an AI-built application"
description: "A risk-focused checklist for reviewing common application security boundaries, with special attention to generated code and agent tool access."
slug: secure-an-ai-built-app
category: quality
kind: checklist
tags: [security, AI, OWASP]
audience: [independent builders, solo founders, small teams]
status: published
evidence: mixed
confidence: moderate
lastVerified: 2026-10-07
related: [quality]
featured: true
seedSources: []
sources:
  - title: "OWASP Top Ten"
    url: https://owasp.org/www-project-top-ten/
    publisher: "OWASP"
    accessed: 2026-10-07
  - title: "Authorization Cheat Sheet"
    url: https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html
    publisher: "OWASP"
    accessed: 2026-10-07
  - title: "Secrets Management Cheat Sheet"
    url: https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_Cheat_Sheet.html
    publisher: "OWASP"
    accessed: 2026-10-07
---

## Review the application’s trust boundaries, not just the generated code

An application is not secure because a coding assistant produced it or because a scanner found no issue. Start with a small threat model: what data matters, who can access it, where a request crosses a trust boundary, and what damage an attacker or mistake could cause. Then test the boundaries in the deployed application.

## The first review pass

### Identity and authorization

Authentication answers “who is this?” Authorization answers “may this identity do this action to this object?” Check permissions on the server for every read and write. Try changing an object ID in the request to another user’s record. Hiding a button or checking ownership only in the browser is not protection. Give admin and background jobs separate, minimal privileges. OWASP explains the distinction and testing approach in its [Authorization Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html).

### Input, output, and queries

Validate type, size, format, and allowed values at the boundary. Use parameterized queries or safe ORM APIs. Encode output for the context where it appears. Restrict file uploads by size and expected type; do not trust a filename or browser-supplied content type. Store uploads away from executable paths and authorize downloads. Apply rate limits to expensive or abuse-prone operations.

### Secrets and errors

Search the repository and build output for API keys, tokens, private URLs, and test data. Store server credentials in the host’s secret manager; browser code may contain only intentionally public keys. Rotate anything that entered Git, a screenshot, prompt, or log. Return useful user errors without stack traces, SQL, or secrets. The [OWASP Secrets Management guidance](https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_Cheat_Sheet.html) covers credential scope and lifecycle.

### Data lifecycle

List personal and sensitive data, why each field exists, which vendors receive it, who can read it, how long it stays, and how deletion works. Remove data you do not need. Avoid logging passwords, session tokens, payment details, or full prompts containing personal data. Back up important data and practice restoration.

## Add AI-specific checks

Treat model output as untrusted input. Parse structured output against a schema and reject unknown actions. Tool calls must recheck authorization and validate arguments independently. Retrieved content can contain prompt injection; it must not grant permissions or override policy. Require a human to approve irreversible or externally visible actions such as payments, account changes, publishing, or sending messages.

Test cases should include: prompt injection in a document, a request for another user’s data, malformed model output, a tool timeout, a provider outage, and a repeated action. Record the expected safe behavior before running the test.

## Prioritize the fixes

Fix exposed secrets, broken authorization, public sensitive data, and unsafe writes before cosmetic issues. Record the affected route, exploit preconditions, impact, remediation, and regression test. Use OWASP’s [Top 10](https://owasp.org/www-project-top-ten/) as an awareness list, not a substitute for reviewing your actual application. If you handle regulated or high-impact data, arrange a qualified security review before launch. See [privacy by default](/wiki/privacy-by-default/) and [bounded agents](/wiki/building-bounded-agents/).
