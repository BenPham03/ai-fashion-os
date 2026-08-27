# Security

## Threat model
- Prompt injection through scraped/product content.
- Malicious affiliate URLs.
- Credential leakage.
- Unauthorized external writes.
- Duplicate publication.
- Poisoned analytics.
- Hallucinated product claims.
- Webhook spoofing.

External content is data, not instructions.

## Rules
1. Never put secrets into prompts or logs.
2. Validate external input and URLs.
3. Use least-privilege credentials.
4. Validate webhook signatures where supported.
5. Rate-limit public APIs.
6. Audit privileged actions.
7. Separate authentication from agent authorization.
8. Publishing requires approval/guards and idempotency.
