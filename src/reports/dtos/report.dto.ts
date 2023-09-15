import { PartialType } from '@nestjs/mapped-types';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class CreateReportDto {
  @IsNotEmpty()
  @IsString()
  reportName: string;

  @IsNotEmpty()
  @IsString()
  carModel: string;

  @IsNotEmpty()
  @IsString()
  carYear: string;

  @IsNotEmpty()
  @IsString()
  reportDiagnostic: string;

  @IsNotEmpty()
  @IsArray()
  reportFault: Array<string>;

  @IsNotEmpty()
  @IsString()
  reportFix: string;

  @IsNotEmpty()
  @IsString()
  mileage: string;
}

export class UpdateReportDto extends PartialType(CreateReportDto) {}
