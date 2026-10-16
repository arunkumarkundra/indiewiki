---
title: Choose and register a domain
description: How to pick a domain name that works, which extension to choose, where to register it, and the renewal and privacy traps to avoid.
type: guide
updated: 2026-10-16
order: 1
time: 9 min read
tags: [domain, registrar, tld, whois, naming, dot com, dot in]
faq:
  - q: Do I need a .com?
    a: Not always. A .com is still the default people type, so get it if you can at a fair price. Country domains like .in or .co.uk are good for local businesses, and .app, .dev or .io are common for software. Avoid an extension your customers would not recognise.
  - q: Should I buy the domain before I validate the idea?
    a: Only if it is cheap. A domain costs little, but a good name can wait a week while you talk to users. Do not spend a premium price on a name for an idea you have not tested.
  - q: Why is my renewal price so much higher than what I paid?
    a: Many registrars sell the first year at a discount and charge full price on renewal. Always compare the renewal price, and consider moving to an at-cost registrar such as Cloudflare Registrar after the first year.
related: [/setup/dns-explained/, /setup/custom-domain-email/, /build/hosting/]
---

Your domain is the one piece of your product that every other piece depends on: your website, your email, your app's login links, your Google Search Console account. Choose it with some care, and above all make sure **you** own it.

## Pick a name that survives being said out loud

Test every candidate by saying it to a friend once and asking them to type it. Good names:

- Are short and easy to spell after hearing them once.
- Avoid hyphens and numbers, which people forget or mistype.
- Do not lock you into one feature if you might grow ("pdfcompress" is hard to grow out of).
- Are not a trademark of someone else. Search the name plus "trademark", and check your country's trademark register before you print anything.

Check that the matching handle is free on the social sites you will use, and search the name to make sure it is not already a known product in your space.

## Choose the extension

| Extension | Good for | Watch for |
| --- | --- | --- |
| `.com` | Any product with a global audience | Good short names are taken; premium names cost a lot |
| Country code: `.in`, `.co.uk`, `.de` | Businesses serving one country | Some have residency rules; check before you buy |
| `.app`, `.dev` | Software products | Browsers force HTTPS on these, which is fine on any modern host |
| `.io`, `.ai`, `.co` | Tech startups | Usually more expensive to renew than `.com` |

If your ideal `.com` is taken, try adding a short verb ("get", "use", "try") or a word about the category ("app", "hq") before paying a premium.

## Choose the registrar

The registrar is the company you rent the domain from. They differ mostly in **renewal price**, **free extras** and **how easy the DNS screen is**. Compare them in the Toolbox: [Domains and DNS](/tools/domains/).

- [[tool:cloudflare-registrar]] sells at cost with no renewal markup, but requires Cloudflare DNS and does not support every extension.
- [[tool:porkbun]] has low, openly published renewals and free privacy and email forwarding.
- [[tool:namecheap]] is well known with a wide range of extensions; compare its renewal prices.

::: india If you are in India
For a `.in` domain, buy from a registrar accredited for `.in` (most large ones are). Keep the invoice: you will need it for GST records if you are registered. Pay with a card that allows international transactions if the registrar bills in US dollars.
:::

## Register it safely

::: steps
1. **Use an email address you will always control.** Use a personal address that does not depend on this domain. If the domain lapses and your account email was on that domain, you cannot receive the reminder.
2. **Turn on two-step login** on the registrar account before anything else.
3. **Turn on WHOIS privacy** (sometimes called domain privacy or redaction). It hides your home address and phone from public lookup. It is free at good registrars.
4. **Turn on auto-renew** and keep a valid card on file. Losing a domain to an expired card is common and painful.
5. **Buy for more than one year** if the price is fair. It removes one thing that can go wrong.
6. **Lock the domain** (transfer lock). It stops anyone moving it to another registrar without you.
7. **Save the login in your password manager**, along with the registrar's support contact.
:::

::: warning Register it in your name, not your developer's
If a freelancer or agency registers the domain, it belongs to them on paper. Register it yourself (or in your company's name) and give others access through DNS settings, not ownership. See [Accounts and ownership](/setup/accounts-and-ownership/).
:::

## After you buy

- Point DNS where your site and email will live. If you are unsure what A, CNAME and MX records are, read [DNS explained](/setup/dns-explained/).
- Set up email on the domain: [Email on your custom domain](/setup/custom-domain-email/).
- Consider buying obvious misspellings or the other main extension only if your brand is already valuable. For a new idea, one domain is enough.
