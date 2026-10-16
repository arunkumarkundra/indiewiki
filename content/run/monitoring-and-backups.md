---
title: Monitoring and backups checklist
description: Know about outages and errors before customers do, keep backups you have actually restored, and have a plan for the bad day. Sized for a one-person team.
type: checklist
updated: 2026-10-16
order: 2
nav_title: Monitoring and backups
time: 2 hours to set up
tags: [monitoring, uptime, sentry, uptimerobot, backups, restore, disaster recovery, status page, cron, incidents]
faq:
  - q: My database provider does backups. Is that enough?
    a: It is a good start, but check how far back they go on your plan, and test restoring one. Also keep an occasional copy somewhere else you control, so an account problem or a mistaken deletion cannot take everything.
  - q: What is the minimum monitoring for a new product?
    a: An uptime check from outside your network that alerts your phone, and error tracking in both the browser and the server. Both are free at small scale.
sources:
  - title: Sentry pricing (Developer plan)
    url: https://sentry.io/pricing/
  - title: UptimeRobot free plan
    url: https://help.uptimerobot.com/en/articles/11604710-who-should-use-uptimerobot-s-free-plan
related: [/build/production-readiness/, /run/cost-control/, /tools/monitoring/]
---

A backup you have never restored is a hope, not a backup. An alert that never fires might mean everything is fine, or that it is not connected. Set these up once, test them once, and they will save you on the worst day.

Tools are compared in [Monitoring, errors and uptime](/tools/monitoring/).

## Know when it breaks

- [ ] An outside uptime check (for example [[tool:uptimerobot]]) watches the home page and one page that touches the database.
- [ ] Uptime alerts go to your phone, not only email.
- [ ] Error tracking ([[tool:sentry]] or similar) is installed in the frontend and the backend.
- [ ] Errors are grouped, and you get a daily or instant alert for new ones.
- [ ] Personal data is scrubbed from error reports.
- [ ] Scheduled jobs (backups, emails, reports) ping a monitor such as [[tool:healthchecks-io]] so you hear when one stops.
- [ ] Payment webhook failures alert you.
- [ ] Each alert has been triggered once on purpose to confirm it reaches you.

## Backups that restore

- [ ] The database is backed up automatically every day.
- [ ] You know how many days back you can restore on your current plan.
- [ ] A copy of the database is exported to storage you control (such as [[tool:backblaze-b2]] or [[tool:cloudflare-r2]]) on a schedule.
- [ ] User uploads are backed up or stored in a service with versioning.
- [ ] Code and configuration are in a Git repository, so the app can be rebuilt from scratch.
- [ ] A restore has been tested into a separate project, and you wrote down the steps and how long it took.
- [ ] Backups are encrypted, and access to them is limited.

## The bad day plan

- [ ] A one-page runbook explains how to roll back a deploy, restore the database, rotate keys and put up a maintenance message.
- [ ] You know how to reach your hosting and database providers' support quickly.
- [ ] You have a way to tell customers what is happening: a status page, an email list or a pinned social post.
- [ ] After any outage, you write down what happened, why, and one change that prevents it.

## Weekly five-minute check

- [ ] New error types in the error tracker.
- [ ] Uptime over the last week.
- [ ] Storage and database size against plan limits.
- [ ] Any provider emails about deprecations, price changes or security notices.
