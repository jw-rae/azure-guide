---
title: "Entra ID License: Free vs P1 vs P2 vs Governance"
slug: license-tiers
category: identity-governance
tags: [entra-id, licensing, tiers, premium, governance]
services:
  - Microsoft Entra ID
skus:
  - Microsoft Entra ID Free
  - Microsoft Entra ID P1
  - Microsoft Entra ID P2
glossary:
  - Microsoft Entra ID
  - Conditional Access
  - PIM
  - Microsoft Entra ID Protection
  - Microsoft Entra Connect
  - Seamless SSO
---

## When to use Free

- Small organizations with basic identity needs
- Up to 500,000 directory objects
- Core features: SSO, MFA (security defaults), user/group management
- Microsoft Entra Connect Sync (cloud sync of up to 50,000 objects)
- **Limitations:** No Conditional Access, no identity protection, no SLA

## When to use P1

- Organizations needing Conditional Access policies (MFA enforcement, device compliance, location)
- Microsoft Entra Connect Sync without object limit
- Application Proxy for on-prem apps, Self-Service Password Reset (SSPR) with writeback
- Identity SLA (99.9%)
- Organizations with compliance-driven MFA requirements

## When to use P2

- Organizations with sensitive data — need PIM (JIT privileged access) and Identity Protection (risk-based policies)
- Risk-based Conditional Access (block sign-ins based on user risk, sign-in risk)
- User risk remediation (password change on compromise detection)
- Access Reviews for periodic recertification of privileged roles
- Full identity governance suite

## When to use Microsoft Entra ID Governance (add-on)

- Organizations managing user access lifecycle (joiner/mover/leaver)
- Entitlement Management — automate access packages, approval flows
- Access Reviews beyond basic P2 features (more frequent, lifecycle workflows)
- Requires P2 as base license + Governance add-on

## Decision Table

| Feature | Free | P1 | P2 | Governance (add-on) |
|---|---|---|---|---|
| **Conditional Access** | ❌ | ✅ (basic) | ✅ (risk-based) | ✅ |
| **PIM** | ❌ | ❌ | ✅ | ✅ |
| **Identity Protection** | ❌ | ❌ | ✅ | ✅ |
| **Access Reviews** | ❌ | ❌ | ✅ | ✅ (enhanced) |
| **Entitlement Management** | ❌ | ❌ | ❌ | ✅ |
| **SSPR with writeback** | ❌ | ✅ | ✅ | ✅ |
| **App Proxy** | ❌ | ✅ | ✅ | ✅ |
| **MFA (custom)** | ❌ (basic only) | ✅ | ✅ | ✅ |
| **SLA** | ❌ | ✅ (99.9%) | ✅ (99.9%) | ✅ |

## Key Distinctions

- P1 adds **Conditional Access** — the most common reason to upgrade from Free
- P2 adds **PIM** and **Identity Protection** — for privileged access and risk-based policies
- **Risk-based Conditional Access** (block/require MFA based on user risk) requires P2, not P1
- P2 is required for **PIM, Access Reviews, and Identity Protection** — these are not available in P1
- Governance add-on builds on P2 for **full identity lifecycle management** (entitlement management, lifecycle workflows)
- For **exam context**: if the scenario mentions JIT/privileged admin, you need P2; if MFA + device policy only, P1 is sufficient

## Related Cards

- [Privileged Access](identity-governance/privileged-access.md) — PIM vs Access Reviews vs Conditional Access
- [Hybrid Auth](identity-governance/hybrid-auth.md) — PHS vs PTA vs AD FS vs Cloud Sync
- [Policy Effect](identity-governance/policy-effect.md) — Audit vs Deny vs Modify vs Append
