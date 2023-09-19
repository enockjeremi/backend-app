import { PartialType } from '@nestjs/mapped-types';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

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

  @IsOptional()
  @IsArray()
  reportDtc: Array<string>;

  @IsNotEmpty()
  @IsString()
  reportFix: string;

  @IsNotEmpty()
  @IsString()
  mileage: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  categoryNameId: number;
}

export class UpdateReportDto extends PartialType(CreateReportDto) {}
