---
title: "Prototype a risky product workflow before building it"
description: "Choose the lightest prototype that can answer a product question, test a realistic task, and record what the prototype cannot prove."
slug: prototype-a-risky-product-workflow
category: validate
kind: recipe
tags: [prototyping, product-research, usability-testing, experiments]
audience: [independent builders, solo founders, small teams]
status: published
evidence: mixed
confidence: moderate
lastVerified: 2026-10-07
reviewBy: 2027-04-07
reviewTrigger: "Recheck when authoritative prototype, accessibility, or user-research guidance changes, or when common prototype tools and sharing practices materially change."
related: [validate, product, start]
featured: false
seedSources: []
sources:
  - title: "Making prototypes"
    url: https://www.gov.uk/service-manual/design/making-prototypes
    publisher: "GOV.UK Service Manual"
    accessed: 2026-10-07
  - title: "Using moderated usability testing"
    url: https://www.gov.uk/service-manual/user-research/using-moderated-usability-testing
    publisher: "GOV.UK Service Manual"
    accessed: 2026-10-07
  - title: "Plan a round of user research"
    url: https://www.gov.uk/service-manual/user-research/plan-round-of-user-research
    publisher: "GOV.UK Service Manual"
    accessed: 2026-10-07
  - title: "Plan user research for your service"
    url: https://www.gov.uk/service-manual/user-research/plan-user-research-for-your-service
    publisher: "GOV.UK Service Manual"
    accessed: 2026-10-07
  - title: "Testing your prototypes"
    url: https://www.gov.uk/service-manual/design/making-prototypes#testing-your-prototypes
    publisher: "GOV.UK Service Manual"
    accessed: 2026-10-07
---

## Prototype to answer one question

A prototype is a temporary representation of a proposed product or workflow. It can be paper screens, a clickable mock-up, a coded interaction, a spreadsheet, or a manual service behind a simple interface. Make one when a real user task is uncertain and seeing or trying a concrete version could change what you build.

A prototype can help you learn whether users understand the workflow, find the next step, trust the feedback, or recover from an error. It does not prove market size, willingness to pay, production reliability, security, scale, or ongoing value. Those need different evidence. GOV.UK recommends prototyping to explore and test design before committing to a build; its guidance also distinguishes sketches for discussing basic ideas from more realistic code prototypes for user research. Treat fidelity as a choice about the question, not a measure of how finished the idea is.

If the uncertainty is whether the problem happens or matters, start with [problem interviews](/wiki/customer-interviews/). If you need to see whether people can complete a proposed task, prototype it. If you need to learn whether the underlying technology can work within your constraints, run a bounded technical spike. If the uncertainty is whether a buyer will commit, test a candid offer or [paid pilot](/wiki/run-a-transparent-paid-pilot/); a polished prototype is not purchase evidence.

## 1. Choose the smallest useful representation

Start by completing this sentence:

> I need to learn whether **[specific user]** can or will **[observable behavior]** when **[realistic situation]**, because the answer changes **[product decision]**.

Then select the lightest method that allows the behavior to occur:

| What you need to learn | Smallest useful artifact | What the result can support |
| --- | --- | --- |
| Whether a person recognizes the problem and current process | Storyboard, paper sketch, or annotated current workflow | Better problem framing and research questions; not usability of a future UI |
| Whether a person understands a sequence or labels | Paper screens or a clickable wireframe | Navigation and comprehension observations; not visual polish or real system behavior |
| Whether a task makes sense with realistic data and states | Clickable or coded interactive prototype | Task breakdowns and state expectations; only if the simulated parts are disclosed |
| Whether a manual outcome would be valuable | Simple intake form plus a clearly manual, bounded service | Use and effort for that pilot; not scalable automation or production reliability |
| Whether an integration or algorithm is technically feasible | A small isolated technical spike with test data | Feasibility under the tested constraints; not customer desirability or product readiness |

If you cannot say what decision the prototype could change, pause before adding detail. More screens do not make an unclear question answerable.

## 2. Build one realistic path, including a consequential failure

Map the task from its trigger to the intended outcome. Use [the core-flow map](/wiki/map-a-core-user-flow-and-states/) to identify who starts, what they know, what the system needs, and where another person or service enters. Then include only the screens or steps needed to test the riskiest part.

For a first pass, prepare:

- **Context:** what happened before the user opens the product and what they are trying to accomplish.
- **Starting state:** the account, project, file, permissions, or prior work they would actually have.
- **Primary task:** one realistic goal expressed in the user’s language, not in your interface labels.
- **Expected outcome:** what would count as completing the job and what evidence the user should see.
- **Important branch:** one likely exception, such as missing information, a duplicate, a rejected payment, or partial processing.
- **Recovery path:** how the user can correct, retry, undo, ask for help, or safely leave.

Do not prototype every setting, dashboard, and edge case. Include an exception when a wrong choice could lose work, expose information, charge someone, or block completion. Otherwise, note the uncertainty for a later round.

### Example: importing invoice rows

Suppose your idea is a tool that imports a spreadsheet and prepares invoice records. The risky question is not whether users like the dashboard; it is whether a bookkeeper can identify which rows will import, fix a malformed date, and understand what happens to valid rows when one row fails.

