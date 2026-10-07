# Source and evidence policy

This policy explains what IndieWiki may rely on and how claims can be checked. See [CONTENT_GUIDE.md](CONTENT_GUIDE.md) for writing rules.

## Source quality

Choose sources for the claim, not by rank alone.

1. **Primary/authoritative:** official documentation, standards, laws/regulators, original research, and direct datasets. Check date, scope, and incentives.
2. **Independent expert analysis:** reproducible technical work, peer-reviewed research, specialist organizations, and evidence-based reporting.
3. **First-hand experience:** useful operational detail, but limited to the author's context.
4. **Community/social discussion:** useful for discovering questions and experience; weak support for broad or high-stakes claims.
5. **AI-generated text and unsourced compilations:** research leads only, never evidence.

A source may be authoritative for one question and inadequate for another. Prefer the closest source to the claim.

## Citation practice

- Cite consequential, disputed, technical, quantitative, and time-sensitive claims near the statement.
- Link to the relevant page/document. Record author or organization, title, URL, publication/update date when available, and access/check date for volatile sources.
- State which claim a citation supports. A general reading list does not automatically support nearby claims.
- Attribute quotations and distinctive ideas. Prefer original summaries over long quotations.
- Include material counterevidence. Never cite AI output as factual evidence; verify its references independently.

The source list, last-verified date, review-by date, and a concrete review trigger are structured frontmatter fields, validated at build time and shown on the page. A review-by date is a planned check, not a guarantee. If it passes, the site build surfaces that page in the review queue; update it, mark it `needs-review`, or retire it before relying on the claim. Keep an on-page readable source list and include check dates for volatile claims.

## Recency and maintenance

- **High volatility:** prices, free-tier limits, availability, features, vendor terms, security advisories, regulations, and platform policies. Check current primary sources before publication and after a meaningful change; show a last-checked date.
- **Moderate volatility:** versions, workflows, benchmarks, and market practices. Include relevant version/date and revisit when underlying systems change.
- **Lower volatility:** durable concepts. Revisit when credible evidence or a correction emerges.

A check date is not a guarantee of continued accuracy. Avoid promising a cadence maintainers cannot support. Make uncertainty visible and make review work specific: state the event that should trigger an early recheck (for example, a vendor plan change, a new security advisory, a standards revision, a platform policy update, or credible correction).

## Conflicts, gaps, and intake

When credible sources disagree, describe the difference and likely reasons (date, method, jurisdiction, use case, incentives). If evidence is weak, narrow or omit the claim. For high-impact decisions, link to qualified or authoritative guidance and state the limits of general information.

Raw notes, screenshots, copied lists, and AI-assisted drafts are leads, not approved content. Before promotion: identify a claim, find the original/best source, verify scope and currentness, rewrite in original language, cite evidence, and record uncertainty. Do not include credentials, private customer data, account identifiers, or confidential instructions in the public repository. Redact or exclude material with unclear permissions. See [the initial source inventory](SOURCE_INTAKE.md).

Anyone may report a broken citation, outdated detail, missing context, or unsupported claim in an issue or pull request. Prioritize safety, privacy, legal, and materially misleading errors.
