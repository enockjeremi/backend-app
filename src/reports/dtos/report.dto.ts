import { PartialType } from '@nestjs/mapped-types';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Min,
} from 'class-validator';

export class CreateReportDto {
  @IsNotEmpty()
  @IsString()
  reportName: string;

  @IsNotEmpty()
  @IsString()
  carModel: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  carYear: number;

  @IsNotEmpty()
  @IsString()
  reportDiagnostic: string;

  @IsNotEmpty()
  @IsString()
  reportFault: string;

  @IsOptional()
  @IsArray()
  reportDtc: Array<string>;

  @IsNotEmpty()
  @IsString()
  reportFix: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  mileage: number;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  categoryNameId: number;
}

export class UpdateReportDto extends PartialType(CreateReportDto) {}

export class FilterReportDto {
  @IsOptional()
  @IsString()
  filter: string;

  @IsOptional()
  @IsString()
  by: string;

  @IsOptional()
  @IsString()
  category: string;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  limit: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  offset: number;
}
