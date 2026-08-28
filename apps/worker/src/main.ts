import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { Worker } from 'bullmq';
import IORedis from 'ioredis';

const redisUrl = process.env.REDIS_URL ?? 'redis://localhost:6379';
const connection = new IORedis(redisUrl, { maxRetriesPerRequest: null });
const prisma = new PrismaClient();

const worker = new Worker(
  'ai-fashion-workflows',
  async (job) => {
    const workflowId = String(job.data.workflowId ?? '');
    if (!workflowId) throw new Error('workflowId is required');

    const workflow = await prisma.workflowRun.findUnique({ where: { id: workflowId } });
    if (!workflow) throw new Error(`Workflow ${workflowId} not found`);

    if (workflow.status === 'SUCCEEDED') {
      return { workflowId, status: workflow.status, reused: true };
    }

    await prisma.workflowRun.update({
      where: { id: workflowId },
      data: { status: 'RUNNING', startedAt: workflow.startedAt ?? new Date(), attempt: { increment: 1 } },
    });

    // Foundation dispatcher. Specialized workflow handlers are added per FUNCTION_SPEC area.
    await prisma.workflowRun.update({
      where: { id: workflowId },
      data: { status: 'SUCCEEDED', completedAt: new Date(), errorCode: null, errorMessage: null },
    });

    return { workflowId, status: 'SUCCEEDED' };
  },
  { connection },
);

worker.on('failed', async (job, error) => {
  const workflowId = job?.data?.workflowId as string | undefined;
  if (workflowId) {
    await prisma.workflowRun.update({
      where: { id: workflowId },
      data: { status: 'FAILED', errorCode: 'WORKER_JOB_FAILED', errorMessage: error.message },
    }).catch(() => undefined);
  }
  console.error(JSON.stringify({ event: 'workflow.job.failed', workflowId, jobId: job?.id, error: error.message }));
});

async function shutdown(): Promise<void> {
  await worker.close();
  await connection.quit();
  await prisma.$disconnect();
}

process.on('SIGINT', () => void shutdown().finally(() => process.exit(0)));
process.on('SIGTERM', () => void shutdown().finally(() => process.exit(0)));

console.log(JSON.stringify({ event: 'worker.started', queue: 'ai-fashion-workflows' }));
