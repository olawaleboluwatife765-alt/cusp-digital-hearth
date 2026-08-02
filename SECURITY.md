# Security Model

## Security Philosophy

Security is not a feature—it is the foundation of Cusp.

Every interaction within Cusp is designed around one principle:

> Users should always remain in control of their digital assets.

Cusp aims to simplify the Web3 experience without compromising the transparency, ownership, and security expected from a self-custodial wallet.

---

# Self-Custody First

Cusp is designed as a **self-custodial wallet**.

This means:

- Users own their assets.
- Users control their private keys.
- Users authorize every transaction.
- Cusp cannot access or move user funds.

Unlike custodial services, Cusp is never intended to hold customer assets on behalf of users.

---

# Google Authentication

Google Sign-In is used only to verify a user's identity and streamline onboarding.

Google **does not**:

- own the wallet
- store private keys
- approve transactions
- access wallet balances
- control user funds

Authentication should never be confused with custody.

Google provides identity verification—not wallet ownership.

---

# Private Key Management

**Prototype Status**

The current version of Cusp is an interactive prototype and does not generate or store real cryptographic keys.

**Production Vision**

In a production implementation:

- Private keys will be generated securely on the user's device.
- Keys will be encrypted before storage.
- Plaintext private keys will never leave the user's device.
- Sensitive operations will always require explicit user approval.

---

# Recovery

Cusp is designed to support multiple recovery options while preserving self-custody.

Planned recovery methods include:

- Secret Recovery Phrase
- Secure encrypted backups (future research)
- Google-assisted account recovery for encrypted wallet metadata only

Google will never have access to recovery phrases or private keys.

---

# Transaction Security

Every blockchain transaction will require explicit user confirmation before signing.

Users will always be able to review:

- Network
- Recipient address
- Amount
- Estimated fees
- Transaction details

No transaction should ever be signed automatically.

---

# Connected dApps

Cusp is designed around transparent permissions.

Before connecting to any decentralized application, users will be shown:

- The application requesting access
- The permissions being requested
- The network being used
- The wallet being connected

Users will be able to revoke permissions at any time through the Connected Apps manager.

---

# Network Protection

Supported networks include:

- Mainnet
- Testnet
- Signet

Switching networks will always require user confirmation.

Test networks are clearly identified to prevent confusion between real assets and test assets.

---

# Threat Model

Cusp is designed to reduce common security risks, including:

- Phishing attacks
- Accidental transaction approvals
- Permission abuse
- User confusion during onboarding
- Network switching mistakes

Security decisions prioritize clarity and informed consent.

---

# Security Roadmap

Future production releases will include:

- Biometric authentication
- Hardware wallet support
- Encrypted local key storage
- Multi-factor authentication
- Transaction risk analysis
- Address verification
- Security alerts
- Session management
- Audit logging
- Independent security audits

---

# Prototype Disclaimer

The current version of Cusp is a **high-fidelity interactive prototype**.

It intentionally simulates authentication, wallet creation, blockchain interactions, balances, transactions, and network operations.

No real cryptographic keys, blockchain transactions, or authentication services are used in this prototype.

---

# Responsible Disclosure

If you discover a security issue related to Cusp, please report it privately rather than disclosing it publicly.

As Cusp evolves into a production application, a formal responsible disclosure process and security contact will be established.

---

# Our Commitment

Cusp is built on a simple promise:

**Your identity may be verified. Your experience may be simplified. But your ownership should always remain yours.**
