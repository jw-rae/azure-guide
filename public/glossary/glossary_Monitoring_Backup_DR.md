# Glossary: Monitoring, Backup & Disaster Recovery

## Azure Monitor

- **Azure Monitor** (Azure): Full-stack monitoring service. Captures metrics, logs, and traces from Azure, on-premises, platform services, and application code. Best for ensuring IT administrators receive alerts based on critical conditions via metrics, logs, and event-driven alerts.
- **Metrics** (Azure / IT concept): Short, time-based, frequently updated, near real-time. Numeric values for alerting. Visualized via Metrics Explorer. Stored in Azure Monitor, Log Analytics, Storage Accounts, Event Hubs.
- **Logs** (Azure / IT concept): Long, event-based, sporadically updated. Free-form or structured. Stored in Log Analytics Workspace. Queried using KQL. Cannot be stored directly in Azure Monitor.
- **Traces** (Azure / IT concept): Records the path of a request through a distributed system, showing each operation/component involved. Used for end-to-end diagnostics and performance analysis. Captured by Application Insights.
- **Azure Monitor Agent / AMA** (Azure): Unified agent replacing Log Analytics Agent and Diagnostics Extension. Supports Windows/Linux, VMs, VMSS, Arc-enabled servers. Uses Data Collection Rules (DCRs) + System-Assigned Managed Identity.
- **Data Collection Rule / DCR** (Azure): Defines what metrics/logs to collect and where to send them.
- **Data Collection Endpoint / DCE** (Azure): Stores DCR configuration.
- **Diagnostic Settings** (Azure): Configure per resource to send logs/metrics to Log Analytics, Storage Accounts, or Event Hubs. Max 5 destinations per resource.
- **Metrics Explorer** (Azure): Tool for exploring metrics stored in Azure Monitor. Visualizes near real-time numeric data.

## Log Analytics

- **Log Analytics Workspace / Azure Monitor Log Analytics Workspace** (Azure): Centralized log database for querying and analysis. Supports KQL. Best practice: dedicated workspaces per environment (DEV/TEST/PROD). Correlates Azure resource usage and performance data with application configuration and performance data.
- **KQL / Kusto Query Language** (Azure): Query language for transforming and analyzing logs in Log Analytics. Also used in Azure Data Explorer and Synapse Data Explorer.
- **Log Analytics Agent** (Azure): Legacy agent for log collection. Replaced by Azure Monitor Agent (AMA).

## Insights

- **VM Insights** (Azure): Monitors VMs, VMSS, Arc-enabled servers. Requires AMA + DCR. Sends data to Log Analytics.
- **Container Insights** (Azure): Performance monitoring for workloads running in containers within AKS clusters. Used with Log Analytics Workspace for cluster monitoring, workload performance, log queries, and alerts.
- **Azure Service Map** (Azure): Automatically discovers application components and dependencies. Visualizes relationships between components but does not correlate Azure resource usage with application performance data like Log Analytics does.
- **Network Insights** (Azure): Monitors VNet resources. No agent required. Visualizes health, alerts, connectivity.
- **Application Insights** (Azure): Application Performance Management (APM). Monitors app performance, reliability, user behavior. Supports auto/manual instrumentation. Live metrics, transaction search, traces, user flow analysis. Primarily for monitoring/analyzing performance and usage, not designed for sending alerts to IT administrators.
- **Storage Insights** (Azure): Monitors Azure Storage accounts. No agent required. Health, availability, diagnostics.

## Alerts & Actions

- **Azure Monitor Alert** (Azure): Triggered when a signal (metric, log, activity log) meets a defined condition. Types: Static (threshold) or Smart (ML-based anomaly).
- **Action Group** (Azure): Collection of actions executed when an alert fires. Notify via email, SMS, push, voice. Trigger Automation Runbooks, Azure Functions, Event Hubs, ITSM. Max 5 action groups per alert rule.
- **Azure Monitor Workbooks** (Azure): Interactive dashboards consolidating data from various sources for a comprehensive view of resource performance. Centralized monitoring with RBAC for team autonomy.
- **Alert Processing Rule** (Azure): Suppresses alerts based on conditions (e.g., suppress on weekends).

## Microsoft Sentinel

