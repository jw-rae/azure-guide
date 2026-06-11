---
title: "Load Balancer vs Application Gateway vs Front Door vs Traffic Manager"
slug: load-balancer-comparison
category: networking
tags: [load-balancing, traffic-distribution, layer4, layer7, global, regional]
services:
  - Azure Load Balancer
  - Azure Application Gateway
  - Azure Front Door
  - Azure Traffic Manager
glossary:
  - Azure Load Balancer
  - Azure Application Gateway
  - Azure Front Door
  - Azure Traffic Manager
  - Health Probe
  - Session Persistence
  - WAF
---

## When to use Azure Load Balancer

- Layer 4 (TCP/UDP) traffic distribution — databases, NVAs, non-HTTP workloads
- Regional high availability for IaaS VMs or VMSS
- Internal (private) or external (public) traffic within a region
- HA Ports mode for NVAs and high-availability appliances

## When to use Azure Application Gateway

- Layer 7 (HTTP/HTTPS) routing — web apps, REST APIs
- URL path-based routing (`/images` → pool A, `/api` → pool B)
- SSL termination at the gateway (offloads backend)
- WAF integration for OWASP Top 10 protection (SQLi, XSS)
- Cookie-based session affinity
- **Regional only** — single-region deployments

## When to use Azure Front Door

- Global HTTP/HTTPS load balancing across regions (anycast)
- CDN with edge caching for static and dynamic content
- WAF with OWASP Core Rule Set at global edge
- SSL offloading and custom security headers
- Sub-millisecond failover between regions
- TLS termination for both Azure FQDNs and custom domains

## When to use Azure Traffic Manager

- DNS-based traffic distribution (not proxy-based)
- Routing methods: Priority, Weighted, Performance, Geographic, Multivalue, Subnet
- Global endpoint failover without HTTP inspection
- Slower failover due to DNS TTL caching
- Does **not** provide caching, SSL termination, or WAF

## Decision Table

| Feature | Load Balancer | App Gateway | Front Door | Traffic Manager |
|---|---|---|---|---|
| **OSI Layer** | Layer 4 (TCP/UDP) | Layer 7 (HTTP/HTTPS) | Layer 7 (HTTP/HTTPS) | Layer 4 (DNS) |
| **Scope** | Regional | Regional | Global | Global |
| **SSL Termination** | ❌ | ✅ | ✅ | ❌ |
| **WAF** | ❌ | ✅ | ✅ | ❌ |
| **Caching** | ❌ | ❌ | ✅ (CDN edge) | ❌ |
| **URL Path Routing** | ❌ | ✅ | ✅ | ❌ |
| **Session Affinity** | ✅ (Client IP) | ✅ (Cookie) | ✅ (Cookie) | ❌ |
| **Health Probes** | TCP/HTTP/HTTPS | HTTP/HTTPS | HTTP/HTTPS | HTTP/HTTPS (DNS) |
| **Private IP Support** | ✅ | ✅ | ❌ (public only) | ❌ (DNS only) |
| **Anycast** | ❌ | ❌ | ✅ | ❌ |

## SKU Considerations

| Service | SKU | Key Notes |
|---|---|---|
| **Load Balancer** | Basic | Retiring 2025. No port forwarding, no HTTPS probes, no zone redundancy |
| | Standard | Port forwarding, HTTPS health probes, availability set backend, zone redundancy |
| | Gateway | Specialized for VPN scenarios |
| **App Gateway** | v1 | Fixed capacity, no auto-scale |
| | v2 | Auto-scale, zone redundancy, higher throughput |
| **Front Door** | Classic | Legacy. Standard + Premium features mixed |
| | Standard | Caching, SSL offload, WAF (custom rules) |
| | Premium | WAF (managed rules + bot protection), private link origin, health probes |
| **Traffic Manager** | — | No SKUs. Performance varies by DNS TTL configuration |

## Key Distinctions

- Traffic Manager does **not** proxy traffic — it returns a DNS record. No caching, no SSL, no WAF.
- Basic Load Balancer lacks port forwarding and HTTPS probes — often a trap answer for "internal load balancer with port forwarding"
- Application Gateway is **regional**, Front Door is **global**. Both offer WAF but at different scopes.
- Front Door + App Gateway can be chained: Front Door globally → App Gateway regionally for layered WAF
- NSG Service Tags can restrict inbound traffic to only originate from Front Door (`AzureFrontDoor.Backend`)

## Combo Pattern: Front Door → App Gateway → VMSS

```
Internet → Front Door (global WAF + CDN) → App Gateway (regional WAF + path routing) → VMSS (backend pool)
```
- Front Door handles global DDoS, CDN caching, TLS offload
- App Gateway adds regional URL-based routing and second WAF layer
- NSG restricts backend to only accept traffic from App Gateway subnet

## Related Cards

- [Hybrid Connectivity](migration/hybrid-connectivity.md) — VPN vs ExpressRoute vs Virtual WAN
- [Network Security Layers](networking/network-security.md) — NSG vs ASG vs Firewall vs WAF vs DDoS
