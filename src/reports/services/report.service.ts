import { Injectable } from '@nestjs/common';
import { CreateReportDto } from '../dtos/report.dto';

@Injectable()
export class ReportService {
  constructor() {}

  async findAll() {
    return { message: 'success' };
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
