---
title: "Decide what an experiment result means"
description: "Set a decision rule before testing, interpret weak or mixed evidence honestly, and choose whether to continue, change direction, or stop."
slug: decide-what-an-experiment-result-means
category: validate
kind: recipe
tags: [experiments, validation, decision-making, research-quality]
audience: [independent builders, solo founders, small teams]
status: published
evidence: mixed
confidence: moderate
lastVerified: 2026-10-07
reviewBy: 2027-04-07
reviewTrigger: "Recheck when authoritative research-method guidance changes or when the page's experiment examples or decision workflow no longer fit current IndieWiki experiments."
related: [validate, start, product]
featured: false
seedSources: []
sources:
  - title: "Plan user research for your service"
    url: https://www.gov.uk/service-manual/user-research/plan-user-research-for-your-service
    publisher: "GOV.UK Service Manual"
    accessed: 2026-10-07
  - title: "Plan a round of user research"
    url: https://www.gov.uk/service-manual/user-research/plan-round-of-user-research
    publisher: "GOV.UK Service Manual"
    accessed: 2026-10-07
  - title: "ASA statement on statistical significance and p-values"
    url: https://www.amstat.org/asa/files/pdfs/p-valuestatement.pdf
    publisher: "American Statistical Association"
    accessed: 2026-10-07
  - title: "Choosing an experimental design"
    url: https://www.itl.nist.gov/div898/handbook/pri/section3/pri3.htm
    publisher: "National Institute of Standards and Technology"
    accessed: 2026-10-07
---

## A result matters only in relation to a decision

An experiment does not label an idea “validated” or “invalid.” It changes how much confidence you should place in one specific assumption and helps choose what to do next. A signup test can inform whether an offer and channel deserve more attention; it cannot by itself establish that customers will use, pay for, or keep a product.

Before you run a test, write down the decision it could change, the evidence that would support each option, and what the test cannot tell you. This is the closing step of an experiment brief, not a scoring system for ranking ideas. GOV.UK research guidance similarly asks teams to define what they need to know to make the next decision and choose a method that can answer that question.

## 1. Separate the decision from the measurement

Start with one assumption and its consequence if wrong. Then write:

```text
Assumption at risk:
Decision this result informs:
Who counts as eligible, and how will we find them?
What behavior or evidence will we record?
What is the minimum useful signal for the next step?
What result would make us change the segment, offer, or method?
What result would make us stop this approach?
Time, money, and participant burden we will accept:
What this test cannot establish:
```

Use an outcome the method can actually observe. “Users want this” is not an outcome. Examples include:

- **Problem discovery:** a person describes a recent event, repeats a costly workaround, or shows an artifact from the task.
- **Recruitment:** qualified people who meet written criteria reply, attend, or complete a session.
- **Usability:** target users complete a defined task, and you record where they need help or fail.
- **Offer response:** qualified prospects book a call, start a disclosed pilot, or make another real commitment under stated terms.
- **Ongoing value:** users return to complete the core task or continue paying after receiving the actual service.

A click, positive quote, or email signup may be useful evidence for its narrow question. Do not silently substitute it for a stronger outcome such as sustained use or payment.

## 2. Set the threshold from the next cost, not a borrowed benchmark

There is no universal interview count, signup rate, or number of preorders that validates every product. Derive a threshold from what you will spend next and what evidence is proportionate to that decision:

1. **Name the next commitment.** Examples: another day of interviews, a manual pilot, two weeks of implementation, or a paid acquisition test.
2. **Estimate the downside if wrong.** Include your time, cash, participant burden, operational risk, and any promise you would make.
3. **Choose the smallest informative observation.** What behavior or repeated pattern would make that next commitment reasonable? What counterexample would change your mind?
4. **Check whether the proposed method can produce that evidence.** A dozen visits cannot estimate a fine-grained conversion rate. A few interviews cannot estimate how common a problem is. If the method is underpowered or the participants are not representative, change the claim or method.
5. **Set a stop rule for time and cost.** “Stop after 20 qualified conversations or two weeks” prevents an endlessly extended test. It is an operational limit, not proof that the market is absent.

Write the threshold in plain language before seeing results. Use a range or a qualitative rule when exact counts would create false precision. Explain why the threshold is enough for this next reversible step, not for a broader claim about the market.

### Example: a manual reporting pilot

Suppose you are considering a weekly exception report for independent bookkeepers. You can deliver it manually for two weeks. Before recruiting, you write a hypothetical learning rule:

> Continue to a second, paid pilot only if at least three of five recruited bookkeepers who handled this reconciliation task recently can show the current workaround, use the report on real work, and ask to continue after seeing the stated pilot price. If fewer than two can show a recurring problem, revisit the segment or task. If the report is useful but takes more than an hour per customer each week to prepare, test a narrower workflow before automating.

These counts are an example of a founder’s decision rule, not an industry benchmark or statistically valid demand estimate. The pattern combines recent behavior, an observed use, a commercial next step, and delivery cost because those are the risks behind the next decision.

## 3. Match confidence to the method and sample

