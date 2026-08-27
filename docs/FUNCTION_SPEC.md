# AI Fashion OS Functional Specification — Operational Baseline

> This document turns the current repository-level requirements into implementation-oriented contracts. The original `AI_Fashion_OS_Function_Specification_v1.0.docx` remains the historical/product source document; when it conflicts with this file, reconcile the difference explicitly before implementation.

## Functional pipeline
Research → Product Discovery → Product Scoring → Content Strategy → Script → SEO → Video Production → Approval → Publishing → Analytics → Optimization

## Functional areas
- F01 Campaign management and autonomy mode.
- F02 Research and trend intelligence.
- F03 Product discovery and evidence capture.
- F04 Product scoring and selection.
- F05 Content strategy generation.
- F06 Script generation and versioning.
- F07 SEO/caption/CTA generation.
- F08 Asset and video production.
- F09 Validation and approval/HITL gates.
- F10 Scheduling and publishing.
- F11 Analytics ingestion and KPI calculation.
- F12 Optimization feedback loop.
- F13 AI usage/cost observability.

## Cross-cutting acceptance
Every long-running function is represented by durable workflow state. Every AI result is schema validated. Every external write is authorized, idempotent and audited. Historical analytics and approved content versions are immutable.

## MVP autonomy
HITL is the default. Autonomous execution may be enabled explicitly at campaign level, but safety/validation gates remain mandatory.
