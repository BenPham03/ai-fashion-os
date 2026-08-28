# AI Fashion OS

AI-powered men's fashion content and affiliate operations platform.

## Pipeline
Research → Product Discovery → Product Scoring → Content Strategy → Script → SEO → Video Production → Approval → Publishing → Analytics → Optimization

## Current implementation
The MVP is a **modular monolith + durable worker**:

```text
apps/api      NestJS REST API
apps/worker   BullMQ worker
packages/ai   provider-neutral AI Gateway + Gemini adapter
packages/shared shared contracts
prisma/       PostgreSQL schema and migrations
Redis         durable queue transport
```

The first implemented vertical slice is Campaign create/read. Workflow persistence and the BullMQ worker foundation are also in place.

## Local development

1. Copy environment variables:
   `cp .env.example .env`
2. Start infrastructure:
   `docker compose up -d`
3. Install dependencies and generate Prisma client:
   `npm install`
4. Apply database migration:
   `npm run prisma:migrate`
5. Build shared packages:
   `npm run build -w @ai-fashion/ai && npm run build -w @ai-fashion/shared`
6. Start API:
   `npm run dev:api`
7. In another terminal start worker:
   `npm run dev:worker`

API health: `GET /api/v1/health`

Campaign endpoints:
- `POST /api/v1/campaigns`
- `GET /api/v1/campaigns/:id`

Gemini is isolated behind `AiProvider -> GeminiProvider`. The API can start without a Gemini key; generation fails explicitly until `GEMINI_API_KEY` is configured.

## Engineering rules
- HITL is the MVP default.
- Domain code does not depend on Gemini.
- Controllers do not call Prisma or external providers directly.
- AI output is untrusted until validation.
- External writes must be authorized, idempotent, and audited.
- Approved content versions and raw analytics are immutable.

Start with `AGENTS.md`, then read the relevant files under `docs/` before implementing a feature.
