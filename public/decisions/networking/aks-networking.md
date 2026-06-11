---
title: "AKS Networking: Kubenet vs Azure CNI vs Overlay"
slug: aks-networking
category: networking
tags: [aks, kubernetes, networking, cni, ip, pod]
services:
  - Azure Kubernetes Service (AKS)
glossary:
  - AKS
  - Azure CNI Networking
  - Kubenet Networking
  - AKS Cluster
---

## When to use Kubenet

- Limited IP address space — nodes get VNet IPs, pods get private IPs from a different CIDR
- No need for pod-to-pod communication across nodes without routing
- Lower IP consumption (only nodes consume VNet IPs)
- **Requirement:** Route table or UDR + forward IP configuration for cross-node pod communication
- Slower due to routing overhead (no direct pod IP assignment)
- Best for clusters where VNet IP address space is constrained

## When to use Azure CNI

- Each pod gets a **VNet IP** from the subnet — fastest pod networking (direct connectivity)
- Pods appear as VNet resources — allows NSG rules, UDRs, and Service Endpoints against pod IPs
- Full AKS network policy support (Calico, Azure Network Policy)
- **Limitation:** High IP consumption — each pod consumes a VNet IP, requiring large subnets or the Azure CNI Overlay mode
- Best for production clusters with sufficient IP address space

## When to use Azure CNI Overlay

- Pods get private IPs from an overlay CIDR (not the VNet subnet) — saves VNet IPs
- Direct pod-to-pod connectivity via overlay (no routing overhead like Kubenet)
- Supports up to 250 nodes and 250 pods per node (same as Azure CNI)
- Combines benefits of Azure CNI (direct connectivity, network policies) with Kubenet (IP conservation)
- Does **not** assign VNet IPs to pods — cannot apply NSG rules directly to pod IPs

## Decision Table

| Feature | Kubenet | Azure CNI | Azure CNI Overlay |
|---|---|---|---|
| **Pod IP assignment** | Private CIDR (non-VNet) | VNet subnet IP | Overlay CIDR (non-VNet) |
| **IP consumption** | Low (node IPs only) | High (each pod uses VNet IP) | Low (overlay CIDR) |
| **Pod-to-pod latency** | Higher (routing via UDR) | Lowest (direct) | Low (direct overlay) |
| **NSG on pod IP** | ❌ | ✅ | ❌ |
| **Network Policy** | ❌ | ✅ (Calico/Azure) | ✅ (Calico/Azure) |
| **Max pods per node** | 110 (default: 30) | 250 (subnet-limited) | 250 |
| **Max nodes** | 1000 | 1000 | 250 |
| **Setup complexity** | Low | Low | Medium |

## Key Distinctions

- Kubenet saves VNet IPs but adds **routing overhead** — best when IPs are scarce
- Azure CNI gives each pod a **VNet IP** — best performance but **most IP consumption**
- Azure CNI Overlay gives pods **non-VNet IPs** with direct connectivity — best of both worlds for IP conservation + performance, but **limited to 250 nodes**
- Windows node pools **require Azure CNI** — Kubenet and Overlay do not support Windows
- In Azure CNI mode, **you cannot apply NSG rules at pod level** (pods have VNet IPs, but NSG still operates on the NIC/subnet level)

## Related Cards

- [Container Hosting](compute/container-hosting.md) — ACI vs AKS vs ACA
- [AKS Monitoring Pattern](patterns/aks-monitoring.md) — Container Insights + Log Analytics + Workbooks + Alerts
- [Load Balancer](networking/load-balancer-comparison.md) — LB vs App Gateway vs Front Door vs Traffic Manager
