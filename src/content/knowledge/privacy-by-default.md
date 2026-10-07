---
title: "Privacy by default for a small product"
description: "A data-minimization workflow for deciding what to collect, where it goes, who can access it, and when it should be removed."
slug: privacy-by-default
category: quality
kind: article
tags: [privacy, data, security]
audience: [independent builders, solo founders, small teams]
status: published
evidence: mixed
confidence: moderate
lastVerified: 2026-10-07
reviewBy: 2027-01-07
reviewTrigger: "Recheck after upstream documentation, security advisories, pricing, supported versions, or relevant platform policies change."
related: [quality]
featured: false
seedSources: []
sources:
  - title: "NIST Privacy Framework"
    url: https://www.nist.gov/privacy-framework
    publisher: "NIST"
    accessed: 2026-10-07
  - title: "Protecting Personal Information: A Guide for Business"
    url: https://www.ftc.gov/business-guidance/resources/protecting-personal-information-guide-business
    publisher: "US Federal Trade Commission"
    accessed: 2026-10-07
---

## Start with a data map, not a privacy-policy template

Before adding a field, event, integration, or AI feature, write down what information enters the product and why it is needed. A policy page cannot make unnecessary collection safe or make a data flow transparent if the product behaves differently.

Use one row per data category:

| Data | Why needed | Source | Stored where | Shared with | Who can access | Retention / deletion |
|---|---|---|---|---|---|---|
| Account email | Sign in and service notices | User | Auth provider | Transactional email provider | Account owner, limited operators | Until account deletion plus required records |
| Uploaded invoice | Extract line items | User | Private object storage | OCR service, if enabled | Owner-scoped access | User-selected retention |
| Usage event | Find failed workflow step | Product | Analytics provider | No onward use assumed without checking terms | Restricted operators | Shortest useful period |

This is an example structure, not a legal retention schedule. Verify each provider’s current terms and configuration.

## Ask whether the product can work with less

For every item, ask: could the feature work without it; can it be processed on the device; can it be aggregated or pseudonymized; does it contain sensitive information; can it be deleted on request; and what happens to backups and vendor copies? Do not collect full birth dates, contact books, precise location, or full prompts “just in case.” Avoid putting passwords, tokens, payment details, or raw personal records in logs.

Limit access by role and review it when responsibilities change. Protect backups and exports. Ensure support tools, analytics, crash reports, and AI vendors do not receive data they do not need. If prompts or retrieved records are sent to a model provider, disclose that flow and check retention, training, region, access, and deletion terms on the current official vendor page.

## Build deletion and incident behavior

Define how a user can view, correct, export, and delete their information where applicable. Determine which records must be retained for legal or accounting reasons and isolate them from product data. Deletion is a workflow across databases, file storage, analytics, processors, caches, and backups; document which copies expire later and how.

If there is suspected exposure, preserve enough evidence to investigate, contain access, identify data and people affected, and get qualified guidance on notification obligations. Do not promise that no breach is possible.

## Be precise about jurisdiction

Privacy obligations depend on the people, places, data, business model, and vendors involved. A general data map is useful engineering practice, not a substitute for legal analysis. Before handling sensitive or regulated data, obtain jurisdiction-specific advice. Keep the public notice accurate to the current product; review it whenever collection or providers change. See [security review](/wiki/secure-an-ai-built-app/) and [business basics](/wiki/business-basics-for-indies/).
