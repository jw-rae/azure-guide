# Glossary: Compute, Containers & Serverless

## Virtual Machines

- **Virtual Machine / VM** (Azure): IaaS compute solution. Hypervised via Azure Cloud. Properties: name, region, SKU, image, size SKU, networking, storage size. vNIC defines IP address.
- **VM Size Variants** (Azure): D (temporary disk), S (premium storage), F (compute optimized), E (memory optimized), B (remote storage/burstable).
- **VM Families** (Azure): General Purpose (Dsv3/Dsv4 - balanced), Compute Optimized (Fsv2 - high CPU), Memory Optimized (Ev3/Ev4 - high memory), Storage Optimized (Lsv2 - high disk throughput), GPU (NV/NC - graphics/ML), Burstable (B-series - low baseline + bursts).
- **vNIC / Virtual Network Interface Card** (Azure): Defines IP address for a VM. Connects VM to a VNet subnet.
- **Azure Migrate** (Azure): Service for moving on-premises VMs to Azure. Part of migration toolkit.

## VM Disks & Storage

- **VHD / Virtual Hard Disk** (Azure): File-based representation of a hard disk. Built atop page blobs. Types: OS Disk (OS storage), Temp Disk (non-persistent), Data Disk (persistent storage).
- **Managed Disk** (Azure): Azure handles storage account and page blob. Default and recommended. Types: Standard HDD, Standard SSD, Premium SSD/SSDv2, Ultra Disk.
- **Unmanaged Disk** (Azure): You manage the storage account (legacy/classic).
- **Ultra Disk** (Azure): Ultra-high performance for demanding workloads. Sub-1ms latency, up to 160K IOPS.
- **Storage Service Encryption / SSE** (Azure): Encrypts data at rest at Azure storage level. Managed by Azure. Transparent to users. Uses AES-256. Cannot be disabled.
- **Azure Disk Encryption / ADE** (Azure): Encrypts OS and data disks inside VM using BitLocker (Windows) or dm-crypt (Linux). Requires Azure Key Vault.
- **Customer-Managed Key / CMK** (Azure): Encryption keys stored in Azure Key Vault. Used for compliance (HIPAA, etc.).
- **Disk Encryption Set / DES** (Azure): Applies CMK to multiple disks for enterprise environments.

## VM Availability & Scaling

- **Scalability** (IT concept): System's ability to handle increased workload by adding resources. Horizontal (more instances) or vertical (upgrade existing). Typically planned/manual.
- **Elasticity** (IT concept): System's ability to automatically adjust resources based on demand. Scales in/out dynamically. Key for cost efficiency.
- **Virtual Machine Scale Set / VMSS** (Azure): Deploy and manage identical VMs. Requires a load balancer. Supports scale out/in, horizontal/vertical scaling. Orchestration modes: Uniform (identical instances) and Flexible (high availability, mixed VM types, spot instances).
- **Predictive Autoscaling** (Azure): Uses forecasts to anticipate demand. Scales proactively to improve performance and cost efficiency.
- **Scale Out** (IT concept): Adds VM instances to handle increased demand.
- **Scale In** (IT concept): Removes VM instances when demand decreases.
- **Vertical Scaling** (IT concept): Changes VM SKU. Includes downtime.
- **Horizontal Scaling** (IT concept): Adds more VM instances (no downtime).

## App Service

- **Azure App Service** (Azure): Fully managed PaaS for building websites, mobile backends, APIs. Windows and Linux support. Provides built-in load balancing, custom domains, and managed TLS for both Azure FQDNs and custom domains.
- **App Service Plan** (Azure): Defines pricing tier, VM size, number of VMs, region. Tiers: Free/Shared (testing), Basic (low traffic, 3 instances), Standard (production, 10 instances, auto-scale), Premium (30 instances, SSD, VNet), PremiumV2/V3 (faster CPUs, zone redundancy), Isolated/IsolatedV2 (dedicated VMs, 100 instances, private network).
- **Compute Models** (Azure): Shared Compute (Free/Shared - multi-tenant, no scaling), Dedicated Compute (Basic through PremiumV3 - multi-tenant with auto-scaling), Isolated (ASE - single-tenant, max scaling, network isolation).
- **Deployment Slot** (Azure): Separate environment for validation before swapping to production. Available in Standard+ tiers. Supports auto-swap, warm-up, and slot-specific settings.
- **Auto Swap** (Azure): Automatically swaps deployment slot to production after code changes. Zero cold starts or downtime.
- **VNet Integration** (Azure): Outbound connectivity for App Service to access resources in a VNet.
- **Private Endpoint** (Azure): Inbound connectivity exposing App Service via private IP inside a VNet.

## Azure App Configuration

