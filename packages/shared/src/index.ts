export interface AsyncJobAccepted {
  workflowId: string;
  jobId: string;
  status: 'queued';
}

export interface CorrelationContext {
  requestId?: string;
  correlationId?: string;
  workflowId?: string;
  jobId?: string;
  actorId?: string;
}
