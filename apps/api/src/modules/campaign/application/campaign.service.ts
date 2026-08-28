import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CAMPAIGN_REPOSITORY, Campaign, CampaignRepository, AutonomyMode } from '../domain/campaign';

@Injectable()
export class CampaignService {
  constructor(@Inject(CAMPAIGN_REPOSITORY) private readonly repository: CampaignRepository) {}

  create(input: { name: string; objective?: string; targetAudience?: string; autonomyMode?: AutonomyMode; aiBudget?: number }): Promise<Campaign> {
    return this.repository.create({ ...input, autonomyMode: input.autonomyMode ?? 'HITL' });
  }

  async getById(id: string): Promise<Campaign> {
    const campaign = await this.repository.findById(id);
    if (!campaign) throw new NotFoundException({ code: 'CAMPAIGN_NOT_FOUND', message: 'Campaign not found' });
    return campaign;
  }
}
