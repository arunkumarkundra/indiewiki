---
title: "Design a useful customer survey"
description: "Use a survey for a bounded product question, write neutral questions, pretest the form, recruit deliberately, and report the limits of the sample."
slug: design-a-useful-customer-survey
category: validate
kind: recipe
tags: [surveys, customer-research, validation, sampling]
audience: [independent builders, solo founders, small teams]
status: published
evidence: multiple-sources
confidence: high
lastVerified: 2026-10-07
reviewBy: 2027-04-07
reviewTrigger: "Recheck when AAPOR, Pew, or Census guidance on sampling, question design, or pretesting materially changes, or when new authoritative evidence changes this workflow."
related: [validate, start, product]
featured: false
seedSources: []
sources:
  - title: "Best Practices for Survey Research"
    url: https://aapor.org/standards-and-ethics/best-practices/
    publisher: "American Association for Public Opinion Research"
    accessed: 2026-10-07
  - title: "Writing Survey Questions"
    url: https://www.pewresearch.org/writing-survey-questions/
    publisher: "Pew Research Center"
    accessed: 2026-10-07
  - title: "Questionnaire Testing and Evaluation Methods for Censuses and Surveys"
    url: https://www.census.gov/about/policies/quality/standards/appendixa2.html
    publisher: "U.S. Census Bureau"
    accessed: 2026-10-07
---

## Use a survey only when a survey can answer the question

A survey is useful when you already understand the problem well enough to ask a consistent set of questions across a defined group. It can help describe how often a reported behavior occurs in your recruited sample, compare known subgroups, or identify people for follow-up. It is usually a poor first tool for discovering an unfamiliar workflow, explaining why people behave as they do, proving demand, or forecasting revenue. Interviews and observation are better for learning the language and missing options that a survey would otherwise force respondents to guess.

Before writing questions, finish this sentence:

> I will survey **[defined group]** to learn **[one decision-relevant fact]** so I can decide **[next action]**. The survey will not establish **[claim this method cannot support]**.

For example: “I will survey independent bookkeepers who reconciled expenses for a client in the past 30 days to learn which steps most often require rework, so I can decide which workflow to observe next. This survey will not prove how many bookkeepers will buy a product.” If you cannot name the population, decision, and limit, return to [customer interviews](/wiki/customer-interviews/) or [niche research](/wiki/choose-a-first-customer-niche/) first.

## 1. Define the people you need to hear from

Write down:

- **Target population:** the people or organizations the decision is about, with geography and relevant date range.
- **Eligibility:** observable rules that include a respondent, such as having completed a specific task recently.
- **Sampling frame or source:** the list, community, customer base, panel, or referrals through which people can be invited.
- **Exclusions:** people who do not meet the task or role criteria, duplicate responses, test submissions, and how you will identify them.
- **Recruitment limitations:** who is missing or overrepresented in that source, and whether respondents self-select because they already know you or care about the topic.

