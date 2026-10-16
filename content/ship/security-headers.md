---
title: Security headers on static hosting
description: Which security headers matter, which ones actually work as HTML meta tags, and how to add the rest on GitHub Pages, Cloudflare Pages and Netlify.
type: guide
updated: 2026-10-16
order: 5
nav_title: Security headers
time: 10 min read
tags: [security headers, content security policy, csp, hsts, x-frame-options, referrer policy, github pages, cloudflare, netlify, meta tags]
faq:
  - q: Does X-Frame-Options work as a meta tag?
    a: No. Browsers ignore X-Frame-Options, X-Content-Type-Options, HSTS and Permissions-Policy when they are written as meta tags. Only real HTTP headers count. Content-Security-Policy and Referrer-Policy are the useful ones that do work in a meta tag.
  - q: How do I stop my site being shown inside another site's frame on GitHub Pages?
    a: You cannot fully do it with GitHub Pages alone, because frame-ancestors in CSP and X-Frame-Options only work as headers. Put Cloudflare in front of the site and add the header with a Transform Rule, or move to a host that supports custom headers.
sources:
  - title: "MDN: Content Security Policy guide"
    url: https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CSP
  - title: MDN HTTP Observatory
    url: https://developer.mozilla.org/en-US/observatory
related: [/ship/security-checklist/, /build/hosting/, /ship/website-essentials/]
---

Security headers are instructions your server sends with each page, telling the browser what the page is allowed to do. They stop whole classes of attacks: injected scripts, clickjacking, leaking full URLs to other sites. Many checklists tell you to "add them as meta tags". Most of them do not work that way.

## What works where

| Header | What it does | As a `<meta>` tag | Needs a real header |
| --- | --- | --- | --- |
| Content-Security-Policy | Limits where scripts, styles, images and connections can come from | Works, except `frame-ancestors`, `report-uri` and `sandbox` | For those three parts |
| Referrer-Policy | Controls how much of your URL other sites see | Works (`<meta name="referrer">`) | No |
| Strict-Transport-Security (HSTS) | Forces HTTPS on future visits | Ignored | Yes |
| X-Content-Type-Options | Stops browsers guessing file types | Ignored | Yes |
| X-Frame-Options / `frame-ancestors` | Stops your site being framed by others | Ignored | Yes |
| Permissions-Policy | Turns off camera, microphone, location and similar | Ignored | Yes |

So writing `<meta http-equiv="X-Frame-Options" content="DENY">` gives a false sense of security. Use meta tags for CSP and referrer policy, and real headers for the rest.

## A strict Content-Security-Policy

The strongest policy only allows files from your own site. This works if you avoid inline `<script>` code and `style=""` attributes, and host fonts yourself:

```html
<meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; font-src 'self'; connect-src 'self'; base-uri 'self'; form-action 'self'; object-src 'none'; upgrade-insecure-requests">
<meta name="referrer" content="strict-origin-when-cross-origin">
```

If you load analytics or a CDN, add only those exact domains to the matching directive, for example `script-src 'self' https://cdn.jsdelivr.net`. Avoid `'unsafe-inline'` for scripts; it removes most of the protection. This wiki uses the policy above.

::: tip Test before you tighten
Open your site with the browser's developer console visible. CSP violations appear there in red, naming exactly what was blocked. Fix or allow each one, then reload.
:::

## Adding real headers by host

**[[tool:github-pages]]** cannot set custom headers. You get HTTPS automatically, and you can use the meta tags above. For the rest, put [[tool:cloudflare-dns]] in front:

::: steps
1. **Move your nameservers to Cloudflare** and keep your GitHub Pages DNS records, with the proxy (orange cloud) on.
2. **Set SSL/TLS mode to Full** so Cloudflare talks to GitHub over HTTPS.
3. **Add a response header Transform Rule** for all requests with: `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `Permissions-Policy: camera=(), microphone=(), geolocation=()`, and `Strict-Transport-Security: max-age=31536000`.
4. **Check the result** with [[tool:mdn-observatory]].
:::

**[[tool:cloudflare-pages]]** and **[[tool:netlify]]** read a plain `_headers` file in your published folder:

```text
/*
  X-Content-Type-Options: nosniff
  X-Frame-Options: DENY
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=()
  Strict-Transport-Security: max-age=31536000
```

**[[tool:vercel]]** uses a `headers` section in `vercel.json`.

::: warning Be careful with HSTS
Once browsers see HSTS they refuse plain HTTP for your domain for the whole `max-age`. Start with a short value such as one day (`max-age=86400`), confirm everything works over HTTPS, including subdomains if you add `includeSubDomains`, then raise it to a year.
:::
