# Glossary: Security, Identity Concepts & IT Standards

## Identity & Authentication Concepts

- **Managed Identity** (Azure): Automatically managed Entra ID identity for authenticating to Azure services without credential management. Can only be used between Azure resources. Preferred for Azure-to-Azure communication. Formerly known as Managed Service Identity (MSI).
- **System-Assigned Managed Identity** (Azure): Managed Identity tied to a single Azure resource (e.g., VM, Function App). Lifecycle tied to the resource. Automatically created and deleted with the resource. Cannot be shared.
- **User-Assigned Managed Identity** (Azure): Standalone Managed Identity resource that can be assigned to multiple Azure resources. Independently managed lifecycle. Useful when multiple resources need the same identity.
- **Managed Service Identity / MSI** (Azure): Original/legacy name for Managed Identity. Retired term.
- **Service Principal** (Entra): Security identity used by applications/services to access Azure resources. You manually manage credentials (secrets/certs). Required when on-prem applications communicate to Azure resources.
- **Managed Identity vs Service Principal** (Azure/Entra): Managed Identity = Azure-managed, no credential rotation needed, Azure-to-Azure only. Service Principal = you manage credentials, needed when on-prem apps talk to Azure.
- **PAT / Personal Access Token** (IT concept): Token for authentication in DevOps tools (Azure DevOps, GitHub). Used instead of passwords for API access.
- **PII / Personally Identifiable Information** (IT compliance): Data that can identify a specific individual (name, email, phone, ID number, location). Must be protected against misuse/identity theft.

## Data Protection & Encryption

- **Azure Key Vault** (Azure): Centralized service for storing and managing secrets, encryption keys, and certificates. Provides secure storage, access auditing, and integration with Azure services. Backups are downloaded as encrypted blobs that cannot be decrypted outside Azure. Restore requires same Azure subscription and geography.
- **Key Vault Secrets** (Azure): Sensitive strings (connection strings, passwords, API keys). Retrieved at runtime without exposing in code.
- **Key Vault Keys** (Azure): Cryptographic keys for encryption/decryption. Supports customer-managed keys (CMK) for compliance.
- **Key Vault Certificates** (Azure): TLS/SSL and code signing certificates. Supports auto-rotation.
- **Key Vault Access Policy** (Azure): Controls access to Key Vault secrets, keys, and certificates. Grants permissions to applications, users, or services to retrieve secrets during deployment via Resource Manager templates.
- **Key Vault Soft Delete** (Azure): Protects Key Vault and its contents from accidental deletion. Retention period before permanent deletion.
- **Key Vault Purge Protection** (Azure): Prevents permanent deletion of Key Vault, keys, secrets, and certificates by malicious insiders. Works as a recycle bin.
- **TDE / Transparent Data Encryption** (Azure / SQL Server feature): Encrypts data at rest in databases (Azure SQL DB, SQL MI). Uses AES-256. Transparent to applications. Can use customer-managed keys from Key Vault.
- **Dynamic Data Masking** (Azure): Masks sensitive data in query results for non-admin users. 
- **Data Discovery & Classification** (Azure): Azure SQL built-in feature that scans databases, identifies sensitive data (PII, financial, healthcare), recommends labels (Confidential, Restricted), and helps manage protection.
- **Always Encrypted** (Azure / SQL Server feature): Client-side encryption where database admins cannot see plaintext data. Column-level encryption. Keys stored in Key Vault or Windows Certificate Store.

## Security Services

