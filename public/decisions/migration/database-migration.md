---
title: "Database Migration: DMA vs DMS vs Azure Migrate vs Data Studio"
slug: database-migration
category: migration
tags: [migration, database, sql, assessment, dms]
services:
  - Azure Database Migration Service (DMS)
  - Azure Migrate
glossary:
  - Azure Database Migration Service (DMS)
  - Azure Migrate
  - Data Migration Assistant (DMA)
  - Azure Data Studio
  - ETL
  - ELT
  - Azure Data Factory (ADF)
---

## When to use Data Migration Assistant (DMA)

- Pre-migration assessment — detect compatibility issues with the target SQL version
- Feature parity check — identify deprecated features, breaking changes, behavior changes
- Recommend the right target (Azure SQL DB, SQL MI, SQL VM)
- Free, lightweight tool — runs on-premises or dev machine
- **Limitation:** Assessment only — does not perform the actual migration

## When to use Azure Data Studio

- Cross-platform database management and querying (Windows, macOS, Linux)
- SQL Server and Azure SQL database management
- Migration Assessment extension — assessment + SKU recommendation for Azure SQL
- Modern editor with notebooks, charting, and extension support
- **Note:** Complement to SSMS (which is Windows-only)

## When to use Azure Database Migration Service (DMS)

- Online (minimal downtime) or offline migration of SQL Server, MySQL, PostgreSQL, MongoDB to Azure
- Orchestrated migration with monitoring dashboard
- Supports Azure SQL DB, SQL MI, SQL VM, Cosmos DB
- Requires a DMS instance in Azure and a source connection
- Handles data synchronization during online migration
- **Limitation:** DMS does not perform pre-migration assessment — use DMA for that first

## When to use Azure Migrate

- **Server-level** assessment and migration — not database-specific
- Discovery and assessment of on-premises servers, databases, web apps, virtual desktops
- Migration of VMs (VMware, Hyper-V, physical) to Azure with Azure Site Recovery or Azure Migrate: Server Migration
- Integrated dashboard for the full migration journey
- **Note:** For database-specific migration, use DMA → DMS; Azure Migrate covers the broader server migration scope

## Decision Table

| Feature | DMA | Azure Data Studio | DMS | Azure Migrate |
|---|---|---|---|---|
| **Purpose** | SQL assessment | DB management + assessment | Database migration | Full server migration |
| **Scope** | SQL Server only | SQL Server + Azure SQL | SQL Server, MySQL, PostgreSQL, MongoDB | VMs, databases, web apps, VDI |
| **Online migration** | ❌ | ❌ | ✅ | ✅ (with ASR) |
| **Offline migration** | ❌ | ❌ | ✅ | ✅ |
| **Assessment** | ✅ (detailed) | ✅ (with extension) | ❌ | ✅ (server + dependency) |
| **SKU recommendation** | ✅ | ✅ | ❌ | ✅ (Azure Migrate) |
| **Cost** | Free | Free | Paid (compute + storage) | Free (assessment); paid (migration) |

## Key Distinctions

- DMA is **assessment only** — DMS is **migration only** — use DMA before DMS
- DMS can do **online migration** (minimal downtime) with data sync — offline migration requires source downtime
- Azure Migrate covers **full server discovery and migration** — databases, web apps, VMs — not just SQL
- DMA detects **feature parity issues** (SQL CLR, linked servers, cross-database queries) that affect target choice (SQL DB vs SQL MI vs SQL VM)
- For **zero-downtime migration**: use DMS online mode with continuous sync, then cut over
- **Migration flow:** Assess (DMA) → Migrate (DMS online) → Validate → Cut over

## Related Cards

- [SQL Deployment](databases/sql-deployment.md) — SQL DB vs SQL MI vs SQL VM
- [Data Transfer](migration/data-transfer.md) — AzCopy vs Data Box vs Import/Export vs Storage Migration Service vs File Sync
- [ETL vs ELT](databases/etl-vs-elt.md) — Extract-Transform-Load vs Extract-Load-Transform
