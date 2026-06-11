---
title: "Governance Tool: Policy vs RBAC vs Blueprint vs Locks"
slug: governance-tool
category: identity-governance
tags: [governance, policy, rbac, blueprint, locks, compliance]
services:
  - Azure Policy
  - Azure RBAC
  - Azure Blueprints (deprecated)
glossary:
  - Azure Policy
  - RBAC
  - Azure Blueprints
  - Management Group
  - Azure Resource Graph
  - Resource Lock
---

## When to use Azure Policy

- Enforce organizational standards and compliance rules at resource creation
- "Deny" or "Audit" resource configurations (e.g., "only allow Standard_LRS in production")
- "Modify" deployed resources (e.g., append tags, enforce encryption)
- Built-in policy definitions for NIST, CIS, ISO 27001, etc.
- Policy-driven remediation tasks

## When to use Azure RBAC

- Grant specific permissions to users/groups at a scope (management group, subscription, resource group, resource)
- Role-based access: Owner, Contributor, Reader, or custom roles
- "Who can do what" — principle of least privilege
- Built-in roles or custom role definitions

## When to use Azure Blueprints (deprecated)

- Package Azure Policy, RBAC, Resource Groups, ARM templates into a repeatable deployment
- Environment compliance templates (e.g., "Dev subscription", "Prod subscription")
- **Note:** Blueprints is **deprecated** — use Deployment Stacks or Terraform as modern alternatives
- Do not use for new projects

## When to use Resource Locks

- Prevent accidental deletion or modification of critical resources
- `CanNotDelete` — resource can be read/modified but not deleted
- `ReadOnly` — resource can only be read (cannot be modified or deleted)
- Applied at subscription, resource group, or resource level
- **Limitation:** Not a security boundary — locks are RBAC-aware; an Owner can remove a lock

## Decision Table

| Feature | Policy | RBAC | Blueprint (Deprecated) | Resource Lock |
|---|---|---|---|---|
| **Purpose** | "What can be created" | "Who can do what" | "Package of governance" | "Prevent deletion/modification" |
| **Scope** | MG, subscription, RG, resource | MG, subscription, RG, resource | Subscription, RG | Subscription, RG, resource |
| **Prevents creation** | ✅ (Deny effect) | ❌ (permission to create) | ✅ (via policy inclusion) | ❌ (only deletion/modification) |
| **Prevents deletion** | ❌ | ❌ | ❌ | ✅ (CanNotDelete) |
| **Remediation** | ✅ (DeployIfNotExists, Modify) | ❌ | ✅ (via policy) | ❌ |
| **Requires elevated role** | Contributor/Policy Contributor | Owner/User Access Admin | Owner | Owner (to remove) |
| **Inherits** | ✅ | ✅ | ✅ | ✅ |

## Key Distinctions

- Policy is an **allow/deny guardrail** at resource creation — RBAC is a **permission model** for control plane actions
- Policy can **enforce resource properties** (e.g., "all VMs must be Standard_D series") — RBAC cannot
- RBAC controls **who** can deploy or manage resources — Policy controls **what** resources can be deployed
- **Resource Locks** override RBAC — even an Owner cannot delete a resource with `CanNotDelete` lock without first removing the lock
- Policy effects: `Audit` (log non-compliance), `Deny` (block creation), `Modify` (auto-fix), `Append` (add fields), `DeployIfNotExists` (remediate)
- Azure Blueprints is **deprecated** — do not use for new implementations; use Deployment Stacks, Terraform, or Bicep instead

## Related Cards

- [Policy Effect](identity-governance/policy-effect.md) — Audit vs Deny vs Modify vs Append
- [Key Vault Access](identity-governance/keyvault-access.md) — RBAC vs Access Policies
- [Entra ID License](identity-governance/license-tiers.md) — Free vs P1 vs P2 vs Governance
