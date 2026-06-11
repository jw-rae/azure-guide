---
title: "Cosmos DB Throughput: Provisioned vs Auto-Scale vs Serverless"
slug: cosmos-throughput
category: databases
tags: [cosmos-db, throughput, ru, scaling, cost]
services:
  - Azure Cosmos DB
skus:
  - Provisioned Throughput
  - Auto-Scale
  - Serverless
glossary:
  - RU
  - Cosmos DB Container
  - Azure Cosmos DB
  - Cosmos DB Consistency Levels
---

## When to use Provisioned Throughput

- Predictable, steady-state workloads with known RU/s requirements
- Maximum throughput control — reserve RU/s per container or database
- Highest budget — cost is predictable (pay for reserved RU/s)
- Need for burst capacity up to the provisioned limit
- Minimum 400 RU/s per container

## When to use Auto-Scale

- Variable or unpredictable workloads with occasional spikes
- No need to manually adjust RU/s — Azure scales automatically
- Peak demand up to 10x the base RU/s (e.g., 400–4000 RU/s auto-scale range)
- Cost efficiency: pay only for the RU/s consumed, not the max provisioned
- Good for production with traffic patterns that vary throughout the day

## When to use Serverless

- Development and test environments with long idle periods
- Intermittent or very low-traffic applications
- No reserved capacity — pay per request (no minimum RU/s)
- **Limitations:** Max 4000 RU/s per container, no multi-region writes, max 24-hour storage, RU/s burst limited
- Not for production with sustained high throughput

## Decision Table

| Feature | Provisioned | Auto-Scale | Serverless |
|---|---|---|---|
| **Pricing model** | Pay per reserved RU/s | Pay per consumed RU/s | Pay per request (no reserved) |
| **Min RU/s** | 400 RU/s per container | 400 RU/s (scale up to 10x) | 0 (no minimum) |
| **Max RU/s** | 1M+ per container | 1M+ per container | 4000 RU/s per container |
| **Burst capacity** | At provisioned level | Up to 10x base | Limited (throttled) |
| **Multi-region writes** | ✅ | ✅ | ❌ |
| **Storage limit** | Unlimited | Unlimited | 50 GB per container |
| **Idle cost** | Full (provisioned) | Reduced (scales down) | None (pay only for usage) |
| **Best for** | Predictable traffic | Variable traffic | Dev/test, intermittent |

## Key Distinctions

- Provisioned throughput costs the same whether you use it or not — **you pay for what you reserve**
- Auto-Scale scales between base and 10x — **you pay for the base RU/s even when idle**
- Serverless has **no** maximum idle cost but **limited** to 4000 RU/s and 50 GB per container — not for production at scale
- 1 RU = 1 KB read or ~100 KB write per second — use this to estimate throughput needs
- Throughput can be provisioned at the **container level** (dedicated) or **database level** (shared across containers)
- Multi-region writes requires Provisioned or Auto-Scale — not available on Serverless

## Combo Pattern: Throughput Strategy

```
Dev/test → Serverless (zero idle cost, low traffic)
Growing app → Auto-Scale (variable traffic, handles spikes)
Steady prod → Provisioned (predictable cost, high throughput)
Peak event → Auto-Scale (handle Black Friday spike without manual scaling)
```

## Related Cards

- [Cosmos DB API](databases/cosmos-api.md) — NoSQL vs MongoDB vs Table vs Gremlin vs Cassandra vs PostgreSQL
- [Cosmos DB Consistency](databases/cosmos-consistency.md) — Strong vs Bounded Staleness vs Session vs Prefix vs Eventual
- [SQL Purchasing Model](databases/sql-purchasing-model.md) — vCore vs DTU vs Serverless vs Elastic Pool
