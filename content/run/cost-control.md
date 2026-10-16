---
title: Cost control checklist
description: Stop surprise cloud and AI bills before they happen with spending caps, alerts, per-user limits and a monthly review of every subscription.
type: checklist
updated: 2026-10-16
order: 4
nav_title: Cost control
time: 1 hour, then 15 minutes a month
tags: [costs, billing, spend cap, budget alerts, free tier, cloud bill, ai costs, subscriptions]
faq:
  - q: What causes surprise bills most often?
    a: A bug that loops calling a paid API, a public endpoint that bots discover, data transfer (egress) from storage, and free plans that quietly switch to pay-as-you-go. Hard caps and alerts catch all of them.
  - q: Are free tiers safe?
    a: Free tiers that stop at a limit are safe. Free allowances on pay-as-you-go plans are not, because usage beyond the allowance is billed. Know which kind you are on for every service.
related: [/build/ai-features/, /build/choose-your-stack/, /run/monitoring-and-backups/]
---

Small products rarely die from big bills, but a single surprise invoice can wipe out months of revenue. Most services offer caps and alerts; they are just rarely on by default. Spend an hour turning them on.

## Before you connect a card

- [ ] You know whether each service's free plan **stops** at its limit or **bills** past it.
- [ ] Hard spending limits are set where available: AI providers, cloud platforms, database, SMS.
- [ ] Billing alerts are set at 50% and 80% of what you expect to spend, sent to an inbox you read.
- [ ] Prepaid credit is used instead of open-ended billing where the provider offers it.

## Inside your product

- [ ] Every endpoint that costs money per call (AI, SMS, email, maps) has rate limits per user and per IP.
- [ ] Each plan has usage limits that match what it pays.
- [ ] Anonymous or free users have small allowances.
- [ ] Retries stop after a few attempts and back off between them.
- [ ] Large files are served from storage with free egress, such as [[tool:cloudflare-r2]].
- [ ] Logs and temporary files are deleted on a schedule.

## Monthly review

- [ ] Every subscription and service is listed with its cost, renewal date and owner.
- [ ] Services you no longer use are cancelled.
- [ ] Yearly billing is used for tools you are sure to keep (often a meaningful discount).
- [ ] Cost per active user is calculated, and compared with revenue per user.
- [ ] Any provider emails about pricing changes are read and acted on.

::: tip Prefer plans that pause
For side projects and early products, plans that suspend when a limit is reached (for example [[tool:neon]]'s free plan, or [[tool:cloudflare-workers]] on the free plan) are safer than plans that keep billing. A paused feature is a support message; an unexpected bill is a real loss.
:::
