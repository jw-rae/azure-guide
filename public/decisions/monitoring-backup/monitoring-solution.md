---
title: "Monitoring: Azure Monitor vs Log Analytics vs Application Insights vs Sentinel"
slug: monitoring-solution
category: monitoring-backup
tags: [monitoring, observability, logging, siem, apm]
services:
  - Azure Monitor
  - Log Analytics
  - Application Insights
  - Microsoft Sentinel
glossary:
  - Azure Monitor
  - Log Analytics
  - Application Insights
  - Microsoft Sentinel
  - Data Collection Rule (DCR)
  - Data Collection Endpoint (DCE)
  - Diagnostic Setting
  - Azure Monitor Agent (AMA)
---

## When to use Azure Monitor

- Core monitoring platform — metrics, logs, alerts, dashboards
- Azure resource health, activity logs, service health
- Platform metrics (CPU, memory, disk IO, network) — collected automatically
- Central configuration for diagnostics, agents, data collection rules
- Every Azure subscription gets Azure Monitor by default

## When to use Log Analytics

- Central log repository for all monitored resources
- KQL (Kusto Query Language) queries and log analysis
- Log-based alerts and workbooks
- Custom log ingestion from any source (API, agent, DCR)
- Required workspace for Application Insights (classic) and Sentinel

## When to use Application Insights

- Application Performance Monitoring (APM) — request rates, response times, failure rates
- Distributed tracing — end-to-end transaction tracking across services
- User behavior analytics — page views, sessions, browser telemetry
- Smart detection — proactive anomaly detection in app behavior
- Code-level diagnostics — dependency tracking, exception details, SQL performance

## When to use Microsoft Sentinel

- SIEM (Security Information and Event Management) — security event analysis
- SOAR (Security Orchestration, Automation, and Response) — automated incident response
- Threat hunting — query security data with KQL, built-in hunting queries
- Security analytics — UEBA (user entity behavior analytics), fusion ML detection
- **Requirement:** Log Analytics workspace + Sentinel solution enabled

## Decision Table

| Feature | Azure Monitor | Log Analytics | Application Insights | Sentinel |
|---|---|---|---|---|
| **Primary function** | Platform monitoring | Log storage & query | APM | SIEM/SOAR |
| **Data type** | Metrics + Logs + Activity | Logs (structured) | Telemetry (traces, metrics, events) | Security logs |
| **KQL queries** | Limited (Logs tab) | ✅ (primary interface) | ✅ (via Log Analytics) | ✅ |
| **Alerts** | ✅ | ✅ (log-based) | ✅ | ✅ (incidents) |
| **Built-in dashboards** | ✅ (Workbooks) | ✅ (Workbooks) | ✅ (Application Dashboard) | ✅ (Workbooks + Hunting) |
| **Cost** | Included (metrics) | Pay-per-GB ingested | Pay-per-telemetry | Pay-per-GB + commitment tiers |
| **Best for** | All Azure infra | Log retention + queries | App health + debugging | Security monitoring |

## Key Distinctions

- Azure Monitor is the **parent service** — Log Analytics, Application Insights, and Sentinel all run on top of it
- Application Insights is **now part of** Azure Monitor (was a separate service) — its data ingests into Log Analytics workspaces
- Sentinel is a **SIEM + SOAR** — for security monitoring, not general application monitoring
- Log Analytics is the **query engine** — think of it as the "database" where all log data is stored and queried with KQL
- Azure Monitor Agent (AMA) replaces the legacy Log Analytics Agent and Diagnostics Extension — use DCRs for configuration
- For **exam scenarios**: if the question mentions APM (distributed tracing, page views), choose Application Insights; if SIEM (security incidents, threat hunting), choose Sentinel

## Related Cards

- [Telemetry Type](monitoring-backup/telemetry-type.md) — Metrics vs Logs vs Traces
- [Monitoring Agent](monitoring-backup/monitoring-agent.md) — AMA vs Legacy Agents
- [Backup vs DR](monitoring-backup/backup-vs-dr.md) — Azure Backup vs ASR vs Snapshot vs Geo-Replication
