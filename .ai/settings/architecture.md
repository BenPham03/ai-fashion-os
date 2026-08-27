# Architecture Settings

- Domain is AI-provider agnostic.
- Controllers stay thin.
- Application services orchestrate use cases.
- External APIs are infrastructure adapters.
- AI is accessed through a provider-neutral gateway.
- Long-running operations use durable jobs/workflows.
- Side effects are idempotent.
- Observability is mandatory for workflows and AI calls.
- Prefer the existing repository structure over speculative restructuring.
