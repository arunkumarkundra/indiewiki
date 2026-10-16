---
title: Website essentials checklist
description: The small files and tags every product website needs, from favicons and sharing previews to robots.txt, sitemap, security.txt, llms.txt and a useful 404.
type: checklist
updated: 2026-10-16
order: 1
nav_title: Website essentials
time: 1 to 2 hours
tags: [favicon, og image, open graph, "404", robots.txt, sitemap, manifest, pwa, security.txt, llms.txt, canonical, footer]
faq:
  - q: What size should my sharing image be?
    a: 1200 by 630 pixels, as PNG or JPG, under about 1 MB. Keep important text away from the edges because some apps crop it.
  - q: Do I need a web app manifest if I do not have an app?
    a: It is cheap and helps. The manifest gives your site a name, icons and colours when people add it to their home screen, and it is required if you want your site to be installable.
  - q: What is llms.txt?
    a: A plain Markdown file at the root of your site that lists your most important pages with short descriptions, to help AI assistants understand and cite your site. It is a proposed convention, not a standard, and costs ten minutes to add.
sources:
  - title: llms.txt proposal
    url: https://llmstxt.org/
  - title: security.txt (RFC 9116)
    url: https://securitytxt.org/
  - title: The Open Graph protocol
    url: https://ogp.me/
related: [/ship/seo-checklist/, /ship/security-headers/, /ship/accessibility-checklist/]
---

These are the details people notice without knowing why: the icon in their browser tab, the preview card when someone shares your link, the page they land on after a typo. Each takes minutes. Together they make a site look finished and trustworthy.

## Identity

- [ ] A logo that works at 16 pixels (browser tab) and 512 pixels (home screen).
- [ ] An SVG favicon, plus a 32-pixel PNG fallback and a 180-pixel Apple touch icon. [[tool:realfavicongenerator]] creates every size.
- [ ] A clear page title on every page, in the form "Page topic | Product name".
- [ ] A one-line tagline and a one-paragraph description, used consistently on the site, app stores and social profiles.
- [ ] Clicking the logo or product name goes to the home page.

## Sharing previews

- [ ] Open Graph tags on every page: `og:title`, `og:description`, `og:image`, `og:url`, `og:type`.
- [ ] A 1200 by 630 pixel sharing image with your name and tagline, readable as a small thumbnail.
- [ ] `twitter:card` set to `summary_large_image` so X shows the large preview.
- [ ] Preview checked by pasting a link into a private chat in WhatsApp, Slack or LinkedIn's post inspector.

## Search basics

- [ ] One `<h1>` per page, describing that page.
- [ ] A unique meta description of 50 to 160 characters on every page.
- [ ] A canonical link on every page pointing to its main address.
- [ ] `robots.txt` at the root that allows crawling and lists the sitemap.
- [ ] No `noindex` tag left over from development on pages that should be found.
- [ ] `sitemap.xml` listing every public page, submitted in [Google Search Console](/ship/google-search-console/).
- [ ] Breadcrumbs on pages deeper than one level, with BreadcrumbList structured data.

## Useful extras

- [ ] A custom 404 page with search and links to main sections, not a dead end.
- [ ] `/llms.txt` with your key pages and one-line descriptions for AI assistants.
- [ ] `/.well-known/security.txt` with a contact for security reports and an expiry date within a year.
- [ ] A web app manifest with name, colours, icons (192 and 512 pixels, plus a maskable icon) and screenshots.
- [ ] Images in WebP or AVIF, sized for how they are shown, with `width` and `height` set to prevent layout jumps. [[tool:squoosh]] converts them.
- [ ] Every meaningful image has alt text; decorative images have empty alt text.

## Trust and legal

- [ ] A footer on every page with copyright, privacy policy, terms and a contact link.
- [ ] Your contact email shown in a way that simple scrapers cannot harvest (built with JavaScript, or a contact form).
- [ ] A privacy policy and terms page that match what the site really does. See [Privacy, terms and the law](/ship/privacy-and-legal/).
- [ ] An About page that says who is behind the product. Real names and faces build trust.

## Safety and speed

- [ ] HTTPS everywhere, with HTTP redirecting to HTTPS.
- [ ] Security headers or a Content-Security-Policy where your host allows them. See [Security headers on static hosting](/ship/security-headers/).
- [ ] Clean links: no tracking parameters in your own internal links, and share buttons that copy the clean page address.
- [ ] Pages load in under about 2 seconds on a mid-range phone. Check with [[tool:pagespeed-insights]].

::: tip This wiki follows its own list
View the source of any IndieWiki page, or open [llms.txt](/llms.txt), [robots.txt](/robots.txt) and [security.txt](/.well-known/security.txt), to see working examples you can copy.
:::
