export interface AiUsage {
  inputTokens?: number;
  outputTokens?: number;
  totalTokens?: number;
}

export interface AiGenerateRequest {
  prompt: string;
  model?: string;
  responseMimeType?: 'text/plain' | 'application/json';
}

export interface AiGenerateResult {
  text: string;
  model: string;
  durationMs: number;
  usage?: AiUsage;
}

export interface AiProvider {
  readonly name: string;
  generate(request: AiGenerateRequest): Promise<AiGenerateResult>;
}
