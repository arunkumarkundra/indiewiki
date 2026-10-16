---
title: Accessibility checklist
description: Practical checks so people using keyboards, screen readers, zoom or high contrast can use your product, based on WCAG 2.2 AA and testable in an afternoon.
type: checklist
updated: 2026-10-16
order: 7
nav_title: Accessibility checklist
time: 2 to 3 hours
tags: [accessibility, a11y, wcag, screen reader, keyboard navigation, contrast, alt text, aria, forms]
faq:
  - q: Is accessibility a legal requirement for small products?
    a: It depends on where you sell and to whom. Public sector buyers and many enterprise contracts require WCAG conformance, and laws such as the European Accessibility Act cover many digital products sold in the EU. Even where it is not required, accessible products are easier for everyone to use and rank better in search.
  - q: Can automated tools tell me my site is accessible?
    a: No. They catch roughly a third of issues, such as missing labels and low contrast. Keyboard and screen reader testing finds the rest. Use both.
sources:
  - title: "W3C: How to Meet WCAG 2.2 (quick reference)"
    url: https://www.w3.org/WAI/WCAG22/quickref/
  - title: "W3C: Easy checks, a first review of web accessibility"
    url: https://www.w3.org/WAI/test-evaluate/preliminary/
related: [/ship/website-essentials/, /ship/seo-checklist/, /tools/accessibility-tools/]
---

About one in six people lives with a disability, and everyone is temporarily impaired sometimes: a broken wrist, bright sunlight, a slow connection, a noisy train. Accessible products work in all those moments. Most of the work is small, and much of it improves SEO too.

Tools for each check are in [Accessibility testing](/tools/accessibility-tools/).

## Keyboard

Put your mouse away and use only [[kbd:Tab]], [[kbd:Shift+Tab]], [[kbd:Enter]], [[kbd:Space]], arrow keys and [[kbd:Esc]].

- [ ] Every link, button, field and menu can be reached and used with the keyboard.
- [ ] The focus outline is clearly visible on every element, in light and dark themes.
- [ ] Focus moves in a logical order that follows the page.
- [ ] Dialogs trap focus while open, close with [[kbd:Esc]], and return focus to what opened them.
- [ ] A "Skip to content" link is the first thing you reach with [[kbd:Tab]].
- [ ] Nothing traps the keyboard so you cannot get out.

## Screen readers

Turn on [[tool:voiceover]] on a Mac or iPhone, or [[tool:nvda]] on Windows, and listen to your main page and one key task.

- [ ] Each page has one `<h1>` and headings in a sensible order, so the outline makes sense when read alone.
- [ ] Landmarks are used: `header`, `nav`, `main`, `footer`.
- [ ] Every image that carries meaning has alt text describing what it shows; decorative images have empty alt text.
- [ ] Buttons and links have names that make sense out of context ("Download invoice", not "Click here").
- [ ] Icon-only buttons have an accessible name.
- [ ] Status messages (saved, error, added to cart) are announced, using a live region.
- [ ] The page language is set with `lang` on the `<html>` element.

## Forms

- [ ] Every field has a visible label tied to it, not only placeholder text.
- [ ] Required fields are marked in text, not only by colour or an asterisk.
- [ ] Errors say what went wrong and how to fix it, next to the field, and are announced.
- [ ] What a user typed is kept when the form shows an error.
- [ ] Inputs use the right type (`email`, `tel`, `number`) so phones show the right keyboard, and `autocomplete` attributes help password managers.

## Seeing and reading

- [ ] Body text has a contrast ratio of at least 4.5:1, large text 3:1, and buttons and field borders 3:1.
- [ ] Colour is never the only way information is shown (errors also have an icon or text).
- [ ] The page still works at 200% zoom and at 320 pixels wide without sideways scrolling.
- [ ] Text can be resized and line spacing increased without content being cut off.
- [ ] Touch targets are at least 24 by 24 pixels, ideally 44 by 44.
- [ ] Writing is plain: short sentences, common words, and terms explained the first time.

## Motion and media

- [ ] Animations respect the "reduce motion" setting.
- [ ] Nothing flashes more than three times a second.
- [ ] Videos have captions; audio has a transcript.
- [ ] Nothing auto-plays sound.
- [ ] Charts have a text or table alternative.

## Automated checks

- [ ] [[tool:axe-devtools]] shows no serious issues on each main page.
- [ ] [[tool:lighthouse]] accessibility audit passes.
- [ ] Problems found are fixed, then re-tested with keyboard and screen reader.
