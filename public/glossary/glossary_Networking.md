# Glossary: Networking & Content Delivery

## Virtual Networks

- **Virtual Network / VNet** (Azure): Isolated private network space within a region and subscription. Uses IPv4 CIDR ranges (IPv6 optional). Cannot combine overlapping IP ranges. Five IPs reserved per subnet: .0 (network), .1 (gateway), .2/.3 (DNS), .255 (broadcast).
- **Subnet** (Azure): Segment of a VNet. Uses CIDR notation. Reserve five IPs per subnet. Some services require dedicated subnets (e.g., VPN Gateway).
- **CIDR / Classless Inter-Domain Routing** (IT standard): Notation for IP addressing and routing (e.g., 10.0.0.0/24). Allows flexible subnet sizing.
- **NIC / Network Interface Card** (IT concept): Connects a VM to a VNet subnet. Receives private (dynamic or static) IP address.
- **vNIC / Virtual NIC** (Azure): Virtualized NIC for VMs. Defines IP address and network connectivity.
- **RFC 1918** (IT standard): Standard defining private IP address ranges (10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16).
- **VNet Peering** (Azure): Connects VNets for private communication across regions and subscriptions. One-to-one and non-transitive by default. Not encrypted by default. Use UDRs for transitive routing.
- **Hub-and-Spoke** (IT concept / network topology): Network topology where a central hub VNet peers with multiple spoke VNets. Hub typically hosts shared services (firewall, gateway).

## Hybrid Connectivity

- **S2S VPN / Site-to-Site VPN** (Azure): Connects on-premises network to Azure VNet over the internet. Encrypted. Two types: Policy-based (1 tunnel, not recommended) and Route-based (N tunnels, supports P2S). Can be used as backup for ExpressRoute. Tunnels on-premises traffic using public internet as backbone.
- **P2S VPN / Point-to-Site VPN** (Azure): Individual client-to-Azure VPN connection. Useful for remote users. Supports SSTP, OpenVPN, IKEv2.
- **Route-Based VPN** (Azure): Dynamic routing using BGP. Supports multiple tunnels and P2S. Recommended over Policy-based.
- **Policy-Based VPN** (Azure): Static routing with one tunnel. Legacy approach.
- **Azure ExpressRoute** (Azure): Dedicated private connection from on-premises to Azure over Microsoft backbone. Higher bandwidth, lower latency, more reliable than VPN. No data travels over public internet. Supports Private Peering (VNet access) and Microsoft Peering (PaaS services).
- **ExpressRoute Gateway** (Azure): Gateway for ExpressRoute connections. Enables Private Peering.
- **ExpressRoute Global Reach** (Azure): Connects on-premises sites via ExpressRoute across Azure backbone (no VPN/leased lines).
- **ExpressRoute FastPath** (Azure): Low-latency path for storage/HPC that bypasses the gateway.
- **ExpressRoute Premium** (Azure): Allows connectivity beyond geopolitical boundaries.
- **Azure Virtual WAN** (Azure): Centralized networking service connecting branch offices, remote users (VPN), ExpressRoute circuits, and VNets through a single global hub. Standard tier supports ExpressRoute, P2S, S2S, inter-hub, NVA in VWAN.
- **BGP / Border Gateway Protocol** (IT standard / routing protocol): Dynamic routing protocol that allows networks to share routing information and choose the best path for traffic. Used in hybrid connections (ExpressRoute, route-based VPN) and Azure Route Server.

## IP Addressing

- **Public IP Address** (Azure): Internet-facing IP. Basic SKU (dynamic/static, open by default, not zone redundant). Standard SKU (static only, secure by default, zone redundant).
- **Private IP Address** (Azure): Within VNet/on-premises via VPN/ExpressRoute. Dynamic (next available) or Static (manually assigned).
- **Dynamic IP** (IT concept): Assigned at first resource start. Changes if VM is deallocated. Remains if rebooted.
- **Static IP** (IT concept): Assigned at creation. Retained until deleted. Can be changed if not attached to resource.
- **FQDN / Fully Qualified Domain Name** (IT concept): Complete domain name for a resource (e.g., myvm.eastus.cloudapp.azure.com).

## Network Security

- **Network Security Group / NSG** (Azure): Stateful firewall filtering traffic at subnet or NIC level. Rules have priority, name, port, protocol, source, destination, action (Allow/Deny). Default: inbound denied (except VNet/LB), outbound allowed.
- **Application Security Group / ASG** (Azure): Groups VMs by application role (e.g., web, db) for granular NSG rules. Associated with NICs (not subnets). Avoids IP management.
- **Azure Firewall** (Azure): Fully managed stateful firewall with IDPS, URL filtering, FQDN rules. Centralized outbound filtering (Layer 7). vs NVAs: managed vs customizable. Protects Azure Virtual Network resources.
- **Azure Web Application Firewall / WAF** (Azure): Feature that protects web apps from OWASP Top 10 (SQLi, XSS). Integrates with Application Gateway, Front Door, CDN.
- **Azure DDoS Protection** (Azure): Always-on monitoring for volumetric attacks. Basic (free) vs Standard (mitigation, analytics, adaptive tuning).
- **Service Firewall** (Azure): Controls access to public endpoints of Azure services (e.g., Storage Accounts).
- **Service Endpoint** (Azure): Restricts Azure PaaS service access to specific subnets. Traffic transits Microsoft backbone privately. Subnet-level access. Use for multi-resource access. Allows securing Azure service resources to a virtual network.
- **Private Endpoint** (Azure): Provides private IP access to a specific Azure resource from anywhere. Creates NIC inside VNet. Resource-level isolation. Higher isolation than Service Endpoints.
- **Private Link** (Azure): Underlying technology powering Private Endpoints. Provides secure, private connectivity to Azure PaaS and partner services. Not related to load balancing via Azure Front Door or restricting traffic from Front Door.
- **NVA / Network Virtual Appliance** (Azure): Virtual machine providing network functions (firewall, router, VPN, load balancer). Overrides default routing to control subnet traffic.
- **User Defined Route / UDR** (Azure): Custom route table overriding system default routes. Used for forced tunneling, traffic to NVAs, hub-and-spoke transit.
- **Azure Route Server** (Azure): Exchanges network routes between VNet and NVAs using BGP. Simplifies dynamic routing.
- **System Routes** (Azure): Built-in Azure routes that are immutable. Created automatically for VNet, peering, service endpoints.
- **Route Precedence** (Azure): UDR > BGP > System Routes.

