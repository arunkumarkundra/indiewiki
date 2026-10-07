---
title: "A small-team workflow for maintainable changes"
description: "A repeatable development loop for clarifying a change, understanding its context, implementing it in small slices, and recording what was learned."
slug: maintainable-build-workflow
category: build
kind: recipe
tags: [workflow, code review, maintenance]
audience: [independent builders, solo founders, small teams]
status: published
evidence: mixed
confidence: moderate
lastVerified: 2026-10-07
related: [build]
featured: false
seedSources: []
sources:
  - title: "Claude Code best practices"
    url: https://www.anthropic.com/engineering/claude-code-best-practices
    publisher: "Anthropic"
    accessed: 2026-10-07
---

## Keep a delivery loop small enough to understand

A sustainable build workflow makes each change reviewable and leaves the project in a state another person can continue. A reliable workflow inspects existing code, makes a focused plan for broad work, verifies each change, and records lessons that will matter again. Turn those habits into a repeatable sequence rather than a long prompt pasted into every task.

## Before changing code

1. Start from a clean working tree or identify existing edits you must preserve.
2. Read the README, architecture notes, relevant code, package scripts, and current tests.
3. Reproduce the issue or write down the observed behavior and the expected behavior.
4. Identify the smallest files and interfaces that need to change.
5. Name the risk: data migration, auth boundary, billing, compatibility, or user-facing copy.
6. Decide what check will tell you the change works.

For work that spans multiple components, write a short plan and confirm the data flow first. Avoid designing abstract layers for a single use. An architecture decision record can be just a dated paragraph explaining context, choice, rejected alternatives, and when to revisit it.

## Make and inspect one change

Keep commits coherent. Prefer a small diff with one purpose. Do not combine a dependency upgrade, formatting sweep, and product feature unless they are inseparable. Read the whole diff, not just the summary. Look for changed defaults, removed validation, accidental secrets, generated output, and files outside the intended scope.

Use tests at the right level: pure logic unit tests, database integration checks, and a short end-to-end journey for critical flows. Tests should include boundaries and permission failures, not only the happy path. Run formatting, type checks, build, and tests that the repository expects. A green suite means only that those checks passed; manually inspect visual and operational behavior where relevant.

## Ship with a rollback path

Before deployment, know what version is live and how to restore it. For database changes, consider old and new application versions overlapping during rollout; use additive changes first when practical. Back up important user data and test restore, not just backup creation. Deploy in a small batch or to a preview environment for risky changes. Watch errors and user support after release.

A release note can answer: what changed, who benefits, migration required, how it was checked, and known limitation. If a change causes harm, pause the rollout and follow the documented rollback or incident process.

## Keep project knowledge close to the code

Document stable decisions and operational steps where the next maintainer will find them: README for entry point, architecture note for boundaries, runbook for restoration and incident steps, and code comments only for non-obvious local reasoning. Remove stale guidance instead of layering new instructions on top. Do not store private customer records or live credentials in project docs.

Use [AI-assisted development](/wiki/ai-assisted-development/) for model-specific review and [operational basics](/wiki/operational-basics/) for the ongoing maintenance rhythm.
