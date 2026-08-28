CREATE TYPE "AutonomyMode" AS ENUM ('MANUAL', 'HITL', 'AUTONOMOUS');
CREATE TYPE "CampaignStatus" AS ENUM ('DRAFT', 'ACTIVE', 'PAUSED', 'COMPLETED', 'ARCHIVED');
CREATE TYPE "WorkflowStatus" AS ENUM ('QUEUED', 'RUNNING', 'SUCCEEDED', 'FAILED', 'PAUSED');

CREATE TABLE "Campaign" (
  "id" UUID NOT NULL,
  "name" TEXT NOT NULL,
  "objective" TEXT,
  "targetAudience" TEXT,
  "autonomyMode" "AutonomyMode" NOT NULL DEFAULT 'HITL',
  "status" "CampaignStatus" NOT NULL DEFAULT 'DRAFT',
  "aiBudget" DECIMAL(12,4),
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "Campaign_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "WorkflowRun" (
  "id" UUID NOT NULL,
  "campaignId" UUID,
  "workflowType" TEXT NOT NULL,
  "state" TEXT NOT NULL,
  "status" "WorkflowStatus" NOT NULL DEFAULT 'QUEUED',
  "idempotencyKey" TEXT NOT NULL,
  "attempt" INTEGER NOT NULL DEFAULT 0,
  "errorCode" TEXT,
  "errorMessage" TEXT,
  "startedAt" TIMESTAMP(3),
  "completedAt" TIMESTAMP(3),
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "WorkflowRun_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "WorkflowRun_idempotencyKey_key" ON "WorkflowRun"("idempotencyKey");
CREATE INDEX "WorkflowRun_campaignId_idx" ON "WorkflowRun"("campaignId");
CREATE INDEX "WorkflowRun_status_createdAt_idx" ON "WorkflowRun"("status", "createdAt");

ALTER TABLE "WorkflowRun" ADD CONSTRAINT "WorkflowRun_campaignId_fkey"
FOREIGN KEY ("campaignId") REFERENCES "Campaign"("id") ON DELETE SET NULL ON UPDATE CASCADE;
