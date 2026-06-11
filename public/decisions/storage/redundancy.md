---
title: "Storage Redundancy: LRS vs ZRS vs GRS vs GZRS"
slug: storage-redundancy
category: storage
tags: [storage, redundancy, replication, ha, dr]
services:
  - Azure Storage Account
skus:
  - LRS
  - ZRS
  - GRS
  - GZRS
  - RA-GRS
  - RA-GZRS
glossary:
  - LRS
  - ZRS
  - GRS
  - GZRS
  - RA-GRS
  - RA-GZRS
---

## When to use LRS

- Lowest-cost redundancy (3 copies in a single datacenter)
- Non-critical data that can be reconstructed
- Data already replicated at application level
- Dev/test environments without production SLA requirements
- No protection against datacenter or regional failure

## When to use ZRS

- HA within a single region across availability zones
- Data must survive a single datacenter failure
- Need 99.99% read + 99.99% write availability for GPv2
- Primary region must support availability zones

## When to use GRS

- Regional disaster recovery protection
- Data replicated asynchronously to a secondary paired region
- Secondary region accessible only after failover (no read access before)
- Compliance or business continuity requiring geo-redundancy

## When to use GZRS

- Maximum durability: ZRS across zones in primary + GRS to secondary region
- HA within region (zone failure) + DR for regional failure
- Mission-critical data that must survive both scenarios
- Higher cost but highest availability and durability

## When to use RA-GRS / RA-GZRS

- Same as GRS/GZRS but with read access to secondary region before failover
- Read-heavy workloads that can read from secondary even during normal operation
- Need lower latency reads from multiple geographic locations
- Secondary region always available for read queries (at extra cost)

## Decision Table

| Feature | LRS | ZRS | GRS | GZRS | RA-GRS | RA-GZRS |
|---|---|---|---|---|---|---|
| **Copies in primary** | 3 (single DC) | 3 (across AZs) | 3 (single DC) | 3 (across AZs) | 3 (single DC) | 3 (across AZs) |
| **Copies in secondary** | — | — | 3 (LRS) | 3 (LRS) | 3 (LRS) | 3 (LRS) |
| **Regional DR** | ❌ | ❌ | ✅ (async) | ✅ (async) | ✅ (async) | ✅ (async) |
| **Read secondary** | ❌ | ❌ | ❌ | ❌ | ✅ | ✅ |
| **Failover required** | — | — | ✅ | ✅ | ✅ | ✅ |
| **Durability** | 11 nines | 12 nines | 16 nines | 16+ nines | 16 nines | 16+ nines |
| **Availability (reads)** | 99.9% | 99.99% | 99.9% | 99.99% | 99.99% | 99.99% |
| **Availability (writes)** | 99.9% | 99.99% | 99.9% | 99.99% | 99.9% | 99.99% |

## Key Distinctions

- LRS and ZRS protect against **hardware failure** within a region; GRS/GZRS protect against **regional failure**
- RA-GRS and RA-GZRS allow **read access** to the secondary region **without waiting for failover**
- GRS/GZRS secondary replicas are **not readable** until a failover occurs (or unless RA-prefix is chosen)
- ZRS and GZRS require a region that supports **availability zones**
- **Failover** for GRS/GZRS is customer-managed or Microsoft-managed — there is a grace period before Microsoft initiates auto-failover
- Cost increases significantly from LRS → ZRS → GRS → GZRS, so choose the minimum that meets recovery requirements

## Related Cards

- [Access Tier](storage/access-tier.md) — Hot vs Cool vs Cold vs Archive
- [Storage Service](storage/storage-service.md) — Blob vs Files vs Disks vs Tables vs Queues
- [Account Type](storage/account-type.md) — GPv2 vs Premium variants
