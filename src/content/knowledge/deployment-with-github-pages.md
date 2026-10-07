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
related: [ship]
featured: false
seedSources: []
sources:
  - title: "Deploy your Astro site to GitHub Pages"
    url: https://docs.astro.build/en/guides/deploy/github/
    publisher: "Astro"
    accessed: 2026-10-07
---

## Keep publication reproducible

Build the site from committed Markdown and a locked dependency graph. The workflow should install dependencies from the lockfile, validate content and internal links, generate static pages and the search index, then upload a Pages artifact for deployment. A failed check should stop publication.

Use a supported Node release, pin third-party Actions to trusted versions, and review workflow changes like application code. Keep deployment credentials scoped to the job permissions it needs. Preview pull requests before merging when the repository enables that flow.

## Configure the domain

Enable GitHub Pages with the Actions publishing source. Add the intended custom domain in repository Pages settings, then configure the DNS records at the domain provider and wait for propagation and TLS provisioning. The committed CNAME file records the desired hostname; it does not create DNS records or guarantee the repository setting is configured.

Check the deployment URL, canonical tags, sitemap hostname, search index, redirects, and 404 behavior after the first deployment. The [Astro GitHub Pages guide](https://docs.astro.build/en/guides/deploy/github/) documents the framework workflow; confirm current GitHub settings in the repository.
