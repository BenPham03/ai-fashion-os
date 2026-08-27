# Agent Permissions

| Agent | Internal Read | Internal Write | AI | External Read | External Write | Publish |
|---|---:|---:|---:|---:|---:|---:|
| Supervisor | yes | yes | yes | controlled | controlled | controlled |
| Researcher | yes | yes | yes | yes | no | no |
| Product Scout | yes | yes | yes | yes | no | no |
| Analyst | yes | yes | yes | yes | no | no |
| Strategist | yes | yes | yes | no | no | no |
| Scriptwriter | yes | yes | yes | no | no | no |
| Producer | yes | yes | yes | no | no | no |
| SEO | yes | yes | yes | controlled | no | no |
| Publisher | yes | yes | optional | yes | yes | yes |

## Safety rules
- External writes are deny-by-default.
- Publishing requires approval when HITL is enabled.
- Publisher cannot bypass validation or approval.
- Credentials never enter prompts.
- External writes require idempotency and audit events.
- Agents cannot redefine business rules or silently mutate lifecycle state.
