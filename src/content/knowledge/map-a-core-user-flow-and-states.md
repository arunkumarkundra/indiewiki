---
title: "Map the core user flow, including failure and recovery"
description: "Draw the shortest real path to a user outcome, then account for decisions, permissions, system states, and ways to recover."
slug: map-a-core-user-flow-and-states
category: product
kind: article
tags: [user-flows, ux, product-design]
audience: [independent builders, solo founders, small teams]
status: published
evidence: mixed
confidence: moderate
lastVerified: 2026-10-07
reviewBy: 2027-04-07
reviewTrigger: "Recheck when research changes the workflow, a new role or permission is introduced, or production failures reveal a missing state."
related: [product, quality]
featured: false
seedSources: []
sources:
  - title: "Map and understand a user's whole problem"
    url: https://www.gov.uk/service-manual/design/map-a-users-whole-problem
    publisher: "GOV.UK Service Manual"
    accessed: 2026-10-07
  - title: "Understand user needs"
    url: https://www.gov.uk/service-manual/service-standard/point-1-understand-user-needs
    publisher: "GOV.UK Service Manual"
    accessed: 2026-10-07
  - title: "Understanding WCAG 2.2"
    url: https://www.w3.org/WAI/WCAG22/Understanding/
    publisher: "W3C"
    accessed: 2026-10-07
---

## Draw what the user is trying to accomplish

Pick one user, one trigger, and one outcome. Start with what happens before the product: an email arrives, a deadline approaches, or a user realizes an account is locked. End when the user can tell the job succeeded. Include existing tools and people in between. A flow that starts at your homepage and ends at a button click may omit most of the task.

Use a whiteboard, paper, or text. For each step, write the actor, action, system response, and decision. Mark where data is created, changed, shared, or removed. Add branches only when the user or system can reach a different meaningful outcome. This keeps the map useful rather than turning it into an inventory of every screen.

The [GOV.UK guide to mapping a user’s whole problem](https://www.gov.uk/service-manual/design/map-a-users-whole-problem) emphasizes mapping the end-to-end journey and the other services or people involved. Adapt that technique to the boundary of your product; you do not need to diagram an entire industry to discover where your own experience joins or breaks the larger job.

## Add states to every important step

For each screen or operation, ask what the user sees when it is:

- **Empty:** no records exist yet; tell the user what the product is for and what safe next action creates value.
- **Loading:** the request is in progress; preserve context and avoid implying success before it is confirmed.
- **Successful:** show what changed and what happens next; for consequential actions, provide a receipt or reference.
- **Invalid:** identify the field or choice, explain how to fix it, and preserve correct input.
- **Failed:** say what did not happen, whether data was saved, and how to retry or get help.
- **Offline or delayed:** show whether work is queued, saved locally, or needs another attempt; do not silently discard it.
- **Unauthorized or expired:** explain how to regain access without exposing private records or revealing another user’s account.
- **Destructive or reversible:** confirm irreversible actions; offer undo when it is safe and technically real.

Do not display every conceivable state everywhere. Prioritize states that protect data, money, access, or task completion. A useful failure message answers three questions: what happened, what remains safe, and what can the user do next?

## Mark system boundaries and permissions

Show where the product calls an external service, waits for human approval, sends an email, charges money, or starts a background task. The response may be delayed, duplicated, or fail. Decide what the user sees while waiting and how support can identify the operation. If permission matters, indicate which role can take the next step and provide a legitimate path to request access.

Check that the path works for the roles and data conditions you support. A creator may edit a draft while an invited viewer may only review it. A returning user may have expired credentials. The same flow should not assume one owner, one device, or a perfect network unless that is an explicit product constraint.

## Turn the map into a practical design artifact

Use a compact table:

| Step | User goal/action | System response | State or branch | Evidence/question |
|---|---|---|---|---|
| 1 | Upload a client CSV | Preview detected columns | Wrong format / too large | Which formats do users already have? |
| 2 | Confirm the import | Validate and save rows | Some rows rejected | Can the user correct only failed rows? |
| 3 | Review results | Show imported count and exceptions | Processing delayed | How will the user know the job finished? |

Link each step to a need or requirement. If a branch has no user value, risk, or operational reason, remove it from the first design. If a required path cannot be completed end to end, decide whether a transparent manual step is acceptable for the first release.

Test the map with a plausible user using a paper sketch or prototype. Give them a goal without teaching the interface; observe where their expectation differs from your flow. Check keyboard order, labels, focus, error identification, and accessible status announcements against the relevant [WCAG 2.2 guidance](https://www.w3.org/WAI/WCAG22/Understanding/). A diagram is a hypothesis until users can complete the task.

Use [requirements and acceptance criteria](/wiki/turn-user-needs-into-requirements/) to make steps verifiable, and [usability testing](/wiki/run-a-small-usability-test/) to learn where the path needs revision.
