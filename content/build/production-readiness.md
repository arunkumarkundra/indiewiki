---
title: Production readiness checklist
description: What a prototype needs before it touches paying customers, sized for a solo founder. Data, login, payments, errors, backups, deploys and support.
type: checklist
updated: 2026-10-16
order: 7
nav_title: Production readiness
time: 2 to 4 hours to review
tags: [production, checklist, mvp, launch readiness, vibe coding, saas, backups, migrations]
related: [/ship/security-checklist/, /run/monitoring-and-backups/, /start/building-with-ai/]
---

A prototype proves an idea. A product survives real people: odd inputs, double clicks, slow networks, refunds and 2 a.m. outages. This list is the difference, trimmed to what matters for a small team. Enterprise needs (SSO, SOC 2, data residency) come later, when a customer asks for them.

Paste this list into your AI coding tool and work through it one section at a time. Click **Copy as Markdown** above.

## Data

- [ ] The database schema was designed on purpose, with each table and column explained in a short document.
- [ ] Every table has row-level permissions or server checks so user A cannot read user B's data by changing an ID in the URL.
- [ ] Money is stored as whole numbers of the smallest unit (cents, paise), never as decimals.
- [ ] Dates and times are stored in UTC and shown in the user's time zone.
- [ ] Names with apostrophes, accents, emoji and right-to-left text are saved and shown correctly.
- [ ] Deleting important things is a soft delete first (recoverable for a while), so "I deleted it by accident" is fixable.
- [ ] Lists that can grow are paginated, and the slow queries have database indexes.
- [ ] Users can export their own data in a common format (CSV or JSON).

## Login and permissions

- [ ] Login is handled by a provider or a maintained library, not hand-written. See [Login and user accounts](/build/auth-and-accounts/).
- [ ] Reset links expire and work once; sessions time out.
- [ ] Every server route checks both who the user is and what they are allowed to do.
- [ ] Admin actions are logged with who did what and when.

## Payments

- [ ] Prices and plan limits are checked on the server, not only in the browser.
- [ ] Payment webhooks verify the provider's signature before trusting them.
- [ ] Webhook handling is safe to run twice, so a retried event does not double-charge or double-upgrade.
- [ ] Failed payments, cancellations, refunds and downgrades are handled, not just the happy path.
- [ ] Tax is handled, either by a merchant of record or by you with the right registrations. See [Accepting payments](/earn/accepting-payments/).

## Inputs and errors

- [ ] Every form validates on the server, and keeps what the user typed when one field is wrong.
- [ ] Error messages tell users what happened and what to do, never "Something went wrong" alone, and never a stack trace.
- [ ] Buttons that submit are disabled while working, so four clicks do not create four orders.
- [ ] Every screen has a loading state, an empty state and an error state.
- [ ] File uploads are limited by type and size and stored outside the web server.

## Secrets and dependencies

- [ ] No API keys, passwords or tokens are in the code, the repository history or browser bundles.
- [ ] Any key that was ever exposed has been rotated.
- [ ] Every package the AI added exists, is the one intended, and is maintained.
- [ ] Dependabot or a similar tool is on, and updates are applied monthly.

## Reliability

- [ ] Errors are tracked with [[tool:sentry]] or similar in both frontend and backend.
- [ ] An uptime check from outside your network alerts your phone.
- [ ] The database is backed up automatically, and a restore has been tested at least once.
- [ ] Slow work (emails, reports, AI calls) runs in the background with retries that back off.
- [ ] Scheduled jobs alert you if they stop running.

## Deploys

- [ ] Code lives in a Git repository you own; every change is a commit you can roll back.
- [ ] There is a preview or staging copy to test changes before customers see them.
- [ ] Database changes (migrations) are written down and can be undone.
- [ ] You can roll back a bad release in minutes and know how.

## People and paperwork

- [ ] Privacy policy and terms match what the code actually does. See [Privacy, terms and the law](/ship/privacy-and-legal/).
- [ ] Users can contact you, and you answer within a day.
- [ ] Transactional emails (sign-up, receipts, resets) arrive in the inbox, not spam, thanks to SPF, DKIM and DMARC.
- [ ] Users can turn off notifications and delete their account.
- [ ] Every account and domain is owned by you or your company. See [Accounts and ownership](/setup/accounts-and-ownership/).

::: note What can wait
Single sign-on (SAML), SCIM user provisioning, SOC 2, HIPAA, data residency and multi-region failover matter when a specific customer or law requires them. Note them in your roadmap, and build when someone is ready to pay for them.
:::
