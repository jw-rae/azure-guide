---
title: "Messaging: Queue Storage vs Service Bus vs Event Hubs vs Event Grid"
slug: messaging-service
category: messaging
tags: [messaging, queue, event, pub-sub, streaming]
services:
  - Queue Storage
  - Service Bus
  - Event Hubs
  - Event Grid
glossary:
  - Queue Storage
  - Service Bus
  - Event Hubs
  - Event Grid
  - Topics
  - Dead Letter
  - Message Session
---

## When to use Queue Storage

- Simple message queuing — minimal features, lowest cost
- Throughput up to 20,000 messages per second
- Messages up to 64 KB; batches up to 256 KB
- Single consumer (each message processed once)
- "Work queue" pattern — decouple web tier from backend processing
- **Limitation:** No pub/sub, no ordering guarantee (FIFO), no message sessions

## When to use Service Bus

- Enterprise messaging — pub/sub with Topics and Subscriptions
- FIFO ordering with Message Sessions
- At-Most-Once or At-Least-Once delivery semantics
- Dead-letter, scheduled delivery, duplicate detection, auto-forwarding
- Messages up to 256 KB (Standard) or 1 MB (Premium)
- Integration with Azure Relay for hybrid connectivity

## When to use Event Hubs

- High-throughput event ingestion — millions of events per second
- Event streaming — real-time telemetry, logs, clickstreams, IoT data
- Partitioned consumer model — multiple consumers read from same stream
- Retention up to 7 days (Basic) or 90 days (Premium/Dedicated)
- Capture to Data Lake / Blob Storage for long-term storage
- **Limitation:** No pub/sub filtering — all consumers read all events in a partition

## When to use Event Grid

- Event-driven architecture — reactive programming model
- Routing events from Azure services to handlers (Functions, Webhooks, Event Hubs, Service Bus)
- Built-in events from 20+ Azure services (Blob storage, Resource Groups, IoT Hub, etc.)
- Custom events with custom topics
- **Limitation:** Event TTL 24 hours max, events up to 1 MB — not for high-throughput streaming
- **Limitation:** At-Least-Once delivery — no At-Most-Once guarantee

## Decision Table

| Feature | Queue Storage | Service Bus | Event Hubs | Event Grid |
|---|---|---|---|---|
| **Pattern** | Point-to-point queue | Pub/sub + Queue | Event streaming | Event-driven pub/sub |
| **Max message size** | 64 KB | 256 KB (Std) / 1 MB (Prem) | 1 MB | 1 MB |
| **Throughput** | 20,000 msg/s | 2,000 msg/s (Std) / 4,000 msg/s (Prem) | Millions/s | 10,000,000 events/s per topic |
| **Ordering** | ❌ | ✅ (Sessions) | ✅ (per partition) | ❌ (per region) |
| **Pub/sub** | ❌ | ✅ (Topics/Subscriptions) | ❌ (partitioned consumer group) | ✅ (Event Subscriptions) |
| **Filtering** | ❌ | ✅ (SQL-like, correlation) | ❌ (consumer group filtering) | ✅ (subject prefix/suffix, advanced filters) |
| **Dead-letter** | ❌ | ✅ | ❌ (capture to storage) | ❌ |
| **Auto-forwarding** | ❌ | ✅ | ❌ | ❌ |
| **Batching** | ✅ | ✅ | ✅ (via AMQP) | ❌ |
| **Protocol** | HTTP/REST | AMQP, HTTP/REST | AMQP, HTTP/REST, Kafka | HTTP/REST |

## Key Distinctions

- Queue Storage is the **simplest and cheapest** — but no pub/sub, no FIFO, no dead-letter
- Service Bus is **enterprise messaging** — FIFO, pub/sub, dead-letter, scheduled delivery, duplicate detection
- Event Hubs is **event streaming** — think Kafka on Azure — high throughput, partitioned, not for pub/sub with filtering
- Event Grid is **event-driven reactive routing** — Azure resources fire events → Event Grid routes to handlers
- Service Bus vs Event Hubs: Service Bus is "send a message, someone will pick it up" — Event Hubs is "broadcast an event, many consumers can read it"
- For **exam scenarios**: "IoT telemetry ingestion" → Event Hubs; "order processing with FIFO" → Service Bus; "react to blob upload" → Event Grid; "simple background job queue" → Queue Storage

## Related Cards

- [Event-Driven Pipeline Pattern](patterns/event-driven-pipeline.md) — Functions + Event Grid + Cosmos DB Change Feed
- [Batch Processing](compute/batch-processing.md) — Azure Batch vs Functions vs AKS
