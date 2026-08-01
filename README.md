# Cusp Digital Vault

Cusp — Master Build Prompt v1.0

Objective

Build a premium, mobile-first interactive web application called Cusp.

Cusp is a next-generation self-custodial Bitcoin and Stacks wallet designed to make Web3 onboarding as simple as signing into a modern consumer app while preserving the ownership, transparency, and security expected from a self-custodial wallet.

This is a high-fidelity interactive prototype only.

Do NOT build a landing page.

Do NOT build a marketing website.

Build a production-quality wallet application that feels ready for usability testing and investor demonstrations.

Maintain one consistent design system throughout the application.

If any requirement below is explicitly stated, follow it exactly instead of replacing it with your own interpretation.

Product Philosophy

Every design decision should reinforce these principles:

Simplicity before complexity.

Trust through transparency.

Self-custody without intimidation.

Craftsmanship in every interaction.

Consistency across the entire application.

The application should feel welcoming to beginners while remaining capable enough for experienced Bitcoin and Stacks users.

Visual Identity

Use my uploaded Cusp pencil-style logo as the foundation of the entire brand.

Do not replace it with a generic modern logo.

Digitally refine it while preserving its handcrafted layered graphite aesthetic.

The visual language should be unique.

Avoid common crypto UI trends.

Instead introduce a premium design language inspired by:

Architectural concept sketches

Industrial product drawings

Luxury blueprint presentations

Precision engineering

Editorial minimalism

The interface should resemble a carefully drafted financial product that has come to life.

This should become Cusp's signature identity.

The drafting aesthetic should remain subtle.

Approximately:

80% premium banking application

20% architectural drafting language

Color Palette

Primary

Graphite

Charcoal

Soft Grey

White

Accent

Warm Champagne Gold

Use champagne gold only for:

Active navigation

Progress indicators

Selected tabs

Success states

Tiny decorative highlights

Balance decimals

Avoid excessive gradients.

Avoid neon.

Avoid cyberpunk styling.

Avoid floating coins.

Avoid glassmorphism.

Avoid generic blockchain graphics.

Typography

Use elegant modern typography.

Instrument Sans (or a similar geometric sans-serif) for interface text.

IBM Plex Mono (or a similar monospace font) for:

Wallet addresses

Portfolio values

Token balances

Transaction IDs

Typography should communicate precision and trust.

Motion Design

Animations should feel calm and deliberate.

Include:

Smooth page transitions

Gentle fade animations

Soft card elevation

Button press feedback

Swipe gestures

Native scrolling

Elastic segmented controls

Avoid flashy effects.

The experience should feel closer to Apple Wallet or Linear than a gaming interface.

User Flow

Splash Screen

↓

Brand Identity

↓

Wallet Selection

↓

Create Wallet

↓

Import Wallet

↓

Dashboard

↓

Explore

↓

Connect

↓

Settings

Navigation should feel natural throughout the application.

Splash Screen

Display only the uploaded Cusp logo.

Animate it using:

Soft fade in

Gentle depth

Slight scale animation

Calm lighting

Duration:

Approximately two seconds.

No text.

Brand Screen

Display:

Cusp

Your simple gateway to digital ownership.

One primary button:

Continue

Minimal.

Centered.

Premium.

Wallet Selection

Display two large cards.

Create New Wallet

Description:

Create a brand-new self-custodial wallet.

Button:

Create New Wallet

Import Existing Wallet

Description:

Restore your existing wallet using Google or your recovery phrase.

Button:

Import Existing Wallet

Create Wallet

Offer two methods.

Continue with Google (Recommended)

Explanation:

Google is used only to verify your identity.

Your wallet remains completely self-custodial.

Google cannot access your assets.

Simulate:

Creating your Cusp Wallet...

Animated progress.

Wallet Created.

Continue to Dashboard.

Create with Secret Recovery Phrase

Generate a simulated 12-word recovery phrase.

Require users to confirm randomly selected words before continuing.

Import Existing Wallet

Offer:

Continue with Google

For users who previously created a Cusp wallet using Google.

or

Import Recovery Phrase

