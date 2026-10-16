---
title: Security checklist for small apps
description: Thirty-odd checks that stop the common ways small and AI-built apps get breached, from exposed API keys and missing database rules to webhooks and prompt injection.
type: checklist
updated: 2026-10-16
order: 4
nav_title: Security checklist
time: 2 to 3 hours for the first pass
tags: [security, owasp, api keys, secrets, row level security, rls, xss, csrf, cors, rate limiting, vibe coding, webhooks, backups]
faq:
  - q: My app is tiny. Will anyone really attack it?
    a: Automated scanners attack everything, not just big names. They look for exposed keys in public code, open database tables, admin pages without passwords and old vulnerable packages. Small apps are easier targets, not safer ones.
  - q: An API key ended up on GitHub. I deleted the file. Am I safe?
    a: No. The key is still in the repository history and may already have been copied by bots within minutes. Create a new key, delete the old one at the provider, then check the provider's usage logs for anything unexpected.
  - q: Can I ask an AI tool to check my app's security?
    a: Yes, and you should, but treat it as a first pass. Ask it to act as an attacker, go through this checklist item by item, and show you how to verify each fix yourself. Then run the free scanners listed on this page.
sources:
  - title: OWASP Top 10 web application security risks
    url: https://owasp.org/www-project-top-ten/
  - title: MDN web security guides
    url: https://developer.mozilla.org/en-US/docs/Web/Security
related: [/ship/security-headers/, /build/auth-and-accounts/, /build/ai-features/, /build/production-readiness/]
---

Most breaches of small apps are not clever. They are a secret key in browser code, a database table anyone can read, or an admin route that forgot to check who is asking. This list covers those first. Work through it before launch and after any big change.

Scanners that help are listed in [Security and reputation checks](/tools/security-tools/).

## Secrets

- [ ] No secret API keys in frontend code. Anything the browser downloads, a visitor can read. Only publishable or "anon" keys designed to be public belong there.
- [ ] `.env` and other secret files are listed in `.gitignore` before the first commit.
- [ ] Secrets live in your host's environment variables or secret settings.
- [ ] Any key that ever touched a public repository, a chat, a screenshot or a ticket has been rotated.
- [ ] [[tool:github-secret-scanning]] with push protection is on for the repository.

## Database and permissions

- [ ] Row Level Security (or equivalent rules) is on for **every** table, with a policy for each action.
- [ ] Tested: logged in as user A, you cannot read, change or delete user B's records by changing an ID.
- [ ] Every API route checks login **and** ownership, not just the page that calls it.
- [ ] Admin routes and dashboards need a separate role and two-step login.
- [ ] Database queries use parameters; no SQL built by joining strings with user input.
- [ ] Storage buckets are private by default; files are shared with short-lived signed links.

## Inputs and outputs

- [ ] All input is validated on the server: type, length, format, allowed values.
- [ ] User content is escaped before it is shown, so pasted HTML or scripts do not run (XSS).
- [ ] Rich text and Markdown from users go through a sanitiser that removes scripts and event handlers.
- [ ] File uploads are checked for type and size, renamed, and never executed.
- [ ] Error pages and API errors never show stack traces, queries or internal paths.
- [ ] Logs never contain passwords, tokens, card numbers or full personal data.

## Sessions, requests and the browser

- [ ] HTTPS everywhere, with HSTS on where your host allows it.
- [ ] Session cookies are `Secure`, `HttpOnly` and `SameSite=Lax` or `Strict`.
- [ ] Requests that change data are protected against CSRF (SameSite cookies plus a token, or your framework's built-in protection).
- [ ] CORS allows only your own domains. Never `*` on endpoints that use cookies or keys.
- [ ] Security headers are set: Content-Security-Policy, X-Content-Type-Options, Referrer-Policy, and frame protection. See [Security headers on static hosting](/ship/security-headers/).
- [ ] Sessions and tokens expire, and users can sign out everywhere.

## Abuse and cost

- [ ] Login, sign-up and password reset are rate-limited.
- [ ] Endpoints that call paid services (AI, SMS, email) are rate-limited per user and per IP.
- [ ] Hard spending caps are set on AI providers, cloud accounts and SMS. See [Cost control](/run/cost-control/).
- [ ] Forms have spam protection that does not block real people (a honeypot field or a privacy-friendly challenge).

## Third parties

- [ ] Webhooks from Stripe, GitHub and others verify the signature before acting.
- [ ] Every package exists and is the intended one; AI tools sometimes invent names that attackers then register.
- [ ] Dependabot or `npm audit` runs regularly, and critical updates are applied within days.
- [ ] Third-party scripts on your pages are few, from sources you trust, and loaded only where needed.

## AI features

- [ ] The model is called from the server, never with a key in the browser.
- [ ] Model output is treated as untrusted and escaped before display.
- [ ] The model cannot run tools, SQL or payments without limits and, for anything irreversible, a human confirming.
- [ ] Customer data does not go to AI tiers that train on inputs. See [Adding AI features](/build/ai-features/).

## Recovery

- [ ] The database is backed up automatically and a restore has been tested.
- [ ] You know how to rotate every key in under an hour, and where each one is used.
- [ ] A `security.txt` file and a contact address let researchers report problems to you privately.
- [ ] You have written down what you would do if a laptop with production access were stolen.

::: tip Ask your AI to attack your app
Give your AI coding tool this prompt: "Act as a security tester. Using only what a normal visitor can see and do, try to read another user's data, call an admin action, or find a secret key. Show me each attempt and how to fix what worked." Then fix, and run [[tool:mdn-observatory]] on the live site.
:::
