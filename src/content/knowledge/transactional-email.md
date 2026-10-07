---
title: "Make transactional email dependable"
description: "Separate essential product messages from marketing, set up sender authentication, and build retries, templates, and delivery visibility."
slug: transactional-email
category: build
kind: article
tags: [email, deliverability, operations]
audience: [independent builders, solo founders, small teams]
status: published
evidence: primary
confidence: moderate
lastVerified: 2026-10-07
reviewBy: 2027-01-07
reviewTrigger: "Recheck after upstream documentation, security advisories, pricing, supported versions, or relevant platform policies change."
related: [build, operate]
featured: false
seedSources: []
sources:
  - title: "Email sender guidelines"
    url: https://support.google.com/a/answer/81126
    publisher: "Google Workspace Admin Help"
    accessed: 2026-10-07
---

## Decide which messages are essential

Transactional email completes or protects a user-requested product action: sign-in link, password reset, receipt, invitation, or important account notice. Marketing announces or promotes something. Keep these purposes distinct in your product, templates, mailing lists, and consent records. Rules differ by jurisdiction and message type, so check the requirements that apply to your audience; do not assume calling a message “transactional” makes every promotional email permissible.

List the message, triggering event, recipient, expected delivery time, fallback, and sensitive data it contains. A password-reset email should contain a short-lived, single-use link and no password. A receipt should state what was charged and how to get help, while avoiding unnecessary personal details.

## Authenticate the sending domain

Use a sending service with a domain you control. Configure SPF and DKIM as instructed by the provider, and publish a DMARC policy so receiving systems can verify alignment and report failures. Start with a monitoring policy where appropriate, inspect reports, then tighten enforcement when all legitimate senders are aligned. Keep an inventory of every service allowed to send as your domain so adding a new tool does not silently break authentication.

Use a recognizable From name and address, a monitored reply path, and a separate subdomain for application mail if that helps protect the reputation of your main domain. Do not send a sudden large campaign from a new domain. Follow current provider requirements for bulk or subscribed mail, including clear identity and unsubscribe handling where applicable.

## Build the delivery path for failure

Do not make a user wait for an email provider’s network call while holding a database transaction open. Record the email task durably, then have a worker deliver it. If the send fails temporarily, retry with bounded exponential backoff and jitter. Stop retrying permanent failures, record the reason, and make a visible operational alert for repeated problems. Give each message a deduplication key so retried jobs do not produce confusing duplicate receipts.

Keep templates in version control. Use plain language, accessible HTML, and a text alternative. Put the action near the top, make links descriptive, and ensure the destination works on mobile. Test both dark and light rendering in major clients. Use a staging recipient allowlist so test messages cannot reach real customers.

## Protect links and recipient data

Treat email as a transport channel, not an identity proof by itself. Sign-in and reset links should be hard to guess, expire quickly, be single-use where practical, and avoid leaking tokens to analytics or third-party assets. Do not put sensitive content in subject lines that may appear on lock screens. Limit access to delivery logs and set retention based on the operational need.

For marketing preferences, store and honor consent and unsubscribe state. Keep a minimal suppression record when someone opts out so a future import does not accidentally resubscribe them. Essential service messages may have different rules, but should not be used as a loophole for promotions.

## Monitor what users experience

Track accepted, bounced, delayed, and complained events, plus the time from user action to delivery. A provider saying “accepted” does not mean it reached the inbox. Alert on spikes in permanent failures and verify domain authentication periodically. Provide an in-app way to resend verification or reset messages with rate limits. A good email system has a fallback path when mail is slow and a clear answer when a user says “I never got it.”
