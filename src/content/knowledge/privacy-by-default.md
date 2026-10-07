---
title: "Privacy by default for a small product"
description: "A data-minimization workflow for deciding what to collect, where it goes, who can access it, and when it should be removed."
slug: privacy-by-default
category: quality
kind: article
tags: [privacy, data, security]
audience: [independent builders, solo founders, small teams]
status: published
evidence: multiple-sources
confidence: moderate
lastVerified: 2026-10-07
related: [quality]
featured: false
seedSources: []
sources: []
---

## Map the data before adding a feature

For each field or event, state why it is needed, whether the feature works without it, where it is stored, who can see it, which services receive it, and when it can be deleted. Avoid collecting data “just in case.” Analytics identifiers, support logs, uploaded files, and AI prompts can all contain personal information.

Choose a retention period tied to a real operational need. Minimize data in logs and crash reports. Limit internal access and remove access when roles change. Tell users what is collected in language that matches the actual behavior.

## Review third parties

Before adding analytics, email, payment, or AI services, review what information they receive, how it is retained, whether it can be used for other purposes, and how deletion works. Verify current terms from the provider; do not infer privacy from a product’s marketing page.

Privacy requirements vary by jurisdiction and product. This page is an engineering checklist, not legal advice. Get jurisdiction-specific review before handling sensitive data or launching in regulated contexts. A useful general practice is to document the purpose and data flow before writing the integration.