## Load Balancing & Traffic Distribution

- **Azure Load Balancer** (Azure): Layer 4 (TCP/UDP) load balancer. Supports public/internal, regional/global. Basic SKU (retiring 2025, no port forwarding/HTTPS probes), Standard SKU (zone redundancy, port forwarding, HTTPS health probes, availability set backend), Gateway SKU (VPN). Uses 5-tuple hash (source IP/port, dest IP/port, protocol) for distribution.
- **Health Probe** (IT concept): Monitors backend instance health using TCP, HTTP, or HTTPS. Defines unhealthy threshold.
- **Session Persistence / Affinity** (IT concept): None (distributed), Client IP (same VM for same IP), Client IP + Protocol.
- **HA Ports / High Availability Ports** (Azure): Load balances all TCP/UDP ports. Used for NVAs and HA setups.
- **Azure Application Gateway** (Azure): Layer 7 load balancer with URL-based routing (path/host headers), SSL termination, WAF (SQL injection protection), cookie-based session affinity. Regional. V2 SKU adds auto-scale.
- **Azure Traffic Manager** (Azure): DNS-based global traffic distribution. Layer 4. Routing methods: Priority, Weighted, Performance, Geographic, Multivalue, Subnet. Slower failover due to DNS TTL. Does not provide caching or SSL termination.
- **Azure Front Door** (Azure): Global Layer 7 load balancer with anycast, HTTP load balancing, WAF, SSL offloading, CDN. Sub-millisecond latency. Classic, Standard, Premium tiers. Best caching solution for global CDN with edge caching, geographic delivery, WAF with OWASP rules, and custom security headers. Supports NSG service tags to restrict traffic.
- **Azure Cross Region Load Balancer** (Azure): Global public IP pointing to a regional Azure Load Balancer.
- **Azure CDN / Content Delivery Network** (Azure): Edge caching for static/dynamic content. Providers: Microsoft, Verizon, Akamai. Use: media delivery, static assets, latency reduction.
- **NAT Gateway** (Azure): Translates private IPs for internet access without direct exposure.

## DNS

- **Azure DNS** (Azure): Domain name system service. Supports public and private DNS zones. Always accessible at 168.63.129.16 from within a VNet.
- **NSG Service Tag** (Azure): Predefined Azure service tag for NSG security rules. By configuring NSGs with service tags, you can restrict traffic to only come from Azure Front Door and implement load balancing. Not the same as ASGs.
- **Azure Private DNS** (Azure): DNS zones associated with VNets. Supports auto-registration of DNS records. Linked to multiple VNets.
- **Alias Record** (Azure): DNS record pointing to Azure resources. Prevents empty records on resource deletion. Reduces risk of DNS usurpation.
- **TTL / Time to Live** (IT concept): DNS record cache duration. Affects failover speed and DNS propagation.
- **Azure Private DNS Resolver** (Azure): DNS resolution for external networks. Required for access from outside VNet.

## Azure Bastion

- **Azure Bastion** (Azure): Browser-based RDP/SSH connectivity via HTTPS and TLS encryption. Fully managed, security-hardened. Deployed in a dedicated subnet. Up to 50 session instances. Supports copy/paste, IP-based connections, shareable links. Provides secure remote access to VMs without exposing public IPs.

## Monitoring & Diagnostics (Network)

- **Azure Network Watcher** (Azure): Suite of tools for monitoring, diagnosing, and analyzing network traffic. Auto-enabled per region when VNet created.
- **Connection Monitor** (Azure): Tracks end-to-end connectivity and latency between Azure and hybrid endpoints. Diagnoses connectivity issues but does not analyze packet-level allowances.
- **Connection Troubleshoot** (Azure): Network Watcher tool for diagnosing connectivity issues between Azure resources. Provides detailed insights but not packet-level filtering details.
- **Topology Viewer** (Azure): Interactive visual graph of Azure virtual network infrastructure showing relationships, subnets, and connected resources (VMs, gateways, load balancers).
- **IP Flow Verify** (Azure): Checks traffic filtering using 5-tuple. Returns which NSG rule allowed/denied. Analyzes network traffic to verify if packets are allowed/denied to specific VMs.
- **NSG Diagnostics** (Azure): Identifies filtering issues for VMs, scale sets, or gateways.
- **Next Hop** (Azure): Shows next-hop type and IP for routing path verification.
- **Effective Security Rules** (Azure): Shows active NSG rules for NICs.
- **Packet Capture** (Azure): Remotely starts packet capture for VMs. Supports filters.
- **Flow Logs** (Azure): Logs IP traffic for NSGs. Stores in storage account. Virtual network flow logs log IP traffic information.
- **Traffic Analytics** (Azure): Visualizes and analyzes Flow Log data for insights.
