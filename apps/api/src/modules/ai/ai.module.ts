import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GeminiProvider } from '@ai-fashion/ai';
import { AI_PROVIDER } from './ai.tokens';

@Module({
  providers: [
    {
      provide: AI_PROVIDER,
      inject: [ConfigService],
      useFactory: (config: ConfigService) => new GeminiProvider({
        apiKey: config.get<string>('GEMINI_API_KEY') ?? '',
        defaultModel: config.get<string>('GEMINI_MODEL') ?? 'gemini-2.5-flash',
      }),
    },
  ],
  exports: [AI_PROVIDER],
})
export class AiModule {}
