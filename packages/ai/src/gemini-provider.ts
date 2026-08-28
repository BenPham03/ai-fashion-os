import { GoogleGenAI } from '@google/genai';
import { AiGenerateRequest, AiGenerateResult, AiProvider } from './ai-provider';

export interface GeminiProviderOptions {
  apiKey: string;
  defaultModel: string;
}

export class GeminiProvider implements AiProvider {
  readonly name = 'gemini';
  private readonly client: GoogleGenAI | null;

  constructor(private readonly options: GeminiProviderOptions) {
    this.client = options.apiKey ? new GoogleGenAI({ apiKey: options.apiKey }) : null;
  }

  async generate(request: AiGenerateRequest): Promise<AiGenerateResult> {
    if (!this.client) {
      throw new Error('GEMINI_API_KEY is required for AI generation');
    }
    if (!this.options.defaultModel && !request.model) {
      throw new Error('GEMINI_MODEL is required for AI generation');
    }

    const model = request.model ?? this.options.defaultModel;
    const startedAt = Date.now();
    const response = await this.client.models.generateContent({
      model,
      contents: request.prompt,
      config: { responseMimeType: request.responseMimeType ?? 'application/json' },
    });

    const usage = response.usageMetadata;
    return {
      text: response.text ?? '',
      model,
      durationMs: Date.now() - startedAt,
      usage: usage ? {
        inputTokens: usage.promptTokenCount,
        outputTokens: usage.candidatesTokenCount,
        totalTokens: usage.totalTokenCount,
      } : undefined,
    };
  }
}
