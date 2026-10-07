---
title: "Calculate contribution margin for a small software product"
description: "Estimate what each customer contributes after direct variable costs, then use cautious scenarios to understand break-even and pricing trade-offs."
slug: calculate-contribution-margin-for-a-small-product
category: monetize
kind: recipe
tags: [unit-economics, contribution-margin, pricing]
audience: [independent builders, solo founders, small teams]
status: published
evidence: mixed
confidence: moderate
lastVerified: 2026-10-07
reviewBy: 2027-04-07
reviewTrigger: "Recheck when pricing, payment fees, infrastructure or model usage, service labor, refund patterns, or accounting treatment changes."
related: [monetize, business, operate]
featured: false
seedSources: []
sources:
  - title: "Break-even point"
    url: https://www.sba.gov/counseling/plan-your-business/
    publisher: "U.S. Small Business Administration"
    accessed: 2026-10-07
---

## Find what one customer contributes

Revenue is not the same as money available to pay the founder or cover the business. For a chosen period and customer type, estimate:

> **Contribution per customer = net revenue from that customer − variable costs of serving that customer**
>
> **Contribution margin = contribution per customer ÷ net revenue**

Use revenue after discounts, refunds, and credits, and separate taxes collected on behalf of a government where applicable. The U.S. Small Business Administration’s [break-even guidance](https://www.sba.gov/counseling/plan-your-business/) presents the same core relationship between price, variable cost, contribution, and fixed cost. It is a planning model, not a substitute for local accounting or tax treatment.

For a software product, direct variable costs may include payment processing, usage-based hosting or AI/API calls, storage and egress, per-message email or SMS, support or onboarding labor that rises with customer count, commissions, and expected refunds or chargebacks. Include a cost only once. Separate fixed subscriptions and general overhead (such as a base hosting plan or bookkeeping) from costs that rise with a customer or their usage. If a service has a minimum plus a per-use charge, split the fixed and variable parts or model the thresholds explicitly.

## Build a per-customer cost sheet

For each plan or meaningful customer segment, record the period, price, discounts, usage assumptions, payment terms, variable cost source, and date checked. Estimate at low, expected, and high usage rather than treating the lightest free-tier customer as typical. Use current provider invoices and official pricing pages; usage limits and payment fees change.

Example for one illustrative monthly plan:

| Item | Per customer / month |
| --- | ---: |
| Net subscription revenue | $24.00 |
| Payment fee assumption | −$1.20 |
| Incremental hosting and storage | −$0.80 |
| Email/API usage | −$1.00 |
| Average support time valued at an internal rate | −$3.00 |
| **Contribution** | **$18.00** |

Contribution margin is $18 ÷ $24 = **75%**. These amounts are invented for the example, not current market prices. If you leave founder support time at zero, the apparent contribution becomes $21, but the product may be subsidized by unpaid labor. Show cash costs and an owner-time-adjusted view separately so each answers the question you actually have.

## Estimate a break-even scenario

For one plan and stable per-customer contribution:

> **Break-even customers in a period = fixed costs in that period ÷ contribution per customer in that period**

Suppose monthly fixed operating costs are $900. At $18 contribution per customer, about 50 customers cover those listed fixed costs: $900 ÷ $18 = 50. If you also include a $3,600 monthly target for founder compensation as a fixed requirement, the scenario becomes $4,500 ÷ $18 = 250 customers. Neither calculation includes omitted taxes, debt payments, one-time costs, churn, unpaid invoices, or changes in plan mix unless you add them.

With several plans, estimate expected customer mix and calculate total contribution across that mix; a single average can hide a costly high-usage plan. For usage-based or AI products, model a heavy-but-plausible customer and set pricing, limits, and alerts so usage cannot silently erase margin. For annual prepayment, compare cash collected with the ongoing service obligation; cash arriving early is not all profit.

## Turn the result into a decision

Low contribution can signal a price problem, costly delivery, a plan that attracts heavy users, excessive manual service, or a segment that values a different outcome. Test the cause before making a blanket price increase. Try a realistic customer scenario against current provider bills and track support time after a paid pilot. Compare plan margins alongside refunds, activation, retention, and acquisition costs.

Contribution margin is not net profit, cash runway, or a formal financial statement. Cost classifications differ by accounting method and jurisdiction; consult a qualified bookkeeper or accountant for reporting, tax, and financing decisions. Use [pricing a small software product](/wiki/price-a-small-software-product/), [transparent paid pilots](/wiki/run-a-transparent-paid-pilot/), and [business basics](/wiki/business-basics-for-indies/) to connect the calculation to the offer and operating plan.
