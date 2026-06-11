---
title: "Storage Service: Blob vs Files vs Disks vs Tables vs Queues"
slug: storage-service
category: storage
tags: [storage, blob, files, disks, tables, queues]
services:
  - Azure Blob Storage
  - Azure Files
  - Azure Managed Disks
  - Azure Table Storage
  - Azure Queue Storage
glossary:
  - Azure Blob Storage
  - Azure Files
  - Managed Disk
  - Azure Table Storage
  - Azure Queue Storage
---

## When to use Blob Storage

- Object storage for unstructured data (images, videos, backups, logs)
- Static website hosting (HTML, CSS, JS)
- Data lake foundation (Data Lake Storage Gen2)
- Streaming and batch data
- Access via HTTP/S, REST API, SDKs

## When to use Azure Files

- Managed SMB/NFS file shares for lift-and-shift
- Shared file systems across multiple VMs or on-premises via File Sync
- Apps that rely on traditional file system APIs
- Hybrid scenarios with cloud tiering (cache hot files locally)

## When to use Managed Disks

- Persistent block storage for Azure VMs (OS and data disks)
- High-performance workloads needing dedicated IOPS (Premium SSD, Ultra Disk)
- VM boot volumes and application data requiring low latency
- Disk encryption via SSE or ADE

## When to use Table Storage

- Low-cost, schemaless key-value storage
- Large-scale structured NoSQL data with simple queries (by PartitionKey + RowKey)
- Cost-sensitive applications where Cosmos DB is overkill
- Up to 20K ops/sec per account

## When to use Queue Storage

- Simple message queue for decoupled async communication
- Fire-and-forget background task processing (image resizing, order fulfillment)
- High-volume, cost-sensitive messaging (millions of messages at ~$0.0000005/msg)
- Max message size: 64 KB

## Decision Table

| Feature | Blob | Files | Disks | Tables | Queues |
|---|---|---|---|---|---|
| **Data type** | Unstructured objects | Files (SMB/NFS) | Block storage | Key-value | Messages |
| **Protocol** | HTTP/S, REST | SMB, NFS, HTTP | iSCSI | REST | REST |
| **Max size** | ~4 TB per blob | 100 TiB per share, 4 TiB per file | 32 TB per disk | 1 MB per entity | 64 KB per message |
| **Use case** | Images, backups, data lake | File shares, lift-and-shift | VM disks | NoSQL key-value | Async messaging |
| **Pricing** | Per GB + operations | Per GB + operations | Provisioned IOPS | Per GB + transactions | Per message |
| **VM mount** | ❌ (REST only) | ✅ (SMB/NFS) | ✅ (iSCSI) | ❌ (API) | ❌ (API) |
| **Global access** | ✅ (HTTP/S) | ✅ (SMB over internet) | ❌ (region-bound) | ✅ (REST) | ✅ (REST) |
| **Redundancy options** | LRS/ZRS/GRS/GZRS | LRS/ZRS/GRS/GZRS | LRS/ZRS | LRS/GRS/RA-GRS | LRS/ZRS/GRS |

## Key Distinctions

- Blob = object storage (REST API); Files = file share (SMB/NFS mountable by VMs)
- Tables and Queues are **sub-services of Storage Accounts** — lower cost but fewer features than Cosmos DB alternatives
- Disks are **block-level** storage attached to a single VM; Blobs are **object-level** accessed over HTTP
- Files can be mounted by multiple VMs simultaneously; Disks can only be attached to one VM at a time (unless shared disk)
- Queue Storage is the **cheapest** messaging option but lacks FIFO, transactions, and deduplication that Service Bus provides

## Combo Pattern: Multi-Service Storage Architecture

```
Static assets → Blob Storage (CDN + static website)
Config files → Azure Files (mounted by VMs)
App data → Managed Disks (attached to VM)
NoSQL lookups → Table Storage (key-value)
Async tasks → Queue Storage (decoupled processing)
```

## Related Cards

- [Access Tier](storage/access-tier.md) — Hot vs Cool vs Cold vs Archive
- [Redundancy](storage/redundancy.md) — LRS vs ZRS vs GRS vs GZRS
- [Messaging Service](messaging/messaging-service.md) — Queue Storage vs Service Bus vs Event Hubs vs Event Grid
