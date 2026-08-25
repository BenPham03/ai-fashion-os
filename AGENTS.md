# AGENTS.md — AI Fashion OS

## 1. Project Purpose

AI Fashion OS is an AI-powered men's fashion content and affiliate marketing automation platform.

Core pipeline:

Research → Product Discovery → Product Scoring → Content Strategy → Script → SEO → Video Production → Approval → Publishing → Analytics → Optimization

Primary goals:
- Automate repetitive content operations.
- Increase content production capacity.
- Use Google Gemini for AI reasoning and generation.
- Keep humans in control through HITL approval in MVP.
- Make workflows observable, retryable, auditable, idempotent and cost-aware.
- Run locally first and remain deployable to a VPS/cloud environment later.

---

## 2. Source of Truth

Before implementing a non-trivial feature, read in this order:

1. `AGENTS.md`
2. `docs/FUNCTION_SPEC.md`
3. Relevant documents under `docs/`
4. Existing code related to the feature

Important documents include:

```text
docs/FUNCTION_SPEC.md
docs/BUSINESS_REQUIREMENTS.md
docs/USE_CASES.md
docs/USER_STORIES.md
docs/BUSINESS_RULES.md
docs/STATE_MACHINE.md
docs/DATA_DICTIONARY.md
docs/API_SPEC.md
docs/AGENT_SYSTEM.md
docs/ACCEPTANCE_CRITERIA.md
```

Never invent major business behavior when the specification is unclear.

If an ambiguity can cause data loss, security issues, architectural changes, incompatible APIs, or financial side effects, stop and request clarification.

---

## 3. Mandatory Rules

### 3.1 Small Changes

Make the smallest reasonable change required by the task.

Do not:
- Refactor unrelated code.
- Rename unrelated files.
- Reformat unrelated code.
- Replace existing technologies without approval.
- Change public APIs without checking consumers.

### 3.2 Never Hide Failures

Do not:
- Swallow exceptions.
- Return fake success.
- Ignore failed jobs.
- Pretend an external API succeeded.
- Generate fake analytics.
- Treat unverified AI-generated data as verified business data.

### 3.3 Preserve Architecture

Do not introduce a new framework, database, queue, cloud provider, or architectural pattern unless explicitly required or approved.

### 3.4 No Secrets in Source Control

Never commit:
- API keys
- Passwords
- JWT secrets
- OAuth credentials
- Social platform credentials
- Database credentials

Use environment variables and commit only `.env.example` placeholders.

---

## 4. Product Context

### Product

AI Fashion OS

### Domain

Men's fashion content + affiliate marketing.

### Primary Platform

TikTok.

The architecture must allow future support for additional platforms.

### AI Provider

Google Gemini.

All Gemini integration must be isolated behind application interfaces/adapters so the provider can be replaced later.

### Primary User

Channel Operator.

The operator manages:
- Campaigns
- Products
- Research
- Content strategy
- Scripts
- Videos
- Approvals
- Publishing
- Analytics
- AI costs
- Automation

---

## 5. Autonomy Modes

### Manual

AI creates recommendations/drafts. User controls each step.

### HITL

AI runs the workflow but stops at approval gates. This is the MVP default.

### Autonomous

AI can execute the complete pipeline after the campaign explicitly enables autonomous execution.

Never bypass approval when HITL is enabled.

---

## 6. Technology Direction

### Backend
- NestJS
- TypeScript
- REST API
- Dependency Injection
- DTO validation
- Structured logging

### AI
- Google Gemini
- AI provider abstraction
- Versioned prompts
- Structured AI output
- Schema validation
- Token/cost tracking

### Frontend

Use the repository's approved TypeScript frontend stack. Do not replace it without approval.

### Database

Use the repository's approved primary database. Do not introduce a second primary database without explicit approval.

### Background Jobs

Use the repository's approved queue/workflow infrastructure. Jobs must be durable and retryable.

### Deployment

Local-first. The system must later be deployable to a VPS/cloud environment without major architectural rewrites.

---

