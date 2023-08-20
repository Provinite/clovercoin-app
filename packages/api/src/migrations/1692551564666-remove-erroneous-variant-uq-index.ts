import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveErroneousVariantUqIndex1692551564666
  implements MigrationInterface
{
  name = "RemoveErroneousVariantUqIndex1692551564666";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "species_variant" DROP CONSTRAINT "UQ_c449a78b8eb0a258c313ddfcdf7"`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "species_variant" ADD CONSTRAINT "UQ_c449a78b8eb0a258c313ddfcdf7" UNIQUE ("id", "speciesId")`
    );
  }
}
