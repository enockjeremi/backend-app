import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1695835279021 implements MigrationInterface {
    name = 'Init1695835279021'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "report" ("id" SERIAL NOT NULL, "report_name" character varying(255) NOT NULL, "car_model" character varying(255) NOT NULL, "car_year" integer NOT NULL, "report_fault" character varying NOT NULL, "report_dtc" character varying array NOT NULL DEFAULT '{}', "report_diagnostic" text NOT NULL, "report_fix" text NOT NULL, "mileage" integer NOT NULL, "create_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "update_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "category_name_id" integer, CONSTRAINT "PK_99e4d0bea58cba73c57f935a546" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "categories" ("id" SERIAL NOT NULL, "category_name" character varying(255) NOT NULL, "create_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "update_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "report" ADD CONSTRAINT "FK_b93ba16c1fe56336c9cdffa13df" FOREIGN KEY ("category_name_id") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "report" DROP CONSTRAINT "FK_b93ba16c1fe56336c9cdffa13df"`);
        await queryRunner.query(`DROP TABLE "categories"`);
        await queryRunner.query(`DROP TABLE "report"`);
    }

}
