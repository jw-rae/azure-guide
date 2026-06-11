---
title: "SQL Deployment: Azure SQL DB vs SQL Managed Instance vs SQL Server on VM"
slug: sql-deployment
category: databases
tags: [sql, deployment, paas, iaas, migration, compatibility]
services:
  - Azure SQL Database
  - Azure SQL Managed Instance
  - SQL Server on Azure VM
glossary:
  - Azure SQL Database
  - Azure SQL Managed Instance
  - SQL Server on Azure VM
  - Azure Hybrid Benefit (SQL)
---

## When to use Azure SQL Database

- New cloud-native applications (PaaS, minimal management)
- Single database per application with low migration effort
- Zone redundancy for HA
- Elastic pools for multi-tenant with variable resource usage
- Hyperscale for databases up to 100 TB
- **Limitations:** No SQL CLR, no cross-database queries, no SSIS/SSAS

## When to use SQL Managed Instance

- Lift-and-shift migration with near 100% SQL Server compatibility
- Need cross-database queries, linked servers, SQL CLR, Service Broker
- Distributed transactions across multiple databases
- Dedicated VNet for network isolation
- Existing SSIS/SSAS workloads to migrate with minimal changes

## When to use SQL Server on Azure VM

- Full control over SQL Server version and OS
- Legacy apps requiring older SQL Server versions
- Custom clustering, Always On Availability Groups with file-share witness
- OS-level access for custom configuration or third-party agents
- Highest administrative effort (manual backups, patching, HA config)

## Decision Table

| Feature | SQL DB | SQL MI | SQL VM |
|---|---|---|---|
| **Management** | Fully managed (PaaS) | Fully managed (PaaS) | Self-managed (IaaS) |
| **Compatibility** | Latest SQL engine only | Near 100% | Full (any version) |
| **Cross-database queries** | ❌ | ✅ | ✅ |
| **Linked servers** | ❌ (elastic query limited) | ✅ | ✅ |
| **SQL CLR** | ❌ | ✅ | ✅ |
| **SSIS/SSAS/SSRS** | ❌ | ✅ (SSIS via ADF) | ✅ |
| **VNet isolation** | Private Endpoint | Dedicated VNet | Full VNet |
| **Zone redundancy** | ✅ (GP/BC) | ✅ | Manual (Always On) |
| **Max storage** | 100 TB (Hyperscale) | 16 TB | 256 TB |
| **Migration effort** | Low | Medium | High |
| **Hybrid Benefit** | ✅ | ✅ | ✅ |

## Key Distinctions

- SQL DB is **latest engine only** — SQL MI is **near 100% compatible** with on-prem SQL Server
- SQL CLR is **not supported** in SQL DB — must use SQL MI or SQL VM
- SQL MI requires a **dedicated VNet subnet** — SQL DB uses Private Endpoint for network isolation
- SQL VM gives **full control** but requires you to manage backups, patching, HA — highest admin overhead
- For **lift-and-shift**: SQL MI when near-100% compatibility needed; SQL DB if app is compatible with latest engine
- Azure Hybrid Benefit works for all three — apply existing SQL Server licenses

## Combo Pattern: Migration Path

```
Assess → DMA flags unsupported features
  ↓
Few issues → Azure SQL DB (fastest, lowest effort)
Some features (CLR, cross-db) → SQL MI (lift-and-shift)
Full control required → SQL VM (IaaS, highest effort)
```

## Related Cards

- [SQL Purchasing Model](databases/sql-purchasing-model.md) — vCore vs DTU vs Serverless vs Hyperscale
- [SQL Security](databases/sql-security.md) — TDE vs Always Encrypted vs Dynamic Data Masking
- [SQL DR](databases/sql-dr.md) — Geo-Replication vs Failover Groups vs Geo-Restore vs ASR
