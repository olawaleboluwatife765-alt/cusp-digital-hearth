# Cusp Architecture

## Overview

Cusp is designed as a modern, modular wallet application built around a clear separation of concerns.

The current repository contains a high-fidelity interactive prototype. As development progresses, each simulated component will be replaced with production-ready services while preserving the same user experience.

---

# Architecture Principles

- Modular by design
- Security first
- Self-custody by default
- Scalable infrastructure
- Mobile-first experience
- Clear separation between frontend, backend, and blockchain layers

---

# High-Level Architecture

```text
                User
                  │
                  ▼
        ┌─────────────────┐
        │   React Frontend │
        └─────────────────┘
                  │
                  ▼
        ┌─────────────────┐
        │ Backend Services │
        └─────────────────┘
                  │
        ┌─────────┴─────────┐
        ▼                   ▼
 Bitcoin Network      Stacks Network
```

---

# Frontend

Current technologies include:

- React
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui

Responsibilities:

- User Interface
- Navigation
- Wallet Dashboard
- Portfolio Display
- Animations
- Form Validation
- Local State Management

---

# Backend (Planned)

Future backend responsibilities include:

- Authentication
- User session management
- Encrypted wallet metadata
- Notifications
- Analytics
- Recovery workflows

The backend will never hold custody of user funds.

---

# Wallet Layer

Future wallet services will include:

- Wallet creation
- Wallet restoration
- Secure key management
- Address generation
- Transaction preparation
- Transaction signing

Private keys are intended to remain under the user's control.

---

# Blockchain Layer

Cusp is designed primarily for:

- Bitcoin
- Stacks

Future blockchain interactions may include:

- Portfolio synchronization
- Transaction broadcasting
- Smart contract interaction
- Token management
- NFT support

---

# Security Layer

Security responsibilities include:

- Biometric authentication
- Device encryption
- Recovery phrase verification
- Permission management
- Network verification
- Connected dApp permissions

---

# Application Flow

```text
Splash Screen
      │
      ▼
Brand Identity
      │
      ▼
Wallet Selection
      │
      ▼
Create / Import Wallet
      │
      ▼
Wallet Dashboard
      │
      ├── Explore
      ├── Connect
      └── Settings
```

---

# Current Prototype

The current version simulates:

- Wallet creation
- Authentication
- Portfolio balances
- Transactions
- Swaps
- Connected dApps
- Network switching

No blockchain functionality is currently implemented.

---

# Planned Production Architecture

## Phase 1

Interactive Prototype ✅

## Phase 2

Authentication & Backend

## Phase 3

Wallet Engine

## Phase 4

Blockchain Integration

## Phase 5

Testing & Security Audits

## Phase 6

Production Release

---

# Design Goals

The architecture is designed to be:

- Secure
- Maintainable
- Modular
- Scalable
- Easy to extend
- Consistent across mobile and web

---

# Guiding Principle

Every architectural decision should reinforce Cusp's core philosophy:

> Make digital ownership feel simple while preserving the security and transparency of true self-custody.
