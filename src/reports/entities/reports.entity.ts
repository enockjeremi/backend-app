import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Categories } from './categories.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class Report {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: '255', name: 'report_name' })
  reportName: string;

  @Column({ type: 'varchar', length: '255', name: 'car_model' })
  carModel: string;

  @Column({ type: 'int', name: 'car_year' })
  carYear: number;

  @Column({ type: 'varchar', name: 'report_fault' })
  reportFault: string;

  @Column('varchar', { array: true, name: 'report_dtc', default: [] })
  reportDtc: string[];

  @Column({ type: 'text', name: 'report_diagnostic' })
  reportDiagnostic: string;

  @Column({ type: 'text', name: 'report_fix' })
  reportFix: string;

  @Column({ type: 'int' })
  mileage: number;

  @ManyToOne(() => Categories, (category) => category.reports, {
    nullable: true,
  })
  @JoinColumn({ name: 'category_name_id' })
  categoryName: Categories;

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
}