## 7. Preferred Logical Architecture

```text
Frontend
   |
   v
API
   |
   +-------------------+
   |                   |
   v                   v
Application         Workflow Engine
Services                |
   |                    v
   v                 Job Queue
Domain Logic            |
   |                    v
   +-------------> Agent Layer
                       |
                 +-----+-----+
                 |           |
                 v           v
              Gemini    External APIs
                 |
                 v
            AI Validation
                 |
                 v
             Persistence
                 |
                 v
        Analytics / Optimization
```

Keep boundaries clear between:
- API
- Application logic
- Domain logic
- Infrastructure
- AI integration
- Workflow/job processing

---

## 8. Repository Structure

Preferred structure:

```text
/
├── AGENTS.md
├── README.md
├── package.json
├── apps/
│   ├── api/
│   ├── worker/
│   └── web/
├── packages/
│   ├── shared/
│   └── ai/
├── agents/
│   ├── planner.md
│   ├── backend.md
│   ├── frontend.md
│   ├── ai-engineer.md
│   ├── workflow.md
│   ├── video.md
│   ├── analytics.md
│   ├── qa.md
│   └── devops.md
├── docs/
└── tests/
```

The actual existing repository structure takes precedence. Do not restructure the project unless explicitly assigned.

---

## 9. Agent Responsibilities

### Planner Agent

Responsible for:
- Reading requirements.
- Breaking features into small tasks.
- Identifying dependencies.
- Assigning tasks.
- Preventing overlapping ownership.
- Tracking acceptance criteria.

Planner should not implement large features unless explicitly requested.

### Backend Agent

Responsible for:
- NestJS modules.
- Controllers.
- Application services.
- Domain logic.
- DTOs.
- Repositories.
- API endpoints.
- Authentication.
- Backend tests.

Do not modify frontend implementation unless assigned.

### Frontend Agent

Responsible for:
- Pages.
- Components.
- Forms.
- Dashboard.
- Campaign UI.
- Product UI.
- Content approval UI.
- Analytics UI.
- API integration.

Do not change database schema or backend business logic unless assigned.

### AI Engineer Agent

Responsible for:
- Gemini integration.
- AI provider abstraction.
- Prompt templates/versioning.
- Structured outputs.
- AI output validation.
- AI cost tracking.
- AI retries/fallbacks.

Never bypass business validation.

### Workflow Agent

Responsible for:
- State machine.
- Queues.
- Workers.
- Scheduling.
- Retries.
- Idempotency.
- Workflow orchestration.
- Job failure handling.

### Video Agent

Responsible for:
- Asset management.
- Video composition.
- Voice-over.
- Subtitles.
- Rendering.
- Video validation.

### Analytics Agent

Responsible for:
- Metrics ingestion.
- KPI calculation.
- Aggregation.
- Analytics storage.
- Optimization insights.
- Feeding performance insights back into strategy.

Raw historical metrics must remain immutable.

### QA Agent

Responsible for:
- Unit tests.
- Integration tests.
- E2E tests.
- Regression tests.
- Acceptance criteria verification.
- Failure/edge-case testing.

Do not weaken tests simply to make builds pass.

### DevOps Agent

Responsible for:
- Docker.
- Local development infrastructure.
- CI/CD.
- Environment configuration.
- VPS deployment.
- Monitoring.
- Logging infrastructure.

Never commit secrets.

---

## 10. File Ownership

Preferred ownership:

```text
Planner      → task plans / planning docs
Backend      → apps/api
Frontend     → apps/web
AI Engineer  → packages/ai and AI integration modules
Workflow     → apps/worker/workflows and jobs
Video        → video-related modules
Analytics    → analytics-related modules
QA           → tests
DevOps       → Docker / CI/CD / deployment
```

Shared files require extra care:
- `package.json`
- database schema
- shared types
- environment templates
- API contracts

Before changing shared files, inspect dependent tasks and consumers.

---

## 11. Planner Task Format

Every planned task should define:

