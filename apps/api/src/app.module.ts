import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HealthController } from './health.controller';
import { PrismaModule } from './infrastructure/prisma/prisma.module';
import { CampaignModule } from './modules/campaign/campaign.module';
import { AiModule } from './modules/ai/ai.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), PrismaModule, CampaignModule, AiModule],
  controllers: [HealthController],
})
export class AppModule {}
