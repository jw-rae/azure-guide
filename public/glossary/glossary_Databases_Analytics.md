# Glossary: Databases & Analytics

## Data Fundamentals

- **Unstructured Data** (IT concept): No fixed schema (text, images, videos). Azure solutions: Blob Storage, Azure Files.
- **Semi-Structured Data** (IT concept): Flexible schema (JSON, XML). Azure solutions: Cosmos DB, Data Lake Storage.
- **Structured Data** (IT concept): Fixed schema (tables, relationships). Azure solutions: Azure SQL, MySQL, PostgreSQL.
- **OLTP / Online Transaction Processing** (IT concept): Fast queries, data integrity (e.g., banking transactions). Optimized for speed/integrity.
- **OLAP / Online Analytical Processing** (IT concept): Read-heavy, complex queries (e.g., reporting, data warehousing). Optimized for insights.
- **ETL / Extract, Transform, Load** (IT concept): Clean data before storage. Structured data, compliance-heavy environments.
- **ELT / Extract, Load, Transform** (IT concept): Preserves raw data. Leverages cloud scale for transforms. Unstructured/semi-structured data.
- **HTAP / Hybrid Transactional/Analytical Processing** (IT concept): Combines OLTP + OLAP on same system. Synapse Link enables this.

## Azure SQL

- **Azure SQL Database** (Azure): Fully managed PaaS (latest SQL Server engine). For new cloud-native apps. Low migration effort. Zone redundancy support. Does not support SQL CLR integration.
- **Azure SQL Managed Instance** (Azure): Fully managed SQL Server instance. Lift-and-shift migrations. Near 100% compatibility. Supports cross-database queries, linked servers, distributed transactions, SQL CLR. Dedicated VNet. Define instance capacity with maximum CPU cores, maximum allocated Storage. Define other non related to workload parameters maximum resources per database, resource limit per group of database.
- **SQL Server on Azure VM** (Azure): Full control over SQL Server/OS. Legacy apps, OS-level access. Manual setup/high effort.
- **Azure SQL Edge** (Azure): Lightweight SQL for IoT/edge devices.
- **SQL Managed Instance (Arc)** (Azure): Managed Instance on hybrid/other clouds (Arc-enabled).
- **Azure Hybrid Benefit (SQL)** (Azure): Apply existing SQL Server licenses to reduce costs. Not available for DTU model.

## SQL Purchasing Models

- **DTU / Database Transaction Unit** (Azure): Legacy model bundling compute, memory, I/O into fixed tiers. Tiers: Basic (99.9% SLA), Standard (99.95%), Premium (99.99%, read scale-out). Does not allow independent compute/storage selection. Does not support backup storage replication options (LRS, ZRS, RA-GRS) or full reservation/hybrid benefit.
- **vCore** (Azure): Recommended model separating compute and storage with independent selection. Tiers: General Purpose (99.9%, balanced), Business Critical (99.95%, low latency, in-memory OLTP, 1 read replica, up to 4 TB), Hyperscale (99.95%, 100TB+, up to 4 replicas). Supports backup storage replication (LRS, ZRS, RA-GRS), reservation for cost reduction, and Azure Hybrid Benefit.
- **vCore Compute Tiers** (Azure): Provisioned (fixed resources, supports Hybrid Benefit) and Serverless (auto-scaling, pauses when idle, no Hybrid Benefit). Serverless does not provide independent compute/storage selection.
- **Elastic Pool** (Azure): Shares resources across multiple databases. Cost-efficient for variable workloads. No serverless tier. Hyperscale in preview. Does not allow independent compute/storage selection or backup replication options.
- **Hyperscale** (Azure): Designed for very large databases (up to 100 TB). Rapid scaling, high performance, fast failover.
- **Server Level IP Firewall Rules** (Azure): Controls access to Azure SQL Database based on IP addresses/ranges. Restrict access to specific workstations with static public IPs.
- **Log Shipping** (SQL Server HA/DR technique): Primary database periodically backs up transaction logs and sends them to a secondary server for restoration, keeping a synchronized copy.

## SQL Availability & DR

