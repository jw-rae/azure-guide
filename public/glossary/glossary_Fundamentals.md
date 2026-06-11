# Glossary: Azure Fundamentals & Governance

## Resource Hierarchy

- **Resource** (Azure concept): The smallest unit managed by Azure. Provides functionality for compute, networking, storage, etc.
- **Resource Group** (Azure): Logical container for resources grouped by lifecycle, workload, security, or environment. Belongs to one subscription. Supports RBAC, policies, and budgets. Free, regionless, borderless. Cannot be nested. Each resource belongs to exactly one resource group.
- **Subscription** (Azure): Billing unit for managing Azure cloud costs. Contains resource groups and resources. Interacts with ARM via REST API. Governed by an Entra ID tenant. Each subscription belongs to one tenant.
- **Management Group** (Azure): Organizes multiple subscriptions within a tenant. Top-level root group. Can be nested up to 6 levels deep. Policies and RBAC settings are inherited. Supports centralized permission management.
- **Tenant / Entra ID Tenant** (Entra): Also called Organization or Directory. Instance of Microsoft Entra ID. Identity container for users, groups, apps. Exists outside subscriptions/resources. Subscriptions trust tenants. Default domain is `something.onmicrosoft.com`.

## Cloud Infrastructure

- **Azure Cloud Environment** (Azure): Isolated cloud instance. Examples: AzureCloud (Public), AzureUSGovernment, AzureChinaCloud.
- **Azure Geography** (Azure): Contains multiple regions. Supports data residency and compliance requirements. Example: Europe.
- **Azure Region** (Azure): Specific geographic location containing one or more datacenters. Examples: West Europe, East US.
- **Region Pair** (Azure): Two regions within a geography. Provides wide resiliency, disaster recovery, and sequential updates. Example: West Europe + North Europe.
- **Availability Zone** (Azure): Separate datacenter within a region. Supports high availability and fault isolation. Isolates power, cooling, and networking. Requires a load balancer (Azure Load Balancer or Application Gateway).
- **Availability Set** (Azure): Separate fault domains and update domains within a single datacenter. Isolates power and network failures.
- **Fault Domain** (Azure): Logical grouping of resources inside availability sets that share a common power source and network switch.
- **Update Domain** (Azure): Logical grouping of resources updated or rebooted together during planned maintenance.
- **Datacenter** (IT infrastructure): Physical facility housing Azure compute and storage infrastructure. Regions contain one or more datacenters.

## ARM & Deployment

- **Azure Resource Manager / ARM** (Azure): Orchestration layer for Azure. Works with REST API endpoints. Can be triggered via Azure Portal, Azure CLI, or Azure PowerShell. Interacts with Azure Resource Providers to complete API requests.
- **Azure Resource Provider / ARP** (Azure): Service that completes ARM API requests. Examples: Microsoft.Compute, Microsoft.Network, Microsoft.Storage.
- **Azure Portal** (Azure): Web-based UI at portal.azure.com. Includes Home, Recents, Favorites, Dashboards.
- **Cloud Shell** (Azure): Browser-based shell at shell.azure.com. Supports Bash and PowerShell. Requires cloud storage to persist files.
- **Azure CLI** (Azure): Bash command-line tool for managing Azure resources. Can be used locally or via Cloud Shell.
- **Azure PowerShell** (Azure): PowerShell equivalent using cmdlets (object-oriented). Manages Azure resources.
- **ARM Template** (Azure): JSON-based Infrastructure as Code (IaC) backbone. Deploys resources quickly and repeatedly. Sections: `$schema`, `contentVersion`, `parameters`, `functions`, `variables`, `resources`, `outputs`.
- **Azure Bicep** (Azure): Domain-specific language (DSL) abstraction over ARM templates. Simpler and cleaner syntax. Native Azure IaC. Can define and deploy management groups, subscriptions, and resource groups in a structured, repeatable manner.
- **Azure Blueprint** (Azure): Defines, packages, and deploys a set of Azure resources and governance rules (policies, RBAC, ARM templates, resource groups) as a single reusable template. Creates persistent links. RBAC role or subscription level. Owner cannot override ReadOnly or resource locking blueprint settings.

## Cost Management

- **Azure Pricing Calculator** (Azure): Estimates deployment costs at azure.microsoft.com/en-us/pricing/calculator. Supports download and sharing.
- **Azure TCO Calculator** (Azure): Estimates migration costs from on-premises to Azure at azure.microsoft.com/en-us/pricing/tco/calculator.
- **Azure Cost Management and Billing** (Azure): Shows consumption-based costs, forecasted spending, and cost by resource. Includes Smart Views for anomaly detection and Cost Analysis for budgets and alerts.
- **Azure Hybrid Benefit** (Azure): Allows reuse of existing on-premises licenses (e.g., SQL Server, Windows Server) in Azure to reduce costs.
- **Azure Reservation** (Azure): Pre-purchase compute capacity for 1- or 3-year terms for significant discounts.
- **Azure Savings Plan** (Azure): Flexible savings model covering compute usage across SKUs and services. 1- to 3-year terms.
- **Budget** (Azure): Spending limit set in Microsoft Cost Management. Can be set at resource or resource group level. Supports notifications.
- **Resource Tag** (Azure): Key-value pair applied at subscription, resource group, or resource level. Not inherited. Used for categorization, metadata, cost tracking, and automation.
- **Resource Lock** (Azure): Resource locking at subscription, resource group, or resource level. Types: Read-Only and Delete. Applies to control plane (not data plane). Prevents accidental modification or deletion.
- **SLA / Service Level Agreement** (IT concept / Azure): Uptime and performance guarantees. Multiply the decimal form of all component SLAs to get the overall application SLA.

## Policy & Compliance

- **Azure Policy** (Azure): Guardrail/compliance enforcement tool. Enforces rules and regulations on Azure resources for compliance. Definitions can be built-in or custom. Assigned at management group, subscription, resource group, or resource level. Re-evaluated every 24 hours. Effects: Audit, Deny, Modify, Append.
- **Policy Initiative** (Azure): Collection of policies bundled for easier assignment. Can include built-in standards.
- **Azure Activity Log** (Azure): Tracks Azure Resource Manager resource deployments. Provides comprehensive view of subscription-level events (creations, updates, deletions).
- **Azure Advisor** (Azure): Provides recommendations for cost, security, reliability, operational excellence, and performance. Can send weekly digests. Validates configurations against best practices but is not an enforcement tool.
