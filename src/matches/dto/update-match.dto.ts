import { IsOptional, IsString, IsDateString } from 'class-validator';

export class UpdateMatchDto {
  @IsOptional()
  @IsString()
  adversary?: string;

  @IsOptional()
  @IsDateString()
  date?: string;

  @IsOptional()
  @IsString()
  score?: string;
}
