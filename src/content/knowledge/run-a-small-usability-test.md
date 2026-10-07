---
title: "Run a small usability test before polishing the product"
description: "Plan a focused session, give neutral tasks, observe real attempts, and turn findings into prioritized product changes."
slug: run-a-small-usability-test
category: product
kind: recipe
tags: [usability-testing, product-research, prototype]
audience: [independent builders, solo founders, small teams]
status: published
evidence: mixed
confidence: moderate
lastVerified: 2026-10-07
reviewBy: 2027-04-07
reviewTrigger: "Recheck when participant privacy rules, research tools, accessibility methods, or the target workflow changes."
related: [product, validate, quality]
featured: false
seedSources: []
sources:
  - title: "Using moderated usability testing"
    url: https://www.gov.uk/service-manual/user-research/using-moderated-usability-testing
    publisher: "GOV.UK Service Manual"
    accessed: 2026-10-07
  - title: "Plan user research"
    url: https://www.gov.uk/service-manual/user-research/plan-user-research-for-your-service
    publisher: "GOV.UK Service Manual"
    accessed: 2026-10-07
  - title: "Easy Checks: A First Review of Web Accessibility"
    url: https://www.w3.org/WAI/test-evaluate/preliminary/
    publisher: "W3C WAI"
    accessed: 2026-10-07
---

## Decide what you need to learn

Usability testing observes whether people can use a product or prototype to complete a task. It is useful for finding confusion and breakdowns; it does not tell you by itself whether the market is large, the price is right, or the product should exist.

Choose one research question: “Can first-time shop owners publish a catalog without help?” or “Do users understand when an import has only partially succeeded?” Test a flow where the answer could change your next design decision. A clickable prototype is enough for many navigation and comprehension questions; use a working build when timing, data, or system feedback is part of the question.

For help choosing between a sketch, clickable mock-up, coded simulation, manual service, and technical spike, see [prototype a risky product workflow](/wiki/prototype-a-risky-product-workflow/).

GOV.UK’s [moderated usability-testing guidance](https://www.gov.uk/service-manual/user-research/using-moderated-usability-testing) defines the method as watching participants attempt specific tasks and recommends realistic, non-leading tasks. The exact formal process is written for public services; a solo builder can adapt the essentials without a lab or a team of observers.

## Recruit people who resemble the intended users

Ask current or likely users, not only friends who want you to succeed. Write the selection criteria before inviting participants: role, workflow, experience, access needs, or a recent trigger. Be clear about time, recording, compensation, and what the session is for. Do not collect more personal information than recruitment requires.

For a small formative round, a few sessions can expose clear usability problems, but they do not produce a representative estimate of prevalence or a statistically reliable conversion rate. If findings conflict, recruit another round based on the uncertainty. Include people who use assistive technology when the product’s audience and task make that relevant; do not wait until visual polish is complete.

## Prepare a 30-minute session

Before the call, test the prototype, links, test account, and reset procedure. Use dummy records unless a participant’s real data is necessary and can be protected. If you record, ask for explicit permission, explain who can see the recording and when it will be deleted. If recording adds risk or discomfort, take notes instead.

Use this simple script:

```text
Introduction: We are testing the product, not you. Some parts may not work.
Consent: May I take notes? May I record? You can stop at any time.
Context: Tell me briefly how you do this task today.
Task: You have received a revised estimate from a client. Find what changed
      and prepare a reply. Please say what you are looking for as you go.
Observation: Watch. Do not point out controls or explain the intended design.
Debrief: What did you expect? What was confusing? What would you do next?
Close: Explain what happens to notes/recording and thank them.
```

Give a goal, not a click path. “Find the button labeled Import” teaches the interface and makes the task uninformative. Pause instead of rescuing immediately; if the participant is stuck, ask what they expect or would try next. GOV.UK recommends neutral task wording, a discussion guide, and reassuring participants that they are not being evaluated.

## Record behavior separately from interpretation

For each task, note whether it was completed, where the participant hesitated or went off path, what they said, and what happened. Avoid recording only opinions such as “they liked it.” Separate observation from interpretation:

| Observation | Possible interpretation | Follow-up |
|---|---|---|
| Participant reopened the old estimate twice | They may not trust the new total | Ask what would reassure them; test an audit trail |

After sessions, group repeated breakdowns and identify how many sessions showed each pattern. A count is descriptive of this round, not a population rate. Preserve contradictory cases; a single serious problem involving data loss or exclusion can matter even if it appears once.

## Decide what to change next

Rank findings by consequence, frequency in this round, confidence in the interpretation, and cost/risk of leaving them. Fix comprehension barriers in the core path before visual polish. If the evidence is ambiguous, revise the prototype or task and run another focused round. Record the decision and what you still do not know in an [experiment brief](/wiki/experiment-brief-template/).

Delete recordings and identifying notes on the timeline you promised. Store findings securely and share only what is needed to make the product decision. Re-test the changed flow, including keyboard and assistive-technology behavior where applicable. Use [map the core flow](/wiki/map-a-core-user-flow-and-states/) to locate the failed step and [product metrics](/wiki/measure-product-progress/) to monitor real use after release.
