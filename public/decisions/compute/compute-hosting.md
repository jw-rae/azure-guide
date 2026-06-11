---
title: "Compute Hosting: VM vs App Service vs AKS vs ACA vs Functions"
slug: compute-hosting
category: compute
tags: [compute, hosting, iaas, paas, serverless, containers]
services:
  - Azure Virtual Machines
  - Azure App Service
  - Azure Kubernetes Service (AKS)
  - Azure Container Apps (ACA)
  - Azure Functions
glossary:
  - Virtual Machine (VM)
  - Azure App Service
  - AKS
  - Azure Container Apps (ACA)
  - Azure Functions
  - Serverless
  - Container
---

## When to use Virtual Machines

- Full OS and application control (IaaS)
- Lift-and-shift migration of legacy or COTS apps (SAP, Oracle, custom)
- N-tier architectures needing specific OS versions or configs
- Custom software requiring VM-level extensions or agents
- Maximum control over networking, storage, security

## When to use App Service

- Web apps, mobile backends, REST APIs (PaaS)
- Fast deployment with built-in load balancing, custom domains, managed TLS
- Auto-scaling without managing infrastructure
- Deployment slots for staging/prod swaps with zero downtime
- VNet integration for outbound connectivity to private resources

## When to use AKS

- Complex microservices requiring full Kubernetes orchestration
- Containerized workloads needing advanced scheduling, scaling, service mesh
- Hybrid deployments (on-prem + cloud) with consistent Kubernetes API
- Team has Kubernetes expertise and needs control over node pools, CNI, cluster autoscaler
- Requires additional TLS configuration compared to App Service

## When to use Container Apps

- Serverless microservices running in containers without Kubernetes complexity
- Event-driven APIs that scale to zero when idle
- Background jobs triggered by cron, queues, or HTTP
- Dapr integration for service discovery, pub/sub, state management
- Low operational overhead with auto-scaling built in

## When to use Functions

- Event-driven short-lived code (sub-minute execution)
- Triggers from 10+ Azure services (HTTP, Blob, Queue, Timer, Cosmos DB, Event Grid)
- Variable or unpredictable traffic with Consumption Plan (scale to zero)
- Lightweight API endpoints or data processing pipelines
- Not suited for long-running processes (>10 min)

## Decision Table

| Feature | VM | App Service | AKS | ACA | Functions |
|---|---|---|---|---|---|
| **Control level** | Full OS | App only | Container orchestration | Container runtime | Code only |
| **State management** | Full | Stateless recommended | Stateless/Stateful | Stateless | Stateless |
| **Startup time** | Minutes | Seconds | Seconds–minutes | Sub-second | Sub-second |
| **Scaling** | Manual/VMSS | Auto (10–30 instances) | Auto (pods + nodes) | Auto (scale to zero) | Auto (scale to zero) |
| **Scaling unit** | VM | Instance | Pod | Replica | Execution |
| **Persistence** | Any | Yes (slots, backups) | Volumes | Ephemeral/file | External only |
| **Built-in LB** | ❌ (needs LB) | ✅ | Via Service/Ingress | ✅ HTTP ingress | None |
| **Managed TLS** | ❌ | ✅ | ❌ (manual) | ❌ | Via APIM |
| **Max execution** | Unlimited | Unlimited | Unlimited | Unlimited | 10 min (Consumption) |
| **Cold start** | None | None | None | Low | Yes (Consumption) |

## SKU Considerations

| Service | SKU / Tier | Key Notes |
|---|---|---|
| **VM** | B-series | Burstable, low baseline, dev/test |
| | Dsv3/Dsv4 | General purpose, balanced CPU/memory |
| | Ev3/Ev4 | Memory optimized, SAP HANA |
| | Fsv2 | Compute optimized, batch processing |
| | Lsv2 | Storage optimized, high disk throughput |
| | NV/NC | GPU, ML/rendering |
| **App Service** | Free/Shared | Dev only, no scaling, no SLA |
| | Basic | 3 instances, manual scale, custom domains |
| | Standard | 10 instances, auto-scale, 5 deployment slots |
| | PremiumV3 | 30 instances, zone redundancy, faster CPUs |
| | IsolatedV2 | 100 instances, dedicated ASE, full isolation |
| **AKS** | — | Pay-per-node. Control plane managed by Azure |
| **ACA** | Consumption | Pay-per-execution (vCPU + memory) |
| | Dedicated | Reserved compute, predictable cost |
| **Functions** | Consumption | Auto-scale, pay-per-invocation, cold starts |
| | Premium | Pre-warmed instances, VNet integration |
| | Dedicated | Fixed VM on App Service plan |

## Key Distinctions

- Functions and Container Apps both scale to zero — Functions is code-only, ACA runs containers
- App Service is the only PaaS with **built-in load balancing, custom domains, and managed TLS** out of the box
- AKS gives the most control but requires K8s expertise and TLS config — choose only if orchestration features are needed
- ACA is the sweet spot between AKS (too complex) and Functions (too limited for container workloads)
- VM is always the fallback when nothing else supports the requirement

## Combo Pattern: Tiered Compute Strategy

```
Simple web API → Functions (serverless, low traffic)
Web app with UI → App Service (PaaS, slots, TLS)
Container microservice → Container Apps (serverless containers)
Complex orchestration → AKS (full Kubernetes)
Legacy migration → VM (IaaS lift-and-shift)
```

## Related Cards

- [Container Hosting](compute/container-hosting.md) — ACI vs AKS vs ACA
- [Functions vs Logic Apps](compute/functions-vs-logicapps.md) — Code vs workflow
- [App Service Tiers](compute/app-service-tiers.md) — Free through IsolatedV2
