---
title: "Cosmos DB Consistency: Strong vs Bounded Staleness vs Session vs Consistent Prefix vs Eventual"
slug: cosmos-consistency
category: databases
tags: [cosmos-db, consistency, latency, availability]
services:
  - Azure Cosmos DB
glossary:
  - Cosmos DB Consistency Levels
  - RU
  - Azure Cosmos DB
  - Eventual consistency
---

## When to use Strong

- Financial transactions, inventory counts — require linearizability
- Reads always return the latest committed write
- Highest latency (sync replication across replicas)
- Most expensive in terms of RU cost
- Limited to single-region writes (no multi-master)

## When to use Bounded Staleness

- Reads can lag behind writes by at most K versions or a time interval
- Retail inventory, account balances with acceptable lag window
- Trade-off between strong consistency and latency
- Predictable staleness bound

## When to use Session (Default)

- Most applications — the default and recommended consistency level
- Within a single client session: monotonic reads, write-your-writes
- Shopping carts, user preferences, social media feeds
- Best balance of consistency, performance, and availability
- Lowest latency for the consistency guarantee

## When to use Consistent Prefix

- Ordered reads without gaps — updates are seen in order
- News feeds, timeline posts, messaging history
- Lower latency than Strong or Bounded Staleness
- Reads may not reflect the latest write, but will never show out-of-order

## When to use Eventual

- Lowest latency and highest throughput
- No ordering guarantees — copies gradually become consistent over time
- Recommendation engines, product reviews, like counts
- Best for globally distributed read-heavy workloads

## Decision Table

| Level | Guarantee | Latency | RU Cost | Use Case |
|---|---|---|---|---|
| **Strong** | Linearizable | Highest | Highest | Financial transactions |
| **Bounded Staleness** | Lag ≤ K versions or time | Medium | High | Retail inventory |
| **Session** (Default) | Write-your-writes, monotonic | Low | Low | Most apps |
| **Consistent Prefix** | Ordered, no gaps | Low | Low | News feeds |
| **Eventual** | No guarantees | Lowest | Lowest | Recommendations |

## Key Distinctions

- **Strong** consistency cannot be used with **multi-region writes** — only single-region writes supported
- **Session** is the default and works for most apps — start here and relax or strengthen only if needed
- **Eventual** means copies **gradually** become consistent over time — no guaranteed order
- Consistency level is set per request — can override at the query level for different needs
- Higher consistency = **higher RU cost** (more coordination between replicas)
- Azure Cosmos DB is the only Azure database that offers **five tunable consistency levels**

## Related Cards

- [Cosmos DB API](databases/cosmos-api.md) — NoSQL vs MongoDB vs Table vs Gremlin vs Cassandra vs PostgreSQL
- [Cosmos DB Throughput](databases/cosmos-throughput.md) — Provisioned vs Auto-Scale vs Serverless
