---
title: "App Service Plan Tiers: Free through IsolatedV2"
slug: app-service-tiers
category: compute
tags: [app-service, sku, pricing, scaling, hosting]
services:
  - Azure App Service
skus:
  - Free
  - Shared
  - Basic
  - Standard
  - PremiumV2
  - PremiumV3
  - Isolated
  - IsolatedV2
glossary:
  - App Service Plan
  - Deployment Slot
  - VNet Integration
  - Private Endpoint
---

## When to use Free / Shared

- Development and testing only
- No SLA, no auto-scale, shared infrastructure
- Limited to 1 GB storage, limited compute

## When to use Basic

- Low-traffic production or staging apps
- Custom domains and SSL support
- Manual scaling up to 3 instances
- Daily backup support

## When to use Standard

- Production workloads with auto-scaling (up to 10 instances)
- Load balancing across instances
- 5 deployment slots for staged deployment with swap
- Daily backups, SSL, custom domains

## When to use PremiumV2 / PremiumV3

- Performance-sensitive apps requiring faster CPUs and SSD storage
- Zone redundancy for high availability
- Auto-scaling up to 30 instances
- VNet integration for outbound connectivity to private resources
- 20 deployment slots (PremV2) / 30 slots (PremV3)

## When to use Isolated / IsolatedV2

- Mission-critical apps requiring network isolation (dedicated App Service Environment)
- Compliance or security requirements for single-tenant compute
- Auto-scaling up to 100 instances
- Highest performance with dedicated hardware
- Private inbound access via ASE

## Decision Table

| Feature | Free | Shared | Basic | Standard | PremiumV3 | IsolatedV2 |
|---|---|---|---|---|---|---|
| **SLA** | ❌ | ❌ | 99.95% | 99.95% | 99.95% | 99.95% |
| **Max instances** | — | — | 3 | 10 | 30 | 100 |
| **Auto-scale** | ❌ | ❌ | ❌ | ✅ | ✅ | ✅ |
| **Custom domains** | ❌ | ❌ | ✅ | ✅ | ✅ | ✅ |
| **SSL** | ❌ | ❌ | ✅ (SNI) | ✅ (SNI + IP) | ✅ | ✅ |
| **Deployment slots** | ❌ | ❌ | ❌ | 5 | 20 | 20 |
| **VNet integration** | ❌ | ❌ | ❌ | ✅ | ✅ | ✅ |
| **Zone redundancy** | ❌ | ❌ | ❌ | ❌ | ✅ | ✅ |
| **Environment** | Shared | Shared | Dedicated | Dedicated | Dedicated | Isolated (ASE) |
| **Storage** | 1 GB | 1 GB | 10 GB | 50 GB | 250 GB | 1 TB |

## SKU Considerations

| Generation | Compute | Storage | Network |
|---|---|---|---|
| **PremiumV2** | Faster CPUs | SSD | Standard bandwidth |
| **PremiumV3** | Fastest CPUs (up to 4x P2) | Premium SSD | Higher bandwidth, zone redundancy |
| **Isolated** | Dedicated VMs | SSD | Full network isolation |
| **IsolatedV2** | Dedicated VMs, faster CPUs | Premium SSD | Zone redundancy, private IPs, faster scaling |

## Key Distinctions

- Free and Shared tiers have **no SLA** — never use for production
- Basic is the lowest tier with an SLA but **no auto-scaling** and **no deployment slots**
- Standard is the minimum for **production readiness** (auto-scale, slots, LB)
- PremiumV3 enables **zone redundancy** — required for HA across availability zones
- IsolatedV2 is single-tenant (ASE) — for compliance or when you need network isolation from other customers
- Deployment slots are available from **Standard** upward — not in Basic
- VNet integration (outbound) from **Standard** upward — Premium adds faster connectivity

## Combo Pattern: Cost vs Capability Scaling

```
Free/Shared → Prototyping (no SLA, no scaling)
Basic → Low-traffic prod (manual scale, 3 instances)
Standard → Production (auto-scale, slots, LB) ← Sweet spot
PremiumV3 → High-perf + zone redundancy
IsolatedV2 → Compliance + max scale + isolation
```

## Related Cards

- [Compute Hosting](compute/compute-hosting.md) — VM vs App Service vs AKS vs ACA vs Functions
- [Container Hosting](compute/container-hosting.md) — ACI vs AKS vs ACA