- **Active Geo-Replication** (Azure): Async replication for regional DR (Azure SQL Database). Seconds RPO. Manual failover.
- **Failover Groups** (Azure): Multi-database DR with listener support. Auto/manual failover. Seconds RPO.
- **Point-in-Time Restore** (Azure): Restore to specific moment (0-35 days retention). Recovery from accidental deletion/corruption.
- **Long-Term Retention / LTR** (Azure): Retain backups up to 10 years. For compliance (financial records). Required when backups need to be stored for more than 35 days.
- **Geo-Restore** (Azure): Restore from GRS backups during regional outage. ~1 hour RPO.
- **Auto-failover Groups** (Azure): Automatic failover for HA with minimal downtime.

## SQL Security

- **TDE / Transparent Data Encryption** (Azure / SQL Server feature): Encrypts the entire database at rest but does not provide granular column-level control. Uses AES-256. Transparent to applications.
- **Always Encrypted** (Azure / SQL Server feature): Client-side encryption. Admins cannot see data. Column-level encryption. Ensures sensitive data never appears in plain text in the database. Requires Key Vault for key storage. Connect via connection string with Always Encrypted enabled.
- **Dynamic Data Masking** (Azure): Masks sensitive data from non-admin users. Hides PII (e.g., credit card numbers) in query results.
- **Data Discovery & Classification** (Azure): Built-in Azure SQL feature. Scans for sensitive data (PII), recommends classifications (Confidential, etc.), labels and protects data.
- **Microsoft Defender for Cloud (SQL)** (Azure): Advanced Threat Protection. Detects SQL injection, unusual activity. Enables auditing to Log Analytics/Sentinel.

## Data Migration

- **Azure Migrate** (Azure): Assess multiple databases. Provides cost estimates and target sizing.
- **DMA / Data Migration Assistant** (Microsoft): Assess SQL compatibility for Azure SQL. Flags unsupported features. Primarily for assessing on-prem SQL compatibility, not automating data transfer.
- **SSMA / SQL Server Migration Assistant** (Microsoft): Migrates on-prem SQL Server databases to Azure SQL Database.
- **DMS / Database Migration Service** (Azure): Migrates schema + data online/offline. Supports PowerShell automation.
- **Azure Data Studio** (Azure): Wizard-based SQL migration extension.

## Non-Relational (NoSQL) Databases

- **NoSQL** (IT concept): Non-relational database with flexible schema. Designed for horizontal scale-out, high concurrency, global distribution. Tunable consistency (BASE model).
- **BASE / Basically Available, Soft state, Eventual consistency** (IT concept): NoSQL consistency model. Prioritizes availability over strong consistency.
- **Key-Value Store** (IT concept): Simple key:value pairs. Azure: Table Storage, Cosmos DB (Table API). For caching, session state.
- **Document Store** (IT concept): JSON/XML documents with nested fields. Azure: Cosmos DB (NoSQL/MongoDB API). Product catalogs, CMS.
- **Graph Database** (IT concept): Nodes + edges for relationships. Azure: Cosmos DB (Gremlin API). Social networks, fraud detection.
- **Column-Family Store** (IT concept): Columns grouped by keys (wide-column). Azure: Cosmos DB (Cassandra API). Time-series, IoT.

## Azure Cosmos DB

- **Azure Cosmos DB** (Azure): Globally distributed NoSQL database. Low-latency transactional applications. Multi-region writes. Supports multiple APIs. Guaranteed performance at global scale. Optimized for JSON data and failover but more expensive than Data Lake Storage.
- **Cosmos DB Account** (Azure): Global namespace. API selection, replication, backup policies.
- **Cosmos DB Database** (Azure): Logical container with throughput settings.
- **Cosmos DB Container** (Azure): Stores items (tables/collections/graphs).
- **Cosmos DB Item** (Azure): Data entry (document, row, node/edge).
- **RU / Request Unit** (Azure): Throughput currency. 1 RU = 1KB read or 100KB write/sec. Provisioned or auto-scale (max 1M RU/s per container).
- **Cosmos DB APIs** (Azure): NoSQL (JSON, native, SQL query syntax), MongoDB (BSON, zero code changes, great for JSON documents), Cassandra (column-family), Gremlin (graph, optimized for graph traversal), Table (key-value, not for flexible JSON), PostgreSQL (relational).
- **Cosmos DB Consistency Levels** (Azure): Strong (linearizable, sync), Bounded Staleness (lag by K versions/ms), Session (your writes, default), Consistent Prefix (ordered, no gaps), Eventual (may be stale, lowest latency). Eventual consistency means copies gradually become consistent over time after a change.

