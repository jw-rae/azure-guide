---
title: "Hybrid Auth: PHS vs PTA vs AD FS vs Cloud Sync"
slug: hybrid-auth
category: identity-governance
tags: [hybrid, authentication, identity, ad-fs, pass-through, password-hash]
services:
  - Microsoft Entra ID
glossary:
  - PHS
  - PTA
  - AD FS
  - Cloud Sync
  - Microsoft Entra ID
  - Seamless SSO
  - Microsoft Entra Connect
  - Microsoft Entra Connect Sync
  - Azure AD Application Proxy
---

## When to use Password Hash Sync (PHS)

- Simple identity synchronization to the cloud
- Primary authentication via cloud (users authenticate to Microsoft Entra ID)
- Azure AD Domain Services integration (requires PHS to sync NTLM/Kerberos hashes)
- Least infrastructure — no on-prem servers beyond Entra Connect
- Seamless SSO + PHS provides a lightweight SSO experience
- Leaked credential detection (Microsoft Entra ID Protection)

## When to use Pass-Through Authentication (PTA)

- On-prem password policies must be enforced at the authentication point
- No password hashes stored in the cloud (zero-knowledge of on-prem passwords)
- Real-time password validation against on-prem Active Directory
- **Requirement:** At least one (preferably two) PTA agents on-prem
- Combine with Seamless SSO for silent authentication from domain-joined machines

## When to use AD FS (Active Directory Federation Services)

- Federation with third-party identity providers (SAML 2.0)
- Smartcard / certificate-based authentication (non-Azure)
- Custom authentication policies beyond what Entra ID can enforce
- Hybrid deployment where on-prem AD is authoritative for authentication
- **Complexity:** Multiple on-prem servers (AD FS + WAP), certificate management

## When to use Cloud Sync (Entra Connect Cloud Sync)

- Simplified sync from multi-forest or disconnected AD environments
- Lightweight agent — no full Entra Connect server installation
- Sync filtering at group level (sync only specific OUs/groups)
- Gradual migration from FIM/MIM to cloud-based sync
- Does **not** replace Entra Connect — for specific scenarios (lightweight, filtered sync)

## Decision Table

| Feature | PHS | PTA | AD FS | Cloud Sync |
|---|---|---|---|---|
| **Password stored in cloud?** | ✅ (hash only) | ❌ (validated on-prem) | ❌ (validated on-prem) | Same as PHS base |
| **On-prem infrastructure** | Entra Connect server | PTA agents (2+) | AD FS + WAP servers | Lightweight agent |
| **SSO experience** | Seamless SSO | Seamless SSO | Yes (Kerberos) | Seamless SSO |
| **Federation (SAML)** | ❌ | ❌ | ✅ | ❌ |
| **Smartcard auth** | ❌ | ❌ | ✅ | ❌ |
| **Azure AD DS support** | ✅ (required) | ❌ | ❌ (not supported) | ✅ |
| **Leaked credential detection** | ✅ | ❌ | ❌ | ✅ |
| **Complexity** | Low | Medium | High | Low |
| **Password writeback** | ✅ | ✅ | ✅ | ❌ |

## Key Distinctions

- PHS stores **password hashes** in the cloud — PTA and AD FS do not (zero-knowledge from cloud)
- PHS is **required** for Azure AD Domain Services (NTLM/Kerberos hash sync)
- PTA agents validate passwords **in real time** against on-prem AD — no hash stored in cloud
- AD FS is the **most complex** — for federation with third-party IdPs or smartcard auth
- Cloud Sync is **not a full replacement** for Entra Connect — it covers specific scenarios (lightweight, multi-forest, filtered sync)
- **Seamless SSO** works with both PHS and PTA — users from domain-joined machines authenticate silently
- For most organizations: PHS + Seamless SSO is the **recommended starting point**; move to PTA or AD FS only if specific requirements exist

## Related Cards

- [Workload Identity](identity-governance/workload-identity.md) — Managed Identity (System/User) vs Service Principal
- [Privileged Access](identity-governance/privileged-access.md) — PIM vs Access Reviews vs Conditional Access
- [Entra ID License](identity-governance/license-tiers.md) — Free vs P1 vs P2 vs Governance
