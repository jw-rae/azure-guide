---
title: "Hybrid Connectivity: VPN vs ExpressRoute vs Virtual WAN"
slug: hybrid-connectivity
category: networking
tags: [hybrid, vpn, expressroute, virtual-wan, connectivity, on-premises]
services:
  - Azure VPN Gateway
  - ExpressRoute
  - Virtual WAN
glossary:
  - Azure VPN Gateway
  - ExpressRoute
  - Virtual WAN
  - S2S VPN
  - P2S VPN
  - Azure Bastion
  - Private Endpoint
---

## When to use VPN Gateway

- Cost-effective hybrid connectivity over the internet
- S2S VPN for site-to-site connectivity (IPsec/IKE)
- P2S VPN for remote users (OpenVPN, SSTP, IKEv2)
- Active-passive or active-active configurations (up to 10 Gbps)
- Good for dev/test or secondary DR connectivity
- **Limitation:** Traverses the public internet — latency and reliability depend on ISP

## When to use ExpressRoute

- Low-latency, high-throughput hybrid connectivity (dedicated circuit)
- Mission-critical workloads needing consistent network performance
- SLA-backed 99.95% availability (when configured with redundant connections)
- Data sovereignty / compliance — data never traverses the public internet
- Higher throughput requirements (up to 100 Gbps)
- Global Reach to connect on-prem sites through Microsoft backbone

## When to use Virtual WAN

- Global transit architecture — connect branch offices to Azure hub
- Combine S2S VPN, ExpressRoute, and P2S VPN in one orchestrated hub
- Built-in routing, encryption (between hubs), and network policies
- Multi-region deployment with automatic connectivity between hubs
- Large enterprise with many branch offices and multiple regions

## Decision Table

| Feature | VPN Gateway | ExpressRoute | Virtual WAN |
|---|---|---|---|
| **Connectivity type** | Internet (IPsec) | Dedicated private circuit | Multi-service hub (VPN + ER + P2S) |
| **Bandwidth** | Up to 10 Gbps | Up to 100 Gbps | Up to 100 Gbps combined |
| **Latency** | Variable (internet) | Consistent, low | Consistent (uses ExpressRoute where available) |
| **SLA** | 99.95% (dual instances) | 99.95% | 99.95% (per hub) |
| **Encryption** | ✅ (IPsec) | Optional (bypass) | ✅ (hub-to-hub) |
| **Global scope** | Regional | Regional + Global Reach | Global (multi-hub) |
| **Cost** | Low | High | Medium–High |
| **Setup complexity** | Medium | High | Medium |

## Key Distinctions

- VPN Gateway costs less than ExpressRoute but has **variable latency** and **lower throughput**
- ExpressRoute bypasses the **public internet** — mandatory for many compliance scenarios
- ExpressRoute requires **minimum 1 Gbps** for standard circuits; ExpressRoute Direct offers sub-1 Gbps options
- Virtual WAN is not a service you deploy — it's a **managed hub-and-spoke architecture** that can include VPN + ExpressRoute
- For **single-region hybrid** with low cost: VPN Gateway. For **global enterprise** with multiple regions: Virtual WAN
- Azure Bastion provides RDP/SSH access to VMs without public IPs — not a hybrid connectivity service; use alongside VPN/ExpressRoute

## Combo Pattern: Hybrid Connectivity Stack

```
Single-region → VPN Gateway (low cost, simple setup)
Multi-region → Virtual WAN (ExpressRoute primary, VPN backup)
High compliance → ExpressRoute + Private Endpoint (never touches internet)
Cost-sensitive DR → VPN Gateway secondary link + ExpressRoute primary
```

## Related Cards

- [VNet Connectivity](networking/vnet-connectivity.md) — Peering vs VPN Gateway vs ExpressRoute
- [PaaS Connectivity](networking/paas-connectivity.md) — Service Endpoint vs Private Endpoint vs Private Link
- [Database Migration](migration/database-migration.md) — Migrate vs DMA vs DMS vs Data Studio
