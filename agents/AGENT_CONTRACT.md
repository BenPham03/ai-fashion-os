# Business Agent Contract

Every agent under `agents/` should follow this contract.

## Required sections
1. Role / identity
2. Purpose
3. Inputs
4. Outputs
5. Tools / allowed integrations
6. Permissions
7. Preconditions
8. Postconditions
9. Business rules
10. Failure modes
11. Retry policy
12. HITL policy
13. Observability

## Execution
```text
Read task + relevant docs
→ Inspect current state
→ Validate inputs
→ Perform bounded work
→ Produce structured result
→ Validate result
→ Persist through application/workflow boundary
→ Report status and evidence
```

## Guardrails
- Do not redefine business rules in prompts.
- Do not silently mutate workflow state.
- Do not expose secrets to models.
- Do not perform external writes unless the permission matrix allows it.
- External writes must be idempotent and auditable.
- AI output is untrusted until validated.