- **Azure App Configuration** (Azure): Centrally stores and dynamically retrieves configuration values (connection strings, feature flags, settings). Labels for environment separation. Use for non-sensitive settings (feature flags, API endpoints). For secrets, use Key Vault.
- **Web.config** (IT concept): Local configuration file for ASP.NET apps. Stores settings like connection strings directly in each app.

## Containers

- **Container** (IT concept): Unit of software. Code + dependencies + configuration shipped to run anywhere. Process-level isolation, seconds startup, low overhead, high portability.
- **Dockerfile** (IT concept): Defines container image (base OS, dependencies, config).
- **Container Image** (IT concept): Immutable, portable artifact built from Dockerfile.
- **Container Registry** (IT concept): Stores images. Azure Container Registry (ACR) is the managed Docker registry on Azure.
- **Azure Container Registry / ACR** (Azure): Managed Docker registry on Azure. Globally unique name, location, pricing plan. Build, push, test-run images. SKUs: Basic (limited features), Standard (basic registry), Premium (geo-replication for automatic image replication across regions, advanced features).

## Container Services

- **Azure Container Instances / ACI** (Azure): Serverless containers. No VM management. Fast startup (<10s). Pay-per-second. Multi-container groups with shared lifecycle/networking. Use: dev/test, burst workloads, CI/CD. Lacks built-in load balancing and managed TLS.
- **Azure Kubernetes Service / AKS** (Azure): Managed Kubernetes platform. Azure manages control plane (API server, etcd, scheduler). You manage worker nodes and workloads. Supports Availability Zones, auto-scaling, KEDA, Virtual Nodes. Requires additional configuration for TLS management compared to App Service.
- **Azure Container Apps / ACA** (Azure): Serverless microservices. Runs in isolated Container App Environment. Auto-scales based on HTTP/events (scale to zero). Built-in service discovery. Dapr integration for microservice patterns. Lacks built-in load balancing and managed TLS compared to App Service.
- **Container Group** (Azure): Logical grouping of containers sharing lifecycle, resources, local networking, storage (in ACI).
- **Dapr / Distributed Application Runtime** (IT concept): Simplifies microservice patterns (pub/sub, secrets, service discovery) in ACA.
- **KEDA / Kubernetes Event-Driven Autoscaling** (IT concept): Event-driven scaling for AKS. Triggers from Azure Queue, Kafka, etc.
- **Virtual Nodes** (Azure): Burst AKS workloads to ACI for short-term spikes.

## Azure CycleCloud

- **Azure CycleCloud** (Azure): Tool for orchestrating and managing high-performance computing (HPC) environments on Azure. Provides a UI and CLI to create, manage, and scale HPC clusters with job schedulers like Slurm, PBS Pro, and Grid Engine.

## AKS Details

- **AKS Control Plane** (Azure): Managed by Azure. Includes API server, etcd (key-value store), scheduler, controllers.
- **Node Pool** (Azure): Group of VMs running containers in AKS.
- **Pod** (IT concept / Kubernetes): Smallest deployable unit in Kubernetes. One or more containers.
- **Kubenet** (Azure): Basic NAT-based networking for AKS. Simple clusters.
- **Azure CNI / Container Networking Interface** (Azure): Pods get VNet IPs from a different address space than node pool's subnet. Better performance. Enterprise networks. Enables NAT for security.
- **Cluster Autoscaler** (Azure): Adds/removes nodes in AKS based on CPU/memory demand.
- **Horizontal Pod Autoscaler / HPA** (Kubernetes): Scales pods based on CPU/memory metrics.
- **Velero** (IT concept / open source): Backup tool for AKS cluster state.

## Serverless Compute

- **Serverless** (IT concept): No infrastructure management. Event-driven, auto-scaling, pay-per-use, short-lived execution (<10 min).
- **Azure Functions** (Azure): Event-driven serverless compute. Supports triggers (HTTP, Blob, Queue, Timer, Cosmos DB, Event Grid) and bindings (declarative connections). Hosting plans: Consumption (auto-scale, pay-per-invocation), Premium (pre-warmed instances, VNet), Dedicated (fixed VM). Well-suited for short-lived processes and responding to database changes.
- **Durable Functions** (Azure): Stateful workflows in Azure Functions. Orchestrator (manages state) + Activity (reusable sub-tasks).
- **Cold Start** (IT concept): Latency when a serverless function starts after being idle. Mitigated by Premium Plan with pre-warmed instances.
- **Azure Logic Apps** (Azure): Low-code workflow automation. Visual designer with 400+ connectors. Triggers and actions. Stateful workflows. Enterprise integration (B2B/EDI, SAP). Use for orchestrating multiple services.
- **Azure Functions vs Logic Apps** (Azure): Functions = custom code execution; Logic Apps = workflow automation (visual). Functions: millisecond latency; Logic Apps: higher latency (orchestration).
- **WebJobs** (Azure): Background tasks that can run on-demand or on a schedule within App Service. Can handle scheduled tasks but less suited for short-lived processes or responding to database changes compared to Azure Functions.

