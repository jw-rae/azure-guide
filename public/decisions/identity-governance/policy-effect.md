---
title: "Policy Effect: Audit vs Deny vs Modify vs Append"
slug: policy-effect
category: identity-governance
tags: [policy, effect, compliance, enforcement, remediation]
services:
  - Azure Policy
glossary:
  - Azure Policy
  - Policy Initiative
  - RBAC
  - Management Group
  - Azure Resource Graph
---

## When to use Audit

- Determine current compliance posture without blocking deployments
- Identify resources violating standards before enforcing Deny
- Reporting — which resources are non-compliant and what they are missing
- Safe starting point for new policies (measure before blocking)

## When to use Deny

- Block non-compliant resource creation or update
- Enforce mandatory tags, allowed SKUs, specific regions
- Prevent deployment of unapproved resource types
- **Limitation:** Only blocks new/updated resources — existing non-compliant resources are not affected

## When to use Modify

- Auto-fix non-compliant resources without manual intervention
- Append missing tags, enable encryption, enforce backup
- Uses a managed identity (remediation task) to apply changes
- **Requirement:** Policy must have `roleDefinitionIds` to grant the managed identity permissions

## When to use Append

- Add additional fields to a resource during creation/update (e.g., `tags.costCenter`)
- Does **not** alter existing resources — only applies during create or update
- Useful for adding tags or configuration fields that must be present
- Cannot remove or modify existing fields — only add new fields

## When to use DeployIfNotExists

- Deploy a resource or configuration if it does not exist (e.g., enable diagnostics on all VMs)
- Provision missing infrastructure like network watchers, diagnostic settings
- Requires a remediation task with managed identity

## When to use Manual

- Evaluate compliance outside of Azure Policy's scope (e.g., on-premises resources)
- Requires manual attestation by an authorized user
- Used for evidence-based compliance reporting

## Decision Table

| Effect | Prevents creation | Auto-fixes | Existing resources | Use case |
|---|---|---|---|---|
| **Audit** | ❌ | ❌ | ✅ (flags non-compliance) | Compliance baseline, discovery |
| **Deny** | ✅ | ❌ | ❌ (existing unaffected) | Block specific SKUs, regions, types |
| **Modify** | ✅ (on update) | ✅ (automatic) | ✅ (remediation task) | Enforce encryption, add tags |
| **Append** | ✅ (on create) | ❌ | ❌ (create/update only) | Add missing fields, tags |
| **DeployIfNotExists** | ❌ | ✅ (deploy missing) | ✅ (remediation task) | Deploy diagnostics, network watchers |
| **Manual** | ❌ | ❌ | ✅ (manual attestation) | On-prem compliance evidence |

## Key Distinctions

- Audit is **non-blocking** — use first to understand compliance posture before enforcing Deny
- Deny only affects **new or updated** resources — existing non-compliant resources are not blocked
- Modify requires a **managed identity** and `roleDefinitionIds` — Append does not
- Append adds fields to a resource but **cannot remove or change existing fields** — Modify can
- DeployIfNotExists **evaluates periodically** and triggers remediation — does not prevent creation
- **Multiple policies can apply** — most restrictive Deny wins (policy conflict resolution: Deny overrides Audit)

## Related Cards

- [Governance Tool](identity-governance/governance-tool.md) — Policy vs RBAC vs Blueprint vs Locks
- [Key Vault Access](identity-governance/keyvault-access.md) — RBAC vs Access Policies
