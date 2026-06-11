---
title: "Container Hosting: ACI vs AKS vs ACA"
slug: container-hosting
category: compute
tags: [containers, serverless, kubernetes, orchestration]
services:
  - Azure Container Instances (ACI)
  - Azure Kubernetes Service (AKS)
  - Azure Container Apps (ACA)
glossary:
  - ACI
  - AKS
  - Azure Container Apps (ACA)
  - Container
  - Container Group
  - Pod
  - KEDA
---

## When to use ACI

- Simple, short-lived containers (<10 minute tasks)
- Dev/test environments needing quick container spin-up
- Burst workloads or CI/CD build agents
- Batch processing jobs that don't need orchestration
- Multi-container groups with shared lifecycle (sidecar pattern)

## When to use AKS

- Production microservices requiring full Kubernetes orchestration
- Complex scheduling, service mesh, custom ingress controllers
- Teams with Kubernetes expertise needing control over node pools, CNI, cluster autoscaler
- Hybrid scenarios using Azure Arc-enabled Kubernetes
- Workloads needing GPU node pools for ML training

## When to use ACA

- Serverless container microservices without Kubernetes complexity
- Event-driven APIs that scale to zero when idle
- Background jobs triggered by cron, queues, or HTTP
- Dapr integration for pub/sub, state management, service discovery
- Teams wanting container benefits without managing Kubernetes control plane

## Decision Table

| Feature | ACI | AKS | ACA |
|---|---|---|---|
| **Orchestration** | None | Full Kubernetes | Built-in (Dapr) |
| **Management overhead** | None (serverless) | High (control plane managed, nodes managed by you) | Low (fully managed) |
| **Scaling** | Manual | Auto (cluster autoscaler, HPA, KEDA) | Auto (HTTP/events, scale to zero) |
| **Scale to zero** | ❌ | ✅ (via KEDA) | ✅ |
| **Networking** | Public IP/FQDN | CNI, load balancers, ingress | HTTP ingress, private VNet |
| **Startup time** | <10 seconds | Seconds–minutes (pod/node) | Sub-second |
| **Pricing** | Per-second (vCPU + memory) | Per-node + storage | Per-request (vCPU + memory) |
| **Max execution** | Unlimited | Unlimited | Unlimited |
| **Built-in LB** | ❌ | Via Service/Ingress | ✅ HTTP ingress |
| **Stateful workloads** | ❌ | ✅ (volumes, StatefulSets) | ❌ (stateless recommended) |

## Key Distinctions

- ACI is **fire-and-forget containers** — no orchestration, no scaling, no auto-healing
- AKS gives **full Kubernetes control** but requires operational overhead (node management, upgrades, monitoring)
- ACA is the **serverless middle ground** — container benefits without K8s complexity, scales to zero
- ACI cannot scale (one container group runs until stopped); ACA auto-scales based on HTTP traffic or events
- AKS requires you to manage worker nodes (VM SKU, scaling, updates); ACA manages everything
- KEDA enables event-driven scaling for AKS; ACA has this built-in

## Combo Pattern: Tiered Container Strategy

```
Simple job → ACI (fire-and-forget, <10 min, dev/test)
Serverless microservice → ACA (auto-scale, Dapr, scale to zero)
Production orchestration → AKS (full K8s, custom networking, GPU)
Burst capacity → AKS + Virtual Nodes (burst to ACI)
```

## Related Cards

- [Compute Hosting](compute/compute-hosting.md) — VM vs App Service vs AKS vs ACA vs Functions
- [AKS Networking](networking/aks-networking.md) — Kubenet vs Azure CNI vs Overlay
- [Batch Processing](compute/batch-processing.md) — Azure Batch vs Functions vs AKS
