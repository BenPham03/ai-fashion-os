# Observability

Propagate requestId, correlationId, workflowId, jobId and actorId through asynchronous work.

## AI telemetry
Record provider, model, token usage, latency, retries, validation outcome and estimated cost. Never log secrets.

## Minimum metrics
- workflow_started_total
- workflow_completed_total
- workflow_failed_total
- agent_execution_total
- agent_execution_duration_ms
- ai_tokens_total
- ai_cost_estimated
- job_retry_total
- publication_success_total
- publication_failure_total

## Audit
Approval, publication, external writes, credential changes and workflow overrides must be auditable.
