---
title: Mobile apps for iPhone and Android
description: Choose between Expo, Flutter and a wrapped web app, budget for store fees, meet Google Play's 12-tester rule, and avoid common review rejections.
type: guide
updated: 2026-10-16
order: 5
time: 11 min read
nav_title: Mobile apps
tags: [mobile, ios, android, expo, react native, flutter, capacitor, app store, google play, testers, push notifications]
faq:
  - q: Do I need a Mac to publish an iPhone app?
    a: Not with Expo. Its cloud build service builds and submits iOS apps for you. You still need a paid Apple Developer Program membership and, ideally, an iPhone for testing.
  - q: Why can't I publish my Android app straight away?
    a: Google Play requires personal developer accounts created after 13 November 2023 to run a closed test with at least 12 testers who stay opted in for 14 days in a row before production access is granted.
  - q: Should I build a mobile app at all?
    a: "Only if your users need it: notifications that matter, camera or offline use, or a habit they repeat daily on the phone. Otherwise a fast, installable website is cheaper and reaches people sooner."
sources:
  - title: "Google Play: App testing requirements for new personal developer accounts"
    url: https://support.google.com/googleplay/android-developer/answer/14151465
  - title: Expo pricing
    url: https://expo.dev/pricing
related: [/launch/app-store-submission/, /build/auth-and-accounts/, /tools/mobile/]
---

Before building a native app, ask whether a good mobile website would do. Native apps bring real benefits (push notifications, home screen presence, device features) and real costs (store fees, review delays, two platforms to support). If you do need one, build both platforms from one codebase.

## Pick a framework

| What | [[tool:expo]] (React Native) | [[tool:flutter]] | [[tool:capacitor]] |
| --- | --- | --- | --- |
| Language | JavaScript or TypeScript | Dart | Your existing web code |
| Feels native | Yes | Yes, custom-drawn | Partly |
| Build without a Mac | Yes, with cloud builds | Needs a Mac or a CI service for iOS | Needs a Mac or a CI service for iOS |
| Best for | Most indie apps, web developers | Highly custom design | You already have a web app |

For most indie founders, **Expo** is the shortest path: one codebase, cloud builds and store submission included, and over-the-air updates for fixes that do not need a new review. Its free plan includes 15 Android and 15 iOS builds a month.

::: warning A website in a wrapper often gets rejected
Apple's review guidelines expect apps to offer something beyond a repackaged website. If you wrap your web app, add real app value: offline use, notifications, device features or a design built for the phone.
:::

## Budget for the stores

- **Apple Developer Program**: a yearly fee, required to publish to the App Store and TestFlight.
- **Google Play Console**: a one-time registration fee.
- **Identity checks**: both stores verify who you are. Organisations need a D-U-N-S number for Apple, which can take days to get. Start early.

## The Google Play 12-tester rule

If your Google Play developer account is a **personal** account created after 13 November 2023, you must run a closed test before going live:

- At least **12 testers** opted in to the closed test.
- Each tester stays opted in for **14 days in a row**. If someone leaves and rejoins, their count restarts.
- After that, apply for production access in Play Console.

Plan for three weeks between "the app is ready" and "the app is on Google Play". Recruit testers from your waitlist, friends and communities. Organisation accounts are not subject to this rule.

## Must-haves before you submit

- [ ] App icon at every required size and a launch screen.
- [ ] A privacy policy URL that matches what the app collects, linked in the app and the store listing.
- [ ] In-app account deletion if users can create accounts.
- [ ] Sign in with Apple, or an equivalent private option, if the iPhone app offers Google or other social login.
- [ ] Apple's privacy "nutrition label" and Google's Data safety form filled in honestly.
- [ ] Push notification permission asked at a moment that makes sense, not on first launch.
- [ ] An offline or no-connection screen instead of a blank page.
- [ ] A demo account for reviewers if the app needs login.
- [ ] In-app purchases for digital goods use the store's payment system where required; [[tool:revenuecat]] makes this much easier.

The full pre-submission list is in [App store submission](/launch/app-store-submission/).

## Push notifications

Expo's notification service sends to both stores from one API. Ask for permission after the user has done something that makes the value obvious ("Want a reminder when your report is ready?"). Let users turn each type of notification off in settings. Apps that spam notifications get uninstalled and reviewed badly.
