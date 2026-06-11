---
title: "VNet Connectivity: Peering vs VPN Gateway vs ExpressRoute"
slug: vnet-connectivity
category: networking
tags: [vnet, peering, connectivity, hub-spoke, transit]
services:
  - Azure Virtual Network
  - Azure VPN Gateway
  - ExpressRoute
glossary:
  - VNet Peering
  - VPN Gateway
  - ExpressRoute
  - Virtual WAN
---

## When to use VNet Peering

- Connect VNets within the same Azure region or across regions (global peering)
- Low-latency, high-bandwidth connectivity between VNets
- No gateway required — direct Azure backbone connection
- Transitive routing is **not supported** — peering is non-transitive (use hub-spoke or Virtual WAN for transitive)
- Best for hub-and-spoke or multi-VNet architectures within the same organization

## When to use VPN Gateway (VNet-to-VNet)

- Connect VNets across regions where peering is not desired
- Cross-subscription VNet connectivity
- Encrypted tunneling (IPsec/IKE) — when encryption in transit is required
- Transitive routing is **not supported** — each VPN connection is individual
- Slower than peering (gateway throughput limits apply)

## When to use ExpressRoute (VNet connectivity)

- Connect on-premises networks to Azure VNets with dedicated private circuits
- Not typically used for VNet-to-VNet connectivity (peering is faster and cheaper)
- Paired with Virtual WAN for global hub-and-spoke transit
- Use when on-premises VNet connectivity requires consistent latency and SLA

## Decision Table

| Feature | VNet Peering | VPN Gateway (VNet-to-VNet) | ExpressRoute |
|---|---|---|---|
| **Use case** | VNet-to-VNet (same org) | Cross-subscription, encrypted | On-prem to VNet |
| **Latency** | Lowest (Azure backbone) | Higher (gateway) | Lowest (dedicated circuit) |
| **Bandwidth** | Up to 100 Gbps | Up to 10 Gbps | Up to 100 Gbps |
| **Encryption** | Azure backbone (internal) | ✅ (IPsec) | Optional (MACsec) |
| **Transitive routing** | ❌ (non-transitive by default) | ❌ | ❌ (unless Virtual WAN) |
| **Cost** | Low (ingress/egress) | Medium (gateway hours + data) | High (circuit + port) |
| **SLA** | 99.99% | 99.95% | 99.95% |

## Key Distinctions

- VNet Peering supports **transitive routing only through a hub VNet** with a network virtual appliance (NVA) or Azure Firewall
- VPN Gateway VNet-to-VNet connections are **encrypted** but **slower** than peering
- ExpressRoute is **not cost-effective for VNet-to-VNet** connectivity — use peering for Azure-internal VNet connections
- For **hub-and-spoke with Azure Firewall**: use VNet Peering (spokes peer to hub, force-tunnel through Azure Firewall)
- For **global transit**: Virtual WAN provides transitive routing between VNets and branches — avoid manual peering mesh

## Related Cards

- [Hybrid Connectivity](networking/hybrid-connectivity.md) — VPN vs ExpressRoute vs Virtual WAN
- [Network Security](networking/network-security.md) — NSG vs ASG vs Firewall vs WAF vs DDoS
