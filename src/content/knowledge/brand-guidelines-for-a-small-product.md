---
title: "Create lightweight brand guidelines people can use"
description: "A small brand reference that keeps product, documentation, and outreach consistent while remaining easy for a tiny team to maintain."
slug: brand-guidelines-for-a-small-product
category: product
kind: template
tags: [brand, design, consistency]
audience: [independent builders, solo founders, small teams]
status: published
evidence: practitioner
confidence: limited
lastVerified: 2026-10-07
reviewBy: 2027-10-07
reviewTrigger: "Recheck after material new evidence, a meaningful change to the user workflow, or a credible report that this guidance is wrong."
related: [product]
featured: false
seedSources: []
sources:
  - title: "WCAG 2.2 Understanding"
    url: https://www.w3.org/WAI/WCAG22/Understanding/
    publisher: "W3C"
    accessed: 2026-10-07
---

## Make a small brand guide that helps someone do the work

A useful brand guide is a short set of decisions that prevents repeat confusion. It should help a contributor make a page, screen, email, or support reply that feels like the same product. It does not need an elaborate origin story or a large collection of mood-board images.

## Start with five choices

### 1. Audience and promise

Write who the product serves, what job it helps with, and what it does not promise. Keep the statement concrete enough to reject a confusing feature or misleading campaign.

### 2. Voice

Choose three or four traits and translate each into examples. “Helpful” could mean naming the next step and the consequence; it does not mean cheerleading. “Direct” could mean “Your file could not be imported. Download the error list and fix the three flagged rows,” rather than “Oops, something went wrong!” Include a few words or tones to avoid.

### 3. Naming and assets

Link to the approved logo files and show which one fits light, dark, and small contexts. State minimum readable size, safe spacing, and whether color or shape can change. Give contributors the actual source file; a screenshot is not a reusable asset.

### 4. Visual tokens

List color values, typefaces, spacing, borders, and component rules used in the product. Do not merely list brand colors: show text and background pairings and which pairings are not allowed. Test contrast against the applicable [WCAG guidance](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html) and test at actual sizes. A color palette alone does not establish accessible design.

### 5. Examples in context

Show one correct landing-page heading, one product screen, one error message, and one outreach or support message. Include a “do / avoid” pair that demonstrates the difference. Keep examples brief and label sample copy so no one mistakes it for a product promise.

## Keep it maintainable

Store source assets and tokens in a stable location. Name the maintainer or review process, and update the guide when positioning, product UI, or repeated contributor feedback changes a decision. Avoid rules nobody can enforce, such as “always feel premium.” If there are multiple audiences or products, say which rules are shared and which are specific.

A one-page starting template:

```text
We serve:
We help them:
We do not promise:
Voice traits + example:
Approved name and asset links:
Color tokens + tested text pairings:
Type, spacing, and component rules:
Examples: page / screen / error / support:
Owner and last reviewed:
```

A brand guide supports usable product language and interface decisions; it cannot replace user research or accessibility testing. For practical checks, see [accessible product basics](/wiki/accessible-product-basics/) and [simpler technical writing](/wiki/simpler-technical-writing/).
