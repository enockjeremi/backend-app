import { Injectable, NotFoundException } from '@nestjs/common';
import {
  CreateReportDto,
  FilterReportDto,
  UpdateReportDto,
} from '../dtos/report.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Report } from '../entities/reports.entity';
import { Like, Repository } from 'typeorm';
import { CategoryService } from './category.service';

@Injectable()
export class ReportService {
  constructor(
    @InjectRepository(Report) private reportRepository: Repository<Report>,
    private categoryServices: CategoryService,
  ) {}

  async findByFilter(filter: FilterReportDto) {
    const totalItems = await this.reportRepository.count({
      where: [
        { reportFault: Like(`%${filter.filter}%`) },
        { reportName: Like(`%${filter.filter}%`) },
        { carModel: Like(`%${filter.filter}%`) },
        { reportDiagnostic: Like(`%${filter.filter}%`) },
      ],
    });
    const reports = await this.reportRepository.find({
      where: [
        { reportFault: Like(`%${filter.filter}%`) },
        { reportName: Like(`%${filter.filter}%`) },
        { carModel: Like(`%${filter.filter}%`) },
        { reportDiagnostic: Like(`%${filter.filter}%`) },
      ],
      order: { createAt: 'DESC' },
      take: filter.limit,
      skip: filter.offset,
    });
    return {
      meta: {
        totalItems: totalItems,
      },
      items: reports,
    };
  }

  async findAll(params: FilterReportDto) {
    const total = await this.reportRepository.count();
    if (params) {
      const reports = this.reportRepository.find({
        skip: params.offset,
        take: params.limit,
        relations: ['categoryName'],
        order: { createAt: 'DESC' },
      });
      return {
        meta: {
          totalItems: total,
        },
        items: await reports,
      };
    }
    const reports = this.reportRepository.find({
      relations: ['categoryName'],
      order: { createAt: 'DESC' },
    });
    return {
      meta: {
        totalItems: total,
      },
      items: await reports,
    };
  }

  async findByCategoryName(params: FilterReportDto) {
    if (params.category) {
      const total = await this.reportRepository.count({
        where: { categoryName: { categoryName: params.category } },
      });
      const reports = this.reportRepository.find({
        relations: ['categoryName'],
        where: {
          categoryName: {
            categoryName: params.category,
          },
        },
        skip: params.offset,
        take: params.limit,
        order: { createAt: 'DESC' },
      });
      return {
        meta: {
          totalItems: total,
        },
        items: await reports,
      };
    }
  }

  async findOne(id: number) {
    const report = await this.reportRepository.findOne({
      where: { id },
      relations: ['categoryName'],
    });
    if (!report) {
      throw new NotFoundException('Reporte no encontrado.');
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
    return { message: 'Reporte creado con exito.', id: saveReport.id };
  }

  async update(payload: UpdateReportDto, id: number) {
    const report = await this.findOne(id);
    const categoryName = await this.categoryServices.findOne(
      payload.categoryNameId,
    );
    report.categoryName = categoryName;
    this.reportRepository.merge(report, payload);
    const updateReport = await this.reportRepository.save(report);
    return { message: 'Reporte modificado con exito.', id: updateReport.id };
  }

  async delete(id: number) {
    const report = await this.findOne(id);
    await this.reportRepository.delete(report.id);
    return { message: 'Reporte eliminado con exito.', id };
  }
}
