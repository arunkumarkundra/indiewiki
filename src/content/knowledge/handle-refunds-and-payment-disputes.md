---
title: "Handle refund requests and payment disputes"
description: "Set a clear refund workflow, resolve customer problems promptly, and prepare accurate evidence when a card payment is disputed."
slug: handle-refunds-and-payment-disputes
category: monetize
kind: recipe
tags: [refunds, chargebacks, payments, customer-support]
audience: [independent builders, solo founders, small teams]
status: published
evidence: multiple-sources
confidence: moderate
lastVerified: 2026-10-07
reviewBy: 2027-01-07
reviewTrigger: "Recheck processor refund and dispute flows, card-network rules, and consumer-law requirements in the markets served."
related: [monetize, operate, build]
featured: false
seedSources: []
sources:
  - title: "Create a refund"
    url: https://docs.stripe.com/api/refunds/create
    publisher: "Stripe Docs"
    accessed: 2026-10-07
  - title: "Dispute sample evidence packets"
    url: https://docs.stripe.com/disputes/visual-evidence
    publisher: "Stripe Docs"
    accessed: 2026-10-07
  - title: "Resolve payment disputes quickly"
    url: https://www.visa.com/en-us/support/business/dispute-resolution
    publisher: "Visa"
    accessed: 2026-10-07
---

## Treat the request as a service problem first

A refund request is a chance to understand a mismatch between what the customer expected and what they received. Respond promptly, find the transaction and the offer shown at purchase, understand what went wrong, and explain the next step and timing. A quick, respectful resolution can be less costly than a prolonged dispute, even when your published policy does not require a refund.

Before you decide, check the terms the customer actually saw, the product or service status, the payment and refund state, and the consumer rules that apply to the customer, seller, and product. A policy cannot remove rights that local law grants. Do not apply a blanket “no refunds” rule without checking those obligations. If you cannot confidently assess a material legal question, ask a qualified local professional.

## Use a consistent refund workflow

1. **Acknowledge and identify.** Confirm receipt of the request and locate the payment using an order or processor ID. Ask only for information needed to identify the transaction; never request full card details by email.
2. **Understand the reason.** Is the customer unable to access the product, charged twice, surprised by renewal, dissatisfied with the result, or asking under a legal cancellation right? Resolve account or billing errors before debating policy.
3. **Check obligations and history.** Review the purchase terms, cancellation record, delivery/access history, prior support, processor status, and applicable law. Check for an existing dispute before starting a refund so the payment is not returned twice through separate processes.
4. **Decide and explain.** Approve, partially refund, or decline based on the terms and law. If declining, explain the specific basis and offer a practical remedy when possible. Never invent usage records or alter the policy after the sale.
5. **Issue through the payment provider.** Use the original transaction and the provider’s supported refund method. Stripe, for example, supports partial refunds up to the amount still refundable; other providers differ.
6. **Confirm the final state.** A refund can remain pending or later fail depending on provider and payment method. Stripe documents asynchronous live refunds that can change from pending to succeeded or from an apparent success to failed. Tell the customer it is complete only when the provider’s current status supports that statement; otherwise give the pending status and a date to check again.
7. **Record and learn.** Log the request date, reason, decision, amount, provider reference, status, and any product fix. Limit access and retention to what the business needs.

Use a simple ledger:

| Request date | Order / payment reference | Reason | Decision and basis | Amount | Provider status | Follow-up date |
| --- | --- | --- | --- | ---: | --- | --- |

Review reasons monthly. A cluster of requests after renewal, onboarding, or a particular feature may point to a confusing offer or product defect. Track the denominator (paid orders or renewals) as well as the count; a raw count alone can mislead.

## Respond to a card dispute

A cardholder typically raises a dispute with their issuer; the seller receives a response window through its acquirer or processor. Follow the deadline and instructions shown in that specific case. The timing, evidence fields, fees, and procedures vary by processor, payment method, card network, country, and dispute reason. Visa advises merchants to respond promptly and consult their acquirer for the applicable process.

When notice arrives:

1. Open the case in the processor or acquirer account and record the stated reason, amount, deadline, and required submission method.
2. Check whether the customer has already contacted you, canceled, received a refund, or had access to the product. If appropriate, contact them calmly to understand the concern and resolve it; do not pressure them to withdraw a dispute.
3. Decide whether to accept the dispute or submit a response. Compare the amount at stake with the time and evidence available, but do not assume a particular win rate.
4. If responding, match each item to the stated reason. For “product not received,” show delivery/access and timeline; for “subscription canceled,” show the terms and cancellation record; for “credit not processed,” show the refund transaction and its current state. Include a short chronology and only relevant records.
5. Submit before the case deadline, save the exact evidence submitted, and record the eventual outcome. Do not submit sensitive data that is irrelevant, private information about other customers, or claims the records cannot support.

Stripe’s evidence examples show why evidence should fit the dispute category, including purchase terms, customer communication, service/access records, and refund records. They are provider guidance, not a guarantee that a network or issuer will decide for the merchant. A dispute can still be lost even when evidence is submitted.

## Prevent avoidable cases

Make the billing descriptor recognizable. Before checkout, state price, billing interval, renewal, cancellation steps, what the product delivers, and how to get help. Send receipts and renewal notices where required or appropriate. Provide an easy cancellation path and keep a dated copy of the policy presented at purchase. Monitor failed access and duplicate-charge reports. The implementation details belong in [payments and subscriptions](/wiki/payments-and-subscriptions/); this page covers the customer and operations workflow.

## Keep the rules in scope

Consumer cancellation rights, tax treatment, evidence handling, and payment-network rules are location- and product-specific. Confirm current requirements with regulators, the acquirer, and the payment provider for the markets served. See [business basics](/wiki/business-basics-for-indies/) and [run a transparent paid pilot](/wiki/run-a-transparent-paid-pilot/) before accepting money for work with uncertain delivery.
