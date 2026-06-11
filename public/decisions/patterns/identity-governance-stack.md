---
title: "Identity Governance Stack: PIM + Access Reviews + Conditional Access"
slug: identity-governance-stack
category: patterns
tags: [identity, governance, privileged-access, security, just-in-time]
services:
  - Privileged Identity Management (PIM)
  - Microsoft Entra Access Reviews
  - Entra ID Conditional Access
  - Entra ID Protection
glossary:
  - Privileged Identity Management (PIM)
  - Microsoft Entra Access Review
  - Entra ID Conditional Access
  - Entra ID Protection
  - Entra ID License Tiers
---

## Overview

This pattern combines three Entra ID P2 features to create a defense-in-depth identity governance strategy: **PIM** for time-bound access, **Access Reviews** for periodic validation, and **Conditional Access** for policy enforcement. Add **Identity Protection** for risk detection.

## When to use PIM

- Grant just-in-time (JIT) privileged access to Entra ID roles or Azure RBAC roles
- Require MFA + approval to activate admin roles
- Set time-bound assignments (hours, days) with expiry
- Audit who activated what role and when
- Enforce least privilege by removing standing admin access

## When to use Access Reviews

- Periodically (weekly/monthly/quarterly) review active role assignments
- Validate that group members still need access
- Auto-remove stale or unnecessary assignments
- Meet compliance requirements (SOC, PCI DSS, SOX)
- Review guest access to sensitive resources

## When to use Conditional Access

- Enforce MFA based on risk, location, device compliance
- Block sign-ins from untrusted IPs or impossible travel
- Require compliant or hybrid-joined devices for admin access
- Integrate with Identity Protection for risk-based policies (requires P2)

## How They Work Together

| Layer | Feature | What It Does | License |
|---|---|---|---|
| **Prevention** | Conditional Access | Block risky sign-ins, require MFA | P1/P2 |
| **Detection** | Identity Protection | Flag leaked credentials, impossible travel, anonymous IP | P2 |
| **Activation** | PIM | JIT role elevation with approval + MFA | P2 |
| **Validation** | Access Reviews | Periodic recertification of role assignments | P2 |

## Workflow

```
1. User signs in
   ↓
2. Conditional Access evaluates risk (Identity Protection)
   → Blocks or requires MFA if high risk
   ↓
3. User needs admin role
   → Activates via PIM (JIT): MFA + approval required
   ↓
4. Role granted for time-bound window (e.g., 4 hours)
   → Automatic deactivation after expiry
   ↓
5. Access Reviews run monthly
   → Reviewer confirms or removes assignments
   → Orphaned/stale access auto-removed
```

## License Requirements

| Feature | Minimum License |
|---|---|
| Conditional Access (basic MFA, locations) | P1 |
| Conditional Access (risk-based) | P2 |
| Identity Protection | P2 |
| PIM | P2 |
| Access Reviews | P2 |
| Entitlement Management | P2 + Governance add-on |

## Key Distinctions

- PIM provides **JIT access** — it does not replace Access Reviews, they complement each other
- Access Reviews are **periodic** (weekly/monthly), PIM activations are **real-time** — both needed for least privilege
- Conditional Access evaluates **after first-factor auth** — it's not a replacement for strong passwords
- Identity Protection detects **leaked credentials, impossible travel, anonymous IP, atypical location** — not brute-force or DDoS
- PIM supports both **Entra ID roles** and **Azure RBAC roles** — know the difference

## Combo: Privileged Access Workflow

```
Security guideline: "No standing admin access, quarterly review, MFA required"

Solution:
├── PIM — JIT activation, 4-hour expiry, requires MFA + manager approval
├── Access Reviews — quarterly recertification, auto-remove stale assignments
├── Conditional Access — require compliant device + MFA for role activation
└── Identity Protection — alert on risky sign-ins during elevated session
```

## Related Cards

- [Workload Identity](identity-governance/workload-identity.md) — Managed Identity vs Service Principal
- [Hybrid Auth](identity-governance/hybrid-auth.md) — PHS vs PTA vs AD FS
- [Entra ID Licenses](identity-governance/license-tiers.md) — Free vs P1 vs P2 vs Governance
