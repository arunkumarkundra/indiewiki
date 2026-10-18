---
title: Website essentials checklist
description: Every basic a product website or web app needs, from favicon, titles and sharing images to responsive layout, clean links, sitemap, manifest and security headers.
type: checklist
updated: 2026-10-18
order: 1
nav_title: Website essentials
time: 2 to 3 hours
tags: [favicon, og image, open graph, twitter card, share, responsive, "404", robots.txt, sitemap, manifest, pwa, security headers, security.txt, llms.txt, canonical, clean urls, footer, basics]
faq:
  - q: What size should my sharing image be?
    a: 1200 by 630 pixels, as PNG or JPG, ideally well under 1 MB. Keep important text away from the edges because some apps crop it. Make it about the page being shared (its title, what it is), not only your logo.
  - q: Why does my link preview still show an old image or title?
    a: WhatsApp, LinkedIn, X and Facebook save a copy of each preview the first time a link is shared. After you change it, ask LinkedIn's Post Inspector or Facebook's Sharing Debugger to fetch the page again. Others refresh on their own within days; giving the image a new file name forces a fresh copy.
  - q: Should the manifest be called manifest.json or manifest.webmanifest?
    a: Either works. Browsers read whatever file your `<link rel="manifest">` tag points to. `.webmanifest` is the official extension; `manifest.json` is common too.
  - q: Do I need a web app manifest if I do not have an app?
    a: It is cheap and helps. The manifest gives your site a name, icons and colours when people add it to their home screen, and it is required if you want your site to be installable.
  - q: What is llms.txt?
    a: A plain Markdown file at the root of your site that lists your most important pages with short descriptions, to help AI assistants understand and cite your site. It is a proposed convention, not a standard, and costs ten minutes to add.
sources:
  - title: The Open Graph protocol
    url: https://ogp.me/
  - title: Define a favicon to show in search results (Google Search Central)
    url: https://developers.google.com/search/docs/appearance/favicon-in-search
  - title: Manifest screenshots, including wide and narrow form factors (MDN)
    url: https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Manifest/Reference/screenshots
  - title: llms.txt proposal
    url: https://llmstxt.org/
  - title: security.txt (RFC 9116)
    url: https://securitytxt.org/
  - title: lychee link checker
    url: https://github.com/lycheeverse/lychee
related: [/ship/seo-checklist/, /ship/security-headers/, /ship/accessibility-checklist/]
---

These are the details people notice without knowing why: the icon in their browser tab, the preview card when someone shares your link, a menu that works on their phone, the page they land on after a typo. Each takes minutes. Together they make a site look finished and trustworthy.

::: tip Build them into your template, not into each page
Titles, descriptions, canonical links, sharing tags and images, the footer and the share button should come from your page layout, so every new page gets them automatically. Then add a test that fails the build when a page is missing one. That is how IndieWiki does it.
:::

## Identity

- [ ] A logo that still reads at 16 pixels (browser tab) and looks sharp at 512 pixels (home screen).
- [ ] An SVG favicon, a `favicon.ico` at the root of the site (16, 32 and 48 pixels inside) for older browsers and tools, and a 180-pixel Apple touch icon. [[tool:realfavicongenerator]] creates every size.
- [ ] The favicon is square and larger than 48 by 48 pixels, which Google recommends for showing it next to your search results.
- [ ] A clear title on every page, in the form "Page topic | Product name", under about 60 characters.
- [ ] A one-line tagline and a one-paragraph description, used the same way on the site, app stores and social profiles. The home page title includes the tagline.
- [ ] Clicking the logo or product name goes to the home page.

## Search basics

- [ ] One `<h1>` per page, describing that page.
- [ ] A unique meta description of 50 to 160 characters on every page.
- [ ] A canonical link on every page: the full `https://` address of the page itself, exactly as it appears in your sitemap.
- [ ] `robots.txt` at the root that allows crawling and lists your sitemap. Block only utility pages such as internal search results.
- [ ] Nothing secret listed in `robots.txt`. Anyone can read it, so it is a map for attackers. Protect admin and account pages with a login and a `noindex` tag instead.
- [ ] `sitemap.xml` lists only public pages you want found: no 404 page, search results, login, account, admin, thank-you, staging or redirected pages.
- [ ] No `noindex` tag left over from development on pages that should be found, and a `noindex` tag on pages that should not.
- [ ] The sitemap is submitted in [Google Search Console](/ship/google-search-console/).
- [ ] Breadcrumbs on pages deeper than one level, with BreadcrumbList structured data.

## Sharing previews

