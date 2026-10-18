---
title: Email on your custom domain
description: Get you@yourdomain.com working for sending and receiving, for free or cheaply, and what to do now that Gmail is ending "Send mail as" in January 2027.
type: guide
updated: 2026-10-16
order: 3
time: 15 min read, 30 min to set up
tags: [email, custom domain, gmail, send mail as, zoho, google workspace, forwarding, spf, dkim, dmarc, namecheap, porkbun]
faq:
  - q: Can I still use Gmail's "Send mail as" with my domain address?
    a: Google says Gmail will stop supporting "Send as" for third-party addresses in January 2027, and reports say new setups may already be restricted. Addresses on your own domain added to a personal Gmail account are affected. Google Workspace aliases are not. Plan a move now.
  - q: What is the cheapest way to send and receive as my domain?
    a: Zoho Mail's Forever Free plan gives up to 5 mailboxes on one domain, used through the Zoho website and apps. If you want to use Gmail's interface, Google Workspace is the paid option.
  - q: Is email forwarding enough?
    a: Only for receiving. Forwarding sends mail for hello@yourdomain.com to your personal inbox, but your replies come from your personal address, which looks less professional and can confuse customers.
  - q: My emails go to spam. What do I check first?
    a: Check that the domain has exactly one SPF record, that DKIM is turned on in your email provider, and that a DMARC record exists. Most providers show a green tick for each once they are correct.
sources:
  - title: "Gmail Help: Send emails from a different address or alias"
    url: https://support.google.com/mail/answer/22370
  - title: "Android Authority: Google is ending Gmail's third-party Send as feature"
    url: https://www.androidauthority.com/gmail-killing-third-party-send-as-feature-3694659/
  - title: Zoho Mail pricing and Forever Free plan
    url: https://www.zoho.com/mail/zohomail-pricing.html
  - title: Cloudflare Email Service pricing
    url: https://developers.cloudflare.com/email-service/platform/pricing/
related: [/setup/dns-explained/, /setup/choose-a-domain/, /build/production-readiness/]
---

An address like `hello@yourproduct.com` builds trust with customers, app stores and payment providers. Getting it to **receive** mail is easy and free. Getting it to **send** mail that lands in the inbox takes a little more care.

::: warning Gmail is ending "Send mail as" for outside addresses
A popular free setup was: forward your domain's mail to a personal Gmail account, then use Gmail's **Send mail as** setting (with Gmail's own SMTP server and an app password) to reply as your domain. Google's help page now says that from **January 2027** Gmail will no longer support "Send as" for third-party addresses, and reports indicate new setups may already be blocked. Gmail's "check mail from other accounts" (POP) and Gmailify are going too. If you rely on this today, move before January 2027 using one of the options below. Google Workspace aliases and Gmail-to-Gmail aliases keep working.
:::

## Choose your setup

| Option | Receive | Send as your domain | Cost | Best for |
| --- | --- | --- | --- | --- |
| [[tool:zoho-mail]] Forever Free | Yes | Yes | Free, up to 5 users | Most solo founders |
| [[tool:google-workspace]] | Yes | Yes | Per user per month | People who want Gmail itself |
| Forwarding only ([[tool:cloudflare-email-routing]] or your registrar) | Yes | No | Free | Contact addresses you rarely answer from |
| [[tool:fastmail]] or [[tool:proton-mail]] | Yes | Yes | Paid | Privacy, or using any email app |

If you want a free inbox today, use Zoho. If you already pay for Google Workspace, add the address there. Compare all of them in [Email on your own domain](/tools/email-inboxes/).

## Option A: Zoho Mail Forever Free

The free plan covers up to 5 users with 5 GB each on one domain. You read and send in the Zoho website and the Zoho Mail mobile app. It does **not** include IMAP or POP, so you cannot connect it to Gmail, Outlook or Apple Mail.

::: steps
1. **Sign up for the free plan.** On the Zoho Mail pricing page, find the **Forever Free** plan (it is listed separately from the paid plans) and sign up with the domain you own.
2. **Verify the domain.** Zoho shows a TXT record. Add it in your DNS (at your registrar, or in Cloudflare if your nameservers point there), then click **Verify** in Zoho.
3. **Create your mailbox.** Choose the address, for example `hello@yourproduct.com`. Add more users or group addresses (such as `support@`) if you need them.
4. **Add the MX records.** Zoho lists two or three MX records with priorities. Remove any old MX records (including your registrar's forwarding ones) and add Zoho's exactly. The server names depend on your Zoho data centre, so copy them from your own Zoho screen.
5. **Add SPF.** Add the TXT record Zoho gives you for SPF. If you already have an SPF record (for example for an app email service), merge them into one record instead of adding a second.
6. **Turn on DKIM.** In the Zoho admin console under domain settings, generate a DKIM key, add it to DNS as a TXT record, then verify.
7. **Add DMARC.** Add a TXT record named `_dmarc` with `v=DMARC1; p=none; rua=mailto:hello@yourproduct.com`. Raise `p=none` to `p=quarantine` after a few weeks once reports look clean.
8. **Install the app and send a test** to a Gmail address and an Outlook address. Open the message, choose "Show original" (Gmail) and check that SPF, DKIM and DMARC all say PASS.
:::

::: tip Keep receiving at your old address during the switch
DNS changes for MX records can take up to an hour to spread. Do the switch at a quiet time, and send yourself test messages from another account until mail arrives in Zoho.
:::

## Option B: Google Workspace

Workspace gives you Gmail, Calendar and Drive on your domain, billed per user per month (yearly billing is cheaper). Signing up walks you through verifying the domain and adding Google's MX, SPF and DKIM records. Instead of paying for several users, add extra addresses such as `support@` and `billing@` as **aliases** or **groups** of your one user. Sending as those aliases is supported and is not affected by the 2027 change.

## Option C: forwarding only

If you just need a contact address that forwards somewhere, forwarding is enough and free:

- **At your registrar.** Porkbun and Namecheap include basic email forwarding. Turn it on in the domain's settings and add the forward.
- **At Cloudflare.** If your DNS is on Cloudflare, Email Routing forwards unlimited addresses to verified destinations at no cost.

Replies will come from your personal address. That is acceptable for a `feedback@` address; it is not ideal for customer support or business partners.

::: danger Do not point MX records at two providers
Mail goes to whichever MX record answers first, so mixing a forwarding service and a mailbox provider loses mail at random. Choose one provider for each domain or subdomain.
:::

## If you use the old Gmail "Send mail as" setup today

- Keep it working for now, but **start the move this quarter**, not in December 2026.
- Set up Zoho or Workspace on the same domain (Option A or B). Your MX records move to the new provider, so forwarding to Gmail stops; mail arrives in the new inbox instead.
- If you want to keep reading everything in one place, the mobile Gmail app can still show other accounts, and desktop apps like Thunderbird handle several accounts. Sending as your domain will come from the new provider.
- Update the address on services that send you important mail (registrar, bank, app stores, payment provider) only after you have confirmed you can receive at the new inbox.

## Your app's emails are a separate job

Password resets, receipts and notifications from your product should go through an email sending service such as [[tool:resend]] or [[tool:brevo]], not through your personal inbox. They need their own DKIM records and should be included in your one SPF record. Many founders send app email from a subdomain such as `mail.yourproduct.com` to keep it separate from people's mail. See [Sending email from your app](/tools/transactional-email/).
