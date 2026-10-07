# Writing a wiki page

Add a Markdown file in `knowledge/`. Its filename becomes the edit target; the `slug` field controls the public URL (`/wiki/<slug>/`). Copy the metadata shape below, then write the page for a reader trying to complete one concrete task.

```yaml
---
title: A useful, specific title
description: A short summary that helps a reader decide whether this page answers their question.
slug: useful-specific-title
category: validate
kind: article
tags: [customer research, experiments]
audience: [solo founders, small teams]
status: published
evidence: multiple-sources
confidence: moderate
lastVerified: 2026-10-07
related: []
featured: false
seedSources: []
sources:
  - title: Primary reference title
    url: https://example.com/
    publisher: Publisher
    accessed: 2026-10-07
---
```

Use one category from the 20-item map in `WIKI_STRUCTURE.md`. `kind` accepts article, checklist, recipe, case-study, tool-guide, template, or glossary. Evidence labels describe the basis of a page; confidence describes how strongly its recommendations follow from that basis. Neither is a promise of certainty. For practitioner notes or user-supplied screenshots, record them in `seedSources` and keep claims bounded to that context. Add direct citations near important claims and in `sources`. Dates must be refreshed when time-sensitive advice is rechecked.

Use headings, descriptive link text, short paragraphs, and lists for steps. Avoid copied source passages, unsupported numbers, vendor rankings, and sensitive project details. Set `status: draft` or `needs-review` when the page is not ready for readers. The published site filters those entries out.
