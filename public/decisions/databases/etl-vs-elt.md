---
title: "Data Processing: ETL vs ELT"
slug: etl-vs-elt
category: databases
tags: [etl, elt, data-pipeline, transformation, integration]
services:
  - Azure Data Factory (ADF)
  - Azure Synapse Analytics
glossary:
  - ETL
  - ELT
  - Azure Data Factory (ADF)
  - Azure Synapse Analytics
  - Data Lake
  - Data Warehouse
---

## When to use ETL

- Compliance-heavy environments requiring data cleansing before storage (GDPR, PCI)
- Structured data being loaded into a data warehouse
- Transformations are well-defined and stable
- Need to minimize storage costs by filtering/aggregating before loading
- Data quality is critical — bad data should not enter the target system

## When to use ELT

- Preserving raw data for future analysis (data lakes)
- Unstructured or semi-structured data (JSON, logs, IoT telemetry)
- Cloud-scale transformations using Spark or Synapse SQL pools
- Agile environments where schemas evolve frequently
- Raw data has future value beyond the current use case

## Decision Table

| Feature | ETL | ELT |
|---|---|---|
| **Transform location** | Before loading (staging area) | After loading (in target) |
| **Data preservation** | Transformed data only | Full raw data preserved |
| **Storage cost** | Lower (clean data) | Higher (raw + transformed) |
| **Schema** | Schema-on-write | Schema-on-read |
| **Best for** | Data warehouses | Data lakes / lakehouses |
| **Compliance** | ✅ (clean before storage) | Requires additional governance |
| **Flexibility** | Low (fixed transforms) | High (re-transform anytime) |
| **Azure tools** | ADF (copy + transform), SSIS | ADF (copy), Synapse Spark, Databricks |

## Key Distinctions

- ETL cleans data **before** storage — ELT stores raw data and transforms **on demand**
- ELT preserves the **raw data** for future use cases that may not be known yet
- ETL is typically used for **data warehouses**; ELT for **data lakes**
- In Azure, ADF can do both: ETL (with Data Flows) or ELT (copy raw data, then transform with Synapse Spark)
- Choose ETL when data **must** be compliant before entering storage; choose ELT when agility and raw data preservation matter more

## Related Cards

- [Analytics Storage](databases/analytics-storage.md) — Data Lake Gen2 vs Synapse SQL vs Lakehouse
- [Batch Processing](compute/batch-processing.md) — Azure Batch vs Functions vs AKS
