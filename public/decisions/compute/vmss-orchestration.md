---
title: "VM Scale Set Orchestration: Uniform vs Flexible"
slug: vmss-orchestration
category: compute
tags: [vmss, scaling, orchestration, vm, availability]
services:
  - Virtual Machine Scale Set (VMSS)
skus:
  - Uniform orchestration
  - Flexible orchestration
glossary:
  - Virtual Machine Scale Set (VMSS)
  - Scale Out
  - Scale In
  - Availability Zone
---

## When to use Uniform

- Large-scale stateless workloads (hundreds to thousands of identical VMs)
- Batch processing, CI/CD build farms, render farms
- All VMs must be identical (same SKU, image, config)
- Using autoscale rules based on CPU/memory metrics
- Need simple scaling with predictable instance naming

## When to use Flexible

- High availability with mixed VM types, spot instances, or different SKUs
- Existing VMs that need to be grouped into a scale set without re-creation
- Need to spread VMs across availability zones and fault domains
- Application requires VM-level identity (different hostnames, configurations)
- Orchestration mode required for newer Azure features (e.g., Trusted Launch, Confidential VMs)

## Decision Table

| Feature | Uniform | Flexible |
|---|---|---|
| **Instance identity** | Identical (same SKU/image) | Mixed (different SKUs, spot, images) |
| **Existing VMs** | Must be created via scale set | Can add existing VMs |
| **Availability zones** | ✅ | ✅ |
| **Fault domains** | Virtual (managed by Azure) | Physical (spread across FD 1, 2, 3) |
| **Autoscale** | ✅ | ✅ (via VMSS autoscale rules or custom) |
| **Instance naming** | Predictable (base_name + index) | VM-defined |
| **Trusted Launch** | Limited | ✅ |
| **Spot instances** | ✅ | ✅ |
| **Max instances** | 1000 | 1000 |
| **Orchestration flexibility** | Low (all identical) | High (per-VM variation) |

## Key Distinctions

- Uniform requires all VMs to be **identical** — Flexible allows **mixed SKUs, spot + on-demand, different images**
- Flexible uses **physical fault domains** (max 3), Uniform uses **virtual fault domains** (up to 5)
- Flexible can include **existing VMs** — Uniform requires creation through the scale set
- Uniform is best for **large-scale stateless** — Flexible is best for **HA with variation**
- Both support autoscaling, but Flexible gives more control over scale-in policy (which VMs to remove)

## Related Cards

- [Compute Hosting](compute/compute-hosting.md) — VM vs App Service vs AKS vs ACA vs Functions
- [Load Balancer Comparison](networking/load-balancer-comparison.md) — Load Balancer SKUs for VMSS backends
