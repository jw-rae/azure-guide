---
title: "SQL Purchasing Model: vCore vs DTU vs Serverless vs Hyperscale"
slug: sql-purchasing-model
category: databases
tags: [sql, purchasing, compute, storage, scaling]
services:
  - Azure SQL Database
  - Azure SQL Managed Instance
skus:
  - vCore General Purpose
  - vCore Business Critical
  - vCore Hyperscale
  - DTU Basic
  - DTU Standard
  - DTU Premium
  - Serverless
  - Elastic Pool
glossary:
  - vCore
  - DTU
  - vCore Compute Tiers
  - Elastic Pool
  - Hyperscale
  - Azure Hybrid Benefit (SQL)
---

## When to use vCore (Recommended)

- Need independent selection of compute and storage
- Require backup storage replication options: LRS, ZRS, RA-GRS
- Want Azure Hybrid Benefit for existing SQL Server licenses
- Need Reservation pricing (1- or 3-year) for cost savings
- Business Critical tier for low-latency, in-memory OLTP, up to 4 TB
- Hyperscale tier for databases up to 100 TB with fast scaling

## When to use DTU (Legacy)

- Simple, bundled compute + storage + I/O in fixed tiers
- Existing DTU-based deployments not requiring flexibility
- Premium tier for read scale-out (one readable secondary)
- **Limitations:** No independent compute/storage selection, no backup replication options (LRS/ZRS/RA-GRS), no Azure Hybrid Benefit, no Reservation

## When to use Serverless

- Intermittent, unpredictable workloads that can pause when idle
- Dev/test environments with long idle periods
- Auto-scales compute and pauses (compute billed per vCore/second)
- **Limitations:** No Azure Hybrid Benefit, no independent compute/storage selection, no Reservation

## When to use Elastic Pool

- Multiple databases with variable, shared resource usage
- Cost-efficient when databases peak at different times
- **Limitations:** No Serverless tier, Hyperscale in preview only, no independent compute/storage selection

## Decision Table

| Feature | vCore (Provisioned) | vCore (Serverless) | DTU | Elastic Pool |
|---|---|---|---|---|
| **Compute/Storage independent** | ✅ | ❌ | ❌ | ❌ |
| **Backup storage replication (LRS/ZRS/RA-GRS)** | ✅ | ❌ | ❌ | ❌ |
| **Azure Hybrid Benefit** | ✅ | ❌ | ❌ | ❌ |
| **Reservation (1-3 year)** | ✅ | ❌ | ❌ | ❌ |
| **Auto-pause** | ❌ | ✅ | ❌ | ❌ |
| **Read scale-out** | B.C. only | ❌ | Premium only | ❌ |
| **Max storage** | 4 TB (GP/BC), 100 TB (HS) | 4 TB | 1 TB (Premium) | 4 TB per DB |
| **Zone redundancy** | GP/BC | ❌ | Premium only | ❌ |

## Tier-Specific Details

| Tier | SLA | Read Replicas | Max Size | Best For |
|---|---|---|---|---|
| **vCore General Purpose** | 99.9% | 0 | 4 TB | Balanced budget workloads |
| **vCore Business Critical** | 99.95% | 1 | 4 TB | Low-latency, in-memory OLTP |
| **vCore Hyperscale** | 99.95% | Up to 4 | 100 TB | Very large databases, fast scaling |
| **DTU Basic** | 99.9% | 0 | 2 GB | Dev/test, light workloads |
| **DTU Standard** | 99.95% | 0 | 250 GB | Balanced workloads |
| **DTU Premium** | 99.99% | 1 | 1 TB | High I/O transactions |

## Key Distinctions

- vCore is always the **recommended** model — DTU is legacy and lacks features
- Azure Hybrid Benefit is **not available** for DTU or Serverless
- **Hyperscale** supports up to 100 TB, up to 4 readable replicas, 99.95% SLA
- **Serverless** pauses after 1 hour of inactivity — not for latency-sensitive apps
- **Business Critical** has 1 read replica built-in (no extra config)
- **Failover Groups** support automatic failover with up to 5 seconds potential data loss

## Combo Pattern: Tiered Scaling

```
Small dev DB → Serverless (auto-pause, low cost)
Growing prod DB → vCore General Purpose (balanced, Hybrid Benefit)
High-throughput prod DB → vCore Business Critical (low latency, read replica)
Massive DB (100 TB+) → vCore Hyperscale (fast scaling, 4 replicas)
```

## Related Cards

- [SQL Deployment Options](databases/sql-deployment.md) — SQL DB vs SQL MI vs SQL VM
- [Cosmos DB Throughput](databases/cosmos-throughput.md) — Provisioned vs Auto-Scale vs Serverless
