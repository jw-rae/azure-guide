---
title: "Web App Security Stack: Front Door + App Gateway + WAF + NSG"
slug: webapp-security-stack
category: patterns
tags: [pattern, webapp, security, defense-in-depth, waf]
services:
  - Azure Front Door
  - Azure Application Gateway
glossary:
  - Azure Front Door
  - Azure Application Gateway
  - Azure Web Application Firewall (WAF)
  - NSG
  - DDoS Protection
---

## When to use this pattern

- Public-facing web applications requiring defense-in-depth at global + regional scope
- Multi-region deployment with global load balancing + regional routing
- Compliance-driven WAF requirements (OWASP Top 10)
- Need to block traffic at the edge before it reaches the application

## Pattern Architecture

```
Internet
  │
  ├─ DDoS Protection (subscription-level)
  │
  ├─ Front Door (global WAF + CDN + TLS offload + anycast)
  │   │
  │   └─ Region 1              └─ Region 2
  │      └─ App Gateway            └─ App Gateway
  │         (regional WAF + path     (regional WAF + path
  │          routing + SSL term)      routing + SSL term)
  │            │                         │
  │         VMSS / App Service        VMSS / App Service
  │            │                         │
  │         NSG (restrict to         NSG (restrict to
  │          App Gateway subnet)      App Gateway subnet)
```

## Key Considerations

| Layer | Component | Purpose |
|---|---|---|
| **Global edge** | DDoS Protection | Volumetric attack mitigation at subscription level |
| **Global LB** | Front Door (Standard/Premium) | Global anycast, CDN caching, TLS offload, WAF managed rules |
| **Regional LB** | Application Gateway v2 | URL path routing, SSL termination, WAF custom rules |
| **Subnet security** | NSG | Restrict inbound to App Gateway subnet only |

## Key Distinctions

- Front Door provides **global WAF** (OWASP managed rules at edge) — App Gateway provides **regional WAF** (custom rules + OWASP)
- Front Door **TLS terminates at the edge** — App Gateway may terminate again depending on backend
- NSG with **service tag** `AzureFrontDoor.Backend` restricts inbound traffic to only Front Door — App Gateway subnet restricts VMSS to only App Gateway
- For **single-region** apps: App Gateway + WAF is sufficient (no need for Front Door)
- For **multi-region** apps: Front Door + App Gateway per region provides defense-in-depth

## Related Cards

- [Load Balancer](networking/load-balancer-comparison.md) — LB vs App Gateway vs Front Door vs Traffic Manager
- [Network Security](networking/network-security.md) — NSG vs ASG vs Firewall vs WAF vs DDoS
- [Secure Secret Access Pattern](patterns/secure-secrets.md) — App Service / AKS + Managed Identity + Key Vault
