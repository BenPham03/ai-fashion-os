# Idempotency

Idempotency is mandatory for operations that can create external or durable side effects.

## Required operations
- GenerateScript
- GenerateAssets
- GenerateVideo
- CollectAnalytics
- SchedulePublication
- PublishContent

## Key examples
```text
GenerateScript = workflowId + contentId + contentVersion
GenerateVideo = contentId + contentVersion + assetSetVersion
Publish = contentId + platform + scheduledAt
```

Persist the key and enforce uniqueness at the database layer. A duplicate request returns the original result. Never rely only on in-memory locks. Worker restarts must not create duplicate publications.
