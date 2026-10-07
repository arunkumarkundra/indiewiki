---
title: "Keep software dependencies current and secure"
description: "Set up a sustainable update routine, prioritize vulnerability reports by real exposure, and ship dependency changes with a recovery path."
slug: keep-dependencies-current-and-secure
category: quality
kind: recipe
tags: [dependencies, security, maintenance, supply-chain]
audience: [independent builders, solo founders, small teams]
status: published
evidence: multiple-sources
confidence: moderate
lastVerified: 2026-10-07
reviewBy: 2027-01-07
reviewTrigger: "Recheck package-manager audit behavior, repository alert coverage, and security-prioritization guidance when their upstream documentation changes."
related: [quality, build, operate]
featured: false
seedSources: []
sources:
  - title: "Dependabot alerts"
    url: https://docs.github.com/en/code-security/concepts/supply-chain-security/dependabot-alerts
    publisher: "GitHub Docs"
    accessed: 2026-10-07
  - title: "Configuring Dependabot security updates"
    url: https://docs.github.com/en/code-security/how-tos/secure-your-supply-chain/secure-your-dependencies/configure-security-updates
    publisher: "GitHub Docs"
    accessed: 2026-10-07
  - title: "Auditing package dependencies for security vulnerabilities"
    url: https://docs.npmjs.com/cli/audit.html
    publisher: "npm Docs"
    accessed: 2026-10-07
  - title: "Known Exploited Vulnerabilities Catalog"
    url: https://www.cisa.gov/known-exploited-vulnerabilities-catalog
    publisher: "U.S. Cybersecurity and Infrastructure Security Agency"
    accessed: 2026-10-07
---

## Make dependency work part of operating the product

An application depends on more than the packages named in its manifest. Its resolved lockfile, runtime, build tools, container base image, GitHub Actions, plugins, and external libraries can all affect whether it builds or stays safe. Old dependencies also increase the size of a future upgrade because several changes may have to move together.

The practical goal is not to update everything immediately. It is to know what the product runs, notice relevant changes, make small reviewable updates, and have a way to recover if an update breaks the service.

## Inventory what ships and what runs

For each application or deployable component, record:

- package manifests and lockfiles, including nested workspaces;
- the language/runtime version and how it is selected in development and deployment;
- production dependencies separately from test/build-only dependencies;
- system packages and container base images, if used;
- CI actions, build plugins, browser extensions, and services that execute code in your environment;
- the production owner, deployment path, and how to roll back.

