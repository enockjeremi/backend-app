import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1694739901015 implements MigrationInterface {
    name = 'Init1694739901015'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "report" ADD "report_fault" character varying array NOT NULL DEFAULT '{}'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "report" DROP COLUMN "report_fault"`);
    }

}
