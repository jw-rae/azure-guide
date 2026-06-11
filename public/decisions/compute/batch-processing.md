---
title: "Batch Processing: Azure Batch vs Functions vs AKS"
slug: batch-processing
category: compute
tags: [batch, parallel, hpc, processing, scaling]
services:
  - Azure Batch
  - Azure Functions
  - Azure Kubernetes Service (AKS)
glossary:
  - Azure Batch
  - Azure Batch Job
  - Azure Batch Pool
  - Azure Functions
  - AKS
  - KEDA
---

## When to use Azure Batch

- Large-scale parallel processing (1000+ VMs)
- HPC workloads: scientific simulations, financial modeling, 3D rendering
- Tasks are independent and can run in parallel
- Need auto-scaling pools with low-priority/spot VMs for cost savings
- Workloads requiring custom VM images or containers
- Rendering or media transcoding jobs

## When to use Functions

- Event-driven batch processing (triggered by blob upload, queue message, timer)
- Smaller-scale parallel tasks (sub-minute per execution)
- Each task is short-lived (max 10 min on Consumption)
- Tight integration with Azure services (Event Grid, Cosmos DB, Storage)
- Need millisecond response to triggering events

## When to use AKS

- Containerized batch workloads needing Kubernetes job scheduling
- Batch + real-time workloads on the same cluster (hybrid)
- Complex job orchestration with dependencies between tasks
- Existing Kubernetes investment and expertise
- Need KEDA for event-driven scaling of batch containers

## Decision Table

| Feature | Azure Batch | Functions | AKS |
|---|---|---|---|
| **Scale** | 1000s of VMs | Thousands of executions | 100s of nodes |
| **Max execution per unit** | Unlimited | 10 min (Consumption) | Unlimited |
| **Parallelism** | Massive (independent tasks) | Moderate (per invocation) | High (pods + nodes) |
| **Auto-scale** | ✅ (pools) | ✅ (Consumption) | ✅ (cluster autoscaler, HPA, KEDA) |
| **Event-driven** | Manual or scheduled | ✅ (triggers) | ✅ (via KEDA) |
| **Cost model** | Pay-per-VM (spot available) | Pay-per-execution | Pay-per-node |
| **Spot instances** | ✅ | ❌ | ✅ |
| **Custom images** | ✅ | ❌ (limited) | ✅ |
| **Management overhead** | Medium (pool config) | None (serverless) | High (K8s ops) |

## Key Distinctions

- Azure Batch is designed for **massive parallelism** — Functions is designed for **event-driven individual tasks**
- Functions has a **10-minute execution limit** on Consumption — Azure Batch and AKS have no such limit
- Azure Batch supports **spot/low-priority VMs** for up to 90% cost savings — Functions does not
- AKS is the right choice when you need **both real-time and batch** on the same infrastructure
- For simple scheduled jobs (e.g., nightly file processing), Functions with Timer trigger is simpler than Azure Batch
- Azure Batch **auto-scales the pool** of VMs; Functions **auto-scales the number of executions** — different scaling models

## Related Cards

- [Compute Hosting](compute/compute-hosting.md) — VM vs App Service vs AKS vs ACA vs Functions
- [Container Hosting](compute/container-hosting.md) — ACI vs AKS vs ACA
- [Messageing Service](messaging/messaging-service.md) — Queue triggers for Functions
