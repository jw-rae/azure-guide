---
title: "Blob Data Protection: Soft Delete vs Versioning vs PITR vs Immutable Storage"
slug: data-protection
category: storage
tags: [storage, data-protection, backup, compliance, recovery]
services:
  - Azure Blob Storage
  - Azure Backup
glossary:
  - Soft Delete
  - Blob Versioning
  - Point-in-Time Restore
  - Immutable Storage
  - Change Feed
  - Object Replication
---

## When to use Soft Delete

- Protect blobs and blob snapshots from accidental deletion
- Recover blobs within configurable retention period (default 14 days, up to 365)
- Simple protection against user error or application bugs
- Does not protect against data corruption (only deletion)

## When to use Blob Versioning

- Maintain historical versions of each blob for audit trail
- Recover from unintended overwrites or modifications
- Each version is a separate snapshot accessible via version ID
- Combine with lifecycle management to control cost (expire old versions)

## When to use Point-in-Time Restore (PITR)

- Roll back all blobs in a container or account to a previous state
- Protection against data corruption, ransomware, or bulk deletion
- Restore to any point within the retention window (min 1 day, max 365 days)
- Requires versioning + change feed enabled

## When to use Immutable Storage

- WORM (Write Once, Read Many) compliance — data cannot be modified or deleted
- Regulatory requirements: SEC 17a-4, FINRA, HIPAA, GDPR
- Legal holds for litigation or investigation
- Two policies: Time-based retention (fixed period) or Legal hold (until removed)

## Decision Table

| Feature | Soft Delete | Versioning | PITR | Immutable Storage |
|---|---|---|---|---|
| **Protection against** | Accidental deletion | Modification/deletion | Corruption/deletion | Any modification/deletion |
| **Granularity** | Blob/container | Per blob | Container/account | Container |
| **Retention** | 1–365 days | Unlimited (cost) | 1–365 days | Fixed period or legal hold |
| **Recovery action** | Undelete | Promote version | Roll back state | Not applicable (prevention) |
| **Recovery time** | Seconds | Seconds | Minutes–hours | N/A (preventive) |
| **Requires Change Feed** | ❌ | ❌ | ✅ | ❌ |
| **Use case** | User error | Overwrite protection | Ransomware recovery | Compliance |

## Key Distinctions

- Soft Delete and Versioning are **complimentary** — use both for defense-in-depth (deletion + modification)
- PITR **requires versioning + change feed** enabled — adds storage cost but enables full account rollback
- Immutable Storage is **preventive** (locks data) — the others are **reactive** (enable recovery after event)
- Soft Delete has a **default of 14 days** but can be configured up to 365 days
- Versioning without lifecycle management can **increase storage costs significantly** as old versions accumulate
- Object Replication is a separate feature for copying blobs across regions — not a data protection feature

## Combo Pattern: Defense-in-Depth for Blobs

```
Layer 1: Immutable Storage → prevents modification (compliance)
Layer 2: Soft Delete → recovers accidental deletion (14+ days)
Layer 3: Versioning → recovers overwrites (historical versions)
Layer 4: PITR → full rollback after corruption/ransomware
Layer 5: Object Replication → geo-redundancy (async copy)
```

## Related Cards

- [Access Tier](storage/access-tier.md) — Hot vs Cool vs Cold vs Archive
- [Backup vs DR](monitoring-backup/backup-vs-dr.md) — Azure Backup vs ASR vs Snapshot vs Geo-Replication
