# AI Policy

Treat model output as untrusted.

Require structured output and schema validation for machine-consumed results. Use evidence/confidence for factual claims where applicable. Record provider/model/prompt version/token usage/latency/cost. Keep Gemini behind an internal interface.

Forbidden: invented product facts, prices, discounts, availability, affiliate URLs, reviews or performance statistics; bypassing approval; unvalidated external writes; secrets in prompts.

Use bounded retries and pause workflows when a configured hard AI budget is exceeded.