## Azure Batch

- **Azure Batch** (Azure): Large-scale parallel job processing. Tasks run independently across auto-scaled VMs. Use cases: HPC, media rendering, ETL. Pay-as-you-go. Not for real-time or non-parallelizable tasks.
- **Azure Batch Job** (Azure): Definition of work to be done (e.g., "Render 100 frames"). Splits into tasks.
- **Azure Batch Task** (Azure): Individual unit of work in a Batch job.
- **Azure Batch Pool** (Azure): Auto-scaled VMs executing Batch tasks. Supports low-priority, Spot, and dedicated VMs.

## Messaging & Eventing

- **Azure Queue Storage** (Azure): Simple message queue for decoupled tasks. Scalable (millions of messages, 64KB each). Cost-effective. Fire-and-forget.
- **Azure Service Bus Queue** (Azure): Enterprise message queue. Supports transactions, FIFO, deferred messages, sessions. Reliable point-to-point communication.
- **Azure Service Bus Topic** (Azure): Pub/sub messaging. Supports filters and durable subscriptions. Broadcast to multiple subscribers.
- **Azure Event Hubs** (Azure): High-throughput event streaming (millions/sec). Partitioning, Kafka support. For telemetry/ingestion. Supports Capture for cold path processing.
- **Azure Event Grid** (Azure): Fully managed event routing. Serverless. Reacts to Azure events (60+ sources). Filtering. Triggers Functions/Logic Apps. Can detect changes in Azure resource settings (e.g., VM configuration changes) to trigger workflows for administrator notification.
- **Azure IoT Hub** (Azure): IoT device management. Bi-directional communication, device provisioning, security.
- **Azure Stream Analytics** (Azure): Real-time event processing with SQL-like queries. Anomaly detection. Integrates with Event Hubs, IoT Hub, Power BI.

## API & Caching

- **Azure API Management / APIM** (Azure): API Gateway for centralized traffic, security (OAuth, JWT, rate limiting), developer portal, monetization, analytics.
- **Azure Redis Cache** (Azure): In-memory cache for sub-millisecond data access. Supports strings, lists, sets, hashes. Patterns: cache-aside, write-through. Eviction: LRU, TTL. Use for session storage, real-time analytics, gaming leaderboards.

## CI/CD & IaC

- **Infrastructure as Code / IaC** (IT concept): Managing infrastructure through machine-readable definition files. Tools: ARM Templates, Bicep, Terraform, Pulumi.
- **ARM Template** (Azure): JSON-based IaC for Azure-native deployments. Sections: schema, contentVersion, parameters, functions, variables, resources, outputs.
- **Bicep** (Azure): DSL abstraction over ARM templates. Cleaner, modular, Azure-native. Preferred for AZ-305.
- **Terraform** (IT concept / HashiCorp): Multi-cloud IaC tool with state management. Use for hybrid/multi-cloud scenarios.
- **Pulumi** (IT concept): IaC with real code (Python, C#, etc.). Familiar syntax, multi-language.
- **Azure DevOps** (Azure / Microsoft): Enterprise CI/CD with boards, repos, pipelines, test plans, artifacts. Use YAML pipelines for reproducibility.
- **GitHub Actions** (IT concept / GitHub): Lightweight, Git-native CI/CD. Simple community workflows. Use for open-source/small teams.
- **Azure Boards** (Azure): Project management tool in Azure DevOps. Tracks work items (tasks, bugs, features) using Agile methods.
- **Azure Automation** (Azure): Service for automating frequent, time-consuming, and error-prone management tasks using runbooks.

## Secure Secrets Management

- **Azure Key Vault** (Azure): Centralized management for secrets, keys, and certificates. Supports audit logging, network security (Private Endpoints, firewall), managed identity access, auto-rotation of certificates.
- **Key Vault Secrets** (Azure): Sensitive data (passwords, connection strings, API keys). Reference via `@Microsoft.KeyVault(SecretUri=...)`.
- **Key Vault Keys** (Azure): Encryption keys for storage, databases. Supports customer-managed keys (CMK) for compliance.
- **Key Vault Certificates** (Azure): TLS/SSL certificates, code signing. Supports auto-rotation.
- **Azure Key Vault CSI Driver** (Azure): Injects secrets from Key Vault into AKS pods as Kubernetes secrets.
