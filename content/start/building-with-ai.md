---
title: Building with AI coding tools
description: A safe, repeatable workflow for building a real product with AI app builders and coding agents, especially if you are not a programmer.
type: guide
updated: 2026-10-16
order: 3
time: 14 min read
nav_title: Building with AI tools
tags: [vibe coding, ai, claude code, cursor, lovable, non-technical, workflow, prompts]
faq:
  - q: Can I build a real product without knowing how to code?
    a: Yes, many people now do. You still need to understand what your product does with data and money, keep the code in a repository you own, and check security before real users arrive. The tools write code; you stay responsible for it.
  - q: Which AI coding tool should I use?
    a: App builders such as Lovable, Bolt and Replit are fastest for a first prototype. Coding agents such as Claude Code, Cursor and GitHub Copilot are better once you have a real codebase to maintain. Many founders start with a builder and move to an agent. See the AI coding tools list in the Toolbox.
  - q: Why does the AI keep breaking things that worked yesterday?
    a: Usually the conversation got too long, the request was too big, or there was no saved version to compare against. Start a fresh session per task, ask for one change at a time, and commit working versions to Git so you can always go back.
related: [/start/start-here/, /build/choose-your-stack/, /ship/security-checklist/, /build/production-readiness/]
---

AI tools can now write most of the code for a small product. That changes who can build, but not what a product needs: clear requirements, a safe way to change things, and someone who checks the result. This page is the workflow that experienced builders use to keep AI-written projects healthy. It assumes you work in a browser and on GitHub, and do not run commands yourself.

Compare the tools in [[tool:claude-code]], [[tool:cursor]], [[tool:lovable]] and the rest of the [AI coding tools](/tools/ai-coding/) list.

## Before the first prompt: write the brief

The most common reason AI projects go wrong is a vague first request. Spend an hour on a short written brief, then give it to the tool at the start of every new session.

A good brief has:

- **What the product does**, in two sentences, and who it is for.
- **The screens or pages**, as a list, with what each one shows.
- **The data**: what is stored, who can see it, and what must never leak.
- **The rules**: free versus paid features, limits, what happens on errors.
- **The standards**: accessibility, security and SEO requirements. Link or paste the IndieWiki checklists you want followed.
- **What is out of scope** for now.

Ask the AI to read the brief and list its questions **before** writing any code. Answer them in the brief, not only in the chat, so the next session knows too.

::: tip Make the brief LLM-friendly
Short headings, one requirement per line, no "etc.", and exact names for things ("the Dashboard page", not "the main screen"). If two people could read a line two ways, the AI will pick the wrong one half the time.
:::

## The loop: plan, change, check, save

Work in a loop of small steps. Each step is one change you can describe in a sentence.

::: steps
1. **Plan.** Describe the change. Ask the AI to explain how it will do it, which files it will touch, and what could break. Do not let it write code yet.
2. **Review the plan.** Ask: "Before we change anything, review this plan critically. Will it cause any functional, logical or security problem? Is there a simpler way?"
3. **Change.** Let it make the change. Ask for the smallest change that works.
4. **Check.** Test the change yourself in the browser, on desktop and on a phone. Ask the AI to list what it changed and to confirm it did not introduce errors or leave dead code behind.
5. **Save.** Commit the working version to Git with a clear message. This is your undo button.
:::

If a step goes wrong twice, stop. Go back to the last saved version and ask for a different approach rather than piling fixes on fixes.

## One session, one task

AI tools work best with a focused conversation. Long chats drift: the tool forgets early decisions, mixes up versions of files, and starts undoing its own work.

- Start a fresh session for each feature or bug.
- When a task is big, ask the AI to write the plan to a file in the repository (for example `docs/plan-checkout.md`). Start the next session by pointing at that file.
- After a hard problem is solved, ask for a short write-up of what went wrong and how it was fixed, and keep it in `docs/`. Future you, and future AI sessions, will need it.

## Rules that prevent disasters

These come from real incidents. Follow them even when you are in a hurry.

::: danger Never paste secrets into a chat or into frontend code
API keys, database passwords and payment keys go in your host's environment variables or secrets settings, never in code the browser downloads and never in a chat transcript. If a key was ever pasted somewhere public, **rotate it** (create a new one and delete the old one) the same day.
:::

- **Keep the code in a GitHub repository you own.** Builders can disappear, change pricing or lock exports. Your repository is the source of truth.
- **Make sure every package exists.** AI tools sometimes invent package names. Attackers register those names with malicious code. Check unfamiliar packages on npmjs.com or pypi.org before installing.
- **Ask for server-side checks.** Anything the browser can change, a user can fake. Prices, permissions and limits must be checked on the server or by database rules. See the [security checklist](/ship/security-checklist/).
- **Set spending limits** on every AI and cloud account before you connect it. A loop that calls an AI API in a bug can cost hundreds of dollars overnight. See [Cost control](/run/cost-control/).
- **Do not let the AI run destructive commands** (deleting data, force-pushing, dropping tables) without you reading the command first.

## Prompts worth reusing

Copy these and adjust the bracketed parts.

```text
Study the files in this repository and the brief in docs/brief.md.
Do not write code yet. Explain how the app works today in plain words,
then list anything that is unclear, risky or inconsistent.
```

```text
I want to [describe the change]. Before writing code:
1) restate what you understood, 2) list the files you will change,
3) list what could break, 4) suggest the simplest approach.
```

```text
I have applied your changes. Review the current files and confirm:
- every planned change is done
- no syntax or logic errors were introduced
- nothing from our earlier plan was missed
- there is no dead or duplicated code left behind
List anything else we have not thought about.
```

```text
Go through this checklist one item at a time: [paste checklist].
For each item, say whether the app already passes, what to change if not,
and how I can verify it myself in the browser.
```

## When you are not a programmer

You do not need to read every line, but you do need to be able to answer three questions about your product:

1. **Where is the data stored, and who can read it?**
2. **Where do secrets live, and could a visitor see them?**
3. **How do I go back to yesterday's working version?**

If you cannot answer one of these, ask your AI tool to explain it to you as if you were new to software, and write the answer in your brief. When real money or personal data is involved, a few hours of review from an experienced developer before launch is money well spent.
