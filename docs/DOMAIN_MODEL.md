# Domain Model

## Aggregates
- Campaign: objective, audience, budget, schedule, autonomy mode, lifecycle.
- Product: source, externalId, identity, category, price, affiliate URL, evidence, confidence, availability, status.
- Content: product/campaign relation, strategy, current version, approval, lifecycle state.
- ContentVersion: immutable script, caption, CTA, SEO, assets, model/prompt metadata and validation result.
- Publication: platform, account, content version, schedule, external post ID, status, idempotency key.
- AnalyticsSnapshot: immutable observation collected at a point in time.

## Value objects
Money, URL, Platform, ConfidenceScore, IdempotencyKey, TimeRange, KPISet.

## Domain events
CampaignCreated, ProductDiscovered, ProductSelected, StrategyGenerated, ScriptGenerated, ScriptApproved, ScriptRejected, AssetsReady, VideoReady, ContentValidated, ContentScheduled, ContentPublished, AnalyticsCollected, OptimizationGenerated, WorkflowFailed, WorkflowRetried.

Aggregates own invariants. Integrations return results to application services and never directly mutate domain state.
