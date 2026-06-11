---
title: "PaaS Connectivity: Service Endpoint vs Private Endpoint vs Private Link"
slug: paas-connectivity
category: networking
tags: [paas, connectivity, vnet, private-link, service-endpoint, security]
services:
  - Azure Private Link
glossary:
  - Service Endpoint
  - Private Endpoint
  - Private Link
  - VNet Service Endpoints
  - Private Link Service
  - Azure Bastion
---

## When to use Service Endpoint

- Secure PaaS access from a VNet to a specific Azure service (e.g., Storage, SQL DB, Cosmos DB)
- No additional cost — included with the VNet
- Traffic stays on the Azure backbone (no public internet, but traverses Azure fabric)
- Simple setup — just enable the service endpoint on a subnet
- **Limitation:** Does not ensure full isolation — the PaaS service still has a public endpoint; control is based on firewall rules allowing only the VNet/Subnet

## When to use Private Endpoint

- Full network isolation — the PaaS service gets a private IP in the VNet
- Traffic never leaves the VNet (or peered VNets)
- No public endpoint exposure required (set `public_network_access = Disabled`)
- Granular control over which VNet/Subnet can access which resource
- Required for compliance scenarios requiring complete internet isolation

## When to use Private Link

- Expose a custom service (e.g., a third-party SaaS or your own app) securely to other VNets
- Consumer: create a Private Endpoint in your VNet to connect to a Private Link Service
- Provider: expose your service via a Private Link Service behind a Standard Load Balancer
- Cross-tenant and cross-region connectivity (specific scenarios)
- Used to maintain isolation while enabling controlled access to PaaS and custom services

## Decision Table

| Feature | Service Endpoint | Private Endpoint | Private Link |
|---|---|---|---|
| **IP in VNet** | ❌ (Azure public IP) | ✅ (Private IP) | ✅ (Private IP) |
| **Public endpoint** | Exists (firewall restricted) | Can be disabled | Can be disabled |
| **Traffic path** | Azure backbone | VNet / peered VNet | VNet / peered VNet |
| **Cost** | Free | Paid (hourly + GB data) | Paid (hourly + GB data) |
| **Cross-tenant** | ❌ | ✅ | ✅ |
| **On-prem access** | Via VPN/ER (public IP) | Via VPN/ER (private IP) | Via VPN/ER (private IP) |
| **Granularity** | Subnet → Service | Specific resource | Specific resource / custom service |
| **Supported services** | Azure PaaS (Storage, SQL, Cosmos, etc.) | Azure PaaS + partner services | Custom services behind ILB |

## Key Distinctions

- Service Endpoint is **free** and secures PaaS access from a subnet — but the service still has a **public endpoint**
- Private Endpoint places the PaaS resource **inside the VNet** with a private IP — the public endpoint can be fully disabled
- Service Endpoint does **not** support on-premises access via VPN/ExpressRoute without the public endpoint — Private Endpoint does
- Private Link is the **technology behind** Private Endpoint; Private Link Service is the **provider side** for exposing custom services
- For **complete isolation**: Private Endpoint + disable public network access. For **simple VNet-to-PaaS access**: Service Endpoint (but still exposes public endpoint)
- Service Endpoint uses **route optimization** to keep traffic on Azure backbone; Private Endpoint uses **private IPs** for direct VNet integration

## Related Cards

- [Hybrid Connectivity](networking/hybrid-connectivity.md) — VPN vs ExpressRoute vs Virtual WAN
- [Network Security](networking/network-security.md) — NSG vs ASG vs Firewall vs WAF vs DDoS
- [SQL Security](databases/sql-security.md) — TDE vs Always Encrypted vs Dynamic Data Masking
