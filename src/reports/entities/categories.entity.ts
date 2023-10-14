import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Report } from './reports.entity';
import { Exclude, Expose } from 'class-transformer';

@Entity()
export class Categories {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: '255', name: 'category_name' })
  categoryName: string;

  @OneToMany(() => Report, (report) => report.categoryName)
  reports: Report[];

  @Exclude()
  @CreateDateColumn({
    type: 'timestamptz',
    name: 'create_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createAt: Date;

  @Exclude()
  @UpdateDateColumn({
    type: 'timestamptz',
    name: 'update_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updateAt: Date;

  @Expose()
  get totalReports(): number {
    return this.reports?.length;
  }
}
