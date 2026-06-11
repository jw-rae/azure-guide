---
title: "Telemetry Type: Metrics vs Logs vs Traces"
slug: telemetry-type
category: monitoring-backup
tags: [telemetry, metrics, logs, traces, observability]
services:
  - Azure Monitor
  - Application Insights
glossary:
  - Azure Monitor
  - Application Insights
  - Distributed Tracing
  - Log Analytics
---

## When to use Metrics

- Numerical time-series data — CPU, memory, request count, latency percentiles
- Real-time monitoring and alerting (low-cost, high-frequency)
- Platform metrics (automatically collected by Azure Monitor for most services)
- Custom metrics from applications (Application Insights)
- Dashboards — track trends over time (p99 latency, error rate)
- **Limitation:** No context — only numbers, no detailed event information

## When to use Logs

- Detailed event records with context — errors, exceptions, custom events
- Auditing and compliance — track who did what and when
- Root cause analysis — why did something happen?
- KQL queries for complex analysis (join, filter, aggregate across sources)
- High storage cost — optimize with Data Collection Rules and retention policies

## When to use Traces

- Distributed tracing — track a single request across multiple services
- Identify bottlenecks in microservices architectures
- End-to-end transaction visibility (Service A → Service B → DB → Service C)
- Application Insights distributed tracing via `trackDependency`, `trackRequest`
- Used with correlation IDs to stitch together the full request path

## Decision Table

| Feature | Metrics | Logs | Traces |
|---|---|---|---|
| **Data type** | Numerical time-series | Structured events | Span/tree of events |
| **Context** | Minimal (name, value, time) | Rich (properties, severity, custom data) | Cross-service correlation |
| **Query language** | Metrics Explorer / KQL | KQL | Application Map / KQL |
| **Cost** | Low (retained 93 days, free tier) | High (pay-per-GB ingested) | Medium (part of Application Insights) |
| **Retention** | 93 days (default) | 30 days–2 years (configurable) | 90 days (default) |
| **Alerting** | ✅ (fast, near real-time) | ✅ (log-based, slower) | ❌ (primarily diagnostic) |
| **Best for** | Dashboards, real-time alerts | Detailed analysis, auditing | Microservices tracing |

## Key Distinctions

- Metrics are **aggregated** (e.g., avg CPU over 5 min) — Logs are **individual events** (e.g., a specific error)
- Traces are **correlated spans** across services — Metrics are **isolated data points**
- Metrics are **low-cost** and retained for 93 days — Logs can be expensive at high volume
- For **alerting**: Metrics are faster and cheaper (Azure Monitor Metrics Alerts) — Log-based alerts are slower but support complex KQL conditions
- Application Insights sends data as **traces** (distributed tracing) and **metrics** (request rates, durations) — both stored in Log Analytics workspace
- For **exam scenarios**: "real-time alert on CPU" → Metrics; "root cause analysis of a specific failure" → Logs; "end-to-end transaction in microservices" → Traces

## Related Cards

- [Monitoring Solution](monitoring-backup/monitoring-solution.md) — Monitor vs Log Analytics vs App Insights vs Sentinel
- [Monitoring Agent](monitoring-backup/monitoring-agent.md) — AMA vs Legacy Agents