Keep each ecosystem’s lockfile committed and install from it in CI and deployment. The manifest describes allowed version ranges; the lockfile records the resolved tree. A scanner’s results can only be as accurate as the files and package ecosystems it can see. [GitHub documents](https://docs.github.com/en/code-security/concepts/supply-chain-security/dependabot-alerts#limitations) that Dependabot alerts do not find every issue, can lag new advisories, and depend on current manifests and lockfiles. Check the project’s built/runtime contents too when it differs from the repository’s package tree.

## Turn on useful signals, then check that they reach you

For a GitHub repository, review **Settings → Security and quality → Advanced Security** and enable dependency-graph/Dependabot alerts and security updates where available. These settings and ecosystem support can vary by repository and plan. Assign someone to own alerts; for a solo product, that person is you, and the owner still needs a calendar reminder.

When first enabling alerts, inspect the existing open alerts directly. [GitHub says](https://docs.github.com/en/code-security/concepts/supply-chain-security/dependabot-alerts#how-alert-notifications-work) it does not send notifications for all vulnerable dependencies it finds at initial enablement; notifications are for newly identified vulnerabilities after enablement, subject to notification preferences. Test that an alert would reach an inbox you actually review. [Security update pull requests](https://docs.github.com/en/code-security/how-tos/secure-your-supply-chain/secure-your-dependencies/configure-security-updates) are proposals: they do not verify your product behavior or deploy the fix.

Set a routine that fits your release capacity. A workable starting point is a short weekly alert review and a monthly ordinary-update window; change the cadence if the product’s exposure, operational risk, or available time calls for it. Urgent reports need triage when they arrive, not at the next calendar slot. Separately, schedule runtime, base-image, CI-action, and service review where your scanners do not cover them.

## Triage a vulnerability report before choosing the update

For each report, record the package and dependency path, affected and fixed versions, the advisory, whether the dependency reaches production, the vulnerable feature or configuration, external exposure, and consequences if exploited. Check the current maintainer or vendor advisory; a scanner summary is an index, not the entire analysis.

Use these questions to decide order:

1. Is there evidence the issue is being exploited? CISA’s [Known Exploited Vulnerabilities catalog](https://www.cisa.gov/known-exploited-vulnerabilities-catalog) is an authoritative list of vulnerabilities known to be exploited in the wild. A match is a strong prioritization signal. No match does **not** establish that a vulnerability is safe or unexploited; the catalog is not a complete list of all vulnerabilities.
2. Does the affected dependency and vulnerable code path exist in the running production system, and can an attacker reach it?
3. What can the affected component do or access—customer data, authentication, file handling, build credentials, or only a local development task?
4. Is a fixed release available? Does the fix require a breaking upgrade, configuration change, migration, or replacement?
5. If you cannot patch immediately, what temporary restriction reduces exposure, who owns it, and when will it be removed?

Do not sort only by a severity number. Severity is useful input, but production exposure, exploit evidence, reachable code, privileges, and the consequences for your particular product change the decision. Do not automatically dismiss a transitive or development dependency without understanding where it executes: build-time code may still access CI secrets or alter published artifacts.

## Update in a reviewable change

For a routine update, group compatible low-risk updates only when your checks can still identify which change caused a failure. Keep major framework, runtime, database, build-chain, and security fixes with significant migration work in focused changes. Avoid combining a dependency upgrade with unrelated product work.

For each proposed change:

1. Read the advisory or release notes and identify the fixed version and relevant behavior changes.
2. Use the project’s intended package manager and update the lockfile; do not hand-edit resolved versions or regenerate the whole tree without a reason.
3. Review both manifest and lockfile diffs. Check for unexpected packages, changed registries, lifecycle scripts, binary downloads, or unrelated version churn.
4. Run the repository’s install, static checks, tests, build, and the critical product flow affected by the library. If the package handles authentication, authorization, payments, imports, or customer data, exercise those boundaries specifically.
5. Deploy to a preview or small initial cohort when the effect could disrupt customers. Confirm runtime behavior and logs before broad rollout; know how to revert the release or restore data if a migration is involved.
6. Verify the deployed artifact uses the fixed version and that the alert or operational condition is actually resolved. Closing an alert alone is not proof that production changed.

For npm projects, [`npm audit`](https://docs.npmjs.com/cli/audit.html) reports known vulnerabilities from the configured registry. Its documentation says the audit submits a description of the configured dependencies and needs a lockfile. Account for this data flow when using private package names or a registry under an organization’s security policy. `npm audit fix` can apply compatible changes; review the resulting diff. npm notes that some recommendations may be semver-breaking and require manual review. Avoid using a force option simply to make the report go green.

## When no safe automatic fix exists

First confirm the affected dependency path and conditions. If a fix exists upstream but a parent package has not adopted it, update that parent when supported, replace it, or ask its maintainer for a release. If no fix exists, reduce exposure where practical: disable the affected feature, restrict access, remove the package, or use a verified temporary mitigation. Record what remains vulnerable, the owner, and the date to review the mitigation. A temporary workaround is not a permanent patch.

If there is evidence of compromise or exploitation of your own service, treat it as a security incident: preserve relevant logs, restrict the affected path, rotate credentials that may have been exposed, assess customer/data impact, and follow the incident and notification obligations that apply to your business. Do not assume installing a patch removes an attacker who already gained access.

## Keep the update loop small

Once a month, review overdue update pull requests and ignored alerts. For each one, merge, replace, defer with an owner and review date, or document why the finding does not apply. An indefinite ignore list hides work rather than resolving it. If the backlog has grown, prioritize production and exposed components first, then schedule staged upgrades for unsupported runtimes and foundational libraries.

Use [maintainable build workflow](/wiki/maintainable-build-workflow/) for safe change review, [secure an AI-built app](/wiki/secure-an-ai-built-app/) for application security checks, and [operational basics](/wiki/operational-basics/) for ownership and incident readiness.
