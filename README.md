# AI Fashion OS

AI-powered men's fashion content and affiliate operations platform.

## Pipeline

Research → Product Discovery → Product Scoring → Content Strategy → Script → SEO → Video Production → Approval → Publishing → Analytics → Optimization

## Current architecture

The MVP is designed as a **local-first modular monolith + durable worker**. The domain is provider-agnostic; Gemini is isolated behind an AI gateway; long-running operations use durable workflows/jobs; external writes are authorized, idempotent and audited.

## AI operating model

- HITL approval is the MVP default.
- AI output is untrusted until schema/business validation.
- Product facts require evidence.
- Important generated content is versioned.
- Raw historical analytics are immutable.
- AI usage and cost are observable and budgeted.

## Repository guidance

Start with [`AGENTS.md`](./AGENTS.md). Then read the relevant documents under [`docs/`](./docs/).

Key documents:

- `docs/FUNCTION_SPEC.md`
- `docs/BUSINESS_REQUIREMENTS.md`
- `docs/USE_CASES.md`
- `docs/USER_STORIES.md`
- `docs/BUSINESS_RULES.md`
- `docs/DOMAIN_MODEL.md`
- `docs/STATE_MACHINE.md`
- `docs/DATA_DICTIONARY.md`
- `docs/AGENT_SYSTEM.md`
- `docs/AGENT_PERMISSIONS.md`
- `docs/ARCHITECTURE.md`
- `docs/API_SPEC.md`
- `docs/AI_GOVERNANCE.md`
- `docs/IDEMPOTENCY.md`
- `docs/EVENT_CATALOG.md`
- `docs/SECURITY.md`
- `docs/OBSERVABILITY.md`
- `docs/CONFIGURATION.md`
- `docs/ACCEPTANCE_CRITERIA.md`

The original functional specification is retained at `docs/AI_Fashion_OS_Function_Specification_v1.0.docx`.
