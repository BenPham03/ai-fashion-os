import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../../infrastructure/prisma/prisma.service';
import { AutonomyMode, Campaign, CampaignRepository } from '../domain/campaign';

@Injectable()
export class PrismaCampaignRepository implements CampaignRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(input: { name: string; objective?: string; targetAudience?: string; autonomyMode: AutonomyMode; aiBudget?: number }): Promise<Campaign> {
    const row = await this.prisma.campaign.create({
      data: {
        name: input.name,
        objective: input.objective,
        targetAudience: input.targetAudience,
        autonomyMode: input.autonomyMode,
        aiBudget: input.aiBudget === undefined ? undefined : new Prisma.Decimal(input.aiBudget),
      },
    });
    return this.map(row);
  }

  async findById(id: string): Promise<Campaign | null> {
    const row = await this.prisma.campaign.findUnique({ where: { id } });
    return row ? this.map(row) : null;
  }

  private map(row: Awaited<ReturnType<PrismaService['campaign']['findUnique']>> extends infer T ? NonNullable<T> : never): Campaign {
    return {
      id: row.id,
      name: row.name,
      objective: row.objective,
      targetAudience: row.targetAudience,
      autonomyMode: row.autonomyMode,
      status: row.status,
      aiBudget: row.aiBudget?.toString() ?? null,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
    };
  }
}
