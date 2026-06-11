---
title: "Analytics Storage: Data Lake Gen2 vs Synapse SQL vs Lakehouse"
slug: analytics-storage
category: databases
tags: [analytics, data-lake, data-warehouse, lakehouse, big-data]
services:
  - Azure Data Lake Storage Gen2
  - Azure Synapse Analytics
glossary:
  - Data Lake
  - Data Warehouse
  - Azure Data Lake Storage Gen2
  - Azure Synapse Analytics
  - Dedicated SQL Pool
  - Serverless SQL Pool
  - Apache Spark Pool
  - ETL
  - ELT
---

## When to use Data Lake Storage Gen2

- Raw data storage for big data analytics (schema-on-read)
- Unstructured, semi-structured, and structured data all in one place
- Hadoop Distributed File System (HDFS) as a service
- Hierarchical namespace with file/folder-level granular access control
- Lower cost than Cosmos DB for large volumes of unstructured data
- Foundation for data science, ML training, and exploration

## When to use Synapse Dedicated SQL Pool

- Structured data optimized for analytics queries (schema-on-write)
- Large-scale data warehousing (TB to PB)
- Complex T-SQL queries with high concurrency
- MPP (Massively Parallel Processing) for fast query performance
- Reporting, BI dashboards, and structured analytics

## When to use Synapse Serverless SQL Pool

- Ad-hoc queries on data lakes without provisioning infrastructure
- Pay-per-query — no reserved capacity
- Small to medium datasets, exploration, and prototyping
- T-SQL interface over Data Lake Storage data

## When to use Lakehouse (Synapse + Data Lake)

- Combine data lake flexibility with warehouse performance
- Store raw data in Data Lake, query with Spark or Serverless SQL
- Near real-time analytics via Synapse Link (Cosmos DB, SQL DB)
- Unified analytics without data movement — ELT pattern
- The hybrid approach for modern data platforms

## Decision Table

| Feature | Data Lake Gen2 | Synapse Dedicated SQL Pool | Synapse Serverless SQL Pool | Lakehouse |
|---|---|---|---|---|
| **Schema** | Schema-on-read | Schema-on-write | Schema-on-read | Hybrid |
| **Data types** | All (structured/semi/unstructured) | Structured only | Semi/unstructured | All |
| **Query engine** | Spark, Hive, Presto | T-SQL (MPP) | T-SQL | Spark + T-SQL |
| **Pricing** | Storage + compute separate | Provisioned DWU | Pay-per-query | Combination |
| **Best for** | Raw data, ML, exploration | BI, reporting, structured queries | Ad-hoc lake queries | Unified analytics |
| **Performance** | Throughput optimized | Query optimized | Variable | Both |
| **Cost** | Low (object storage) | High (provisioned) | Low (per query) | Medium |

## Key Distinctions

- Data Lake Storage Gen2 costs less than Cosmos DB for large unstructured data and supports GRS — choose for cost-efficient big data storage
- Synapse Dedicated SQL Pool is **MPP** (massively parallel) — different architecture from Azure SQL Database
- Serverless SQL Pool **queries data in place** in Data Lake — no need to load into a warehouse first
- ETL (clean before loading) is for warehouses; ELT (load then transform) is for data lakes — choose based on whether you need to preserve raw data
- **Synapse Link** enables near real-time analytics on Cosmos DB and SQL DB without ETL — enabling HTAP

## Related Cards

- [ETL vs ELT](databases/etl-vs-elt.md) — Extract-Transform-Load vs Extract-Load-Transform
- [Cosmos DB API](databases/cosmos-api.md) — NoSQL vs MongoDB vs Table vs Gremlin vs Cassandra vs PostgreSQL
- [Data Transfer](migration/data-transfer.md) — AzCopy vs Data Box vs Import/Export vs Storage Migration Service vs File Sync
