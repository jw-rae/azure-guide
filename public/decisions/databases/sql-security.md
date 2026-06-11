---
title: "SQL Security: TDE vs Always Encrypted vs Dynamic Data Masking"
slug: sql-security
category: databases
tags: [sql, security, encryption, masking, compliance]
services:
  - Azure SQL Database
  - Azure SQL Managed Instance
glossary:
  - TDE
  - Always Encrypted
  - Dynamic Data Masking
  - Data Discovery & Classification
  - Microsoft Defender for Cloud (SQL)
  - Server Level IP Firewall Rules
---

## When to use TDE (Transparent Data Encryption)

- Encrypt the entire database at rest (AES-256)
- Transparent to applications — no code changes
- Default encryption for Azure SQL Database and SQL MI
- Platform-managed or customer-managed keys (via Key Vault)
- **Limitation:** Encrypts at the storage level, not column-level; admins with access can query data

## When to use Always Encrypted

- Client-side encryption of specific columns (credit cards, PII, national IDs)
- Database administrators cannot see plaintext data
- Column-level encryption with keys in Key Vault or Windows Certificate Store
- Ensure sensitive data never appears in plain text in the database system
- **Requirement:** Client driver support and connection string configuration (`Column Encryption Setting=Enabled`)

## When to use Dynamic Data Masking

- Obfuscate sensitive data in query results for non-admin users
- Display partial values (e.g., `XXXX-XXXX-XXXX-1234`)
- No encryption — masks at query time only
- Easy to implement, no application changes
- **Limitation:** Does not protect data at rest or from privileged users

## Decision Table

| Feature | TDE | Always Encrypted | Dynamic Data Masking |
|---|---|---|---|
| **Encryption** | ✅ (AES-256, at rest) | ✅ (column-level, client-side) | ❌ (masks only) |
| **Scope** | Entire database | Specific columns | Specific columns |
| **Transparent to app** | ✅ | ✅ (with driver support) | ✅ |
| **Prevents admin access** | ❌ | ✅ | ❌ |
| **Code changes** | ❌ | ✅ (connection string) | ❌ |
| **Key management** | PMK or CMK (Key Vault) | Key Vault or Cert Store | N/A |
| **Use case** | Compliance at rest | PII column protection | Query result masking |

## Additional Security Features

| Feature | Purpose |
|---|---|
| **Data Discovery & Classification** | Scans SQL DB/SQL MI, identifies sensitive data, recommends labels |
| **Server Level IP Firewall Rules** | Restrict access to specific IP ranges / static public IPs |
| **Microsoft Defender for Cloud (SQL)** | Threat detection: SQL injection, unusual access patterns |
| **Microsoft Entra ID Authentication** | Replace SQL authentication with identity-based access |
| **Private Endpoint** | Restrict SQL access to a VNet (no public endpoint) |

## Key Distinctions

- TDE protects **data at rest** (storage level) — Always Encrypted protects **data in use** (client side, admins can't see it)
- Always Encrypted requires **connection string change** and **driver support** — not transparent to all apps
- Dynamic Data Masking is **not encryption** — it masks query results for non-admins but the data is still stored in plaintext
- For defense-in-depth: combine TDE (at rest) + Always Encrypted (sensitive columns) + Masking (non-admin users)
- Server Level IP Firewall Rules are configured per SQL Server — not per database
- Always Encrypted with **enclaves** enables richer computation (pattern matching, range queries) on encrypted data (requires enclave-enabled Keys)

## Related Cards

- [SQL Deployment](databases/sql-deployment.md) — SQL DB vs SQL MI vs SQL VM
- [SQL Purchasing Model](databases/sql-purchasing-model.md) — vCore vs DTU vs Serverless vs Hyperscale
