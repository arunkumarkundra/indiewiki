---
title: How to contribute to IndieWiki
description: Fix a mistake, suggest a tool, request a guide or write a page. Everything happens on GitHub in your browser, and no installation or coding is needed.
type: page
updated: 2026-10-16
nav_title: Contribute
---

IndieWiki stays useful because readers keep it current. Prices change, tools shut down, and every founder learns something the next one needs. You can help in two minutes or two hours. All you need is a free [GitHub](https://github.com/) account; nothing to install.

## Quick ways to help

- **Report a problem.** Something wrong, out of date, unclear or broken? Use the **Report a problem** button at the bottom of any page. It opens a short form with the page already filled in.
- **Suggest a tool.** Know a tool that belongs in the Toolbox? Use **Suggest a tool** on any Toolbox page and tell us what it is for, what is free, and its trade-offs.
- **Request a guide.** Stuck on something the wiki does not cover? Open a guide request on GitHub and describe the problem you were trying to solve.

## Edit a page yourself

Every page has an **Edit this page** button. It opens the page's text on GitHub.

::: steps
1. **Click "Edit this page"** at the bottom of the page you want to change, and sign in to GitHub if asked.
2. **Click the pencil icon** if GitHub shows the file first. GitHub will offer to create your own copy (a "fork"); accept.
3. **Make your change** in the editor. The text is Markdown: `## ` starts a section heading, `- ` starts a bullet, `[words](https://link)` makes a link.
4. **Update the `updated:` date** at the top of the file to today, written as `YYYY-MM-DD`, if you changed facts.
5. **Click "Commit changes"**, write one sentence about what you changed and why, then click **Propose changes**.
6. **Click "Create pull request"**. Automatic checks will run in a minute or two. A maintainer reviews it, may suggest edits, and merges it. The site updates a few minutes later.
:::

If the automatic check fails, open the **Details** link next to it. The message names the file and says exactly what to fix, for example a description that is too short or a link to a page that does not exist.

## What makes a good contribution

- **Specific and practical.** Steps someone can follow, real examples, exact settings.
- **Sourced.** Link the official page for any price, limit or rule, and put the month you checked it in the tool's `checked:` field.
- **Plain words.** Short sentences. Explain terms the first time. No marketing language and no filler.
- **Fair.** Every tool has trade-offs; list them. Disclose if you work for or with a company you mention.
- **Your own words.** Do not copy text from other sites. Summarise and link instead.

The full style guide, the list of page fields and the special Markdown shortcuts (callout boxes, checklists, tool links) are in `CONTRIBUTING.md` in the repository.

## Who reviews changes

Maintainers review every pull request before it is published. Automated checks also run on every change: they build the whole site and refuse anything with a broken link, a missing description, a page without a date, or a tool without a checked month. This keeps the wiki consistent no matter who edits it.

## Licence

By contributing, you agree that your text is published under the Creative Commons Attribution-ShareAlike 4.0 licence, and any code under the MIT licence, the same as the rest of the project. Please follow the project's Code of Conduct in every discussion.
