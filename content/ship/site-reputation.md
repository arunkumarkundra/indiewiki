---
title: Get a new site unblocked by security filters
description: Why office firewalls and antivirus tools block brand-new domains, how to find out who is blocking you, and how to request a review with each vendor.
type: guide
updated: 2026-10-16
order: 8
nav_title: Site reputation and unblocking
time: 1 hour of submissions, then a few days of waiting
tags: [site reputation, blocked, firewall, antivirus, safe browsing, smartscreen, mcafee, norton, palo alto, zscaler, virustotal, newly registered domain]
faq:
  - q: Why is my brand-new site blocked at work?
    a: Corporate firewalls and security tools often block or warn about domains registered in the last few weeks, because many phishing sites are new. Others have simply not categorised your site yet. It is usually not about anything you did.
  - q: How long does a review take?
    a: From a few hours to a couple of weeks, depending on the vendor. Some also lift the "newly registered domain" label automatically after about a month.
  - q: Google Chrome shows a red "Dangerous site" warning. What do I do?
    a: That is Google Safe Browsing. Check the Security issues report in Google Search Console, remove whatever was flagged (often a compromised file, a malicious ad, or a link to a bad download), then request a review in Search Console.
related: [/ship/google-search-console/, /ship/security-checklist/, /tools/security-tools/]
---

Your site works for you, but a customer says their office network blocks it, or their antivirus warns them off. This is common for new domains and is usually fixable in an afternoon of form-filling.

## Why it happens

- **Newly registered domain.** Several security vendors put every domain younger than about a month into a "new domain" category that many companies block by default.
- **Uncategorised.** Corporate filters allow or block by category (Business, Technology, Gambling and so on). An unknown site may be blocked until it is categorised.
- **Actually flagged.** Your site, or something on it, was reported as phishing or malware. This needs fixing, not just a review.

## Step 1: find out who is blocking you

::: steps
1. **Check Google Safe Browsing.** Look up your domain on [[tool:safe-browsing-status]]. If it is flagged, go straight to Search Console's **Security issues** report.
2. **Check many vendors at once.** Paste your URL into [[tool:virustotal]]. It shows which security vendors flag it, and what as.
3. **Ask the person who is blocked** for the exact message or a screenshot. It usually names the product (for example "Blocked by Zscaler" or a McAfee page) and the category.
:::

## Step 2: make sure there is nothing real to fix

Before asking anyone to unblock you, confirm:

- [ ] The site uses HTTPS everywhere with a valid certificate.
- [ ] There is a clear About page saying who runs the site, a privacy policy, terms and a contact method.
- [ ] Nothing asks for passwords, cards or personal data on a page that looks like another brand.
- [ ] There are no downloads of executable files, and no links to known bad sites.
- [ ] The site is verified in [Google Search Console](/ship/google-search-console/) and shows no security issues.

## Step 3: request reviews

Use each vendor's own review page. Ask for the category that honestly describes your site (for example "Technology/Internet", "Business" or "Education"), and describe it in one or two plain sentences: what it is, who it is for, that it is legitimate.

| Vendor | Where to request a review |
| --- | --- |
| Google Safe Browsing | Google Search Console, Security issues report |
| McAfee | [sitelookup.mcafee.com](https://sitelookup.mcafee.com/) (check and suggest a category) |
| Norton (Gen Digital) | [safeweb.norton.com](https://safeweb.norton.com/) |
| Palo Alto Networks | [urlfiltering.paloaltonetworks.com](https://urlfiltering.paloaltonetworks.com/) |
| Zscaler | [sitereview.zscaler.com](https://sitereview.zscaler.com/) |
| Microsoft Defender SmartScreen | Microsoft's "report a site" feedback form for SmartScreen (search for it from Edge's warning page) |
| Others shown in VirusTotal | Each vendor's own false-positive form, usually linked from VirusTotal |

A short, honest message works best, for example:

> Our site is a free online tool that helps people compare options and make decisions. It is a legitimate service with no downloads and no login. It was registered recently. Please review its category; "Technology/Internet" fits best. Contact: [your email on the domain].

::: tip Keep a log
Record the date, vendor, ticket number and result for each request in a simple table. Some vendors reply by email days later, and you will want to know what you asked for.
:::

## Step 4: prevent it next time

- Register the domain a few weeks before launch and put a simple, honest page on it straight away.
- Set up email on the domain with SPF, DKIM and DMARC so it looks like a real organisation.
- Avoid URL shorteners and free subdomains for your main product links.
- Keep third-party scripts to a minimum; a compromised ad or widget is a common cause of flags.
