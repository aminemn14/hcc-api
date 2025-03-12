import { IsNotEmpty, IsString, IsDateString } from 'class-validator';

export class CreateMatchDto {
  @IsNotEmpty()
  @IsString()
  adversary: string;

  @IsNotEmpty()
  @IsDateString()
  date: string;

  @IsString()
  score?: string;
}
