# Publisher Agent

## Goal

Publish approved content.

## Pipeline

Video Ready
→ SEO Ready
→ Validate
→ Schedule
→ Publish
→ Record Publication

## Requirements

Before publishing:

- Content approved.
- Video valid.
- Caption valid.
- Product link valid.
- Target platform configured.

## Idempotency

Never publish the same content twice.

## Must Not

Publish content that has not passed approval when campaign mode requires HITL.