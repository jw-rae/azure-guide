---
title: "Public IP SKU: Basic vs Standard"
slug: public-ip-sku
category: networking
tags: [public-ip, sku, redundancy, availability, networking]
services:
  - Azure Public IP Address
glossary:
  - Public IP Address
  - SKU
  - Availability Zone
  - Basic Load Balancer
---

## When to use Basic SKU

- Dev/test environments where cost is primary concern
- Legacy deployments with Basic Load Balancer
- No availability zone requirement
- **Limitations:** Default outbound access (no explicit outbound configuration), no zone redundancy, no availability SLA, no support for cross-region scenarios
- **Note:** Basic Load Balancer is retiring in 2025 — plan migration

## When to use Standard SKU

- Production workloads requiring zone redundancy and SLA
- Paired with Standard Load Balancer, Application Gateway v2, or Front Door
- Explicit outbound connectivity via NAT Gateway or Standard LB outbound rules
- Cross-region peering scenarios
- Availability SLA of 99.99%

## Decision Table

| Feature | Basic SKU | Standard SKU |
|---|---|---|
| **Availability zone** | ❌ (not zone-redundant) | ✅ (zone-redundant or zonal) |
| **SLA** | ❌ (no SLA) | ✅ (99.99%) |
| **Outbound connectivity** | Default outbound access (implicit) | Explicit (NAT Gateway or LB outbound rules) |
| **Cross-region** | ❌ | ✅ |
| **Availability sets** | ✅ (supports) | ✅ (supports) |
| **Diagnostic logging** | ❌ | ✅ |
| **Security** | Open by default | Secure by default (closed until NSG permits) |
| **Cost** | Low | Medium |

## Key Distinctions

- Standard SKU is **secure by default** — inbound traffic is denied until an NSG permits it. Basic SKU is **open by default**.
- Standard SKU requires an **NSG** for any inbound traffic — Basic does not but is less secure
- Basic SKU uses **default outbound access** (no explicit configuration) — Standard requires explicit outbound through NAT Gateway or LB
- Standard Public IPs can be **zone-redundant** or assigned to a specific zone — Basic cannot
- Basic Load Balancer is **retiring in 2025** — migrate to Standard SKU for all new and existing production workloads

## Related Cards

- [Load Balancer](networking/load-balancer-comparison.md) — LB vs App Gateway vs Front Door vs Traffic Manager
- [Network Security](networking/network-security.md) — NSG vs ASG vs Firewall vs WAF vs DDoS