```text
TASK ID
TITLE
GOAL
REQUIREMENT REFERENCE
DEPENDENCIES
OWNER
AFFECTED FILES / MODULES
ACCEPTANCE CRITERIA
TEST REQUIREMENTS
```

Example:

```text
TASK-001
Create Script domain model
Owner: Backend
Requirement: F08 Script Generation
Acceptance:
- Script entity exists
- Required fields are validated
- Persistence works
- Tests pass
```

---

## 12. Agent Execution Protocol

Every agent should follow:

```text
1. Read AGENTS.md
2. Read relevant specification
3. Inspect existing implementation
4. Identify affected files
5. Implement the smallest change
6. Run formatter/linter
7. Run relevant tests
8. Fix failures
9. Review the diff
10. Report the result
```

Do not skip requirement and code inspection for non-trivial work.

---

## 13. Definition of Done

A task is DONE only when:

- Requirement is implemented.
- Acceptance criteria are satisfied.
- Code compiles/builds.
- Relevant tests pass.
- No obvious regression is introduced.
- Errors are handled correctly.
- Logging is appropriate.
- No secrets are committed.
- API contracts/docs are updated when behavior changes.

---

## 14. NestJS Rules

Controllers must remain thin.

Business logic belongs in application/domain services, not controllers.

Do not call external services directly from controllers.

Prefer boundaries such as:

```text
Module
├── Controller
├── Application Service
├── Domain
├── Repository
└── Infrastructure
```

Use strict TypeScript where possible.

Avoid `any`. Prefer `unknown` plus explicit validation when the type is genuinely unknown.

Use meaningful names such as:

```text
generateScript()
validateVideo()
publishContent()
calculateProductScore()
```

---

## 15. API Rules

APIs must:
- Validate input.
- Use predictable response shapes.
- Use appropriate HTTP status codes.
- Avoid leaking internal exceptions.
- Support pagination for large collections.
- Maintain stable contracts.

Never expose:
- API keys
- Tokens
- Database credentials
- Internal stack traces

Before changing a DTO or API response, search all consumers.

---

## 16. Database Rules

Before changing a schema:

1. Inspect current entities/models.
2. Inspect migrations.
3. Search consumers.
4. Consider backward compatibility.
5. Add/update migration.
6. Run migration tests.

Do not silently change production data semantics.

AI-generated content should be stored in structured form where practical. Retain raw AI output when needed for audit/debugging.

---

## 17. Gemini Rules

Never scatter direct Gemini SDK calls throughout the codebase.

Preferred flow:

```text
Application
   ↓
AI Service Interface
   ↓
Gemini Adapter
   ↓
Gemini API
```

AI output must be validated before business logic consumes it.

Prefer structured JSON/schema output over free-form parsing.

```text
Gemini
   ↓
Structured Output
   ↓
Schema Validation
   ↓
Business Validation
   ↓
Persistence
```

Never trust AI output blindly.

---

## 18. Prompt Rules

Prompts must be versioned.

Preferred:

```text
prompts/
├── strategist/
│   ├── v1.txt
│   └── v2.txt
├── scriptwriter/
│   └── v1.txt
└── seo/
    └── v1.txt
```

Production prompt changes must be traceable.

Prompts should define:
- Role
- Context
- Input
- Constraints
- Output schema
- Quality criteria
- Forbidden behavior

---

## 19. AI Cost Rules

Record when available:

```text
provider
model
inputTokens
outputTokens
duration
estimatedCost
```

Avoid unnecessary repeated AI calls.

Reuse valid outputs when possible.

Respect campaign budgets.

If the configured hard AI budget is exceeded, the workflow must pause rather than silently continue spending.

---

## 20. Content State Machine

The primary content lifecycle is:

```text
DISCOVERED
↓
PRODUCT_SELECTED
↓
STRATEGY_CREATED
↓
SCRIPT_DRAFTED
↓
SCRIPT_APPROVED
↓
ASSETS_PENDING
↓
ASSETS_READY
↓
VIDEO_GENERATING
↓
VIDEO_READY
↓
SEO_READY
↓
READY_TO_PUBLISH
↓
SCHEDULED
↓
PUBLISHED
↓
ANALYZING
↓
OPTIMIZED
```

