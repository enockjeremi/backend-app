import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Report {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: '255', name: 'report_name' })
  reportName: string;

  @Column({ type: 'varchar', length: '255', name: 'car_model' })
  carModel: string;

  @Column({ type: 'varchar', length: '255', name: 'car_year' })
  carYear: string;

  @Column('varchar', { array: true, name: 'report_fault', default: [] })
  reportFault: string[];

  @Column('varchar', { array: true, name: 'report_dtc', default: [] })
  reportDtc: string[];

  @Column({ type: 'text', name: 'report_diagnostic' })
  reportDiagnostic: string;

  @Column({ type: 'text', name: 'report_fix' })
  reportFix: string;

  @Column({ type: 'varchar', length: '255' })
  mileage: string;

  // @Exclude()
  @CreateDateColumn({
    type: 'timestamptz',
    name: 'create_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createAt: Date;

  // @Exclude()
  @UpdateDateColumn({
    type: 'timestamptz',
    name: 'update_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updateAt: Date;
}
