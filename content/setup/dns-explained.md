---
title: DNS explained for founders
description: What A, CNAME, MX and TXT records do, how to point your domain at GitHub Pages or Cloudflare, and how to fix the most common DNS mistakes.
type: reference
updated: 2026-10-16
order: 2
time: 10 min read
tags: [dns, a record, cname, mx, txt, nameservers, ttl, github pages]
faq:
  - q: How long do DNS changes take?
    a: Most changes show up within minutes to an hour. Changing nameservers can take up to a day or two. The TTL value on a record tells other servers how long they may cache the old answer.
  - q: Can I have a CNAME on my root domain?
    a: Not in standard DNS, because the root also holds MX and other records. Use A records for the root, or a DNS provider that offers CNAME flattening or an ALIAS record, such as Cloudflare.
  - q: Why does my site work with www but not without it?
    a: You probably set up only one of the two. Add the A records for the root domain and a CNAME for www, then choose one as the main address and redirect the other.
related: [/setup/choose-a-domain/, /setup/custom-domain-email/, /build/hosting/]
---

DNS is the internet's address book. When someone types your domain, DNS answers with where to find your website. When someone emails you, DNS answers with which server accepts your mail. You manage it as a short list of **records** in your registrar's or DNS provider's dashboard.

## The records you will actually use

| Record | What it does | Example |
| --- | --- | --- |
| **A** | Points a name at an IPv4 address | `@` → `185.199.108.153` |
| **AAAA** | Same, for an IPv6 address | `@` → `2606:50c0:8000::153` |
| **CNAME** | Points a name at another name | `www` → `yourname.github.io` |
| **MX** | Says which servers receive email for the domain | `@` → `mx.zoho.in`, priority 10 |
| **TXT** | Holds text: proof of ownership, email security rules | `@` → `v=spf1 include:... ~all` |
| **NS** | Says which company answers DNS for the domain | `ns1.cloudflare.com` |

Two symbols you will see a lot:

- `@` means the root domain itself (`example.com`).
- A name like `www` or `app` means that subdomain (`www.example.com`).

**TTL** (time to live) is how many seconds other servers may remember an answer. Leave it on "Auto" or a few minutes while you are setting things up.

## Nameservers: who is in charge

Your registrar asks one question first: **which nameservers answer for this domain?** If you keep the registrar's default nameservers, you edit records at the registrar. If you switch nameservers to [[tool:cloudflare-dns]], you edit records in Cloudflare instead, and changes at the registrar are ignored. Most "my DNS change did nothing" problems come from editing records in the wrong place.

## Point a domain at GitHub Pages

GitHub publishes these addresses in its documentation; check them there before you copy, as they can change.

::: steps
1. **Root domain:** add four **A** records for `@`: `185.199.108.153`, `185.199.109.153`, `185.199.110.153` and `185.199.111.153`.
2. **www:** add a **CNAME** for `www` pointing to `your-github-username.github.io` (your username, not the repository name).
3. **Subdomain instead** (for example `docs.example.com`): add only a **CNAME** for `docs` pointing to `your-github-username.github.io`.
4. In the repository, open **Settings → Pages**, type the custom domain, save, and tick **Enforce HTTPS** once it becomes available. The certificate can take up to an hour.
5. Remove any old URL-redirect or parking records for the same names; they conflict with the new ones.
:::

::: tip Verify your domain with GitHub
In your GitHub account settings under **Pages**, you can verify a domain with a TXT record. This stops anyone else from claiming a subdomain of yours on GitHub Pages if you ever unpublish your site.
:::

## Email records: SPF, DKIM, DMARC

If you send any email from your domain (your inbox, your app's password resets, your newsletter), three TXT records decide whether it lands in the inbox or in spam:

- [[term:spf]] lists the services allowed to send as your domain. Only one SPF record is allowed per domain; combine services in it.
- [[term:dkim]] is a signature your email service adds; you publish its public key as a TXT or CNAME record.
- [[term:dmarc]] tells receivers what to do when SPF or DKIM fails, and where to send reports. Start with `v=DMARC1; p=none; rua=mailto:you@example.com` and tighten to `quarantine` after a few weeks of clean reports.

Your email provider gives you the exact values. See [Email on your custom domain](/setup/custom-domain-email/).

## Fixing common problems

- **"Domain does not resolve."** Check the nameservers first. Then check there is exactly one A record set for the root and no leftover parking record.
- **Two SPF records.** Merge them into one: `v=spf1 include:first.example include:second.example ~all`.
- **Verification keeps failing on Cloudflare.** Set the record to **DNS only** (grey cloud) while the other service verifies it.
- **Changes do not show for you but do for others.** Your computer or router cached the old answer. Wait for the TTL, or check with an online DNS lookup tool from another network.
