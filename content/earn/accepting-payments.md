---
title: Accepting payments worldwide
description: Merchant of record or payment processor, sales tax and VAT basics, and the realistic options for founders in India, with fees checked against official pages.
type: guide
updated: 2026-10-16
order: 3
nav_title: Accepting payments
time: 13 min read
tags: [payments, stripe, paddle, lemon squeezy, polar, dodo payments, razorpay, merchant of record, vat, gst, sales tax, india, subscriptions]
faq:
  - q: What is a merchant of record?
    a: A company that sells your product to the customer on your behalf. It appears on the customer's statement, charges and pays sales tax, VAT and GST, handles invoices, refunds and chargebacks, and pays you the rest. You pay a higher fee in exchange for not dealing with tax in dozens of countries.
  - q: Can I sign up for Stripe from India?
    a: Stripe says new sign-ups in India are invite-only and handled through its sales team. Many Indian founders use a merchant of record such as Paddle, Lemon Squeezy, Polar or Dodo Payments for international sales, and Razorpay for customers in India.
  - q: Do I need a company to accept payments?
    a: Requirements vary by provider and country. Some accept individuals or sole proprietors; others require a registered company. Check each provider's onboarding requirements before building your checkout around it.
sources:
  - title: "Stripe: How can I open a Stripe account in India?"
    url: https://support.stripe.com/questions/how-can-i-open-a-stripe-account-in-india
  - title: "Paddle: What a merchant of record does"
    url: https://www.paddle.com/paddle-101
  - title: Lemon Squeezy fees
    url: https://docs.lemonsqueezy.com/help/getting-started/fees
  - title: Polar fees
    url: https://polar.sh/docs/merchant-of-record/fees
  - title: Razorpay pricing explained
    url: https://razorpay.com/blog/razorpay-payment-gateway-pricing-explained/
related: [/earn/pricing/, /run/company-and-paperwork/, /tools/payments/]
---

::: note Not tax advice
Tax rules depend on where you and your customers are. Use this page to understand the options, then confirm your situation with an accountant before you sell at scale.
:::

## The first decision: who is the seller?

When someone buys your software, someone is legally the seller. That decides who handles tax.

**Payment processor** ([[tool:stripe]], [[tool:razorpay]]): **you** are the seller. Fees are lower. You register for and collect sales tax, VAT or GST where required, issue invoices, and handle chargebacks.

**Merchant of record** ([[tool:paddle]], [[tool:lemon-squeezy]], [[tool:polar]], [[tool:dodo-payments]], [[tool:stripe-managed-payments]]): **they** are the seller and you are their supplier. Fees are higher, but they handle tax in many countries, invoices, fraud and chargebacks.

For a solo founder selling software to customers in many countries, a merchant of record usually saves more than its extra fee costs, in time, accountant bills and risk. Switch to a processor later if volume makes the fee difference worth the work.

## Fees at a glance

Checked against each provider's own pages in October 2026. Extra fees for international cards, PayPal, currency conversion and payouts often apply; read the linked pages.

| Provider | Type | Standard fee |
| --- | --- | --- |
| Paddle | Merchant of record | 5% + 50¢ per transaction |
| Lemon Squeezy | Merchant of record | 5% + 50¢, plus 1.5% for non-US buyers and 0.5% for subscriptions |
| Polar | Merchant of record | 5% + 50¢ on the free plan; lower on paid plans; +1.5% for non-US cards |
| Dodo Payments | Merchant of record | Percentage plus a small fixed fee, more for international cards |
| Stripe Managed Payments | Merchant of record | Stripe processing plus an extra Managed Payments fee |
| Stripe | Processor | Percentage plus fixed fee, varies by country |
| Razorpay | Processor (India) | 2% domestic, 3% international cards, plus 18% GST on the fee |

## If you are in India

::: india Payments from India
- **Stripe** is invite-only for new Indian businesses. Do not build your checkout around it unless you have an invitation.
- **For customers abroad**, merchants of record that onboard Indian sellers are the common path: compare [[tool:dodo-payments]], [[tool:paddle]], [[tool:lemon-squeezy]] and [[tool:polar]], and check each one's current onboarding requirements and payout options to Indian bank accounts.
- **For customers in India**, [[tool:razorpay]] supports UPI, which is how most Indians pay. You are the merchant, so GST registration and invoices are your job once you cross the thresholds that apply to you.
- Money received from abroad for services may have specific GST and foreign exchange reporting rules. Ask a chartered accountant early; it is cheaper than fixing it later.
:::

## Subscriptions done right

- [ ] Prices, plans and limits are checked on your server, never trusted from the browser.
- [ ] Webhooks are verified with the provider's signature.
- [ ] Each webhook event is processed once, even if it arrives twice.
- [ ] Failed payments trigger retries and polite emails before access is removed.
- [ ] Upgrades, downgrades, cancellations and refunds update access correctly.
- [ ] Customers can manage billing and download invoices themselves (most providers have a hosted portal).
- [ ] Mobile in-app subscriptions go through the app stores, ideally via [[tool:revenuecat]].

## Pick and move on

Do not spend weeks choosing. Pick a merchant of record that accepts your country and your product type, ship a checkout, and get your first paying customer. Changing provider later is a manageable project; not charging at all is the expensive mistake.
