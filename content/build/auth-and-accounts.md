---
title: Login and user accounts
description: How to add sign-up and login without storing passwords yourself, which sign-in options to offer, Apple's login rules, and in-app account deletion.
type: guide
updated: 2026-10-16
order: 3
time: 10 min read
tags: [auth, login, sign in with apple, google sign in, magic link, passkeys, account deletion, supabase, clerk]
faq:
  - q: Do I have to offer Sign in with Apple?
    a: If your iPhone app lets people create or log in to their main account with a third-party or social login such as Google, Apple's guideline 4.8 expects an additional option that limits data to name and email, lets users hide their email, and does not track for ads without consent. Sign in with Apple meets this. Apps that use only their own email and password login do not need it.
  - q: Do I need to let users delete their accounts?
    a: Yes, for any iPhone app that lets people create an account. Apple requires an in-app way to start full account deletion, not just deactivation. Privacy laws such as GDPR and India's DPDP Act also give people the right to have their data erased.
  - q: Are magic links safe?
    a: Yes, when links expire quickly and work once. They remove password reuse, the most common way accounts get taken over. Their weakness is email delivery, so set up SPF, DKIM and DMARC first.
sources:
  - title: "Apple: Offering account deletion in your app (5.1.1(v))"
    url: https://developer.apple.com/support/offering-account-deletion-in-your-app/
  - title: Apple App Store Review Guidelines
    url: https://developer.apple.com/app-store/review/guidelines/
related: [/ship/security-checklist/, /launch/app-store-submission/, /ship/privacy-and-legal/]
---

Login is the part of an app where a small mistake leaks everyone's data. The safest choice for an indie product is to **not build it yourself**. Use a provider such as [[tool:supabase-auth]], [[tool:clerk]] or [[tool:firebase-auth]], or a well-maintained library like [[tool:better-auth]] if you are technical. Compare them in [Login and user accounts](/tools/auth/).

## What a good login gives you for free

A provider handles the parts that are easy to get wrong:

- Passwords hashed with a slow algorithm, never stored in plain text.
- Reset links that expire and work only once.
- Sessions that time out, and a way to sign a user out everywhere.
- Protection against guessing passwords at scale (rate limits and lockouts).
- Email addresses with a `+` sign, accents and capital letters handled correctly.
- Social sign-in with Google, Apple, GitHub and others.

## Which sign-in methods to offer

Offer **one or two** methods, not six. Each one adds setup, edge cases and support questions.

| Method | Good for | Watch for |
| --- | --- | --- |
| Email magic link or code | Most consumer and B2B apps | Depends on email delivery; set up SPF, DKIM, DMARC |
| Google sign-in | Fast sign-up for most people | On iPhone apps, triggers Apple's login rule |
| Sign in with Apple | Required in many iPhone apps; private relay emails | Users can hide their real email |
| Passkeys | Strongest and easiest for users | Needs a fallback for older devices |
| Email and password | People who expect it | Add two-step login for sensitive products |
| Phone SMS code | Markets where phones are the identity | Costs per message and attracts fraud |

## Apple's rule on social login

If your iPhone app uses a third-party or social login (Google, Facebook, X and so on) for the user's main account, Apple expects you to also offer a login that limits data to name and email, lets the user keep their email private, and does not track for ads without consent. **Sign in with Apple** is the simplest way to meet this. Read guideline 4.8 in the App Store Review Guidelines for the exceptions, such as apps that use only your own account system or an organisation's existing login.

## Account deletion is required

If your app lets people create an account, Apple requires an **in-app** way to delete it:

- Easy to find, usually in account settings.
- Deletes the account record and personal data, not just deactivates it.
- Deletes user-generated content unless the law requires you to keep it (and you tell the user).
- If you use Sign in with Apple, you must revoke the user's Apple tokens through Apple's REST API on deletion.
- If the user has an Apple subscription, tell them billing continues until they cancel it with Apple.

Build deletion into your data model early. It must reach every table, file and third-party service that holds the user's data.

## Security essentials

- [ ] Every API route checks who the user is **and** whether they are allowed to see that specific record.
- [ ] Database rules (such as Supabase Row Level Security) are switched on for every table, with policies tested by trying to read another user's data.
- [ ] Login, sign-up and password reset are rate-limited.
- [ ] Session cookies are `Secure`, `HttpOnly` and `SameSite`.
- [ ] Admin access uses a separate role and two-step login, never a shared password.
- [ ] Users can see where they are signed in and sign out of all devices.
- [ ] There is an in-app account deletion flow that removes data everywhere.

More in the [security checklist](/ship/security-checklist/).
