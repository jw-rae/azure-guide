---
title: "Blob Access Tier: Hot vs Cool vs Cold vs Archive"
slug: access-tier
category: storage
tags: [storage, blob, access-tier, hot, cool, cold, archive, cost]
services:
  - Azure Blob Storage
skus:
  - Hot
  - Cool
  - Cold
  - Archive
glossary:
  - Hot Tier
  - Cool Tier
  - Cold Tier
  - Archive Tier
  - Lifecycle Management Policy
---

## When to use Hot

- Data accessed frequently (multiple times per day or week)
- Active datasets, current project files, production media
- Lowest access cost, highest storage cost
- No minimum retention period — can be moved any time

## When to use Cool

- Data accessed infrequently but still needs millisecond latency
- Minimum 30-day retention applies
- Short-term backups, completed project files, older logs
- Lower storage cost than Hot, higher access cost per read

## When to use Cold

- Data rarely accessed but must remain instantly available
- Minimum 90-day retention applies
- Compliance archives with occasional access requirements
- Very low storage cost, higher access cost than Cool

## When to use Archive

- Long-term backup, compliance, or regulatory data (≥180 days)
- Data that can tolerate hours of rehydration delay before access
- Lowest storage cost, highest access cost + rehydration fees
- Early deletion fee (equivalent to remaining days of 180-day minimum)

## Decision Table

| Feature | Hot | Cool | Cold | Archive |
|---|---|---|---|---|
| **Storage cost** | Highest | Lower | Very low | Lowest |
| **Access cost** | Lowest | Higher | Higher | Highest (+ rehydration) |
| **Minimum retention** | None | 30 days | 90 days | 180 days |
| **Latency** | Milliseconds | Milliseconds | Milliseconds | Hours (rehydration) |
| **Early deletion fee** | ❌ | ✅ (before 30d) | ✅ (before 90d) | ✅ (before 180d) |
| **SLA (Standard)** | 99.9% | 99% | 99% | 99% |
| **SLA (RA-GRS)** | 99.99% | 99.9% | 99.9% | 99.9% |
| **Use case** | Active data | 30-day backups | Quarterly audits | Legal holds |

## Key Distinctions

- Archive access requires **rehydration** (changing tier to Hot/Cool/Cold) which takes **hours** — not for instant access
- **Minimum retention fees** apply if data is deleted or moved to a lower tier before the retention period expires
- Auto-tiering via **Lifecycle Management Policy** can move data through tiers: Hot → Cool → Cold → Archive
- The **Access Tier** applies per blob or at the account level for GPv2 accounts
- Archive is the only tier with **no instant access** — data must be rehydrated first
- Transaction-optimized tier exists for workloads with frequent read/write on older data (between Hot and Premium)

## Combo Pattern: Lifecycle Automation

```
Upload → Hot (first 30 days, frequent access)
30 days → Cool (infrequent reads, cost savings)
90 days → Cold (rare access, compliance)
180 days → Archive (long-term retention, lowest cost)
```

Automated via Blob Lifecycle Management Policy — no manual intervention.

## Related Cards

- [Storage Service](storage/storage-service.md) — Blob vs Files vs Disks vs Tables vs Queues
- [Redundancy](storage/redundancy.md) — LRS vs ZRS vs GRS vs GZRS
