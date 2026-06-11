---
title: "Workload Identity: Managed Identity (System/User) vs Service Principal"
slug: workload-identity
category: identity-governance
tags: [identity, managed-identity, service-principal, authentication, workload]
services:
  - Azure Managed Identity
  - Azure AD
glossary:
  - Managed Identity
  - Service Principal
  - System Assigned Managed Identity
  - User Assigned Managed Identity
  - Microsoft Entra ID
---

## When to use System-Assigned Managed Identity

- Single workload (one VM, one Function App, one AKS pod)
- Identity is tied to the resource lifecycle — deleted when the resource is deleted
- Simple setup — just enable on the resource, no manual provisioning
- Resource-specific permissions (e.g., "VM X can read from Key Vault Y")

## When to use User-Assigned Managed Identity

- Multiple workloads share the same identity (e.g., several Function Apps accessing the same database)
- Identity lifecycle is independent of any single resource
- Pre-provision the identity, then assign to resources as needed
- Blue/green deployments — assign identity before swap
- Consistent RBAC across scaling operations

## When to use Service Principal

- Non-Azure resources (on-prem servers, third-party SaaS, local scripts)
- Need client secret or certificate authentication (not certificate-only like MI)
- Cross-tenant access or OAuth2 flows not supported by Managed Identity
- Legacy applications with existing Service Principal integration
- **Limitation:** Manual credential management (secret rotation, expiry) — no automatic lifecycle

## Decision Table

| Feature | System MI | User MI | Service Principal |
|---|---|---|---|
| **Lifecycle** | Tied to resource | Independent | Independent |
| **Shared across resources** | ❌ | ✅ | ✅ |
| **Credential rotation** | Automatic (platform-managed) | Automatic (platform-managed) | Manual (admin-managed) |
| **Non-Azure resources** | ❌ | ❌ | ✅ |
| **Cross-tenant** | ❌ | ❌ | ✅ |
| **Setup effort** | Low (enable on resource) | Medium (create + assign) | High (register app, configure secret) |
| **Best for** | Single workload | Multiple workloads sharing identity | Non-Azure, cross-tenant, legacy |

## Key Distinctions

- Managed Identities are **free** — no cost for the identity itself; only the resources using them have costs
- Service Principals require **manual secret management** — Managed Identities handle certificate rotation automatically
- System MI is **deleted when the resource is deleted** — User MI persists until manually removed
- Both Managed Identity types are **Service Principals of a special kind** — they are security principals in Microsoft Entra ID but with automatic credential management
- For **AKS Pod Identity**: use Azure POD Identity or Azure Workload Identity (successor) — not directly assignable MI

## Related Cards

- [Hybrid Auth](identity-governance/hybrid-auth.md) — PHS vs PTA vs AD FS vs Cloud Sync
- [Key Vault Access](identity-governance/keyvault-access.md) — RBAC vs Access Policies
- [Secure Secret Access Pattern](patterns/secure-secrets.md) — App Service / AKS + Managed Identity + Key Vault
