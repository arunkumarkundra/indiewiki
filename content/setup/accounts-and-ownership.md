---
title: Accounts and ownership checklist
description: Make sure you own every account your product depends on, that two-step login protects them, and that someone can take over if you are unavailable.
type: checklist
updated: 2026-10-16
order: 4
nav_title: Accounts and ownership
time: 45 min to work through
tags: [security, accounts, 2fa, password manager, ownership, bus factor, recovery codes]
related: [/ship/security-checklist/, /setup/choose-a-domain/, /run/company-and-paperwork/]
---

Many small products are lost not to hackers but to an expired card, a freelancer who registered the domain in their own name, or a founder who lost the phone holding every two-step login code. Work through this list once now and once a year.

## Own the accounts

- [ ] The domain is registered in my name or my company's name, with my own login.
- [ ] Hosting, DNS, the code repository, the database, the payment provider and the app store accounts are all owned by me or my company, not by a freelancer or agency.
- [ ] Freelancers and helpers get their own logins with limited permissions, never my password.
- [ ] Account emails use an address that does not depend on the product's own domain (so a lapsed domain cannot lock me out of the registrar).
- [ ] I have a written list of every service the product uses, what it costs, and who has access.

## Protect the logins

- [ ] Every password is unique and stored in a password manager such as [[tool:bitwarden]].
- [ ] Two-step login is on for the registrar, DNS, email, GitHub, hosting, database, payment provider, app stores and bank.
- [ ] I use an authenticator app or a passkey, not SMS, wherever the service allows it.
- [ ] Recovery codes for each two-step login are saved somewhere other than my phone (password manager or printed and stored safely).
- [ ] My authenticator codes are backed up, for example with [[tool:ente-auth]], so a lost phone does not lock me out.

## Keep it running

- [ ] Auto-renew is on for the domain and every paid service the product needs.
- [ ] The card on file does not expire in the next three months, and I get an email when a payment fails.
- [ ] Renewal and billing emails go to an inbox I actually read.
- [ ] I have checked that my payment card allows international and recurring charges, if services bill in another currency.

## Plan for the day you are not there

- [ ] A trusted person knows where the password manager emergency access or recovery details are kept.
- [ ] There is a short document explaining how to keep the product running, pause it, or shut it down cleanly.
- [ ] Important code and data exist in at least one place I control outside the main service (a GitHub repository and a backup).

::: tip Do this with a co-founder
If you have a co-founder, use a shared vault in your password manager and give both of you owner-level access to the domain, code and payment accounts. One person should never be the only way in.
:::
