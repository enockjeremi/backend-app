import { Module } from '@nestjs/common';
import { ReportsModule } from './reports/reports.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [ReportsModule, DatabaseModule],
})
export class AppModule {}
