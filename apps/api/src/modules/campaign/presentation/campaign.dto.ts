import { IsEnum, IsNumber, IsOptional, IsString, MaxLength, Min } from 'class-validator';

export enum AutonomyModeDto {
  MANUAL = 'MANUAL',
  HITL = 'HITL',
  AUTONOMOUS = 'AUTONOMOUS',
}

export class CreateCampaignDto {
  @IsString()
  @MaxLength(120)
  name!: string;

  @IsOptional()
  @IsString()
  @MaxLength(1000)
  objective?: string;

  @IsOptional()
  @IsString()
  @MaxLength(1000)
  targetAudience?: string;

  @IsOptional()
  @IsEnum(AutonomyModeDto)
  autonomyMode?: AutonomyModeDto;

  @IsOptional()
  @IsNumber()
  @Min(0)
  aiBudget?: number;
}
