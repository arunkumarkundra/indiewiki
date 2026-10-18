---
title: Privacy, terms and the law
description: What your privacy policy and terms must say, when you need a cookie banner, and the basics of GDPR, India's DPDP Act and children's data, in plain English.
type: guide
updated: 2026-10-18
order: 6
nav_title: Privacy, terms and the law
time: 14 min read
tags: [privacy policy, terms of service, gdpr, dpdp, india, cookies, consent, ccpa, children, legal, data protection]
faq:
  - q: Can I copy another site's privacy policy?
    a: No. It is usually a copyright problem, and worse, it describes their data practices, not yours. A policy that does not match what your product does is itself a legal risk. Use a generator or template as a starting point, then edit it to match your product line by line.
  - q: Do I need a cookie banner?
    a: Only if you use cookies or similar storage that are not strictly necessary, such as advertising, most analytics, or session replays, and you have visitors from places that require consent, such as the EU and UK. Cookie-free analytics and strictly necessary cookies (login, cart, security) do not need a banner.
  - q: When does India's DPDP Act apply to my product?
    a: The Digital Personal Data Protection Act 2023 applies to processing digital personal data in India, and to processing outside India when it is connected to offering goods or services to people in India. The DPDP Rules were notified in November 2025 with obligations phasing in; most substantive duties apply from around May 2027.
sources:
  - title: European Commission data protection overview
    url: https://commission.europa.eu/law/law-topic/data-protection_en
  - title: "DPDP Rules, 2025 notified (Press Information Bureau, Government of India)"
    url: https://static.pib.gov.in/WriteReadData/specificdocs/documents/2025/nov/doc20251117695301.pdf
related: [/ship/website-essentials/, /build/auth-and-accounts/, /run/analytics/]
---

::: note Not legal advice
This page explains common requirements so you know what to ask about. Laws differ by country and change. For anything involving health, finance, children or large amounts of personal data, talk to a lawyer who works with startups.
:::

## The two documents every product needs

**Privacy policy**: what personal data you collect, why, who you share it with, how long you keep it, and how people can see, correct or delete it. App stores, payment providers and ad platforms all require one, and many privacy laws do too.

**Terms of service**: the rules for using your product. What people may and may not do, what you promise and do not promise, payment and refund terms, how either side can end the relationship, and which country's law applies.

Put both at stable addresses such as `/privacy/` and `/terms/`, link them from every page footer and from your sign-up form, and show the date they last changed.

## What your privacy policy should cover

Write it in plain words. A reader should finish it knowing exactly what happens to their data.

- [ ] Who you are and how to contact you about privacy.
- [ ] Every type of personal data you collect: account details, payment details, usage data, device data, content users upload, messages to support.
- [ ] Why you collect each one, and the legal basis if you serve the EU or UK (consent, contract, legitimate interest).
- [ ] Every service that processes data for you: hosting, database, email, analytics, payments, AI providers, support chat.
- [ ] Which countries data is stored or processed in.
- [ ] How long you keep each kind of data, and what happens when an account is deleted.
- [ ] Cookies and similar storage you use, and why.
- [ ] People's rights: access, correction, deletion, withdrawing consent, complaints, and how to use them.
- [ ] How you protect the data, in general terms.
- [ ] Your policy on children's data.
- [ ] The date it was last updated, and how you will tell people about changes.

::: warning The policy must match the code
The most common problem is a policy that says "we do not use tracking" on a site that loads three trackers. Before publishing, list every script, SDK and service your product actually uses, and check each appears in the policy. Repeat whenever you add one.
:::

## Cookie banners

You need consent before setting cookies or similar storage that are not strictly necessary, for visitors in the EU, UK and several other places. In practice:

- **No banner needed**: login sessions, shopping carts, security cookies, saving a user's theme choice, cookie-free analytics such as [[tool:plausible]], [[tool:umami]] or [[tool:cloudflare-web-analytics]].
- **Banner needed**: advertising pixels, [[tool:google-analytics]] in its default setup, session recordings and heatmaps, most third-party chat widgets that track.

A banner must make refusing as easy as accepting and must not load the trackers until someone accepts. The simplest path for a small product is to avoid the trackers that need one.

## GDPR in one minute (EU and UK users)

If people in the EU or UK use your product, GDPR (and the UK GDPR) likely applies, wherever you are based. The essentials for a small product:

- Collect only what you need, and say why.
- Have a lawful basis for each use; for marketing emails that usually means consent.
- Sign data processing agreements with your vendors (most offer one you accept in settings).
- Let people export and delete their data.
- Report serious data breaches to the regulator within 72 hours.

## India: the DPDP Act

The Digital Personal Data Protection Act 2023 and the DPDP Rules notified in November 2025 set India's privacy regime. Duties phase in over 18 months, with most obligations on businesses applying from around May 2027. Key ideas for founders:

- Give a clear notice of what you collect and why, in plain language, before or when you ask for consent.
- Consent must be free, specific and as easy to withdraw as to give.
- Process data of anyone under 18 only with verifiable parental consent, and do not track or target ads at children.
- Keep data secure, and report breaches to the Data Protection Board and to affected people.
- Delete data when its purpose is done, and let people access, correct and erase their data.

::: india If you are in India
Even if most of your customers are abroad, collect consent and handle data in a way that would satisfy both GDPR and DPDP. One careful approach covers both, and it is far easier than retrofitting later.
:::

## Children

If children might use your product, the rules get strict quickly. In the US, COPPA covers children under 13. India's DPDP Act requires parental consent for everyone under 18. App stores have their own rules for kids' apps. If your product is not for children, say so in your terms and do not market to them.

## Terms of service checklist

- [ ] What the product is, and that it is provided "as is" within what the law allows.
- [ ] Account rules: who can sign up, keeping passwords safe, one person per account if that matters.
- [ ] Acceptable use: what is not allowed (abuse, illegal content, reselling, scraping).
- [ ] Payments: prices, billing cycle, taxes, renewals, cancellations and refunds.
- [ ] Who owns content users create, and the licence they give you to host and show it.
- [ ] Limits of liability and how disputes are handled, and which law applies.
- [ ] How you will tell users about changes to the terms.
- [ ] Contact details.

## Practical tips

- Start from a reputable generator or a lawyer's template, never another company's policy.
- Keep your policies in your code repository so changes are tracked with dates.
- Add a short summary at the top of each document in plain words. People appreciate it.
- Review both documents whenever you add a new third-party service, collect a new kind of data, or start selling in a new country.
