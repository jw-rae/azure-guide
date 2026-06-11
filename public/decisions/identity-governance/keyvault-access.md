---
title: "Key Vault Access: RBAC vs Access Policies"
slug: keyvault-access
category: identity-governance
tags: [key-vault, rbac, access-policies, security, secrets]
services:
  - Azure Key Vault
glossary:
  - Key Vault
  - RBAC
  - Managed Identity
---

## When to use RBAC (Azure RBAC for Key Vault)

- New Key Vault deployments (recommended access model going forward)
- Centralized role management across multiple Key Vaults
- Azure RBAC integration for permissions like Key Vault Administrator, Key Vault Secrets Officer, Key Vault Reader
- Use with Managed Identity for simple secret access patterns
- Group-based access management via Azure AD groups
- Inherits from subscription/management group — easier to manage at scale

## When to use Access Policies

- Existing Key Vaults using the legacy access policy model
- Granular per-key/per-secret/per-certificate permissions that cannot be expressed in RBAC
- Fine-grained control: separate "Get" vs "List" vs "Purge" permissions per secret type
- Scenario where you want specific vault-only permissions that don't propagate from Azure RBAC scopes
- **Limitation:** Per-vault configuration — must configure each vault independently

## Decision Table

| Feature | RBAC | Access Policies |
|---|---|---|
| **Management scope** | Centralized (MG, subscription, RG) | Per-vault only |
| **Granularity** | Role-based (predefined roles) | Per-permission per secret type |
| **Inheritance** | ✅ (from parent scopes) | ❌ (vault-specific only) |
| **Managed Identity support** | ✅ (simple role assignment) | ✅ (but needs per-vault config) |
| **Azure AD group support** | ✅ | ✅ |
| **Audit** | ✅ (Azure Activity Log) | ✅ (Key Vault audit) |
| **Complexity at scale** | Low | High (each vault configured individually) |
| **Recommendation** | For new vaults | For existing vaults with fine-grained needs |

## Key Distinctions

- **Both** RBAC and Access Policies can be used on the same Key Vault — they are additive (union of permissions)
- RBAC is the **recommended model** for new deployments — simpler, centralized, inherits from parent scopes
- Access Policies allow **per-key/per-secret/per-certificate** granularity — RBAC roles do not distinguish between secret types
- When using **Managed Identity** + Key Vault: assign the MI a role (RBAC) — simpler than adding to vault access policy
- Access Policies are set per vault only — they do not inherit from management group or subscription
- For **exam scenarios**: if the question mentions centralized management or new vaults, choose RBAC; if it mentions fine-grained per-secret permissions or legacy vaults, choose Access Policies

## Related Cards

- [Workload Identity](identity-governance/workload-identity.md) — Managed Identity (System/User) vs Service Principal
- [Governance Tool](identity-governance/governance-tool.md) — Policy vs RBAC vs Blueprint vs Locks
- [Secure Secret Access Pattern](patterns/secure-secrets.md) — App Service / AKS + Managed Identity + Key Vault
