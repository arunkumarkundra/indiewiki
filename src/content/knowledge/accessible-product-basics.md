---
title: "Accessibility checks for a small product"
description: "Practical checks that help make core product journeys usable with keyboards, assistive technology, and varied visual or motor needs."
slug: accessible-product-basics
category: quality
kind: checklist
tags: [accessibility, WCAG, usability]
audience: [independent builders, solo founders, small teams]
status: published
evidence: mixed
confidence: moderate
lastVerified: 2026-10-07
related: [quality]
featured: false
seedSources: []
sources:
  - title: "WCAG 2.2 Understanding"
    url: https://www.w3.org/WAI/WCAG22/Understanding/
    publisher: "W3C"
    accessed: 2026-10-07
---

## Test the journeys people actually need

Accessibility is part of whether a product can be used, not a final styling pass. Start with the most important journey—sign up, search, purchase, or complete the core task—and test it end to end. Automated tools can catch some issues, but they do not establish conformance or replace use with assistive technology.

## Keyboard and focus

Put your mouse aside. Can you reach every control with Tab and Shift+Tab, activate it with the expected key, and see where focus is? Is the order meaningful? Can you escape dialogs and menus? Is there a skip link on long pages? Avoid keyboard traps and custom controls that do not expose their role and state.

## Structure, labels, and feedback

Use semantic headings in order, landmarks, buttons for actions, and links for navigation. Give every form control a programmatic label; placeholder text alone disappears and is not a reliable label. Associate help and error text with the relevant field. On validation, identify the problem in text and explain how to fix it; do not rely on color, sound, or position alone.

Announce dynamic status updates where assistive technology users need them, but avoid reading every decorative change aloud. Ensure dialogs announce their name, keep focus inside while open, and return focus to the invoking control when closed.

## Visual and motion checks

Check text and control contrast using the applicable [WCAG 2.2 criteria](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html). Do not communicate meaning by color alone. Zoom to 200% and test narrow widths without loss of content or two-dimensional scrolling for ordinary reading. Verify text spacing can increase. Respect reduced-motion preferences and do not use flashing effects that can cause harm.

Give informative images concise alt text that conveys their purpose. Use empty alt text for decorative images. Caption relevant prerecorded video and provide transcripts when they contain important information. Make touch controls large and separated enough to use reliably; check WCAG target-size criteria rather than guessing.

## A small practical test pass

1. Run an automated accessibility checker on the core pages and fix genuine findings.
2. Complete the core journey by keyboard only.
3. Test one screen reader and one mobile/small viewport.
4. Check headings, labels, errors, contrast, zoom/reflow, and motion.
5. Ask people with relevant access needs to try the task when feasible, and compensate their time when appropriate.
6. Record the barriers found and retest after fixes.

Do not claim WCAG conformance based on a quick checklist; conformance requires evaluating all applicable criteria in scope. W3C’s [WCAG 2.2 Understanding documents](https://www.w3.org/WAI/WCAG22/Understanding/) explain the criteria. Also see [brand guidelines](/wiki/brand-guidelines-for-a-small-product/) and [first launch readiness](/wiki/first-launch-readiness/).
