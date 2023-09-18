import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ReportService } from '../services/report.service';
import { CreateReportDto, UpdateReportDto } from '../dtos/report.dto';

@Controller('reports')
export class ReportController {
  constructor(private reportServices: ReportService) {}

  @Get()
  get() {
    return this.reportServices.findAll();
  }

  @Get(':id')
  getOne(@Param('id') id: number) {
    return this.reportServices.findOne(id);
  }
  @Post()
  create(@Body() payload: CreateReportDto) {
    return this.reportServices.create(payload);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() payload: UpdateReportDto) {
    return this.reportServices.update(payload, id);
  }
  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.reportServices.delete(id);
  }
}
