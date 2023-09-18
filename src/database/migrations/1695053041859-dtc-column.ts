import { MigrationInterface, QueryRunner } from "typeorm";

export class DtcColumn1695053041859 implements MigrationInterface {
    name = 'DtcColumn1695053041859'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "report" ADD "report_dtc" character varying array NOT NULL DEFAULT '{}'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "report" DROP COLUMN "report_dtc"`);
    }

}
