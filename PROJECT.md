# IndieWiki

**The practical wiki for independent builders.**

IndieWiki is a contributor-maintained knowledge system for individuals and small teams building independent products and businesses. It helps builders decide what to do next, how to do it, what can go wrong, and what evidence supports the guidance.

## Purpose and principles

Collect, organize, explain, and maintain practical knowledge across the work of building an independent product. The supplied material is an imperfect research corpus, not approved advice.

- **Knowledge system first:** establish a coherent, navigable body of knowledge before a public website.
- **Repository is source of truth:** Markdown and source records in GitHub are authoritative. A future website is a published view, not a separate editorial database.
- **Useful over exhaustive:** favor scoped, actionable guidance over an undifferentiated link collection.
- **Evidence travels with claims:** readers should be able to trace sources, dates, claim types, context, and recheck needs.
- **Contributor maintained:** corrections, additions, and review happen through issues and pull requests.
- **Honest uncertainty:** show assumptions, disagreement, gaps, and dated claims.
- **Independent-builder perspective:** account for solo and small-team limits without assuming one country, stack, or business model.

## Audience and boundaries

The audience is an individual or small team exploring, validating, building, launching, growing, monetizing, or operating an independent product. This is general educational information, not individualized legal, tax, investment, medical, or incident-response advice. State when jurisdiction or circumstances matter.

The wiki does not endorse a tool simply because it appears in a source or promise that a price, feature, free tier, or service will remain available.

## Knowledge map

This starting taxonomy is not a claim that every topic is covered. See [the wiki structure](WIKI_STRUCTURE.md).

- **Start:** problems, customers, markets, niches, founder/market fit, idea evaluation.
- **Validate:** interviews, demand signals, competitors, landing pages, prototypes, concierge tests, pre-sales, waitlists, fake-door tests.
- **Product:** strategy, MVPs, requirements, user stories/flows, UX/UI, onboarding, states, notifications, prioritization.
- **Build:** architecture, frontend/backend, data, authentication/authorization, APIs, storage, search, email, payments, jobs, analytics, errors.
- **AI Build:** coding tools, prompting, context, planning, review, verification, testing, security, agents, permissions, maintenance.
- **Tech Stack:** domains/DNS, hosting, frameworks, backend platforms, databases, auth, email, payments, analytics.
- **Security:** secure defaults, privacy, secrets, access control, dependencies, backups, incident response.
- **Ship:** release preparation, deployment, observability, launch planning, learning.
- **Grow:** positioning, distribution, content, SEO, partnerships, sales, first users.
- **Monetize:** pricing, packaging, billing, payments, business models.
- **Retain:** activation, onboarding, support, reliability, engagement, churn.
- **Operate:** support, analytics, maintenance, compliance awareness, sustainable workflows.
- **Business:** finance, legal, tax, operations, with jurisdiction stated.
- **Resources:** reusable checklists, templates, glossaries, annotated references.

Cross-link topics rather than duplicating guidance. Substantive articles follow [CONTENT_GUIDE.md](CONTENT_GUIDE.md) and [SOURCE_POLICY.md](SOURCE_POLICY.md). Contributions and decisions follow [CONTRIBUTING.md](CONTRIBUTING.md) and [GOVERNANCE.md](GOVERNANCE.md).

## Project status and open decisions

The repository is the canonical source for the static wiki. The first implementation uses Markdown articles in `src/content/knowledge/`, built and published by GitHub Actions. Supplied material is recorded in [SOURCE_INTAKE.md](SOURCE_INTAKE.md); it is seed material, not verified evidence.

Remaining project decisions include the license/reuse terms, maintainer appointments, source/image permission records, GitHub Pages configuration, and custom-domain DNS. The site workflow is in `.github/workflows/deploy.yml`; the target host is `https://indie.pi3.in`.
