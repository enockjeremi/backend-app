import { MigrationInterface, QueryRunner } from "typeorm";

export class CategoriesTable1695129377744 implements MigrationInterface {
    name = 'CategoriesTable1695129377744'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "categories" ("id" SERIAL NOT NULL, "category_name" character varying(255) NOT NULL, "create_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "update_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "report" ADD "category_name_id" integer`);
        await queryRunner.query(`ALTER TABLE "report" ADD CONSTRAINT "FK_b93ba16c1fe56336c9cdffa13df" FOREIGN KEY ("category_name_id") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "report" DROP CONSTRAINT "FK_b93ba16c1fe56336c9cdffa13df"`);
        await queryRunner.query(`ALTER TABLE "report" DROP COLUMN "category_name_id"`);
        await queryRunner.query(`DROP TABLE "categories"`);
    }

}
