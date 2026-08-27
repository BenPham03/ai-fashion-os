# Configuration

## Application
`NODE_ENV`, `PORT`, `LOG_LEVEL`

## Database/queue
`DATABASE_URL`, `REDIS_URL`

## AI
`AI_PROVIDER`, `GEMINI_API_KEY`, `GEMINI_MODEL`, `AI_TIMEOUT_MS`, `AI_MAX_RETRIES`, `AI_DAILY_BUDGET`

## Authentication
`JWT_SECRET`, `JWT_EXPIRES_IN`

## Publishing
`TIKTOK_CLIENT_ID`, `TIKTOK_CLIENT_SECRET`, `TIKTOK_REDIRECT_URI`

## Job execution
`JOB_MAX_RETRIES`, `JOB_BACKOFF_MS`

## Rules
- Never commit real secrets.
- `.env.example` contains placeholders only.
- Production secrets come from environment/secret management.
- Required production configuration fails fast at startup.
