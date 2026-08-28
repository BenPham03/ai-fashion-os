export type AutonomyMode = 'MANUAL' | 'HITL' | 'AUTONOMOUS';
export type CampaignStatus = 'DRAFT' | 'ACTIVE' | 'PAUSED' | 'COMPLETED' | 'ARCHIVED';

export interface Campaign {
  id: string;
  name: string;
  objective: string | null;
  targetAudience: string | null;
  autonomyMode: AutonomyMode;
  status: CampaignStatus;
  aiBudget: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export const CAMPAIGN_REPOSITORY = Symbol('CAMPAIGN_REPOSITORY');

export interface CampaignRepository {
  create(input: { name: string; objective?: string; targetAudience?: string; autonomyMode: AutonomyMode; aiBudget?: number }): Promise<Campaign>;
  findById(id: string): Promise<Campaign | null>;
}
