---
title: "Network Security: NSG vs ASG vs Firewall vs WAF vs DDoS"
slug: network-security
category: networking
tags: [security, firewall, nsg, waf, ddos, filtering]
services:
  - Azure Network Security Group (NSG)
  - Azure Application Security Group (ASG)
  - Azure Firewall
  - Azure Web Application Firewall (WAF)
  - Azure DDoS Protection
glossary:
  - NSG
  - ASG
  - Azure Firewall
  - WAF
  - DDoS Protection
  - Azure Bastion
---

## When to use NSG

- East-west traffic filtering within a VNet (subnet or NIC level)
- Permit/deny rules based on source/destination IP, port, protocol
- Simple allow/deny rules with priority (100–4096)
- Service Tags for Azure services (e.g., `AzureFrontDoor.Backend`, `Storage.WestEurope`)
- Default "deny all inbound, allow all outbound" — good security baseline

## When to use ASG

- Group VMs by application role (e.g., "Web", "API", "DB") — avoid IP-based rules
- Application-centric firewall rules: `Allow Web tier → API tier on port 443`
- Easier maintenance — add/remove VMs from ASG without updating NSG rules
- Combined with NSG: reference an ASG in an NSG rule

## When to use Azure Firewall

- Centralized outbound/inbound traffic inspection for the entire VNet
- FQDN-based filtering (e.g., allow `*.windowsupdate.com`)
- Threat intelligence-based filtering (Microsoft Threat Intel)
- NAT, SNAT, DNAT for inbound/outbound translations
- Enterprise-tier logging and analytics
- **Limitation:** Higher cost; overkill for simple east-west filtering

## When to use WAF

- Protect web applications from OWASP Top 10 attacks (SQLi, XSS, CSRF, RFI)
- HTTP/S layer filtering — inspect request bodies, headers, cookies
- Deployed with Application Gateway (regional) or Front Door (global)
- Bot mitigation, geo-filtering, rate limiting
- Managed rule sets (OWASP) + custom rules per application

## When to use DDoS Protection

- Protect public endpoints from volumetric DDoS attacks (L3/L4)
- Basic: free, always-on, Azure infrastructure-level defense
- Standard: $2,944/month + data, adaptive tuning, attack analytics, SLA-backed mitigation
- Required for high-profile workloads and compliance scenarios (e.g., PCI DSS)

## Decision Table

| Feature | NSG | ASG | Azure Firewall | WAF | DDoS Protection |
|---|---|---|---|---|---|
| **Layer** | L3/L4 | L3/L4 (logical group) | L3–L7 (with FQDN) | L7 (HTTP/S) | L3/L4 |
| **Scope** | Subnet / NIC | VM group | VNet / Hub | Regional (App Gateway) or Global (Front Door) | VNet / Subscription |
| **FQDN filtering** | ❌ (Service Tags only) | ❌ | ✅ | ❌ | ❌ |
| **OWASP protection** | ❌ | ❌ | ❌ | ✅ | ❌ |
| **Cost** | Free | Free | Paid (per deployment) | Paid (per WAF policy) | Basic: Free; Standard: Paid |
| **Rule priority** | 100–4096 | Within NSG rule ref | Priority-based | Custom rules + managed sets | Adaptive |
| **Central logging** | ❌ (per-resource logs) | ❌ | ✅ (Diagnostics + Sentinel) | ✅ (Diagnostics + Sentinel) | ✅ (DDoS telemetry) |

## Key Distinctions

- NSGs are **stateless?** Actually **stateful** — return traffic is automatically allowed
- ASGs are **not a security barrier** — they are **logical groupings** used by NSG rules
- Azure Firewall is a **managed firewall service** with centralized policy — NSG is a **distributed rule set** at subnet/NIC level
- WAF works at **Layer 7** (HTTP/S) — only protects web applications, not all traffic
- DDoS Basic is **always-on and free** but only protects Azure infrastructure (not your application) — DDoS Standard is **adaptive and mitigates application-layer attacks**
- For defense-in-depth: DDoS Standard (network edge) → Azure Firewall (hub) → WAF (web app) → NSG (subnet/NIC)

## Combo Pattern: Defense-in-Depth Stack

```
Internet → DDoS Protection (edge) → Azure Firewall (hub) → WAF on App Gateway or Front Door → NSG (subnet) → VM
```

## Related Cards

- [Load Balancer](networking/load-balancer-comparison.md) — LB vs App Gateway vs Front Door vs Traffic Manager
- [PaaS Connectivity](networking/paas-connectivity.md) — Service Endpoint vs Private Endpoint vs Private Link
- [Web App Security Stack](patterns/webapp-security-stack.md) — Front Door + App Gateway + WAF + NSG
