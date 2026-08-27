# Workflow Settings

Canonical execution loop:

Read State → Determine Next Action → Dispatch Agent → Validate Result → Persist Result → Transition State → Continue / Retry / HITL

Workflow requirements:
- Persist state before/after important side effects.
- Use durable job IDs and correlation IDs.
- Retries are bounded and idempotent.
- Invalid state transitions are rejected.
- HITL gates cannot be bypassed by agents.
- Failed jobs remain diagnosable and recoverable.
