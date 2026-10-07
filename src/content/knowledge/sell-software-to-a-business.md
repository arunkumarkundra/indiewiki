---
title: "Sell a small software product to a business"
description: "Map the people, evidence, approvals, and bounded pilot that turn a business user's interest into a real software purchase."
slug: sell-software-to-a-business
category: sales
kind: recipe
tags: [b2b, sales, procurement, security]
audience: [independent builders, solo founders, small teams]
status: published
evidence: primary
confidence: moderate
lastVerified: 2026-10-07
reviewBy: 2027-04-07
reviewTrigger: "Recheck when buyer-security guidance, procurement practices, or the product's data and delivery model materially changes."
related: [sales, validate, business]
featured: false
seedSources: []
sources:
  - title: "Software Security Code of Practice"
    url: https://www.gov.uk/government/publications/software-security-code-of-practice/software-security-code-of-practice
    publisher: "UK Department for Science, Innovation and Technology"
    accessed: 2026-10-07
  - title: "Managing your connected place’s procurement and supply chain"
    url: https://www.gov.uk/government/publications/secure-connected-places-smart-cities-guidance-collection/managing-your-connected-places-procurement-and-supply-chain
    publisher: "UK Government"
    accessed: 2026-10-07
---

## Understand how the buyer buys

Business interest is not yet a purchase. The person who uses a tool may not own the budget, approve a supplier, review security, or sign the agreement. Early in discovery, map the likely participants:

| Role | Question to answer |
| --- | --- |
| User | Who has the problem and will use the product day to day? |
| Champion | Who will explain the value internally and keep the evaluation moving? |
| Budget owner | Which person or cost centre can authorize spend, and when? |
| Technical/security reviewer | What data, access, integration, and resilience evidence do they need? |
| Procurement/legal approver | Is vendor registration, a purchase order, contract review, or insurance evidence required? |

One person may cover several roles in a small company. Ask rather than assume: “If the pilot works, what steps and people are needed to approve the purchase?” Also ask about the current workaround, cost of the problem, urgency, budget cycle, decision date, and the next action each person has agreed to take.

If there is no identifiable user, buyer, problem event, budget path, or next meeting, keep the opportunity in discovery. Do not spend weeks building custom features for a prospect who cannot explain how a decision will be made.

## Qualify the job and the buying path

Write a short account note before preparing a proposal:

```text
Organisation and segment:
User and current workflow:
Problem trigger and cost of leaving it unsolved:
Current alternative or supplier:
Champion and budget owner:
Approval / procurement / security steps:
Data and integrations involved:
Decision date and budget timing:
Smallest useful outcome to prove:
Agreed next action, owner, and date:
```

Confirm that the proposed tool fits the buyer’s actual environment. A product that saves time but requires a blocked integration, prohibited data transfer, or a new security exception may not be viable. Ask what would prevent purchase before you build around assumptions.

## Prepare evidence you can honestly provide

Before a security or procurement review, assemble a concise trust pack that matches the maturity of the product:

- product purpose, hosting model, data flow, and data categories;
- account access and administrative controls, backup and recovery approach, incident contact, and support boundaries;
- subprocessors and regions where data is stored or processed, if known;
- retention, export, deletion, and account-closure process;
- uptime and maintenance commitments you can actually meet;
- current terms, privacy information, and a data-processing agreement if applicable;
- known gaps, planned controls, and the date each statement was checked.

Do not claim a certification, audit, legal compliance, service level, or security control you cannot substantiate. If you do not know an answer, say so, identify how you will find it, and do not accept data or promise a control until the issue is resolved.

The UK Software Security Code of Practice, updated in January 2026, is a **voluntary UK government code** for software providers and is most relevant to proprietary B2B software relationships. It covers secure development, build environments, maintenance, and customer communications; it says buyers can use its principles to inform supplier negotiations. It is a useful example of the questions a buyer may ask, not a universal law or a certification. Public-sector and regulated buyers may have additional requirements. The UK guidance on connected-place procurement similarly offers a buyer-side lens for supplier security and supply-chain review, but applies to its public-sector context.

## Offer a bounded first purchase

When the buyer needs proof before a larger commitment, propose a paid pilot with one outcome, one team, limited duration, named responsibilities, and clear exit. State what is manual, which integrations or data are excluded, how success will be observed, what support is included, and what happens to data at the end. Get the buyer’s procurement and security steps into the schedule before promising a start date.

See [run a transparent paid pilot](/wiki/run-a-transparent-paid-pilot/) for a scope template. Do not provide open-ended unpaid implementation or bespoke development as a condition of “evaluation.” If a small proof requires substantial custom work, price and scope it as a separate service or decline it.

## Move from evaluation to decision

At each meeting, recap the buyer’s stated outcome, unresolved risk, owner, and next decision date. Send a short proposal that connects scope and price to the agreed problem, and include payment terms, support limits, dependencies, data handling, and acceptance criteria. Ask whether procurement needs a quote, vendor form, purchase order, or contract review; these steps can take longer than product setup.

If the pilot succeeds, review actual use, support time, security questions, and willingness to renew or expand. Decide whether the offer is repeatable. If the buyer does not proceed, ask which condition failed—budget, timing, evidence, implementation, or value—and update the segment or product hypothesis rather than hiding the loss in a generic “not now.”

For acquisition, see [choose a first channel](/wiki/choose-a-first-acquisition-channel/). For pricing, see [price a small software product](/wiki/price-a-small-software-product/). Contracts, procurement law, privacy requirements, and tax obligations vary by country, sector, and data; get qualified advice where the exposure or commitment is material.