- **Microsoft Sentinel** (Azure): SIEM (Security Information and Event Management) + SOAR (Security Orchestration, Automation, Response). Cloud-native security analytics.
- **SIEM / Security Information and Event Management** (IT concept): Aggregates and analyzes security data from across the environment for threat detection.
- **SOAR / Security Orchestration, Automation, Response** (IT concept): Automates response to security incidents.
- **Sentinel Data Connectors** (Azure): Pre-built integrations for Azure services, multi-cloud (AWS, GCP), on-prem/third-party (Palo Alto, Cisco, SAP, Okta), custom REST APIs/syslog.
- **Sentinel Incident Response** (Azure): Detect → Investigate (KQL/workbooks) → Respond (automated via Logic Apps/Functions or manual per runbooks) → Recover → Review.

## Network Watcher

- **Azure Network Watcher** (Azure): Suite of tools for monitoring, diagnosing, and analyzing network traffic. Auto-enabled per region when VNet deployed.
- **Connection Monitor** (Azure): Tracks end-to-end connectivity and latency between endpoints.
- **NSG Flow Logs** (Azure): Logs IP traffic through NSGs. Stored in storage account.
- **Traffic Analytics** (Azure): Visualizes and analyzes NSG Flow Log data.

## Azure Backup

- **Azure Backup** (Azure): Managed service for backing up and recovering workloads to the cloud.
- **Backup Center** (Azure): Central place to manage vaults, policies, and backup operations.
- **Recovery Services Vault** (Azure): For Azure VMs, Azure Files, SQL/SAP HANA on VMs. Must be in the same region as the data source.
- **Backup Vault** (Azure): For Azure Disks, Blobs, PostgreSQL, AKS.
- **Enhanced Backup Policy** (Azure): Multiple backups/day (min every 4 hours), 30 days operational tier retention, long-term retention (daily/weekly/monthly/yearly), up to 17 snapshots, crash-consistent.
- **Standard Backup Policy** (Azure): One backup/day, 5 days operational tier retention.
- **MARS Agent / Microsoft Azure Recovery Services Agent** (Azure): Used for on-premises servers and granular VM backup.
- **Operational Tier** (Azure): Fast recovery, short-term storage.
- **Long-Term Tier** (Azure): Lower cost, slower recovery. Long-term retention up to 10 years.
- **Azure Backup Reports** (Azure): Accessed via Backup Center. Requires Log Analytics workspace. Config diagnostic settings on vault to send data. May take ~24 hours to appear.

## Disaster Recovery

- **BCP / Business Continuity Plan** (IT concept): Broader plan covering disaster recovery, ensuring critical business functions continue during/after a disaster.
- **RPO / Recovery Point Objective** (IT concept): Max acceptable data loss (e.g., 1 hour). Lower = more frequent replication.
- **RTO / Recovery Time Objective** (IT concept): Max acceptable downtime (e.g., 2 hours). Lower = faster recovery.
- **Azure Site Recovery / ASR** (Azure): Replicates workloads across regions for failover. Supports physical and virtual machines. Replicates VM disks to recovery region via cache storage. Replicates any workload running on Azure or on-premises VMs in continuous time.
- **Azure Site Recovery Replication** (Azure): Copies VM disks to cache storage, then to recovery region. VM recreated in recovery region during failover.
- **Test Failover** (Azure): Validates recovery setup without impacting production. Simulates failover for DR drills.
- **Planned Failover** (Azure): Used during maintenance or migration.
- **Unplanned Failover** (Azure): Triggered during actual outages.
- **Recovery Plan** (Azure): Orchestrates failover of multiple VMs in structured order. Supports pre/post scripts. Multi-tier app support (identity → database → app → web).
- **Failover Time** (IT concept): Time for switching processes during failover.
- **Recovery Time** (IT concept): Total time until system is fully operational again after failover.
- **Active Geo-Replication** (Azure): Azure SQL async replication for regional DR. Seconds RPO. Manual failover.
- **Failover Groups** (Azure): Multi-database DR with listener. Auto/manual failover. Minutes RTO. Secondary server should be in a different region. Potential data loss up to 5 seconds during auto-failover.

## Pilot Light

- **Pilot Light Configuration** (IT / DR pattern): DR strategy where a minimal version of a system (core services like databases) is kept running in a secondary environment while the rest of infrastructure is shut down. Faster recovery than cold standby, lower cost than active-active.
