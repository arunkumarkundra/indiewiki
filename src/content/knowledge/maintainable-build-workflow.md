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
seedSources:
  - "User-supplied IndieWiki source packet; see SOURCE_INTAKE.md for provenance and limitations."
sources:
  - title: "Claude Code best practices"
    url: https://www.anthropic.com/engineering/claude-code-best-practices
    publisher: "Anthropic"
    accessed: 2026-10-07
---

## Before changing code

Restate the user-visible outcome and acceptance conditions. Inspect the relevant files, existing conventions, and recent changes before editing. Identify the smallest safe slice and note dependencies, data changes, and failure modes. For ambiguous or broad work, write a short plan that can be reviewed before implementation.

Keep changes focused. Small diffs are easier to reason about, review, and revert. Avoid unrelated cleanup unless it is necessary to make the requested change safe.

## Verify the behavior

Use checks that match the risk: type checks, focused tests, manual interaction, accessibility review, and inspection of generated output. Verify both the normal path and important failures. Do not treat a successful compile as proof that the feature behaves correctly.

Review the diff as a maintainer: look for accidental secrets, unnecessary dependencies, unsafe assumptions, confusing names, and missing documentation. Ask an AI coding assistant to explain its changes, but independently inspect the implementation and run the relevant checks.

## Close the loop

Summarize what changed, how it was verified, and any known limitation. Record reusable project knowledge in its canonical documentation location. The supplied “Vibe Coding Learnings” notes recommend planning, reviewing generated code, and capturing lessons; treat these as useful workflow prompts. The [Claude Code engineering guide](https://www.anthropic.com/engineering/claude-code-best-practices) offers tool-specific practices that should be adapted rather than copied wholesale.
