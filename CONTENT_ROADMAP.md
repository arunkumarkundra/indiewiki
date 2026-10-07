# IndieWiki content roadmap

IndieWiki exists to give independent builders a dependable, practical reference across the work of finding a problem, validating demand, designing and building a product, reaching customers, earning revenue, and operating it responsibly. The source PDFs and notes supplied at project start were diagnostic material: they showed how fragmented, incomplete, stale, and unreliable the information available to builders can be. They were not a content specification or a finished source library.

This roadmap turns that purpose into an editorial coverage plan. It is a living gap list, not a promise that every topic can be permanently complete. A topic is covered only when a reader can make a decision or do the work with enough context to handle common variations and failures.

## How we define useful coverage

For each task, aim to provide:

1. **Orientation:** what decision or outcome the task concerns, who it is for, and when the guidance applies.
2. **A workable method:** ordered steps, examples, reusable artifacts, or a decision tree that a solo builder can actually use.
3. **Trade-offs and failure paths:** costs, risks, alternatives, stopping rules, and recovery steps.
4. **Evidence:** claim-level links to authoritative or original sources, with scope, incentives, and uncertainty made clear.
5. **Connections:** links to prerequisites and next tasks, so pages form paths through the work rather than isolated posts.
6. **Maintenance:** a named reason to revisit the page, not merely a date that implies ongoing accuracy.

Do not publish a page to fill a category count. A researched reference may be marked `needs-review` until an editor can verify its claims and practical steps.

## End-to-end coverage map

### 1. Find a problem and a reachable market

**Existing entry points:** idea-to-first-experiment, customer interviews, choose a problem worth solving, bottom-up reachable-market estimate, business basics.

**Build next:** niche research; customer/buyer distinction; founder constraints and fit; recognizing problems without reliable budgets or access.

**Reader should leave with:** a narrow problem and segment hypothesis, evidence log, reachable participant list, and an explicit next experiment or reason to stop.

### 2. Validate demand and understand alternatives

**Existing entry points:** customer interviews, analyzed small-sample research, experiment brief, manual outreach, competitor/workaround research, landing-page testing, honest waitlist/intent test, paid pilot, MVP scope.

**Build next:** prototype tests; survey design; experiment thresholds and decisions; deeper procurement and switching behavior by sector. Review waitlist and paid-pilot guidance against real reader cases and applicable jurisdictional rules. A first B2B sales workflow now exists in `sell-software-to-a-business`.

**Reader should leave with:** evidence of behavior and commitment, not just favorable opinions, plus a documented decision and the uncertainty that remains.

### 3. Shape a usable product

**Existing entry points:** MVP scope, user requirements and acceptance criteria, end-to-end flows/states, first-value onboarding, small usability testing, evidence-based prioritization, accessibility basics and scoped evaluation, offer design, brand basics.

**Build next:** outcomes and product strategy; deeper error, empty, loading, and recovery patterns; choosing what not to build; product decisions with AI-generated prototypes.

**Reader should leave with:** the smallest complete journey that solves one real job, an observable success measure, and a tested path through failure states.

### 4. Build and maintain the system

**Existing entry points:** tech-stack choice, architecture for a small app, maintainable workflow, AI-assisted development, security review, database, auth, API, payments, email, files, jobs, critical-path testing, privacy-aware production observability, backup restoration.

**Build next:** frontend and backend boundaries; search; dependency updates; release/versioning; data migration; multi-tenant isolation; cost controls; choosing managed services with exit plans. A provider-neutral webhook integration workflow now covers authentication, delivery, retries, deduplication, ordering, and reconciliation; add provider-specific integration recipes and expand testing, observability, and recovery guidance from real reader questions and incident reports.

**Reader should leave with:** a small, supportable design, a tested recovery path, and explicit owners for operational responsibilities—even when the owner is one person.

### 5. Ship, find users, and learn

**Existing entry points:** launch readiness, first 100 users, acquisition-channel selection, product measurement, SEO guides, outreach, GitHub Pages deployment.

**Build next:** launch sequencing by audience; content and search strategy; partnerships and communities; customer support loops; release communication; what to do when launch numbers are weak.

**Reader should leave with:** one channel experiment, an instrumented user journey, and a decision cadence that connects feedback to product changes.

### 6. Monetize and run a sustainable business

**Existing entry points:** business basics, clear offer, first-price strategy, contribution-margin and break-even scenarios, payments and subscriptions.

**Build next:** pricing and packaging; value metric choice; pricing interviews and experiments; stronger bookkeeping and cash-runway examples for different revenue patterns; B2B contract and procurement variants by sector; customer terms and records; jurisdiction-specific legal/tax pathways; when professional advice is necessary. Cash forecasting, refund/dispute handling, and a first B2B sales workflow now have practical entry pages.

**Reader should leave with:** clear terms, tested willingness-to-pay evidence, a view of unit economics and cash obligations, and a list of jurisdiction-specific unknowns.

## Research and evidence workflow

For a new article or substantial revision:

1. Write the reader question and the decision the page should enable.
2. Break the answer into claims, recommendations, examples, and open questions.
3. Find the closest authoritative or original source for consequential claims. Use official standards, primary documentation, regulators, original research, or first-hand material; do not cite a source merely because it repeats the claim.
4. Check publication/update date, context, jurisdiction, method, incentives, and whether the source actually supports the sentence.
5. For recommendations, expose the reasoning and conditions. A citation can support a fact; it does not automatically prove a recommendation.
6. Test the steps on a realistic indie-builder scenario. Remove steps that require a large-company team unless you explain a lightweight substitute.
7. Record volatility and a concrete review trigger in metadata or a maintenance note.

Use current primary research for changing product capabilities, prices, laws, standards, and security guidance immediately before publication. Do not invent a universal “regularly updated” promise. The article should say what must be rechecked and why.

## Maintenance queue

Review pages in this order when capacity is limited:

1. Security/privacy incidents, legal or tax statements, payment rules, and claims that could cause direct harm.
2. Vendor availability, pricing, limits, platform policies, and implementation instructions likely to change.
3. Core decision paths that many readers need before they can progress.
4. Durable concepts and lower-impact reference material.

Every review should either verify the page against its recheck triggers, revise it, mark it `needs-review`, or retire it. Broken or unsupported content should not remain `published` simply because it has a recent date. Track proposed additions and reviews through GitHub issues using this roadmap as the shared map.
