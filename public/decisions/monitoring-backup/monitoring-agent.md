---
title: "Monitoring Agent: Azure Monitor Agent vs Legacy Agents"
slug: monitoring-agent
category: monitoring-backup
tags: [monitoring, agent, ama, log-analytics, diagnostics]
services:
  - Azure Monitor
glossary:
  - Azure Monitor Agent (AMA)
  - Data Collection Rule (DCR)
  - Data Collection Endpoint (DCE)
  - Log Analytics
  - Diagnostic Setting
---

## When to use Azure Monitor Agent (AMA)

- All new deployments — AMA is the **future** of Azure monitoring agents
- Centralized agent configuration via Data Collection Rules (DCRs) — no per-VM config
- Collect data from Azure, on-premises, and other cloud VMs (Windows + Linux)
- Network isolation with Data Collection Endpoints (DCE) and Private Link
- Multi-homing — send data to multiple Log Analytics workspaces
- Supports Windows (64-bit) and Linux
- **Note:** AMA replaces both the Log Analytics Agent and the Diagnostics Extension

## When to use Log Analytics Agent (Legacy)

- Existing deployments not yet migrated to AMA
- Hybrid Runbook Worker with Azure Automation (still requires Log Analytics agent)
- **Limitation:** No DCR-based central configuration — per-VM agent settings
- **Limitation:** No Private Link support for data ingestion
- **Limitation:** No multi-homing (single workspace per agent)
- **Deprecation path:** Microsoft recommends migrating to AMA

## When to use Diagnostics Extension (Legacy)

- Windows Azure Diagnostics (WAD) and Linux Azure Diagnostics (LAD)
- Collect guest OS metrics and logs to Azure Storage or Event Hubs
- Used by older VMSS configurations and some classic services
- **Limitation:** More complex configuration (XML/JSON for WAD)
- **Note:** AMA is the replacement for both WAD and LAD

## Decision Table

| Feature | AMA | Log Analytics Agent (Legacy) | Diagnostics Extension (Legacy) |
|---|---|---|---|
| **Configuration** | DCR (central, no per-VM config) | Per-VM agent settings | XML/JSON config per VM |
| **Multi-homing** | ✅ (multiple workspaces) | ❌ (single workspace) | ✅ (Storage + Event Hubs) |
| **Private Link** | ✅ (via DCE) | ❌ | ❌ |
| **Windows** | ✅ | ✅ | ✅ (WAD) |
| **Linux** | ✅ | ✅ | ✅ (LAD) |
| **Hybrid Runbook Worker** | ❌ (still needs LA agent) | ✅ | ❌ |
| **DCR flexibility** | ✅ (per-data-type filtering) | ❌ | ❌ |
| **Microsoft recommendation** | ✅ (current) | ❌ (migrate) | ❌ (migrate) |

## Key Distinctions

- AMA uses **Data Collection Rules (DCRs)** — a single DCR can apply to thousands of VMs; update the DCR, all VMs update automatically
- AMA supports **Private Link** for data ingestion — Log Analytics Agent does not
- AMA cannot be used for **Hybrid Runbook Worker** (Azure Automation) — legacy agent still required there
- **Migration path:** Deploy AMA side-by-side with legacy agents, validate, then remove legacy agents
- AMA **reduces management overhead** — no per-VM agent configuration
- For **exam scenarios**: if the question mentions central configuration (DCR), private link, or multi-homing → choose AMA; if it mentions Hybrid Runbook Worker → Log Analytics Agent required

## Related Cards

- [Monitoring Solution](monitoring-backup/monitoring-solution.md) — Monitor vs Log Analytics vs App Insights vs Sentinel
- [Telemetry Type](monitoring-backup/telemetry-type.md) — Metrics vs Logs vs Traces
