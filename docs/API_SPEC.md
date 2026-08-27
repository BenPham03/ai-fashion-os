# API Specification

Use versioned REST for synchronous operations and durable jobs for long-running work. Controllers stay thin and do not expose provider-specific exceptions.

## Suggested resources
- `POST /api/v1/campaigns`
- `GET /api/v1/campaigns/:id`
- `POST /api/v1/campaigns/:id/start`
- `POST /api/v1/products/discover`
- `GET /api/v1/products/:id`
- `POST /api/v1/products/:id/select`
- `POST /api/v1/content`
- `GET /api/v1/content/:id`
- `POST /api/v1/content/:id/generate`
- `POST /api/v1/content/:id/approve`
- `POST /api/v1/content/:id/reject`
- `POST /api/v1/publications/schedule`
- `POST /api/v1/publications/:id/publish`
- `POST /api/v1/analytics/collect`
- `GET /api/v1/content/:id/analytics`

Long-running commands should return `workflowId`, `jobId` and `status`. Validate DTOs, use stable application error codes, paginate large collections, and inspect consumers before changing public contracts.
