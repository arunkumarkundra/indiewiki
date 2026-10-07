---
title: "Design an AI agent around a bounded task"
description: "A cautious starting pattern for agentic workflows: one defined job, limited tools, explicit approval boundaries, and observable failure handling."
slug: building-bounded-agents
category: ai-building
kind: recipe
tags: [agents, tool permissions, AI security]
audience: [independent builders, solo founders, small teams]
status: published
evidence: mixed
confidence: moderate
lastVerified: 2026-10-07
related: [ai-building]
featured: false
seedSources: []
sources:
  - title: "AI Agent Security Cheat Sheet"
    url: https://cheatsheetseries.owasp.org/cheatsheets/AI_Agent_Security_Cheat_Sheet.html
    publisher: "OWASP"
    accessed: 2026-10-07
---

## First ask whether the task needs an agent

An agent is software that can choose steps and call tools toward a goal. If the task has a fixed sequence and predictable inputs, a normal function or workflow is usually easier to test and safer to operate. Use an agent when the useful next step depends on interpreting varied context or selecting among tools, and when you can bound the possible actions.

## Specify the boundary before connecting tools

Write a contract:

```text
Task: classify a support request and draft a reply.
Input: the request text and approved help articles.
Allowed tools: search public help content; draft a response.
Forbidden: send a reply, change an account, issue a refund, reveal another user's data.
Success: return a cited draft plus an uncertainty flag.
Escalate when: billing dispute, account compromise, health/legal concern, or low confidence.
Limits: 3 tool calls, 20 seconds, no more than 2 retries.
```

Separate **read** from **write** capabilities. Prefer read-only access. If an external action is necessary, validate it in application code and ask a human to approve the exact action. A model instruction saying “do not send” is not a permission system.

## Enforce permissions outside the prompt

The tool server should identify the user, verify their authorization for every object, validate arguments, constrain destinations and amounts, and reject unexpected calls. Do not let a model-provided user ID determine whose data it may access. Use narrowly scoped credentials and keep secrets out of model context and logs.

Treat retrieved pages, uploaded documents, emails, and tool results as untrusted data. They may contain instructions designed to override the task. Delimit and label data as data; do not let it expand the allowed tools or authorize a transaction. OWASP’s [AI Agent Security Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/AI_Agent_Security_Cheat_Sheet.html) provides a threat-oriented review list.

## Design for partial failure

Set a deadline, maximum tool calls, retry policy, token or spend ceiling, and a clear stop state. Tools should be idempotent where possible: repeating a request should not accidentally charge twice or create duplicate records. Give each action a request ID, validate returned data, and log enough to diagnose a failure without storing full sensitive prompts.

Return a structured result such as `completed`, `needs_approval`, `needs_human`, or `failed`. Distinguish “the tool call succeeded” from “the user’s task is complete.” If a write may have partially succeeded, check state before retrying. Provide a human override and a conventional workflow for outages.

## Test abuse as well as success

Test irrelevant requests, malicious instructions inside retrieved content, malformed tool arguments, unauthorized record IDs, timeouts, rate limits, provider errors, duplicate requests, empty results, and attempts to exceed budget. Confirm that denial is enforced by the tool layer. Review traces with synthetic data and redact personal information.

Start with a small internal cohort and compare completion quality, correction rate, latency, cost, and harmful-action attempts against the non-agent baseline. If a simpler workflow performs as well, remove the agent. See [AI-assisted development](/wiki/ai-assisted-development/) and [security review](/wiki/secure-an-ai-built-app/).
