---
title: "Make backups you can actually restore"
description: "Choose recovery targets, protect every essential part of the product, and rehearse restoration before a real incident."
slug: make-backups-you-can-restore
category: operate
kind: recipe
tags: [backups, disaster-recovery, data-protection]
audience: [independent builders, solo founders, small teams]
status: published
evidence: mixed
confidence: moderate
lastVerified: 2026-10-07
reviewBy: 2027-04-07
reviewTrigger: "Recheck after database, identity, storage, hosting, retention, or recovery-cost changes and after every failed restore drill."
related: [operate, build, privacy]
featured: false
seedSources: []
sources:
  - title: "StopRansomware Guide"
    url: https://www.cisa.gov/stopransomware/ransomware-guide
    publisher: "Cybersecurity and Infrastructure Security Agency"
    accessed: 2026-10-07
  - title: "The Twelve-Factor App: Backing services"
    url: https://12factor.net/backing-services
    publisher: "The Twelve-Factor App"
    accessed: 2026-10-07
---

## Decide how much loss and downtime you can accept

A backup plan is a recovery decision. Ask two plain-language questions with the product owner (even if that is you):

- **How much recent work could we afford to lose?** This sets the recovery point objective (RPO). If losing a day of records is unacceptable, a daily export alone is not enough.
- **How long could the product be unavailable?** This sets the recovery time objective (RTO). A hobby project and a paid service used for daily operations may have different tolerances.

Write the answer and the cost of improving it. The right schedule depends on how often data changes, the harm from losing it, storage cost, and the time you can spend recovering. A provider snapshot is useful, but it is not a complete plan: account compromise, accidental deletion, provider outage, or a broken migration may also affect it.

## Inventory what a working restore needs

List data and configuration that must exist for a user to resume work:

| Item | What to record |
| --- | --- |
| Primary database | Backup method, frequency, encryption, retention, restore steps |
| Uploaded files | Object store, versioning or export, relationship to database records |
| Configuration | Domain, DNS, environment variable names, deployment instructions |
| Identity and access | Recovery owner, account recovery path, MFA and admin access procedure |
| External services | Provider names, account identifiers, export options, support contacts |
| Application | Source repository, deploy method, dependency/runtime versions |

Do not put credentials in the inventory. Keep the instructions and required recovery contacts somewhere available if the primary app or your main laptop is unavailable. The [Twelve-Factor backing-services guidance](https://12factor.net/backing-services) treats attached services as resources that can be swapped; for recovery, record how to reconnect to each service rather than assuming the application code is the whole product.

Where the risk warrants it, retain an encrypted export outside the production account. CISA’s ransomware guidance calls for offline encrypted backups and regular restoration tests. That advice addresses ransomware risk; adapt the storage and isolation level to the data, threat model, and budget of your product. A second copy in the same account may not protect against a compromised account.

## Run a restore drill

Schedule a restore in a separate test environment before launch if the app holds valuable user data, and repeat it after meaningful storage or schema changes. Use a non-production copy with access restricted; protect or anonymize personal data before putting it in a test environment.

1. Pick a backup by date and record its expected coverage.
2. Restore it into an isolated database or provider project, not over production.
3. Restore associated files and configuration from the documented sources.
4. Start the matching application version and check account access, record counts or samples, relationships, permissions, and one complete user journey.
5. Record actual elapsed time, missing items, manual steps, and who performed each action.
6. Fix the runbook and repeat until another operator—or your future self—can follow it without guesswork.

A successful backup job only shows that a backup process ran. A restore drill checks whether the copy is readable, complete enough, compatible with the app, and usable within your downtime target. If the drill fails, treat that as an operational defect: improve export coverage, access recovery, retention, or documentation, then schedule another attempt. Link this runbook from [operational basics](/wiki/operational-basics/) and review it after any database migration.