- [ ] Open Graph tags on every page: `og:title`, `og:description`, `og:image`, `og:url`, `og:type` and `og:site_name`.
- [ ] A 1200 by 630 pixel sharing image for every page, about that page: its title and what kind of page it is, not just your logo. Generate them from a template when you build the site, or make a set in your design tool.
- [ ] The image address is a full `https://` link, with `og:image:width`, `og:image:height` and `og:image:alt` set.
- [ ] `twitter:card` set to `summary_large_image`, plus `twitter:title`, `twitter:description` and `twitter:image`, so X shows the large preview.
- [ ] Previews checked by pasting a link into a private chat in WhatsApp or Slack, and into LinkedIn's Post Inspector.

## Share button and phones

- [ ] A share button on content pages. On phones it opens the phone's own share sheet (the Web Share API); on computers it copies the link.
- [ ] The shared link is the clean page address, without tracking codes or `#section` parts the reader did not choose.
- [ ] `<meta name="viewport" content="width=device-width, initial-scale=1">` on every page.
- [ ] Every page checked at 360 pixels wide (a small phone), a tablet and a laptop: no sideways scrolling, no text cut off, images shrink to fit.
- [ ] The phone menu fits the screen and scrolls. Long menus fold into sections, with only one section open at a time.
- [ ] Buttons and links are easy to tap: about 44 by 44 pixels is comfortable, and 24 by 24 pixels is the accessibility minimum.
- [ ] Body text is at least 16 pixels on phones, so browsers do not zoom in on forms.
- [ ] A `theme-color` meta tag, so the phone's address bar matches your site.

## Clean links

- [ ] Page addresses are short, lowercase and hyphenated, such as `/pricing/` or `/blog/launch-day/`, and use one style throughout (all with a trailing slash, or all without).
- [ ] No `.html` or `index.html` in links between your own pages, and every old address redirects to its new one.
- [ ] Tracking codes removed from links you paste into your site: `utm_source` and other `utm_` parts, `fbclid`, `gclid`, `srsltid` and similar. The ClearURLs browser extension strips them as you browse.
- [ ] No placeholder links (`href="#"`), and every outside link uses `https://`.
- [ ] Links between your own pages checked on every build, and links to other sites checked every month with a link checker such as lychee, because sources move and pricing pages change.

## Useful extras

- [ ] A custom 404 page with search and links to main sections, marked `noindex`, that returns a real 404 status (GitHub Pages, Netlify and Cloudflare Pages do this for a `404.html` file).
- [ ] `/llms.txt` with your key pages and one-line descriptions for AI assistants.
- [ ] `/.well-known/security.txt` with a contact for security reports and an expiry date within a year.
- [ ] A web app manifest, linked from every page, with name, short name, start address, colours and icons (192 and 512 pixels, plus a maskable icon).
- [ ] Two screenshots in the manifest: one marked `"form_factor": "wide"` for computers and one marked `"narrow"` for phones, each with a `label`. Chrome shows them in its install window.
- [ ] Images in WebP or AVIF, sized for how they are shown, with `width` and `height` set to prevent layout jumps. [[tool:squoosh]] converts them.
- [ ] Every meaningful image has alt text; decorative images have empty alt text.

## Trust and legal

- [ ] A footer on every page with the copyright line and your company name linked to its website, plus links to the privacy policy, terms and contact page.
- [ ] Your contact email shown as text people can read and copy, but written into the page by JavaScript (or behind a contact form) so simple scrapers cannot harvest it.
- [ ] A privacy policy and terms page that match what the site really does. See [Privacy, terms and the law](/ship/privacy-and-legal/).
- [ ] An About page that says who is behind the product. Real names and faces build trust.

## Safety and speed

- [ ] HTTPS everywhere, with HTTP redirecting to HTTPS (on GitHub Pages, tick **Enforce HTTPS**).
- [ ] Security headers sent by your host: `Content-Security-Policy`, `Strict-Transport-Security`, `X-Content-Type-Options: nosniff`, `Referrer-Policy`, `Permissions-Policy`, and protection against your site being framed by others.
- [ ] If your host cannot send headers (GitHub Pages cannot), the Content-Security-Policy and referrer policy are set with `<meta>` tags, and the rest are added later through a service such as Cloudflare. See [Security headers on static hosting](/ship/security-headers/).
- [ ] Pages load in under about 2 seconds on a mid-range phone. Check with [[tool:pagespeed-insights]].

::: tip This wiki follows its own list
View the source of any IndieWiki page, or open [llms.txt](/llms.txt), [robots.txt](/robots.txt), [sitemap.xml](/sitemap.xml), [the manifest](/manifest.webmanifest) and [security.txt](/.well-known/security.txt), to see working examples you can copy. Share any page to see its own preview image.
:::
