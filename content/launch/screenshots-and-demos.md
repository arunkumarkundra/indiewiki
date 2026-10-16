---
title: Screenshots and demo videos
description: Take pixel-perfect full-page and phone-sized screenshots with Chrome DevTools, record a short demo that people watch to the end, and compress everything.
type: guide
updated: 2026-10-16
order: 3
nav_title: Screenshots and demos
time: 12 min read
tags: [screenshot, chrome devtools, full page screenshot, demo video, screen recording, gif, mockup, product hunt, obs, loom]
faq:
  - q: How do I take a full-page screenshot without an extension?
    a: In Chrome or Edge, open DevTools, press Ctrl+Shift+P (Cmd+Shift+P on a Mac), type "screenshot" and choose "Capture full size screenshot". The PNG goes to your Downloads folder.
  - q: How long should a demo video be?
    a: 30 to 90 seconds for a launch or landing page. Show the result in the first five seconds, then how you get there. Longer walkthroughs belong in your docs or a tutorial.
related: [/launch/launch-checklist/, /launch/where-to-launch/, /tools/screen-recording/]
---

Good visuals do more for a launch than good copy. People decide in a few seconds whether to read on, and a clear screenshot or a short video answers "what is this?" faster than any headline. Tools for each job are in [Screenshots and demo videos](/tools/screen-recording/).

## Full-page screenshots with Chrome DevTools

Chrome and Edge can capture the entire page, a single element, or any screen size, with no extension.

::: steps
1. **Open DevTools.** Press [[kbd:F12]], or [[kbd:Ctrl+Shift+I]] on Windows and Linux, [[kbd:Cmd+Option+I]] on a Mac.
2. **Open the Command Menu.** Press [[kbd:Ctrl+Shift+P]] (Windows, Linux) or [[kbd:Cmd+Shift+P]] (Mac) while DevTools is focused.
3. **Type "screenshot".** You will see four commands:
   - **Capture full size screenshot**: the whole page, top to bottom.
   - **Capture screenshot**: only what is visible.
   - **Capture area screenshot**: drag to choose a rectangle.
   - **Capture node screenshot**: just the element selected in the Elements panel.
4. **Pick one.** Chrome saves a PNG to your Downloads folder.
:::

::: tip Hide the clutter first
Close cookie banners, log in as a demo user with realistic sample data, and dismiss chat widgets before you capture. Empty dashboards make products look unfinished.
:::

## Phone and tablet screenshots

::: steps
1. **Turn on device mode.** With DevTools open, press [[kbd:Ctrl+Shift+M]] (or [[kbd:Cmd+Shift+M]] on a Mac), or click the phone-and-tablet icon at the top left of DevTools.
2. **Choose a device** from the dropdown at the top of the page, such as a recent iPhone or Pixel, or pick **Responsive** and type an exact width and height.
3. **Set the pixel ratio** for sharp images. In Responsive mode, open the three-dot menu in the device toolbar, choose **Add device pixel ratio**, then set it to 2 or 3.
4. **Capture.** Use the same three-dot menu and choose **Capture screenshot** or **Capture full size screenshot**. **Show device frame** adds a phone outline for some devices.
:::

For App Store and Google Play images, check the current required sizes in App Store Connect and Play Console before you capture, and use real screenshots of the app, not mockups of features that do not exist.

## Make them light

Screenshots straight from DevTools are large PNG files. Before putting them on your site:

- Resize to the largest size they will be shown at (often 1600 pixels wide is plenty).
- Convert to WebP or AVIF with [[tool:squoosh]]. Expect files a half to a tenth of the size.
- Add descriptive alt text, for example "Dashboard showing this month's revenue by plan".

## A demo video people finish

Record at a fixed browser size (1920 by 1080, or 1280 by 720), with a clean profile and no notifications. [[tool:obs-studio]] is free and has no watermark; [[tool:loom]] gives instant share links; [[tool:screen-studio]] adds automatic zooms on a Mac.

A simple structure for 60 seconds:

1. **0 to 5 seconds**: the result. The finished report, the sent invoice, the published page.
2. **5 to 40 seconds**: the two or three steps that get there, at normal speed, with the cursor moving calmly.
3. **40 to 55 seconds**: one detail that makes it better than the usual way.
4. **Last 5 seconds**: product name and address on screen.

Add captions (most people watch muted), keep music quiet or skip it, and cut every pause. Export at 1080p. For social posts, also make a square or vertical cut of the first 15 seconds.

## Animated GIFs

Short loops work well in READMEs, docs and social replies. Keep them under about 5 seconds and a few MB. [[tool:screentogif]] on Windows and [[tool:cap]] on Mac and Windows can export GIFs; for websites, a muted looping MP4 or WebM video is much smaller than a GIF.
