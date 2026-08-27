# AI Fashion OS Architecture

## Architecture decision
MVP is a modular monolith plus a durable worker. Do not split into microservices until independent scaling, ownership, deployment, or reliability requires it.

## Boundaries
- API: transport, authentication, validation, request orchestration.
- Application: use cases and transaction boundaries.
- Domain: business rules, aggregates, value objects, state transitions.
- Infrastructure: database, queues, external APIs, storage.
- AI Gateway: provider-neutral interface and Gemini adapter.
- Workflow: durable state machine, jobs, retries, scheduling, idempotency.
- Agents: specialized decision/generation roles; agents do not own business state.

```text
Web -> API -> Application -> Domain
                  |             |
                  |             +-> Persistence
                  v
             Workflow -> Queue -> Worker -> Agents
                                  |           |
                                  |           +-> AI Gateway -> Gemini
                                  +-> Integrations -> External APIs
```

## Core rules
1. Domain code must not depend on Gemini SDKs.
2. Controllers must not call external providers directly.
3. AI output is untrusted until schema and business validation succeed.
4. External writes are privileged, audited, and idempotent.
5. Long-running generation/publishing/analytics work is asynchronous.
6. Historical analytics are immutable.
7. Approved content versions are immutable.
