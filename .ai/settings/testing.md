# Testing Settings

For every feature, identify appropriate unit, integration, workflow and regression tests.

High-risk paths must cover:
- invalid state transitions
- retry behavior
- duplicate execution/idempotency
- authorization failures
- publication failures
- AI schema validation failures
- prompt-injection/untrusted-content cases

Do not weaken tests to make builds pass.
