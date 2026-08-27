# Event Catalog

| Event | Producer | Main consumer |
|---|---|---|
| CampaignCreated | Campaign | Supervisor |
| ProductDiscovered | Product Scout | Product/Analyst |
| ProductSelected | Supervisor | Strategist |
| StrategyGenerated | Strategist | Scriptwriter |
| ScriptGenerated | Scriptwriter | Approval |
| ScriptApproved | Approval | Producer |
| ScriptRejected | Approval | Scriptwriter |
| AssetsReady | Producer | Video |
| VideoReady | Producer | SEO/Validation |
| ContentValidated | Validation | Publisher |
| ContentScheduled | Publisher | Scheduler |
| ContentPublished | Publisher | Analytics |
| AnalyticsCollected | Analytics | Analyst/Optimizer |
| OptimizationGenerated | Analyst | Strategist |
| WorkflowFailed | Workflow | Supervisor/Alerting |
| WorkflowRetried | Workflow | Audit |

Events are facts, not commands. Each event should contain eventId, eventType, eventVersion, occurredAt, aggregateId, workflowId, correlationId, actor and payload. Consumers must be idempotent.