Any appropriate processing step may enter:

```text
FAILED
```

Failed jobs must preserve:
- workflow ID
- job ID
- error
- agent
- timestamp
- retry count

Do not invent additional business states without updating the state machine documentation.

---

## 21. Retry and Idempotency

Retryable examples:
- Network timeout.
- Temporary external API failure.
- Rate limiting.
- Temporary infrastructure failure.

Usually non-retryable:
- Invalid input.
- Invalid business state.
- Missing required data.
- Invalid credentials/configuration.
- Schema validation failure.

Every retry must be idempotent.

A worker restart must not cause duplicate publishing or other duplicate side effects.

---

## 22. Publishing Rules

Publishing is a high-risk external side effect.

Before publishing, validate:

```text
Approval
+ Video Validation
+ Caption Validation
+ Affiliate URL Validation
+ Platform Validation
```

Use an idempotency key.

Never publish twice because a job restarted.

Store the external platform post ID after successful publication.

If HITL is enabled, publication without approval is forbidden.

---

## 23. Analytics Rules

Separate:

```text
Raw Metrics
```

from:

```text
Aggregated Metrics
```

Raw historical metrics are immutable.

Derived metrics may be recalculated.

Optimization insights must be based on measurable data rather than invented conclusions.

---

## 24. Content Versioning

AI-generated content must not overwrite important previous versions.

Example:

```text
Content #100

Version 1 → Rejected
Version 2 → Rejected
Version 3 → Approved
```

Keep the version history for auditability and optimization.

---

## 25. Business Rules

The following rules from the functional specification are mandatory:

- BR-001: Do not publish unapproved content when campaign mode is HITL.
- BR-002: Do not publish video that failed validation.
- BR-003: Do not publish the same content multiple times on the same platform.
- BR-004: AI must not treat nonexistent/unverified products as real persisted products.
- BR-005: AI output must be validated before persistence/business processing.
- BR-006: Workflows must support retry.
- BR-007: Retry must not create duplicate side effects.
- BR-008: Paused campaigns must not create new workflows.
- BR-009: Exceeding the configured AI hard budget pauses AI workflow execution.
- BR-010: Rejected content requires a rejection reason.
- BR-011: Regeneration creates a new content version.
- BR-012: Raw analytics must not be overwritten.

If `docs/FUNCTION_SPEC.md` contains an updated rule, the documentation must be treated as the current business baseline and related implementation/tests must be updated accordingly.

---

## 26. Security Rules

Never log:
- API keys.
- Passwords.
- Access/refresh tokens.
- Social platform credentials.
- Sensitive personal information.

Use:

```text
.env
.env.local
secret manager
deployment environment variables
```

Commit:

```text
.env.example
```

only with placeholders.

Do not disable authentication or authorization simply to make development easier.

---

## 27. Error Handling and Observability

Errors must contain enough context to diagnose the problem.

Preferred structured logging fields:

```text
requestId
workflowId
jobId
agent
event
status
duration
error
```

The system should make it possible to answer:

- Where is this content?
- Which agent is processing it?
- Which job failed?
- Why did it fail?
- How many retries occurred?
- How much did the AI operation cost?
- What was the previous state?
- What happens next?

---

## 28. Testing Strategy

Minimum testing layers:

```text
Unit Tests
↓
Integration Tests
↓
E2E Tests
```

Important scenarios:

### AI
- Valid response.
- Invalid response.
- Timeout.
- Rate limit.
- Empty response.
- Schema mismatch.

### Workflow
- Success.
- Failure.
- Retry.
- Max retry.
- Worker restart recovery.
- Duplicate job.

### Publishing
- Successful publish.
- Failed publish.
- Retry.
- Duplicate prevention.

### Approval
- Approve.
- Reject.
- Regenerate.
- Versioning.

Never delete or weaken tests merely to make the build pass.

---

