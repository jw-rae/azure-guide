---
title: "Event-Driven Data Pipeline: Functions + Event Grid + Cosmos DB Change Feed"
slug: event-driven-pipeline
category: patterns
tags: [pattern, event-driven, serverless, pipeline, change-feed]
services:
  - Azure Functions
  - Event Grid
  - Azure Cosmos DB
glossary:
  - Azure Functions
  - Event Grid
  - Cosmos DB Change Feed
  - Azure Cosmos DB
  - Message
---

## When to use this pattern

- React to data changes in Cosmos DB (insert, update, delete) in near real-time
- Decouple data producers from consumers — publish events when data changes
- Default pattern for serverless event-driven architectures on Azure
- Use the Change Feed as the trigger source, Event Grid as the routing layer

## When NOT to use this pattern

- Existing message broker (Service Bus / Event Hubs) already in place — don't add Event Grid just for this
- Need FIFO ordering or exactly-once processing — Event Grid delivers at-least-once
- High-throughput streaming (millions of events/second) — use Event Hubs instead of Change Feed + Event Grid

## Pattern Architecture

```
Cosmos DB (Change Feed) → Event Grid → Event Subscription → Azure Function (process)
                                                              \/
                                                Downstream: Storage, Search, Cache, API
```

## Key Considerations

| Aspect | Recommendation |
|---|---|
| **Trigger** | Cosmos DB Change Feed → Event Grid event |
| **Routing** | Event Grid filters by subject, event type, or advanced filters |
| **Processing** | Azure Functions (consumption or dedicated plan) |
| **Error handling** | Dead-letter to Storage Queue; retry policy on Event Grid subscription |
| **Ordering** | Event Grid does not guarantee order per region — use Change Feed mode for ordering within a partition |
| **Throughput** | Event Grid: up to 10M events/s per topic; Function scales per event |

## Key Distinctions

- Change Feed emits **one event per document change** — Event Grid routes to subscribers
- Event Grid's **at-least-once** delivery means duplicate processing is possible — make the Function **idempotent**
- For **ordering guarantee** within a partition: use Change Feed with event sourcing pattern; for global ordering: use Service Bus Sessions
- If the downstream needs **exactly-once** processing: deduplicate using document ID + timestamp in a cache (e.g., Redis)
- This pattern is **serverless-first** — no infrastructure to provision; scales to zero when idle

## Related Cards

- [Messaging Service](messaging/messaging-service.md) — Queue Storage vs Service Bus vs Event Hubs vs Event Grid
- [Cosmos DB API](databases/cosmos-api.md) — NoSQL vs MongoDB vs Table vs Gremlin vs Cassandra vs PostgreSQL
- [ETL vs ELT](databases/etl-vs-elt.md) — Extract-Transform-Load vs Extract-Load-Transform
