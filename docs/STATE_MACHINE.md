# State Machine

## Content lifecycle
```text
DISCOVERED
  -> PRODUCT_SELECTED
  -> STRATEGY_CREATED
  -> SCRIPT_DRAFTED
  -> SCRIPT_APPROVED
  -> ASSETS_PENDING
  -> ASSETS_READY
  -> VIDEO_GENERATING
  -> VIDEO_READY
  -> SEO_READY
  -> READY_TO_PUBLISH
  -> SCHEDULED
  -> PUBLISHED
  -> ANALYZING
  -> OPTIMIZED
```

## Rejection
`SCRIPT_DRAFTED -> SCRIPT_REJECTED -> SCRIPT_DRAFTED`

## Failure/retry
Any retryable processing state may enter `FAILED -> RETRYING -> previous safe state`.

Each transition must define trigger, actor, guard, side effects and failure behavior. Do not invent new business states without updating this document and the implementation.
