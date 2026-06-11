---
title: "Privileged Access: PIM vs Access Reviews vs Conditional Access"
slug: privileged-access
category: identity-governance
tags: [privileged-access, pim, access-reviews, conditional-access, security]
services:
  - Microsoft Entra ID
skus:
  - Microsoft Entra ID P2
glossary:
  - PIM
  - Access Review
  - Conditional Access
  - Microsoft Entra ID
  - PHS
---

## When to use PIM (Privileged Identity Management)

- Just-In-Time (JIT) access to privileged roles — no standing admin access
- Role activation requires approval (multi-factor auth, justification, ticket number)
- Time-bound role assignments (eligible for X hours, then auto-expired)
- Audit logging of all role activations and assignments
- **Requirement:** Microsoft Entra ID P2 license for users managing privileged roles

## When to use Access Reviews

- Periodic review of who has access to what — ensure least privilege
- Azure AD and Azure resource access recertification
- Guest access review (remove stale guest accounts)
- Group membership review (clean up dynamic groups)
- Can auto-remove users who don't respond to review
- **Requirement:** Microsoft Entra ID P2 license for reviewers

## When to use Conditional Access

- Enforce MFA, device compliance, or location-based policies at sign-in
- Block sign-ins from unexpected locations or untrusted devices
- Session controls (sign-in frequency, app session controls)
- Risk-based policies (Microsoft Entra ID Protection signals)
- **Requirement:** Microsoft Entra ID P1 for basic policies; P2 for risk-based policies
- **Note:** Not a replacement for PIM — Conditional Access controls sign-in, PIM controls role activation

## Decision Table

| Feature | PIM | Access Reviews | Conditional Access |
|---|---|---|---|
| **Purpose** | JIT privileged role activation | Periodic access recertification | Sign-in policy enforcement |
| **License** | P2 | P2 (per reviewer) | P1 (basic) / P2 (risk-based) |
| **Scope** | Azure AD roles + Azure resources | Azure AD roles + groups + apps | User sign-in conditions |
| **MFA enforcement** | ✅ (activation step) | ❌ (review process only) | ✅ (at sign-in) |
| **Automation** | Auto-expire, auto-approve | Auto-remove non-responders | Auto-block/allow based on policy |
| **Audit trail** | ✅ (activation + assignment) | ✅ (review decisions) | ✅ (sign-in logs) |
| **Guest support** | ❌ | ✅ | ✅ |

## Key Distinctions

- PIM manages **role activation** (when someone uses a role) — Conditional Access manages **sign-in** (when someone authenticates)
- Access Reviews is a **detective control** (who has access, periodic) — PIM is a **preventive control** (no standing access)
- PIM requires **P2 license** for all users who will activate roles (admins) — not just the PIM administrators
- **PIM + Conditional Access** complement each other: CA enforces MFA at sign-in, PIM enforces JIT approval for role activation
- Conditional Access with **risk-based policies** requires P2 license — basic policies (MFA enforcement) require P1 only
- Azure AD Identity Governance includes all three: PIM, Access Reviews, and Entitlement Management

## Related Cards

- [Identity Governance Stack Pattern](patterns/identity-governance-stack.md) — PIM + Access Reviews + Conditional Access
- [Entra ID License](identity-governance/license-tiers.md) — Free vs P1 vs P2 vs Governance
- [Governance Tool](identity-governance/governance-tool.md) — Policy vs RBAC vs Blueprint vs Locks
