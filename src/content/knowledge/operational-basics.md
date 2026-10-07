---
title: "Operating a small product without losing the plot"
description: "A compact operating rhythm for support, reliability, maintenance, and learning that fits a solo builder or small team."
slug: operational-basics
category: operate
kind: article
tags: [operations, support, reliability]
audience: [independent builders, solo founders, small teams]
status: published
evidence: practitioner
confidence: moderate
lastVerified: 2026-10-07
reviewBy: 2027-04-07
reviewTrigger: "Recheck when new customer evidence changes the workflow, segment, costs, or decision method described on this page."
related: [operate]
featured: false
seedSources: []
sources:
  - title: "Managing incidents"
    url: https://sre.google/sre-book/managing-incidents/
    publisher: "Google SRE Book"
    accessed: 2026-10-07
---

## Create a one-page service map

List each production component, its purpose, owner, data handled, account location, support contact, renewal date, and recovery path. Include domain/DNS, source control, hosting, database, authentication, email, payment processor, analytics, file storage, and error monitoring where used. Record where credentials are stored—not the credentials themselves.

For each critical dependency, answer: what happens if it is unavailable, how will you notice, can users keep working, and what can you safely do? A solo founder may not need a complex on-call platform, but does need access recovery and a way to restore essential data.

## Keep a small operating rhythm

**Weekly:** review severe errors, unanswered support, failed payments or background jobs, and unexpected usage/spend.

**Monthly:** install security updates, verify account owners and billing contacts, review backups and retention, and remove unused integrations.

**Quarterly or after a major change:** restore a backup in a test environment, review who has production access, verify the contact and rollback steps, and update the service map.

Adjust the schedule to the system’s risk. A static site with no user data needs much less operational ceremony than a paid product storing customer documents.

## Write runbooks for rare, stressful tasks

For deploy and rollback, backup restore, credential rotation, provider outage, and suspected data exposure, document prerequisites, the exact safe steps, expected result, and escalation/contact point. Keep runbooks accessible if the primary app is down. Test them without exposing production secrets. If you are the only operator, identify what another trusted person would need to regain access in an emergency.

## Respond to incidents with facts

When a failure occurs: protect users first, stop harmful processing, preserve relevant logs, communicate what is known and unknown, and bring in qualified help when the impact exceeds your experience. Record a timeline, affected users/data, trigger, detection gap, mitigation, and follow-up owner. Avoid assigning blame; change the system so the same failure is less likely. Follow applicable notification and reporting requirements when personal data or regulated services are involved.

Keep monitoring proportional. Every metric or alert should answer a question or trigger an action. Alert on user-impacting failures and thresholds you can respond to, not every harmless log line. For launch gates see [first launch readiness](/wiki/first-launch-readiness/) and for privacy planning see [privacy by default](/wiki/privacy-by-default/).
