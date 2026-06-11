# Glossary: Identity & Governance

## Microsoft Entra ID

- **Microsoft Entra ID** (Entra): Cloud-based Identity and Access Management (IAM) service. Formerly Azure Active Directory. Global service with per-geography tenant instances. Uses SAML, WS-Fed, OAuth, OIDC, REST API. Does NOT have OUs or GPOs (unlike AD DS).
- **Entra ID Tenant** (Entra): Instance of Microsoft Entra ID. Also called Organization or Directory. Identity container with users, groups, apps. Default domain: `something.onmicrosoft.com`. Supports custom domains, MFA, named locations, Conditional Access, SSPR, Entra Connect, external identities.
- **AD DS / Active Directory Domain Services** (Microsoft): On-premises directory service. Uses Kerberos, NTLM, LDAP protocols. Has hierarchical OUs and GPOs. Forest = collection of domains sharing schema, configuration, trust.
- **Entra ID License Tiers** (Entra): Free (SSO, SSPR, MFA); P1 (Conditional Access, App Provisioning, Hybrid Identity); P2 (Risk-Based CA, PIM, Access Reviews); Governance add-on (Lifecycle workflows, advanced access reviews, entitlement management).
- **Microsoft Entra Connect** (Entra): On-premises Microsoft application for hybrid identity. Syncs on-prem AD DS with Azure AD. Connection flow is always on-prem to cloud. Two modes: Entra Connect Sync (full control, engine on-prem) and Entra Connect Cloud Sync (simpler, engine in cloud with lightweight on-prem agents).
- **SSPR / Self-Service Password Reset** (Entra): Allows users to reset passwords without help desk. Requires P1/P2 or M365 license. Supports multiple auth methods. Password writeback syncs cloud changes to on-prem AD.

## Identity Management

- **User Account** (Entra): Lives within a tenant. Types: Cloud accounts, hybrid accounts (synced from on-prem), guest accounts (B2B from other tenants/orgs). Members have default permissions.
- **Group** (Entra): Security or Microsoft 365 group type. Simplifies role configuration, app access, permissions, license assignments. Membership types: Assigned (manual), Dynamic User (rules based on attributes), Dynamic Device (rules based on device type).
- **Guest Account / B2B Collaboration** (Entra): External user invited to access resources. Invited via email. Configurable via Entra ID.
- **B2C / Business-to-Consumer** (Entra): Entra ID feature for customer identity and access management.
- **Service Principal** (Entra): Security identity used by applications/services to access Azure resources. You manage credentials (secrets/certs). Required when on-prem apps communicate with Azure resources. Created via app registration.
- **Managed Identity** (Azure): Automatically managed identity in Entra ID for authenticating to Azure services. No credential management needed. Preferred over Service Principal for Azure-to-Azure communication. Formerly known as Managed Service Identity (MSI).
- **System-Assigned Managed Identity** (Azure): Managed Identity tied to a single Azure resource (e.g., a VM, Function App). Lifecycle tied to the resource. Automatically created and deleted with the resource. Cannot be shared across resources.
- **User-Assigned Managed Identity** (Azure): Standalone Managed Identity resource that can be assigned to multiple Azure resources. Independently managed lifecycle. Useful when multiple resources need the same identity.
- **Managed Service Identity / MSI** (Azure): Original name for what is now called Managed Identity. Retired term. Primarily authenticates services/apps, not designed for managing user identities within departments.
- **PAT / Personal Access Token** (IT concept): Token used in DevOps tools like Azure DevOps for authentication instead of passwords.
- **Microsoft Entra Application Registration** (Entra): Creates an identity for an app in Entra ID for authentication and permissions. Establishes trust relationship between app and Entra ID for seamless authentication without prompting credentials.
- **Microsoft Entra Enterprise Application** (Entra): A service principal + application registration that represents a pre-integrated SaaS app (e.g., Salesforce, ServiceNow) in the tenant. Used for SSO, provisioning, and access management. Managed via Enterprise Applications blade in Entra ID. Most suitable for pre-authenticating users via their Entra ID accounts before accessing the application.
- **Microsoft Entra Application Proxy** (Entra): Publishes on-premises apps securely online for remote access without VPN.
- **Microsoft Entra Access Review** (Entra): Feature to regularly check and manage who has access to applications. Essential for periodically reviewing and validating high-level access to ensure least-privilege and JIT principles.

