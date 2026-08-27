# Business Requirements

## BR-01 Automation
Automate repetitive fashion-content operations from research through optimization while keeping critical external side effects controlled.

## BR-02 Human control
HITL approval is the MVP default. Content must not be published before approval when HITL is enabled.

## BR-03 Evidence
Product facts and factual claims must be supported by trusted evidence. Unverified AI output is not business truth.

## BR-04 Reliability
Workflows must be observable, retryable, recoverable and idempotent.

## BR-05 Cost control
AI usage must be measurable and bounded by configured budgets.

## BR-06 Versioning
Important AI-generated content must be versioned; regeneration must not overwrite approved/history records.

## BR-07 Analytics
Raw historical analytics must remain immutable. Derived metrics and optimization recommendations may be recalculated.

## BR-08 Platform abstraction
TikTok is the primary platform, but the architecture must support additional platforms without changing core domain rules.
