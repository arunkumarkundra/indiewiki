---
title: App store submission checklist
description: What Apple and Google check before approving your app, the requirements that cause most first-time rejections, and how to prepare your listing and review notes.
type: checklist
updated: 2026-10-16
order: 4
nav_title: App store submission
time: 1 day of preparation
tags: [app store, google play, app review, rejection, privacy label, data safety, account deletion, sign in with apple, testflight, age rating]
faq:
  - q: What are the most common App Store rejections for small apps?
    a: Crashes and broken links, missing or vague privacy information, no in-app account deletion, social login without a privacy-friendly option such as Sign in with Apple, a login the reviewer cannot get past, and apps that are only a website in a wrapper.
  - q: How long does review take?
    a: Apple usually reviews within a day or two. Google Play is often similar for updates, but new personal accounts must first finish a 14-day closed test with at least 12 testers.
sources:
  - title: Apple App Store Review Guidelines
    url: https://developer.apple.com/app-store/review/guidelines/
  - title: "Apple: Offering account deletion in your app"
    url: https://developer.apple.com/support/offering-account-deletion-in-your-app/
  - title: "Google Play: Testing requirements for new personal developer accounts"
    url: https://support.google.com/googleplay/android-developer/answer/14151465?hl=en
related: [/build/mobile-apps/, /build/auth-and-accounts/, /ship/privacy-and-legal/]
---

App review is predictable once you know what reviewers look for. Most rejections of first apps come from the same handful of issues. Go through this list before you press submit.

## Accounts and access

- [ ] Developer accounts are in your company's name if you have one (Apple needs a D-U-N-S number for organisations; start early).
- [ ] Google Play personal account: a closed test with at least 12 testers has run for 14 days in a row.
- [ ] A working demo account with sample data is entered in the review notes if the app needs login.
- [ ] Any feature that needs special hardware, a location or a paid plan is explained in the review notes, with a short video if it is hard to reach.

## Login and data

- [ ] Users can delete their account from inside the app, and it removes their data, not just deactivates it.
- [ ] If the iPhone app offers Google or other social login, a privacy-friendly option such as Sign in with Apple is also offered.
- [ ] Sign in with Apple token revocation is called when an account is deleted.
- [ ] Permission requests (camera, location, contacts, notifications) are asked only when needed, with a clear reason in the system prompt text.
- [ ] Nothing is collected that the privacy policy does not mention.

## Privacy declarations

- [ ] A privacy policy URL is in the app, on the store listing, and loads without login.
- [ ] Apple's App Privacy details ("nutrition label") list every data type collected, by you and by SDKs you include.
- [ ] Google Play's Data safety form matches the same reality.
- [ ] Apps that track users across other companies' apps ask permission through Apple's App Tracking Transparency prompt.

## Payments

- [ ] Digital goods and subscriptions sold inside the app use the store's in-app purchase system where the rules require it.
- [ ] Subscription screens show the price, period, what is included, and how to cancel, before purchase.
- [ ] Restore purchases works.
- [ ] Physical goods and real-world services use a normal payment provider, not in-app purchase.

## Quality

- [ ] No crashes on launch or in the main flows, on an older phone as well as a new one.
- [ ] No placeholder text, "lorem ipsum", test buttons or broken links.
- [ ] The app works on the smallest supported screen and in landscape if you allow it.
- [ ] A useful offline or error screen instead of a blank page when there is no connection.
- [ ] The app offers real value beyond a website in a frame.

## Store listing

- [ ] Name and subtitle say what the app does, not just the brand.
- [ ] Screenshots are real, current and show the main benefit in the first two images.
- [ ] Description starts with what the app does for the user in one or two sentences.
- [ ] Age rating questionnaire answered honestly (user-generated content, chat, web access and gambling-like features all affect it).
- [ ] Support URL and contact email work.
- [ ] Keywords (Apple) and short description (Google) use the words people search for.

## After submission

- [ ] If rejected, read the exact guideline cited, fix it, and reply in the resolution centre explaining what changed.
- [ ] Use phased release for updates so a bad build reaches few people first.
- [ ] Answer early reviews; they shape your rating for months.
