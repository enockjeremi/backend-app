import { Module } from '@nestjs/common';
import { ReportService } from './services/report.service';
import { ReportController } from './controllers/report.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Report } from './entities/reports.entity';
import { CategoryService } from './services/category.service';
import { CategoryController } from './controllers/category.controller';
import { Categories } from './entities/categories.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Report, Categories])],
  providers: [ReportService, CategoryService],
  controllers: [ReportController, CategoryController],
})
export class ReportsModule {}
