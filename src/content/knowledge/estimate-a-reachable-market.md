---
title: "Estimate a reachable market from the bottom up"
description: "Build an auditable market estimate from the buyers you can identify and serve, then show the assumptions and uncertainty."
slug: estimate-a-reachable-market
category: start
kind: recipe
tags: [market-research, market-sizing, customer-segments]
audience: [independent builders, solo founders, small teams]
status: published
evidence: mixed
confidence: moderate
lastVerified: 2026-10-07
reviewBy: 2027-04-07
reviewTrigger: "Recheck when segment definitions, regional data sources, pricing assumptions, or market entry constraints change."
related: [start, validate, monetize]
featured: false
seedSources: []
sources:
  - title: "County Business Patterns Datasets"
    url: https://www.census.gov/programs-surveys/cbp/data/datasets.html
    publisher: "U.S. Census Bureau"
    accessed: 2026-10-07
  - title: "Market research and competitive analysis"
    url: https://www.sba.gov/counseling/plan-your-business/
    publisher: "U.S. Small Business Administration"
    accessed: 2026-10-07
---

## Size the opportunity you can actually reach

An early market estimate is a planning model, not evidence that customers want the product. The useful question is narrower than “How large is the industry?”: how many people or organizations have this specific problem, fit the product’s constraints, can be reached through a plausible channel, and could pay the price you are testing?

Start with the segment definition from [choose a problem worth solving](/wiki/choose-a-problem-worth-solving/). Write the inclusion rules before counting: job or role, organization type or user situation, relevant workflow, geography, size, and any requirement such as a particular system or regulation. This prevents an easy-to-find statistic from quietly expanding the target to everyone.

## Make the estimate auditable

Use a spreadsheet with one row per filter and source:

| Step | Count or assumption | Evidence to record |
| --- | --- | --- |
| Eligible population | Firms or people matching the segment | Dataset, date, geography, definition |
| Actually serviceable | Share with a reachable workflow and supported constraints | Interviews, directories, product capability |
| Reachable in a year | Qualified prospects your chosen channels could expose | Channel capacity and observed response |
| Plausible annual value | Price and expected purchase pattern | Current offer and pricing evidence |

Then show several distinct quantities instead of one impressive total:

- **Potential annual category value:** eligible buyer count × plausible annual price. This is an upper-bound model and assumes far more adoption than a new product can claim.
- **Reachable qualified prospects:** prospects you can realistically contact or attract over a stated period, after your segment filters.
- **Near-term obtainable revenue scenario:** reachable prospects × an explicitly assumed conversion range × annual price.

For example, suppose an independent scheduling product targets 1,200 clinics in a chosen region, but only 300 match the supported size and software requirements. If a founder can reach 90 of those clinics this year, and uses an unproven 5–10% purchase assumption at $240 per year, the modeled first-year revenue range is $1,080–$2,160. Those numbers are scenario inputs, not forecasts or validated conversion rates. Replace each assumption with observed evidence as it arrives.

## Choose data that matches the segment

Use a country’s official statistics office, professional registries, trade bodies, licensing lists, or well-defined directories. Check what a record represents: establishment, legal entity, employee, household, account, or transaction. A directory may include inactive entries; a business census may omit sole proprietors or unregistered activity. The U.S. Census Bureau’s [County Business Patterns](https://www.census.gov/programs-surveys/cbp/data/datasets.html), for instance, reports establishment counts by geography, industry, and employment size, but its universe is establishments with paid employees. It will not count every potential software buyer.

Record the source date, categories, exclusions, and any conversion from “establishments” to “likely buyers.” If the data is old or category definitions do not map to your segment, use it as a range or go count a sample of actual prospects. Do not multiply an unrelated global industry statistic by a guessed market share and present it as a business case.

## Use the estimate to choose a next action

Create low, base, and high cases; change one uncertain assumption at a time. Ask which uncertainty matters most: the count of eligible buyers, access to them, willingness to pay, or the ability to deliver. If the count is small but reachable, a focused business may still work. If the apparent market is large but you cannot identify or contact the buyer, the current opportunity is not yet actionable.

Update the sheet after interviews, a channel experiment, or a priced offer. Use [competitor and workaround research](/wiki/research-competitors-and-workarounds/) to refine alternatives, then run a concrete [demand experiment](/wiki/idea-to-first-experiment/). The estimate helps decide where to learn; it does not replace that learning.
