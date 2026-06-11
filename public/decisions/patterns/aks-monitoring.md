---
title: "AKS Monitoring: Container Insights + Log Analytics + Workbooks + Alerts"
slug: aks-monitoring
category: patterns
tags: [pattern, aks, monitoring, kubernetes, observability]
services:
  - Azure Kubernetes Service (AKS)
  - Azure Monitor
  - Container Insights
glossary:
  - AKS
  - Azure Monitor
  - Log Analytics
  - Container Insights
  - Prometheus Metrics
  - Azure Managed Grafana
---

## When to use this pattern

- Any AKS cluster requiring production monitoring — always enable Container Insights
- Need visibility into cluster health, node/pod/container metrics, logs, and alerts
- Kubernetes-native monitoring but delivered through Azure Monitor
- Enable Prometheus metrics scraping for custom application metrics
- Use Grafana for visualization if Azure Monitor Workbooks are not sufficient

## Pattern Architecture

```
AKS Cluster (Managed)
  │
  ├─ Container Insights (AMA for AKS → Log Analytics)
  │   ├─ Node metrics (CPU, memory, disk, network)
  │   ├─ Pod/Container metrics (restarts, requests, limits)
  │   └─ Kubelet / K8s API server logs
  │
  ├─ Prometheus Metrics (Managed Prometheus)
  │   └─ Custom app metrics scraping
  │
  ├─ Workbooks (dashboards)
  │   ├─ Cluster health
  │   ├─ Node/node pool health
  │   ├─ Pod/pod count
  │   └─ Custom workbook authors
  │
  └─ Alerts (Metric + Log-based)
      ├─ Node CPU > 80%
      ├─ Pod restart count > threshold
      ├─ OOMKilled containers
      └─ Custom KQL-based alerts
```

## Key Considerations

| Aspect | Container Insights | Managed Prometheus | Grafana |
|---|---|---|---|
| **Metrics** | Node, pod, container (predefined) | Custom app metrics (scrape) | Visualization for both |
| **Logs** | Stdout, stderr, kubelet, API server | ❌ | ❌ |
| **Alerts** | ✅ (Metric + Log-based) | ✅ (PromQL) | ❌ |
| **Cost** | Pay-per-GB ingested | Pay-per-ingested samples | Pay-per-instance |
| **Best for** | Standard AKS monitoring | Custom app observability | Advanced dashboards |

## Key Distinctions

- Container Insights is **enabled per cluster** — it installs Azure Monitor Agent (AMA) for AKS on the cluster to collect container logs, metrics, and inventory
- Container Insights data is stored in **Log Analytics** — query with KQL for diagnostics and troubleshooting
- **Prometheus metrics** (managed) are separate from Container Insights — for scraping custom application metrics
- **Azure Managed Grafana** is optional — Azure Monitor Workbooks provide sufficient dashboards for most teams
- **Diagnostic settings** on AKS cluster enable control plane logs (kube-apiserver, kube-controller-manager, kube-scheduler) — enable these for full visibility
- AKS monitoring is **not complete** without Container Insights — this is the first thing to enable for any production cluster

## Related Cards

- [AKS Networking](networking/aks-networking.md) — Kubenet vs Azure CNI vs Overlay
- [Container Hosting](compute/container-hosting.md) — ACI vs AKS vs ACA
- [Monitoring Solution](monitoring-backup/monitoring-solution.md) — Monitor vs Log Analytics vs App Insights vs Sentinel
