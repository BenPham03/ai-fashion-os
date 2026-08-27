# AI Governance

AI output is untrusted data until deterministic schema validation and applicable business validation succeed.

## Required AI contract
Every AI execution records, where applicable: agent, provider, model, promptVersion, inputVersion, generatedAt, latency, token usage, confidence, evidence and validation status.

## Forbidden assumptions
AI must not invent product identity, price, discount, availability, affiliate URLs, brand affiliation, reviews, performance statistics, or factual trend claims.

## Provider abstraction
Application code uses an internal AI interface/gateway. Gemini is an adapter, not a domain dependency.

## Cost controls
Track input/output tokens, latency, estimated cost and retries. Respect configured campaign/daily hard budgets. Exceeding a hard budget pauses AI work rather than silently spending more.

## Failure handling
Retry transient provider failures with bounded backoff. Schema failures may use bounded repair/regeneration. Repeated failures move the workflow to a recoverable failed/HITL state.
