---
title: "Storage Account Type: GPv2 vs Premium Variants"
slug: account-type
category: storage
tags: [storage, account, sku, performance, premium]
services:
  - Azure Storage Account
skus:
  - General Purpose v2 (GPv2)
  - General Purpose v1 (GPv1)
  - Premium Block Blob
  - Premium File Shares
  - Premium Page Blobs
glossary:
  - GPv2
  - GPv1
  - Premium Block Blob Storage
  - Premium File Shares
  - Premium Page Blobs
---

## When to use GPv2

- Default and recommended storage account for most workloads
- Supports Blob, File, Queue, Table storage
- Supports Hot/Cool/Cold/Archive access tiers
- Standard HDD-backed performance
- Lifecycle management policies

## When to use GPv1 (Legacy)

- Existing GPv1 accounts not yet migrated
- Fewer features may be acceptable
- No access tier support
- **Not recommended for new deployments**

## When to use Premium Block Blob

- High transaction rates with low consistent latency
- SSD-backed performance for block blob workloads
- IoT telemetry ingestion, high-frequency data processing
- No access tiers — always premium performance

## When to use Premium File Shares

- Enterprise file shares requiring high IOPS and low latency
- SQL Server or database workloads on Azure Files
- SSD-backed SMB/NFS shares
- No access tiers — always premium performance

## When to use Premium Page Blobs

- VM OS and data disks (Page blobs only)
- High IOPS workloads (up to 20K IOPS per disk)
- SSD-backed for managed disks
- Not directly selectable as account type for new deployments (use managed disks)

## Decision Table

| Feature | GPv2 | GPv1 | Premium Block Blob | Premium File Shares | Premium Page Blobs |
|---|---|---|---|---|---|
| **Performance** | Standard (HDD) | Standard (HDD) | Premium (SSD) | Premium (SSD) | Premium (SSD) |
| **Access tiers** | Hot/Cool/Cold/Archive | ❌ | ❌ | ❌ | ❌ |
| **Supported services** | Blob, File, Queue, Table | Blob, File, Queue, Table | Blob only | Files only | Page blobs only |
| **Use case** | General purpose | Legacy workloads | High-transaction blob | Enterprise file shares | VM disks |
| **Lifecycle mgmt** | ✅ | ❌ | ❌ | ❌ | ❌ |
| **Replication** | All options | All options | LRS/ZRS | LRS/ZRS/GRS | LRS/ZRS |
| **Recommended** | ✅ Default | ❌ Legacy | ✅ Specialized | ✅ Specialized | ✅ Via managed disks |

## Key Distinctions

- GPv2 is the **default** and supports the widest range of features — always start here unless performance requires Premium
- Switching between Standard and Premium storage account types is **not supported** — must migrate data
- Premium Block Blob is for **high-transaction object storage** (not VHDs); Premium Page Blob is for **VM disks**
- GPv1 is **legacy** — GPv2 adds access tiers, lifecycle management, and more
- All Premium account types are **SSD-backed** with sub-10ms latency but higher cost

## Related Cards

- [Storage Service](storage/storage-service.md) — Blob vs Files vs Disks vs Tables vs Queues
- [Redundancy](storage/redundancy.md) — LRS vs ZRS vs GRS vs GZRS
