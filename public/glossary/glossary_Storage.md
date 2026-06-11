# Glossary: Azure Storage

## Storage Accounts

- **Azure Storage Account** (Azure): Defined by type, performance tier, replication, and access tier. Naming: globally unique, 3-24 chars, letters/numbers only. Access tools: Storage Explorer (GUI), Storage Browser (Portal), AzCopy (CLI).
- **GPv2 / General Purpose v2** (Azure): Default and recommended storage account. Supports Blob, File, Queue, Table + Hot/Cool/Archive tiers.
- **GPv1 / General Purpose v1** (Azure): Legacy; fewer features, no access tiers.
- **Blob Storage Account** (Azure): Blob-only; Hot/Cool/Archive; mostly superseded by GPv2.
- **Premium Block Blob Storage** (Azure): SSD-backed for high transaction rates, low latency.
- **Premium File Shares** (Azure): Optimized for Azure Files with high IOPS and low latency.
- **Premium Page Blobs** (Azure): Optimized for VHD/page blobs (VM disks). High IOPS.

## Blob Storage

- **Azure Blob Storage** (Azure): REST-based object store. Blobs are individual objects in containers. Supports text, binary, images, backups, streaming. Access via HTTP/S, REST API, SDKs, PowerShell, CLI. Supports NFS protocol. Supports static website hosting for HTML, CSS, JavaScript files.
- **Block Blob** (Azure): Default blob type. Text/binary data (files, images, videos). Blocks of data.
- **Append Blob** (Azure): Optimized for appending data (logging). Cannot modify existing blocks.
- **Page Blob** (Azure): Frequent read/write. Used for VM OS/data disks. Up to 8 TB.

## Access Tiers

- **Hot Tier** (Azure): Frequently accessed data. Highest storage cost, lowest access cost. No min retention. Millisecond latency. 99.9% SLA.
- **Cool Tier** (Azure): Infrequent access (min 30 days). Lower storage cost, higher access cost. Millisecond latency. 99% SLA.
- **Cold Tier** (Azure): Rarely accessed (min 90 days). Very low storage cost, high access cost. Millisecond latency. 99% SLA.
- **Archive Tier** (Azure): Long-term archival (min 180 days). Lowest storage cost, highest access cost (rehydration delay). Hours to access. Early deletion fee applies.
- **Transaction Optimized Tier** (Azure): For transaction-heavy workloads (frequent read/write). Between Hot and Premium.

## Redundancy Options

- **LRS / Locally Redundant Storage** (Azure): 3 copies within single datacenter. Lowest cost. No protection against datacenter/regional failure. No secondary read access.
- **ZRS / Zone-Redundant Storage** (Azure): 3 copies across availability zones within one region. HA within region. No regional DR. No secondary read access.
- **GRS / Geo-Redundant Storage** (Azure): LRS in primary + replication to secondary region. Regional failure protection. Secondary accessible only after failover.
- **GZRS / Geo-Zone-Redundant Storage** (Azure): ZRS in primary + replication to secondary region. HA + geo-redundancy. Secondary accessible only after failover.
- **RA-GRS / Read-Access GRS** (Azure): GRS with read access to secondary region before failover.
- **RA-GZRS / Read-Access GZRS** (Azure): GZRS with read access to secondary region before failover.

## Storage Services

- **Azure Files** (Azure): Managed file share service. Supports SMB 2.1/3.0, NFS 4.1, HTTP. Windows/Linux/macOS. Up to 100 TiB per share. Files up to 4 TiB. Tiers: Premium, Transaction-optimized, Hot, Cool.
- **Azure File Sync** (Azure): Hybrid solution syncing on-premises file servers with Azure Files. Cloud tiering caches frequently accessed files locally.
- **Azure NetApp Files** (Azure): Enterprise NFS/SMB with sub-millisecond latency. Use for SAP, Oracle, HPC. Cross-region replication, SnapMirror for DR.
- **Azure Queue Storage** (Azure): Message queue for async communication. Millions of messages, 64KB each. Cost-effective. For decoupled tasks and background jobs.
- **Azure Table Storage** (Azure): Low-cost, schemaless NoSQL key-value store. Automatic indexing. PartitionKey + RowKey design. 20K ops/sec per account.
- **Storage Endpoint URLs** (Azure): Blob: `https://<account>.blob.core.windows.net`; Table: `https://<account>.table.core.windows.net`; Queue: `https://<account>.queue.core.windows.net`; File: `https://<account>.file.core.windows.net`.

## Authentication & Security

- **Access Key** (Azure): Root-level key pair. Unlimited access to management and data layers. Regenerate regularly. Rotate by regenerating one key while using the other.
- **SAS / Shared Access Signature** (Azure): Time-limited token scoped to account/service/container/blob. Includes access policy, start/expiry time, permissions. Best practice: short expiry (≤1 hour), use stored access policies, enforce HTTPS.
- **Microsoft Entra ID Authentication** (Entra): RBAC for granular access. Replaces access keys with identity-based access. Prefer over credential-based.
- **SSE / Storage Service Encryption** (Azure): AES-256 encryption at rest. Cannot be disabled. Platform-managed or customer-managed keys via Key Vault.
- **Encryption Scope** (Azure): Can be applied at container or blob level.
- **Soft Delete** (Azure): Recovers deleted blobs/containers. Configurable retention period (default 14 days, up to 14 days for blobs). Also available for Key Vault to prevent accidental deletion of vault, keys, secrets, and certificates.
- **Point-in-Time Restore** (Azure): Rolls back to previous state. For data corruption recovery.
- **Immutable Storage** (Azure): WORM (Write Once, Read Many) policies. For regulatory compliance (GDPR, HIPAA, SEC). Legal holds for financial/healthcare data.
- **CORS / Cross-Origin Resource Sharing** (IT concept / Azure Storage): Security mechanism allowing restricted resources on a web page to be requested from another domain outside the originating domain.
- **Static Website Hosting** (Azure): Azure Storage feature for hosting static content (HTML, CSS, JavaScript) directly from a storage container.
- **Blob Versioning** (Azure): Maintains historical versions of blobs. Accessible via version ID. Only one version active at a time. Use lifecycle management to control costs.
- **Change Feed** (Azure): Tracks blob changes. Required for object replication and lifecycle automation.
- **Object Replication** (Azure): Async copy of blobs across containers (same region) or cross-tenant (preview). Requires versioning + change feed. Does not replicate snapshots.

## Data Migration

- **AzCopy** (Azure): CLI tool for blobs/file shares. Scripted transfers. Windows and Linux. Command-line only, no built-in scheduling. Not suited for automated monthly transfers without orchestration.
- **Azure Data Box** (Azure): Physical device shipped to Microsoft for offline transfer. Data Box Disk (~35 TB), Data Box (100 TB), Data Box Heavy (1 PB).
- **Azure Import/Export** (Azure): Service using hard drives you provide. Offline migration.
- **Storage Migration Service** (Azure): Lift-and-shift file servers online with minimal downtime.
- **Azure Data Factory** (Azure): Cloud-based data integration for pipelines, ETL, bulk movement.

## Blob Lifecycle Management

- **Lifecycle Management Policy** (Azure): Automates blob tier transitions (Hot → Cool → Cold → Archive). Rules run once per day at account level. If-Then-Delete logic. Applied to all blobs or specific containers/blobs.
