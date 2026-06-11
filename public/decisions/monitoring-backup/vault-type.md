---
title: "Vault Type: Recovery Services Vault vs Backup Vault"
slug: vault-type
category: monitoring-backup
tags: [backup, vault, recovery-services, backup-vault, protection]
services:
  - Azure Backup
glossary:
  - Azure Backup
  - Recovery Services Vault
  - Backup Vault
  - Azure Site Recovery (ASR)
  - Azure Disk Backup
  - Azure Blob Backup
  - Azure Database for PostgreSQL Backup
---

## When to use Recovery Services Vault

- VM backup (Azure VM, Azure VM with SQL Server, SAP HANA)
- Azure Files backup (file shares)
- Azure Site Recovery (ASR) — replication to secondary region
- Backup Center integration for cross-vault management
- Classic backup scenario — VMs, files, SQL Server
- Cross-Region Restore (CRR) for GRS vaults

## When to use Backup Vault

- Azure Disks backup (managed disk snapshots)
- Azure Blob backup (operational backup for blob storage)
- Azure Database for PostgreSQL backup
- Azure Kubernetes Service (AKS) backup
- Modern backup scenarios — newer Azure resources
- **Limitation:** Cannot be used for VM backup or ASR

## Decision Table

| Feature | Recovery Services Vault | Backup Vault |
|---|---|---|
| **VM backup** | ✅ | ❌ |
| **Azure Files backup** | ✅ | ❌ |
| **Azure Disks backup** | ❌ | ✅ |
| **Azure Blob backup** | ❌ | ✅ |
| **Azure Database for PostgreSQL** | ❌ | ✅ |
| **AKS backup** | ❌ | ✅ |
| **ASR (Site Recovery)** | ✅ | ❌ |
| **Cross-Region Restore** | ✅ (with GRS) | ❌ |
| **Soft delete** | ✅ | ✅ |
| **Monitoring** | ✅ (Backup Center) | ✅ (Backup Center) |

## Key Distinctions

- Recovery Services Vault is for **classic Azure workloads** (VMs, Files, SQL Server in VMs, SAP HANA) and **ASR**
- Backup Vault is for **newer Azure resource types** (Disks, Blobs, PostgreSQL, AKS)
- Recovery Services Vault supports **Cross-Region Restore** (CRR) — Backup Vault does not
- Recovery Services Vault uses **MARS agent** for on-premises file/folder backup — Backup Vault has no on-premises backup capability
- Recovery Services Vault integrates with **ASR** for DR orchestration — Backup Vault does not support ASR
- **Both** vault types appear in Azure Backup Center and support soft delete

## Related Cards

- [Backup vs DR](monitoring-backup/backup-vs-dr.md) — Azure Backup vs ASR vs Snapshot vs Geo-Replication
- [Storage Data Protection](storage/data-protection.md) — Soft Delete vs Versioning vs PITR vs Immutable
- [SQL DR](databases/sql-dr.md) — Active Geo-Replication vs Failover Groups vs Geo-Restore vs ASR
