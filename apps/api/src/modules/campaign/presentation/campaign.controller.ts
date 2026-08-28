import { Body, Controller, Get, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { CampaignService } from '../application/campaign.service';
import { CreateCampaignDto } from './campaign.dto';

@Controller('campaigns')
export class CampaignController {
  constructor(private readonly campaigns: CampaignService) {}

  @Post()
  create(@Body() dto: CreateCampaignDto) {
    return this.campaigns.create(dto);
  }

  @Get(':id')
  getById(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.campaigns.getById(id);
  }
}
