---
title: "Security review for an AI-built application"
description: "A risk-focused checklist for reviewing common application security boundaries, with special attention to generated code and agent tool access."
slug: secure-an-ai-built-app
category: quality
kind: checklist
tags: [security, AI, OWASP]
audience: [independent builders, solo founders, small teams]
status: published
evidence: multiple-sources
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
---

## Protect identities and data

- Verify authentication on the server for every protected operation.
- Enforce authorization against the requested resource, not only the visible interface.
- Store secrets in deployment-managed secret storage; rotate anything exposed in source, logs, or prompts.
- Validate and constrain user input at the boundary. Encode output for its context.
- Use parameterized database operations and safe file paths.
- Collect only the personal data the feature needs; define retention and deletion behavior.

## Review dependencies and deployment

Use supported dependency versions, review changes in lockfiles, and understand what new packages can access. Keep production error messages free of stack traces and secrets. Apply security headers and HTTPS through the hosting platform where available. Back up important data and test restoration rather than merely checking that backup jobs ran.

## Add AI-specific controls

Treat model output and retrieved content as untrusted. Restrict tool permissions and validate tool inputs independently. Require confirmation for consequential actions. Test injection attempts in documents, URLs, and user messages. The agent is not an authorization layer.

Use the [OWASP Top 10](https://owasp.org/www-project-top-ten/) as a broad awareness checklist, not as a substitute for a threat model or security review. For agentic systems, consult the [OWASP Agentic AI guidance](https://cheatsheetseries.owasp.org/cheatsheets/AI_Agent_Security_Cheat_Sheet.html). Prioritize fixes by exploitability and impact; involve a qualified reviewer when sensitive data or significant financial risk is involved.
