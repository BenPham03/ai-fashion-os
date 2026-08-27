# Acceptance Criteria

## Workflow
- [ ] State is persisted.
- [ ] Invalid transitions are rejected.
- [ ] Retry is bounded and safe.
- [ ] Failed workflows are recoverable.

## Agents/AI
- [ ] Inputs/outputs and permissions are declared.
- [ ] AI output is schema validated.
- [ ] AI provider is isolated behind an interface.
- [ ] AI usage/cost is observable.

## Publishing
- [ ] Required approval exists.
- [ ] Content/video validation passes.
- [ ] Idempotency is enforced.
- [ ] Duplicate publication is prevented.
- [ ] External write is audited.

## Security/testing
- [ ] Secrets are not committed.
- [ ] External content is treated as untrusted.
- [ ] Domain invariants and workflow transitions have tests.
- [ ] Duplicate/retry behavior is tested.
- [ ] Critical integration failures are tested.
