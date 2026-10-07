# Content guide

This guide defines how IndieWiki articles should read. See [SOURCE_POLICY.md](SOURCE_POLICY.md) for evidence rules.

## Write for a real task

Use a title that matches a builder's question. Start with a direct orientation and next action. Define unfamiliar terms, link related concepts, and use concrete steps, examples, or checklists where useful. Explain why advice matters and when it does not apply. Include meaningful failure modes, alternatives, and trade-offs. Avoid filler, hype, unexplained acronyms, and certainty the evidence cannot support.

## Minimum useful article

A page marked `published` must help a reader do or decide something without requiring them to infer the missing steps. Include a direct answer, a workable process or decision method, at least one concrete example or reusable artifact when the topic allows it, likely failure modes, and a clear next action. Explain the limits of the method and link to relevant pages. A short reference page can be shorter when its definitions or checklist are complete; do not pad it to meet a word count.

Keep research-process notes out of reader-facing copy. Do not tell readers that a supplied PDF, screenshot, or source packet was incomplete, dated, or not copied. Convert useful ideas into original guidance, verify claims that need evidence, and omit anything that cannot be responsibly generalized. Put corpus inventory and contributor-facing provenance in repository documents, not in published articles.

## Distinguish claim types

Make clear whether a passage is a **fact** (checkable and sourced), **recommendation** (with rationale, assumptions, and fit), **experience** (attributed and context-bound), **opinion** (reasoned and labeled), or **example** (clearly illustrative). Separate these when they appear together. Do not disguise preference as objective ranking.

## Suggested article structure

Adapt this outline to the page; small reference pages need not include every section.

1. Summary: what the page helps with.
2. When it applies: audience, stage, constraints, and jurisdiction if relevant.
3. Steps or explanation, with links to related concepts.
4. Trade-offs, risks, alternatives, and when to stop.
5. Examples or checklist, only where useful.
6. Sources and further reading.
7. Maintenance notes, including last verified date, planned review date, and a concrete trigger for an early recheck.

For published pages, `reviewBy` is when the next verification should happen and `reviewTrigger` names a material change that should prompt an earlier check. Use shorter intervals for volatile vendor, security, legal, and platform guidance; use longer intervals only for durable concepts. If the review date passes before the page is checked, mark it `needs-review` or revise its evidence before another release. Do not use a recent date to imply the whole page has been verified when only one link was checked.

The article metadata format is defined in `src/content.config.ts` and documented in `src/content/README.md`. Every page needs the required frontmatter fields; optional fields should be omitted rather than guessed.

## Accuracy, safety, and privacy

- Attachments, AI output, search snippets, social posts, and other wikis are leads, not verification.
- Verify prices, free-tier limits, features, versions, and policies with current primary sources before describing them as current.
- Scope security advice to a threat and system; never publish credentials, private user data, or operational secrets.
- Remove or anonymize customer, account, analytics, and personal data unless permission and editorial need are clear.
- For legal, tax, financial, and regulated topics, state jurisdiction and date, cite authoritative sources, and avoid individualized advice.
- Summarize copyrighted material in original language. Link to sources and obtain permission for assets as needed.

## Tools and presentation

Tool pages explain the job, selection criteria, fit, limitations, pricing uncertainty, portability, and alternatives. Qualify “best” by a use case. Disclose relevant vendor or affiliate interests.

Use descriptive headings, meaningful links, accessible tables, and alt text for informative images. Use unambiguous dates such as 2026-10-07. Label examples and give code snippets relevant version/environment details.

## Review checklist

Does the page answer a real question? Are its scope, assumptions, and claim types clear? Are consequential claims supported and volatile claims dated? Are uncertainty, risks, alternatives, and exceptions fairly represented? Have private data and unnecessary copyrighted material been excluded? Are links and presentation accessible?
