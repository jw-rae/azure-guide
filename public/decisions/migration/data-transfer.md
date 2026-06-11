---
title: "Data Transfer: AzCopy vs Data Box vs Import/Export vs Storage Migration Service vs File Sync"
slug: data-transfer
category: migration
tags: [data-transfer, migration, storage, network, offline]
services:
  - Azure Storage
glossary:
  - AzCopy
  - Azure Data Box
  - Azure Import/Export
  - Storage Migration Service (SMS)
  - Azure File Sync
  - Azure Data Factory (ADF)
---

## When to use AzCopy

- Command-line data copy between storage accounts, from on-prem to Azure, or Azure to Azure
- Scriptable — ideal for automation and CI/CD data pipelines
- Supports Blob Storage, Azure Files, and Table Storage
- Sync mode (`--sync` flag) for incremental copy
- Good for **online** data transfer when bandwidth is sufficient (up to ~10 Gbps)
- **Limitation:** Requires network connectivity — not suitable for very large datasets over slow links

## When to use Azure Data Box

- Offline data transfer for large datasets (40 TB to 800 TB)
- On-premises data exceeds available bandwidth — transfer in weeks not months
- Network connectivity is poor, expensive, or unreliable
- Secure physical device — encrypted with AES 256-bit, tamper-resistant
- Types: Data Box Disk (~8 TB), Data Box (~100 TB), Data Box Heavy (~1 PB)
- **Limitation:** Takes 7–14 days for shipping round trip — not for urgent transfers

## When to use Azure Import/Export

- Ship physical hard drives (HDD/SSD) to Azure data center
- Import: Blob Storage or Azure Files
- Export: Export blobs from Azure to on-premises
- BYO drives or use Microsoft-supplied drives
- Lower cost for high-volume, less time-sensitive transfers
- **Limitation:** You manage encryption (BitLocker), labeling, and shipping logistics

## When to use Storage Migration Service (SMS)

- Windows Server to Azure File Sync migration
- Inventory existing Windows file servers, migrate to Azure File Sync
- Orchestrated migration from source to target with validation
- Part of Windows Admin Center — GUI-based, no scripting required
- **Note:** Only works from Windows Server source — not Linux or NAS

## When to use Azure File Sync

- Cache frequently accessed files on-prem while syncing to Azure Files
- Cloud tiering — keep only recently accessed files locally, infrequent files in the cloud
- Replace on-prem file servers with Azure Files as the authoritative source
- Multi-site sync — sync files across multiple on-prem servers
- **Note:** Not a one-time migration tool — ongoing sync for hybrid file access

## Decision Table

| Feature | AzCopy | Data Box | Import/Export | SMS | File Sync |
|---|---|---|---|---|---|
| **Transfer type** | Online | Offline (physical) | Offline (physical) | Online (orchestrated) | Online (continuous sync) |
| **Best for** | Scripted online copy | Large datasets, slow network | Large datasets, BYO drives | Windows Server → Azure Files | Hybrid file server |
| **Max data size** | Limited by bandwidth | 40 TB–1 PB (per order) | 10 TB per HDD | Depends on source | Unlimited |
| **Transfer time** | Hours–days (network) | Days–weeks (shipping) | Days–weeks (shipping) | Hours–days | Continuous |
| **Encryption** | HTTPS | AES-256 + BitLocker | BitLocker | HTTPS | HTTPS + AES-256 |
| **Cost** | Free (tool) | Per device + shipping | Per drive + data | Free (tool) | Per GB synced |
| **Automation** | ✅ (scriptable) | ❌ (manual) | ❌ (manual) | ✅ (orchestrated) | ✅ (continuous) |

## Key Distinctions

- AzCopy is the **easiest and most flexible online tool** — but limited by network bandwidth
- Data Box is for **very large datasets** (40 TB+) — cheaper than transferring over WAN for months
- Import/Export is **self-managed** — you prepare, encrypt, ship drives — cheaper than Data Box for smaller volumes
- SMS is a **Windows Admin Center tool** for Windows Server file server migration — not for general data transfer
- File Sync is **not a migration tool** — it's a hybrid sync solution for ongoing file access
- **Migration flow:** If <10 TB and good network → AzCopy (online); if >10 TB or poor network → Data Box (offline); if Windows Server → SMS + File Sync

## Related Cards

- [Database Migration](migration/database-migration.md) — DMA vs DMS vs Azure Migrate vs Data Studio
- [Analytics Storage](databases/analytics-storage.md) — Data Lake Gen2 vs Synapse SQL vs Lakehouse
- [Storage Service](storage/storage-service.md) — Blob vs Files vs Disks vs Tables vs Queues
