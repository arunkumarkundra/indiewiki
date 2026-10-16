---
title: Choose a stack you can maintain
description: Proven tool combinations for the most common indie products, with what each costs at the start and the questions that decide which one fits you.
type: guide
updated: 2026-10-16
order: 1
time: 11 min read
nav_title: Choose your stack
tags: [tech stack, architecture, supabase, cloudflare, expo, nextjs, static site, saas, recipes]
faq:
  - q: What is the best tech stack for a solo founder?
    a: The one you can debug alone. For most web products that means a static or server-rendered frontend on Cloudflare Pages, Supabase for data and login, Resend for email, and Stripe or a merchant of record for payments. It costs nothing until you have real usage.
  - q: Should I pick the stack the AI suggests?
    a: Only if it matches your product and you understand the main parts. AI tools default to popular stacks, which is often fine, but ask them to justify each part and to name the free-plan limits and the commercial-use rules.
related: [/build/hosting/, /build/auth-and-accounts/, /start/building-with-ai/, /run/cost-control/]
---

A stack is the set of services your product runs on: where the pages are hosted, where data lives, how people log in, how email goes out, how money comes in. There is no single best stack. There is a stack that fits your product, your skills and your budget.

## Four questions decide most of it

1. **Does it need to be found on Google?** Landing pages, blogs, directories and marketplaces do. Dashboards behind a login do not. Search needs pages that arrive as real HTML, either static or rendered on a server.
2. **Do users log in and save data?** If yes, you need a database and an auth provider. If no, a static site may be all you need.
3. **Where will people use it?** Browser only, or the iPhone and Android stores too? Stores add yearly fees, review time and native requirements.
4. **Will it sell something?** If yes, avoid hosting whose free plan forbids commercial use, and plan how you will handle tax.

## Recipes that work

Each recipe starts at or near zero cost. The links go to Toolbox entries with free-plan limits.

| You are building | Stack | Starts at |
| --- | --- | --- |
| Landing page, docs or free tool | Static HTML or a static site generator on [[tool:cloudflare-pages]]; [[tool:github-pages]] only if non-commercial | Free |
| SaaS web app | Frontend on Cloudflare Pages + [[tool:supabase]] (database, login, storage) + [[tool:resend]] + [[tool:paddle]] or [[tool:stripe]] | Free until you need Supabase Pro |
| Mobile app (iOS and Android) | [[tool:expo]] + Supabase + [[tool:revenuecat]] for in-app subscriptions | Store fees, then free tiers |
| AI wrapper or AI feature | Web frontend + [[tool:cloudflare-workers]] to call the model from the server + [[tool:openrouter]] or one provider's API | Pay per AI use; set caps |
| Browser game | [[tool:threejs]] or [[tool:phaser]] on Cloudflare Pages + Supabase for accounts and leaderboards | Free |
| Downloadable game | [[tool:godot]] or [[tool:unity]], distributed on itch.io or Steam | Store fees where they apply |
| Content site or newsletter | A static site generator + [[tool:buttondown]] or [[tool:kit]] | Free |

## Principles that save you later

- **Boring beats clever.** Pick tools with large communities and good documentation. When you are stuck at midnight, someone will have hit the same error.
- **Fewer vendors, fewer bills.** Every extra service is another login to secure, another invoice, and another thing that can change its pricing.
- **Portable data.** Prefer standard databases such as Postgres or SQLite. Exporting your data and moving should be possible in a weekend.
- **Hard limits over surprise bills.** Choose plans and settings that stop at a limit instead of charging more. Turn on spend caps everywhere. See [Cost control](/run/cost-control/).
- **Server for secrets.** Anything secret (API keys, prices, permission checks) belongs on a server or in database rules, never in browser code.

## If you are not a programmer

Pick a recipe above and tell your AI tool to use it, with the reasons. AI app builders often choose their own defaults; ask them to explain every service they add and whether its free plan allows commercial use. Keep the brief and the stack decisions in a document in your repository, as described in [Building with AI coding tools](/start/building-with-ai/).

## When to change stacks

Do not change because a new tool is fashionable. Change when the current one blocks a real need: a hard limit you keep hitting, a cost that grows faster than revenue, a missing feature customers ask for. Even then, move one piece at a time.
