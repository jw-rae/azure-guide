---
title: "Backup vs DR: Azure Backup vs ASR vs Snapshot vs Geo-Replication"
slug: backup-vs-dr
category: monitoring-backup
tags: [backup, dr, replication, recovery, rpo, rto]
services:
  - Azure Backup
  - Azure Site Recovery (ASR)
glossary:
  - Azure Backup
  - Azure Site Recovery (ASR)
  - RPO
  - RTO
  - Geo-Redundant Storage (GRS)
  - Snapshot
  - Geo-Replication
  - Point-in-Time Restore
  - Long-Term Retention (LTR)
---

## When to use Azure Backup

- File/folder, VM, SQL Server, SAP HANA, Azure Files backup
- Long-term retention (up to 99 years) for compliance
- Central backup management across workloads
- Application-consistent backups (VM snapshots with VSS)
- Granular restore (individual files from VM backup)

## When to use Azure Site Recovery (ASR)

- Full disaster recovery — replicate VMs to a secondary region
- Orchestrated recovery plans with multi-VM sequencing
- RPO: 15 seconds to 1 hour (depending on replication frequency)
- RTO: <15 minutes for failover
- Test failover without impacting production
- **Limitation:** Does not provide long-term retention — not a backup solution

## When to use Snapshot

- Quick, point-in-time backup of a managed disk (incremental)
- Revert a VM or disk to a specific state
- Short-term recovery (several snapshots per day)
- **Limitation:** Must be stored in same region as source disk — not a DR solution
- **Limitation:** No native cross-region replication (requires copying to other region manually)

## When to use Geo-Replication (Azure SQL DB / Cosmos DB)

- Database-level replication to a secondary region for DR
- Built-in PaaS DR — no separate backup infrastructure
- RPO: seconds (Failover Groups) to ~1 hour (Geo-Restore)
- Included or add-on depending on database service tier

## Decision Table

| Feature | Azure Backup | ASR | Snapshot | Geo-Replication |
|---|---|---|---|---|
| **Primary use** | Backup (long-term) | DR (regional failover) | Point-in-time disk restore | Database DR |
| **RPO** | 1 day (daily backup) | 15s–1 hour | Instant (manual creation) | Seconds–1 hour |
| **RTO** | Hours (depends on size) | <15 minutes | Minutes (restore disk) | Minutes–hours |
| **Cross-region** | ✅ (GRS backup vault) | ✅ (replication to secondary) | ❌ (manual copy) | ✅ (built-in) |
| **Long-term retention** | ✅ (up to 99 years) | ❌ | ❌ | ✅ (LTR) |
| **Application-consistent** | ✅ (VSS, SQL, SAP) | ✅ (crash-consistent or app-consistent) | ❌ (disk only) | ✅ (database-native) |
| **Cost** | Moderate (backup storage + instance) | High (replication + compute) | Low (incremental storage) | Moderate (replicated storage) |

## Key Distinctions

- Azure Backup is **backup** (long-term, daily, GRS) — ASR is **DR** (real-time replication, fast failover)
- ASR is **not a backup** — it replicates continuously but doesn't provide point-in-time restore beyond the replication window
- Snapshots are **regional** — for cross-region DR, you must copy snapshots to another region manually
- Geo-Replication is **database-native** — available in Azure SQL DB, Cosmos DB — not for VMs or files
- For **full protection**: Azure Backup (daily backup to vault) + ASR (replication to secondary region) — backup for data protection, DR for availability
- RPO vs RTO trade-off: Backup has hours RPO but lower cost; ASR has seconds RPO but higher cost

## Related Cards

- [SQL DR](databases/sql-dr.md) — Active Geo-Replication vs Failover Groups vs Geo-Restore vs ASR
- [Vault Type](monitoring-backup/vault-type.md) — Recovery Services Vault vs Backup Vault
- [Storage Data Protection](storage/data-protection.md) — Soft Delete vs Versioning vs PITR vs Immutable
