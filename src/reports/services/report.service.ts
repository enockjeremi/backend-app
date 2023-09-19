import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReportDto, UpdateReportDto } from '../dtos/report.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Report } from '../entities/reports.entity';
import { Repository } from 'typeorm';
import { CategoryService } from './category.service';

@Injectable()
export class ReportService {
  constructor(
    @InjectRepository(Report) private reportRepository: Repository<Report>,
    private categoryServices: CategoryService,
  ) {}

  async findAll() {
    return this.reportRepository.find({ relations: ['categoryName'] });
  }

  async findOne(id: number) {
    const report = await this.reportRepository.findOne({
      where: { id },
      order: { createAt: 'DESC' },
    });
    if (!report) {
      throw new NotFoundException('Report not found');
    }
    return report;
  }

  async create(payload: CreateReportDto) {
    const newReport = this.reportRepository.create(payload);
    const categoryName = await this.categoryServices.findOne(
      payload.categoryNameId,
    );
    newReport.categoryName = categoryName;
    const saveReport = await this.reportRepository.save(newReport);
    return { message: 'Report has been created', id: saveReport.id };
  }

  async update(payload: UpdateReportDto, id: number) {
    const report = await this.findOne(id);
    const categoryName = await this.categoryServices.findOne(
      payload.categoryNameId,
    );
    report.categoryName = categoryName;
    this.reportRepository.merge(report, payload);
    const updateReport = await this.reportRepository.save(report);
    return { message: 'Report has been updated', id: updateReport.id };
  }

  async delete(id: number) {
    const report = await this.findOne(id);
    await this.reportRepository.delete(report.id);
    return { message: 'Report has been deleted', id };
  }
}
