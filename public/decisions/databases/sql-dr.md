---
title: "SQL DR: Active Geo-Replication vs Failover Groups vs Geo-Restore vs ASR"
slug: sql-dr
category: databases
tags: [sql, dr, replication, failover, rpo, rto]
services:
  - Azure SQL Database
  - Azure SQL Managed Instance
glossary:
  - Active Geo-Replication
  - Failover Groups
  - Geo-Restore
  - Azure Site Recovery (ASR)
  - RPO
  - RTO
  - Point-in-Time Restore
  - Long-Term Retention (LTR)
---

## When to use Active Geo-Replication

- Azure SQL Database only (not SQL MI)
- Async replication to secondary region with seconds RPO
- Manual failover control (customer-initiated)
- Up to 4 readable secondaries for read scalability
- Finer granularity (per database, not group)

## When to use Failover Groups

- Automatic or manual failover for a group of databases (Azure SQL DB or SQL MI)
- Listener endpoint for transparent app connection
- Seconds RPO with up to 5 seconds potential data loss during auto-failover
- Requires secondary server in a different region
- Recommended for multi-database DR with listener support

## When to use Geo-Restore

- Restore from GRS backups during a regional outage
- ~1 hour RPO (backup point from GRS)
- Recovery takes minutes to hours depending on database size
- No pre-provisioned secondary infrastructure (pay only when used)
- Available for all Azure SQL Database tiers

## When to use Azure Site Recovery (ASR)

- VM-level DR for SQL Server on Azure VMs
- Replicates the entire VM (OS + data) to recovery region
- RPO: 15 seconds to 1 hour (depending on replication frequency)
- RTO: <15 minutes for failover
- Includes recovery plans with orchestrated multi-VM failover sequencing

## Decision Table

| Solution | Scope | RPO | Failover | Replicas | Listener |
|---|---|---|---|---|---|
| **Active Geo-Replication** | Single DB | Seconds | Manual | Up to 4 readable | ❌ |
| **Failover Groups** | Multiple DBs | Seconds (≤5s loss) | Auto/manual | 1 secondary | ✅ (listener) |
| **Geo-Restore** | Single DB | ~1 hour | Manual (restore) | None (backup) | ❌ |
| **ASR** | VM + SQL Server | Seconds–1 hour | Auto/manual | Full VM | ❌ (recovery plan) |
| **PITR** | Single DB | 0–35 days | Manual (restore) | None | ❌ |
| **LTR** | Single DB | 0–10 years | Manual (restore) | None (long-term backup) | ❌ |

## Key Distinctions

- Active Geo-Replication is **per database**; Failover Groups is **per group of databases** with a listener endpoint
- Failover Groups offer **auto-failover** with up to 5 seconds potential data loss — Active Geo-Replication is manual only
- Geo-Restore has the **highest RPO (~1 hour)** because it restores from GRS backups — not real-time replication
- ASR is for **SQL Server on VM** — not available for Azure SQL Database or SQL MI (those have built-in geo-replication)
- For minimum data loss: use Failover Groups (seconds RPO); for minimum cost: use Geo-Restore (no standby)
- Long-Term Retention (LTR) extends backup retention beyond 35 days (up to 10 years) — for compliance

## Related Cards

- [SQL Deployment](databases/sql-deployment.md) — SQL DB vs SQL MI vs SQL VM
- [SQL Purchasing Model](databases/sql-purchasing-model.md) — vCore vs DTU vs Serverless vs Hyperscale
- [Backup vs DR](monitoring-backup/backup-vs-dr.md) — Azure Backup vs ASR vs Snapshot vs Geo-Replication