## 29. Local Development

The project must remain runnable locally.

Documentation should explain:

```text
Install dependencies
Configure environment
Start database
Start API
Start worker
Start frontend
Run tests
```

Prefer one documented command for starting the full local development environment when practical.

---

## 30. Environment Variables

Use environment variables for configuration.

Example:

```text
NODE_ENV=
PORT=
DATABASE_URL=
GEMINI_API_KEY=
GEMINI_MODEL=
REDIS_URL=
JWT_SECRET=
TIKTOK_CLIENT_ID=
TIKTOK_CLIENT_SECRET=
```

Do not hard-code these values.

---

## 31. Git Rules

Do not:
- Force push shared branches.
- Rewrite another agent's work.
- Delete unrelated changes.
- Commit secrets.
- Commit unnecessary build artifacts.

Use focused commits, for example:

```text
feat(script): add Gemini script generation
fix(workflow): make publishing job idempotent
test(product): add product scoring tests
```

Review the diff before finishing a task.

---

## 32. Autonomous Agent Safety

Agents must NOT autonomously:

- Drop production databases/tables.
- Delete production data.
- Rotate production credentials.
- Make destructive infrastructure changes.
- Publish content when approval is required.
- Spend beyond configured limits.
- Disable security controls.
- Remove tests to hide failures.

Destructive operations require explicit approval.

---

## 33. When Something Fails

Follow:

```text
1. Reproduce
2. Identify root cause
3. Inspect logs
4. Inspect related code
5. Make the minimal fix
6. Run regression tests
7. Report root cause
```

Do not randomly modify unrelated code until the error disappears.

---

## 34. Documentation Rules

If behavior changes, update relevant documentation.

At minimum consider:

```text
docs/FUNCTION_SPEC.md
docs/USE_CASES.md
docs/BUSINESS_RULES.md
docs/STATE_MACHINE.md
docs/API_SPEC.md
docs/DATA_DICTIONARY.md
docs/AGENT_SYSTEM.md
docs/ACCEPTANCE_CRITERIA.md
```

Code and documentation must not contradict each other.

---

## 35. Priority When Instructions Conflict

Use this order:

```text
1. Explicit user requirement
2. Security / safety constraints
3. Business requirements
4. docs/FUNCTION_SPEC.md
5. AGENTS.md
6. Existing architecture
7. Agent preference
```

Agent preference must never override a higher-priority requirement.

---

## 36. Final Agent Report

Every completed task should report:

```text
TASK:
TASK-XXX

STATUS:
DONE / BLOCKED / PARTIAL

CHANGES:
- ...
- ...

FILES:
- ...
- ...

TESTS:
- ...

ACCEPTANCE CRITERIA:
- [x] ...
- [x] ...

ISSUES:
- ...

FOLLOW-UP:
- ...
```

If blocked:

```text
BLOCKED BY:
...

REQUIRED DECISION:
...

DO NOT CONTINUE UNTIL:
...
```

---

## 37. Golden Rule

Before writing code, every agent must be able to answer:

1. What business problem am I solving?
2. Which requirement defines it?
3. Which agent owns this task?
4. Which files should I modify?
5. What are the acceptance criteria?
6. How will I test it?
7. What happens if it fails?
8. Is the operation idempotent?
9. Does this change affect another agent?
10. Can another developer understand what I changed?

If these questions cannot be answered, stop implementation and clarify the task.

---

## 38. End-to-End Target

The system should ultimately support:

```text
                    AI FASHION OS
                         |
                     Campaign
                         |
                     Researcher
                         |
                   Product Scout
                         |
                   Product Scoring
                         |
                     Strategist
                         |
                    Scriptwriter
                         |
                        SEO
                         |
                      Producer
                         |
                     Validation
                         |
                  Human Approval
                         |
                     Publisher
                         |
                     Analytics
                         |
                      Analyst
                         |
                    Optimization
                         |
                         +-------------> New Strategy
```

The goal is not merely to create separate AI features. The goal is to build a reliable AI-driven content operation system.
