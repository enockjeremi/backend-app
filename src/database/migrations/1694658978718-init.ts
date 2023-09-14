import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1694658978718 implements MigrationInterface {
    name = 'Init1694658978718'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "report" ("id" SERIAL NOT NULL, "report_name" character varying(255) NOT NULL, "car_model" character varying(255) NOT NULL, "car_year" character varying(255) NOT NULL, "report_fault" text NOT NULL, "report_diagnostic" text NOT NULL, "report_fix" text NOT NULL, "mileage" character varying(255) NOT NULL, "create_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "update_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_99e4d0bea58cba73c57f935a546" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "report"`);
    }

}