## Azure SQL vs NoSQL

- **Relational (SQL)** (IT concept): Fixed schema, normalization, SQL queries, vertical + limited horizontal scaling. Strong consistency (ACID).
- **NoSQL** (IT concept): Flexible schema, denormalized, API-specific queries, horizontal by design. Tunable consistency (BASE).

## Data Integration

- **Azure Data Factory / ADF** (Azure): Cloud-based ETL/ELT service. Connects to Azure Blob Storage and Azure SQL Database for automated data transfer. Components: Linked Services, Datasets, Pipelines, Activities, Integration Runtimes.
- **Linked Service** (Azure): Connection to data stores/compute in ADF.
- **Dataset** (Azure): Data structure definition in ADF.
- **Pipeline** (Azure): Workflow of activities in ADF.
- **Integration Runtime / IR** (Azure): Processing infrastructure. Azure IR (public endpoints), Self-Hosted IR (private networks), Azure-SSIS IR (SSIS lift-and-shift).
- **SSIS / SQL Server Integration Services** (Microsoft): Microsoft ETL tool compatible with SQL Server on VM and Data Factory.

## Data Lakes & Warehouses

- **Data Lake** (IT concept): Stores all data types (structured/semi/unstructured). Schema-on-read. Low-cost storage. Use: raw data, ML, exploration.
- **Data Warehouse** (IT concept): Structured data only. Schema-on-write. Optimized for analytics SQL queries. Use: reporting, BI.
- **Azure Data Lake Storage Gen2** (Azure): Hadoop Distributed File System (HDFS) as a service. Hierarchical namespace. Optimized for big data analytics, unstructured data, GRS, cheaper than Cosmos DB. Granular access controls at file/folder level.
- **Lakehouse** (IT concept): Hybrid approach combining data lake + warehouse. Example: Synapse Analytics.

## Azure Synapse Analytics

- **Azure Synapse Analytics** (Azure): Unified analytics platform combining SQL, Spark, and Pipelines. Combines big data and data warehousing capabilities for complex queries on large datasets.
- **Dedicated SQL Pool** (Azure): MPP (Massively Parallel Processing) for data warehousing. Large-scale analytics (TB/PB). Auto-pause for cost.
- **Serverless SQL Pool** (Azure): Pay-per-query, no infrastructure. Ad-hoc queries, small datasets.
- **Apache Spark Pool** (Azure): Big data processing (PySpark, Scala). Supports notebooks, Delta Lake (ACID on data lakes).
- **Synapse Link** (Azure): Near real-time analytics on operational data (Cosmos DB, SQL DB). No ETL required. Enables HTAP.
- **Data Explorer Pool** (Azure): Log/telemetry analytics using Kusto query language. IoT and app telemetry.
- **KQL / Kusto Query Language** (Azure): Query language for Azure Data Explorer. Optimized for big data exploration and analysis.

## Real-Time Analytics

- **Azure Stream Analytics** (Azure): Real-time event processing with SQL-like queries. Fraud detection, IoT alerts.
- **Azure HDInsight** (Azure): Fully managed Apache Hadoop and Spark cluster service. For large-scale data volumes and analytics.
- **Azure Analysis Services** (Azure): Fully managed PaaS for enterprise-grade semantic modeling, enabling fast, interactive analysis of complex data.
- **Azure Data Explorer** (Azure): High-performance log/telemetry analytics. Kusto-based. App monitoring, time-series.
- **Azure Databricks** (Azure): Managed Apache Spark platform for big data processing, analytics, ML. Collaborative workspace with notebooks in Scala, R, Python. Ideal for implementing managed Spark clusters for data analysis.

## ACID & Sharding

- **ACID** (IT standard / database): Set of properties for reliable database transactions. Atomicity (all-or-nothing), Consistency (valid state), Isolation (no interference), Durability (permanent once committed).
- **Database Sharding** (IT concept): Splits identically structured data across databases using a Shard Key. Enables horizontal scaling for Azure SQL DB.
