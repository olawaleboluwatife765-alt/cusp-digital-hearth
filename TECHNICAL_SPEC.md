# Cusp Technical Specification

## Version

Draft v1.0

---

# Purpose

This document defines the intended technical architecture and behavior of Cusp.

It serves as the engineering blueprint for transitioning Cusp from an interactive prototype into a production-ready self-custodial Bitcoin and Stacks wallet.

---

# Product Goal

Cusp simplifies Web3 onboarding without compromising self-custody.

Users should experience wallet creation as easily as signing into a modern application while maintaining full ownership of their digital assets.

---

# Design Principles

- Security first
- Self-custody by default
- Simplicity over complexity
- Privacy by design
- Transparent permissions
- Modular architecture
- Progressive onboarding

---

# Supported Networks

Primary

- Bitcoin
- Stacks

Supported environments

- Mainnet
- Testnet
- Signet

Future consideration

- Custom developer networks

---

# Authentication

## Google Sign-In

Purpose

Identity verification only.

Google is **not** used as a wallet provider.

Google cannot:

- access private keys
- sign transactions
- recover assets
- control wallets

Authentication simply confirms the user's identity before wallet operations begin.

---

# Wallet Creation

Two onboarding methods:

### Google Assisted

Flow

User signs in with Google

↓

Identity verified

↓

Wallet generated

↓

Private key encrypted locally

↓

Wallet ready

---

### Recovery Phrase

Flow

Generate 12-word recovery phrase

↓

User confirms randomly selected words

↓

Wallet activated

---

# Wallet Recovery

Supported methods

- Recovery Phrase
- Google-assisted restoration (planned)

Recovery never exposes private keys to Google or backend services.

---

# Key Management

## Prototype

No real keys are generated.

Everything is simulated.

## Production Goal

Private keys should:

- be generated securely
- remain under user control
- never leave the user's device in plaintext
- be encrypted before storage

---

# Transaction Flow

User selects asset

↓

Enter recipient

↓

Enter amount

↓

Review transaction

↓

Approve

↓

Sign transaction

↓

Broadcast to network

Every transaction requires explicit user confirmation.

---

# Wallet Dashboard

Displays:

- Portfolio
- Assets
- NFTs
- Activity
- Quick Actions

Portfolio values originate from blockchain synchronization in production.

Currently simulated.

---

# Explore

Purpose

Help users discover trusted applications.

Includes:

- Featured Apps
- DeFi
- NFTs
- Games
- Social
- AI
- Utilities

Future versions may integrate ecosystem APIs.

---

# Pulse

Purpose

Provide ecosystem intelligence.

Displays:

- BTC market
- STX market
- sBTC market
- News
- Events
- Learn
- Featured Projects

Current version uses placeholder content.

---

# Connect

Purpose

Manage wallet connections.

Every connection displays:

- Application name
- Requested permissions
- Connected wallet
- Network
- Approval status

Users can revoke permissions at any time.

---

# Security Center

Responsibilities

- Recovery management
- Device security
- Connected dApps
- Permission review
- Network verification
- Backup reminders

---

# Recovery Center

Provides

- Recovery phrase verification
- Backup status
- Recovery guidance
- Security education

---

# Network Switching

Supported:

- Mainnet
- Testnet
- Signet

Every switch requires confirmation.

Test networks are clearly labelled.

---

# Backend Responsibilities

Future backend services

- Authentication
- Encrypted metadata
- Notifications
- Analytics
- Session management

Backend never has custody of user funds.

---

# Blockchain Layer

Production implementation will support

Bitcoin

- Address generation
- Transaction broadcasting
- Balance synchronization

Stacks

- STX transfers
- SIP-010 tokens
- NFTs
- Smart contract interactions

---

# Frontend Stack

Current

- React
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui

Deployment

- Vercel

Development

- Lovable

---

# Future Integrations

Potential technologies

- Stacks Connect
- Stacks.js
- Bitcoin libraries
- Hardware wallets
- Push notifications
- Passkeys

---

# Prototype Scope

Current implementation intentionally simulates:

- Authentication
- Wallet creation
- Transactions
- Portfolio
- Swaps
- dApp connections
- Market data

No real blockchain functionality currently exists.

---

# Success Criteria

A production version of Cusp should:

- Preserve self-custody.
- Minimize onboarding friction.
- Make permissions transparent.
- Support secure Bitcoin and Stacks interactions.
- Feel approachable to beginners while remaining powerful for experienced users.

---

# Guiding Statement

Technology should never make ownership feel complicated.

