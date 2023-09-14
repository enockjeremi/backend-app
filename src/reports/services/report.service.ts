import { Injectable } from '@nestjs/common';
import { CreateReportDto } from '../dtos/report.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Report } from '../entities/reports.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ReportService {
  constructor(
    @InjectRepository(Report) private reportRepository: Repository<Report>,
  ) {}

  async findAll() {
    return this.reportRepository.find({});
  }

  async findOne(id: number) {
    return { message: 'success', id };
  }

  async create(payload: CreateReportDto) {
    return { message: 'success', payload };
  }

  async update(payload: CreateReportDto, id: number) {
    return { message: 'success', payload, id };
  }

  async delete(id: number) {
    return { message: 'success', id };
  }
}