- **Microsoft Entra ID Protection** (Entra): Identity security service detecting potential vulnerabilities and risky behaviors. Features: risk-based Conditional Access, identity protection reports, automated remediation. Monitors for untrusted IPs, impossible travel, leaked credentials. Formerly Azure AD Identity Protection.
- **Identity Protection** (Entra): See Microsoft Entra ID Protection. Microsoft's identity security service for detecting risky sign-ins, leaked credentials, and anomalous behavior.
- **Microsoft Defender for Cloud** (Azure): Unified security management and threat protection for Azure, on-premises, and multi-cloud workloads. Includes advanced threat protection for SQL, storage, containers, etc.
- **Microsoft Defender for Endpoint** (Azure): Security solution protecting endpoints from cyber threats.
- **Azure Resource Mover** (Azure): Service for migrating Azure resources (VMs, networks, databases) across regions, subscriptions, or resource groups with minimal downtime.
- **Azure Advisor** (Azure): Service providing recommendations for optimizing Azure resources based on best practices (cost, security, reliability, operational excellence, performance).
- **Azure Lighthouse** (Azure): Multi-tenant administration tool for MSPs. Lets you manage customers' Azure resources (VMs, subscriptions, policies) from your own tenant via delegated access — single control plane across tenants. Used for cross-tenant monitoring, governance, and automation. NOT a data governance tool — that is Purview.
- **Azure Purview / Microsoft Purview** (Azure): Data governance service for discovering, classifying, and managing data across the organization. Scans and catalogs data assets (SQL, Blob, files, Cosmos DB) across on-prem, Azure, and other clouds. NOT a multi-tenant management tool — that is Lighthouse.
- **Azure Notification Hubs** (Azure): Service for sending push notifications to millions of mobile devices across platforms (iOS, Android, Windows).
- **Azure Network Function Manager** (Azure): Service that deploys and manages telecom network functions (VNFs/CNFs) helping operators automate network services.

## Networking & Standards

- **VNF / Virtual Network Function** (IT concept): Virtualized network function (firewall, router, load balancer) running as a VM.
- **CNF / Containerized Network Function** (IT concept): Network function running as a containerized microservice.
- **BGP / Border Gateway Protocol** (IT standard / routing protocol): Routing protocol that enables autonomous systems (networks) to exchange routing information and select optimal paths. Used in Azure for ExpressRoute, route-based VPN, and Azure Route Server.
- **POSIX / Portable Operating System Interface** (IT standard): Set of IEEE standards defining how operating systems handle files, processes, and APIs to ensure compatibility across Unix-like systems.

## Database Concepts

- **ACID** (IT standard / database): Set of properties for reliable database transactions. Atomicity (all-or-nothing), Consistency (valid state maintained), Isolation (concurrent transactions don't interfere), Durability (committed data persists).
- **Database Sharding** (IT concept): Horizontal partitioning strategy splitting identically structured data across multiple databases using a Shard Key. Enables scale-out for Azure SQL DB.
- **BASE / Basically Available, Soft state, Eventual consistency** (IT concept): Consistency model used by NoSQL databases. Prioritizes availability over strong consistency.
- **OAuth2** (IT standard): Authorization framework allowing third-party applications to obtain limited access to an HTTP service. Important for securing API access.
- **Rate Limiting** (Azure / APIM feature): Restricts number of requests a client can make within a specified timeframe. Helps prevent DDoS attacks on APIs.

## Cloud Migration & Frameworks

- **Cloud Adoption Framework / CAF** (Microsoft): Microsoft's structured approach for cloud adoption. Phase-based methodology: Assess (evaluate on-premises environment, workloads, apps, data), Deploy (execute migration, test resources, transition to cloud), Release (finalize, verify, transition to production).
- **Assess Phase** (Microsoft / CAF): Evaluate current on-premises environment, workloads, applications, data. Identify dependencies, risks, and requirements.
- **Deploy Phase** (Microsoft / CAF): Deploy migrated workloads, applications, data. Execute migration plan, test migrated resources.
- **Release Phase** (Microsoft / CAF): Finalize migration, verify functionality, officially transition to production.

## Disaster Recovery Patterns

- **Pilot Light** (IT / DR pattern): DR strategy where minimal core services run in secondary environment with rest of infrastructure offline. Balances cost and recovery speed.
- **Failover Time** (IT concept): Duration of the switching process during failover from primary to secondary.
- **Recovery Time** (IT concept): Total time until system is fully operational after a failure (related to RTO).
- **RPO / Recovery Point Objective** (IT concept): Maximum acceptable data loss measured in time.
- **RTO / Recovery Time Objective** (IT concept): Maximum acceptable downtime after a failure.