Cusp exists to make digital ownership feel simple, secure, and understandable without taking control away from the user.# Cusp Technical Specification

## Version

Draft v1.0

---

# Purpose

This document defines the intended technical architecture and behavior of Cusp.

It serves as the engineering blueprint for transitioning Cusp from an interactive prototype into a production-ready self-custodial Bitcoin and Stacks wallet.

---

# Product Goal

Cusp simplifies Web3 onboarding without compromising self-custody.

Users should experience wallet creation as easily as signing into a modern application while maintaining full ownership of their digital assets.

---

# Design Principles

- Security first
- Self-custody by default
- Simplicity over complexity
- Privacy by design
- Transparent permissions
- Modular architecture
- Progressive onboarding

---

# Supported Networks

Primary

- Bitcoin
- Stacks

Supported environments

- Mainnet
- Testnet
- Signet

Future consideration

- Custom developer networks

---

# Authentication

## Google Sign-In

Purpose

Identity verification only.

Google is **not** used as a wallet provider.

Google cannot:

- access private keys
- sign transactions
- recover assets
- control wallets

Authentication simply confirms the user's identity before wallet operations begin.

---

# Wallet Creation

Two onboarding methods:

### Google Assisted

Flow

User signs in with Google

↓

Identity verified

↓

Wallet generated

↓

Private key encrypted locally

↓

Wallet ready

---

### Recovery Phrase

Flow

Generate 12-word recovery phrase

↓

User confirms randomly selected words

↓

Wallet activated

---

# Wallet Recovery

Supported methods

- Recovery Phrase
- Google-assisted restoration (planned)

Recovery never exposes private keys to Google or backend services.

---

# Key Management

## Prototype

No real keys are generated.

Everything is simulated.

## Production Goal

Private keys should:

- be generated securely
- remain under user control
- never leave the user's device in plaintext
- be encrypted before storage

---

# Transaction Flow

User selects asset

↓

Enter recipient

↓

Enter amount

↓

Review transaction

↓

Approve

↓

Sign transaction

↓

Broadcast to network

Every transaction requires explicit user confirmation.

---

# Wallet Dashboard

Displays:

- Portfolio
- Assets
- NFTs
- Activity
- Quick Actions

Portfolio values originate from blockchain synchronization in production.

Currently simulated.

---

# Explore

Purpose

Help users discover trusted applications.

Includes:

- Featured Apps
- DeFi
- NFTs
- Games
- Social
- AI
- Utilities

Future versions may integrate ecosystem APIs.

---

# Pulse

Purpose

Provide ecosystem intelligence.

Displays:

- BTC market
- STX market
- sBTC market
- News
- Events
- Learn
- Featured Projects

Current version uses placeholder content.

---

# Connect

Purpose

Manage wallet connections.

Every connection displays:

- Application name
- Requested permissions
- Connected wallet
- Network
- Approval status

Users can revoke permissions at any time.

---

# Security Center

Responsibilities

- Recovery management
- Device security
- Connected dApps
- Permission review
- Network verification
- Backup reminders

---

# Recovery Center

Provides

- Recovery phrase verification
- Backup status
- Recovery guidance
- Security education

---

# Network Switching

Supported:

- Mainnet
- Testnet
- Signet

Every switch requires confirmation.

Test networks are clearly labelled.

---

# Backend Responsibilities

Future backend services

- Authentication
- Encrypted metadata
- Notifications
- Analytics
- Session management

Backend never has custody of user funds.

---

# Blockchain Layer

Production implementation will support

Bitcoin

- Address generation
- Transaction broadcasting
- Balance synchronization

Stacks

- STX transfers
- SIP-010 tokens
- NFTs
- Smart contract interactions

---

# Frontend Stack

Current

- React
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui

Deployment

- Vercel

Development

- Lovable

---

# Future Integrations

Potential technologies

- Stacks Connect
- Stacks.js
- Bitcoin libraries
- Hardware wallets
- Push notifications
- Passkeys

---

# Prototype Scope

Current implementation intentionally simulates:

- Authentication
- Wallet creation
- Transactions
- Portfolio
- Swaps
- dApp connections
- Market data

No real blockchain functionality currently exists.

---

# Success Criteria

A production version of Cusp should:

- Preserve self-custody.
- Minimize onboarding friction.
- Make permissions transparent.
- Support secure Bitcoin and Stacks interactions.
- Feel approachable to beginners while remaining powerful for experienced users.

---

# Guiding Statement

Technology should never make ownership feel complicated.

Cusp exists to make digital ownership feel simple, secure, and understandable without taking control away from the user.
