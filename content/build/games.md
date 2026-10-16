---
title: Making games as an indie
description: Choose between a web game and a downloadable one, pick an engine whose licence you can live with, and plan where players will find your game.
type: guide
updated: 2026-10-16
order: 6
time: 8 min read
nav_title: Making games
tags: [games, game engine, threejs, phaser, godot, unity, babylonjs, itch.io, steam, web games]
faq:
  - q: Unity or Godot?
    a: Unity has more tutorials, assets and mobile tooling, and Unity Personal is free under $200,000 in yearly revenue and funding. Godot is fully free and open source with no royalties or revenue tracking, and is lighter. If licence certainty matters most to you, choose Godot.
  - q: Can a browser game make money?
    a: Yes, through ads on game portals, sponsorships, a paid full version, or as a free demo that leads to a paid download. Browser games are also the fastest way to get players and feedback.
sources:
  - title: Unity Personal eligibility
    url: https://unity.com/products/unity-personal
related: [/build/choose-your-stack/, /launch/where-to-launch/, /tools/games/]
---

Games have a different launch path from software tools. The question is not "which engine is best" but **where will players find this game and play it?** Answer that, and the tools follow.

## Two paths

**Play in a browser.** Players click a link and play. No install, works on phones and laptops, easy to share. Great for small games, game jams, prototypes and marketing demos. Distribute on itch.io, your own site and web game portals.

**Download from a store.** Steam, the App Store, Google Play or consoles. More work and fees, but players expect to pay, and stores provide discovery, reviews and wishlists.

Many indie games do both: a short browser demo that builds a wishlist for the full store release.

## Choose the tool

| You want | Use | Why |
| --- | --- | --- |
| 2D web game | [[tool:phaser]] | Gentle, fast, lots of examples |
| 3D web game or interactive scene | [[tool:threejs]] or [[tool:babylonjs]] | Three.js has the bigger community; Babylon.js has more engine features built in |
| Downloadable 2D or 3D game, no licence worries | [[tool:godot]] | Free and open source, no royalties |
| Mobile or cross-platform game, large asset store | [[tool:unity]] | Most tutorials and assets; free under a revenue threshold |

Read the licence before you commit months of work. Engine licence terms have changed suddenly before, and moving engines mid-project is expensive.

## Backend for games

Most small games need very little server: accounts, save data and a leaderboard. [[tool:supabase]] can store scores with database rules that stop players editing other people's entries. Always validate scores on the server; anything the game client sends can be faked.

## Keep scope tiny

The most common reason indie games never ship is scope. Make the smallest version that is fun in two minutes, put it in front of players, and grow from what they enjoy. A finished small game teaches you more than an unfinished big one.

## Where to launch

Post playable builds on itch.io, share short clips of gameplay (the first three seconds decide everything on social video), join game jams for deadlines and an audience, and open a store page early to collect wishlists. See [Where to launch](/launch/where-to-launch/).
