---
title: "Add payments without trusting the checkout redirect"
description: "A provider-neutral checklist for hosted checkout, verified payment events, subscription states, refunds, and duplicate-safe fulfillment."
slug: payments-and-subscriptions
category: build
kind: article
tags: [payments, subscriptions, operations]
audience: [independent builders, solo founders, small teams]
status: published
evidence: mixed
confidence: moderate
lastVerified: 2026-10-07
reviewBy: 2027-01-07
reviewTrigger: "Recheck after upstream documentation, security advisories, pricing, supported versions, or relevant platform policies change."
related: [build, monetize]
featured: false
seedSources: []
sources:
  - title: "Stripe Checkout Quickstarts"
    url: https://docs.stripe.com/checkout/quickstart
    publisher: "Stripe"
    accessed: 2026-10-07
  - title: "OWASP REST Security Cheat Sheet"
    url: https://cheatsheetseries.owasp.org/cheatsheets/REST_Security_Cheat_Sheet.html
    publisher: "OWASP"
    accessed: 2026-10-07
---

## Prefer a hosted payment flow for a first release

Use a payment provider’s hosted checkout when it fits the product. It reduces the amount of card data your application handles and avoids building a payment form before you have evidence that you need one. Your server should create the checkout session using a price or product identifier it controls. Do not trust a browser-submitted amount, currency, or entitlement.

Before coding, decide what the customer buys, whether the price is one-time or recurring, which currencies and tax regions you support, what happens on cancellation, and how a customer reaches support. These are product and operating choices as much as API details. Provider features, fees, and legal obligations change; verify current terms and seek qualified advice for tax or regulatory questions in the markets you serve.

## Treat payment notifications as the source of fulfillment

The browser’s “success” redirect is not proof of payment. A user can close the tab, alter a URL, or arrive before an asynchronous payment has settled. Configure a server endpoint for signed provider events (webhooks). Verify each signature using the provider’s documented method and a secret stored outside source control. Reject invalid signatures.

Webhook delivery may be repeated or arrive out of order. Store each event identifier with a unique constraint and make processing idempotent. For an order, move through explicit states such as `pending`, `paid`, `refunded`, and `disputed`; do not let an old event move a newer state backward. Acknowledge an event after it has been durably recorded, then process it safely. Build a way to retry failures and compare local records with provider records.

Grant access only from verified server-side state. Keep payment state separate from application authorization: an active subscription may grant a plan entitlement, but every request still needs a valid user identity and permission check. Do not encode sensitive account or price decisions in a success URL.

## Design the subscription lifecycle

Model the states the product actually needs: trialing, active, past due, canceled, and ended may have distinct access behavior. Decide what happens when a card fails, a user cancels mid-period, a refund is issued, or a webhook is delayed. Communicate dates and consequences in the interface. Let customers find invoices and manage cancellation without contacting you if the provider supports it.

Use provider IDs to connect your customer, subscription, and local account; never use email address alone as a stable identity. Avoid storing card numbers. Store only the minimum information your app needs, such as provider customer ID, current entitlement, and event reconciliation metadata. Protect the webhook endpoint against replay through signature timestamp checks as documented by the provider.

## Test the failure paths

Use the provider’s test mode and test event tools. Verify successful payment, abandoned checkout, duplicate event delivery, invalid signature, delayed event, payment failure, cancellation, refund, and a customer returning to the site before the webhook arrives. Ensure a customer cannot gain paid access by editing a request or URL.

At launch, decide who notices webhook failures, how to replay an event, and how a customer can report a charge/access mismatch. Reconcile recent provider events with local entitlements regularly. Payment integration is not finished when checkout works once; it is finished when the common failure paths are observable and recoverable. For the customer-facing decision process, see [handle refund requests and payment disputes](/wiki/handle-refunds-and-payment-disputes/).
