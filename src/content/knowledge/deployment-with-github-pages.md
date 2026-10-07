---
title: "Deploy a static wiki from GitHub"
description: "A low-operations publishing path that turns reviewed repository changes into static pages and a searchable index."
slug: deployment-with-github-pages
category: ship
kind: tool-guide
tags: [deployment, GitHub Pages, static sites]
audience: [independent builders, solo founders, small teams]
status: published
evidence: multiple-sources
confidence: moderate
lastVerified: 2026-10-07
reviewBy: 2027-01-07
reviewTrigger: "Recheck after upstream documentation, security advisories, pricing, supported versions, or relevant platform policies change."
related: [ship]
featured: false
seedSources: []
sources:
  - title: "Deploy your Astro site to GitHub Pages"
    url: https://docs.astro.build/en/guides/deploy/github/
    publisher: "Astro"
    accessed: 2026-10-07
  - title: "Configuring a publishing source"
    url: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site
    publisher: "GitHub Docs"
    accessed: 2026-10-07
---

## Understand what the deployment workflow does

For a static site, a deployment workflow should check out the repository, install exact dependencies from its lockfile, build the site, validate the generated files, upload one Pages artifact, and deploy that artifact. If build or validation fails, deployment should stop. Keep publishing from reviewed commits on the default branch and give the workflow only the permissions it needs.

For Astro, confirm that `site` is the production origin and that the generated output includes an `index.html` at its root. Use the current [Astro GitHub Pages guide](https://docs.astro.build/en/guides/deploy/github/) and [GitHub Pages custom workflow guidance](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-actions) when the workflow or framework changes.

## Configure Pages and a custom subdomain

In repository **Settings → Pages**, choose **GitHub Actions** as the publishing source. For a subdomain such as `docs.example.com`, add it under **Custom domain** and create a DNS CNAME at the DNS provider pointing the subdomain to the account’s `username.github.io` host (not to the repository path). DNS and certificate provisioning can take time. Enable HTTPS only once GitHub makes it available. GitHub’s [custom-domain instructions](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-your-custom-domain-for-your-github-pages-site) describe the exact requirements. A `CNAME` file does not create the DNS record, and for an Actions workflow the file is not required.

## Diagnose a failed run by stage

- **Install fails:** inspect Node/pnpm versions, lockfile consistency, and cache configuration.
- **Build fails:** open the first actual error, reproduce with the documented local build, then fix the content or code that caused it.
- **Validation fails:** correct the reported missing page, link, metadata, sitemap, or asset.
- **Artifact upload succeeds but deploy returns 404:** Pages may not have been enabled for Actions. Check Settings → Pages. The artifact can be valid even when publishing is not configured.
- **Deploy reports multiple `github-pages` artifacts:** a failed workflow was rerun and produced duplicate same-name artifacts in that run. Start a fresh run using **Run workflow** (if `workflow_dispatch` is configured) or a new commit; do not keep rerunning only the failed job in that old run.
- **Deploy succeeds but domain is unavailable:** check DNS, custom-domain spelling, HTTPS certificate status, and whether the browser is using the intended hostname.

## Verify the actual published site

Open the deployed URL and representative article URLs. Check HTTPS, canonical host, a deep link, 404 behavior, search, sitemap, robots, RSS, and mobile layout. Compare built content with the committed Markdown. Confirm the workflow run references the commit you expect and has exactly one Pages artifact. Keep a known-good commit available so a bad publication can be rolled back.
