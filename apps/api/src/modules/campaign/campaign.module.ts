import { Module } from '@nestjs/common';
import { CampaignService } from './application/campaign.service';
import { CAMPAIGN_REPOSITORY } from './domain/campaign';
import { PrismaCampaignRepository } from './infrastructure/prisma-campaign.repository';
import { CampaignController } from './presentation/campaign.controller';

@Module({
  controllers: [CampaignController],
  providers: [CampaignService, PrismaCampaignRepository, { provide: CAMPAIGN_REPOSITORY, useExisting: PrismaCampaignRepository }],
})
export class CampaignModule {}