A focused prototype could contain an upload screen, a preview with row-level errors, a correction step, and a completion summary that distinguishes imported, skipped, and unresolved rows. Use fictitious companies and invoices. You can simulate validation and import with fixed responses, but tell participants which parts are simulated. Ask them to import a file with one invalid row and explain how they would proceed. Observe whether they notice which records changed and whether they can recover without losing valid entries.

If participants cannot tell what happened, revise the status language and recovery flow before implementing the real importer. If they understand the screen but the real system cannot preserve valid rows or safely retry, prototype testing has reached its limit: test that behavior in a technical spike with disposable data before promising it.

## 3. Label simulation and protect the test environment

People may assume that a realistic screen is connected to a real service. Introduce the session plainly: “This is an early prototype. Some actions and responses are simulated. We are testing the workflow, not you, and nothing will be sent or purchased.” Repeat the explanation at a point where a simulated action could be mistaken for a real one.

Do not accept money, send messages, change live records, or imply that an action succeeded when it did not. If you are testing a manual concierge step, tell the participant who will perform it, how long it may take, what data is needed, and what will happen after the test. For a fake door or waitlist, show an honest next step and collect only the information required for that purpose.

Use fictional data by default. If realistic personal or customer data is essential, explain the use, get appropriate consent, limit access, and set a deletion date. Keep API keys, production credentials, and live customer integrations out of the prototype. The GOV.UK code-prototype guidance explicitly warns that prototype code does not need production standards and must not simply be copied into a live service; rebuild or review production code for quality, security, and performance.

If you publish a prototype on the web, restrict access where practical and label it prominently so an unintended visitor does not mistake it for an available service. GOV.UK specifically requires password protection for its published service prototypes to prevent public confusion. Use a test-only host or local session for an indie product, and remove access when research ends.

## 4. Prepare the session around behavior

Recruit people who recently did the task or are likely to do it. State the selection criteria, time required, whether you will record, and any incentive. Ask permission before recording. If the workflow depends on assistive technology or a particular device, make room for the participant’s setup; a prototype that only works with a mouse may hide the real barrier.

Use one primary task. Give context without telling the participant which control to choose:

> “A client sent a spreadsheet of this month’s invoices. One row has a date you need to correct. Please get the valid invoices ready to import and tell me what you would do with the row that cannot be imported.”

Avoid “click Import, fix the date, then press Continue.” The [GOV.UK moderated usability guidance](https://www.gov.uk/service-manual/user-research/using-moderated-usability-testing) recommends believable tasks with clear goals that do not reveal the answer, and asks moderators to stay quiet and watch. It is also explicit that the service—not the participant—is being tested.

Before each session, reset the prototype to the same state. Check links, expected branches, test data, mobile or keyboard behavior relevant to the question, and a fallback if the prototype fails. Try the task yourself once to find broken interactions, but do not rehearse the intended route with participants.

During the session, record separately:

| Observation | Example |
| --- | --- |
| Outcome | Completed independently, completed after a hint, abandoned, or prototype blocked the attempt |
| Behavior | Went back to inspect valid rows before retrying |
| Expectation | Thought “continue” would import all records immediately |
| Error or hesitation | Did not notice the invalid-row warning |
| Moderator help | Pointed to the status panel after 90 seconds |
| Interpretation | Completion state may not distinguish saved and pending records |

Do not convert “I like it” into task success. If the prototype itself fails, record that separately from participant difficulty and do not count the blocked session as evidence about the intended design.

## 5. Run a short round, then change one thing you learned

For early formative research, a handful of sessions is often enough to discover obvious breakdowns, not to estimate how many people in a market will experience them. [GOV.UK recommends research rounds with around four to eight participants](https://www.gov.uk/service-manual/user-research/plan-user-research-for-your-service) for several qualitative methods and advises running further rounds when more clarity is needed. That guidance comes from government-service research; use it as a practical starting point, not a universal requirement.

After each session, capture the most consequential surprise. After the round, group observations by failed step, user expectation, and severity. Note how many participants in this round showed each pattern, but do not describe those counts as population rates. Preserve a serious one-off safety, privacy, or data-loss issue even when it appears once.

Choose the next change based on the decision at risk:

- **Task misunderstood:** improve the scenario or test instructions before drawing a product conclusion.
- **People expect a different step:** revise the sequence or language, then test the revision.
- **A single state is unclear:** prototype that state and its recovery path, not the whole product.
- **Users complete the flow but still lack confidence:** test the missing confirmation, explanation, or control.
- **Prototype suggests desirability but not business demand:** test the offer with the [landing-page or intent-test guide](/wiki/test-demand-with-a-landing-page/).
- **Prototype interaction works but the mechanism is uncertain:** run a technical spike or small end-to-end build; do not infer feasibility from a clickable mock-up.

Use the [experiment decision workflow](/wiki/decide-what-an-experiment-result-means/) to report whether the result is supportive, contradictory, or inconclusive. Then decide if another prototype round is worth the effort. When the core job and risks are understood, define the smallest complete release in [MVP scope](/wiki/product-scope-mvp/).