Accept 12 or 24 words.

Include polished validation and error states.

Wallet Dashboard

The Home screen should answer four questions within three seconds:

What do I own?

What can I do?

What assets do I have?

What just happened?

Everything should remain visible without clutter.

Top App Bar

Left:

Cusp logo.

Tap to open the navigation drawer.

Center:

Wallet Name

"My Wallet"

Below:

Short wallet address

SP3X...A8K2

Include copy button.

Right:

Notification icon.

Portfolio Card

This is the hero section.

Display:

Portfolio Value

For newly created wallets:

$0.00

Never use random balances.

Below display:

Fund your wallet to begin your journey.

Include:

Hide balance

Copy address

Subtle radial lighting.

Premium elevation.

Getting Started Card

Display a progress card.

0/3 Complete

Tasks:

Fund your wallet

Explore a Stacks App

Make your first swap

Each task becomes completed when simulated.

Quick Actions

Large rounded buttons.

Add Funds

Send

Receive

Swap

Swap only supports:

STX

BTC

sBTC

SIP-010 Tokens

If Swap is not implemented, show a premium Coming Soon experience.

Wallet Sections

Use swipeable segmented tabs.

Assets

NFTs

Activity

Allow horizontal swipe.

Smooth transitions.

Assets

Display:

BTC

STX

sBTC

Additional SIP-010 assets.

Each row contains:

Icon

Name

Symbol

Balance

Fiat value

New wallets display:

0 balance

$0.00

Group BTC and sBTC together visually to reinforce the Bitcoin–Stacks relationship.

NFTs

Elegant empty state.

"No collectibles yet."

Use tasteful sketch-style illustrations.

Activity

Elegant empty state.

"No transactions yet."

Supporting text encouraging first transactions.

Bottom Navigation

Use four tabs.

Home

Explore

Connect

Settings

Keep navigation simple and intuitive.

Explore

Create two tabs.

Apps

Categories:

Featured

DeFi

NFTs

Games

Social

AI

Utilities

Include search.

The experience should resemble a curated app marketplace.

Pulse

Create an ecosystem intelligence hub.

Include:

Market

News

Events

Learn

Featured Project

Display simulated Bitcoin and Stacks information using placeholder content.

Connect

Dedicated connection manager.

Display:

Connected Apps

Connection Requests

Granted Permissions

Recent Connections

Disconnect Controls

Clearly explain exactly what information each dApp can access.

Settings

Include:

Profile

Appearance

Notifications

Security

Recovery Center

Biometrics

Currency

Language

Help

About Cusp

Navigation Drawer

Accessible from the Cusp logo.

Include:

Manage Wallets

Security Center

Recovery Center

Address Book

Connected Apps

Networks

Help & Support

About Cusp

Network Management

Support simulated switching between:

🟢 Mainnet (Default)

🟡 Testnet

🔵 Signet

Show a confirmation dialog before switching.

Explain that test networks use test assets with no real value.

Empty States

Every empty section should feel intentional rather than unfinished.

Examples:

No assets yet.

No collectibles yet.

No transactions yet.

Provide helpful guidance without overwhelming new users.

Prototype Constraints

This prototype must remain fully simulated.

Do NOT implement:

Real blockchain integration

Wallet generation

Transaction signing

Google OAuth

Backend services

APIs

Live prices

Real balances

Smart contracts

Use realistic placeholder data and interactions throughout.

Final Design Goal

The finished prototype should immediately feel different from existing crypto wallets.

It should feel like a thoughtfully engineered financial product where premium craftsmanship meets approachable Web3 onboarding.

When someone opens Cusp, they should immediately think:

"This doesn't feel like another crypto wallet—it feels like the future of digital ownership."

One last tip before you use this: upload your Cusp logo in the same Lovable project and tell it to use that exact logo for the splash animation and branding. Since you're limited on credits, don't change multiple things at once—use this prompt as the foundation, then spend your second generation (if needed) only on refining specific areas rather than rebuilding the entire app.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://cusp-digital-hearth.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/73a2deac-d9da-4e93-8ade-353202779d3e).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
