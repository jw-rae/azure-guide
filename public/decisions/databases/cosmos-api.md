---
title: "Cosmos DB API: NoSQL vs MongoDB vs Table vs Gremlin vs Cassandra vs PostgreSQL"
slug: cosmos-api
category: databases
tags: [cosmos-db, nosql, api, document, graph, column-family]
services:
  - Azure Cosmos DB
skus:
  - NoSQL API
  - MongoDB API
  - Table API
  - Gremlin API
  - Cassandra API
  - PostgreSQL API
glossary:
  - Cosmos DB APIs
  - Cosmos DB Consistency Levels
  - RU
  - Azure Cosmos DB
---

## When to use NoSQL API

- New cloud-native applications using JSON documents
- SQL-like query syntax on JSON data
- Best SDK support and feature availability (change feed, triggers, stored procs)
- Default Cosmos DB API — full access to all Cosmos DB features
- Product catalogs, user profiles, session state, IoT metadata

## When to use MongoDB API

- Existing MongoDB applications migrating to Azure (zero code changes)
- MongoDB drivers and tools work without modification
- JSON documents with BSON format
- Great choice when your team already uses MongoDB query language
- Wire protocol compatible with MongoDB 4.x and 5.x

## When to use Table API

- Migrate from Azure Table Storage to Cosmos DB for better performance
- Key-value workloads needing <10ms latency and global distribution
- Simple lookups by PartitionKey + RowKey
- **Limitation:** Not suitable for complex JSON documents with nested fields — no flexible querying

## When to use Gremlin API

- Graph data with nodes (entities) and edges (relationships)
- Social networks, fraud detection, recommendation engines
- Graph traversal queries (e.g., "find friends of friends within 3 hops")
- Optimization for relationship-heavy querying patterns

## When to use Cassandra API

- Column-family data model — wide-column storage
- Migrate from Apache Cassandra with minimal code changes
- Time-series data, IoT sensor data, telemetry
- Write-heavy workloads with high throughput

## When to use PostgreSQL API (Citus)

- Relational data with PostgreSQL compatibility
- Distributed PostgreSQL using Citus for horizontal scaling
- Apps already using PostgreSQL that need global scale
- Hybrid use of relational + NoSQL features in PostgreSQL

## Decision Table

| Feature | NoSQL | MongoDB | Table | Gremlin | Cassandra | PostgreSQL |
|---|---|---|---|---|---|---|
| **Data model** | Document (JSON) | Document (BSON) | Key-value | Graph | Column-family | Relational |
| **Query language** | SQL-like | MongoDB query | Table query | Gremlin traversal | CQL | PostgreSQL SQL |
| **Best for** | New apps, JSON | MongoDB migration | Table Storage migration | Relationships | Cassandra migration | Postgres scale-out |
| **Change feed** | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |
| **Multi-region writes** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Zero code migration** | N/A (native) | ✅ | ✅ (from Table Storage) | ❌ | ✅ | ❌ |
| **JSON flexibility** | ✅ Full | ✅ Full | ❌ Limited | Partial | ❌ Columnar | Partial |

## Key Distinctions

- NoSQL API is the **most feature-rich** — change feed, stored procedures, triggers, best SDK support
- MongoDB API is for **existing MongoDB apps** — no code changes needed beyond connection string
- Table API is for **Table Storage migration** — not for flexible JSON document workloads
- Gremlin API is for **graph data** (nodes + edges) — not for document or key-value
- Cassandra API is for **column-family data** — time-series, IoT, telemetry
- Change feed is only available on **NoSQL and MongoDB APIs** — critical for event-driven patterns

## Related Cards

- [Cosmos DB Consistency](databases/cosmos-consistency.md) — Strong vs Bounded Staleness vs Session vs Prefix vs Eventual
- [Cosmos DB Throughput](databases/cosmos-throughput.md) — Provisioned vs Auto-Scale vs Serverless
- [Analytics Storage](databases/analytics-storage.md) — Data Lake Gen2 vs Synapse SQL vs Lakehouse
