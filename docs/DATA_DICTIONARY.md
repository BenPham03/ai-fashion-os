# Data Dictionary

| Entity | Required concepts |
|---|---|
| Campaign | id, status, objective, audience, autonomyMode, budget, schedule |
| Product | id, source, externalId, title, category, price, affiliateUrl, evidence, confidence, availability |
| Content | id, campaignId, productId, lifecycleState, currentVersion |
| ContentVersion | id, contentId, version, script, caption, CTA, SEO, assets, promptVersion, validationStatus |
| Publication | id, contentVersionId, platform, accountId, externalPostId, scheduledAt, status, idempotencyKey |
| AnalyticsSnapshot | id, publicationId/contentId, collectedAt, rawMetrics |
| AuditEvent | id, eventType, actorId, occurredAt, correlationId, payload |
| AIExecution | id, agent, provider, model, promptVersion, tokens, latency, estimatedCost, status |

Immutable records: approved ContentVersion and historical AnalyticsSnapshot. IDs should use the repository's established identifier strategy.