Do not call a social post, mailing-list, or customer survey “representative” just because it has many responses. [AAPOR distinguishes probability samples](https://aapor.org/standards-and-ethics/best-practices/), where people are selected through a sampling frame using random methods, from nonprobability samples such as opt-in panels, social-media recruits, and personal networks. Nonprobability findings may still be useful for product learning, but they require careful interpretation and transparent description. For most early IndieWiki readers, an online convenience survey should be reported as **directional evidence from this recruited group**, not an estimate of the whole market.

The number of completed forms does not repair selection bias. If you cannot reach the broader population or do not know who had a chance to respond, do not calculate or imply a margin of error as if the sample were randomly drawn. Use the survey to learn about the people who answered, then follow up with interviews or a more deliberate sample.

## 2. Write questions about behavior before opinions

Ask about a bounded recent event before asking about a proposed feature. A useful sequence is:

1. **Screen:** “Have you personally reconciled a client’s expense records in the last 30 days?” Route people who have not done the task out of the behavior questions.
2. **Recall:** “Think about the most recent reconciliation. When did it happen?”
3. **Process:** “Which of these steps did you personally perform?” Provide a clear list plus “other” and “not sure.”
4. **Friction:** “Which step, if any, took longer than you expected or had to be repeated?” Include “none” and “not sure.”
5. **Frequency:** “In the past 30 days, how many reconciliations did you complete?” Offer ranges that do not overlap and cover plausible answers.
6. **Current alternative:** “What did you use for the step that took the most effort?” Allow a free-text answer before presenting a list, or provide “other” so the survey does not define the only acceptable answers.
7. **Buyer and decision:** if relevant, ask separately who uses, chooses, and approves payment for the current tool.

Do not introduce your concept before the behavior questions. Showing the feature first can prompt respondents to reinterpret or overstate the problem. If you also need feedback on a concept or price, put it in a separate, clearly labeled section and treat those answers as reactions to the description, not as purchase evidence.

[Pew Research Center’s questionnaire guidance](https://www.pewresearch.org/writing-survey-questions/) documents that wording, answer choices, question order, and open- versus closed-ended formats can change what people report. AAPOR similarly recommends specific, single-concept, neutral questions and response categories that are mutually exclusive, reasonably complete, and logically ordered. Apply that guidance to each item:

- Ask about **one idea at a time**. Split “How often and how difficult is the process?” into separate questions.
- Use **plain, concrete terms** familiar to the audience. Replace “operationalize” or “workflow automation” with the actual task.
- Set a **recall period** people can answer accurately: last time, past week, or past 30 days. Do not ask for vague “typical” behavior when a recent instance is available.
- Avoid **leading claims** such as “How much time would our tool save?” Ask what they did and how long it took before describing a tool.
- Make closed options **non-overlapping and inclusive**. Add “none,” “not applicable,” “don’t know,” or “other” where appropriate; do not force a false answer.
- Avoid using **agree/disagree** statements as a shortcut for measuring need. They invite acquiescence and do not show behavior.
- Keep response lists short when practical. Randomize unordered choices when order could influence selection; keep ordered scales in a meaningful sequence.
- Ask sensitive or identifying questions only when necessary, explain why, and place them after the more relevant task questions unless they are needed for eligibility.

## 3. Keep it short and pretest it

Every question should support the stated decision, define the sample, or explain a response. Remove questions that are merely interesting. A shorter survey is easier to complete and easier for one builder to analyze carefully.

Before sending it to the intended group, ask a few people who resemble the respondents to complete it while you watch or talk through their interpretation. Ask:

- What did you think this question meant?
- What time period did you use to answer it?
- How did you choose between these options?
- Was your answer missing from the list?
- Did a previous question change how you interpreted this one?

This is a cognitive pretest: it checks whether questions elicit the meaning you intend, rather than whether the respondent agrees with you. The [U.S. Census Bureau’s questionnaire-testing guidance](https://www.census.gov/about/policies/quality/standards/appendixa2.html) describes cognitive interviews and respondent debriefing as ways to identify interpretation problems; [AAPOR likewise recommends pretesting with people similar to the target respondents](https://aapor.org/standards-and-ethics/best-practices/). Change unclear items, then test the revised wording. Do not treat a quick internal review as respondent pretesting.

Next, run the form yourself on a phone and desktop. Check eligibility routing, required versus optional answers, completion time, keyboard and screen-reader labels where possible, consent text, broken links, and how incomplete submissions appear in the export. If you changed wording after a pilot, note that responses before and after the change may not be comparable.

## 4. Recruit without misleading or pressuring people

Use a short invitation that says who should respond, what the survey is about, how long it takes, whether there is an incentive, and how you will use the answers. Do not call a sales pitch research or imply the survey is anonymous if email addresses, account IDs, or link tracking can identify respondents.

Collect only what you need. If you want an interview volunteer, make the contact field optional and separate it from survey answers when practical. State who can see the responses, whether you will quote them, how long raw data will be kept, and how to stop. Avoid requesting client names, health or financial details, passwords, confidential documents, or other information unnecessary to the decision.

Share a survey with a defined group, not everywhere at once. Record each recruitment source separately when possible; a response from your existing users may mean something different from a response from an independent professional community. Do not repeatedly contact people who declined or use a prize drawing that attracts respondents outside your intended group without accounting for it.

## 5. Read the results with the denominator visible

Before analysis, remove only entries covered by rules you defined in advance, such as duplicate or ineligible responses. Report how many invitations or eligible visits you know about, how many started and completed the survey, the field dates, sources, exclusions, and any changes to the questionnaire. If you cannot count invitations, say that the response rate is unknown.

For every percentage, show the base: “8 of 17 eligible respondents in our customer newsletter selected manual spreadsheet cleanup” is interpretable. “47% of bookkeepers” is not supported by that sample. Show missing answers and small subgroup counts; avoid ranking tiny differences as meaningful. Do not weight or rebalance a convenience sample to look representative unless you have a defensible design and understand the assumptions.

Use the results to find the next question:

- If one response pattern appears often, interview people on both sides of it and observe a recent task.
- If the results differ by a plausible segment, verify that the split was not caused by recruitment source or a changed question.
- If many people choose “other,” review the free-text answers and revise the response options before repeating the survey.
- If answers are missing or respondents abandon at one item, check whether the question is unclear, sensitive, or unnecessarily difficult.
- If people claim strong interest but have no recent behavior or commitment, test behavior through a [prototype](/wiki/prototype-a-risky-product-workflow/), transparent [intent test](/wiki/run-an-honest-waitlist-or-intent-test/), or paid pilot as appropriate.

Do not call an exploratory survey a demand forecast. [AAPOR’s survey best practices](https://aapor.org/standards-and-ethics/best-practices/) recommend pretesting, monitoring data quality throughout collection, and reporting methodology clearly; use [the experiment decision guide](/wiki/decide-what-an-experiment-result-means/) to record what this survey can and cannot change. Keep the questionnaire, recruitment message, raw counts, exclusions, and decision note together so a future reader can reproduce the interpretation.
