---
title: "Secure Secret Access: App Service / AKS + Managed Identity + Key Vault"
slug: secure-secrets
category: patterns
tags: [pattern, secrets, key-vault, managed-identity, security]
services:
  - Azure Key Vault
  - Azure Managed Identity
  - Azure App Service
  - Azure Kubernetes Service (AKS)
glossary:
  - Key Vault
  - Managed Identity
  - Azure App Service
  - AKS
  - Secret Store CSI Driver
---

## When to use this pattern

- Any application (Web App, Function, AKS pod, VM) that needs database credentials, API keys, or certificates
- Eliminate secrets from code, config files, and environment variables
- Compliance-driven — no credentials in source control
- Need automatic credential rotation without application restart

## Pattern Architecture

### App Service / Azure Functions

```
Web App / Function → Managed Identity → Key Vault → Secrets pulled at runtime
                                                                  \/
                                                     Connection strings in config?
                                                     No — MI + KV replace all secrets
```

### AKS

```
Pod → Secret Store CSI Driver → Managed Identity → Key Vault → Secrets mounted as volume or env vars
                                                                \/
                                                   Auto-rotation: Driver refreshes secrets on schedule
```

## Key Considerations

| Aspect | App Service | AKS |
|---|---|---|
| **Identity** | System or User MI | User MI via Workload Identity / AAD Pod Identity |
| **Secret retrieval** | `@Microsoft.KeyVault()` reference (env var / config) | CSI Driver → Volume mount / env var |
| **AKV reference** | ✅ (built-in, no SDK change) | ❌ (CSI Driver required) |
| **Rotation** | Restart required (app poll interval) | Scheduled (CSI Driver rotation) |
| **Secret types** | Connection strings, API keys, certs | Connection strings, API keys, certs |
| **Access control** | RBAC or Access Policies on KV | RBAC or Access Policies on KV |

## Key Distinctions

- App Service has **built-in Key Vault references** (`@Microsoft.KeyVault(...)`) — no SDK or library needed; secrets are injected into app settings at runtime
- AKS requires the **Secret Store CSI Driver** — install as add-on; secrets are mounted as volumes or environment variables
- Managed Identity **must** be assigned a role or access policy in Key Vault — otherwise, the identity cannot read secrets
- For **rotation**: in App Service, the app must be restarted to pick up rotated secrets (or poll manually) — in AKS, the CSI Driver refreshes on a schedule
- **Never** store connection strings in app settings, config files, or environment variables without Key Vault — this pattern eliminates that risk

## Related Cards

- [Workload Identity](identity-governance/workload-identity.md) — Managed Identity (System/User) vs Service Principal
- [Key Vault Access](identity-governance/keyvault-access.md) — RBAC vs Access Policies
- [Web App Security Stack](patterns/webapp-security-stack.md) — Front Door + App Gateway + WAF + NSG
