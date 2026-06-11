---
title: "Azure Functions vs Logic Apps"
slug: functions-vs-logicapps
category: compute
tags: [serverless, compute, workflow, integration, code]
services:
  - Azure Functions
  - Azure Logic Apps
glossary:
  - Azure Functions
  - Azure Logic Apps
  - Durable Functions
  - Cold Start
  - Serverless
---

## When to use Functions

- Custom code execution in C#, Python, JavaScript, Java, PowerShell
- Event-driven processing with millisecond latency requirements
- Short-lived tasks (<10 minutes on Consumption Plan)
- Triggers: HTTP, Blob, Queue, Timer, Cosmos DB change feed, Event Grid
- Data transformation, API backends, real-time file processing
- Need full control over code, libraries, and dependencies

## When to use Logic Apps

- Low-code/no-code workflow automation with 400+ connectors
- Orchestrating multiple Azure and third-party services (SaaS, on-prem)
- Enterprise integration patterns: B2B/EDI, SAP, IBM MQ
- Approval workflows with email notifications (Office 365, Teams)
- Long-running stateful workflows (minutes to days)
- Visual designer accessible to non-developers

## Decision Table

| Feature | Functions | Logic Apps |
|---|---|---|
| **Development** | Code (C#, Python, JS, Java, PS) | Visual designer (low-code) |
| **Triggers** | 10+ (HTTP, Blob, Queue, Timer, etc.) | 400+ connectors + triggers |
| **Latency** | Millisecond | Higher (orchestration overhead) |
| **State management** | Durable Functions (code-based) | Built-in workflow state |
| **Max execution** | 10 min (Consumption), unlimited (Premium/Dedicated) | 1 year (Standard plan) |
| **Pricing** | Pay-per-execution + GB-s | Pay-per-action + connector |
| **Best for** | Custom code, real-time processing | Workflow automation, SaaS integration |
| **Connectors** | Custom binding extensions | 400+ prebuilt |
| **On-premises** | Hybrid Connections | On-premises data gateway |

## Key Distinctions

- Functions is **code-first** — you write logic; Logic Apps is **connector-first** — you wire up services
- Functions has **millisecond latency**; Logic Apps has higher latency due to orchestration engine
- Logic Apps has **400+ prebuilt connectors** (Salesforce, SAP, ServiceNow, Teams) — Functions would need custom code for each
- Both can call each other: Functions from Logic Apps (custom action), Logic Apps from Functions (HTTP trigger)
- For complex branching, retry, and error handling: Logic Apps handles it declaratively; Functions needs code
- Logic Apps **Consumption plan** and Functions **Consumption plan** are both serverless but priced differently

## Combo Pattern: Functions + Logic Apps

```
Trigger → Functions (validate/transform data, <10ms)
       → Logic Apps (orchestrate approval workflow, send email)
       → Functions (write result to database)
```

Functions handles the performance-sensitive processing; Logic Apps orchestrates the multi-step workflow.

## Related Cards

- [Compute Hosting](compute/compute-hosting.md) — VM vs App Service vs AKS vs ACA vs Functions
- [Messaging Service](messaging/messaging-service.md) — Queue Storage vs Service Bus vs Event Hubs vs Event Grid