Keep qualitative and quantitative claims separate. A few interviews can uncover failure modes, language, and candidate patterns; they do not establish prevalence. [GOV.UK’s current planning guidance](https://www.gov.uk/service-manual/user-research/plan-user-research-for-your-service) suggests roughly four to eight participants for a research round using methods such as interviews or usability tests, while it notes that surveys, A/B tests, and benchmarking need hundreds of participants for clear findings. Those figures are guidance for its service-research context, not a universal sample-size calculator. Use them to recognize the order-of-magnitude difference between exploratory sessions and estimates of population behavior.

If your audience is small or you are early, use repeated focused rounds and behavioral follow-up instead of claiming statistical certainty. State exactly who participated, how they were recruited, the dates, the denominator, and what action they took. “Three of five independent bookkeepers recruited through a professional community used the manual report on a recent task” is bounded. “Bookkeepers want this” is not.

For a quantitative comparison, decide the primary metric, eligible population, assignment method, sample or observation plan, analysis, and end date before launch. Random assignment can reduce some sources of bias when it is feasible; the [NIST experimental-design handbook](https://www.itl.nist.gov/div898/handbook/pri/section3/pri332.htm) explains randomization and blocking as ways to account for nuisance variables in designed experiments. These methods cannot fix a poor audience, a misleading offer, or a metric unrelated to user value. Keep important conditions comparable and log changes in channel, price, season, or product behavior that could affect the result.

Do not stop an A/B test the first time one variant looks ahead, repeatedly inspect results and choose the most flattering window, or try many metrics until one “wins.” The [American Statistical Association’s statement](https://www.amstat.org/asa/files/pdfs/p-valuestatement.pdf) explains that a p-value is not the probability that a hypothesis is true, does not measure effect size or importance, and becomes misleading when analysis choices and repeated testing are ignored. A p-value alone does not tell a solo builder whether the effect is valuable enough to justify building or operating the feature. If you do not have enough traffic for a planned comparison, say so and use qualitative research or a larger, longer-running test instead.

## 4. Classify the result before choosing an action

| What happened | What it can mean | Sensible next move |
| --- | --- | --- |
| The predicted behavior appeared repeatedly among qualified people, and a real next step followed | This assumption is less uncertain for this segment and offer | Take the smallest next step that tests the next risk; do not jump straight to a full product |
| People describe the problem but do not take the proposed action | The problem may be real while the offer, timing, trust, price, channel, or buyer is wrong | Ask what prevented action; change one of those factors and test again |
| People take the action but cannot show the claimed problem or use case | The message or incentive may be attracting the wrong people | Tighten eligibility and repeat with better-qualified participants |
| Only one subgroup responds or the workflow differs materially | The broad segment may contain distinct niches | Split the segment and investigate the subgroup that showed the clearest behavior |
| Few eligible people respond, or recruitment misses the intended group | The experiment may have tested access or channel rather than demand | Improve recruitment or state that reachability is itself the current risk |
| Participants like the concept but do not change behavior or commit | Courtesy, curiosity, or low-cost interest may explain the response | Do not build on praise alone; test a real workflow and a specific next step |
| Results are mixed, the denominator is unclear, or external conditions changed | The evidence cannot support a clean decision yet | Record uncertainty, fix the design, and run a bounded follow-up |
| The test reaches its stop limit without the minimum signal | This route did not earn the next planned investment under these conditions | Stop this test; decide whether a materially different segment, offer, or method is justified |

“Inconclusive” is a valid outcome. It means the experiment did not resolve the assumption. It does not mean the idea is secretly good or definitively bad. Decide whether the value of another test exceeds its cost.

## 5. Look for alternative explanations and counterevidence

Before interpreting a positive result, ask:

- Did the participants actually match the intended segment, or were they friends, existing fans, or people attracted by a giveaway?
- Did the action cost them anything meaningful, or only one click?
- Did the channel, season, referral, discount, or urgency create the response?
- Did participants use the product for the target task, or for a different reason?
- Did a small number of repeat users create most events? Count people and outcomes separately.
- Did failures to respond come from an irrelevant audience, unclear copy, a broken flow, or poor timing?
- Did you exclude valid failures, extend the test, or change the offer after seeing results?

Keep a short list of observations that argue against the idea. Do not average away a segment difference that may matter, and do not move the threshold after results simply to preserve the original plan. If conditions force a change, record the old and new rule, when it changed, and why; treat the new result as exploratory.

## 6. Turn the result into a next experiment

Write a brief decision record. For the next test, fill in the [experiment brief](/wiki/experiment-brief-template/) before recruiting or shipping the variation:

> **Decision:** continue / change / stop / inconclusive
>
> **What we tested:** [assumption, segment, offer, method]
>
> **Result:** [counts, denominator, dates, concrete behaviors]
>
> **What supports the interpretation:** [observations and source]
>
> **Counterevidence and confounders:** [what could explain it differently]
>
> **What remains unknown:** [next material risk]
>
> **Next action and limit:** [smallest test, owner, time or cost cap]

If the problem is still uncertain, return to [customer interviews](/wiki/customer-interviews/). If the offer or segment may be wrong, compare [first customer niches](/wiki/choose-a-first-customer-niche/) and [test demand with an honest landing page](/wiki/test-demand-with-a-landing-page/). Use the [experiment brief](/wiki/experiment-brief-template/) before the next test. When behavior supports a real but narrow solution, define the [MVP scope](/wiki/product-scope-mvp/) that can deliver it end to end.