## Access Control (RBAC)

- **RBAC / Role-Based Access Control** (Azure): Authorization system for Azure resources. Components: Assignee (user/group/workload), Role (permissions), Scope (where). Follows: Implicit Deny > Explicit Allow > Explicit Deny.
- **Security Principal** (Azure): Who - can be a human (user/group) or workload (service principal/managed identity).
- **Role Definition** (Azure): What - actions, not actions, data actions, data not actions, assignable scopes.
- **Scope** (Azure): Where - management group, subscription, resource group, or individual resource.
- **Built-in Roles** (Azure): Owner (full access), Contributor (create/manage), Reader (read-only), User Access Administrator (manage access). Also resource-specific roles like Storage Blob Data Owner.
- **Custom Role** (Azure): Used when built-in roles don't fit. Define your own actions and scope.
- **Control Plane vs Data Plane** (Azure): Control plane manages resources (ARM). Data plane accesses data within resources.
- **Implicit Deny** (IT concept): Default state - no access unless explicitly granted. Explicit Allow overrides Implicit Deny. Explicit Deny overrides all.

## Privileged Access

- **Entra ID Conditional Access** (Entra): Premium Entra ID feature (P1/P2). Enforced after first-factor authentication. Policies can require MFA, block locations, require compliant devices.
- **Privileged Identity Management / PIM** (Entra): Provides just-in-time (JIT) access to Entra ID roles and Azure RBAC roles. Features: time-bound assignments, admin approval, MFA activation, audit logs. Enforces least privilege by granting elevated access only when needed for limited time.
- **Entra ID Roles** (Entra): Apply to identity objects. Examples: Global Administrator, Billing Administrator, User Administrator, Helpdesk Administrator.
- **Entra ID Protection** (Entra): Detects potential vulnerabilities, provides risk-based conditional access, automated remediation. Monitors untrusted IPs and impossible travel. Formerly Azure AD Identity Protection. Comprehensive endpoint threat detection and remediation with automated response.
- **Identity Protection** (Entra): See Entra ID Protection. Microsoft's identity security service for detecting risky sign-ins, leaked credentials, and anomalous behavior. Focuses on safeguarding user identities and detecting potential threats/vulnerabilities.
- **Named Location** (Entra): Defined IP ranges in Entra ID for Conditional Access policies.

## Azure Governance

- **Azure Policy** (Azure): Enforcement tool for governance at scale. Built-in and custom policy definitions. Effects: Audit (warnings), Deny (blocks), Modify (auto-corrects). Assigned at management group, subscription, or resource group.
- **Policy Initiative** (Azure): Bundle of multiple policies for easier assignment supporting compliance standards (GDPR, PCI DSS, HITRUST, SOC, FedRAMP). Pre-built initiatives available for common standards.
- **Compliance Portal** (Azure): Shows compliance score after policy assignment. Wait ~24 hours for full evaluation.
- **Azure Blueprint** (Azure): Predefined set of Azure resources and governance rules deployed as a single reusable template.

## Compliance Standards

- **HITRUST** (IT compliance): Industry standard for handling patient information (US healthcare).
- **PCI DSS** (IT compliance): Standard for securing financial/cardholder data.
- **SOC / System and Organization Controls** (IT compliance): Ensures security, disaster recovery, and availability best practices.
- **GDPR / General Data Protection Regulation** (IT compliance): EU regulation protecting personal data of EU citizens. Requires data residency within EU.
- **FedRAMP** (IT compliance): US government standard for security and monitoring of cloud services.

## Well-Architected Framework

- **Microsoft Well-Architected Framework** (Microsoft): Five pillars: Reliability (accessibility), Security (protection), Cost Optimization (efficiency), Operational Excellence (best practices), Performance Efficiency.

## Azure Arc

- **Azure Arc** (Azure): Extends Azure management to resources outside Azure (on-premises, other clouds). Enables management (policies, monitoring, security, updates) as if in Azure. Requires Azure agent installed on machine/cluster.
